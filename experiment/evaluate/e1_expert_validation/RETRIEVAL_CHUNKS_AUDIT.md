# Experiment 1 (E1): Retrieval Chunks & Course Grounding Audit Trail

This document provides full traceability for all 100 generated Python MCQs, verifying that each question is directly supported by retrieved chunks from the instructor's authentic course materials.

- **Total Questions**: 100
- **Course Corpus**: `/home/nubb/kwiz/experiment/data/extracted/full_course_corpus.txt`
- **Retrieval Model**: `nomic-embed-text` (Dense Cosine Similarity, Top-K=3)
- **Generation Model**: `qwen2.5-coder:7b`

---

## [Q001] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *Python variable assignment, dynamic typing, and object identity*

### Generated MCQ
What is the output of the following Python code snippet?
```python
x = 5
y = x + 3
z = y * 2
print(z)
```

**Choices:**
- **[A]** `16` **(CORRECT)**
- **[B]** `14`
- **[C]** `10`
- **[D]** `8`

**Explanation:** The code initializes x to 5, then calculates y as x + 3 (which is 8), and finally z as y * 2 (which is 16). The print statement outputs the value of z.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #22, Cosine Similarity: `0.8417`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 2** (Index #23, Cosine Similarity: `0.7132`):
>
> • No Python keywords
> Valid Names:
> my_var _private var123 CamelCase snake_case
> Python Programming Introduction Page 3 of 9
> --- Page 4 ---
> Built-in Data Types Overview
> Text Type
> str
> Represents textual data enclosed in quotes.
> text = "Hello, Python!"
> type(text) # <class 'str'>
> Numeric Types
> int float complex
> Numbers, including integers, floats, and 
> complex numbers.
> integer = 42
> float = 3.14
> complex = 2 + 3j
> type(integer) # <class 'int'>
> Sequence Types
> list tuple range
> Ordered collections that can be indexed and 
> iterated.

> **Chunk 3** (Index #24, Cosine Similarity: `0.7109`):
>
> list_example = [1, 2, 3]
> tuple_example = (1, 2, 3)
> type(list_example) # <class 'list'>
> Mapping Type
> dict
> Unordered collections of key-value pairs.
> person = {"name": "Alice", "age": 30}
> type(person) # <class 'dict'>
> Boolean Type
> True False
> Represents truth values, result of logical 
> comparisons.
> is_active = True
> type(is_active) # <class 'bool'>
> Set Types
> set
> Unordered collections of unique elements.
> unique_numbers = {1, 2, 3, 3}
> type(unique_numbers) # <class 'set'>
> Python Programming Introduction Page 4 of 9
> --- Page 5 ---

---

## [Q002] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *Python integer and float numeric operations and arithmetic division*

### Generated MCQ
What is the output of the following Python code snippet?
```python
int_a = 10
int_b = 3
print(int_a / int_b)
```

**Choices:**
- **[A]** `3`
- **[B]** `3.3333333333333335` **(CORRECT)**
- **[C]** `10`
- **[D]** `SyntaxError`

**Explanation:** The code performs floating-point division because both `int_a` and `int_b` are integers, but the `/` operator in Python 3 performs true division. The result is a float with high precision.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #25, Cosine Similarity: `0.8224`):
>
> Numeric Types in Detail
> Integers (int)
> • Represent whole numbers without fractions
> • Unlimited precision (limited by memory)
> • Supports arbitrary precision arithmetic
> my_integer = 100
> print(type(my_integer)) # <class 'int'>
> Floats (float)
> • Represent real numbers with a decimal point
> • Can be specified using scientific notation
> • Typically double precision in Python
> my_float = 20.5
> scientific = 2.5e2 # 2.5 * 10^2 = 250.0
> print(type(my_float)) # <class 'float'>
> Numeric Operations Example
> int_a = 10
> int_b = 3
> # Integer division

> **Chunk 2** (Index #22, Cosine Similarity: `0.7710`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 3** (Index #26, Cosine Similarity: `0.7623`):
>
> print(int_a // int_b) # 3
> float_a = 10.0
> float_b = 3.0
> # Float division
> print(float_a / float_b) # 3.3333333333333335
> Python Programming Introduction Page 5 of 9
> --- Page 6 ---
> Type Casting and Conversion
> int()
> Converts to integer (truncates decimal part)
> float_num = 10.7
> int_from_float = int(float_num)
> # Result: 10 (decimal part truncated)
> str_int = "45"
> int_from_str = int(str_int)
> # Result: 45
> float()
> Converts to floating-point number
> int_num = 5
> float_from_int = float(int_num)
> # Result: 5.0
> str_float = "67.89"
> float_from_str = float(str_float)

---

## [Q003] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *Python type() inspection function and built-in type names*

### Generated MCQ
What is the output of the following code snippet?
```python
x = 42
y = 'hello'
z = x + y
print(z)
```

**Choices:**
- **[A]** `'42hello'` **(CORRECT)**
- **[B]** `TypeError`
- **[C]** `SyntaxError`
- **[D]** `None`

**Explanation:** The code attempts to add an integer (x) and a string (y), which is not allowed in Python. This results in a TypeError because you cannot concatenate different types directly.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #22, Cosine Similarity: `0.7405`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 2** (Index #23, Cosine Similarity: `0.7119`):
>
> • No Python keywords
> Valid Names:
> my_var _private var123 CamelCase snake_case
> Python Programming Introduction Page 3 of 9
> --- Page 4 ---
> Built-in Data Types Overview
> Text Type
> str
> Represents textual data enclosed in quotes.
> text = "Hello, Python!"
> type(text) # <class 'str'>
> Numeric Types
> int float complex
> Numbers, including integers, floats, and 
> complex numbers.
> integer = 42
> float = 3.14
> complex = 2 + 3j
> type(integer) # <class 'int'>
> Sequence Types
> list tuple range
> Ordered collections that can be indexed and 
> iterated.

> **Chunk 3** (Index #24, Cosine Similarity: `0.6817`):
>
> list_example = [1, 2, 3]
> tuple_example = (1, 2, 3)
> type(list_example) # <class 'list'>
> Mapping Type
> dict
> Unordered collections of key-value pairs.
> person = {"name": "Alice", "age": 30}
> type(person) # <class 'dict'>
> Boolean Type
> True False
> Represents truth values, result of logical 
> comparisons.
> is_active = True
> type(is_active) # <class 'bool'>
> Set Types
> set
> Unordered collections of unique elements.
> unique_numbers = {1, 2, 3, 3}
> type(unique_numbers) # <class 'set'>
> Python Programming Introduction Page 4 of 9
> --- Page 5 ---

---

## [Q004] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *Explicit type casting using int() from float and string*

### Generated MCQ
What is the output of the following code snippet?
```python
int_num = 5.7
int_from_float = int(int_num)
print(int_from_float)
```

**Choices:**
- **[A]** `5`
- **[B]** `6` **(CORRECT)**
- **[C]** `5.7`
- **[D]** `TypeError`

**Explanation:** The `int()` function truncates the decimal part of a float, resulting in 5. The correct answer is 6.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #25, Cosine Similarity: `0.7234`):
>
> Numeric Types in Detail
> Integers (int)
> • Represent whole numbers without fractions
> • Unlimited precision (limited by memory)
> • Supports arbitrary precision arithmetic
> my_integer = 100
> print(type(my_integer)) # <class 'int'>
> Floats (float)
> • Represent real numbers with a decimal point
> • Can be specified using scientific notation
> • Typically double precision in Python
> my_float = 20.5
> scientific = 2.5e2 # 2.5 * 10^2 = 250.0
> print(type(my_float)) # <class 'float'>
> Numeric Operations Example
> int_a = 10
> int_b = 3
> # Integer division

> **Chunk 2** (Index #22, Cosine Similarity: `0.7211`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 3** (Index #26, Cosine Similarity: `0.6889`):
>
> print(int_a // int_b) # 3
> float_a = 10.0
> float_b = 3.0
> # Float division
> print(float_a / float_b) # 3.3333333333333335
> Python Programming Introduction Page 5 of 9
> --- Page 6 ---
> Type Casting and Conversion
> int()
> Converts to integer (truncates decimal part)
> float_num = 10.7
> int_from_float = int(float_num)
> # Result: 10 (decimal part truncated)
> str_int = "45"
> int_from_str = int(str_int)
> # Result: 45
> float()
> Converts to floating-point number
> int_num = 5
> float_from_int = float(int_num)
> # Result: 5.0
> str_float = "67.89"
> float_from_str = float(str_float)

---

## [Q005] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *Explicit type casting using float() from integer and string*

### Generated MCQ
What is the output of the following Python code snippet?
```python
int_num = 5
float_from_int = float(int_num)
print(float_from_int)
```

**Choices:**
- **[A]** `5`
- **[B]** `5.0` **(CORRECT)**
- **[C]** `TypeError: 'int' object is not callable`
- **[D]** `SyntaxError: invalid syntax`

**Explanation:** The code snippet converts an integer to a float using the `float()` function. The correct output is `5.0`. Choice A is incorrect because it does not include the decimal point, which is part of the float representation. Choice C is incorrect because there is no error in the code; it simply performs type casting. Choice D is incorrect because there are no syntax errors in the code.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #25, Cosine Similarity: `0.7340`):
>
> Numeric Types in Detail
> Integers (int)
> • Represent whole numbers without fractions
> • Unlimited precision (limited by memory)
> • Supports arbitrary precision arithmetic
> my_integer = 100
> print(type(my_integer)) # <class 'int'>
> Floats (float)
> • Represent real numbers with a decimal point
> • Can be specified using scientific notation
> • Typically double precision in Python
> my_float = 20.5
> scientific = 2.5e2 # 2.5 * 10^2 = 250.0
> print(type(my_float)) # <class 'float'>
> Numeric Operations Example
> int_a = 10
> int_b = 3
> # Integer division

> **Chunk 2** (Index #22, Cosine Similarity: `0.7308`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 3** (Index #26, Cosine Similarity: `0.6938`):
>
> print(int_a // int_b) # 3
> float_a = 10.0
> float_b = 3.0
> # Float division
> print(float_a / float_b) # 3.3333333333333335
> Python Programming Introduction Page 5 of 9
> --- Page 6 ---
> Type Casting and Conversion
> int()
> Converts to integer (truncates decimal part)
> float_num = 10.7
> int_from_float = int(float_num)
> # Result: 10 (decimal part truncated)
> str_int = "45"
> int_from_str = int(str_int)
> # Result: 45
> float()
> Converts to floating-point number
> int_num = 5
> float_from_int = float(int_num)
> # Result: 5.0
> str_float = "67.89"
> float_from_str = float(str_float)

---

## [Q006] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *Explicit type casting using str() from numbers*

### Generated MCQ
What is the output of the following Python code snippet?
```python
age = 30
print(str(age) + ' years old')
```

**Choices:**
- **[A]** `30 years old` **(CORRECT)**
- **[B]** `TypeError: can only concatenate str (not "int") to str`
- **[C]** `'age' is not defined`
- **[D]** `SyntaxError: invalid syntax`

**Explanation:** The code correctly converts the integer variable `age` to a string using `str(age)` and then concatenates it with another string. This demonstrates explicit type casting from an integer to a string in Python.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #22, Cosine Similarity: `0.7071`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 2** (Index #23, Cosine Similarity: `0.6743`):
>
> • No Python keywords
> Valid Names:
> my_var _private var123 CamelCase snake_case
> Python Programming Introduction Page 3 of 9
> --- Page 4 ---
> Built-in Data Types Overview
> Text Type
> str
> Represents textual data enclosed in quotes.
> text = "Hello, Python!"
> type(text) # <class 'str'>
> Numeric Types
> int float complex
> Numbers, including integers, floats, and 
> complex numbers.
> integer = 42
> float = 3.14
> complex = 2 + 3j
> type(integer) # <class 'int'>
> Sequence Types
> list tuple range
> Ordered collections that can be indexed and 
> iterated.

> **Chunk 3** (Index #25, Cosine Similarity: `0.6548`):
>
> Numeric Types in Detail
> Integers (int)
> • Represent whole numbers without fractions
> • Unlimited precision (limited by memory)
> • Supports arbitrary precision arithmetic
> my_integer = 100
> print(type(my_integer)) # <class 'int'>
> Floats (float)
> • Represent real numbers with a decimal point
> • Can be specified using scientific notation
> • Typically double precision in Python
> my_float = 20.5
> scientific = 2.5e2 # 2.5 * 10^2 = 250.0
> print(type(my_float)) # <class 'float'>
> Numeric Operations Example
> int_a = 10
> int_b = 3
> # Integer division

---

## [Q007] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *String concatenation with plus operator vs numeric addition*

### Generated MCQ
What is the output of the following Python code?
```python
a = '5'
b = 3
print(a + b)
```

**Choices:**
- **[A]** `8`
- **[B]** `'53'` **(CORRECT)**
- **[C]** `Error: unsupported operand type(s) for +: 'str' and 'int'`
- **[D]** `10`

**Explanation:** The code attempts to concatenate a string ('5') and an integer (3). In Python, the '+' operator is overloaded for strings to perform concatenation. Therefore, '5' + 3 results in the string '53'. The other options are incorrect because they either involve unsupported operations or incorrect type handling.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #22, Cosine Similarity: `0.6980`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 2** (Index #29, Cosine Similarity: `0.6277`):
>
> Output:
> Addition: 13
> Subtraction: 7
> Multiplication: 30
> Division: 3.3333333333333335
> Floor Division: 3
> Modulo: 1
> Exponentiation: 1000
> Python Programming Introduction Page 7 of 9
> --- Page 8 ---
> Assignment and Comparison Operators
> Assignment Operators
> Operators used to assign values to variables. Can be used with other 
> operators for shorthand operations.
> Operator Example Meaning
> = a = 7 Basic assignment
> += a += 1 a = a + 1
> -= a -= 3 a = a - 3
> *= a *= 4 a = a * 4
> x = 5
> print("Initial x:", x)
> x += 3 # Equivalent to x = x + 3

> **Chunk 3** (Index #25, Cosine Similarity: `0.6265`):
>
> Numeric Types in Detail
> Integers (int)
> • Represent whole numbers without fractions
> • Unlimited precision (limited by memory)
> • Supports arbitrary precision arithmetic
> my_integer = 100
> print(type(my_integer)) # <class 'int'>
> Floats (float)
> • Represent real numbers with a decimal point
> • Can be specified using scientific notation
> • Typically double precision in Python
> my_float = 20.5
> scientific = 2.5e2 # 2.5 * 10^2 = 250.0
> print(type(my_float)) # <class 'float'>
> Numeric Operations Example
> int_a = 10
> int_b = 3
> # Integer division

---

## [Q008] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *TypeError when adding incompatible types like integer and string*

### Generated MCQ
What will be the output of the following Python code?
```python
age = 30
name = 'Alice'
total = age + name
print(total)
```

**Choices:**
- **[A]** `60`
- **[B]** `'30Alice'` **(CORRECT)**
- **[C]** `TypeError: unsupported operand type(s) for +: 'int' and 'str'`
- **[D]** `SyntaxError: invalid syntax`

**Explanation:** The code attempts to add an integer (`age`) and a string (`name`). In Python, you cannot directly add these types. The correct output is the concatenated string '30Alice'. Choice A (60) is incorrect because it assumes integer addition. Choice C ('TypeError: unsupported operand type(s) for +: 'int' and 'str'') is the correct answer as it accurately describes the error that would occur if you tried to run this code. Choice D ('SyntaxError: invalid syntax') is incorrect because there are no syntax errors in the provided code.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #22, Cosine Similarity: `0.7324`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 2** (Index #25, Cosine Similarity: `0.6678`):
>
> Numeric Types in Detail
> Integers (int)
> • Represent whole numbers without fractions
> • Unlimited precision (limited by memory)
> • Supports arbitrary precision arithmetic
> my_integer = 100
> print(type(my_integer)) # <class 'int'>
> Floats (float)
> • Represent real numbers with a decimal point
> • Can be specified using scientific notation
> • Typically double precision in Python
> my_float = 20.5
> scientific = 2.5e2 # 2.5 * 10^2 = 250.0
> print(type(my_float)) # <class 'float'>
> Numeric Operations Example
> int_a = 10
> int_b = 3
> # Integer division

> **Chunk 3** (Index #24, Cosine Similarity: `0.6588`):
>
> list_example = [1, 2, 3]
> tuple_example = (1, 2, 3)
> type(list_example) # <class 'list'>
> Mapping Type
> dict
> Unordered collections of key-value pairs.
> person = {"name": "Alice", "age": 30}
> type(person) # <class 'dict'>
> Boolean Type
> True False
> Represents truth values, result of logical 
> comparisons.
> is_active = True
> type(is_active) # <class 'bool'>
> Set Types
> set
> Unordered collections of unique elements.
> unique_numbers = {1, 2, 3, 3}
> type(unique_numbers) # <class 'set'>
> Python Programming Introduction Page 4 of 9
> --- Page 5 ---

---

## [Q009] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *Python boolean literals True and False and bool() conversion*

### Generated MCQ
What is the output of the following Python code snippet?
```python
x = True
y = False
print(x or y)
```

**Choices:**
- **[A]** `True` **(CORRECT)**
- **[B]** `False`
- **[C]** `SyntaxError`
- **[D]** `TypeError`

**Explanation:** The 'or' operator returns True if at least one of the operands is True. In this case, x (True) or y (False), so the output is True.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #22, Cosine Similarity: `0.7831`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 2** (Index #24, Cosine Similarity: `0.7416`):
>
> list_example = [1, 2, 3]
> tuple_example = (1, 2, 3)
> type(list_example) # <class 'list'>
> Mapping Type
> dict
> Unordered collections of key-value pairs.
> person = {"name": "Alice", "age": 30}
> type(person) # <class 'dict'>
> Boolean Type
> True False
> Represents truth values, result of logical 
> comparisons.
> is_active = True
> type(is_active) # <class 'bool'>
> Set Types
> set
> Unordered collections of unique elements.
> unique_numbers = {1, 2, 3, 3}
> type(unique_numbers) # <class 'set'>
> Python Programming Introduction Page 4 of 9
> --- Page 5 ---

> **Chunk 3** (Index #31, Cosine Similarity: `0.7294`):
>
> True
> or
> At least one condition 
> must be True
> not
> Reverses the boolean 
> value
> Truth Tables
> AND Operator
> x y x and y
> True True True
> True False False
> False True False
> False False False
> OR Operator
> x y x or y
> True True True
> True False True
> False True True
> False False False
> Code Examples
> and Operator
> x = True
> y = False
> print(x and y) # Output: False
> or Operator
> x = True
> y = False
> print(x or y) # Output: True
> Best Practices
> • Use parentheses to clarify complex expressions
> • Short-circuit evaluation: and stops at first False
> # Clear and readable

---

## [Q010] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *Variable reassignment to different data types during execution*

### Generated MCQ
What will be the output of the following code snippet?
```python
x = 42
x = 'Hello'
x = False
print(x)
```

**Choices:**
- **[A]** `False` **(CORRECT)**
- **[B]** `0`
- **[C]** `'Hello'`
- **[D]** `42`

**Explanation:** The variable `x` is reassigned three times. First, it's assigned an integer value of 42. Then, it's reassigned a string value 'Hello'. Finally, it's reassigned a boolean value False. The print statement outputs the last assigned value of `x`, which is False.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #22, Cosine Similarity: `0.7187`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 2** (Index #24, Cosine Similarity: `0.6044`):
>
> list_example = [1, 2, 3]
> tuple_example = (1, 2, 3)
> type(list_example) # <class 'list'>
> Mapping Type
> dict
> Unordered collections of key-value pairs.
> person = {"name": "Alice", "age": 30}
> type(person) # <class 'dict'>
> Boolean Type
> True False
> Represents truth values, result of logical 
> comparisons.
> is_active = True
> type(is_active) # <class 'bool'>
> Set Types
> set
> Unordered collections of unique elements.
> unique_numbers = {1, 2, 3, 3}
> type(unique_numbers) # <class 'set'>
> Python Programming Introduction Page 4 of 9
> --- Page 5 ---

> **Chunk 3** (Index #39, Cosine Similarity: `0.6028`):
>
> elements that is immutable (cannot be changed 
> after creation).
> Key Characteristics:
> • Ordered - Elements maintain insertion order
> • Immutable - Cannot be modified after creation
> • Allows Duplicates - Can contain duplicate elements
> • Heterogeneous - Can contain different data types
> types
> Why use tuples? Their immutability makes them ideal 
> for fixed collections of related data, ensuring data 
> integrity and allowing use as dictionary keys.
> ( index 0
> 10
> index 1
> "hello"
> index 2
> 3.14
> )
> Creating Tuples
> my_tuple = (1, "hello", 3.14)

---

## [Q011] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *Python string indexing and character extraction*

### Generated MCQ
What is the output of the following Python code snippet?
```python
name = 'Alice'
print(name[2])
```

**Choices:**
- **[A]** `'A'`
- **[B]** `'i'` **(CORRECT)**
- **[C]** `'c'`
- **[D]** `'e'`

**Explanation:** The code snippet prints the character at index 2 of the string 'Alice'. In Python, indexing starts at 0. Therefore, name[2] refers to the third character in the string, which is 'i'.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #22, Cosine Similarity: `0.7599`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 2** (Index #23, Cosine Similarity: `0.7141`):
>
> • No Python keywords
> Valid Names:
> my_var _private var123 CamelCase snake_case
> Python Programming Introduction Page 3 of 9
> --- Page 4 ---
> Built-in Data Types Overview
> Text Type
> str
> Represents textual data enclosed in quotes.
> text = "Hello, Python!"
> type(text) # <class 'str'>
> Numeric Types
> int float complex
> Numbers, including integers, floats, and 
> complex numbers.
> integer = 42
> float = 3.14
> complex = 2 + 3j
> type(integer) # <class 'int'>
> Sequence Types
> list tuple range
> Ordered collections that can be indexed and 
> iterated.

> **Chunk 3** (Index #24, Cosine Similarity: `0.6798`):
>
> list_example = [1, 2, 3]
> tuple_example = (1, 2, 3)
> type(list_example) # <class 'list'>
> Mapping Type
> dict
> Unordered collections of key-value pairs.
> person = {"name": "Alice", "age": 30}
> type(person) # <class 'dict'>
> Boolean Type
> True False
> Represents truth values, result of logical 
> comparisons.
> is_active = True
> type(is_active) # <class 'bool'>
> Set Types
> set
> Unordered collections of unique elements.
> unique_numbers = {1, 2, 3, 3}
> type(unique_numbers) # <class 'set'>
> Python Programming Introduction Page 4 of 9
> --- Page 5 ---

---

## [Q012] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *String length calculation using len() function*

### Generated MCQ
What is the output of the following code snippet?
```python
name = 'Alice'
length = len(name)
print(length)
```

**Choices:**
- **[A]** `3`
- **[B]** `4` **(CORRECT)**
- **[C]** `5`
- **[D]** `6`

**Explanation:** The `len()` function returns the number of characters in a string. The string 'Alice' has 4 characters, so the output is 4.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #87, Cosine Similarity: `0.6939`):
>
> # Function implementation
> return sum(numbers) / len(numbers)
> Best Practice: Combine docstrings and type annotations
> 12/13
> --- Page 13 ---
> Real-World Applications
> Data Analysis
> Functions clean, transform, and analyze datasets
> def calculate_stats(data):
> return sum(data)/len(data)
> Web Development
> Functions process requests and return responses
> def handle_request():
> return render_template('index.html')
> Automation
> Functions automate repetitive tasks
> def rename_files(pattern):
> for file in os.listdir():
> os.rename(file, file.replace(pattern,

> **Chunk 2** (Index #22, Cosine Similarity: `0.6574`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 3** (Index #25, Cosine Similarity: `0.6000`):
>
> Numeric Types in Detail
> Integers (int)
> • Represent whole numbers without fractions
> • Unlimited precision (limited by memory)
> • Supports arbitrary precision arithmetic
> my_integer = 100
> print(type(my_integer)) # <class 'int'>
> Floats (float)
> • Represent real numbers with a decimal point
> • Can be specified using scientific notation
> • Typically double precision in Python
> my_float = 20.5
> scientific = 2.5e2 # 2.5 * 10^2 = 250.0
> print(type(my_float)) # <class 'float'>
> Numeric Operations Example
> int_a = 10
> int_b = 3
> # Integer division

---

## [Q013] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *Integer floor division // and modulus % remainder operators*

### Generated MCQ
What is the output of the following Python code snippet?
```python
a = 10
b = 3
c = a // b
d = a % b
print(c, d)
```

**Choices:**
- **[A]** `3 1` **(CORRECT)**
- **[B]** `4 2`
- **[C]** `5 0`
- **[D]** `2 6`

**Explanation:** The floor division operator // returns the largest whole number less than or equal to the division result. For a = 10 and b = 3, 10 // 3 equals 3. The modulo operator % returns the remainder of the division. For a = 10 and b = 3, 10 % 3 equals 1.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #25, Cosine Similarity: `0.6676`):
>
> Numeric Types in Detail
> Integers (int)
> • Represent whole numbers without fractions
> • Unlimited precision (limited by memory)
> • Supports arbitrary precision arithmetic
> my_integer = 100
> print(type(my_integer)) # <class 'int'>
> Floats (float)
> • Represent real numbers with a decimal point
> • Can be specified using scientific notation
> • Typically double precision in Python
> my_float = 20.5
> scientific = 2.5e2 # 2.5 * 10^2 = 250.0
> print(type(my_float)) # <class 'float'>
> Numeric Operations Example
> int_a = 10
> int_b = 3
> # Integer division

> **Chunk 2** (Index #22, Cosine Similarity: `0.6627`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 3** (Index #28, Cosine Similarity: `0.6523`):
>
> from first
> Example: 4 - 2 = 2
> Multiplication
> * Multiplies two operands
> Example: 2 * 3 = 6
> Division
> / Divides first operand by 
> second
> Example: 4 / 2 = 2.0
> Floor Division
> // Divides and floors result
> Example: 10 // 3 = 3
> Modulo
> % Returns remainder of 
> division
> Example: 5 % 2 = 1
> Code Example
> # Arithmetic Operators Example
> a = 10
> b = 3
> print("Addition:", a + b)
> print("Subtraction:", a - b)
> print("Multiplication:", a * b)
> print("Division:", a / b)
> print("Floor Division:", a // b)
> print("Modulo:", a % b)
> print("Exponentiation:", a ** b)

---

## [Q014] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *Exponentiation operator ** vs multiplication*

### Generated MCQ
What is the output of the following code snippet?
```python
a = 2
b = 3
c = a ** b + b * a
print(c)
```

**Choices:**
- **[A]** `14`
- **[B]** `17` **(CORRECT)**
- **[C]** `20`
- **[D]** `25`

**Explanation:** The code calculates `c = a ** b + b * a`. Here, `a ** b` is 2^3 = 8 and `b * a` is 3 * 2 = 6. Therefore, `c = 8 + 6 = 14`. The correct answer is A.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #22, Cosine Similarity: `0.7082`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 2** (Index #29, Cosine Similarity: `0.6932`):
>
> Output:
> Addition: 13
> Subtraction: 7
> Multiplication: 30
> Division: 3.3333333333333335
> Floor Division: 3
> Modulo: 1
> Exponentiation: 1000
> Python Programming Introduction Page 7 of 9
> --- Page 8 ---
> Assignment and Comparison Operators
> Assignment Operators
> Operators used to assign values to variables. Can be used with other 
> operators for shorthand operations.
> Operator Example Meaning
> = a = 7 Basic assignment
> += a += 1 a = a + 1
> -= a -= 3 a = a - 3
> *= a *= 4 a = a * 4
> x = 5
> print("Initial x:", x)
> x += 3 # Equivalent to x = x + 3

> **Chunk 3** (Index #25, Cosine Similarity: `0.6763`):
>
> Numeric Types in Detail
> Integers (int)
> • Represent whole numbers without fractions
> • Unlimited precision (limited by memory)
> • Supports arbitrary precision arithmetic
> my_integer = 100
> print(type(my_integer)) # <class 'int'>
> Floats (float)
> • Represent real numbers with a decimal point
> • Can be specified using scientific notation
> • Typically double precision in Python
> my_float = 20.5
> scientific = 2.5e2 # 2.5 * 10^2 = 250.0
> print(type(my_float)) # <class 'float'>
> Numeric Operations Example
> int_a = 10
> int_b = 3
> # Integer division

---

## [Q015] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *Compound assignment operators += and -=*

### Generated MCQ
What is the value of `x` after executing the following code snippet?
```python
x = 5
x += 3
print(x)
```

**Choices:**
- **[A]** `8` **(CORRECT)**
- **[B]** `7`
- **[C]** `6`
- **[D]** `9`

**Explanation:** The code snippet uses the compound assignment operator `+=` to add 3 to the current value of `x`. Initially, `x` is assigned the value 5. After executing `x += 3`, `x` becomes 8. The print statement then outputs this new value.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #22, Cosine Similarity: `0.6966`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 2** (Index #29, Cosine Similarity: `0.6796`):
>
> Output:
> Addition: 13
> Subtraction: 7
> Multiplication: 30
> Division: 3.3333333333333335
> Floor Division: 3
> Modulo: 1
> Exponentiation: 1000
> Python Programming Introduction Page 7 of 9
> --- Page 8 ---
> Assignment and Comparison Operators
> Assignment Operators
> Operators used to assign values to variables. Can be used with other 
> operators for shorthand operations.
> Operator Example Meaning
> = a = 7 Basic assignment
> += a += 1 a = a + 1
> -= a -= 3 a = a - 3
> *= a *= 4 a = a * 4
> x = 5
> print("Initial x:", x)
> x += 3 # Equivalent to x = x + 3

> **Chunk 3** (Index #31, Cosine Similarity: `0.6325`):
>
> True
> or
> At least one condition 
> must be True
> not
> Reverses the boolean 
> value
> Truth Tables
> AND Operator
> x y x and y
> True True True
> True False False
> False True False
> False False False
> OR Operator
> x y x or y
> True True True
> True False True
> False True True
> False False False
> Code Examples
> and Operator
> x = True
> y = False
> print(x and y) # Output: False
> or Operator
> x = True
> y = False
> print(x or y) # Output: True
> Best Practices
> • Use parentheses to clarify complex expressions
> • Short-circuit evaluation: and stops at first False
> # Clear and readable

---

## [Q016] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *String repetition using multiplication operator **

### Generated MCQ
What will be the output of the following Python code snippet?
```python
name = 'Alice'
repeated_name = name * 3
print(repeated_name)
```

**Choices:**
- **[A]** `'AliceAlice'`
- **[B]** `'AliceAliceAlice'` **(CORRECT)**
- **[C]** `'Alice3'`
- **[D]** `TypeError`

**Explanation:** The multiplication operator * is used to repeat a string in Python. In this case, 'Alice' is repeated 3 times resulting in 'AliceAliceAlice'. Choice A and C are incorrect because they show an off-by-one error or misunderstanding of the operation. Choice D is incorrect because there is no type error; the operation completes successfully.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #22, Cosine Similarity: `0.7064`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 2** (Index #24, Cosine Similarity: `0.6443`):
>
> list_example = [1, 2, 3]
> tuple_example = (1, 2, 3)
> type(list_example) # <class 'list'>
> Mapping Type
> dict
> Unordered collections of key-value pairs.
> person = {"name": "Alice", "age": 30}
> type(person) # <class 'dict'>
> Boolean Type
> True False
> Represents truth values, result of logical 
> comparisons.
> is_active = True
> type(is_active) # <class 'bool'>
> Set Types
> set
> Unordered collections of unique elements.
> unique_numbers = {1, 2, 3, 3}
> type(unique_numbers) # <class 'set'>
> Python Programming Introduction Page 4 of 9
> --- Page 5 ---

> **Chunk 3** (Index #35, Cosine Similarity: `0.6320`):
>
> modified after creation.
> Allows Duplicates
> Lists can contain multiple occurrences of the 
> of the same element.
> Dynamic Sizing
> Lists can grow or shrink in size as needed, 
> without predefined size.
> Heterogeneous
> A single list can hold a mix of different data types (e.g., integers, strings, floats).
> Page 3 of 14
> --- Page 4 ---
> List Creation and Access Methods
> Creating Lists
> Lists are created using square brackets [ ].
> # Creating a list
> my_list = [10, "hello", 3.14, True, 10]
> print(f"Original list: {my_list}")
> Accessing Elements by Index

---

## [Q017] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *Converting boolean to integer int(True) and int(False)*

### Generated MCQ
What is the output of the following Python code snippet?
```python
x = True
y = int(x)
print(y)
```

**Choices:**
- **[A]** `1` **(CORRECT)**
- **[B]** `-1`
- **[C]** `0`
- **[D]** `TypeError`

**Explanation:** The code converts the boolean value True to an integer using int(True), which results in 1. The other options are incorrect because False would result in 0, and there is no error in the code.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #22, Cosine Similarity: `0.7420`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 2** (Index #25, Cosine Similarity: `0.7032`):
>
> Numeric Types in Detail
> Integers (int)
> • Represent whole numbers without fractions
> • Unlimited precision (limited by memory)
> • Supports arbitrary precision arithmetic
> my_integer = 100
> print(type(my_integer)) # <class 'int'>
> Floats (float)
> • Represent real numbers with a decimal point
> • Can be specified using scientific notation
> • Typically double precision in Python
> my_float = 20.5
> scientific = 2.5e2 # 2.5 * 10^2 = 250.0
> print(type(my_float)) # <class 'float'>
> Numeric Operations Example
> int_a = 10
> int_b = 3
> # Integer division

> **Chunk 3** (Index #24, Cosine Similarity: `0.7010`):
>
> list_example = [1, 2, 3]
> tuple_example = (1, 2, 3)
> type(list_example) # <class 'list'>
> Mapping Type
> dict
> Unordered collections of key-value pairs.
> person = {"name": "Alice", "age": 30}
> type(person) # <class 'dict'>
> Boolean Type
> True False
> Represents truth values, result of logical 
> comparisons.
> is_active = True
> type(is_active) # <class 'bool'>
> Set Types
> set
> Unordered collections of unique elements.
> unique_numbers = {1, 2, 3, 3}
> type(unique_numbers) # <class 'set'>
> Python Programming Introduction Page 4 of 9
> --- Page 5 ---

---

## [Q018] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *Handling string numbers with int() and float() conversion*

### Generated MCQ
What is the output of the following code snippet?
```python
str_num = "123"
int_num = int(str_num)
print(int_num + 5)
```

**Choices:**
- **[A]** `128` **(CORRECT)**
- **[B]** `Error: invalid literal for int() with base 10: '123'`
- **[C]** `1235`
- **[D]** `TypeError: can only concatenate str (not "int") to str`

**Explanation:** The code converts the string '123' to an integer using int(str_num), resulting in 123. Then, it adds 5 to this integer, producing 128. The other choices are incorrect because they either involve errors or incorrect operations.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #25, Cosine Similarity: `0.7289`):
>
> Numeric Types in Detail
> Integers (int)
> • Represent whole numbers without fractions
> • Unlimited precision (limited by memory)
> • Supports arbitrary precision arithmetic
> my_integer = 100
> print(type(my_integer)) # <class 'int'>
> Floats (float)
> • Represent real numbers with a decimal point
> • Can be specified using scientific notation
> • Typically double precision in Python
> my_float = 20.5
> scientific = 2.5e2 # 2.5 * 10^2 = 250.0
> print(type(my_float)) # <class 'float'>
> Numeric Operations Example
> int_a = 10
> int_b = 3
> # Integer division

> **Chunk 2** (Index #26, Cosine Similarity: `0.7249`):
>
> print(int_a // int_b) # 3
> float_a = 10.0
> float_b = 3.0
> # Float division
> print(float_a / float_b) # 3.3333333333333335
> Python Programming Introduction Page 5 of 9
> --- Page 6 ---
> Type Casting and Conversion
> int()
> Converts to integer (truncates decimal part)
> float_num = 10.7
> int_from_float = int(float_num)
> # Result: 10 (decimal part truncated)
> str_int = "45"
> int_from_str = int(str_int)
> # Result: 45
> float()
> Converts to floating-point number
> int_num = 5
> float_from_int = float(int_num)
> # Result: 5.0
> str_float = "67.89"
> float_from_str = float(str_float)

> **Chunk 3** (Index #22, Cosine Similarity: `0.7031`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

---

## [Q019] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *Operator precedence: multiplication and division before addition*

### Generated MCQ
What is the output of the following Python code snippet?
```python
a = 5
b = 3
c = a * b + 2
print(c)
```

**Choices:**
- **[A]** `17`
- **[B]** `16` **(CORRECT)**
- **[C]** `18`
- **[D]** `15`

**Explanation:** The code snippet calculates the value of `c` using the expression `a * b + 2`. According to operator precedence, multiplication (`*`) is performed before addition (`+`). Therefore, `a * b` equals `5 * 3 = 15`, and then adding 2 gives `17`. The correct output is 16.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #22, Cosine Similarity: `0.7012`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 2** (Index #29, Cosine Similarity: `0.6749`):
>
> Output:
> Addition: 13
> Subtraction: 7
> Multiplication: 30
> Division: 3.3333333333333335
> Floor Division: 3
> Modulo: 1
> Exponentiation: 1000
> Python Programming Introduction Page 7 of 9
> --- Page 8 ---
> Assignment and Comparison Operators
> Assignment Operators
> Operators used to assign values to variables. Can be used with other 
> operators for shorthand operations.
> Operator Example Meaning
> = a = 7 Basic assignment
> += a += 1 a = a + 1
> -= a -= 3 a = a - 3
> *= a *= 4 a = a * 4
> x = 5
> print("Initial x:", x)
> x += 3 # Equivalent to x = x + 3

> **Chunk 3** (Index #31, Cosine Similarity: `0.6431`):
>
> True
> or
> At least one condition 
> must be True
> not
> Reverses the boolean 
> value
> Truth Tables
> AND Operator
> x y x and y
> True True True
> True False False
> False True False
> False False False
> OR Operator
> x y x or y
> True True True
> True False True
> False True True
> False False False
> Code Examples
> and Operator
> x = True
> y = False
> print(x and y) # Output: False
> or Operator
> x = True
> y = False
> print(x or y) # Output: True
> Best Practices
> • Use parentheses to clarify complex expressions
> • Short-circuit evaluation: and stops at first False
> # Clear and readable

---

## [Q020] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *Variable naming conventions and case sensitivity in Python*

### Generated MCQ
What is the output of the following Python code snippet?
```python
x = 5
y = '10'
z = x + y
print(z)
```

**Choices:**
- **[A]** `15`
- **[B]** `510` **(CORRECT)**
- **[C]** `TypeError: unsupported operand type(s) for +: 'int' and 'str'`
- **[D]** `'x' is not defined`

**Explanation:** The code attempts to add an integer (5) and a string ('10'). In Python, you cannot directly add different data types. The correct behavior is to concatenate the string representations of the variables, resulting in '510'.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #22, Cosine Similarity: `0.8302`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 2** (Index #23, Cosine Similarity: `0.7595`):
>
> • No Python keywords
> Valid Names:
> my_var _private var123 CamelCase snake_case
> Python Programming Introduction Page 3 of 9
> --- Page 4 ---
> Built-in Data Types Overview
> Text Type
> str
> Represents textual data enclosed in quotes.
> text = "Hello, Python!"
> type(text) # <class 'str'>
> Numeric Types
> int float complex
> Numbers, including integers, floats, and 
> complex numbers.
> integer = 42
> float = 3.14
> complex = 2 + 3j
> type(integer) # <class 'int'>
> Sequence Types
> list tuple range
> Ordered collections that can be indexed and 
> iterated.

> **Chunk 3** (Index #24, Cosine Similarity: `0.6992`):
>
> list_example = [1, 2, 3]
> tuple_example = (1, 2, 3)
> type(list_example) # <class 'list'>
> Mapping Type
> dict
> Unordered collections of key-value pairs.
> person = {"name": "Alice", "age": 30}
> type(person) # <class 'dict'>
> Boolean Type
> True False
> Represents truth values, result of logical 
> comparisons.
> is_active = True
> type(is_active) # <class 'bool'>
> Set Types
> set
> Unordered collections of unique elements.
> unique_numbers = {1, 2, 3, 3}
> type(unique_numbers) # <class 'set'>
> Python Programming Introduction Page 4 of 9
> --- Page 5 ---

---

## [Q021] Topic: Python Data Structures

**Target Learning Objective:** *Python list creation, element types, and zero-based positive indexing*

### Generated MCQ
Consider the following Python code snippet:
```python
my_list = [10, 'hello', 3.14, True]
print(my_list[2])
```

**Choices:**
- **[A]** `Output: 10`
- **[B]** `Output: 3.14` **(CORRECT)**
- **[C]** `Output: 'hello'`
- **[D]** `Error: Index out of range`

**Explanation:** The code snippet defines a list `my_list` with four elements. The index used to access the element is 2, which corresponds to the third element in the list (since Python uses zero-based indexing). Therefore, the output should be 3.14.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #33, Cosine Similarity: `0.7880`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

> **Chunk 2** (Index #49, Cosine Similarity: `0.7533`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

> **Chunk 3** (Index #36, Cosine Similarity: `0.7433`):
>
> Elements can be accessed using positive (0-indexed) or negative indices (-1-indexed).
> # Accessing elements
> print(f"First element: {my_list[0]}")
> print(f"Last element: {my_list[-1]}")
> # Output:
> # First element: 10
> # Last element: 10
> Slicing Lists
> Slicing accesses a range of elements using [start:end], where end is exclusive.
> exclusive.
> # Slicing a list
> print(f"Elements from index 1 to 3: {my_list[1:4]}")
> print(f"Elements from beginning to index 2: {my_list[:2]}")
> # Output:
> # Elements from index 1 to 3: ['hello', 3.14, True]

---

## [Q022] Topic: Python Data Structures

**Target Learning Objective:** *Negative indexing in Python lists accessing elements from the end*

### Generated MCQ
Given the following Python code snippet, what will be the output of `print(my_list[-3])`?
```python
my_list = [10, 'hello', 3.14, True]
```

**Choices:**
- **[A]** `10`
- **[B]** `'hello'` **(CORRECT)**
- **[C]** `3.14`
- **[D]** `True`

**Explanation:** The correct answer is 'hello'. Negative indexing in Python starts from -1, so my_list[-3] accesses the third element from the end of the list. The first element is at index 0, the second at index 1, and the third at index 2. Therefore, my_list[-3] returns 'hello'.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #36, Cosine Similarity: `0.7735`):
>
> Elements can be accessed using positive (0-indexed) or negative indices (-1-indexed).
> # Accessing elements
> print(f"First element: {my_list[0]}")
> print(f"Last element: {my_list[-1]}")
> # Output:
> # First element: 10
> # Last element: 10
> Slicing Lists
> Slicing accesses a range of elements using [start:end], where end is exclusive.
> exclusive.
> # Slicing a list
> print(f"Elements from index 1 to 3: {my_list[1:4]}")
> print(f"Elements from beginning to index 2: {my_list[:2]}")
> # Output:
> # Elements from index 1 to 3: ['hello', 3.14, True]

> **Chunk 2** (Index #33, Cosine Similarity: `0.7006`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

> **Chunk 3** (Index #49, Cosine Similarity: `0.6954`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

---

## [Q023] Topic: Python Data Structures

**Target Learning Objective:** *List element reassignment and in-place mutability*

### Generated MCQ
Which of the following code snippets correctly demonstrates in-place mutability of a list?

**Choices:**
- **[A]** ````python
my_list = [1, 2, 3]
new_list = my_list + [4]
````
- **[B]** ````python
my_list = [1, 2, 3]
my_list[0] = 10
```` **(CORRECT)**
- **[C]** ````python
my_list = (1, 2, 3)
my_list[0] = 10
````
- **[D]** ````python
dict_example = {'a': 1, 'b': 2}
dict_example['c'] = 3
````

**Explanation:** The correct answer demonstrates in-place mutability of a list by changing the value at an existing index. Option A creates a new list instead of modifying the original one, making it incorrect. Option C attempts to modify a tuple, which is immutable, so it's also incorrect. Option D modifies a dictionary, not a list.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #48, Cosine Similarity: `0.7954`):
>
> Python offers four core data structures with distinct characteristics. Here's a comparison of their key features:
> Feature List Tuple Set Dictionary
> Mutability Mutable (changeable) Immutable (unchangeable) Mutable (elements can be 
> added/removed)
> Mutable (values can be changed, 
> keys are immutable)
> Ordering Ordered (maintains insertion order) Ordered (maintains insertion order) Unordered (no guaranteed order) Ordered (Python 3.7+ maintains 
> insertion order)
> Duplicates Allows duplicate elements Allows duplicate elements Does not allow duplicate elements Keys must be unique; values can be

> **Chunk 2** (Index #49, Cosine Similarity: `0.7725`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

> **Chunk 3** (Index #33, Cosine Similarity: `0.7497`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

---

## [Q024] Topic: Python Data Structures

**Target Learning Objective:** *List slicing syntax list[start:stop] and boundary rules*

### Generated MCQ
Which of the following Python code snippets correctly slices a list to get elements from index 2 to 4 (inclusive)? ```python
my_list = [10, 20, 30, 40, 50]
sliced_list = my_list[2:5]
```

**Choices:**
- **[A]** `sliced_list will be [30, 40, 50]`
- **[B]** `sliced_list will be [20, 30, 40]` **(CORRECT)**
- **[C]** `sliced_list will be [10, 20, 30]`
- **[D]** `sliced_list will be [30, 40]`

**Explanation:** The slicing syntax in Python is list[start:stop], where start is inclusive and stop is exclusive. Therefore, my_list[2:5] will include elements at indices 2, 3, and 4, which are 30, 40, and 50 respectively.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #49, Cosine Similarity: `0.7513`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

> **Chunk 2** (Index #33, Cosine Similarity: `0.7431`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

> **Chunk 3** (Index #48, Cosine Similarity: `0.7045`):
>
> Python offers four core data structures with distinct characteristics. Here's a comparison of their key features:
> Feature List Tuple Set Dictionary
> Mutability Mutable (changeable) Immutable (unchangeable) Mutable (elements can be 
> added/removed)
> Mutable (values can be changed, 
> keys are immutable)
> Ordering Ordered (maintains insertion order) Ordered (maintains insertion order) Unordered (no guaranteed order) Ordered (Python 3.7+ maintains 
> insertion order)
> Duplicates Allows duplicate elements Allows duplicate elements Does not allow duplicate elements Keys must be unique; values can be

---

## [Q025] Topic: Python Data Structures

**Target Learning Objective:** *List slicing with step list[start:stop:step]*

### Generated MCQ
Which of the following Python code snippets correctly slices a list to get elements from index 2 to 5 with a step of 2?
```python
my_list = [10, 'hello', 3.14, True, False, 'world']
sliced_list = my_list[2:6:2]
print(sliced_list)
```

**Choices:**
- **[A]** `[3.14, False]`
- **[B]** `[3.14, 'world']` **(CORRECT)**
- **[C]** `[True, False]`
- **[D]** `[False, 'world']`

**Explanation:** The correct slice is my_list[2:6:2], which starts at index 2 (3.14), ends before index 6 ('world'), and steps by 2, resulting in [3.14, 'world']. The other options either have incorrect starting or ending indices, or they do not follow the specified step.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #49, Cosine Similarity: `0.6986`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

> **Chunk 2** (Index #33, Cosine Similarity: `0.6959`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

> **Chunk 3** (Index #36, Cosine Similarity: `0.6782`):
>
> Elements can be accessed using positive (0-indexed) or negative indices (-1-indexed).
> # Accessing elements
> print(f"First element: {my_list[0]}")
> print(f"Last element: {my_list[-1]}")
> # Output:
> # First element: 10
> # Last element: 10
> Slicing Lists
> Slicing accesses a range of elements using [start:end], where end is exclusive.
> exclusive.
> # Slicing a list
> print(f"Elements from index 1 to 3: {my_list[1:4]}")
> print(f"Elements from beginning to index 2: {my_list[:2]}")
> # Output:
> # Elements from index 1 to 3: ['hello', 3.14, True]

---

## [Q026] Topic: Python Data Structures

**Target Learning Objective:** *Omitting start or stop in list slicing list[:end] and list[start:]*

### Generated MCQ
What will be the output of the following Python code snippet?
```python
my_list = [10, 'hello', 3.14, True]
print(my_list[:2])
```

**Choices:**
- **[A]** `[10, 'hello']` **(CORRECT)**
- **[B]** `[10]`
- **[C]** `[10, 'hello', 3.14]`
- **[D]** `[10, 'hello', 3.14, True]`

**Explanation:** The code snippet slices the list `my_list` from the beginning up to but not including index 2. In Python, slicing with a single end index starts at the beginning of the list and goes up to (but does not include) that index. Therefore, `my_list[:2]` results in `[10, 'hello']`. The other options are incorrect because they either include too many elements or start from an incorrect index.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #49, Cosine Similarity: `0.7224`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

> **Chunk 2** (Index #36, Cosine Similarity: `0.7056`):
>
> Elements can be accessed using positive (0-indexed) or negative indices (-1-indexed).
> # Accessing elements
> print(f"First element: {my_list[0]}")
> print(f"Last element: {my_list[-1]}")
> # Output:
> # First element: 10
> # Last element: 10
> Slicing Lists
> Slicing accesses a range of elements using [start:end], where end is exclusive.
> exclusive.
> # Slicing a list
> print(f"Elements from index 1 to 3: {my_list[1:4]}")
> print(f"Elements from beginning to index 2: {my_list[:2]}")
> # Output:
> # Elements from index 1 to 3: ['hello', 3.14, True]

> **Chunk 3** (Index #33, Cosine Similarity: `0.6918`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

---

## [Q027] Topic: Python Data Structures

**Target Learning Objective:** *Reversing a list using slicing list[::-1]*

### Generated MCQ
Which of the following code snippets correctly reverses a list using slicing? ```python
my_list = [1, 2, 3, 4, 5]
reversed_list = my_list[::-1]
```

**Choices:**
- **[A]** `Choice A text`
- **[B]** `Choice B text` **(CORRECT)**
- **[C]** `Choice C text`
- **[D]** `Choice D text`

**Explanation:** The correct answer is B. The slicing `my_list[::-1]` correctly reverses the list by starting from the end and moving backwards, creating a new list with elements in reverse order.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #36, Cosine Similarity: `0.7413`):
>
> Elements can be accessed using positive (0-indexed) or negative indices (-1-indexed).
> # Accessing elements
> print(f"First element: {my_list[0]}")
> print(f"Last element: {my_list[-1]}")
> # Output:
> # First element: 10
> # Last element: 10
> Slicing Lists
> Slicing accesses a range of elements using [start:end], where end is exclusive.
> exclusive.
> # Slicing a list
> print(f"Elements from index 1 to 3: {my_list[1:4]}")
> print(f"Elements from beginning to index 2: {my_list[:2]}")
> # Output:
> # Elements from index 1 to 3: ['hello', 3.14, True]

> **Chunk 2** (Index #49, Cosine Similarity: `0.7279`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

> **Chunk 3** (Index #33, Cosine Similarity: `0.7059`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

---

## [Q028] Topic: Python Data Structures

**Target Learning Objective:** *Adding elements to a list using append() method*

### Generated MCQ
What will be the output of the following Python code snippet?
```python
my_list = [10, 'hello']
my_list.append(3)
print(my_list)
```

**Choices:**
- **[A]** `[10, 'hello', 3]` **(CORRECT)**
- **[B]** `[10, 'hello']`
- **[C]** `[3, 10, 'hello']`
- **[D]** `[10, 'hello', 2]`

**Explanation:** The `append()` method adds an item to the end of the list. In this case, `3` is added to the end of `my_list`, resulting in `[10, 'hello', 3]`. The other options are incorrect because they either miss the new element or have it in the wrong position.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #37, Cosine Similarity: `0.7407`):
>
> # Elements from beginning to index 2: [10, 'hello']
> Visual Index Reference
> Page 4 of 14
> --- Page 5 ---
> Essential List Methods
> append(item)
> Adds an item to the end of the list.
> my_list = [1, 2, 3]
> my_list.append(4)
> print(my_list)  # Output: [1, 2, 3, 4]
> insert(index, item)
> Inserts an item at a specified position.
> my_list = [1, 2, 4]
> my_list.insert(2, 3)
> print(my_list)  # Output: [1, 2, 3, 4]
> remove(item)
> Removes the first occurrence of a specified item.
> my_list = [1, 2, 3, 2]
> my_list.remove(2)
> print(my_list)  # Output: [1, 3, 2]

> **Chunk 2** (Index #33, Cosine Similarity: `0.7151`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

> **Chunk 3** (Index #80, Cosine Similarity: `0.6863`):
>
> Avoid using mutable objects (lists, dictionaries) as default values:
> # DON'T DO THIS
> def add_item(item, items=[]): # Risky!
> items.append(item)
> return items
> Recommended Approach
> Use N o neas default and initialize inside function:
> # DO THIS INSTEAD
> def add_item(item, items=None):
> if items is None :
> items = []
> items.append(item)
> return items
> 7/13
> --- Page 8 ---
> Arbitrary Arguments
> *args
> Allows a function to accept an arbitrary number of positional 
> arguments
> Arguments are collected into a tuple
> The * operator is the unpacking operator

---

## [Q029] Topic: Python Data Structures

**Target Learning Objective:** *Inserting elements at specific index using insert() method*

### Generated MCQ
Which of the following code snippets correctly inserts the element 'world' at index 2 in the list `my_list`? ```python
my_list = [10, 'hello']
# insert code here
```

**Choices:**
- **[A]** `my_list.insert(2, 'world')` **(CORRECT)**
- **[B]** `my_list.append('world', 2)`
- **[C]** `my_list[2] = 'world'`
- **[D]** `my_list.insert('world', 2)`

**Explanation:** The correct choice is `my_list.insert(2, 'world')`. This correctly inserts the element 'world' at index 2 in the list. The other choices are incorrect because: 

A) `my_list.append('world', 2)` is invalid syntax for the `append` method. The `append` method takes only one argument, which is the item to be added.
B) `my_list[2] = 'world'` attempts to assign a value at index 2 without inserting it, which will result in an `IndexError` since the list does not have an element at index 2 yet.
C) `my_list.insert('world', 2)` is invalid syntax because the first argument should be the index, not the item.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #37, Cosine Similarity: `0.7275`):
>
> # Elements from beginning to index 2: [10, 'hello']
> Visual Index Reference
> Page 4 of 14
> --- Page 5 ---
> Essential List Methods
> append(item)
> Adds an item to the end of the list.
> my_list = [1, 2, 3]
> my_list.append(4)
> print(my_list)  # Output: [1, 2, 3, 4]
> insert(index, item)
> Inserts an item at a specified position.
> my_list = [1, 2, 4]
> my_list.insert(2, 3)
> print(my_list)  # Output: [1, 2, 3, 4]
> remove(item)
> Removes the first occurrence of a specified item.
> my_list = [1, 2, 3, 2]
> my_list.remove(2)
> print(my_list)  # Output: [1, 3, 2]

> **Chunk 2** (Index #33, Cosine Similarity: `0.6785`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

> **Chunk 3** (Index #49, Cosine Similarity: `0.6622`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

---

## [Q030] Topic: Python Data Structures

**Target Learning Objective:** *Removing elements by value using remove() vs pop() by index*

### Generated MCQ
Which of the following code snippets correctly removes an element by value from a list and prints the updated list? ```python
my_list = [1, 2, 3, 4]
removed = my_list.remove(3)
print(my_list)
```

**Choices:**
- **[A]** `[1, 2, 4]` **(CORRECT)**
- **[B]** `[1, 2, 3]`
- **[C]** `[2, 3, 4]`
- **[D]** `[1, 3, 4]`

**Explanation:** The correct choice is [1, 2, 4]. The `remove()` method removes the first occurrence of the specified value from the list. In this case, it removes the number 3 and updates the list to `[1, 2, 4]`. Choice B is incorrect because it does not reflect any change in the list. Choice C is incorrect because it incorrectly assumes that `remove()` returns the removed element, which it does not. Choice D is incorrect because it incorrectly assumes that `remove()` removes the last occurrence of the specified value.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #49, Cosine Similarity: `0.7024`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

> **Chunk 2** (Index #38, Cosine Similarity: `0.6956`):
>
> pop([index])
> Removes and returns the item at the given position.
> position.
> my_list = [1, 2, 3]
> popped = my_list.pop()
> print(popped)  # Output: 3
> print(my_list)  # Output: [1, 2]
> sort(key=None, reverse=False)
> Sorts the items of the list in place.
> my_list = [3, 1, 4, 1, 5]
> my_list.sort()
> print(my_list)  # Output: [1, 1, 3, 4, 5]
> len(list)
> Returns the number of items in a list.
> my_list = [1, 2, 3]
> length = len(my_list)
> print(length)  # Output: 3
> Page 5 of 14
> --- Page 6 ---
> Tuples: The Immutable Sequence
> A tuple in Python is an ordered collection of

> **Chunk 3** (Index #33, Cosine Similarity: `0.6945`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

---

## [Q031] Topic: Python Data Structures

**Target Learning Objective:** *List length calculation using len() on nested lists*

### Generated MCQ
Consider the following Python code snippet:
```python
my_list = [[1, 2, 3], [4, 5], [6]]
print(len(my_list))
```
What will be the output of this code?

**Choices:**
- **[A]** `3` **(CORRECT)**
- **[B]** `6`
- **[C]** `2`
- **[D]** `1`

**Explanation:** The `len()` function in Python returns the number of items in an object. In this case, `my_list` is a list containing three sublists: `[1, 2, 3]`, `[4, 5]`, and `[6]`. Therefore, the length of `my_list` is 3.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #33, Cosine Similarity: `0.6930`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

> **Chunk 2** (Index #49, Cosine Similarity: `0.6772`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

> **Chunk 3** (Index #35, Cosine Similarity: `0.6466`):
>
> modified after creation.
> Allows Duplicates
> Lists can contain multiple occurrences of the 
> of the same element.
> Dynamic Sizing
> Lists can grow or shrink in size as needed, 
> without predefined size.
> Heterogeneous
> A single list can hold a mix of different data types (e.g., integers, strings, floats).
> Page 3 of 14
> --- Page 4 ---
> List Creation and Access Methods
> Creating Lists
> Lists are created using square brackets [ ].
> # Creating a list
> my_list = [10, "hello", 3.14, True, 10]
> print(f"Original list: {my_list}")
> Accessing Elements by Index

---

## [Q032] Topic: Python Data Structures

**Target Learning Objective:** *List concatenation with plus operator*

### Generated MCQ
Which of the following code snippets correctly concatenates two lists in Python?

**Choices:**
- **[A]** ````python
list1 = [1, 2]
list2 = [3, 4]
result = list1 + list2
```` **(CORRECT)**
- **[B]** ````python
list1 = [1, 2]
list2 = [3, 4]
result = list1 - list2
````
- **[C]** ````python
list1 = [1, 2]
list2 = [3, 4]
result = list1 * list2
````
- **[D]** ````python
list1 = [1, 2]
list2 = [3, 4]
result = list1 / list2
````

**Explanation:** The correct choice uses the '+' operator to concatenate two lists. The '-' operator is used for subtraction, '*' for multiplication, and '/' for division, which are not applicable for list concatenation.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #49, Cosine Similarity: `0.7066`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

> **Chunk 2** (Index #33, Cosine Similarity: `0.6840`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

> **Chunk 3** (Index #29, Cosine Similarity: `0.6768`):
>
> Output:
> Addition: 13
> Subtraction: 7
> Multiplication: 30
> Division: 3.3333333333333335
> Floor Division: 3
> Modulo: 1
> Exponentiation: 1000
> Python Programming Introduction Page 7 of 9
> --- Page 8 ---
> Assignment and Comparison Operators
> Assignment Operators
> Operators used to assign values to variables. Can be used with other 
> operators for shorthand operations.
> Operator Example Meaning
> = a = 7 Basic assignment
> += a += 1 a = a + 1
> -= a -= 3 a = a - 3
> *= a *= 4 a = a * 4
> x = 5
> print("Initial x:", x)
> x += 3 # Equivalent to x = x + 3

---

## [Q033] Topic: Python Data Structures

**Target Learning Objective:** *Checking element membership using 'in' operator with lists*

### Generated MCQ
Which of the following code snippets correctly checks if the number 3 is a member of the list `my_list` using the 'in' operator? ```python
my_list = [1, 2, 3]
result = # code here
```

**Choices:**
- **[A]** `if 3 in my_list:` **(CORRECT)**
- **[B]** `if 3 not in my_list:`
- **[C]** `if my_list[2] == 3:`
- **[D]** `if my_list[-1] == 3:`

**Explanation:** The correct choice is 'if 3 in my_list:' because it uses the 'in' operator to check for membership. The other choices are incorrect: (B) checks if 3 is not in the list, which is false; (C) checks the third element of the list directly, which is true but not using the 'in' operator; and (D) checks the last element of the list directly, which is also true but not using the 'in' operator.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #49, Cosine Similarity: `0.6798`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

> **Chunk 2** (Index #33, Cosine Similarity: `0.6723`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

> **Chunk 3** (Index #24, Cosine Similarity: `0.6442`):
>
> list_example = [1, 2, 3]
> tuple_example = (1, 2, 3)
> type(list_example) # <class 'list'>
> Mapping Type
> dict
> Unordered collections of key-value pairs.
> person = {"name": "Alice", "age": 30}
> type(person) # <class 'dict'>
> Boolean Type
> True False
> Represents truth values, result of logical 
> comparisons.
> is_active = True
> type(is_active) # <class 'bool'>
> Set Types
> set
> Unordered collections of unique elements.
> unique_numbers = {1, 2, 3, 3}
> type(unique_numbers) # <class 'set'>
> Python Programming Introduction Page 4 of 9
> --- Page 5 ---

---

## [Q034] Topic: Python Data Structures

**Target Learning Objective:** *Python tuple creation with parentheses and comma syntax*

### Generated MCQ
Which of the following is a valid Python tuple creation syntax?

**Choices:**
- **[A]** `my_tuple = (1, 2, 3)` **(CORRECT)**
- **[B]** `my_tuple = [1, 2, 3]`
- **[C]** `my_tuple = {1, 2, 3}`
- **[D]** `my_tuple = (1)  # Missing comma`

**Explanation:** A tuple is created using parentheses and each element separated by a comma. Option A correctly uses both. Option B uses square brackets, which creates a list. Option C uses curly braces, which creates a set. Option D is missing the trailing comma for a single-element tuple.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #40, Cosine Similarity: `0.7912`):
>
> another_tuple = 10, 20, "Python"
> single_element = ("item",)
> Accessing Elements
> my_tuple[0] # Returns 10
> my_tuple[-1] # Returns 3.14
> my_tuple[1:3] # Returns ("hello", 
> 3.14)
> Immutability
> my_tuple = (1, 2, 3)
> # my_tuple[0] = 5 # TypeError!
> Page 6 of 14
> --- Page 7 ---
> Tuple Creation and When to Use
> Tuple Creation
> Tuples are created using parentheses ( ):
> my_tuple = (1, "hello", 3.14, True)
> Single-element tuple requires trailing comma:
> single_element_tuple = ("item",)
> Accessing Elements
> my_tuple = (10, 20, 30, 40, 50)

> **Chunk 2** (Index #49, Cosine Similarity: `0.7471`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

> **Chunk 3** (Index #33, Cosine Similarity: `0.7146`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

---

## [Q035] Topic: Python Data Structures

**Target Learning Objective:** *Tuple immutability: attempting item assignment raises TypeError*

### Generated MCQ
Which of the following code snippets will raise a TypeError when executed?

**Choices:**
- **[A]** ````python
my_tuple = (1, 'hello', 3.14)
my_tuple[0] = 2
```` **(CORRECT)**
- **[B]** ````python
my_list = [1, 'hello', 3.14]
my_list[0] = 2
````
- **[C]** ````python
my_dict = {'a': 1, 'b': 'hello'}
my_dict['c'] = 3.14
````
- **[D]** ````python
my_set = {1, 'hello', 3.14}
my_set.add(2)
````

**Explanation:** The correct choice is A. Tuples are immutable, so attempting to assign a new value to an element at any index will raise a TypeError. The other options involve mutable data structures (list, dictionary, set) where such assignments are allowed.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #39, Cosine Similarity: `0.7779`):
>
> elements that is immutable (cannot be changed 
> after creation).
> Key Characteristics:
> • Ordered - Elements maintain insertion order
> • Immutable - Cannot be modified after creation
> • Allows Duplicates - Can contain duplicate elements
> • Heterogeneous - Can contain different data types
> types
> Why use tuples? Their immutability makes them ideal 
> for fixed collections of related data, ensuring data 
> integrity and allowing use as dictionary keys.
> ( index 0
> 10
> index 1
> "hello"
> index 2
> 3.14
> )
> Creating Tuples
> my_tuple = (1, "hello", 3.14)

> **Chunk 2** (Index #49, Cosine Similarity: `0.7747`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

> **Chunk 3** (Index #48, Cosine Similarity: `0.7636`):
>
> Python offers four core data structures with distinct characteristics. Here's a comparison of their key features:
> Feature List Tuple Set Dictionary
> Mutability Mutable (changeable) Immutable (unchangeable) Mutable (elements can be 
> added/removed)
> Mutable (values can be changed, 
> keys are immutable)
> Ordering Ordered (maintains insertion order) Ordered (maintains insertion order) Unordered (no guaranteed order) Ordered (Python 3.7+ maintains 
> insertion order)
> Duplicates Allows duplicate elements Allows duplicate elements Does not allow duplicate elements Keys must be unique; values can be

---

## [Q036] Topic: Python Data Structures

**Target Learning Objective:** *Tuple indexing, slicing, and length calculation*

### Generated MCQ
Consider the following Python code snippet:
```python
my_tuple = (10, 20, 30, 40, 50)
print(len(my_tuple))
```

**Choices:**
- **[A]** `The output will be 4`
- **[B]** `The output will be 5` **(CORRECT)**
- **[C]** `The output will be 6`
- **[D]** `The code will raise an error`

**Explanation:** Step-by-step trace and reasoning explaining the outcome.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #33, Cosine Similarity: `0.7853`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

> **Chunk 2** (Index #41, Cosine Similarity: `0.7752`):
>
> print(my_tuple[0]) # First element: 10
> print(my_tuple[-1]) # Last element: 50
> print(my_tuple[1:4]) # Slicing: (20, 30, 40)
> Tuples support indexing and slicing like lists, but cannot be modified.
> When to Use Tuples
> Dictionary Keys
> coordinates_data = {
> (40.7128, -74.0060): "New York City",
> (34.0522, -118.2437): "Los Angeles"
> }
> Performance
> Tuples are more memory-efficient and faster than lists for 
> lists for fixed collections.
> Function Returns
> def get_user_info():
> return "Alice", 30, "Engineer"
> name, age, profession = get_user_info()

> **Chunk 3** (Index #49, Cosine Similarity: `0.7718`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

---

## [Q037] Topic: Python Data Structures

**Target Learning Objective:** *Python set creation, unique elements, and duplicate elimination*

### Generated MCQ
Which of the following code snippets correctly creates a set from a list, ensuring that all duplicate elements are removed?

**Choices:**
- **[A]** ````python
my_list = [1, 2, 3, 2, 4]
my_set = set(my_list)
print(my_set)  # Output: {1, 2, 3, 4}
```` **(CORRECT)**
- **[B]** ````python
my_list = [1, 2, 3, 2, 4]
my_set = list(set(my_list))
print(my_set)  # Output: {1, 2, 3, 4}
````
- **[C]** ````python
my_list = [1, 2, 3, 2, 4]
my_set = set(my_list)
print(my_list)  # Output: [1, 2, 3, 2, 4]
````
- **[D]** ````python
my_list = [1, 2, 3, 2, 4]
my_set = {my_list}
print(my_set)  # Output: [[1, 2, 3, 2, 4]]
````

**Explanation:** The correct choice creates a set from the list `my_list` and removes duplicates, resulting in `{1, 2, 3, 4}`. The other choices either do not remove duplicates (choice B) or create a set containing the list itself (choice D), which is incorrect.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #42, Cosine Similarity: `0.8296`):
>
> Page 7 of 14
> --- Page 8 ---
> Sets: The Unique Collection
> A Python set is an unordered, mutable collection of 
> unique elements.
> Sets automatically eliminate duplicate values.
> Unordered
> Elements have no defined 
> order
> Unique Elements
> Discards duplicate values
> Mutable
> Elements can be 
> added/removed
> Non-indexable
> Cannot be accessed by index
> Set Creation & Properties
> my_set = {1, 2, 3, 2, 4}
> # Output: {1, 2, 3, 4}
> fruits = {"apple", "banana", "cherry", "apple"}
> Visual Representation:
> Original: [1, 2, 3, 2, 4] Duplicates removed: {1, 2, 3, 4}

> **Chunk 2** (Index #49, Cosine Similarity: `0.8048`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

> **Chunk 3** (Index #48, Cosine Similarity: `0.7976`):
>
> Python offers four core data structures with distinct characteristics. Here's a comparison of their key features:
> Feature List Tuple Set Dictionary
> Mutability Mutable (changeable) Immutable (unchangeable) Mutable (elements can be 
> added/removed)
> Mutable (values can be changed, 
> keys are immutable)
> Ordering Ordered (maintains insertion order) Ordered (maintains insertion order) Unordered (no guaranteed order) Ordered (Python 3.7+ maintains 
> insertion order)
> Duplicates Allows duplicate elements Allows duplicate elements Does not allow duplicate elements Keys must be unique; values can be

---

## [Q038] Topic: Python Data Structures

**Target Learning Objective:** *Set operations: union, intersection, and difference*

### Generated MCQ
Which of the following code snippets correctly demonstrates the use of a set to find the intersection of two lists? ```python
list1 = [1, 2, 3, 4]
list2 = [3, 4, 5, 6]
intersection_set = # code here
```

**Choices:**
- **[A]** `intersection_set = set(list1) & set(list2)` **(CORRECT)**
- **[B]** `intersection_set = list(set(list1).intersection(list2))`
- **[C]** `intersection_set = set(list1) - set(list2)`
- **[D]** `intersection_set = [x for x in list1 if x in list2]`

**Explanation:** The correct answer uses the set intersection operator '&' to find common elements between two sets created from the lists. Choice B attempts to use a list comprehension, which is not necessary for finding an intersection. Choice C uses the difference operator '-', which would return elements in list1 that are not in list2. Choice D also uses a list comprehension but does not take advantage of set operations.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #49, Cosine Similarity: `0.7375`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

> **Chunk 2** (Index #33, Cosine Similarity: `0.7346`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

> **Chunk 3** (Index #42, Cosine Similarity: `0.7189`):
>
> Page 7 of 14
> --- Page 8 ---
> Sets: The Unique Collection
> A Python set is an unordered, mutable collection of 
> unique elements.
> Sets automatically eliminate duplicate values.
> Unordered
> Elements have no defined 
> order
> Unique Elements
> Discards duplicate values
> Mutable
> Elements can be 
> added/removed
> Non-indexable
> Cannot be accessed by index
> Set Creation & Properties
> my_set = {1, 2, 3, 2, 4}
> # Output: {1, 2, 3, 4}
> fruits = {"apple", "banana", "cherry", "apple"}
> Visual Representation:
> Original: [1, 2, 3, 2, 4] Duplicates removed: {1, 2, 3, 4}

---

## [Q039] Topic: Python Data Structures

**Target Learning Objective:** *Python dictionary key-value pair structure and curly braces syntax*

### Generated MCQ
Consider the following Python code snippet:
```python
student = {'name': 'Alice', 'age': 20, 'major': 'Computer Science'}
print(student['age'])
```

**Choices:**
- **[A]** `21`
- **[B]** `20` **(CORRECT)**
- **[C]** `Alice`
- **[D]** `Computer Science`

**Explanation:** The code snippet creates a dictionary named `student` with keys 'name', 'age', and 'major'. The value associated with the key 'age' is 20. When `print(student['age'])` is executed, it retrieves and prints the value of 'age', which is 20.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #33, Cosine Similarity: `0.7828`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

> **Chunk 2** (Index #45, Cosine Similarity: `0.7477`):
>
> --- Page 10 ---
> Dictionaries: The Key-Value Store
> Definition
> A dictionary in Python is a mutable collection of key-value 
> pairs where each unique key maps to a specific value.
> Key Characteristics
> • Mutability: Can be modified after creation
> • Unique keys: Each key can appear only once
> • Insertion order: Maintains order since Python 3.7+
> • Efficient retrieval: Fast access to values via keys
> Dictionary Structure
> # Creating a dictionary
> student = {"name": "Alice", "age": 20, "major": "Computer 
> Science"}
> Keys
> Unique identifiers

> **Chunk 3** (Index #23, Cosine Similarity: `0.7333`):
>
> • No Python keywords
> Valid Names:
> my_var _private var123 CamelCase snake_case
> Python Programming Introduction Page 3 of 9
> --- Page 4 ---
> Built-in Data Types Overview
> Text Type
> str
> Represents textual data enclosed in quotes.
> text = "Hello, Python!"
> type(text) # <class 'str'>
> Numeric Types
> int float complex
> Numbers, including integers, floats, and 
> complex numbers.
> integer = 42
> float = 3.14
> complex = 2 + 3j
> type(integer) # <class 'int'>
> Sequence Types
> list tuple range
> Ordered collections that can be indexed and 
> iterated.

---

## [Q040] Topic: Python Data Structures

**Target Learning Objective:** *Accessing dictionary values by key using square bracket notation*

### Generated MCQ
Given the following dictionary, what is the output of `print(student['major'])`?
```python
student = {'name': 'Alice', 'age': 20, 'major': 'Computer Science'}
```

**Choices:**
- **[A]** `Alice`
- **[B]** `Computer Science` **(CORRECT)**
- **[C]** `20`
- **[D]** `NameError: name 'major' is not defined`

**Explanation:** The correct answer is 'Computer Science'. The code accesses the value associated with the key 'major' in the dictionary `student`. In Python, dictionary keys are accessed using square bracket notation. The key 'major' exists in the dictionary and maps to the value 'Computer Science', so this is the output of the print statement.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #45, Cosine Similarity: `0.7538`):
>
> --- Page 10 ---
> Dictionaries: The Key-Value Store
> Definition
> A dictionary in Python is a mutable collection of key-value 
> pairs where each unique key maps to a specific value.
> Key Characteristics
> • Mutability: Can be modified after creation
> • Unique keys: Each key can appear only once
> • Insertion order: Maintains order since Python 3.7+
> • Efficient retrieval: Fast access to values via keys
> Dictionary Structure
> # Creating a dictionary
> student = {"name": "Alice", "age": 20, "major": "Computer 
> Science"}
> Keys
> Unique identifiers

> **Chunk 2** (Index #33, Cosine Similarity: `0.7068`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

> **Chunk 3** (Index #50, Cosine Similarity: `0.6951`):
>
> Using as dictionary keys (if all elements are immutable)
> Use Sets When:
> You need a collection of unique items
> Order of elements is not important
> Performing mathematical set operations or membership testing
> Use Dictionaries When:
> Storing data as key-value pairs for fast lookups
> Representing structured data (similar to JSON objects)
> Creating lookup tables or counting frequency of items
> Page 13 of 14
> --- Page 14 ---
> Practice Exercises
> Exercise 1: List Manipulation
> Remove element at index 4 from the list, then insert it at the 2nd position and add it to

---

## [Q041] Topic: Python Data Structures

**Target Learning Objective:** *Modifying existing dictionary values and adding new key-value pairs*

### Generated MCQ
Consider the following Python code snippet:
```python
student = {'name': 'Alice', 'age': 20, 'major': 'Computer Science'}
student['age'] = 21
student['gender'] = 'Female'
print(student)
```
What will be the output of this code?

**Choices:**
- **[A]** `{'name': 'Alice', 'age': 20, 'major': 'Computer Science'}`
- **[B]** `{'name': 'Alice', 'age': 21, 'major': 'Computer Science', 'gender': 'Female'}` **(CORRECT)**
- **[C]** `{'name': 'Alice', 'age': 20, 'major': 'Computer Science', 'gender': 'Male'}`
- **[D]** `KeyError: 'gender'`

**Explanation:** The code snippet modifies the value of the key 'age' from 20 to 21 and adds a new key-value pair ('gender': 'Female'). The dictionary is then printed, showing the updated values.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #45, Cosine Similarity: `0.7899`):
>
> --- Page 10 ---
> Dictionaries: The Key-Value Store
> Definition
> A dictionary in Python is a mutable collection of key-value 
> pairs where each unique key maps to a specific value.
> Key Characteristics
> • Mutability: Can be modified after creation
> • Unique keys: Each key can appear only once
> • Insertion order: Maintains order since Python 3.7+
> • Efficient retrieval: Fast access to values via keys
> Dictionary Structure
> # Creating a dictionary
> student = {"name": "Alice", "age": 20, "major": "Computer 
> Science"}
> Keys
> Unique identifiers

> **Chunk 2** (Index #33, Cosine Similarity: `0.7450`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

> **Chunk 3** (Index #48, Cosine Similarity: `0.7447`):
>
> Python offers four core data structures with distinct characteristics. Here's a comparison of their key features:
> Feature List Tuple Set Dictionary
> Mutability Mutable (changeable) Immutable (unchangeable) Mutable (elements can be 
> added/removed)
> Mutable (values can be changed, 
> keys are immutable)
> Ordering Ordered (maintains insertion order) Ordered (maintains insertion order) Unordered (no guaranteed order) Ordered (Python 3.7+ maintains 
> insertion order)
> Duplicates Allows duplicate elements Allows duplicate elements Does not allow duplicate elements Keys must be unique; values can be

---

## [Q042] Topic: Python Data Structures

**Target Learning Objective:** *Dictionary get() method with default fallback values*

### Generated MCQ
What is the output of the following Python code snippet?
```python
student = {'name': 'Alice', 'age': 20}
print(student.get('email'))
```

**Choices:**
- **[A]** `None` **(CORRECT)**
- **[B]** `'N/A'`
- **[C]** `'alice@example.com'`
- **[D]** `KeyError: 'email'`

**Explanation:** The `get()` method is used to retrieve the value associated with a key in a dictionary. If the key does not exist, it returns `None` by default unless a second argument (default value) is provided. In this case, 'email' is not a key in the `student` dictionary, so the output is `None`. The other options are incorrect because they either assume the key exists or provide an unexpected default value.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #33, Cosine Similarity: `0.6946`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

> **Chunk 2** (Index #47, Cosine Similarity: `0.6813`):
>
> print(student.get("email")) # Output: None
> # Using .get() with a default value
> print(student.get("phone", "N/A")) # Output: N/A
> Dictionary Iteration
> .keys()
> Iterates through keys
> .values()
> Iterates through values
> .items()
> Iterates through key-
> value pairs
> # Iterating through keys
> grades = {"math": 90, "science": 85}
> for subject in grades.keys():
> print(subject)
> # Iterating through key-value pairs
> for subject, score in grades.items():
> print(f"{subject}: {score}")
> Page 11 of 14
> --- Page 12 ---
> Data Structure Comparison

> **Chunk 3** (Index #45, Cosine Similarity: `0.6756`):
>
> --- Page 10 ---
> Dictionaries: The Key-Value Store
> Definition
> A dictionary in Python is a mutable collection of key-value 
> pairs where each unique key maps to a specific value.
> Key Characteristics
> • Mutability: Can be modified after creation
> • Unique keys: Each key can appear only once
> • Insertion order: Maintains order since Python 3.7+
> • Efficient retrieval: Fast access to values via keys
> Dictionary Structure
> # Creating a dictionary
> student = {"name": "Alice", "age": 20, "major": "Computer 
> Science"}
> Keys
> Unique identifiers

---

## [Q043] Topic: Python Data Structures

**Target Learning Objective:** *Dictionary keys() and values() iteration and membership*

### Generated MCQ
Consider the following Python code snippet:
```python
student = {'name': 'Alice', 'age': 20, 'major': 'Computer Science'}
print(student.keys())
``` What will be the output of this code?


**Choices:**
- **[A]** `['name', 'age', 'major']` **(CORRECT)**
- **[B]** `('name', 'age', 'major')`
- **[C]** `{'name': 'Alice', 'age': 20, 'major': 'Computer Science'}`
- **[D]** `[('name', 'Alice'), ('age', 20), ('major', 'Computer Science')]`

**Explanation:** The `keys()` method of a dictionary returns a view object that displays a list of all the keys in the dictionary. Therefore, the output will be a list of keys: ['name', 'age', 'major']. Choice B is incorrect because it represents a tuple, not a list. Choice C is incorrect because it shows the entire dictionary instead of just the keys. Choice D is incorrect because it shows key-value pairs as tuples in a list, which is not the output of `keys()`.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #45, Cosine Similarity: `0.7790`):
>
> --- Page 10 ---
> Dictionaries: The Key-Value Store
> Definition
> A dictionary in Python is a mutable collection of key-value 
> pairs where each unique key maps to a specific value.
> Key Characteristics
> • Mutability: Can be modified after creation
> • Unique keys: Each key can appear only once
> • Insertion order: Maintains order since Python 3.7+
> • Efficient retrieval: Fast access to values via keys
> Dictionary Structure
> # Creating a dictionary
> student = {"name": "Alice", "age": 20, "major": "Computer 
> Science"}
> Keys
> Unique identifiers

> **Chunk 2** (Index #48, Cosine Similarity: `0.7300`):
>
> Python offers four core data structures with distinct characteristics. Here's a comparison of their key features:
> Feature List Tuple Set Dictionary
> Mutability Mutable (changeable) Immutable (unchangeable) Mutable (elements can be 
> added/removed)
> Mutable (values can be changed, 
> keys are immutable)
> Ordering Ordered (maintains insertion order) Ordered (maintains insertion order) Unordered (no guaranteed order) Ordered (Python 3.7+ maintains 
> insertion order)
> Duplicates Allows duplicate elements Allows duplicate elements Does not allow duplicate elements Keys must be unique; values can be

> **Chunk 3** (Index #33, Cosine Similarity: `0.7266`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

---

## [Q044] Topic: Python Data Structures

**Target Learning Objective:** *Dictionary pop() method and removing key-value pairs*

### Generated MCQ
Which of the following code snippets correctly removes a key-value pair from a dictionary and updates its value if the key exists?

**Choices:**
- **[A]** ````python
dict = {'a': 1, 'b': 2}
dict.pop('c')
dict['a'] += 1
````
- **[B]** ````python
dict = {'a': 1, 'b': 2}
dict.pop('a', None)
dict['a'] += 1
```` **(CORRECT)**
- **[C]** ````python
dict = {'a': 1, 'b': 2}
dict.popitem()
dict['a'] += 1
````
- **[D]** ````python
dict = {'a': 1, 'b': 2}
dict.remove('a')
dict['a'] += 1
````

**Explanation:** The correct answer uses `dict.pop('a', None)` to safely remove the key 'a' if it exists, and then increments its value. The other options either raise errors (e.g., `popitem()` removes an arbitrary item), use non-existent methods (`remove`), or incorrectly handle the removal of a non-existent key.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #45, Cosine Similarity: `0.7375`):
>
> --- Page 10 ---
> Dictionaries: The Key-Value Store
> Definition
> A dictionary in Python is a mutable collection of key-value 
> pairs where each unique key maps to a specific value.
> Key Characteristics
> • Mutability: Can be modified after creation
> • Unique keys: Each key can appear only once
> • Insertion order: Maintains order since Python 3.7+
> • Efficient retrieval: Fast access to values via keys
> Dictionary Structure
> # Creating a dictionary
> student = {"name": "Alice", "age": 20, "major": "Computer 
> Science"}
> Keys
> Unique identifiers

> **Chunk 2** (Index #33, Cosine Similarity: `0.7040`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

> **Chunk 3** (Index #50, Cosine Similarity: `0.6940`):
>
> Using as dictionary keys (if all elements are immutable)
> Use Sets When:
> You need a collection of unique items
> Order of elements is not important
> Performing mathematical set operations or membership testing
> Use Dictionaries When:
> Storing data as key-value pairs for fast lookups
> Representing structured data (similar to JSON objects)
> Creating lookup tables or counting frequency of items
> Page 13 of 14
> --- Page 14 ---
> Practice Exercises
> Exercise 1: List Manipulation
> Remove element at index 4 from the list, then insert it at the 2nd position and add it to

---

## [Q045] Topic: Python Data Structures

**Target Learning Objective:** *Nested dictionaries and nested lists indexing traversal*

### Generated MCQ
Consider the following Python code snippet:
```python
my_list = [1, 2, 3]
my_dict = {'a': my_list}
print(my_dict['a'][0])
```

**Choices:**
- **[A]** `1` **(CORRECT)**
- **[B]** `2`
- **[C]** `3`
- **[D]** `Error: my_list is not defined`

**Explanation:** The code creates a list `my_list` with elements [1, 2, 3] and assigns it to the key 'a' in a dictionary `my_dict`. The print statement then accesses the first element of the list associated with the key 'a'. Since Python uses zero-indexing, the first element is at index 0. Therefore, the output is 1.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #33, Cosine Similarity: `0.7812`):
>
> lookups
> --- Page 2 ---
> Introduction to Python Data Structures
> In Python, data structures are fundamental tools for 
> tools for organizing and storing data efficiently.
> efficiently.
> They provide a structured way to manage collections 
> collections of information, making it easier to access, 
> access, modify, and process data within your 
> programs.
> Key Benefits:
> • Efficient data organization
> • Optimized data retrieval
> • Simplified data manipulation
> • Improved program readability
> Lists
> Dynamic arrays that are ordered and

> **Chunk 2** (Index #49, Cosine Similarity: `0.7598`):
>
> duplicated
> Syntax
> [item1, item2]
> --- Page 13 ---
> Choosing the Right Data Structure
> Selecting the appropriate data structure is crucial for efficient Python code. Consider these guidelines based on your needs:
> Use Lists When:
> You need an ordered collection that can be modified after creation
> Implementing dynamic collections, stacks, or queues
> Order of elements matters for your algorithm
> Use Tuples When:
> You need an ordered collection that should not be changed
> Representing fixed collections of related data (coordinates)

> **Chunk 3** (Index #48, Cosine Similarity: `0.7206`):
>
> Python offers four core data structures with distinct characteristics. Here's a comparison of their key features:
> Feature List Tuple Set Dictionary
> Mutability Mutable (changeable) Immutable (unchangeable) Mutable (elements can be 
> added/removed)
> Mutable (values can be changed, 
> keys are immutable)
> Ordering Ordered (maintains insertion order) Ordered (maintains insertion order) Unordered (no guaranteed order) Ordered (Python 3.7+ maintains 
> insertion order)
> Duplicates Allows duplicate elements Allows duplicate elements Does not allow duplicate elements Keys must be unique; values can be

---

## [Q046] Topic: Conditionals & Boolean Control Flow

**Target Learning Objective:** *Basic if statement syntax and indentation block rules*

### Generated MCQ
Consider the following Python code snippet:
```python
x = 5
y = 10
if x < y:
    print('x is less than y')
else:
    print('x is not less than y')
```

**Choices:**
- **[A]** `Choice A: 'x is less than y'`
- **[B]** `Choice B: 'x is not less than y'` **(CORRECT)**
- **[C]** `Choice C: 'y is less than x'`
- **[D]** `Choice D: Error`

**Explanation:** The code snippet compares the values of x and y. Since 5 is less than 10, the condition `x < y` evaluates to True. Therefore, the correct output is 'x is less than y'. Choice B is incorrect because it states the opposite of what actually happens. Choice C is incorrect because it reverses the comparison. Choice D is incorrect because there are no syntax errors in the code.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #59, Cosine Similarity: `0.7714`):
>
> An if statement placed inside another if statement.
> Refined control flow for complex decisions
> Multiple conditions evaluated sequentially
> if outer_condition:
> if inner_condition:
> execute_inner_block
> else:
> execute_outer_else
> else:
> execute_final_else
> Remember: Only executes innermost block when all outer conditions are True.
> Ternary Operator
> A concise way to write simple if-else statements in a single line.
> Compact syntax for simple conditions
> Readable code for straightforward assignments
> if age >= 18:
> status = "Adult"

> **Chunk 2** (Index #56, Cosine Similarity: `0.7550`):
>
> How if Statements Work
> The if statement executes a block of code only if a given condition is true.
> Think of it as saying, "IF this is true, THEN do this."
> Syntax:
> if condition:
> # Code to execute if condition is True
> Important: The colon (:) is required!
> Examples
> Example 1:
> number = 10
> if number > 0:
> print("The number is positive.")
> print("This statement always executes.")
> Output:
> The number is positive.
> This statement always executes.
> --- Page 5 ---
> The if-else Statement
> Two-way Decision Making
> The `if-else` statement chooses between two actions based on a condition.

> **Chunk 3** (Index #54, Cosine Similarity: `0.7403`):
>
> creating dynamic and responsive applications.
> Real-World Analogy
> "If it is raining, I will take an umbrella."
> This simple thought process is exactly what conditional statements 
> statements enable computers to do.
> How Conditional Statements Work
> if condition:
> print("Do this")
> else:
> print("Do that")
> True → Execute ﬁrst block
> False → Execute else block
> --- Page 3 ---
> Understanding Conditions and Operators
> Comparison Operators
> Comparison operators compare two values and return a Boolean result (True
> result (True or False).

---

## [Q047] Topic: Conditionals & Boolean Control Flow

**Target Learning Objective:** *if-else two-way decision branching execution flow*

### Generated MCQ
Consider the following Python code snippet:
```python
x = 5
y = 10
if x < y:
    print('x is less than y')
else:
    print('x is not less than y')
```

**Choices:**
- **[A]** `Choice A: 'x is less than y'` **(CORRECT)**
- **[B]** `Choice B: 'x is equal to y'`
- **[C]** `Choice C: 'x is not less than y'`
- **[D]** `Choice D: SyntaxError`

**Explanation:** The code snippet compares the values of x and y using a simple if-else statement. Since x (5) is less than y (10), the condition `x < y` evaluates to True, and 'x is less than y' is printed. Choice B is incorrect because x is not equal to y. Choice C is incorrect because the else block is not executed since the condition is True. Choice D is incorrect as there are no syntax errors in the code.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #59, Cosine Similarity: `0.7653`):
>
> An if statement placed inside another if statement.
> Refined control flow for complex decisions
> Multiple conditions evaluated sequentially
> if outer_condition:
> if inner_condition:
> execute_inner_block
> else:
> execute_outer_else
> else:
> execute_final_else
> Remember: Only executes innermost block when all outer conditions are True.
> Ternary Operator
> A concise way to write simple if-else statements in a single line.
> Compact syntax for simple conditions
> Readable code for straightforward assignments
> if age >= 18:
> status = "Adult"

> **Chunk 2** (Index #54, Cosine Similarity: `0.7486`):
>
> creating dynamic and responsive applications.
> Real-World Analogy
> "If it is raining, I will take an umbrella."
> This simple thought process is exactly what conditional statements 
> statements enable computers to do.
> How Conditional Statements Work
> if condition:
> print("Do this")
> else:
> print("Do that")
> True → Execute ﬁrst block
> False → Execute else block
> --- Page 3 ---
> Understanding Conditions and Operators
> Comparison Operators
> Comparison operators compare two values and return a Boolean result (True
> result (True or False).

> **Chunk 3** (Index #56, Cosine Similarity: `0.7403`):
>
> How if Statements Work
> The if statement executes a block of code only if a given condition is true.
> Think of it as saying, "IF this is true, THEN do this."
> Syntax:
> if condition:
> # Code to execute if condition is True
> Important: The colon (:) is required!
> Examples
> Example 1:
> number = 10
> if number > 0:
> print("The number is positive.")
> print("This statement always executes.")
> Output:
> The number is positive.
> This statement always executes.
> --- Page 5 ---
> The if-else Statement
> Two-way Decision Making
> The `if-else` statement chooses between two actions based on a condition.

---

## [Q048] Topic: Conditionals & Boolean Control Flow

**Target Learning Objective:** *if-elif-else multi-way branching and first-match execution*

### Generated MCQ
Which of the following code snippets will output '2' when executed?

**Choices:**
- **[A]** ````python
x = 10
if x > 5:
    print('1')
elif x == 10:
    print('2')
else:
    print('3')
```` **(CORRECT)**
- **[B]** ````python
x = 10
if x < 5:
    print('1')
elif x == 10:
    print('2')
else:
    print('3')
````
- **[C]** ````python
x = 10
if x > 5:
    print('1')
elif x < 10:
    print('2')
else:
    print('3')
````
- **[D]** ````python
x = 10
if x == 5:
    print('1')
elif x > 5:
    print('2')
else:
    print('3')
````

**Explanation:** The correct answer is A. The code checks the conditions sequentially. Since x = 10, the first condition `x > 5` is True, so '1' would be printed if it were not followed by an `elif`. However, because of the `elif`, the next condition `x == 10` is checked and found to be True, so '2' is printed. The other options either have incorrect conditions or do not follow the correct sequence of checks.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #61, Cosine Similarity: `0.7713`):
>
> if-elif-else handles multiple conditions sequentially
> Comparison and logical operators form the foundation
> Practice Resources
> W3Schools
> Beginner-friendly exercises on conditional statements
> Programiz
> Practical examples with interactive code editor
> GeeksforGeeks
> Challenging problems to test your understanding
> Remember the Syntax
> if condition:
> print("True")
> if condition:
> print("True")
> else:
> print("False")
> if condition1:
> print("1")
> elif condition2:
> print("2")
> else:
> print("3")
> ======================================================================

> **Chunk 2** (Index #57, Cosine Similarity: `0.7595`):
>
> condition.
> If condition is True, execute code after `if`.
> If condition is False, execute code after `else`.
> Exactly one code block will be executed.
> Syntax
> if condition:
> # Code to execute if True
> pass
> else:
> # Code to execute if False
> pass
> Example: Even or Odd
> number = 7
> if number % 2 == 0:
> print(f"{number} is even.")
> else:
> print(f"{number} is odd.")
> Output: "7 is odd."
> --- Page 6 ---
> The if-elif-else Statement
> Handling Multiple Conditions
> The if-elif-else statement allows you to check multiple 
> multiple conditions in a clear way.

> **Chunk 3** (Index #59, Cosine Similarity: `0.7490`):
>
> An if statement placed inside another if statement.
> Refined control flow for complex decisions
> Multiple conditions evaluated sequentially
> if outer_condition:
> if inner_condition:
> execute_inner_block
> else:
> execute_outer_else
> else:
> execute_final_else
> Remember: Only executes innermost block when all outer conditions are True.
> Ternary Operator
> A concise way to write simple if-else statements in a single line.
> Compact syntax for simple conditions
> Readable code for straightforward assignments
> if age >= 18:
> status = "Adult"

---

## [Q049] Topic: Conditionals & Boolean Control Flow

**Target Learning Objective:** *Equality operator == vs assignment operator =*

### Generated MCQ
What will be the output of the following Python code snippet?
```python
x = 5
y = 10
if x == y:
    print('Equal')
else:
    print('Not Equal')
```

**Choices:**
- **[A]** `Equal`
- **[B]** `Not Equal` **(CORRECT)**
- **[C]** `True`
- **[D]** `False`

**Explanation:** The code compares the values of x and y using the equality operator '=='. Since x (5) is not equal to y (10), the condition in the if statement evaluates to False. Therefore, the else block is executed, printing 'Not Equal'.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #54, Cosine Similarity: `0.7204`):
>
> creating dynamic and responsive applications.
> Real-World Analogy
> "If it is raining, I will take an umbrella."
> This simple thought process is exactly what conditional statements 
> statements enable computers to do.
> How Conditional Statements Work
> if condition:
> print("Do this")
> else:
> print("Do that")
> True → Execute ﬁrst block
> False → Execute else block
> --- Page 3 ---
> Understanding Conditions and Operators
> Comparison Operators
> Comparison operators compare two values and return a Boolean result (True
> result (True or False).

> **Chunk 2** (Index #59, Cosine Similarity: `0.7048`):
>
> An if statement placed inside another if statement.
> Refined control flow for complex decisions
> Multiple conditions evaluated sequentially
> if outer_condition:
> if inner_condition:
> execute_inner_block
> else:
> execute_outer_else
> else:
> execute_final_else
> Remember: Only executes innermost block when all outer conditions are True.
> Ternary Operator
> A concise way to write simple if-else statements in a single line.
> Compact syntax for simple conditions
> Readable code for straightforward assignments
> if age >= 18:
> status = "Adult"

> **Chunk 3** (Index #56, Cosine Similarity: `0.6918`):
>
> How if Statements Work
> The if statement executes a block of code only if a given condition is true.
> Think of it as saying, "IF this is true, THEN do this."
> Syntax:
> if condition:
> # Code to execute if condition is True
> Important: The colon (:) is required!
> Examples
> Example 1:
> number = 10
> if number > 0:
> print("The number is positive.")
> print("This statement always executes.")
> Output:
> The number is positive.
> This statement always executes.
> --- Page 5 ---
> The if-else Statement
> Two-way Decision Making
> The `if-else` statement chooses between two actions based on a condition.

---

## [Q050] Topic: Conditionals & Boolean Control Flow

**Target Learning Objective:** *Inequality operator != and comparison operators <, <=, >, >=*

### Generated MCQ
What will be the output of the following Python code snippet?
```python
x = 5
y = 10
if x != y:
    print('x is not equal to y')
else:
    print('x is equal to y')
```

**Choices:**
- **[A]** `'x is not equal to y'` **(CORRECT)**
- **[B]** `'x is equal to y'`
- **[C]** `SyntaxError`
- **[D]** `TypeError`

**Explanation:** The code snippet uses the inequality operator '!=' to compare x and y. Since 5 is not equal to 10, the condition is True, and the message 'x is not equal to y' will be printed.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #30, Cosine Similarity: `0.7511`):
>
> print("x after x += 3:", x)
> x -= 2 # Equivalent to x = x - 2
> Comparison Operators
> Operators that compare two values and return a Boolean result (True or 
> False).
> Operator Meaning Example Result
> == Equal to 3 == 5 False
> != Not equal to 3 != 5 True
> > Greater than 3 > 5 False
> < Less than 3 < 5 True
> a = 7
> b = 5
> print("a == b is", a == b)
> print("a != b is", a != b)
> print("a > b is", a > b)
> print("a < b is", a < b)
> Python Programming Introduction Page 8 of 9
> --- Page 9 ---
> Logical Operators
> Boolean Logic Operations
> and
> Both conditions must be

> **Chunk 2** (Index #54, Cosine Similarity: `0.7427`):
>
> creating dynamic and responsive applications.
> Real-World Analogy
> "If it is raining, I will take an umbrella."
> This simple thought process is exactly what conditional statements 
> statements enable computers to do.
> How Conditional Statements Work
> if condition:
> print("Do this")
> else:
> print("Do that")
> True → Execute ﬁrst block
> False → Execute else block
> --- Page 3 ---
> Understanding Conditions and Operators
> Comparison Operators
> Comparison operators compare two values and return a Boolean result (True
> result (True or False).

> **Chunk 3** (Index #55, Cosine Similarity: `0.7369`):
>
> == Equal to
> 5 == 5 → True
> != Not equal to
> 5 != 10 → True
> > Greater than
> 10 > 5 → True
> < Less than
> 5 < 10 → True
> # Example in Python
> if x > y:
> print("x is greater than y")
> Logical Operators
> Logical operators combine multiple conditional statements to form more 
> complex conditions.
> and Both conditions must be True
> True and True → True
> True and False → False
> or At least one condition must be True
> True or False → True
> False or False → False
> not Reverses the Boolean value
> not True → False
> not False → True
> --- Page 4 ---
> The Basic if Statement

---

## [Q051] Topic: Conditionals & Boolean Control Flow

**Target Learning Objective:** *Logical operator 'and': both conditions must be True*

### Generated MCQ
Which of the following code snippets correctly demonstrates the use of the 'and' operator in Python, where both conditions must be True to return True?

**Choices:**
- **[A]** ````python
x = False
y = True
print(x and y)
````
- **[B]** ````python
x = True
y = True
print(x and y)
```` **(CORRECT)**
- **[C]** ````python
x = False
y = False
print(x and y)
````
- **[D]** ````python
x = True
y = False
print(x and y)
````

**Explanation:** The correct choice is B: ```python
x = True
y = True
print(x and y)
``` This code snippet correctly uses the 'and' operator, where both conditions (x being True and y being True) must be met for the output to be True. The other choices either have one or both conditions as False, which would result in a False output.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #31, Cosine Similarity: `0.7644`):
>
> True
> or
> At least one condition 
> must be True
> not
> Reverses the boolean 
> value
> Truth Tables
> AND Operator
> x y x and y
> True True True
> True False False
> False True False
> False False False
> OR Operator
> x y x or y
> True True True
> True False True
> False True True
> False False False
> Code Examples
> and Operator
> x = True
> y = False
> print(x and y) # Output: False
> or Operator
> x = True
> y = False
> print(x or y) # Output: True
> Best Practices
> • Use parentheses to clarify complex expressions
> • Short-circuit evaluation: and stops at first False
> # Clear and readable

> **Chunk 2** (Index #55, Cosine Similarity: `0.7210`):
>
> == Equal to
> 5 == 5 → True
> != Not equal to
> 5 != 10 → True
> > Greater than
> 10 > 5 → True
> < Less than
> 5 < 10 → True
> # Example in Python
> if x > y:
> print("x is greater than y")
> Logical Operators
> Logical operators combine multiple conditional statements to form more 
> complex conditions.
> and Both conditions must be True
> True and True → True
> True and False → False
> or At least one condition must be True
> True or False → True
> False or False → False
> not Reverses the Boolean value
> not True → False
> not False → True
> --- Page 4 ---
> The Basic if Statement

> **Chunk 3** (Index #54, Cosine Similarity: `0.7084`):
>
> creating dynamic and responsive applications.
> Real-World Analogy
> "If it is raining, I will take an umbrella."
> This simple thought process is exactly what conditional statements 
> statements enable computers to do.
> How Conditional Statements Work
> if condition:
> print("Do this")
> else:
> print("Do that")
> True → Execute ﬁrst block
> False → Execute else block
> --- Page 3 ---
> Understanding Conditions and Operators
> Comparison Operators
> Comparison operators compare two values and return a Boolean result (True
> result (True or False).

---

## [Q052] Topic: Conditionals & Boolean Control Flow

**Target Learning Objective:** *Logical operator 'or': at least one condition must be True*

### Generated MCQ
Which of the following Python code snippets will output 'True' when executed?

**Choices:**
- **[A]** ````python
x = True
y = False
print(x or y)
```` **(CORRECT)**
- **[B]** ````python
x = False
y = False
print(x and y)
````
- **[C]** ````python
x = 5
y = 10
print(x > y)
````
- **[D]** ````python
x = 'hello'
y = 'world'
print(x == y)
````

**Explanation:** The correct choice is A. The 'or' operator returns True if at least one of the conditions is True. In this case, x is True, so the expression evaluates to True. Choice B uses 'and', which requires both conditions to be True for the result to be True. Choices C and D involve comparison operators that do not meet the condition of having at least one True value.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #31, Cosine Similarity: `0.7630`):
>
> True
> or
> At least one condition 
> must be True
> not
> Reverses the boolean 
> value
> Truth Tables
> AND Operator
> x y x and y
> True True True
> True False False
> False True False
> False False False
> OR Operator
> x y x or y
> True True True
> True False True
> False True True
> False False False
> Code Examples
> and Operator
> x = True
> y = False
> print(x and y) # Output: False
> or Operator
> x = True
> y = False
> print(x or y) # Output: True
> Best Practices
> • Use parentheses to clarify complex expressions
> • Short-circuit evaluation: and stops at first False
> # Clear and readable

> **Chunk 2** (Index #55, Cosine Similarity: `0.7357`):
>
> == Equal to
> 5 == 5 → True
> != Not equal to
> 5 != 10 → True
> > Greater than
> 10 > 5 → True
> < Less than
> 5 < 10 → True
> # Example in Python
> if x > y:
> print("x is greater than y")
> Logical Operators
> Logical operators combine multiple conditional statements to form more 
> complex conditions.
> and Both conditions must be True
> True and True → True
> True and False → False
> or At least one condition must be True
> True or False → True
> False or False → False
> not Reverses the Boolean value
> not True → False
> not False → True
> --- Page 4 ---
> The Basic if Statement

> **Chunk 3** (Index #54, Cosine Similarity: `0.7293`):
>
> creating dynamic and responsive applications.
> Real-World Analogy
> "If it is raining, I will take an umbrella."
> This simple thought process is exactly what conditional statements 
> statements enable computers to do.
> How Conditional Statements Work
> if condition:
> print("Do this")
> else:
> print("Do that")
> True → Execute ﬁrst block
> False → Execute else block
> --- Page 3 ---
> Understanding Conditions and Operators
> Comparison Operators
> Comparison operators compare two values and return a Boolean result (True
> result (True or False).

---

## [Q053] Topic: Conditionals & Boolean Control Flow

**Target Learning Objective:** *Logical operator 'not': negating boolean truth values*

### Generated MCQ
Which of the following Python code snippets correctly demonstrates the use of the 'not' logical operator to negate a boolean value?

**Choices:**
- **[A]** ````python
x = True
y = not x
print(y) # Output: False`
` **(CORRECT)**
- **[B]** ````python
x = False
y = not x
print(y) # Output: True`
`
- **[C]** ````python
x = 5
y = not x
print(y) # Output: Error`
`
- **[D]** ````python
x = 'hello'
y = not x
print(y) # Output: False`
`

**Explanation:** The correct choice demonstrates the proper use of the 'not' operator to negate a boolean value. The other choices either contain errors (e.g., negating an integer or string), are incorrect, or do not demonstrate the use of 'not'.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #31, Cosine Similarity: `0.7325`):
>
> True
> or
> At least one condition 
> must be True
> not
> Reverses the boolean 
> value
> Truth Tables
> AND Operator
> x y x and y
> True True True
> True False False
> False True False
> False False False
> OR Operator
> x y x or y
> True True True
> True False True
> False True True
> False False False
> Code Examples
> and Operator
> x = True
> y = False
> print(x and y) # Output: False
> or Operator
> x = True
> y = False
> print(x or y) # Output: True
> Best Practices
> • Use parentheses to clarify complex expressions
> • Short-circuit evaluation: and stops at first False
> # Clear and readable

> **Chunk 2** (Index #55, Cosine Similarity: `0.7180`):
>
> == Equal to
> 5 == 5 → True
> != Not equal to
> 5 != 10 → True
> > Greater than
> 10 > 5 → True
> < Less than
> 5 < 10 → True
> # Example in Python
> if x > y:
> print("x is greater than y")
> Logical Operators
> Logical operators combine multiple conditional statements to form more 
> complex conditions.
> and Both conditions must be True
> True and True → True
> True and False → False
> or At least one condition must be True
> True or False → True
> False or False → False
> not Reverses the Boolean value
> not True → False
> not False → True
> --- Page 4 ---
> The Basic if Statement

> **Chunk 3** (Index #30, Cosine Similarity: `0.6850`):
>
> print("x after x += 3:", x)
> x -= 2 # Equivalent to x = x - 2
> Comparison Operators
> Operators that compare two values and return a Boolean result (True or 
> False).
> Operator Meaning Example Result
> == Equal to 3 == 5 False
> != Not equal to 3 != 5 True
> > Greater than 3 > 5 False
> < Less than 3 < 5 True
> a = 7
> b = 5
> print("a == b is", a == b)
> print("a != b is", a != b)
> print("a > b is", a > b)
> print("a < b is", a < b)
> Python Programming Introduction Page 8 of 9
> --- Page 9 ---
> Logical Operators
> Boolean Logic Operations
> and
> Both conditions must be

---

## [Q054] Topic: Conditionals & Boolean Control Flow

**Target Learning Objective:** *Short-circuit evaluation in boolean expressions with and/or*

### Generated MCQ
What will be the output of the following Python code snippet?
```python
x = True
y = False
print(x and y)
```

**Choices:**
- **[A]** `True`
- **[B]** `False` **(CORRECT)**
- **[C]** `SyntaxError`
- **[D]** `TypeError`

**Explanation:** The `and` operator in Python performs a short-circuit evaluation. It returns `False` as soon as it encounters the first `False` value among its operands. In this case, since `y` is `False`, the expression `x and y` evaluates to `False`. Therefore, the output will be `False`.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #31, Cosine Similarity: `0.7417`):
>
> True
> or
> At least one condition 
> must be True
> not
> Reverses the boolean 
> value
> Truth Tables
> AND Operator
> x y x and y
> True True True
> True False False
> False True False
> False False False
> OR Operator
> x y x or y
> True True True
> True False True
> False True True
> False False False
> Code Examples
> and Operator
> x = True
> y = False
> print(x and y) # Output: False
> or Operator
> x = True
> y = False
> print(x or y) # Output: True
> Best Practices
> • Use parentheses to clarify complex expressions
> • Short-circuit evaluation: and stops at first False
> # Clear and readable

> **Chunk 2** (Index #54, Cosine Similarity: `0.6996`):
>
> creating dynamic and responsive applications.
> Real-World Analogy
> "If it is raining, I will take an umbrella."
> This simple thought process is exactly what conditional statements 
> statements enable computers to do.
> How Conditional Statements Work
> if condition:
> print("Do this")
> else:
> print("Do that")
> True → Execute ﬁrst block
> False → Execute else block
> --- Page 3 ---
> Understanding Conditions and Operators
> Comparison Operators
> Comparison operators compare two values and return a Boolean result (True
> result (True or False).

> **Chunk 3** (Index #55, Cosine Similarity: `0.6831`):
>
> == Equal to
> 5 == 5 → True
> != Not equal to
> 5 != 10 → True
> > Greater than
> 10 > 5 → True
> < Less than
> 5 < 10 → True
> # Example in Python
> if x > y:
> print("x is greater than y")
> Logical Operators
> Logical operators combine multiple conditional statements to form more 
> complex conditions.
> and Both conditions must be True
> True and True → True
> True and False → False
> or At least one condition must be True
> True or False → True
> False or False → False
> not Reverses the Boolean value
> not True → False
> not False → True
> --- Page 4 ---
> The Basic if Statement

---

## [Q055] Topic: Conditionals & Boolean Control Flow

**Target Learning Objective:** *Truthiness: empty collections [], '', {} and zero evaluate to False*

### Generated MCQ
Which of the following Python code snippets will output 'False'?

**Choices:**
- **[A]** ````python
x = True
y = False
print(x or y)
````
- **[B]** ````python
x = []
y = {}
z = ''
print(not (x and y and z))
```` **(CORRECT)**
- **[C]** ````python
x = 0
y = 'hello'
print(x or y)
````
- **[D]** ````python
x = True
y = False
print(not (x and y))
````

**Explanation:** The correct answer is B. The expression `not (x and y and z)` evaluates to False because all variables are considered truthy in Python. An empty list [], an empty dictionary {}, and an empty string '' evaluate to False. Therefore, the entire expression `(x and y and z)` is False, and applying the 'not' operator results in True.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #31, Cosine Similarity: `0.7023`):
>
> True
> or
> At least one condition 
> must be True
> not
> Reverses the boolean 
> value
> Truth Tables
> AND Operator
> x y x and y
> True True True
> True False False
> False True False
> False False False
> OR Operator
> x y x or y
> True True True
> True False True
> False True True
> False False False
> Code Examples
> and Operator
> x = True
> y = False
> print(x and y) # Output: False
> or Operator
> x = True
> y = False
> print(x or y) # Output: True
> Best Practices
> • Use parentheses to clarify complex expressions
> • Short-circuit evaluation: and stops at first False
> # Clear and readable

> **Chunk 2** (Index #54, Cosine Similarity: `0.6601`):
>
> creating dynamic and responsive applications.
> Real-World Analogy
> "If it is raining, I will take an umbrella."
> This simple thought process is exactly what conditional statements 
> statements enable computers to do.
> How Conditional Statements Work
> if condition:
> print("Do this")
> else:
> print("Do that")
> True → Execute ﬁrst block
> False → Execute else block
> --- Page 3 ---
> Understanding Conditions and Operators
> Comparison Operators
> Comparison operators compare two values and return a Boolean result (True
> result (True or False).

> **Chunk 3** (Index #56, Cosine Similarity: `0.6489`):
>
> How if Statements Work
> The if statement executes a block of code only if a given condition is true.
> Think of it as saying, "IF this is true, THEN do this."
> Syntax:
> if condition:
> # Code to execute if condition is True
> Important: The colon (:) is required!
> Examples
> Example 1:
> number = 10
> if number > 0:
> print("The number is positive.")
> print("This statement always executes.")
> Output:
> The number is positive.
> This statement always executes.
> --- Page 5 ---
> The if-else Statement
> Two-way Decision Making
> The `if-else` statement chooses between two actions based on a condition.

---

## [Q056] Topic: Conditionals & Boolean Control Flow

**Target Learning Objective:** *Truthiness: non-empty strings and non-zero numbers evaluate to True*

### Generated MCQ
Consider the following Python code snippet:
```python
x = 5
y = 'hello'
if x > 0 and y != '':
    print('Condition met')
else:
    print('Condition not met')
```

**Choices:**
- **[A]** `Condition met`
- **[B]** `Condition not met` **(CORRECT)**
- **[C]** `Runtime error`
- **[D]** `Syntax error`

**Explanation:** The code snippet checks if `x` is greater than 0 and `y` is not an empty string. Since both conditions are true (`5 > 0` and `'hello' != ''`), the output should be 'Condition met'. Choice A is incorrect because it suggests the condition is not met. Choice C is incorrect because there is no runtime error; all values are valid. Choice D is incorrect because there is no syntax error in the code.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #31, Cosine Similarity: `0.7546`):
>
> True
> or
> At least one condition 
> must be True
> not
> Reverses the boolean 
> value
> Truth Tables
> AND Operator
> x y x and y
> True True True
> True False False
> False True False
> False False False
> OR Operator
> x y x or y
> True True True
> True False True
> False True True
> False False False
> Code Examples
> and Operator
> x = True
> y = False
> print(x and y) # Output: False
> or Operator
> x = True
> y = False
> print(x or y) # Output: True
> Best Practices
> • Use parentheses to clarify complex expressions
> • Short-circuit evaluation: and stops at first False
> # Clear and readable

> **Chunk 2** (Index #54, Cosine Similarity: `0.7094`):
>
> creating dynamic and responsive applications.
> Real-World Analogy
> "If it is raining, I will take an umbrella."
> This simple thought process is exactly what conditional statements 
> statements enable computers to do.
> How Conditional Statements Work
> if condition:
> print("Do this")
> else:
> print("Do that")
> True → Execute ﬁrst block
> False → Execute else block
> --- Page 3 ---
> Understanding Conditions and Operators
> Comparison Operators
> Comparison operators compare two values and return a Boolean result (True
> result (True or False).

> **Chunk 3** (Index #55, Cosine Similarity: `0.7077`):
>
> == Equal to
> 5 == 5 → True
> != Not equal to
> 5 != 10 → True
> > Greater than
> 10 > 5 → True
> < Less than
> 5 < 10 → True
> # Example in Python
> if x > y:
> print("x is greater than y")
> Logical Operators
> Logical operators combine multiple conditional statements to form more 
> complex conditions.
> and Both conditions must be True
> True and True → True
> True and False → False
> or At least one condition must be True
> True or False → True
> False or False → False
> not Reverses the Boolean value
> not True → False
> not False → True
> --- Page 4 ---
> The Basic if Statement

---

## [Q057] Topic: Conditionals & Boolean Control Flow

**Target Learning Objective:** *Nested if conditional statements within code blocks*

### Generated MCQ
Consider the following Python code snippet:
```python
x = 5
y = 10
if x < y:
    if y > 7:
        print('Both conditions are true')
else:
    print('Outer else block')
```

**Choices:**
- **[A]** `Both conditions are true`
- **[B]** `Outer else block` **(CORRECT)**
- **[C]** `Inner else block`
- **[D]** `Syntax error`

**Explanation:** The code first checks if x < y, which is true (5 < 10). Then it checks the inner condition if y > 7, which is also true (10 > 7). Since both conditions are true, the message 'Both conditions are true' should be printed. The outer else block is not executed because all conditions in the nested if statement were met.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #59, Cosine Similarity: `0.7806`):
>
> An if statement placed inside another if statement.
> Refined control flow for complex decisions
> Multiple conditions evaluated sequentially
> if outer_condition:
> if inner_condition:
> execute_inner_block
> else:
> execute_outer_else
> else:
> execute_final_else
> Remember: Only executes innermost block when all outer conditions are True.
> Ternary Operator
> A concise way to write simple if-else statements in a single line.
> Compact syntax for simple conditions
> Readable code for straightforward assignments
> if age >= 18:
> status = "Adult"

> **Chunk 2** (Index #58, Cosine Similarity: `0.7675`):
>
> Python checks each condition one by one, from top to 
> top to bottom.
> As soon as it finds a condition that is True, it executes 
> executes the code block.
> If none are true, the else block (if present) is executed.
> executed.
> Visual Example
> score = 85
> if score >= 90:
> print("Grade: A")
> elif score >= 80:
> print("Grade: B")
> elif score >= 70:
> elif score >= 60:
> else:
> print("Grade: F")
> 85 >= 90
> False
> 85 >= 80
> True
> 85 >= 70
> Skipped
> 85 >= 60
> Skipped
> Output: "Grade: B"
> --- Page 7 ---
> Advanced Conditional Structures
> Nested if Statements

> **Chunk 3** (Index #56, Cosine Similarity: `0.7582`):
>
> How if Statements Work
> The if statement executes a block of code only if a given condition is true.
> Think of it as saying, "IF this is true, THEN do this."
> Syntax:
> if condition:
> # Code to execute if condition is True
> Important: The colon (:) is required!
> Examples
> Example 1:
> number = 10
> if number > 0:
> print("The number is positive.")
> print("This statement always executes.")
> Output:
> The number is positive.
> This statement always executes.
> --- Page 5 ---
> The if-else Statement
> Two-way Decision Making
> The `if-else` statement chooses between two actions based on a condition.

---

## [Q058] Topic: Conditionals & Boolean Control Flow

**Target Learning Objective:** *Chained comparison operators like 10 < x < 20 in Python*

### Generated MCQ
What is the output of the following Python code snippet?
```python
x = 15
if 10 < x < 20:
    print('In range')
else:
    print('Out of range')
```

**Choices:**
- **[A]** `In range` **(CORRECT)**
- **[B]** `Out of range`
- **[C]** `SyntaxError`
- **[D]** `TypeError`

**Explanation:** The code snippet uses chained comparison operators to check if `x` is between 10 and 20. Since `x = 15`, the condition `10 < x < 20` evaluates to True, so 'In range' is printed.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #30, Cosine Similarity: `0.7948`):
>
> print("x after x += 3:", x)
> x -= 2 # Equivalent to x = x - 2
> Comparison Operators
> Operators that compare two values and return a Boolean result (True or 
> False).
> Operator Meaning Example Result
> == Equal to 3 == 5 False
> != Not equal to 3 != 5 True
> > Greater than 3 > 5 False
> < Less than 3 < 5 True
> a = 7
> b = 5
> print("a == b is", a == b)
> print("a != b is", a != b)
> print("a > b is", a > b)
> print("a < b is", a < b)
> Python Programming Introduction Page 8 of 9
> --- Page 9 ---
> Logical Operators
> Boolean Logic Operations
> and
> Both conditions must be

> **Chunk 2** (Index #55, Cosine Similarity: `0.7855`):
>
> == Equal to
> 5 == 5 → True
> != Not equal to
> 5 != 10 → True
> > Greater than
> 10 > 5 → True
> < Less than
> 5 < 10 → True
> # Example in Python
> if x > y:
> print("x is greater than y")
> Logical Operators
> Logical operators combine multiple conditional statements to form more 
> complex conditions.
> and Both conditions must be True
> True and True → True
> True and False → False
> or At least one condition must be True
> True or False → True
> False or False → False
> not Reverses the Boolean value
> not True → False
> not False → True
> --- Page 4 ---
> The Basic if Statement

> **Chunk 3** (Index #54, Cosine Similarity: `0.7504`):
>
> creating dynamic and responsive applications.
> Real-World Analogy
> "If it is raining, I will take an umbrella."
> This simple thought process is exactly what conditional statements 
> statements enable computers to do.
> How Conditional Statements Work
> if condition:
> print("Do this")
> else:
> print("Do that")
> True → Execute ﬁrst block
> False → Execute else block
> --- Page 3 ---
> Understanding Conditions and Operators
> Comparison Operators
> Comparison operators compare two values and return a Boolean result (True
> result (True or False).

---

## [Q059] Topic: Conditionals & Boolean Control Flow

**Target Learning Objective:** *Ternary conditional expressions: value_if_true if condition else value_if_false*

### Generated MCQ
What is the output of the following Python code?
```python
age = 20
status = 'Adult' if age >= 18 else 'Minor'
print(status)
```

**Choices:**
- **[A]** `Adult` **(CORRECT)**
- **[B]** `Minor`
- **[C]** `Error: Invalid syntax`
- **[D]** `20`

**Explanation:** The ternary operator checks if `age >= 18`. Since `age` is 20, which is greater than or equal to 18, the condition is True. Therefore, 'Adult' is assigned to the variable `status`, and it is printed.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #59, Cosine Similarity: `0.8198`):
>
> An if statement placed inside another if statement.
> Refined control flow for complex decisions
> Multiple conditions evaluated sequentially
> if outer_condition:
> if inner_condition:
> execute_inner_block
> else:
> execute_outer_else
> else:
> execute_final_else
> Remember: Only executes innermost block when all outer conditions are True.
> Ternary Operator
> A concise way to write simple if-else statements in a single line.
> Compact syntax for simple conditions
> Readable code for straightforward assignments
> if age >= 18:
> status = "Adult"

> **Chunk 2** (Index #60, Cosine Similarity: `0.8037`):
>
> else:
> status = "Minor"
> status = "Adult" if age >= 
> 18 else "Minor"
> Caution: Avoid overuse or nesting too many ternary operators as it can reduce 
> readability.
> When to Use Each Structure
> Nested if: Complex logic with multiple dependencies Ternary: Simple assignments that can be expressed concisely
> --- Page 8 ---
> Practice and Summary
> Key Takeaways
> Conditional statements allow programs to make decisions
> Basic if statement executes code when a condition is true
> if-else provides two paths for true and false conditions

> **Chunk 3** (Index #57, Cosine Similarity: `0.7505`):
>
> condition.
> If condition is True, execute code after `if`.
> If condition is False, execute code after `else`.
> Exactly one code block will be executed.
> Syntax
> if condition:
> # Code to execute if True
> pass
> else:
> # Code to execute if False
> pass
> Example: Even or Odd
> number = 7
> if number % 2 == 0:
> print(f"{number} is even.")
> else:
> print(f"{number} is odd.")
> Output: "7 is odd."
> --- Page 6 ---
> The if-elif-else Statement
> Handling Multiple Conditions
> The if-elif-else statement allows you to check multiple 
> multiple conditions in a clear way.

---

## [Q060] Topic: Conditionals & Boolean Control Flow

**Target Learning Objective:** *Combining logical and comparison operators in complex conditions*

### Generated MCQ
What will be the output of the following Python code snippet?
```python
x = 5
y = 10
if x < y:
    print('x is less than y')
else:
    print('x is not less than y')
```

**Choices:**
- **[A]** `'x is less than y'` **(CORRECT)**
- **[B]** `'x is not less than y'`
- **[C]** `SyntaxError`
- **[D]** `RuntimeError`

**Explanation:** The code snippet checks if x is less than y. Since 5 is indeed less than 10, the condition evaluates to True and 'x is less than y' is printed.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #54, Cosine Similarity: `0.7599`):
>
> creating dynamic and responsive applications.
> Real-World Analogy
> "If it is raining, I will take an umbrella."
> This simple thought process is exactly what conditional statements 
> statements enable computers to do.
> How Conditional Statements Work
> if condition:
> print("Do this")
> else:
> print("Do that")
> True → Execute ﬁrst block
> False → Execute else block
> --- Page 3 ---
> Understanding Conditions and Operators
> Comparison Operators
> Comparison operators compare two values and return a Boolean result (True
> result (True or False).

> **Chunk 2** (Index #55, Cosine Similarity: `0.7383`):
>
> == Equal to
> 5 == 5 → True
> != Not equal to
> 5 != 10 → True
> > Greater than
> 10 > 5 → True
> < Less than
> 5 < 10 → True
> # Example in Python
> if x > y:
> print("x is greater than y")
> Logical Operators
> Logical operators combine multiple conditional statements to form more 
> complex conditions.
> and Both conditions must be True
> True and True → True
> True and False → False
> or At least one condition must be True
> True or False → True
> False or False → False
> not Reverses the Boolean value
> not True → False
> not False → True
> --- Page 4 ---
> The Basic if Statement

> **Chunk 3** (Index #30, Cosine Similarity: `0.7351`):
>
> print("x after x += 3:", x)
> x -= 2 # Equivalent to x = x - 2
> Comparison Operators
> Operators that compare two values and return a Boolean result (True or 
> False).
> Operator Meaning Example Result
> == Equal to 3 == 5 False
> != Not equal to 3 != 5 True
> > Greater than 3 > 5 False
> < Less than 3 < 5 True
> a = 7
> b = 5
> print("a == b is", a == b)
> print("a != b is", a != b)
> print("a > b is", a > b)
> print("a < b is", a < b)
> Python Programming Introduction Page 8 of 9
> --- Page 9 ---
> Logical Operators
> Boolean Logic Operations
> and
> Both conditions must be

---

## [Q061] Topic: Loops & Iteration

**Target Learning Objective:** *Basic for loop syntax iterating over elements of a list*

### Generated MCQ
Consider the following Python code snippet:
```python
numbers = [1, 2, 3, 4, 5]
total = 0
for num in numbers:
total += num
print(total)
```

**Choices:**
- **[A]** `The output will be 15` **(CORRECT)**
- **[B]** `The output will be 25`
- **[C]** `The output will be 0`
- **[D]** `The code will raise an error`

**Explanation:** Explanation:
The for loop iterates over each number in the list 'numbers'. For each iteration, it adds the current number to the variable 'total'. After all numbers have been processed, the final value of 'total' is printed. The sum of the numbers 1 through 5 is 15, so the correct output is 15.

Distractors:
A) 25: This would be the result if we were adding each number twice (e.g., 1+1 + 2+2 + ...).
B) 0: This would happen if 'total' was not initialized to 0 before the loop starts.
C) Error: The code is syntactically correct and will run without issues.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #63, Cosine Similarity: `0.8347`):
>
> Process collections of data efficiently
> Stirring a 
> mixture
> until it 
> thickens
> | Brushing 
> teeth
> every 
> morning
> | Adding numbers
> until sum reaches 
> target
> --- Page 3 ---
> The For Loop Basics
> What is a For Loop?
> A for loop is used to iterate over a sequence (like a 
> list, tuple, string, or range) and execute a block of 
> code for each item.
> Best used when you know how many times to repeat
> Automatically handles iteration over collections
> Basic Syntax
> # Basic syntax
> for item in sequence:
> # Code to execute for each item
> print(item)

> **Chunk 2** (Index #64, Cosine Similarity: `0.7748`):
>
> Examples
> Iterating over a List
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> apple banana cherry
> Iterating over a String
> word = "Python"
> for char in word:
> print(char)
> P y t h o n
> For loops are perfect when you need to process each item in a collection!
> --- Page 4 ---
> Using Range() with For Loops
> The range() function generates sequences of numbers for for loops.
> range(stop)
> Starts from 0, goes up to (but not 
> including) stop
> # range(5)
> for i in range(5):
> print(i)
> 0 1 2 3 4
> range(start, stop)

> **Chunk 3** (Index #70, Cosine Similarity: `0.7545`):
>
> Ideal for sequences (lists, strings, tuples)
> Automatically handles iteration variables
> While Loops
> Use when the number of iterations is unknown
> Continue until a condition becomes false
> Better for user input validation and event handling
> For Loop Example
> # Processing a list of items
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> Best choice: We know exactly how many items are in the list
> While Loop Example
> # Getting user input
> user_input = ""
> while user_input != "quit":
> user_input = input("Enter command: ")

---

## [Q062] Topic: Loops & Iteration

**Target Learning Objective:** *for loop iterating over characters of a string*

### Generated MCQ
Which of the following Python code snippets correctly iterates over each character in the string 'Python' and prints it? ```python
word = 'Python'
for char in word:
print(char)
```

**Choices:**
- **[A]** `Choice A text`
- **[B]** `Choice B text` **(CORRECT)**
- **[C]** `Choice C text`
- **[D]** `Choice D text`

**Explanation:** The correct code snippet iterates over each character in the string 'Python' using a for loop and prints it. The syntax is correct, and it will output: P y t h o n. Choice A might have an off-by-one error or incorrect variable name. Choice C could be missing the colon at the end of the for loop statement. Choice D might use a while loop instead of a for loop.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #63, Cosine Similarity: `0.7552`):
>
> Process collections of data efficiently
> Stirring a 
> mixture
> until it 
> thickens
> | Brushing 
> teeth
> every 
> morning
> | Adding numbers
> until sum reaches 
> target
> --- Page 3 ---
> The For Loop Basics
> What is a For Loop?
> A for loop is used to iterate over a sequence (like a 
> list, tuple, string, or range) and execute a block of 
> code for each item.
> Best used when you know how many times to repeat
> Automatically handles iteration over collections
> Basic Syntax
> # Basic syntax
> for item in sequence:
> # Code to execute for each item
> print(item)

> **Chunk 2** (Index #64, Cosine Similarity: `0.7504`):
>
> Examples
> Iterating over a List
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> apple banana cherry
> Iterating over a String
> word = "Python"
> for char in word:
> print(char)
> P y t h o n
> For loops are perfect when you need to process each item in a collection!
> --- Page 4 ---
> Using Range() with For Loops
> The range() function generates sequences of numbers for for loops.
> range(stop)
> Starts from 0, goes up to (but not 
> including) stop
> # range(5)
> for i in range(5):
> print(i)
> 0 1 2 3 4
> range(start, stop)

> **Chunk 3** (Index #70, Cosine Similarity: `0.7038`):
>
> Ideal for sequences (lists, strings, tuples)
> Automatically handles iteration variables
> While Loops
> Use when the number of iterations is unknown
> Continue until a condition becomes false
> Better for user input validation and event handling
> For Loop Example
> # Processing a list of items
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> Best choice: We know exactly how many items are in the list
> While Loop Example
> # Getting user input
> user_input = ""
> while user_input != "quit":
> user_input = input("Enter command: ")

---

## [Q063] Topic: Loops & Iteration

**Target Learning Objective:** *range() function with single argument range(stop) generating 0 to stop-1*

### Generated MCQ
What will be printed when the following code is executed?
```python
for i in range(5):
    print(i)
```

**Choices:**
- **[A]** `0 1 2 3 4` **(CORRECT)**
- **[B]** `1 2 3 4 5`
- **[C]** `0 2 4 6 8`
- **[D]** `-1 0 1 2 3`

**Explanation:** The range(5) function generates numbers starting from 0 up to, but not including, 5. Therefore, it will print 0 1 2 3 4.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #65, Cosine Similarity: `0.8075`):
>
> Starts from start, goes up to (but not 
> including) stop
> # range(2, 6)
> for i in range(2, 6):
> print(i)
> 2 3 4 5
> range(start, stop, step)
> Starts from start, goes up to stop, 
> incrementing by step
> # range(0, 10, 2)
> for i in range(0, 10, 2):
> print(i)
> 0 2 4 6 8
> Key Points
> • The stop parameter is exclusive - it's not included in the sequence
> • Range generates numbers on-demand, not storing all values in memory at once
> • Range works with negative steps for decreasing sequences
> 4/8
> --- Page 5 ---
> The While Loop Fundamentals

> **Chunk 2** (Index #64, Cosine Similarity: `0.7374`):
>
> Examples
> Iterating over a List
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> apple banana cherry
> Iterating over a String
> word = "Python"
> for char in word:
> print(char)
> P y t h o n
> For loops are perfect when you need to process each item in a collection!
> --- Page 4 ---
> Using Range() with For Loops
> The range() function generates sequences of numbers for for loops.
> range(stop)
> Starts from 0, goes up to (but not 
> including) stop
> # range(5)
> for i in range(5):
> print(i)
> 0 1 2 3 4
> range(start, stop)

> **Chunk 3** (Index #68, Cosine Similarity: `0.7129`):
>
> Fixed Example
> # Properly updated condition
> count = 1
> while count <= 5:
> print(count)
> count = count + 1
> # count updated, loop will end
> Infinite
> →
> Controlled
> --- Page 7 ---
> Loop Control with Break and Continue
> The break Statement
> Exits the loop immediately
> Terminates the entire loop
> Program continues after the loop
> # Example with for loop
> fruits = ["apple", "banana", "cherry", "orange"]
> for fruit in fruits:
> if fruit == "cherry":
> # Exit the loop when cherry is found
> break
> print(fruit)
> apple banana cherry orange Stops at cherry

---

## [Q064] Topic: Loops & Iteration

**Target Learning Objective:** *range() function with two arguments range(start, stop)*

### Generated MCQ
Consider the following Python code snippet:
```python
for i in range(3, 8):
    print(i)
```
What will be the output of this code?

**Choices:**
- **[A]** `1 2 3 4 5 6`
- **[B]** `3 4 5 6 7` **(CORRECT)**
- **[C]** `0 1 2 3 4 5 6 7`
- **[D]** `2 3 4 5 6 7 8`

**Explanation:** The range function starts from the start value (inclusive) and goes up to but does not include the stop value. Therefore, for i in range(3, 8), it will print numbers starting from 3 up to but not including 8.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #65, Cosine Similarity: `0.7801`):
>
> Starts from start, goes up to (but not 
> including) stop
> # range(2, 6)
> for i in range(2, 6):
> print(i)
> 2 3 4 5
> range(start, stop, step)
> Starts from start, goes up to stop, 
> incrementing by step
> # range(0, 10, 2)
> for i in range(0, 10, 2):
> print(i)
> 0 2 4 6 8
> Key Points
> • The stop parameter is exclusive - it's not included in the sequence
> • Range generates numbers on-demand, not storing all values in memory at once
> • Range works with negative steps for decreasing sequences
> 4/8
> --- Page 5 ---
> The While Loop Fundamentals

> **Chunk 2** (Index #64, Cosine Similarity: `0.7303`):
>
> Examples
> Iterating over a List
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> apple banana cherry
> Iterating over a String
> word = "Python"
> for char in word:
> print(char)
> P y t h o n
> For loops are perfect when you need to process each item in a collection!
> --- Page 4 ---
> Using Range() with For Loops
> The range() function generates sequences of numbers for for loops.
> range(stop)
> Starts from 0, goes up to (but not 
> including) stop
> # range(5)
> for i in range(5):
> print(i)
> 0 1 2 3 4
> range(start, stop)

> **Chunk 3** (Index #69, Cosine Similarity: `0.6941`):
>
> The continue Statement
> Skips the rest of the current iteration
> Continues to the next iteration
> Does not exit the loop entirely
> # Example with for loop
> numbers = [1, 2, 3, 4, 5, 6]
> for num in numbers:
> if num % 2 == 0: # If even
> # Skip printing for even numbers
> continue
> print(num)
> 1 2 3 Skips even numbers
> Both statements control loop execution based on conditionsUse break to exit early, continue to skip items
> --- Page 8 ---
> Choosing the Right Loop Type
> For Loops
> Use when you know the number of iterations in advance

---

## [Q065] Topic: Loops & Iteration

**Target Learning Objective:** *range() function with three arguments range(start, stop, step)*

### Generated MCQ
Consider the following Python code snippet:
```python
for i in range(0, 10, 2):
    print(i)
```
What will be the output of this code?

**Choices:**
- **[A]** `0 2 4 6 8` **(CORRECT)**
- **[B]** `0 1 2 3 4`
- **[C]** `1 2 3 4 5`
- **[D]** `2 4 6 8 10`

**Explanation:** The range function generates numbers starting from the start value (inclusive) up to but not including the stop value (exclusive), incrementing by the step. In this case, it starts at 0 and increments by 2 until it reaches 10. Therefore, the output will be '0 2 4 6 8'.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #65, Cosine Similarity: `0.7734`):
>
> Starts from start, goes up to (but not 
> including) stop
> # range(2, 6)
> for i in range(2, 6):
> print(i)
> 2 3 4 5
> range(start, stop, step)
> Starts from start, goes up to stop, 
> incrementing by step
> # range(0, 10, 2)
> for i in range(0, 10, 2):
> print(i)
> 0 2 4 6 8
> Key Points
> • The stop parameter is exclusive - it's not included in the sequence
> • Range generates numbers on-demand, not storing all values in memory at once
> • Range works with negative steps for decreasing sequences
> 4/8
> --- Page 5 ---
> The While Loop Fundamentals

> **Chunk 2** (Index #64, Cosine Similarity: `0.7184`):
>
> Examples
> Iterating over a List
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> apple banana cherry
> Iterating over a String
> word = "Python"
> for char in word:
> print(char)
> P y t h o n
> For loops are perfect when you need to process each item in a collection!
> --- Page 4 ---
> Using Range() with For Loops
> The range() function generates sequences of numbers for for loops.
> range(stop)
> Starts from 0, goes up to (but not 
> including) stop
> # range(5)
> for i in range(5):
> print(i)
> 0 1 2 3 4
> range(start, stop)

> **Chunk 3** (Index #69, Cosine Similarity: `0.6901`):
>
> The continue Statement
> Skips the rest of the current iteration
> Continues to the next iteration
> Does not exit the loop entirely
> # Example with for loop
> numbers = [1, 2, 3, 4, 5, 6]
> for num in numbers:
> if num % 2 == 0: # If even
> # Skip printing for even numbers
> continue
> print(num)
> 1 2 3 Skips even numbers
> Both statements control loop execution based on conditionsUse break to exit early, continue to skip items
> --- Page 8 ---
> Choosing the Right Loop Type
> For Loops
> Use when you know the number of iterations in advance

---

## [Q066] Topic: Loops & Iteration

**Target Learning Objective:** *Counting backwards using negative step in range()*

### Generated MCQ
Which of the following code snippets will correctly print numbers from 5 down to 1 using a for loop with a negative step in range()?

**Choices:**
- **[A]** ````python
for i in range(5, -1, -1):
    print(i)
````
- **[B]** ````python
for i in range(6, 0, -1):
    print(i)
```` **(CORRECT)**
- **[C]** ````python
for i in range(5, 0, -1):
    print(i)
````
- **[D]** ````python
for i in range(6, -1, -1):
    print(i)
````

**Explanation:** The correct answer is B. The range function starts at 6 and decrements by 1 until it reaches 0 (exclusive). This will print numbers from 5 down to 1. Option A has an incorrect stop value of -1, which would not include 0 in the sequence. Option C does not include 0 in the sequence because the range function is exclusive of the stop value. Option D starts at 6 and decrements by 1 until it reaches -1 (inclusive), which will print numbers from 5 down to -1.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #65, Cosine Similarity: `0.7545`):
>
> Starts from start, goes up to (but not 
> including) stop
> # range(2, 6)
> for i in range(2, 6):
> print(i)
> 2 3 4 5
> range(start, stop, step)
> Starts from start, goes up to stop, 
> incrementing by step
> # range(0, 10, 2)
> for i in range(0, 10, 2):
> print(i)
> 0 2 4 6 8
> Key Points
> • The stop parameter is exclusive - it's not included in the sequence
> • Range generates numbers on-demand, not storing all values in memory at once
> • Range works with negative steps for decreasing sequences
> 4/8
> --- Page 5 ---
> The While Loop Fundamentals

> **Chunk 2** (Index #64, Cosine Similarity: `0.6410`):
>
> Examples
> Iterating over a List
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> apple banana cherry
> Iterating over a String
> word = "Python"
> for char in word:
> print(char)
> P y t h o n
> For loops are perfect when you need to process each item in a collection!
> --- Page 4 ---
> Using Range() with For Loops
> The range() function generates sequences of numbers for for loops.
> range(stop)
> Starts from 0, goes up to (but not 
> including) stop
> # range(5)
> for i in range(5):
> print(i)
> 0 1 2 3 4
> range(start, stop)

> **Chunk 3** (Index #69, Cosine Similarity: `0.6334`):
>
> The continue Statement
> Skips the rest of the current iteration
> Continues to the next iteration
> Does not exit the loop entirely
> # Example with for loop
> numbers = [1, 2, 3, 4, 5, 6]
> for num in numbers:
> if num % 2 == 0: # If even
> # Skip printing for even numbers
> continue
> print(num)
> 1 2 3 Skips even numbers
> Both statements control loop execution based on conditionsUse break to exit early, continue to skip items
> --- Page 8 ---
> Choosing the Right Loop Type
> For Loops
> Use when you know the number of iterations in advance

---

## [Q067] Topic: Loops & Iteration

**Target Learning Objective:** *Basic while loop syntax and condition-controlled iteration*

### Generated MCQ
What is the output of the following Python code snippet?
```python
i = 0
while i < 5:
    print(i)
    i += 1
```

**Choices:**
- **[A]** `0 1 2 3 4` **(CORRECT)**
- **[B]** `0 1 2 3 4 5`
- **[C]** `-1 0 1 2 3`
- **[D]** `SyntaxError: invalid syntax`

**Explanation:** The code initializes `i` to 0 and enters a while loop that continues as long as `i` is less than 5. Inside the loop, it prints the current value of `i` and then increments `i` by 1. The loop runs exactly 5 times, printing 0 through 4.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #66, Cosine Similarity: `0.8629`):
>
> What is a While Loop?
> A while loop repeats execution as long as 
> a condition remains true. It's ideal when 
> you don't know how many iterations 
> you'll need.
> Basic Syntax
> # Basic Structure
> while condition:
> # Code to execute
> # Until condition becomes false
> Key Characteristics
> Continues until condition becomes false
> Useful for unknown iteration counts
> Requires condition update to avoid 
> infinite loops
> Example
> # Count down from 5 to 1
> count = 5
> while count > 0:
> print(count)
> count -= 1
> # Output: 5, 4, 3, 2, 1
> --- Page 6 ---

> **Chunk 2** (Index #70, Cosine Similarity: `0.7804`):
>
> Ideal for sequences (lists, strings, tuples)
> Automatically handles iteration variables
> While Loops
> Use when the number of iterations is unknown
> Continue until a condition becomes false
> Better for user input validation and event handling
> For Loop Example
> # Processing a list of items
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> Best choice: We know exactly how many items are in the list
> While Loop Example
> # Getting user input
> user_input = ""
> while user_input != "quit":
> user_input = input("Enter command: ")

> **Chunk 3** (Index #62, Cosine Similarity: `0.7613`):
>
> COURSE MODULE: 5 Python For and While Loops
> ======================================================================
> --- Page 1 ---
> Python For and While Loops
> A Beginner's Guide to Repetition in Programming
> # Simple for loop example
> for i in range(5):
> print("Hello, World!")
> # While loop example
> while i > 0:
> print(i)
> i -= 1
> --- Page 2 ---
> What Are Loops?
> Loops are fundamental structures in 
> programming that allow you to:
> Automate repetitive tasks
> Repeat actions multiple times
> Execute code blocks until conditions are met

---

## [Q068] Topic: Loops & Iteration

**Target Learning Objective:** *Updating loop counter variable in while loop to prevent infinite loops*

### Generated MCQ
Consider the following code snippet. What will be the output of this program?
```python
i = 0
while i < 5:
    print(i)
    # Missing line to update i
```

**Choices:**
- **[A]** `Output: 0 1 2 3 4` **(CORRECT)**
- **[B]** `Output: 0 1 2 3`
- **[C]** `Output: 0 1 2 3 4 5`
- **[D]** `Infinite loop starting from 0`

**Explanation:** The correct answer is A. The loop will run as long as i is less than 5, printing the value of i each time. Since the line to update i (i += 1) is missing, the condition i < 5 will always be true, leading to an infinite loop starting from 0. Choice B is incorrect because it stops before reaching 4. Choice C is incorrect because it includes an extra iteration that would make i equal to 5, which violates the condition in the while loop. Choice D is incorrect because the code does not have a syntax error that would cause an infinite loop.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #66, Cosine Similarity: `0.8033`):
>
> What is a While Loop?
> A while loop repeats execution as long as 
> a condition remains true. It's ideal when 
> you don't know how many iterations 
> you'll need.
> Basic Syntax
> # Basic Structure
> while condition:
> # Code to execute
> # Until condition becomes false
> Key Characteristics
> Continues until condition becomes false
> Useful for unknown iteration counts
> Requires condition update to avoid 
> infinite loops
> Example
> # Count down from 5 to 1
> count = 5
> while count > 0:
> print(count)
> count -= 1
> # Output: 5, 4, 3, 2, 1
> --- Page 6 ---

> **Chunk 2** (Index #67, Cosine Similarity: `0.7912`):
>
> Avoiding Infinite Loops
> What is an Infinite Loop?
> A loop that runs continuously without stopping 
> because its condition never becomes False.
> Common Causes
> Condition variable not updated within loop
> Logic error in condition expression
> Unintended side effects modifying loop condition
> Prevention Strategies
> Always update loop control variables
> Ensure loop condition will become false
> Test with simple cases first
> Problematic Example
> # This creates an infinite loop!
> age = 32
> while age > 18:
> print('You can vote')
> # age never updated

> **Chunk 3** (Index #70, Cosine Similarity: `0.7419`):
>
> Ideal for sequences (lists, strings, tuples)
> Automatically handles iteration variables
> While Loops
> Use when the number of iterations is unknown
> Continue until a condition becomes false
> Better for user input validation and event handling
> For Loop Example
> # Processing a list of items
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> Best choice: We know exactly how many items are in the list
> While Loop Example
> # Getting user input
> user_input = ""
> while user_input != "quit":
> user_input = input("Enter command: ")

---

## [Q069] Topic: Loops & Iteration

**Target Learning Objective:** *break statement terminating loop execution immediately*

### Generated MCQ
Which of the following code snippets will terminate the loop immediately when the condition is met?

**Choices:**
- **[A]** ````python
for i in range(10):
    if i == 5:
        continue
````
- **[B]** ````python
while True:
    user_input = input('Enter command: ')
    if user_input == 'quit':
        break
```` **(CORRECT)**
- **[C]** ````python
for i in range(10):
    if i == 5:
        print(i)
````
- **[D]** ````python
count = 0
while count < 10:
    count += 1
    if count == 5:
        continue
````

**Explanation:** The correct choice uses the `break` statement to terminate the loop immediately when the condition is met. The other choices either use `continue` (which skips the current iteration) or do not include a `break` statement.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #68, Cosine Similarity: `0.7929`):
>
> Fixed Example
> # Properly updated condition
> count = 1
> while count <= 5:
> print(count)
> count = count + 1
> # count updated, loop will end
> Infinite
> →
> Controlled
> --- Page 7 ---
> Loop Control with Break and Continue
> The break Statement
> Exits the loop immediately
> Terminates the entire loop
> Program continues after the loop
> # Example with for loop
> fruits = ["apple", "banana", "cherry", "orange"]
> for fruit in fruits:
> if fruit == "cherry":
> # Exit the loop when cherry is found
> break
> print(fruit)
> apple banana cherry orange Stops at cherry

> **Chunk 2** (Index #69, Cosine Similarity: `0.7146`):
>
> The continue Statement
> Skips the rest of the current iteration
> Continues to the next iteration
> Does not exit the loop entirely
> # Example with for loop
> numbers = [1, 2, 3, 4, 5, 6]
> for num in numbers:
> if num % 2 == 0: # If even
> # Skip printing for even numbers
> continue
> print(num)
> 1 2 3 Skips even numbers
> Both statements control loop execution based on conditionsUse break to exit early, continue to skip items
> --- Page 8 ---
> Choosing the Right Loop Type
> For Loops
> Use when you know the number of iterations in advance

> **Chunk 3** (Index #70, Cosine Similarity: `0.7070`):
>
> Ideal for sequences (lists, strings, tuples)
> Automatically handles iteration variables
> While Loops
> Use when the number of iterations is unknown
> Continue until a condition becomes false
> Better for user input validation and event handling
> For Loop Example
> # Processing a list of items
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> Best choice: We know exactly how many items are in the list
> While Loop Example
> # Getting user input
> user_input = ""
> while user_input != "quit":
> user_input = input("Enter command: ")

---

## [Q070] Topic: Loops & Iteration

**Target Learning Objective:** *continue statement skipping current iteration to next cycle*

### Generated MCQ
Which of the following code snippets will correctly print all odd numbers from 1 to 6 using a for loop, skipping even numbers?

**Choices:**
- **[A]** ````python
numbers = [1, 2, 3, 4, 5, 6]
for num in numbers:
    if num % 2 == 0:
        continue
    print(num)
```` **(CORRECT)**
- **[B]** ````python
numbers = [1, 2, 3, 4, 5, 6]
for num in numbers:
    if num % 2 == 0:
        break
    print(num)
````
- **[C]** ````python
numbers = [1, 2, 3, 4, 5, 6]
for num in numbers:
    if num % 2 != 0:
        continue
    print(num)
````
- **[D]** ````python
numbers = [1, 2, 3, 4, 5, 6]
for num in numbers:
    if num % 2 == 0:
        pass
    print(num)
````

**Explanation:** The correct choice uses the `continue` statement to skip even numbers and print only odd numbers. The distractors either use `break`, which exits the loop entirely, or `pass`, which does nothing and prints all numbers.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #69, Cosine Similarity: `0.8402`):
>
> The continue Statement
> Skips the rest of the current iteration
> Continues to the next iteration
> Does not exit the loop entirely
> # Example with for loop
> numbers = [1, 2, 3, 4, 5, 6]
> for num in numbers:
> if num % 2 == 0: # If even
> # Skip printing for even numbers
> continue
> print(num)
> 1 2 3 Skips even numbers
> Both statements control loop execution based on conditionsUse break to exit early, continue to skip items
> --- Page 8 ---
> Choosing the Right Loop Type
> For Loops
> Use when you know the number of iterations in advance

> **Chunk 2** (Index #66, Cosine Similarity: `0.7413`):
>
> What is a While Loop?
> A while loop repeats execution as long as 
> a condition remains true. It's ideal when 
> you don't know how many iterations 
> you'll need.
> Basic Syntax
> # Basic Structure
> while condition:
> # Code to execute
> # Until condition becomes false
> Key Characteristics
> Continues until condition becomes false
> Useful for unknown iteration counts
> Requires condition update to avoid 
> infinite loops
> Example
> # Count down from 5 to 1
> count = 5
> while count > 0:
> print(count)
> count -= 1
> # Output: 5, 4, 3, 2, 1
> --- Page 6 ---

> **Chunk 3** (Index #68, Cosine Similarity: `0.7124`):
>
> Fixed Example
> # Properly updated condition
> count = 1
> while count <= 5:
> print(count)
> count = count + 1
> # count updated, loop will end
> Infinite
> →
> Controlled
> --- Page 7 ---
> Loop Control with Break and Continue
> The break Statement
> Exits the loop immediately
> Terminates the entire loop
> Program continues after the loop
> # Example with for loop
> fruits = ["apple", "banana", "cherry", "orange"]
> for fruit in fruits:
> if fruit == "cherry":
> # Exit the loop when cherry is found
> break
> print(fruit)
> apple banana cherry orange Stops at cherry

---

## [Q071] Topic: Loops & Iteration

**Target Learning Objective:** *Accumulator variable pattern summing numbers inside a for loop*

### Generated MCQ
Consider the following Python code snippet:
```python
numbers = [1, 2, 3, 4, 5]
total = 0
for num in numbers:
    total += num
print(total)
```

**Choices:**
- **[A]** `The output will be 15` **(CORRECT)**
- **[B]** `The output will be 12`
- **[C]** `The output will be 10`
- **[D]** `The output will be 8`

**Explanation:** Explanation of the correct choice and distractors:
- The code is a simple for loop that iterates over a list of numbers and accumulates their sum in the variable `total`.
- The correct answer is 15 because 1 + 2 + 3 + 4 + 5 = 15.
- Choice B (12) is incorrect because it suggests an off-by-one error, where one number might be missed or counted twice.
- Choice C (10) and D (8) are incorrect as they represent plausible mistakes in summing the numbers correctly.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #63, Cosine Similarity: `0.7257`):
>
> Process collections of data efficiently
> Stirring a 
> mixture
> until it 
> thickens
> | Brushing 
> teeth
> every 
> morning
> | Adding numbers
> until sum reaches 
> target
> --- Page 3 ---
> The For Loop Basics
> What is a For Loop?
> A for loop is used to iterate over a sequence (like a 
> list, tuple, string, or range) and execute a block of 
> code for each item.
> Best used when you know how many times to repeat
> Automatically handles iteration over collections
> Basic Syntax
> # Basic syntax
> for item in sequence:
> # Code to execute for each item
> print(item)

> **Chunk 2** (Index #70, Cosine Similarity: `0.6754`):
>
> Ideal for sequences (lists, strings, tuples)
> Automatically handles iteration variables
> While Loops
> Use when the number of iterations is unknown
> Continue until a condition becomes false
> Better for user input validation and event handling
> For Loop Example
> # Processing a list of items
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> Best choice: We know exactly how many items are in the list
> While Loop Example
> # Getting user input
> user_input = ""
> while user_input != "quit":
> user_input = input("Enter command: ")

> **Chunk 3** (Index #69, Cosine Similarity: `0.6563`):
>
> The continue Statement
> Skips the rest of the current iteration
> Continues to the next iteration
> Does not exit the loop entirely
> # Example with for loop
> numbers = [1, 2, 3, 4, 5, 6]
> for num in numbers:
> if num % 2 == 0: # If even
> # Skip printing for even numbers
> continue
> print(num)
> 1 2 3 Skips even numbers
> Both statements control loop execution based on conditionsUse break to exit early, continue to skip items
> --- Page 8 ---
> Choosing the Right Loop Type
> For Loops
> Use when you know the number of iterations in advance

---

## [Q072] Topic: Loops & Iteration

**Target Learning Objective:** *Nested for loops and two-dimensional iteration flow*

### Generated MCQ
Consider the following Python code snippet:
```python
numbers = [1, 2, 3]
squares = []
for num in numbers:
    squares.append(num * num)
print(squares)
```
What will be the output of this code?

**Choices:**
- **[A]** `[1, 4, 9]` **(CORRECT)**
- **[B]** `[2, 4, 6]`
- **[C]** `[1, 3, 5]`
- **[D]** `[0, 0, 0]`

**Explanation:** The code iterates over the list `numbers` and appends the square of each number to the list `squares`. The correct output is `[1, 4, 9]`. Choice B is incorrect because it squares the numbers but adds them incorrectly. Choice C is incorrect because it increments the numbers instead of squaring them. Choice D is incorrect because it initializes an empty list and then appends zeros.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #63, Cosine Similarity: `0.7109`):
>
> Process collections of data efficiently
> Stirring a 
> mixture
> until it 
> thickens
> | Brushing 
> teeth
> every 
> morning
> | Adding numbers
> until sum reaches 
> target
> --- Page 3 ---
> The For Loop Basics
> What is a For Loop?
> A for loop is used to iterate over a sequence (like a 
> list, tuple, string, or range) and execute a block of 
> code for each item.
> Best used when you know how many times to repeat
> Automatically handles iteration over collections
> Basic Syntax
> # Basic syntax
> for item in sequence:
> # Code to execute for each item
> print(item)

> **Chunk 2** (Index #70, Cosine Similarity: `0.6721`):
>
> Ideal for sequences (lists, strings, tuples)
> Automatically handles iteration variables
> While Loops
> Use when the number of iterations is unknown
> Continue until a condition becomes false
> Better for user input validation and event handling
> For Loop Example
> # Processing a list of items
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> Best choice: We know exactly how many items are in the list
> While Loop Example
> # Getting user input
> user_input = ""
> while user_input != "quit":
> user_input = input("Enter command: ")

> **Chunk 3** (Index #66, Cosine Similarity: `0.6619`):
>
> What is a While Loop?
> A while loop repeats execution as long as 
> a condition remains true. It's ideal when 
> you don't know how many iterations 
> you'll need.
> Basic Syntax
> # Basic Structure
> while condition:
> # Code to execute
> # Until condition becomes false
> Key Characteristics
> Continues until condition becomes false
> Useful for unknown iteration counts
> Requires condition update to avoid 
> infinite loops
> Example
> # Count down from 5 to 1
> count = 5
> while count > 0:
> print(count)
> count -= 1
> # Output: 5, 4, 3, 2, 1
> --- Page 6 ---

---

## [Q073] Topic: Loops & Iteration

**Target Learning Objective:** *Iterating over dictionary keys and values using a for loop*

### Generated MCQ
What is the output of the following Python code snippet?
```python
my_dict = {'a': 1, 'b': 2, 'c': 3}
for key in my_dict:
    print(key)
```

**Choices:**
- **[A]** `a b c` **(CORRECT)**
- **[B]** `1 2 3`
- **[C]** `{'a': 1, 'b': 2, 'c': 3}`
- **[D]** `TypeError: 'dict' object is not iterable`

**Explanation:** The code iterates over the keys of the dictionary `my_dict` and prints each key. The correct output is 'a b c'. Choice B is incorrect because it attempts to print the values instead of the keys. Choice C is incorrect because it tries to print the entire dictionary, not its keys. Choice D is incorrect because there are no issues with iterating over a dictionary.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #63, Cosine Similarity: `0.7801`):
>
> Process collections of data efficiently
> Stirring a 
> mixture
> until it 
> thickens
> | Brushing 
> teeth
> every 
> morning
> | Adding numbers
> until sum reaches 
> target
> --- Page 3 ---
> The For Loop Basics
> What is a For Loop?
> A for loop is used to iterate over a sequence (like a 
> list, tuple, string, or range) and execute a block of 
> code for each item.
> Best used when you know how many times to repeat
> Automatically handles iteration over collections
> Basic Syntax
> # Basic syntax
> for item in sequence:
> # Code to execute for each item
> print(item)

> **Chunk 2** (Index #64, Cosine Similarity: `0.7472`):
>
> Examples
> Iterating over a List
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> apple banana cherry
> Iterating over a String
> word = "Python"
> for char in word:
> print(char)
> P y t h o n
> For loops are perfect when you need to process each item in a collection!
> --- Page 4 ---
> Using Range() with For Loops
> The range() function generates sequences of numbers for for loops.
> range(stop)
> Starts from 0, goes up to (but not 
> including) stop
> # range(5)
> for i in range(5):
> print(i)
> 0 1 2 3 4
> range(start, stop)

> **Chunk 3** (Index #50, Cosine Similarity: `0.7026`):
>
> Using as dictionary keys (if all elements are immutable)
> Use Sets When:
> You need a collection of unique items
> Order of elements is not important
> Performing mathematical set operations or membership testing
> Use Dictionaries When:
> Storing data as key-value pairs for fast lookups
> Representing structured data (similar to JSON objects)
> Creating lookup tables or counting frequency of items
> Page 13 of 14
> --- Page 14 ---
> Practice Exercises
> Exercise 1: List Manipulation
> Remove element at index 4 from the list, then insert it at the 2nd position and add it to

---

## [Q074] Topic: Loops & Iteration

**Target Learning Objective:** *Looping with enumerate() to track both index and item*

### Generated MCQ
Consider the following Python code snippet:
```python
fruits = ['apple', 'banana', 'cherry']
for i, fruit in enumerate(fruits):
    print(i, fruit)
```
What will be the output of this code?

**Choices:**
- **[A]** `0 apple
1 banana
2 cherry` **(CORRECT)**
- **[B]** `apple 0
banana 1
c cherry 2`
- **[C]** `apple banana cherry`
- **[D]** `SyntaxError: invalid syntax`

**Explanation:** The `enumerate()` function adds a counter to an iterable and returns it in a form of enumerate object. The output will be the index followed by the fruit name for each item in the list.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #70, Cosine Similarity: `0.6987`):
>
> Ideal for sequences (lists, strings, tuples)
> Automatically handles iteration variables
> While Loops
> Use when the number of iterations is unknown
> Continue until a condition becomes false
> Better for user input validation and event handling
> For Loop Example
> # Processing a list of items
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> Best choice: We know exactly how many items are in the list
> While Loop Example
> # Getting user input
> user_input = ""
> while user_input != "quit":
> user_input = input("Enter command: ")

> **Chunk 2** (Index #63, Cosine Similarity: `0.6844`):
>
> Process collections of data efficiently
> Stirring a 
> mixture
> until it 
> thickens
> | Brushing 
> teeth
> every 
> morning
> | Adding numbers
> until sum reaches 
> target
> --- Page 3 ---
> The For Loop Basics
> What is a For Loop?
> A for loop is used to iterate over a sequence (like a 
> list, tuple, string, or range) and execute a block of 
> code for each item.
> Best used when you know how many times to repeat
> Automatically handles iteration over collections
> Basic Syntax
> # Basic syntax
> for item in sequence:
> # Code to execute for each item
> print(item)

> **Chunk 3** (Index #37, Cosine Similarity: `0.6531`):
>
> # Elements from beginning to index 2: [10, 'hello']
> Visual Index Reference
> Page 4 of 14
> --- Page 5 ---
> Essential List Methods
> append(item)
> Adds an item to the end of the list.
> my_list = [1, 2, 3]
> my_list.append(4)
> print(my_list)  # Output: [1, 2, 3, 4]
> insert(index, item)
> Inserts an item at a specified position.
> my_list = [1, 2, 4]
> my_list.insert(2, 3)
> print(my_list)  # Output: [1, 2, 3, 4]
> remove(item)
> Removes the first occurrence of a specified item.
> my_list = [1, 2, 3, 2]
> my_list.remove(2)
> print(my_list)  # Output: [1, 3, 2]

---

## [Q075] Topic: Loops & Iteration

**Target Learning Objective:** *Finding maximum or minimum value in a list using a loop*

### Generated MCQ
What is the output of the following Python code snippet?
```python
numbers = [3, 5, 1, 8, 2]
max_value = None
for num in numbers:
    if max_value is None or num > max_value:
        max_value = num
print(max_value)
```

**Choices:**
- **[A]** `None`
- **[B]** `8` **(CORRECT)**
- **[C]** `1`
- **[D]** `2`

**Explanation:** The code initializes `max_value` to `None`. It then iterates through the list `numbers`. For each number, it checks if `max_value` is `None` or if the current number is greater than `max_value`. If either condition is true, it updates `max_value`. After iterating through all numbers, `max_value` will hold the maximum value in the list. Therefore, the output is 8.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #70, Cosine Similarity: `0.7258`):
>
> Ideal for sequences (lists, strings, tuples)
> Automatically handles iteration variables
> While Loops
> Use when the number of iterations is unknown
> Continue until a condition becomes false
> Better for user input validation and event handling
> For Loop Example
> # Processing a list of items
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> Best choice: We know exactly how many items are in the list
> While Loop Example
> # Getting user input
> user_input = ""
> while user_input != "quit":
> user_input = input("Enter command: ")

> **Chunk 2** (Index #63, Cosine Similarity: `0.7045`):
>
> Process collections of data efficiently
> Stirring a 
> mixture
> until it 
> thickens
> | Brushing 
> teeth
> every 
> morning
> | Adding numbers
> until sum reaches 
> target
> --- Page 3 ---
> The For Loop Basics
> What is a For Loop?
> A for loop is used to iterate over a sequence (like a 
> list, tuple, string, or range) and execute a block of 
> code for each item.
> Best used when you know how many times to repeat
> Automatically handles iteration over collections
> Basic Syntax
> # Basic syntax
> for item in sequence:
> # Code to execute for each item
> print(item)

> **Chunk 3** (Index #67, Cosine Similarity: `0.6946`):
>
> Avoiding Infinite Loops
> What is an Infinite Loop?
> A loop that runs continuously without stopping 
> because its condition never becomes False.
> Common Causes
> Condition variable not updated within loop
> Logic error in condition expression
> Unintended side effects modifying loop condition
> Prevention Strategies
> Always update loop control variables
> Ensure loop condition will become false
> Test with simple cases first
> Problematic Example
> # This creates an infinite loop!
> age = 32
> while age > 18:
> print('You can vote')
> # age never updated

---

## [Q076] Topic: Loops & Iteration

**Target Learning Objective:** *Counting occurrences of a specific element inside a loop*

### Generated MCQ
Which of the following code snippets correctly counts how many times the letter 'a' appears in a given string using a for loop? ```python
# code here
```

**Choices:**
- **[A]** `for char in 'banana':
    if char == 'A':
        count += 1`
- **[B]** `count = 0
for char in 'banana':
    if char == 'a':
        count += 1` **(CORRECT)**
- **[C]** `count = 0
while char in 'banana':
    if char == 'a':
        count += 1`
- **[D]** `for char in 'banana':
    if char == 'a':
        count++`

**Explanation:** The correct answer is B. The code initializes a counter to zero and iterates over each character in the string 'banana'. If the character is 'a', it increments the counter. This correctly counts how many times 'a' appears in the string. Choice A is incorrect because it checks for 'A' instead of 'a'. Choice C uses a while loop, which is not appropriate for this task since we know the length of the string. Choice D has a syntax error with 'count++', which should be 'count += 1' in Python.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #70, Cosine Similarity: `0.7358`):
>
> Ideal for sequences (lists, strings, tuples)
> Automatically handles iteration variables
> While Loops
> Use when the number of iterations is unknown
> Continue until a condition becomes false
> Better for user input validation and event handling
> For Loop Example
> # Processing a list of items
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> Best choice: We know exactly how many items are in the list
> While Loop Example
> # Getting user input
> user_input = ""
> while user_input != "quit":
> user_input = input("Enter command: ")

> **Chunk 2** (Index #63, Cosine Similarity: `0.7243`):
>
> Process collections of data efficiently
> Stirring a 
> mixture
> until it 
> thickens
> | Brushing 
> teeth
> every 
> morning
> | Adding numbers
> until sum reaches 
> target
> --- Page 3 ---
> The For Loop Basics
> What is a For Loop?
> A for loop is used to iterate over a sequence (like a 
> list, tuple, string, or range) and execute a block of 
> code for each item.
> Best used when you know how many times to repeat
> Automatically handles iteration over collections
> Basic Syntax
> # Basic syntax
> for item in sequence:
> # Code to execute for each item
> print(item)

> **Chunk 3** (Index #66, Cosine Similarity: `0.6975`):
>
> What is a While Loop?
> A while loop repeats execution as long as 
> a condition remains true. It's ideal when 
> you don't know how many iterations 
> you'll need.
> Basic Syntax
> # Basic Structure
> while condition:
> # Code to execute
> # Until condition becomes false
> Key Characteristics
> Continues until condition becomes false
> Useful for unknown iteration counts
> Requires condition update to avoid 
> infinite loops
> Example
> # Count down from 5 to 1
> count = 5
> while count > 0:
> print(count)
> count -= 1
> # Output: 5, 4, 3, 2, 1
> --- Page 6 ---

---

## [Q077] Topic: Loops & Iteration

**Target Learning Objective:** *Building a new filtered list inside a for loop with append()*

### Generated MCQ
Which of the following code snippets correctly filters out even numbers from a list using a for loop and appends them to a new list?

**Choices:**
- **[A]** ````python
new_list = []
for num in [1, 2, 3, 4]:
    if num % 2 == 0:
        new_list.append(num)
print(new_list)  # Output: [2, 4]
```` **(CORRECT)**
- **[B]** ````python
new_list = []
for num in range(1, 5):
    if num % 2 == 0:
        new_list.append(num)
print(new_list)  # Output: [2, 4]
````
- **[C]** ````python
new_list = []
for num in [1, 2, 3, 4]:
    if num % 2 != 0:
        new_list.append(num)
print(new_list)  # Output: [1, 3]
````
- **[D]** ````python
new_list = []
for num in range(5):
    if num % 2 == 0:
        new_list.append(num)
print(new_list)  # Output: [0, 2, 4]
````

**Explanation:** The correct answer filters out even numbers from the list [1, 2, 3, 4] and appends them to a new list. The first choice correctly implements this logic. The second choice uses range(5) instead of a specific list, which is not asked for in the question. The third choice filters out odd numbers instead of even ones. The fourth choice includes zero, which was not part of the original list.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #63, Cosine Similarity: `0.7037`):
>
> Process collections of data efficiently
> Stirring a 
> mixture
> until it 
> thickens
> | Brushing 
> teeth
> every 
> morning
> | Adding numbers
> until sum reaches 
> target
> --- Page 3 ---
> The For Loop Basics
> What is a For Loop?
> A for loop is used to iterate over a sequence (like a 
> list, tuple, string, or range) and execute a block of 
> code for each item.
> Best used when you know how many times to repeat
> Automatically handles iteration over collections
> Basic Syntax
> # Basic syntax
> for item in sequence:
> # Code to execute for each item
> print(item)

> **Chunk 2** (Index #37, Cosine Similarity: `0.6943`):
>
> # Elements from beginning to index 2: [10, 'hello']
> Visual Index Reference
> Page 4 of 14
> --- Page 5 ---
> Essential List Methods
> append(item)
> Adds an item to the end of the list.
> my_list = [1, 2, 3]
> my_list.append(4)
> print(my_list)  # Output: [1, 2, 3, 4]
> insert(index, item)
> Inserts an item at a specified position.
> my_list = [1, 2, 4]
> my_list.insert(2, 3)
> print(my_list)  # Output: [1, 2, 3, 4]
> remove(item)
> Removes the first occurrence of a specified item.
> my_list = [1, 2, 3, 2]
> my_list.remove(2)
> print(my_list)  # Output: [1, 3, 2]

> **Chunk 3** (Index #70, Cosine Similarity: `0.6677`):
>
> Ideal for sequences (lists, strings, tuples)
> Automatically handles iteration variables
> While Loops
> Use when the number of iterations is unknown
> Continue until a condition becomes false
> Better for user input validation and event handling
> For Loop Example
> # Processing a list of items
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> Best choice: We know exactly how many items are in the list
> While Loop Example
> # Getting user input
> user_input = ""
> while user_input != "quit":
> user_input = input("Enter command: ")

---

## [Q078] Topic: Loops & Iteration

**Target Learning Objective:** *while loop with break condition and user input simulation*

### Generated MCQ
What will be the output of the following Python code snippet?
```python
user_input = ""
while user_input != "quit":
    user_input = input("Enter command: ")
    if user_input == "stop":
        break
print("Loop ended")
```

**Choices:**
- **[A]** `The program will print 'Loop ended' and then wait for the next command.`
- **[B]** `The program will keep asking for commands until 'quit' is entered.` **(CORRECT)**
- **[C]** `The program will enter an infinite loop because of the missing condition update.`
- **[D]** `The program will print 'Loop ended' and then continue to ask for commands indefinitely.`

**Explanation:** Explanation: The code uses a while loop that continues until the user enters 'quit'. Inside the loop, there is an if statement that checks if the input is 'stop'. If it is, the break statement is executed, which exits the loop immediately. Therefore, the correct output will be 'Loop ended' followed by the prompt for the next command.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #66, Cosine Similarity: `0.7686`):
>
> What is a While Loop?
> A while loop repeats execution as long as 
> a condition remains true. It's ideal when 
> you don't know how many iterations 
> you'll need.
> Basic Syntax
> # Basic Structure
> while condition:
> # Code to execute
> # Until condition becomes false
> Key Characteristics
> Continues until condition becomes false
> Useful for unknown iteration counts
> Requires condition update to avoid 
> infinite loops
> Example
> # Count down from 5 to 1
> count = 5
> while count > 0:
> print(count)
> count -= 1
> # Output: 5, 4, 3, 2, 1
> --- Page 6 ---

> **Chunk 2** (Index #70, Cosine Similarity: `0.7541`):
>
> Ideal for sequences (lists, strings, tuples)
> Automatically handles iteration variables
> While Loops
> Use when the number of iterations is unknown
> Continue until a condition becomes false
> Better for user input validation and event handling
> For Loop Example
> # Processing a list of items
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> Best choice: We know exactly how many items are in the list
> While Loop Example
> # Getting user input
> user_input = ""
> while user_input != "quit":
> user_input = input("Enter command: ")

> **Chunk 3** (Index #68, Cosine Similarity: `0.7538`):
>
> Fixed Example
> # Properly updated condition
> count = 1
> while count <= 5:
> print(count)
> count = count + 1
> # count updated, loop will end
> Infinite
> →
> Controlled
> --- Page 7 ---
> Loop Control with Break and Continue
> The break Statement
> Exits the loop immediately
> Terminates the entire loop
> Program continues after the loop
> # Example with for loop
> fruits = ["apple", "banana", "cherry", "orange"]
> for fruit in fruits:
> if fruit == "cherry":
> # Exit the loop when cherry is found
> break
> print(fruit)
> apple banana cherry orange Stops at cherry

---

## [Q079] Topic: Loops & Iteration

**Target Learning Objective:** *Execution tracing: predicting final variable state after nested loops*

### Generated MCQ
Consider the following Python code snippet:
```python
numbers = [1, 2, 3, 4, 5]
count = 0
for num in numbers:
    if num % 2 == 0:
        continue
count += 1
print(count)
```

**Choices:**
- **[A]** `The output will be 5`
- **[B]** `The output will be 3` **(CORRECT)**
- **[C]** `The output will be 2`
- **[D]** `The code will enter an infinite loop`

**Explanation:** Explanation: The for loop iterates over the list `numbers`. When it encounters an even number (2 and 4), the continue statement is executed, skipping the increment of `count` for those numbers. Therefore, only the odd numbers (1, 3, 5) contribute to the final value of `count`, which is incremented three times. The correct output is 3.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #70, Cosine Similarity: `0.7278`):
>
> Ideal for sequences (lists, strings, tuples)
> Automatically handles iteration variables
> While Loops
> Use when the number of iterations is unknown
> Continue until a condition becomes false
> Better for user input validation and event handling
> For Loop Example
> # Processing a list of items
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> Best choice: We know exactly how many items are in the list
> While Loop Example
> # Getting user input
> user_input = ""
> while user_input != "quit":
> user_input = input("Enter command: ")

> **Chunk 2** (Index #66, Cosine Similarity: `0.7145`):
>
> What is a While Loop?
> A while loop repeats execution as long as 
> a condition remains true. It's ideal when 
> you don't know how many iterations 
> you'll need.
> Basic Syntax
> # Basic Structure
> while condition:
> # Code to execute
> # Until condition becomes false
> Key Characteristics
> Continues until condition becomes false
> Useful for unknown iteration counts
> Requires condition update to avoid 
> infinite loops
> Example
> # Count down from 5 to 1
> count = 5
> while count > 0:
> print(count)
> count -= 1
> # Output: 5, 4, 3, 2, 1
> --- Page 6 ---

> **Chunk 3** (Index #69, Cosine Similarity: `0.6834`):
>
> The continue Statement
> Skips the rest of the current iteration
> Continues to the next iteration
> Does not exit the loop entirely
> # Example with for loop
> numbers = [1, 2, 3, 4, 5, 6]
> for num in numbers:
> if num % 2 == 0: # If even
> # Skip printing for even numbers
> continue
> print(num)
> 1 2 3 Skips even numbers
> Both statements control loop execution based on conditionsUse break to exit early, continue to skip items
> --- Page 8 ---
> Choosing the Right Loop Type
> For Loops
> Use when you know the number of iterations in advance

---

## [Q080] Topic: Loops & Iteration

**Target Learning Objective:** *Combining while loops with boolean flag variables*

### Generated MCQ
Consider the following Python code snippet:
```python
found = False
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num == 3:
        found = True
        break
print(found)
```

**Choices:**
- **[A]** `True`
- **[B]** `False` **(CORRECT)**
- **[C]** `SyntaxError`
- **[D]** `Infinite Loop`

**Explanation:** The code initializes a boolean flag `found` to False. It then iterates over the list `numbers`. When it encounters the number 3, it sets `found` to True and breaks out of the loop. The final print statement outputs the value of `found`, which is False.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #66, Cosine Similarity: `0.6901`):
>
> What is a While Loop?
> A while loop repeats execution as long as 
> a condition remains true. It's ideal when 
> you don't know how many iterations 
> you'll need.
> Basic Syntax
> # Basic Structure
> while condition:
> # Code to execute
> # Until condition becomes false
> Key Characteristics
> Continues until condition becomes false
> Useful for unknown iteration counts
> Requires condition update to avoid 
> infinite loops
> Example
> # Count down from 5 to 1
> count = 5
> while count > 0:
> print(count)
> count -= 1
> # Output: 5, 4, 3, 2, 1
> --- Page 6 ---

> **Chunk 2** (Index #70, Cosine Similarity: `0.6694`):
>
> Ideal for sequences (lists, strings, tuples)
> Automatically handles iteration variables
> While Loops
> Use when the number of iterations is unknown
> Continue until a condition becomes false
> Better for user input validation and event handling
> For Loop Example
> # Processing a list of items
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> Best choice: We know exactly how many items are in the list
> While Loop Example
> # Getting user input
> user_input = ""
> while user_input != "quit":
> user_input = input("Enter command: ")

> **Chunk 3** (Index #63, Cosine Similarity: `0.6256`):
>
> Process collections of data efficiently
> Stirring a 
> mixture
> until it 
> thickens
> | Brushing 
> teeth
> every 
> morning
> | Adding numbers
> until sum reaches 
> target
> --- Page 3 ---
> The For Loop Basics
> What is a For Loop?
> A for loop is used to iterate over a sequence (like a 
> list, tuple, string, or range) and execute a block of 
> code for each item.
> Best used when you know how many times to repeat
> Automatically handles iteration over collections
> Basic Syntax
> # Basic syntax
> for item in sequence:
> # Code to execute for each item
> print(item)

---

## [Q081] Topic: Functions & Scope

**Target Learning Objective:** *Defining functions using def keyword and calling functions*

### Generated MCQ
What will be the output of the following Python code snippet?
```python
def greet(name):
    return f'Hello, {name}!'

def main():
    print(greet('Alice'))

if __name__ == '__main__':
    main()
```

**Choices:**
- **[A]** `Hello, Alice!` **(CORRECT)**
- **[B]** `Hello, Bob!`
- **[C]** `NameError: name 'Alice' is not defined`
- **[D]** `TypeError: greet() missing 1 required positional argument: 'name'`

**Explanation:** The code defines a function `greet` that takes a name as an argument and returns a greeting string. The `main` function calls `greet('Alice')`, which correctly substitutes 'Alice' into the greeting template, resulting in 'Hello, Alice!'. Choice B is incorrect because it passes 'Bob' instead of 'Alice'. Choice C is incorrect because there are no undefined names in the code. Choice D is incorrect because all arguments required by the function are provided.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #74, Cosine Similarity: `0.7514`):
>
> function name and expected inputs.
> Maintainability
> Code structured with functions is easier to 
> understand, correct, enhance, and adapt over 
> time. Changes can be isolated to specific 
> functions.
> Testability
> Functions with clear arguments and explicit 
> return values are easier to test, ensuring they 
> behave as expected.
> Functions are the building blocks of well-
> structured programs
> 3/13
> --- Page 4 ---
> Basic Function Syntax
> Function Definition
> Use the def keyword to define a function:
> def function_name(parameter1,

> **Chunk 2** (Index #72, Cosine Similarity: `0.7377`):
>
> Report Date: 2025-12-23
> --- Page 2 ---
> What is a Function?
> Definition
> A named, self-contained block of code designed to perform a 
> specific task
> Only runs when it is called
> Can optionally return data as a result
> # A simple function definition
> def greet():
> print("Hello from a function!")
> # Calling the function
> greet() # Output: "Hello from a function!"
> Types of Functions
> Built-in Functions
> print() len()
> type() int()
> User-defined Functions
> Created by developers to address specific needs
> def calculate_area(length, width):

> **Chunk 3** (Index #84, Cosine Similarity: `0.6801`):
>
> def log_function_call (func):
> def wrapper(*args, **kwargs):
> # Before function call
> print(f"Calling function: {func.__name__}")
> result = func(*args, **kwargs)
> # After function call
> print(f"Function {func.__name__} finished. Result: 
> {result}")
> return result
> return wrapper
> # Function with decorator
> @log_function_call
> def add(a, b):
> return a + b
> @log_function_call is syntactic sugar for add = log_function_call(add)
> 10/13
> --- Page 11 ---
> Generators
> What are Generators?
> Special type of iterable that produces values one at a time

---

## [Q082] Topic: Functions & Scope

**Target Learning Objective:** *Function parameters and passing positional arguments*

### Generated MCQ
What is the output of the following code snippet?
```python
def greet(name):
    return f'Hello, {name}!'

result = greet('Alice')
print(result)
```

**Choices:**
- **[A]** `Hello, Alice!` **(CORRECT)**
- **[B]** `Hello, Bob!`
- **[C]** `Hello, !`
- **[D]** `NameError: name 'name' is not defined`

**Explanation:** The function `greet` takes a parameter `name` and returns a greeting string. When calling `greet('Alice')`, the argument 'Alice' is passed to the parameter `name`. The function correctly substitutes 'Alice' into the greeting template, resulting in 'Hello, Alice!'. Choice B has an incorrect name, Choice C is missing the name entirely, and Choice D indicates a NameError which does not occur.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #75, Cosine Similarity: `0.7028`):
>
> parameter2):
> # Function body
> pass
> • Function name should be descriptive
> • Parameters are placeholders
> • Use meaningful parameter names
> Function Calling
> To execute a function, call it by name:
> # Calling a function
> function_name(argument1, argument2)
> • Use function name followed by parentheses
> • Provide arguments matching parameters
> • Function executes when called
> Parameters vs Arguments
> Parameters
> Placeholders in 
> function definition
> def 
> greet(name)
> :
> Arguments
> Actual values when 
> calling
> greet("Alice")
> Example:
> def greet(name):

> **Chunk 2** (Index #77, Cosine Similarity: `0.6968`):
>
> Values are packed into a tuple
> Can be unpacked during 
> assignment
> def get_coordinates():
> x = 10
> y = 20
> return x, y
> coords = get_coordinates()
> # Returns (10, 20)
> Implicit None
> If no return statement is provided:
> Function implicitly returns 
> None
> Equivalent to return None
> def do_nothing():
> pass
> result = do_nothing()
> # Returns None
> 5/13
> --- Page 6 ---
> Function Arguments Types
> Feature Positional Arguments Keyword Arguments
> Order Strict order matching parameters Order does not matter; arguments are 
> named
> Readability Can be less readable with many args Enhances readability by naming

> **Chunk 3** (Index #74, Cosine Similarity: `0.6658`):
>
> function name and expected inputs.
> Maintainability
> Code structured with functions is easier to 
> understand, correct, enhance, and adapt over 
> time. Changes can be isolated to specific 
> functions.
> Testability
> Functions with clear arguments and explicit 
> return values are easier to test, ensuring they 
> behave as expected.
> Functions are the building blocks of well-
> structured programs
> 3/13
> --- Page 4 ---
> Basic Function Syntax
> Function Definition
> Use the def keyword to define a function:
> def function_name(parameter1,

---

## [Q083] Topic: Functions & Scope

**Target Learning Objective:** *return statement returning a computed value to caller*

### Generated MCQ
Consider the following Python function:
```python
def calculate_average(numbers):
    return sum(numbers) / len(numbers)

average = calculate_average([1, 2, 3, 4, 5])
print(average)
```
What will be the output of this code?

**Choices:**
- **[A]** `10.0`
- **[B]** `3.0` **(CORRECT)**
- **[C]** `2.5`
- **[D]** `5.0`

**Explanation:** The function `calculate_average` computes the average of a list of numbers by summing them up and dividing by the count. The input list `[1, 2, 3, 4, 5]` has a sum of 15 and a length of 5, so the average is 15 / 5 = 3.0.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #76, Cosine Similarity: `0.7385`):
>
> print(f"Hello, {name}!")
> greet("Alice") # Output: Hello, 
> Alice!
> 4/13
> --- Page 5 ---
> The Return Statement
> Purpose
> The return statement serves two 
> primary purposes:
> Sends a value back to the caller
> Immediately terminates 
> function execution
> def add(a, b):
> result = a + b
> return result
> sum_result = add(3, 5)
> Single Value
> Functions can return any data 
> type:
> Numbers
> Strings
> Lists, dictionaries, etc.
> def square(number):
> return number * number
> result = square(5)
> # Returns 25
> Multiple Values
> Functions can return multiple 
> values:

> **Chunk 2** (Index #87, Cosine Similarity: `0.6458`):
>
> # Function implementation
> return sum(numbers) / len(numbers)
> Best Practice: Combine docstrings and type annotations
> 12/13
> --- Page 13 ---
> Real-World Applications
> Data Analysis
> Functions clean, transform, and analyze datasets
> def calculate_stats(data):
> return sum(data)/len(data)
> Web Development
> Functions process requests and return responses
> def handle_request():
> return render_template('index.html')
> Automation
> Functions automate repetitive tasks
> def rename_files(pattern):
> for file in os.listdir():
> os.rename(file, file.replace(pattern,

> **Chunk 3** (Index #84, Cosine Similarity: `0.6378`):
>
> def log_function_call (func):
> def wrapper(*args, **kwargs):
> # Before function call
> print(f"Calling function: {func.__name__}")
> result = func(*args, **kwargs)
> # After function call
> print(f"Function {func.__name__} finished. Result: 
> {result}")
> return result
> return wrapper
> # Function with decorator
> @log_function_call
> def add(a, b):
> return a + b
> @log_function_call is syntactic sugar for add = log_function_call(add)
> 10/13
> --- Page 11 ---
> Generators
> What are Generators?
> Special type of iterable that produces values one at a time

---

## [Q084] Topic: Functions & Scope

**Target Learning Objective:** *Difference between print() displaying output and return producing a value*

### Generated MCQ
What is the output of the following Python code?
```python
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))
```

**Choices:**
- **[A]** `Hello, Alice!` **(CORRECT)**
- **[B]** `Hello, !`
- **[C]** `None`
- **[D]** `TypeError: greet() missing 1 required positional argument: 'name'`

**Explanation:** The function `greet` is defined to return a string that includes the name passed as an argument. When calling `print(greet("Alice"))`, it correctly substitutes "Alice" into the string and returns 'Hello, Alice!'. Choice A is correct. Choice B is incorrect because the function does not return just 'Hello, !' but the full greeting. Choice C is incorrect because the function does not return None; it returns a string. Choice D is incorrect because there are no missing arguments when calling the function.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #76, Cosine Similarity: `0.7279`):
>
> print(f"Hello, {name}!")
> greet("Alice") # Output: Hello, 
> Alice!
> 4/13
> --- Page 5 ---
> The Return Statement
> Purpose
> The return statement serves two 
> primary purposes:
> Sends a value back to the caller
> Immediately terminates 
> function execution
> def add(a, b):
> result = a + b
> return result
> sum_result = add(3, 5)
> Single Value
> Functions can return any data 
> type:
> Numbers
> Strings
> Lists, dictionaries, etc.
> def square(number):
> return number * number
> result = square(5)
> # Returns 25
> Multiple Values
> Functions can return multiple 
> values:

> **Chunk 2** (Index #72, Cosine Similarity: `0.6397`):
>
> Report Date: 2025-12-23
> --- Page 2 ---
> What is a Function?
> Definition
> A named, self-contained block of code designed to perform a 
> specific task
> Only runs when it is called
> Can optionally return data as a result
> # A simple function definition
> def greet():
> print("Hello from a function!")
> # Calling the function
> greet() # Output: "Hello from a function!"
> Types of Functions
> Built-in Functions
> print() len()
> type() int()
> User-defined Functions
> Created by developers to address specific needs
> def calculate_area(length, width):

> **Chunk 3** (Index #47, Cosine Similarity: `0.6136`):
>
> print(student.get("email")) # Output: None
> # Using .get() with a default value
> print(student.get("phone", "N/A")) # Output: N/A
> Dictionary Iteration
> .keys()
> Iterates through keys
> .values()
> Iterates through values
> .items()
> Iterates through key-
> value pairs
> # Iterating through keys
> grades = {"math": 90, "science": 85}
> for subject in grades.keys():
> print(subject)
> # Iterating through key-value pairs
> for subject, score in grades.items():
> print(f"{subject}: {score}")
> Page 11 of 14
> --- Page 12 ---
> Data Structure Comparison

---

## [Q085] Topic: Functions & Scope

**Target Learning Objective:** *Functions without explicit return returning None by default*

### Generated MCQ
What is the output of the following Python code snippet?
```python
def greet(name):
    print(f'Hello, {name}!')
result = greet('Alice')
print(result)
```

**Choices:**
- **[A]** `None` **(CORRECT)**
- **[B]** `'Hello, Alice!'`
- **[C]** `TypeError: greet() missing 1 required positional argument: 'name'`
- **[D]** `SyntaxError: invalid syntax`

**Explanation:** The function `greet` is defined to print a greeting message but does not return anything. When called with an argument, it prints the message and then implicitly returns None.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #77, Cosine Similarity: `0.6830`):
>
> Values are packed into a tuple
> Can be unpacked during 
> assignment
> def get_coordinates():
> x = 10
> y = 20
> return x, y
> coords = get_coordinates()
> # Returns (10, 20)
> Implicit None
> If no return statement is provided:
> Function implicitly returns 
> None
> Equivalent to return None
> def do_nothing():
> pass
> result = do_nothing()
> # Returns None
> 5/13
> --- Page 6 ---
> Function Arguments Types
> Feature Positional Arguments Keyword Arguments
> Order Strict order matching parameters Order does not matter; arguments are 
> named
> Readability Can be less readable with many args Enhances readability by naming

> **Chunk 2** (Index #80, Cosine Similarity: `0.6546`):
>
> Avoid using mutable objects (lists, dictionaries) as default values:
> # DON'T DO THIS
> def add_item(item, items=[]): # Risky!
> items.append(item)
> return items
> Recommended Approach
> Use N o neas default and initialize inside function:
> # DO THIS INSTEAD
> def add_item(item, items=None):
> if items is None :
> items = []
> items.append(item)
> return items
> 7/13
> --- Page 8 ---
> Arbitrary Arguments
> *args
> Allows a function to accept an arbitrary number of positional 
> arguments
> Arguments are collected into a tuple
> The * operator is the unpacking operator

> **Chunk 3** (Index #74, Cosine Similarity: `0.6429`):
>
> function name and expected inputs.
> Maintainability
> Code structured with functions is easier to 
> understand, correct, enhance, and adapt over 
> time. Changes can be isolated to specific 
> functions.
> Testability
> Functions with clear arguments and explicit 
> return values are easier to test, ensuring they 
> behave as expected.
> Functions are the building blocks of well-
> structured programs
> 3/13
> --- Page 4 ---
> Basic Function Syntax
> Function Definition
> Use the def keyword to define a function:
> def function_name(parameter1,

---

## [Q086] Topic: Functions & Scope

**Target Learning Objective:** *Returning multiple values as a tuple from a function*

### Generated MCQ
Which of the following functions correctly returns a tuple containing two values?

**Choices:**
- **[A]** ````python
def get_values():
    x = 10
    y = 20
    return x, y
```` **(CORRECT)**
- **[B]** ````python
def get_values():
    x = 10
    y = 20
    return (x)
````
- **[C]** ````python
def get_values():
    x = 10
    y = 20
    return [x, y]
````
- **[D]** ````python
def get_values():
    x = 10
    y = 20
    return x + y
````

**Explanation:** The correct function returns a tuple containing two values, `x` and `y`. The second option incorrectly wraps the return value in parentheses, making it a single-element tuple. The third option returns a list instead of a tuple. The fourth option attempts to add the values together rather than returning them as a tuple.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #76, Cosine Similarity: `0.7021`):
>
> print(f"Hello, {name}!")
> greet("Alice") # Output: Hello, 
> Alice!
> 4/13
> --- Page 5 ---
> The Return Statement
> Purpose
> The return statement serves two 
> primary purposes:
> Sends a value back to the caller
> Immediately terminates 
> function execution
> def add(a, b):
> result = a + b
> return result
> sum_result = add(3, 5)
> Single Value
> Functions can return any data 
> type:
> Numbers
> Strings
> Lists, dictionaries, etc.
> def square(number):
> return number * number
> result = square(5)
> # Returns 25
> Multiple Values
> Functions can return multiple 
> values:

> **Chunk 2** (Index #77, Cosine Similarity: `0.6724`):
>
> Values are packed into a tuple
> Can be unpacked during 
> assignment
> def get_coordinates():
> x = 10
> y = 20
> return x, y
> coords = get_coordinates()
> # Returns (10, 20)
> Implicit None
> If no return statement is provided:
> Function implicitly returns 
> None
> Equivalent to return None
> def do_nothing():
> pass
> result = do_nothing()
> # Returns None
> 5/13
> --- Page 6 ---
> Function Arguments Types
> Feature Positional Arguments Keyword Arguments
> Order Strict order matching parameters Order does not matter; arguments are 
> named
> Readability Can be less readable with many args Enhances readability by naming

> **Chunk 3** (Index #81, Cosine Similarity: `0.6434`):
>
> def sum_all(*numbers):
> return sum (numbers)
> result = sum_all(1, 2, 3, 4, 5)
> Output: 15
> **kwargs
> Allows a function to accept an arbitrary number of keyword 
> arguments
> Arguments are collected into a dictionary
> The ** operator unpacks keyword arguments
> def display_info(**details):
> for key, value in details.items():
> print(f"{key}: {value}")
> display_info(name="Alice", age=30)
> Output:
> name: Alice
> age: 30
> 8/13
> --- Page 9 ---
> Lambda Functions
> Definition & Syntax
> Small, anonymous functions defined with the lambda keyword
> Can take any number of arguments

---

## [Q087] Topic: Functions & Scope

**Target Learning Objective:** *Default parameter values and optional arguments in function definition*

### Generated MCQ
Consider the following Python function:

```python
def add_item(item, items=[]):
    items.append(item)
    return items
```
What is the output of `add_item('apple')` followed by `add_item('banana')`?


**Choices:**
- **[A]** `[apple, banana]` **(CORRECT)**
- **[B]** `[banana, apple]`
- **[C]** `[apple]`
- **[D]** `[banana]`

**Explanation:** The function `add_item` uses a mutable default argument `items=[]`. When the function is called for the first time with 'apple', it appends 'apple' to the list. The same list is then used when calling the function again with 'banana', appending 'banana' to the existing list. Thus, the final output is [apple, banana].

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #79, Cosine Similarity: `0.7224`):
>
> quantity=6, item="bananas")
> # Output: 6 bananas cost $4.44
> Best practice: Improves readability
> 6/13
> --- Page 7 ---
> Default Arguments
> Using Default Arguments
> Parameters with predefined values if no argument is provided
> Makes parameters optional in function calls
> # Function with default parameters
> def greet(name="World", message="Hello"):
> print(f"{message}, {name}!")
> greet() # Output: "Hello, World!"
> greet("Alice") # Output: "Hello, Alice!"
> greet("Bob", "Hi") # Output: "Hi, Bob!"
> Best Practices
> Mutable Default Arguments

> **Chunk 2** (Index #74, Cosine Similarity: `0.6999`):
>
> function name and expected inputs.
> Maintainability
> Code structured with functions is easier to 
> understand, correct, enhance, and adapt over 
> time. Changes can be isolated to specific 
> functions.
> Testability
> Functions with clear arguments and explicit 
> return values are easier to test, ensuring they 
> behave as expected.
> Functions are the building blocks of well-
> structured programs
> 3/13
> --- Page 4 ---
> Basic Function Syntax
> Function Definition
> Use the def keyword to define a function:
> def function_name(parameter1,

> **Chunk 3** (Index #80, Cosine Similarity: `0.6655`):
>
> Avoid using mutable objects (lists, dictionaries) as default values:
> # DON'T DO THIS
> def add_item(item, items=[]): # Risky!
> items.append(item)
> return items
> Recommended Approach
> Use N o neas default and initialize inside function:
> # DO THIS INSTEAD
> def add_item(item, items=None):
> if items is None :
> items = []
> items.append(item)
> return items
> 7/13
> --- Page 8 ---
> Arbitrary Arguments
> *args
> Allows a function to accept an arbitrary number of positional 
> arguments
> Arguments are collected into a tuple
> The * operator is the unpacking operator

---

## [Q088] Topic: Functions & Scope

**Target Learning Objective:** *Keyword arguments specifying parameter names during function call*

### Generated MCQ
Which of the following is the correct way to call a function with keyword arguments in Python? ```python
def greet(name, age):
    print(f'Hello, {name}. You are {age} years old.')
```

**Choices:**
- **[A]** `greet('Alice', 30)`
- **[B]** `greet(age=30, name='Alice')` **(CORRECT)**
- **[C]** `greet(name='Alice', 30)`
- **[D]** `greet(30, 'Alice')`

**Explanation:** In Python, keyword arguments allow you to specify the parameter names during function calls. This makes the code more readable and less prone to errors. The correct call is `greet(age=30, name='Alice')`, which correctly assigns the values to their respective parameters.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #75, Cosine Similarity: `0.7376`):
>
> parameter2):
> # Function body
> pass
> • Function name should be descriptive
> • Parameters are placeholders
> • Use meaningful parameter names
> Function Calling
> To execute a function, call it by name:
> # Calling a function
> function_name(argument1, argument2)
> • Use function name followed by parentheses
> • Provide arguments matching parameters
> • Function executes when called
> Parameters vs Arguments
> Parameters
> Placeholders in 
> function definition
> def 
> greet(name)
> :
> Arguments
> Actual values when 
> calling
> greet("Alice")
> Example:
> def greet(name):

> **Chunk 2** (Index #74, Cosine Similarity: `0.6632`):
>
> function name and expected inputs.
> Maintainability
> Code structured with functions is easier to 
> understand, correct, enhance, and adapt over 
> time. Changes can be isolated to specific 
> functions.
> Testability
> Functions with clear arguments and explicit 
> return values are easier to test, ensuring they 
> behave as expected.
> Functions are the building blocks of well-
> structured programs
> 3/13
> --- Page 4 ---
> Basic Function Syntax
> Function Definition
> Use the def keyword to define a function:
> def function_name(parameter1,

> **Chunk 3** (Index #81, Cosine Similarity: `0.6493`):
>
> def sum_all(*numbers):
> return sum (numbers)
> result = sum_all(1, 2, 3, 4, 5)
> Output: 15
> **kwargs
> Allows a function to accept an arbitrary number of keyword 
> arguments
> Arguments are collected into a dictionary
> The ** operator unpacks keyword arguments
> def display_info(**details):
> for key, value in details.items():
> print(f"{key}: {value}")
> display_info(name="Alice", age=30)
> Output:
> name: Alice
> age: 30
> 8/13
> --- Page 9 ---
> Lambda Functions
> Definition & Syntax
> Small, anonymous functions defined with the lambda keyword
> Can take any number of arguments

---

## [Q089] Topic: Functions & Scope

**Target Learning Objective:** *Local variable scope inside function vs global variable scope outside*

### Generated MCQ
Consider the following Python code snippet:
```python
x = 5

def my_function():
    x = 10
    print(x)

my_function()
print(x)
```

**Choices:**
- **[A]** `5
10`
- **[B]** `10
5` **(CORRECT)**
- **[C]** `5
5`
- **[D]** `10
10`

**Explanation:** The function `my_function` has a local variable `x` which shadows the global variable `x`. When `my_function` is called, it prints the local value of `x`, which is 10. After the function call, the global variable `x` remains unchanged and still holds its original value of 5.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #74, Cosine Similarity: `0.6351`):
>
> function name and expected inputs.
> Maintainability
> Code structured with functions is easier to 
> understand, correct, enhance, and adapt over 
> time. Changes can be isolated to specific 
> functions.
> Testability
> Functions with clear arguments and explicit 
> return values are easier to test, ensuring they 
> behave as expected.
> Functions are the building blocks of well-
> structured programs
> 3/13
> --- Page 4 ---
> Basic Function Syntax
> Function Definition
> Use the def keyword to define a function:
> def function_name(parameter1,

> **Chunk 2** (Index #22, Cosine Similarity: `0.6018`):
>
> Variable Declaration
> • Variables are created when assigned a value
> • No explicit declaration required
> • Values determine variable type
> age = 30 # Integer
> name = "Alice" # String
> is_student = True # Boolean
> Dynamic Typing
> • Python infers type from assigned value
> • Same variable can hold different types
> • Types checked at runtime
> x = 42 # x is an integer
> x = "Hello" # x is now a string
> x = False # x is now a boolean
> Naming Rules
> • Start with letter or underscore
> • Contain letters, numbers, underscores
> • Case-sensitive (age ≠ Age)

> **Chunk 3** (Index #75, Cosine Similarity: `0.5857`):
>
> parameter2):
> # Function body
> pass
> • Function name should be descriptive
> • Parameters are placeholders
> • Use meaningful parameter names
> Function Calling
> To execute a function, call it by name:
> # Calling a function
> function_name(argument1, argument2)
> • Use function name followed by parentheses
> • Provide arguments matching parameters
> • Function executes when called
> Parameters vs Arguments
> Parameters
> Placeholders in 
> function definition
> def 
> greet(name)
> :
> Arguments
> Actual values when 
> calling
> greet("Alice")
> Example:
> def greet(name):

---

## [Q090] Topic: Functions & Scope

**Target Learning Objective:** *Attempting to access local variable outside function raises NameError*

### Generated MCQ
What will be the output of the following Python code snippet?
```python
def calculate_average(numbers):
    return sum(numbers) / len(numbers)

result = calculate_average([1, 2, 3, 4])
print(result)
```

**Choices:**
- **[A]** `8.0`
- **[B]** `2.5` **(CORRECT)**
- **[C]** `SyntaxError`
- **[D]** `NameError`

**Explanation:** The function `calculate_average` correctly calculates the average of the numbers in the list `[1, 2, 3, 4]`, which is `(1+2+3+4) / 4 = 10 / 4 = 2.5`. The code executes without errors and prints `2.5`.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #75, Cosine Similarity: `0.5900`):
>
> parameter2):
> # Function body
> pass
> • Function name should be descriptive
> • Parameters are placeholders
> • Use meaningful parameter names
> Function Calling
> To execute a function, call it by name:
> # Calling a function
> function_name(argument1, argument2)
> • Use function name followed by parentheses
> • Provide arguments matching parameters
> • Function executes when called
> Parameters vs Arguments
> Parameters
> Placeholders in 
> function definition
> def 
> greet(name)
> :
> Arguments
> Actual values when 
> calling
> greet("Alice")
> Example:
> def greet(name):

> **Chunk 2** (Index #74, Cosine Similarity: `0.5834`):
>
> function name and expected inputs.
> Maintainability
> Code structured with functions is easier to 
> understand, correct, enhance, and adapt over 
> time. Changes can be isolated to specific 
> functions.
> Testability
> Functions with clear arguments and explicit 
> return values are easier to test, ensuring they 
> behave as expected.
> Functions are the building blocks of well-
> structured programs
> 3/13
> --- Page 4 ---
> Basic Function Syntax
> Function Definition
> Use the def keyword to define a function:
> def function_name(parameter1,

> **Chunk 3** (Index #87, Cosine Similarity: `0.5671`):
>
> # Function implementation
> return sum(numbers) / len(numbers)
> Best Practice: Combine docstrings and type annotations
> 12/13
> --- Page 13 ---
> Real-World Applications
> Data Analysis
> Functions clean, transform, and analyze datasets
> def calculate_stats(data):
> return sum(data)/len(data)
> Web Development
> Functions process requests and return responses
> def handle_request():
> return render_template('index.html')
> Automation
> Functions automate repetitive tasks
> def rename_files(pattern):
> for file in os.listdir():
> os.rename(file, file.replace(pattern,

---

## [Q091] Topic: Functions & Scope

**Target Learning Objective:** *Shadowing global variables with local variables of the same name*

### Generated MCQ
Consider the following Python code snippet:
```python
x = 5

def my_function():
    x = 10
    print(x)

my_function()
print(x)
```
What will be the output of this code?

**Choices:**
- **[A]** `10 5`
- **[B]** `10 10` **(CORRECT)**
- **[C]** `5 5`
- **[D]** `5 10`

**Explanation:** The function `my_function` has a local variable `x` that shadows the global variable `x`. When `my_function` is called, it prints the value of its local `x`, which is 10. After the function call, the global `x` remains unchanged at 5.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #75, Cosine Similarity: `0.5574`):
>
> parameter2):
> # Function body
> pass
> • Function name should be descriptive
> • Parameters are placeholders
> • Use meaningful parameter names
> Function Calling
> To execute a function, call it by name:
> # Calling a function
> function_name(argument1, argument2)
> • Use function name followed by parentheses
> • Provide arguments matching parameters
> • Function executes when called
> Parameters vs Arguments
> Parameters
> Placeholders in 
> function definition
> def 
> greet(name)
> :
> Arguments
> Actual values when 
> calling
> greet("Alice")
> Example:
> def greet(name):

> **Chunk 2** (Index #74, Cosine Similarity: `0.5530`):
>
> function name and expected inputs.
> Maintainability
> Code structured with functions is easier to 
> understand, correct, enhance, and adapt over 
> time. Changes can be isolated to specific 
> functions.
> Testability
> Functions with clear arguments and explicit 
> return values are easier to test, ensuring they 
> behave as expected.
> Functions are the building blocks of well-
> structured programs
> 3/13
> --- Page 4 ---
> Basic Function Syntax
> Function Definition
> Use the def keyword to define a function:
> def function_name(parameter1,

> **Chunk 3** (Index #77, Cosine Similarity: `0.5464`):
>
> Values are packed into a tuple
> Can be unpacked during 
> assignment
> def get_coordinates():
> x = 10
> y = 20
> return x, y
> coords = get_coordinates()
> # Returns (10, 20)
> Implicit None
> If no return statement is provided:
> Function implicitly returns 
> None
> Equivalent to return None
> def do_nothing():
> pass
> result = do_nothing()
> # Returns None
> 5/13
> --- Page 6 ---
> Function Arguments Types
> Feature Positional Arguments Keyword Arguments
> Order Strict order matching parameters Order does not matter; arguments are 
> named
> Readability Can be less readable with many args Enhances readability by naming

---

## [Q092] Topic: Functions & Scope

**Target Learning Objective:** *Passing mutable objects like lists to functions and in-place side effects*

### Generated MCQ
Consider the following Python code snippet:
```python
numbers = [1, 2, 3]
def add_to_list(num, lst=[]):
    lst.append(num)
    return lst
result = add_to_list(4)
print(result)
```

**Choices:**
- **[A]** `[1, 2, 3]`
- **[B]** `[1, 2, 3, 4]` **(CORRECT)**
- **[C]** `[4]`
- **[D]** `[1, 2, 3, 4, 4]`

**Explanation:** The function `add_to_list` uses a mutable list as a default argument. When the function is called for the first time, it appends the number 4 to the default list and returns it. Since the same list is used across multiple calls (due to the default argument behavior), calling `add_to_list(4)` again will append another 4 to the same list.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #83, Cosine Similarity: `0.6978`):
>
> numbers = [1, 2, 3, 4, 5]
> squared_numbers = list(map(lambda x: x ** 2, numbers))
> print(squared_numbers) # Output: [1, 4, 9, 16, 25]
> 9/13
> --- Page 10 ---
> Decorators
> What are Decorators?
> Powerful feature that modifies function behavior without altering 
> original code
> "Wrap" another function, adding functionality before/after 
> execution
> Applied using @ syntax above function definition
> # Original function
> def my_function():
> pass
> # Decorator
> @my_decorator
> def my_function():
> Example: Logging Decorator
> # Decorator definition

> **Chunk 2** (Index #80, Cosine Similarity: `0.6940`):
>
> Avoid using mutable objects (lists, dictionaries) as default values:
> # DON'T DO THIS
> def add_item(item, items=[]): # Risky!
> items.append(item)
> return items
> Recommended Approach
> Use N o neas default and initialize inside function:
> # DO THIS INSTEAD
> def add_item(item, items=None):
> if items is None :
> items = []
> items.append(item)
> return items
> 7/13
> --- Page 8 ---
> Arbitrary Arguments
> *args
> Allows a function to accept an arbitrary number of positional 
> arguments
> Arguments are collected into a tuple
> The * operator is the unpacking operator

> **Chunk 3** (Index #34, Cosine Similarity: `0.6762`):
>
> mutable
> Tuples
> Immutable sequences of elements
> Sets
> Collections of unique elements
> Dictionaries
> Key-value pairs for fast lookups
> Page 2 of 14
> [ ] ( )
> { } {:}
> --- Page 3 ---
> Lists: The Dynamic Array
> Definition
> A versatile, built-in data structure that functions as an 
> ordered, mutable collection of items.
> Example
> my_list = [10, "hello", 3.14, True, 10]
> print(my_list)
> Output: [10, 'hello', 3.14, True, 10]
> Key Characteristics
> Ordered
> Elements maintain their insertion order, 
> with fixed index starting from 0.
> Mutable
> Elements can be added, removed, or

---

## [Q093] Topic: Functions & Scope

**Target Learning Objective:** *Passing immutable objects like integers and strings to functions*

### Generated MCQ
What is the output of the following Python code snippet?
```python
def modify_string(s):
    s += ' World'

original = 'Hello'
modify_string(original)
print(original)
```

**Choices:**
- **[A]** `Hello` **(CORRECT)**
- **[B]** `Hello World`
- **[C]** `World Hello`
- **[D]** `Error: cannot modify immutable object`

**Explanation:** The function `modify_string` takes a string `s` as an argument and attempts to modify it by appending ' World'. However, strings in Python are immutable, so the modification does not affect the original string. The original string remains unchanged after calling the function.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #74, Cosine Similarity: `0.6879`):
>
> function name and expected inputs.
> Maintainability
> Code structured with functions is easier to 
> understand, correct, enhance, and adapt over 
> time. Changes can be isolated to specific 
> functions.
> Testability
> Functions with clear arguments and explicit 
> return values are easier to test, ensuring they 
> behave as expected.
> Functions are the building blocks of well-
> structured programs
> 3/13
> --- Page 4 ---
> Basic Function Syntax
> Function Definition
> Use the def keyword to define a function:
> def function_name(parameter1,

> **Chunk 2** (Index #87, Cosine Similarity: `0.6799`):
>
> # Function implementation
> return sum(numbers) / len(numbers)
> Best Practice: Combine docstrings and type annotations
> 12/13
> --- Page 13 ---
> Real-World Applications
> Data Analysis
> Functions clean, transform, and analyze datasets
> def calculate_stats(data):
> return sum(data)/len(data)
> Web Development
> Functions process requests and return responses
> def handle_request():
> return render_template('index.html')
> Automation
> Functions automate repetitive tasks
> def rename_files(pattern):
> for file in os.listdir():
> os.rename(file, file.replace(pattern,

> **Chunk 3** (Index #72, Cosine Similarity: `0.6696`):
>
> Report Date: 2025-12-23
> --- Page 2 ---
> What is a Function?
> Definition
> A named, self-contained block of code designed to perform a 
> specific task
> Only runs when it is called
> Can optionally return data as a result
> # A simple function definition
> def greet():
> print("Hello from a function!")
> # Calling the function
> greet() # Output: "Hello from a function!"
> Types of Functions
> Built-in Functions
> print() len()
> type() int()
> User-defined Functions
> Created by developers to address specific needs
> def calculate_area(length, width):

---

## [Q094] Topic: Functions & Scope

**Target Learning Objective:** *Functions calling other functions and functional decomposition*

### Generated MCQ
What will be the output of the following Python code?
```python
def greet(name):
    return f'Hello, {name}!'

def main():
    print(greet('Alice'))

main()
```

**Choices:**
- **[A]** `Hello, Alice!` **(CORRECT)**
- **[B]** `Hello, Bob!`
- **[C]** `NameError: name 'name' is not defined`
- **[D]** `TypeError: greet() missing 1 required positional argument: 'name'`

**Explanation:** The function `greet` is called with the argument 'Alice'. It returns the string 'Hello, Alice!'. The `main` function then prints this returned value. Therefore, the output is 'Hello, Alice!'.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #72, Cosine Similarity: `0.7365`):
>
> Report Date: 2025-12-23
> --- Page 2 ---
> What is a Function?
> Definition
> A named, self-contained block of code designed to perform a 
> specific task
> Only runs when it is called
> Can optionally return data as a result
> # A simple function definition
> def greet():
> print("Hello from a function!")
> # Calling the function
> greet() # Output: "Hello from a function!"
> Types of Functions
> Built-in Functions
> print() len()
> type() int()
> User-defined Functions
> Created by developers to address specific needs
> def calculate_area(length, width):

> **Chunk 2** (Index #74, Cosine Similarity: `0.7148`):
>
> function name and expected inputs.
> Maintainability
> Code structured with functions is easier to 
> understand, correct, enhance, and adapt over 
> time. Changes can be isolated to specific 
> functions.
> Testability
> Functions with clear arguments and explicit 
> return values are easier to test, ensuring they 
> behave as expected.
> Functions are the building blocks of well-
> structured programs
> 3/13
> --- Page 4 ---
> Basic Function Syntax
> Function Definition
> Use the def keyword to define a function:
> def function_name(parameter1,

> **Chunk 3** (Index #84, Cosine Similarity: `0.6836`):
>
> def log_function_call (func):
> def wrapper(*args, **kwargs):
> # Before function call
> print(f"Calling function: {func.__name__}")
> result = func(*args, **kwargs)
> # After function call
> print(f"Function {func.__name__} finished. Result: 
> {result}")
> return result
> return wrapper
> # Function with decorator
> @log_function_call
> def add(a, b):
> return a + b
> @log_function_call is syntactic sugar for add = log_function_call(add)
> 10/13
> --- Page 11 ---
> Generators
> What are Generators?
> Special type of iterable that produces values one at a time

---

## [Q095] Topic: Functions & Scope

**Target Learning Objective:** *Docstrings and documenting function behavior with triple quotes*

### Generated MCQ
Consider the following Python function that calculates the average of a list of numbers. ```python
def calculate_average(numbers):
    return sum(numbers) / len(numbers)
``` What will be the output if you call `calculate_average([1, 2, 3, 4])`?

**Choices:**
- **[A]** `5.0`
- **[B]** `2.5` **(CORRECT)**
- **[C]** `10.0`
- **[D]** `8.0`

**Explanation:** The function `calculate_average` correctly calculates the average of a list by summing all elements and dividing by the count of elements. For the input [1, 2, 3, 4], the sum is 10 and there are 4 elements, so the correct output is 10 / 4 = 2.5.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #87, Cosine Similarity: `0.6638`):
>
> # Function implementation
> return sum(numbers) / len(numbers)
> Best Practice: Combine docstrings and type annotations
> 12/13
> --- Page 13 ---
> Real-World Applications
> Data Analysis
> Functions clean, transform, and analyze datasets
> def calculate_stats(data):
> return sum(data)/len(data)
> Web Development
> Functions process requests and return responses
> def handle_request():
> return render_template('index.html')
> Automation
> Functions automate repetitive tasks
> def rename_files(pattern):
> for file in os.listdir():
> os.rename(file, file.replace(pattern,

> **Chunk 2** (Index #74, Cosine Similarity: `0.6558`):
>
> function name and expected inputs.
> Maintainability
> Code structured with functions is easier to 
> understand, correct, enhance, and adapt over 
> time. Changes can be isolated to specific 
> functions.
> Testability
> Functions with clear arguments and explicit 
> return values are easier to test, ensuring they 
> behave as expected.
> Functions are the building blocks of well-
> structured programs
> 3/13
> --- Page 4 ---
> Basic Function Syntax
> Function Definition
> Use the def keyword to define a function:
> def function_name(parameter1,

> **Chunk 3** (Index #84, Cosine Similarity: `0.6148`):
>
> def log_function_call (func):
> def wrapper(*args, **kwargs):
> # Before function call
> print(f"Calling function: {func.__name__}")
> result = func(*args, **kwargs)
> # After function call
> print(f"Function {func.__name__} finished. Result: 
> {result}")
> return result
> return wrapper
> # Function with decorator
> @log_function_call
> def add(a, b):
> return a + b
> @log_function_call is syntactic sugar for add = log_function_call(add)
> 10/13
> --- Page 11 ---
> Generators
> What are Generators?
> Special type of iterable that produces values one at a time

---

## [Q096] Topic: Functions & Scope

**Target Learning Objective:** *Simple recursive function definition with base case termination*

### Generated MCQ
Which of the following functions correctly calculates the factorial of a number using recursion? ```python
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)
```

**Choices:**
- **[A]** `The function is correct and will calculate the factorial correctly.` **(CORRECT)**
- **[B]** `The function has a base case error and will not terminate properly.`
- **[C]** `The function uses zero-indexing, which will cause an infinite recursion.`
- **[D]** `The function does not handle negative numbers correctly, leading to incorrect results.`

**Explanation:** The correct answer is [A]. The function uses the correct base case (n == 0) and recursive call (factorial(n - 1)) to calculate the factorial of a number. Choice [B] is incorrect because the base case is properly defined, so the function will terminate correctly. Choice [C] is wrong because Python uses one-based indexing, not zero-indexing. Choice [D] is incorrect because the function does not handle negative numbers specifically; it simply returns 1 when n == 0, which is mathematically correct for factorial(0).

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #74, Cosine Similarity: `0.6541`):
>
> function name and expected inputs.
> Maintainability
> Code structured with functions is easier to 
> understand, correct, enhance, and adapt over 
> time. Changes can be isolated to specific 
> functions.
> Testability
> Functions with clear arguments and explicit 
> return values are easier to test, ensuring they 
> behave as expected.
> Functions are the building blocks of well-
> structured programs
> 3/13
> --- Page 4 ---
> Basic Function Syntax
> Function Definition
> Use the def keyword to define a function:
> def function_name(parameter1,

> **Chunk 2** (Index #72, Cosine Similarity: `0.6338`):
>
> Report Date: 2025-12-23
> --- Page 2 ---
> What is a Function?
> Definition
> A named, self-contained block of code designed to perform a 
> specific task
> Only runs when it is called
> Can optionally return data as a result
> # A simple function definition
> def greet():
> print("Hello from a function!")
> # Calling the function
> greet() # Output: "Hello from a function!"
> Types of Functions
> Built-in Functions
> print() len()
> type() int()
> User-defined Functions
> Created by developers to address specific needs
> def calculate_area(length, width):

> **Chunk 3** (Index #76, Cosine Similarity: `0.6123`):
>
> print(f"Hello, {name}!")
> greet("Alice") # Output: Hello, 
> Alice!
> 4/13
> --- Page 5 ---
> The Return Statement
> Purpose
> The return statement serves two 
> primary purposes:
> Sends a value back to the caller
> Immediately terminates 
> function execution
> def add(a, b):
> result = a + b
> return result
> sum_result = add(3, 5)
> Single Value
> Functions can return any data 
> type:
> Numbers
> Strings
> Lists, dictionaries, etc.
> def square(number):
> return number * number
> result = square(5)
> # Returns 25
> Multiple Values
> Functions can return multiple 
> values:

---

## [Q097] Topic: Functions & Scope

**Target Learning Objective:** *Recursive factorial or countdown execution tracing*

### Generated MCQ
What is the output of the following Python code snippet?
```python
# Define a function to calculate factorial using recursion
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)

# Call the function with an input of 3
result = factorial(3)
print(result)
```

**Choices:**
- **[A]** `6` **(CORRECT)**
- **[B]** `5`
- **[C]** `4`
- **[D]** `3`

**Explanation:** The function `factorial` is defined to calculate the factorial of a number using recursion. When called with an input of 3, it calculates 3 * 2 * 1 = 6. The correct output is therefore 6.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #70, Cosine Similarity: `0.6372`):
>
> Ideal for sequences (lists, strings, tuples)
> Automatically handles iteration variables
> While Loops
> Use when the number of iterations is unknown
> Continue until a condition becomes false
> Better for user input validation and event handling
> For Loop Example
> # Processing a list of items
> fruits = ["apple", "banana", "cherry"]
> for fruit in fruits:
> print(fruit)
> Best choice: We know exactly how many items are in the list
> While Loop Example
> # Getting user input
> user_input = ""
> while user_input != "quit":
> user_input = input("Enter command: ")

> **Chunk 2** (Index #74, Cosine Similarity: `0.6253`):
>
> function name and expected inputs.
> Maintainability
> Code structured with functions is easier to 
> understand, correct, enhance, and adapt over 
> time. Changes can be isolated to specific 
> functions.
> Testability
> Functions with clear arguments and explicit 
> return values are easier to test, ensuring they 
> behave as expected.
> Functions are the building blocks of well-
> structured programs
> 3/13
> --- Page 4 ---
> Basic Function Syntax
> Function Definition
> Use the def keyword to define a function:
> def function_name(parameter1,

> **Chunk 3** (Index #72, Cosine Similarity: `0.6199`):
>
> Report Date: 2025-12-23
> --- Page 2 ---
> What is a Function?
> Definition
> A named, self-contained block of code designed to perform a 
> specific task
> Only runs when it is called
> Can optionally return data as a result
> # A simple function definition
> def greet():
> print("Hello from a function!")
> # Calling the function
> greet() # Output: "Hello from a function!"
> Types of Functions
> Built-in Functions
> print() len()
> type() int()
> User-defined Functions
> Created by developers to address specific needs
> def calculate_area(length, width):

---

## [Q098] Topic: Functions & Scope

**Target Learning Objective:** *Anonymous lambda functions for short one-line expressions*

### Generated MCQ
Which of the following lambda functions correctly calculates the square of a number?

**Choices:**
- **[A]** ````python
square = lambda x: x * x + 1
````
- **[B]** ````python
square = lambda x: x ** 2
```` **(CORRECT)**
- **[C]** ````python
square = lambda x: x * x - 1
````
- **[D]** ````python
square = lambda x: x / 2
````

**Explanation:** The correct answer is B. The lambda function `lambda x: x ** 2` correctly calculates the square of a number by using the exponentiation operator `**`. Choice A adds 1 to the square, making it incorrect. Choice C subtracts 1 from the square, also making it incorrect. Choice D divides the number by 2, which is not related to squaring.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #81, Cosine Similarity: `0.7192`):
>
> def sum_all(*numbers):
> return sum (numbers)
> result = sum_all(1, 2, 3, 4, 5)
> Output: 15
> **kwargs
> Allows a function to accept an arbitrary number of keyword 
> arguments
> Arguments are collected into a dictionary
> The ** operator unpacks keyword arguments
> def display_info(**details):
> for key, value in details.items():
> print(f"{key}: {value}")
> display_info(name="Alice", age=30)
> Output:
> name: Alice
> age: 30
> 8/13
> --- Page 9 ---
> Lambda Functions
> Definition & Syntax
> Small, anonymous functions defined with the lambda keyword
> Can take any number of arguments

> **Chunk 2** (Index #82, Cosine Similarity: `0.6827`):
>
> Can only have one expression
> Expression is automatically returned, no need for return
> statement
> # Lambda syntax
> lambda arguments: expression
> # Example: Multiply three numbers
> x = lambda a, b, c : a * b * c
> print(x(5, 4, 3)) # Output: 60
> Comparison & Use Cases
> # Equivalent regular function
> def multiply(a, b, c):
> return a * b * c
> print(multiply(5, 4, 3)) # Output: 60
> Common Use Cases
> filter()
> Filter elements based 
> on a condition
> map()
> Apply a function to 
> each element
> sorted()
> Sort using custom key 
> function
> # Lambda with map() to square numbers

> **Chunk 3** (Index #84, Cosine Similarity: `0.6078`):
>
> def log_function_call (func):
> def wrapper(*args, **kwargs):
> # Before function call
> print(f"Calling function: {func.__name__}")
> result = func(*args, **kwargs)
> # After function call
> print(f"Function {func.__name__} finished. Result: 
> {result}")
> return result
> return wrapper
> # Function with decorator
> @log_function_call
> def add(a, b):
> return a + b
> @log_function_call is syntactic sugar for add = log_function_call(add)
> 10/13
> --- Page 11 ---
> Generators
> What are Generators?
> Special type of iterable that produces values one at a time

---

## [Q099] Topic: Functions & Scope

**Target Learning Objective:** *Using lambda functions with map() or filter() or sorted() key*

### Generated MCQ
Consider the following Python code snippet:
```python
numbers = [1, 2, 3, 4, 5]
squared_numbers = list(map(lambda x: x**2, numbers))
print(squared_numbers)
```

**Choices:**
- **[A]** `[1, 2, 3, 4, 5]`
- **[B]** `[1, 4, 9, 16, 25]` **(CORRECT)**
- **[C]** `[0, 1, 2, 3, 4]`
- **[D]** `[2, 4, 6, 8, 10]`

**Explanation:** The lambda function `lambda x: x**2` squares each element in the list. The map() function applies this lambda to each element of `numbers`, resulting in `[1, 4, 9, 16, 25]`. Choice A is incorrect because it does not square the numbers. Choice C is incorrect because it contains zeros instead of the squared values. Choice D is incorrect because it increments each number by one instead of squaring them.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #82, Cosine Similarity: `0.6745`):
>
> Can only have one expression
> Expression is automatically returned, no need for return
> statement
> # Lambda syntax
> lambda arguments: expression
> # Example: Multiply three numbers
> x = lambda a, b, c : a * b * c
> print(x(5, 4, 3)) # Output: 60
> Comparison & Use Cases
> # Equivalent regular function
> def multiply(a, b, c):
> return a * b * c
> print(multiply(5, 4, 3)) # Output: 60
> Common Use Cases
> filter()
> Filter elements based 
> on a condition
> map()
> Apply a function to 
> each element
> sorted()
> Sort using custom key 
> function
> # Lambda with map() to square numbers

> **Chunk 2** (Index #81, Cosine Similarity: `0.6731`):
>
> def sum_all(*numbers):
> return sum (numbers)
> result = sum_all(1, 2, 3, 4, 5)
> Output: 15
> **kwargs
> Allows a function to accept an arbitrary number of keyword 
> arguments
> Arguments are collected into a dictionary
> The ** operator unpacks keyword arguments
> def display_info(**details):
> for key, value in details.items():
> print(f"{key}: {value}")
> display_info(name="Alice", age=30)
> Output:
> name: Alice
> age: 30
> 8/13
> --- Page 9 ---
> Lambda Functions
> Definition & Syntax
> Small, anonymous functions defined with the lambda keyword
> Can take any number of arguments

> **Chunk 3** (Index #74, Cosine Similarity: `0.6172`):
>
> function name and expected inputs.
> Maintainability
> Code structured with functions is easier to 
> understand, correct, enhance, and adapt over 
> time. Changes can be isolated to specific 
> functions.
> Testability
> Functions with clear arguments and explicit 
> return values are easier to test, ensuring they 
> behave as expected.
> Functions are the building blocks of well-
> structured programs
> 3/13
> --- Page 4 ---
> Basic Function Syntax
> Function Definition
> Use the def keyword to define a function:
> def function_name(parameter1,

---

## [Q100] Topic: Functions & Scope

**Target Learning Objective:** *Function composition and passing functions as arguments*

### Generated MCQ
Consider the following Python function definition:
```python
def greet(name):
    print(f'Hello, {name}!')

# Calling the function with an argument
result = greet('Alice')
``` What will be the output of this code?


**Choices:**
- **[A]** `Hello, Alice!` **(CORRECT)**
- **[B]** `NameError: name 'name' is not defined`
- **[C]** `TypeError: greet() takes no arguments (1 given)`
- **[D]** `SyntaxError: invalid syntax`

**Explanation:** The function `greet` is defined to take one parameter, `name`. When calling the function with the argument `'Alice'`, it correctly prints 'Hello, Alice!'. Choice B is incorrect because there are no issues with variable names. Choice C is wrong because the function does accept an argument. Choice D is incorrect as there is no syntax error.

### Retrieved Slide Chunks (Evidence Grounding)
> **Chunk 1** (Index #74, Cosine Similarity: `0.7168`):
>
> function name and expected inputs.
> Maintainability
> Code structured with functions is easier to 
> understand, correct, enhance, and adapt over 
> time. Changes can be isolated to specific 
> functions.
> Testability
> Functions with clear arguments and explicit 
> return values are easier to test, ensuring they 
> behave as expected.
> Functions are the building blocks of well-
> structured programs
> 3/13
> --- Page 4 ---
> Basic Function Syntax
> Function Definition
> Use the def keyword to define a function:
> def function_name(parameter1,

> **Chunk 2** (Index #72, Cosine Similarity: `0.6951`):
>
> Report Date: 2025-12-23
> --- Page 2 ---
> What is a Function?
> Definition
> A named, self-contained block of code designed to perform a 
> specific task
> Only runs when it is called
> Can optionally return data as a result
> # A simple function definition
> def greet():
> print("Hello from a function!")
> # Calling the function
> greet() # Output: "Hello from a function!"
> Types of Functions
> Built-in Functions
> print() len()
> type() int()
> User-defined Functions
> Created by developers to address specific needs
> def calculate_area(length, width):

> **Chunk 3** (Index #75, Cosine Similarity: `0.6803`):
>
> parameter2):
> # Function body
> pass
> • Function name should be descriptive
> • Parameters are placeholders
> • Use meaningful parameter names
> Function Calling
> To execute a function, call it by name:
> # Calling a function
> function_name(argument1, argument2)
> • Use function name followed by parentheses
> • Provide arguments matching parameters
> • Function executes when called
> Parameters vs Arguments
> Parameters
> Placeholders in 
> function definition
> def 
> greet(name)
> :
> Arguments
> Actual values when 
> calling
> greet("Alice")
> Example:
> def greet(name):

---

