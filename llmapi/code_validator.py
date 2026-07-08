import re
import sys
import subprocess
import os
import tempfile
import logging
import ast

logger = logging.getLogger(__name__)

def detect_language(code_block_lang: str, topic: str) -> str:
    lang = code_block_lang.lower().strip()
    if lang in ('python', 'py', 'python3'):
        return 'python'
    if lang in ('cpp', 'c++', 'cc', 'c'):
        return 'cpp'
    if lang in ('java',):
        return 'java'
    if lang in ('javascript', 'js'):
        return 'javascript'
        
    # Topic matching fallback
    topic_lower = topic.lower()
    if 'python' in topic_lower:
        return 'python'
    if 'c++' in topic_lower or 'cpp' in topic_lower or ' c ' in topic_lower:
        return 'cpp'
    if 'java' in topic_lower and 'javascript' not in topic_lower:
        return 'java'
    if 'javascript' in topic_lower or 'js' in topic_lower:
        return 'javascript'
        
    return 'python'

def validate_python(code: str) -> tuple[bool, str]:
    try:
        compile(code, '<string>', 'exec')
        return True, ""
    except SyntaxError as e:
        return False, f"Python Syntax Error: {e.msg} at line {e.lineno}, column {e.offset}"
    except Exception as e:
        return False, f"Python Error: {str(e)}"

def validate_cpp(code: str) -> tuple[bool, str]:
    try:
        # We run g++ syntax check via stdin
        process = subprocess.Popen(
            ['g++', '-x', 'c++', '-fsyntax-only', '-'],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        stdout, stderr = process.communicate(input=code, timeout=5)
        if process.returncode == 0:
            return True, ""
        else:
            return False, f"C++ Compilation Error:\n{stderr}"
    except subprocess.TimeoutExpired:
        return False, "C++ Compilation Timeout"
    except FileNotFoundError:
        # If g++ is not installed on the host/running environment
        logger.warning("g++ compiler not found, skipping C++ syntax validation.")
        return True, ""
    except Exception as e:
        return False, f"C++ Validation Error: {str(e)}"

def validate_java(code: str) -> tuple[bool, str]:
    # Match the class name
    class_match = re.search(r'(?:public\s+)?class\s+(\w+)', code)
    class_name = class_match.group(1) if class_match else 'TempClass'
    
    # If Class definition is missing, let's wrap it in a dummy class to make it compile checkable
    if not class_match:
        # Wrap simple snippets in a dummy class and main method for syntax check
        if "public static void main" not in code:
            code = f"public class {class_name} {{\n public static void main(String[] args) {{\n {code}\n }}\n}}"
        else:
            code = f"public class {class_name} {{\n {code}\n}}"
            
    temp_dir = tempfile.mkdtemp()
    java_file = os.path.join(temp_dir, f"{class_name}.java")
    
    try:
        with open(java_file, 'w', encoding='utf-8') as f:
            f.write(code)
            
        process = subprocess.run(
            ['javac', '-d', temp_dir, java_file],
            capture_output=True,
            text=True,
            timeout=5
        )
        if process.returncode == 0:
            return True, ""
        else:
            return False, f"Java Compilation Error:\n{process.stderr}"
    except subprocess.TimeoutExpired:
        return False, "Java Compilation Timeout"
    except FileNotFoundError:
        logger.warning("javac compiler not found, skipping Java syntax validation.")
        return True, ""
    except Exception as e:
        return False, f"Java Validation Error: {str(e)}"
    finally:
        # Clean up files
        try:
            if os.path.exists(java_file):
                os.remove(java_file)
            class_file = os.path.join(temp_dir, f"{class_name}.class")
            if os.path.exists(class_file):
                os.remove(class_file)
            os.rmdir(temp_dir)
        except Exception:
            pass

def validate_question(question_text: str, choices: list[str], correct_index: int, topic: str) -> tuple[bool, str]:
    """
    Validates a question and its code blocks.
    Returns (is_valid, error_message).
    """
    # 1. Structural checks
    if not question_text or not question_text.strip():
        return False, "Question text is empty."
    if not choices or len(choices) < 2:
        return False, f"Question has less than 2 choices: {len(choices)} found."
    if correct_index is None or correct_index < 0 or correct_index >= len(choices):
        return False, f"Correct index {correct_index} is out of bounds for choices count {len(choices)}."
        
    # 2. Extract code blocks
    # Match markdown code blocks: ```lang ... ```
    blocks = re.findall(r'```(\w*)\n([\s\S]*?)\n```', question_text)
    
    # Also search inside choices
    for choice in choices:
        choice_blocks = re.findall(r'```(\w*)\n([\s\S]*?)\n```', choice)
        blocks.extend(choice_blocks)
        
    if not blocks:
        return True, "" # No code blocks to validate
        
    for lang_spec, code in blocks:
        code = code.strip()
        if not code:
            continue
            
        lang = detect_language(lang_spec, topic)
        if lang == 'python':
            valid, err = validate_python(code)
            if not valid:
                return False, err
        elif lang == 'cpp':
            valid, err = validate_cpp(code)
            if not valid:
                return False, err
        elif lang == 'java':
            valid, err = validate_java(code)
            if not valid:
                return False, err
                
    return True, ""
