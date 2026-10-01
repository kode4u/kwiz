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
y = '10'
z = x + y
print(z)
```

**Choices:**
- **[A]** `15`
- **[B]** `510` **(CORRECT)**
- **[C]** `TypeError: unsupported operand type(s) for +: 'int' and 'str'`
- **[D]** `'x' is not defined`

**Explanation:** The code attempts to add an integer (5) and a string ('10'), which results in a TypeError because Python does not support direct addition of different types. The correct output is 'TypeError: unsupported operand type(s) for +: 'int' and 'str'.

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
- **[D]** `Error: division by zero`

**Explanation:** The code performs float division between two integers. In Python, when dividing two integers using the `/` operator, it returns a float result. Therefore, `int_a / int_b` equals `3.3333333333333335`. Options A and C are incorrect because they represent integer division or an error respectively. Option D is also incorrect as there is no division by zero in the code.

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
What is the output of the following Python code snippet?
```python
x = 42
y = 'Hello'
x = y
type(x)
```

**Choices:**
- **[A]** `<class 'int'>`
- **[B]** `<class 'str'>` **(CORRECT)**
- **[C]** `<class 'float'>`
- **[D]** `<class 'bool'>`

**Explanation:** The code snippet first assigns the integer value 42 to variable x. Then, it assigns the string 'Hello' to y and reassigns this value to x. The type() function is then called on x, which returns <class 'str'> because the last assigned value to x was a string.

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
int_num = 5.0
int_from_int = int(int_num)
print(int_from_int)
```

**Choices:**
- **[A]** `5` **(CORRECT)**
- **[B]** `5.0`
- **[C]** `6`
- **[D]** `Error: cannot convert float to int`

**Explanation:** The `int()` function truncates the decimal part of a floating-point number when converting it to an integer. Therefore, `int_from_int` will be 5.

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
What is the output of the following code snippet?
```python
int_num = 5
float_from_int = float(int_num)
print(float_from_int)
```

**Choices:**
- **[A]** `5`
- **[B]** `5.0` **(CORRECT)**
- **[C]** `TypeError: 'float' object is not callable`
- **[D]** `SyntaxError: invalid syntax`

**Explanation:** The `float()` function converts the integer `int_num` to a floating-point number. The correct output is `5.0`. Option A is incorrect because it does not include the decimal point. Option C is incorrect because there is no error in the code; it simply converts an integer to a float. Option D is incorrect because there are no syntax errors in the code.

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
What will be the output of the following code snippet?
```python
age = 30
print(str(age) + ' years old')
```

**Choices:**
- **[A]** `30 years old`
- **[B]** `'30' years old` **(CORRECT)**
- **[C]** `TypeError: can only concatenate str (not "int") to str`
- **[D]** `SyntaxError: invalid syntax`

**Explanation:** The code attempts to concatenate a string with an integer. In Python, integers cannot be directly concatenated with strings. The correct way is to use the `str()` function to convert the integer to a string before concatenation.

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
What will be the output of the following Python code snippet?
```python
a = 5
b = '10'
c = a + b
print(c)
```

**Choices:**
- **[A]** `15`
- **[B]** `510` **(CORRECT)**
- **[C]** `TypeError: unsupported operand type(s) for +: 'int' and 'str'`
- **[D]** `SyntaxError: invalid syntax`

**Explanation:** The code attempts to add an integer (a) and a string (b). In Python, the '+' operator is overloaded for different types. When used with an integer and a string, it performs string concatenation rather than numeric addition. Therefore, '5' + '10' results in '510'. The correct answer is B.

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

**Explanation:** The code attempts to add an integer (`age`) and a string (`name`). In Python, integers and strings cannot be added directly. The correct output is the concatenated string '30Alice'. Choice C represents the actual error that would occur if this code were run, which is a TypeError because you cannot perform addition between incompatible types.

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
a = True
b = False
c = a or b
print(c)
```

**Choices:**
- **[A]** `True` **(CORRECT)**
- **[B]** `False`
- **[C]** `SyntaxError`
- **[D]** `TypeError`

**Explanation:** The 'or' operator in Python returns True if at least one of the operands is True. Here, both a and b are False, but since 'or' short-circuits and stops at the first True value, it does not reach the second operand. Therefore, c will be assigned False.

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
What will be the output of the following Python code snippet?
```python
x = 42
x = 'Hello'
x = False
print(x)
```

**Choices:**
- **[A]** `False` **(CORRECT)**
- **[B]** `42`
- **[C]** `'Hello'`
- **[D]** `TypeError`

**Explanation:** The variable `x` is initially assigned an integer value of 42. It is then reassigned a string value 'Hello', and finally a boolean value False. The last assignment to `x` is the one that will be printed, which is False.

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
- **[B]** `'c'` **(CORRECT)**
- **[C]** `'l'`
- **[D]** `'e'`

**Explanation:** The code snippet prints the character at index 2 of the string 'Alice'. In Python, indexing starts at 0. Therefore, name[2] refers to the third character in the string, which is 'c'.

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
What is the output of the following Python code snippet?
```python
name = 'Alice'
length = len(name)
print(length)
```

**Choices:**
- **[A]** `A. 4`
- **[B]** `B. 5` **(CORRECT)**
- **[C]** `C. 6`
- **[D]** `D. Error`

**Explanation:** The `len()` function returns the number of characters in a string. The string 'Alice' has 5 characters, so the output is 5.

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
What is the output of the following code snippet?
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
- **[D]** `6 -1`

**Explanation:** In Python, the floor division operator // performs division and rounds down to the nearest whole number. For a = 10 and b = 3, 10 // 3 equals 3. The modulus operator % returns the remainder of the division. So, 10 % 3 equals 1. Therefore, the output is '3 1'.

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
x = 2
y = 3
result = x ** y + 1
print(result)
```

**Choices:**
- **[A]** `8`
- **[B]** `9` **(CORRECT)**
- **[C]** `10`
- **[D]** `12`

**Explanation:** The code snippet calculates the result of x raised to the power of y and then adds 1. Here, x = 2 and y = 3, so 2 ** 3 is 8. Adding 1 to 8 gives 9.

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
What will be the value of `x` after executing the following code snippet?
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

**Explanation:** The code snippet initializes `x` to 5 and then uses the compound assignment operator `+=` to add 3 to `x`. This is equivalent to `x = x + 3`, resulting in `x` being 8. Option A (8) is correct, while options B (7), C (6), and D (9) are incorrect off-by-one errors.

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
What is the output of the following Python code snippet?
```python
name = 'Alice'
repeated_name = name * 3
print(repeated_name)
```

**Choices:**
- **[A]** `AliceAliceAlice` **(CORRECT)**
- **[B]** `Alice, Alice, Alice`
- **[C]** `Alice*3`
- **[D]** `Error: unsupported operand type(s) for *: 'str' and 'int'`

**Explanation:** The code snippet multiplies the string 'Alice' by 3 using the multiplication operator *. This results in the string being repeated three times, producing 'AliceAliceAlice'. Choice B is incorrect because it suggests a different output format. Choice C is wrong as it shows an attempt to use the multiplication operator on incompatible types (string and integer). Choice D is incorrect because there is no error; the operation is valid.

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
a = True
b = False
c = int(a) + int(b)
print(c)
```

**Choices:**
- **[A]** `0`
- **[B]** `1` **(CORRECT)**
- **[C]** `2`
- **[D]** `-1`

**Explanation:** The `int(True)` converts the boolean value True to the integer 1, and `int(False)` converts it to 0. Therefore, `c = int(a) + int(b)` results in `c = 1 + 0`, which equals 1.

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
Consider the following Python code snippet:
```python
str_num = "123"
int_num = int(str_num)
print(int_num)
```
What will be the output of this code?

**Choices:**
- **[A]** `123`
- **[B]** `124`
- **[C]** `Error: invalid literal for int() with base 10: '123'` **(CORRECT)**
- **[D]** `TypeError: can only concatenate str (not "int") to str`

**Explanation:** The code attempts to convert a string '123' to an integer using the int() function. Since '123' is a valid string representation of an integer, there will be no error and the output will be 123. Option A is incorrect because it does not match the expected output. Option B is incorrect because it suggests an off-by-one error, which is not applicable here. Option D is incorrect because it suggests a type error, but int() can handle string representations of integers without issues.

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
c = a + b * 2
print(c)
```

**Choices:**
- **[A]** `14`
- **[B]** `11` **(CORRECT)**
- **[C]** `9`
- **[D]** `8`

**Explanation:** The code snippet calculates the value of `c` using operator precedence. According to Python rules, multiplication is performed before addition. Therefore, `b * 2` is calculated first, resulting in `3 * 2 = 6`. Then, this result is added to `a`, giving `5 + 6 = 11`. Thus, the output is `11`.

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
Consider the following Python code snippet:
```python
age = 30
Age = 45
print(age)
``` What will be the output of this code?


**Choices:**
- **[A]** `30` **(CORRECT)**
- **[B]** `45`
- **[C]** `Error: NameError`
- **[D]** `Error: SyntaxError`

**Explanation:** The code declares a variable named 'age' with the value 30. The second line attempts to declare another variable with the same name but different case ('Age'), which is not allowed in Python due to its case-sensitive nature. Therefore, the first declaration takes precedence, and the output will be 30.

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
Which of the following Python code snippets correctly accesses the last element of a list named `my_list` that contains `[10, 'hello', 3.14, True]`?
```python
# code here
```

**Choices:**
- **[A]** `print(my_list[-2])`
- **[B]** `print(my_list[-1])` **(CORRECT)**
- **[C]** `print(my_list[3])`
- **[D]** `print(my_list[0])`

**Explanation:** The correct choice is `print(my_list[-1])` because in Python, negative indices start from -1, where -1 refers to the last element of the list. The other choices are incorrect: `my_list[-2]` would access the second-to-last element, `my_list[3]` would access the fourth element (which is True), and `my_list[0]` would access the first element.

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
Which of the following Python code snippets correctly accesses the last element of a list using negative indexing?

**Choices:**
- **[A]** `my_list[-2]`
- **[B]** `my_list[-1]` **(CORRECT)**
- **[C]** `my_list[0]`
- **[D]** `my_list[len(my_list)-1]`

**Explanation:** The correct answer is my_list[-1], which accesses the last element of a list using negative indexing. Negative indices in Python start from -1 for the last item, so my_list[-1] correctly retrieves the last element. The other options are incorrect because they either access an element before the last one (my_list[-2]) or use a more verbose method that does not utilize negative indexing (my_list[len(my_list)-1]).

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
new_list = my_list.append(4)
print(new_list)
````
- **[B]** ````python
my_list = [1, 2, 3]
my_list[0] = 10
print(my_list)
```` **(CORRECT)**
- **[C]** ````python
my_list = (1, 2, 3)
my_list[0] = 10
print(my_list)
````
- **[D]** ````python
my_dict = {'a': 1, 'b': 2}
my_dict['c'] = 3
print(my_dict)
````

**Explanation:** The correct answer demonstrates in-place mutability of a list by changing the value at index 0 to 10. The `append` method does not return the modified list, so using it in this context is incorrect. Tuples are immutable, and dictionaries allow adding new key-value pairs but do not modify existing ones in place.

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
Which of the following Python code snippets correctly slices a list to get elements from index 2 to 4 (inclusive) using list slicing syntax?

**Choices:**
- **[A]** ````python
my_list = [1, 2, 3, 4, 5]
sliced_list = my_list[2:5]
```` **(CORRECT)**
- **[B]** ````python
my_list = [1, 2, 3, 4, 5]
sliced_list = my_list[2:4]
````
- **[C]** ````python
my_list = [1, 2, 3, 4, 5]
sliced_list = my_list[1:4]
````
- **[D]** ````python
my_list = [1, 2, 3, 4, 5]
sliced_list = my_list[0:4]
````

**Explanation:** The correct answer is A. The slicing syntax `my_list[start:stop]` includes the element at the start index but excludes the element at the stop index. Therefore, to get elements from index 2 to 4 (inclusive), we use `my_list[2:5]`. Choices B, C, and D have errors in either the start or stop index.

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
Consider the following Python code snippet:
```python
my_list = [10, 'hello', 3.14, True]
sliced_list = my_list[1:4:2]
print(sliced_list)
```

**Choices:**
- **[A]** `[10, 'hello']`
- **[B]** `['hello', 3.14]` **(CORRECT)**
- **[C]** `[3.14, True]`
- **[D]** `[True]`

**Explanation:** The slicing operation my_list[1:4:2] starts at index 1 and ends before index 4, taking every second element. Thus, it selects 'hello' and 3.14.

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
Given the following Python code snippet, what will be the output of `print(my_list[:2])`?
```python
my_list = [10, 'hello', 3.14, True]
```

**Choices:**
- **[A]** `[10, 'hello']` **(CORRECT)**
- **[B]** `[10]`
- **[C]** `[10, 'hello', 3.14]`
- **[D]** `[10, 'hello', 3.14, True]`

**Explanation:** The code snippet defines a list `my_list` with four elements. When slicing the list using `my_list[:2]`, it accesses all elements from the beginning of the list up to, but not including, the element at index 2. Therefore, the output will be `[10, 'hello']`. The other options are incorrect because they either include too many or too few elements.

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
Which of the following code snippets correctly reverses a list using slicing in Python?
```python
my_list = [1, 2, 3, 4, 5]
# Code here
print(my_list)
```

**Choices:**
- **[A]** `my_list[::-1]`
- **[B]** `my_list.reverse()`
- **[C]** `my_list = my_list[::-1]` **(CORRECT)**
- **[D]** `my_list = list(reversed(my_list))`

**Explanation:** The correct answer is my_list = my_list[::-1]. This line of code creates a new reversed copy of the list and assigns it back to my_list. The other options either do not reverse the list in place or use methods that are not slicing.

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
What is the output of the following code snippet?
```python
my_list = [10, 'hello']
my_list.append(3.14)
print(my_list)
```

**Choices:**
- **[A]** `[10, 'hello', 3.14]` **(CORRECT)**
- **[B]** `[10, 'hello']`
- **[C]** `[10, 'hello', 3.14, 3.14]`
- **[D]** `[3.14, 10, 'hello']`

**Explanation:** The `append()` method adds an item to the end of the list. In this case, 3.14 is added to the existing list `[10, 'hello']`, resulting in `[10, 'hello', 3.14]`. The other options are incorrect because they either miss the new element or have it in the wrong position.

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
Which of the following code snippets correctly inserts the element 'world' at index 2 in the list `my_list`?
```python
my_list = [10, 'hello']
# code here
print(my_list)
```

**Choices:**
- **[A]** `my_list.insert(3, 'world')`
- **[B]** `my_list.insert(2, 'world')` **(CORRECT)**
- **[C]** `my_list.append('world')`
- **[D]** `my_list[2] = 'world'`

**Explanation:** The correct answer is B: my_list.insert(2, 'world'). The insert() method adds an item at a specified position. In Python, list indices start at 0, so index 2 refers to the third element in the list. Inserting 'world' at index 2 results in [10, 'hello', 'world']. Option A inserts 'world' at index 3, which is out of bounds for the current list and would result in an IndexError. Option C appends 'world' to the end of the list, resulting in [10, 'hello', 'world'], but it does not insert at a specific index. Option D attempts to assign 'world' to the element at index 2, which is valid but does not use the insert() method.

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
Which of the following code snippets correctly removes the first occurrence of the value '3' from a list and prints the updated list? ```python
my_list = [1, 2, 3, 4, 3]
# code here
print(my_list)
```

**Choices:**
- **[A]** `my_list.remove(3)
Output: [1, 2, 4, 3]`
- **[B]** `my_list.pop(3)
Output: [1, 2, 3, 4]` **(CORRECT)**
- **[C]** `my_list.remove(3)
Output: [1, 2, 3, 4]`
- **[D]** `my_list.pop(my_list.index(3))
Output: [1, 2, 3, 4]`

**Explanation:** The correct choice is B. The `pop(3)` method removes the element at index 3, which is '3', and returns it. Thus, the output will be `[1, 2, 4]`. Choice A uses `remove(3)`, which removes the first occurrence of '3' by value, resulting in `[1, 2, 4, 3]`. Choice C incorrectly assumes that `pop(3)` will remove the element at index 3, but it actually removes the element at index 3 and returns it. Choice D uses `pop(my_list.index(3))`, which is correct but unnecessarily complex for this task.

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
What is the output of the following Python code snippet?
```python
my_list = [[1, 2], [3, 4], [5, 6]]
print(len(my_list))
```

**Choices:**
- **[A]** `3` **(CORRECT)**
- **[B]** `6`
- **[C]** `9`
- **[D]** `12`

**Explanation:** The `len()` function returns the number of elements in a list. In this case, `my_list` contains three sublists, so `len(my_list)` should return 3.

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
print(result)
```` **(CORRECT)**
- **[B]** ````python
list1 = [1, 2]
list2 = [3, 4]
result = list1 - list2
print(result)
````
- **[C]** ````python
list1 = [1, 2]
list2 = [3, 4]
result = list1 * list2
print(result)
````
- **[D]** ````python
list1 = [1, 2]
list2 = [3, 4]
result = list1 / list2
print(result)
````

**Explanation:** The correct answer uses the '+' operator to concatenate two lists, which is a valid operation in Python. The other operators ('-', '*', '/') are not applicable for list concatenation.

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
Which of the following code snippets correctly checks if the number 3 is in a list named `my_list` using the 'in' operator?

**Choices:**
- **[A]** ````python
if my_list[2] == 3:
    print('Number found')
````
- **[B]** ````python
if 3 in my_list:
    print('Number found')
```` **(CORRECT)**
- **[C]** ````python
if my_list[1] == 3:
    print('Number found')
````
- **[D]** ````python
if my_list[0] == 3:
    print('Number found')
````

**Explanation:** The 'in' operator checks for membership in a collection, not the index. The correct code snippet uses `3 in my_list` to check if 3 is an element of `my_list`. Options A and C are incorrect because they use indices instead of the 'in' operator. Option D is also incorrect as it checks the first element of the list.

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
- **[D]** `my_tuple = (1)  # Single element tuple`

**Explanation:** A tuple in Python is created using parentheses. The correct syntax is my_tuple = (1, 2, 3). A list uses square brackets [ ], a set uses curly braces { }, and a single element tuple requires a trailing comma.

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

**Explanation:** The correct answer is A: my_tuple[0] = 2. Tuples in Python are immutable, meaning their elements cannot be changed after the tuple is created. Attempting to modify an element of a tuple will raise a TypeError. The other options do not involve tuples and thus will not raise a TypeError.

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
What is the output of the following Python code snippet?
```python
my_tuple = (10, 20, 30, 40, 50)
print(my_tuple[2])
```

**Choices:**
- **[A]** `30` **(CORRECT)**
- **[B]** `20`
- **[C]** `10`
- **[D]** `40`

**Explanation:** The code snippet prints the third element of the tuple `my_tuple`. In Python, indexing starts at 0, so `my_tuple[2]` refers to the third element (30).

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
print(my_set)
```` **(CORRECT)**
- **[B]** ````python
my_list = [1, 2, 3, 2, 4]
my_set = list(set(my_list))
print(my_set)
````
- **[C]** ````python
my_list = [1, 2, 3, 2, 4]
my_set = {item for item in my_list}
print(my_set)
````
- **[D]** ````python
my_list = [1, 2, 3, 2, 4]
my_set = tuple(set(my_list))
print(my_set)
````

**Explanation:** The correct answer creates a set from the list, which automatically removes duplicate elements. Choice B attempts to convert the set back to a list, losing the uniqueness property. Choice C uses a dictionary comprehension, which is not necessary for creating a set and would result in a dictionary instead of a set. Choice D converts the set to a tuple, which also loses the uniqueness property.

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
Which of the following code snippets correctly demonstrates how to find the intersection of two sets in Python?

**Choices:**
- **[A]** ````python
set1 = {1, 2, 3}
set2 = {3, 4, 5}
intersection = set1 & set2
print(intersection)
```` **(CORRECT)**
- **[B]** ````python
list1 = [1, 2, 3]
list2 = [3, 4, 5]
intersection = list1.intersection(list2)
print(intersection)
````
- **[C]** ````python
dict1 = {1: 'a', 2: 'b'}
dict2 = {3: 'c', 4: 'd'}
intersection = dict1 & dict2
print(intersection)
````
- **[D]** ````python
set1 = {1, 2, 3}
set2 = {3, 4, 5}
intersection = set1.intersection(set2)
print(intersection)
````

**Explanation:** The correct choice demonstrates the use of the '&' operator to find the intersection of two sets. The other choices either involve incorrect data types (list and dictionary) or use methods that are not applicable to set operations.

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
What will be the output of this code?

**Choices:**
- **[A]** `21`
- **[B]** `20` **(CORRECT)**
- **[C]** `Alice`
- **[D]** `Computer Science`

**Explanation:** The code snippet creates a dictionary named `student` with three key-value pairs. The key 'age' is associated with the value 20. When `print(student['age'])` is executed, it retrieves and prints the value associated with the key 'age', which is 20.

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
Given the following Python code snippet, what will be the output of `print(student['major'])`?
```python
student = {'name': 'Alice', 'age': 20, 'major': 'Computer Science'}
print(student['major'])
```

**Choices:**
- **[A]** `Alice`
- **[B]** `Computer Science` **(CORRECT)**
- **[C]** `20`
- **[D]** `NameError: name 'student' is not defined`

**Explanation:** The correct choice is 'Computer Science'. The code snippet creates a dictionary named `student` with keys 'name', 'age', and 'major'. When accessing the value associated with the key 'major' using square bracket notation, Python retrieves and prints the value 'Computer Science'. The other choices are incorrect because they either refer to values that are not accessed in the code or represent errors that would occur if the code were executed.

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

**Choices:**
- **[A]** `{'name': 'Alice', 'age': 21, 'major': 'Computer Science', 'gender': 'Male'}`
- **[B]** `{'name': 'Alice', 'age': 21, 'major': 'Computer Science', 'gender': 'Female'}` **(CORRECT)**
- **[C]** `{'name': 'Alice', 'age': 20, 'major': 'Computer Science', 'gender': 'Female'}`
- **[D]** `KeyError: 'gender'`

**Explanation:** The code snippet correctly modifies the value associated with the key 'age' and adds a new key-value pair for 'gender'. The dictionary maintains its insertion order, so the output will be {'name': 'Alice', 'age': 21, 'major': 'Computer Science', 'gender': 'Female'}.

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
Consider the following Python code snippet:
```python
student = {'name': 'Alice', 'age': 20}
print(student.get('email'))
print(student.get('phone', 'N/A'))
```

**Choices:**
- **[A]** `None None`
- **[B]** `None N/A` **(CORRECT)**
- **[C]** `Alice None`
- **[D]** `Alice N/A`

**Explanation:** The `get()` method is used to retrieve values from a dictionary. If the key does not exist, it returns `None` by default unless a second argument (default value) is provided. In this case, 'email' and 'phone' keys do not exist in the dictionary, so the first print statement outputs `None`. The second print statement provides a default value of 'N/A', which is returned when 'phone' key is not found.

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
Which of the following code snippets correctly iterates over the keys and values of a dictionary and prints them in a formatted string?

**Choices:**
- **[A]** ````python
student = {'name': 'Alice', 'age': 20, 'major': 'Computer Science'}
for key, value in student.keys():
    print(f'{key}: {value}')
````
- **[B]** ````python
student = {'name': 'Alice', 'age': 20, 'major': 'Computer Science'}
for key, value in student.items():
    print(f'{key}: {value}')
```` **(CORRECT)**
- **[C]** ````python
student = {'name': 'Alice', 'age': 20, 'major': 'Computer Science'}
for key in student.values():
    print(f'{key}: {student[key]}')
````
- **[D]** ````python
student = {'name': 'Alice', 'age': 20, 'major': 'Computer Science'}
for key in student:
    print(f'{key}: {student.get(key)}')
````

**Explanation:** The correct answer uses `student.items()` to iterate over both keys and values simultaneously. The other options either incorrectly use `keys()`, which only returns the keys, or try to access values using a key that is not directly available in the loop.

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
Consider the following Python code snippet:
```python
student = {'name': 'Alice', 'age': 20, 'major': 'Computer Science'}
del student['age']
print(student)
```

**Choices:**
- **[A]** `{'name': 'Alice', 'major': 'Computer Science'}` **(CORRECT)**
- **[B]** `{'name': 'Alice', 'age': 20, 'major': 'Computer Science'}`
- **[C]** `{'name': 'Alice', 'age': 19, 'major': 'Computer Science'}`
- **[D]** `KeyError: 'age'`

**Explanation:** The `del` statement is used to remove a key-value pair from the dictionary. In this case, it removes the 'age' key and its associated value. The correct output should be {'name': 'Alice', 'major': 'Computer Science'}. Choice B is incorrect because it does not reflect any changes. Choice C is incorrect because it attempts to modify an existing key instead of removing it. Choice D is incorrect because there is no KeyError; the key exists and is removed.

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
What is the output of the following Python code snippet?
```python
my_list = [1, 2, 3]
my_list[0] = 4
print(my_list)
```

**Choices:**
- **[A]** `[1, 2, 3]`
- **[B]** `[4, 2, 3]` **(CORRECT)**
- **[C]** `[1, 4, 3]`
- **[D]** `[1, 2, 4]`

**Explanation:** The code snippet creates a list `my_list` with elements [1, 2, 3]. It then modifies the first element of the list from 1 to 4. The correct output is `[4, 2, 3]`. Choice A is incorrect because it shows no change in the first element. Choice C and D are incorrect because they incorrectly modify different elements.

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
What is the output of the following Python code snippet?
```python
x = 5
y = 10
if x < y:
    print('x is less than y')
else:
    print('x is not less than y')
```

**Choices:**
- **[A]** `x is less than y` **(CORRECT)**
- **[B]** `x is not less than y`
- **[C]** `SyntaxError`
- **[D]** `IndentationError`

**Explanation:** The code snippet checks if x is less than y. Since 5 is indeed less than 10, the condition is True and 'x is less than y' is printed.

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
Which of the following code snippets correctly demonstrates a nested if statement in Python?

**Choices:**
- **[A]** ````python
x = 10
if x > 5:
    print('Greater than 5')
else:
    print('Less than or equal to 5')
````
- **[B]** ````python
x = 10
if x > 5:
    if x < 15:
        print('Between 5 and 15')
else:
    print('Not between 5 and 15')
```` **(CORRECT)**
- **[C]** ````python
x = 10
if x > 5:
    print('Greater than 5')
if x < 15:
    print('Between 5 and 15')
else:
    print('Not between 5 and 15')
````
- **[D]** ````python
x = 10
if x > 5:
    if x < 15:
        print('Between 5 and 15')
else:
    print('Not between 5 and 15')
````

**Explanation:** The correct answer demonstrates a nested if statement where the inner if block is only executed when both outer and inner conditions are true. The other options either lack proper nesting or have logical errors.

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
elif x > 3:
    print('2')
else:
    print('3')
```` **(CORRECT)**
- **[B]** ````python
x = 10
if x > 7:
    print('1')
elif x > 5:
    print('2')
else:
    print('3')
````
- **[C]** ````python
x = 10
if x > 6:
    print('1')
elif x > 4:
    print('2')
else:
    print('3')
````
- **[D]** ````python
x = 10
if x > 8:
    print('1')
elif x > 6:
    print('2')
else:
    print('3')
````

**Explanation:** The correct answer is A. The code checks conditions sequentially. Since x = 10, the first condition `x > 5` is True, but it does not execute because there's an `elif` statement following it. The next condition `x > 3` is also True, and since this is the first `elif` that evaluates to True, '2' is printed. Options B, C, and D have different conditions that would lead to different outputs.

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
Consider the following Python code snippet:
```python
x = 5
y = 10
if x == y:
    print('Equal')
else:
    print('Not Equal')
```

**Choices:**
- **[A]** `Choice A: Equal`
- **[B]** `Choice B: Not Equal` **(CORRECT)**
- **[C]** `Choice C: True`
- **[D]** `Choice D: False`

**Explanation:** The code compares the values of x and y using the equality operator '=='. Since x (5) is not equal to y (10), the condition evaluates to False, and the else block is executed. Therefore, 'Not Equal' is printed.

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
What will be printed when the following code is executed?
```python
x = 5
y = 10
if x != y:
    print('x is not equal to y')
else:
    print('x is equal to y')
```

**Choices:**
- **[A]** `x is greater than y`
- **[B]** `x is not equal to y` **(CORRECT)**
- **[C]** `x is equal to y`
- **[D]** `SyntaxError`

**Explanation:** The code checks if x is not equal to y. Since 5 is indeed not equal to 10, the condition is True and 'x is not equal to y' will be printed.

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
Which of the following Python code snippets will output 'Both conditions are True'?

**Choices:**
- **[A]** ````python
x = False
y = False
if x and y:
    print('Both conditions are True')
else:
    print('At least one condition is False')
````
- **[B]** ````python
x = True
y = True
if x and y:
    print('Both conditions are True')
else:
    print('At least one condition is False')
```` **(CORRECT)**
- **[C]** ````python
x = True
y = False
if x and y:
    print('Both conditions are True')
else:
    print('At least one condition is False')
````
- **[D]** ````python
x = False
y = True
if x and y:
    print('Both conditions are True')
else:
    print('At least one condition is False')
````

**Explanation:** The 'and' operator in Python requires both conditions to be True for the entire expression to evaluate to True. In this case, only when x and y are both True will the code print 'Both conditions are True'.

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
Which of the following Python code snippets correctly demonstrates the use of the 'or' operator with at least one condition being True?

**Choices:**
- **[A]** ````python
x = False
y = False
print(x or y) # Output: True``
- **[B]** ````python
x = True
y = False
print(x or y) # Output: True`` **(CORRECT)**
- **[C]** ````python
x = 5
y = 10
print(x > y or x < y) # Output: False``
- **[D]** ````python
x = 'hello'
y = 'world'
print(x == y or x != y) # Output: True``

**Explanation:** The correct answer is B. The 'or' operator returns True if at least one of the conditions is True. In this case, x = True and y = False, so x or y evaluates to True. Choice A is incorrect because both conditions are False. Choice C is incorrect because both conditions (x > y and x < y) are True, but the 'or' operator only needs at least one condition to be True. Choice D is correct because even though x == y is False, x != y is True, so the overall expression evaluates to True.

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
Which of the following code snippets correctly demonstrates the use of the 'not' logical operator to negate a boolean value?

**Choices:**
- **[A]** ````python
x = True
y = not x
print(y) # Output: False
```` **(CORRECT)**
- **[B]** ````python
x = False
y = not x
print(y) # Output: True
````
- **[C]** ````python
x = 5
y = not x
print(y) # Output: Error
````
- **[D]** ````python
x = 'hello'
y = not x
print(y) # Output: False
````

**Explanation:** The correct answer demonstrates the use of 'not' to negate a boolean value. Option A correctly negates True to False. Options B, C, and D contain errors: Option B incorrectly negates False to True; Option C attempts to apply 'not' to an integer, which is not valid in Python; Option D attempts to apply 'not' to a string, which also results in an error.

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

**Explanation:** The 'or' operator in Python returns True if at least one of the conditions is True. In this case, x is True, so the expression evaluates to True.

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
Which of the following Python code snippets will output 'The number is not positive' when executed?

**Choices:**
- **[A]** ````python
number = -5
if number > 0:
    print('The number is positive')
else:
    print('The number is not positive')
````
- **[B]** ````python
number = 10
if number <= 0:
    print('The number is not positive')
else:
    print('The number is positive')
```` **(CORRECT)**
- **[C]** ````python
number = 5
if number > 0:
    print('The number is positive')
else:
    print('The number is not positive')
````
- **[D]** ````python
number = 0
if number < 0:
    print('The number is negative')
else:
    print('The number is not positive')
````

**Explanation:** Explanation: The correct choice checks if the number is less than or equal to zero, which will be true for negative numbers and zero. Therefore, it prints 'The number is not positive'. The other choices either have incorrect conditions or do not handle non-positive numbers correctly.

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
What is the output of the following Python code snippet?
```python
x = 5
y = 10
if x < y:
    print('Less than')
else:
    print('Greater than or equal to')
```

**Choices:**
- **[A]** `Less than` **(CORRECT)**
- **[B]** `Greater than or equal to`
- **[C]** `SyntaxError`
- **[D]** `RuntimeError`

**Explanation:** The code snippet compares the values of x and y using the less than operator. Since 5 is indeed less than 10, the condition `x < y` evaluates to True. Therefore, the 'Less than' message is printed. The other options are incorrect because there is no syntax or runtime error in the code.

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
if x > 3:
    if y < 12:
        print('Condition met')
else:
    print('Outer else')
```

**Choices:**
- **[A]** `Condition met` **(CORRECT)**
- **[B]** `Outer else`
- **[C]** `SyntaxError`
- **[D]** `IndentationError`

**Explanation:** The code snippet checks if `x > 3` and `y < 12`. Since both conditions are true, the inner block is executed, printing 'Condition met'. The outer else block is not reached because the inner condition is satisfied.

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
What will be the output of the following Python code snippet?
```python
x = 15
if 10 < x < 20:
    print('x is between 10 and 20')
else:
    print('x is not between 10 and 20')
```

**Choices:**
- **[A]** `'x is between 10 and 20'` **(CORRECT)**
- **[B]** `'x is not between 10 and 20'`
- **[C]** `SyntaxError`
- **[D]** `TypeError`

**Explanation:** The code snippet uses chained comparison operators to check if x is between 10 and 20. Since x = 15, the condition 10 < x < 20 evaluates to True, so 'x is between 10 and 20' will be printed. The other options are incorrect because there is no syntax or type error in the code.

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
Consider the following Python code snippet:
```python
age = 20
status = 'Adult' if age >= 18 else 'Minor'
print(status)
```
What will be printed to the console?

**Choices:**
- **[A]** `Adult` **(CORRECT)**
- **[B]** `Minor`
- **[C]** `Error: Invalid syntax`
- **[D]** `20`

**Explanation:** The ternary operator checks if the condition `age >= 18` is True. Since age is 20, which is greater than or equal to 18, the expression evaluates to 'Adult'. Therefore, 'Adult' will be printed.

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
- **[A]** `x is less than y` **(CORRECT)**
- **[B]** `x is not less than y`
- **[C]** `SyntaxError: invalid syntax`
- **[D]** `5 < 10`

**Explanation:** The code snippet uses a comparison operator (<) to check if x is less than y. Since 5 is indeed less than 10, the condition evaluates to True, and 'x is less than y' is printed.

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
What will be the output of the following Python code snippet?
```python
numbers = [1, 2, 3, 4]
total = 0
for number in numbers:
total += number
print(total)
```

**Choices:**
- **[A]** `9`
- **[B]** `10` **(CORRECT)**
- **[C]** `8`
- **[D]** `7`

**Explanation:** The code initializes a list of numbers and iterates over each number, adding it to the total. The final value of total is 10.

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
Which of the following code snippets correctly iterates over each character in the string 'Python' and prints it? ```python
word = 'Python'
for char in word:
print(char)
```

**Choices:**
- **[A]** `Choice A text`
- **[B]** `Choice B text` **(CORRECT)**
- **[C]** `Choice C text`
- **[D]** `Choice D text`

**Explanation:** The correct choice is B. The code snippet correctly uses a for loop to iterate over each character in the string 'Python' and prints it. Choice A is incorrect because it does not use a for loop. Choice C is incorrect because it attempts to access an index that is out of range. Choice D is incorrect because it tries to print the entire string instead of each individual character.

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
What is the output of the following code snippet?
```python
for i in range(5):
    print(i)
```

**Choices:**
- **[A]** `0 1 2 3 4` **(CORRECT)**
- **[B]** `1 2 3 4 5`
- **[C]** `0 2 4 6 8`
- **[D]** `-1 0 1 2 3`

**Explanation:** The range(5) function generates numbers starting from 0 up to (but not including) 5. Therefore, it prints 0, 1, 2, 3, and 4.

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
What is the output of the following code snippet?
```python
for i in range(3, 8):
    print(i)
```

**Choices:**
- **[A]** `2 3 4 5 6 7`
- **[B]** `3 4 5 6 7` **(CORRECT)**
- **[C]** `1 2 3 4 5 6 7`
- **[D]** `0 1 2 3 4 5 6 7`

**Explanation:** The range function starts from the start value (inclusive) and goes up to but does not include the stop value. Therefore, for i in range(3, 8), it will print numbers starting from 3 up to but not including 8, which are 3, 4, 5, 6, and 7.

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
Consider the following code snippet:
```python
for i in range(0, 10, 3):
    print(i)
``` What will be the output of this code?


**Choices:**
- **[A]** `0 3 6 9` **(CORRECT)**
- **[B]** `0 2 4 6 8`
- **[C]** `1 4 7`
- **[D]** `0 1 2 3 4 5 6 7 8 9`

**Explanation:** The range function generates numbers starting from the start value (inclusive) up to but not including the stop value, incrementing by the step. Here, it starts at 0 and increments by 3 each time until it reaches or exceeds 10. Therefore, the output will be 0, 3, 6, and 9.

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
What will be the output of the following Python code snippet?
```python
for i in range(10, -1, -2):
    print(i)
```

**Choices:**
- **[A]** `8 6 4 2 0` **(CORRECT)**
- **[B]** `10 8 6 4 2 0`
- **[C]** `9 7 5 3 1`
- **[D]** `10 8 6 4`

**Explanation:** The range function starts at 10 and decrements by 2 until it reaches -1 (exclusive). The correct output is 8 6 4 2 0.

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
- **[B]** `0 1 2 3`
- **[C]** `1 2 3 4 5`
- **[D]** `Syntax Error`

**Explanation:** The code initializes a variable `i` to 0 and enters a while loop that continues as long as `i` is less than 5. Inside the loop, it prints the value of `i` and then increments `i` by 1. The loop will run 5 times, printing 0 through 4.

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
Which of the following code snippets correctly updates the loop counter variable to prevent an infinite loop?
```python
# Code snippet
i = 0
while i < 5:
    print(i)
    # Missing line to update i
```

**Choices:**
- **[A]** `i += 1` **(CORRECT)**
- **[B]** `i -= 1`
- **[C]** `i = 0`
- **[D]** `i *= 2`

**Explanation:** The correct choice is `i += 1`. This line increments the value of `i` by 1 in each iteration, ensuring that the condition `i < 5` will eventually become false and the loop will terminate. The other choices either decrement `i`, reset it to 0, or double its value, all of which could potentially lead to an infinite loop if not handled correctly.

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
while True:
    user_input = input('Enter command: ')
    if user_input != 'quit':
        continue
````

**Explanation:** The correct answer uses the `break` statement to exit the loop immediately when the condition is met. The other options either use `continue`, which skips the current iteration, or do not have a condition that terminates the loop.

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
Which of the following code snippets will correctly print all odd numbers from 1 to 6 using a for loop and continue statement?

**Choices:**
- **[A]** ````python
numbers = [1, 2, 3, 4, 5, 6]
for num in numbers:
    if num % 2 == 0:
        print(num)
````
- **[B]** ````python
numbers = [1, 2, 3, 4, 5, 6]
for num in numbers:
    if num % 2 != 0:
        continue
    print(num)
```` **(CORRECT)**
- **[C]** ````python
numbers = [1, 2, 3, 4, 5, 6]
for num in numbers:
    if num % 2 == 0:
        continue
    print(num)
````
- **[D]** ````python
numbers = [1, 2, 3, 4, 5, 6]
for num in numbers:
    if num % 2 == 0:
        break
    print(num)
````

**Explanation:** The correct choice uses the continue statement to skip even numbers and print only odd numbers. Choice A incorrectly prints even numbers because it does not use a condition to skip them. Choice C is incorrect because it continues printing all numbers, including even ones. Choice D is incorrect because it breaks out of the loop when an even number is encountered.

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
Consider the following Python code snippet that aims to sum all numbers from 1 to 5 using a for loop. ```python
sum = 0
for i in range(1, 6):
    sum += i
print(sum)
``` What will be the output of this code?

**Choices:**
- **[A]** `A) 15` **(CORRECT)**
- **[B]** `B) 14`
- **[C]** `C) 16`
- **[D]** `D) 0`

**Explanation:** The for loop iterates from 1 to 5 (inclusive), and the sum variable accumulates each value. The correct output is 15.

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
for i in range(len(numbers)):
    print(numbers[i])
```

**Choices:**
- **[A]** `Prints: 0 1 2`
- **[B]** `Prints: 1 2 3` **(CORRECT)**
- **[C]** `Prints: 2 3 4`
- **[D]** `Raises an IndexError`

**Explanation:** The for loop iterates over the range of indices of the list 'numbers'. Since Python uses zero-indexing, it starts from 0 and goes up to len(numbers) - 1. Therefore, it prints the elements at indices 0, 1, and 2, which are 1, 2, and 3 respectively.

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
Consider the following Python code snippet:
```python
my_dict = {'a': 1, 'b': 2, 'c': 3}
for key in my_dict.keys():
    print(key)
```

**Choices:**
- **[A]** `It will print: a b c` **(CORRECT)**
- **[B]** `It will raise an error because dictionaries are not iterable.`
- **[C]** `It will print: {'a': 1, 'b': 2, 'c': 3}`
- **[D]** `It will print: a
b
c
d`

**Explanation:** The correct choice is A. The for loop iterates over the keys of the dictionary `my_dict` and prints each key. Dictionaries in Python are iterable, so this code will execute without errors and print 'a', 'b', and 'c'. Choice B is incorrect because dictionaries are indeed iterable. Choice C is wrong because it attempts to print the entire dictionary instead of its keys. Choice D is incorrect because there is no 'd' key in the dictionary.

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
- **[C]** `1 apple
2 banana
3 cherry`
- **[D]** `apple 1
banana 2
c cherry 3`

**Explanation:** The enumerate() function adds a counter to an iterable and returns it in a form of enumerate object. The syntax is enumerate(iterable, start=0). In this case, the loop starts at index 0 by default. Therefore, the output will be '0 apple', '1 banana', and '2 cherry'.

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
Which of the following code snippets correctly finds the maximum value in a list using a for loop? ```python
numbers = [3, 5, 1, 8, 2]
max_value = None
for num in numbers:
    if max_value is None or num > max_value:
        max_value = num
print(max_value)
```

**Choices:**
- **[A]** `Choice A: ```python
numbers = [3, 5, 1, 8, 2]
max_value = numbers[0]
for num in numbers:
    if num > max_value:
        max_value = num
print(max_value)
````
- **[B]** `Choice B: ```python
numbers = [3, 5, 1, 8, 2]
max_value = None
for num in numbers:
    if max_value is None or num > max_value:
        max_value = num
print(max_value)
```` **(CORRECT)**
- **[C]** `Choice C: ```python
numbers = [3, 5, 1, 8, 2]
max_value = numbers[0]
for num in numbers:
    if num < max_value:
        max_value = num
print(max_value)
````
- **[D]** `Choice D: ```python
numbers = [3, 5, 1, 8, 2]
max_value = None
for num in numbers:
    if max_value is not None and num > max_value:
        max_value = num
print(max_value)
````

**Explanation:** The correct choice initializes `max_value` to `None` and updates it only if the current number is greater than the current maximum. This ensures that the loop correctly identifies the maximum value in the list. Choice A incorrectly initializes `max_value` to the first element of the list, which may not be the maximum. Choice C attempts to find the minimum value instead of the maximum. Choice D has a logical error where it updates `max_value` only if it is not `None`, which would cause an error on the first iteration.

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
Consider the following Python code snippet that counts how many times the number 3 appears in a list of integers. ```python
numbers = [1, 2, 3, 4, 5, 3, 6]
count = 0
for num in numbers:
    if num == 3:
        count += 1
print(count)
``` What will be the output of this code?

**Choices:**
- **[A]** `2`
- **[B]** `3` **(CORRECT)**
- **[C]** `4`
- **[D]** `5`

**Explanation:** The code initializes a counter `count` to 0. It then iterates over each element in the list `numbers`. For each element, it checks if the element is equal to 3. If it is, it increments the counter by 1. After iterating through all elements, it prints the final value of `count`, which is 2 because there are two occurrences of 3 in the list.

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
Consider the following Python code snippet that is intended to create a new list containing only even numbers from an existing list. ```python
numbers = [1, 2, 3, 4, 5, 6]
even_numbers = []
for number in numbers:
    if number % 2 == 0:
        even_numbers.append(number)
``` What will be the output of this code?


**Choices:**
- **[A]** `even_numbers = [1, 3, 5]`
- **[B]** `even_numbers = [2, 4, 6]` **(CORRECT)**
- **[C]** `even_numbers = [0, 2, 4, 6]`
- **[D]** `even_numbers = [1, 2, 3, 4, 5, 6]`

**Explanation:** The code iterates over the list 'numbers' and checks if each number is even using the modulus operator. If a number is even, it is appended to the 'even_numbers' list. The correct output should be [2, 4, 6].

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
Consider the following Python code snippet:
```python
user_input = ""
while user_input != "quit":
    user_input = input("Enter command: ")
print("Exiting loop")
```
What will be the output if a user enters 'help' and then 'quit'?


**Choices:**
- **[A]** `Enter command: help
Enter command: quit
Exiting loop`
- **[B]** `Enter command: help
Exiting loop` **(CORRECT)**
- **[C]** `Enter command: quit
Exiting loop`
- **[D]** `Error: Invalid input`

**Explanation:** The correct answer is B. When the user enters 'help', the loop continues and asks for another command. However, when the user enters 'quit', the condition `user_input != "quit"` becomes false, causing the loop to exit and print 'Exiting loop'. Choice A is incorrect because it shows an extra iteration that does not occur. Choice C is incorrect because it assumes the loop exits immediately upon entering 'quit', which is not the case. Choice D is incorrect because there are no invalid inputs in this scenario.

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
What is the output of the following code snippet?
```python
numbers = [1, 2, 3, 4, 5]
count = 0
for num in numbers:
    if num % 2 == 0:
        count += 1
print(count)
```

**Choices:**
- **[A]** `0`
- **[B]** `2` **(CORRECT)**
- **[C]** `3`
- **[D]** `5`

**Explanation:** The code counts the number of even numbers in the list 'numbers'. It iterates through each number, checks if it is even using the modulus operator, and increments the count if true. The final output is the count of even numbers.

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
numbers = [3, 5, 7, 9]
for num in numbers:
    if num == 6:
        found = True
        break
print(found)
```

**Choices:**
- **[A]** `True`
- **[B]** `False` **(CORRECT)**
- **[C]** `SyntaxError`
- **[D]** `Infinite Loop`

**Explanation:** The code initializes a boolean flag `found` to False. It then iterates over the list `numbers`. If it finds the number 6, it sets `found` to True and breaks out of the loop. Since 6 is not in the list, the loop completes without finding 6, and `found` remains False. Therefore, the output is False.

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
What is the output of the following Python code snippet?
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
- **[C]** `NameError: name 'name' is not defined`
- **[D]** `TypeError: greet() takes no arguments (1 given)`

**Explanation:** The function `greet` is defined to take one parameter, `name`. In the `main` function, we call `greet('Alice')`, which correctly passes 'Alice' as an argument. The function returns the string 'Hello, Alice!', which is then printed by the `print` statement in `main()`. Therefore, the correct output is 'Hello, Alice!'.

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
Consider the following Python function definition:
```python
def calculate_area(length, width):
    return length * width
```
What will be the output of calling `calculate_area(5, 3)`?


**Choices:**
- **[A]** `15` **(CORRECT)**
- **[B]** `8`
- **[C]** `10`
- **[D]** `20`

**Explanation:** The function `calculate_area` takes two parameters, `length` and `width`. When called with the arguments `5` and `3`, it calculates the area as `5 * 3 = 15`. Therefore, the correct output is `15`.

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
What is the output of the following Python code snippet?
```python
def multiply(a, b):
    return a * b
result = multiply(4, 3)
print(result)
```

**Choices:**
- **[A]** `12` **(CORRECT)**
- **[B]** `10`
- **[C]** `8`
- **[D]** `7`

**Explanation:** The function `multiply` takes two arguments, `a` and `b`, and returns their product. When called with `multiply(4, 3)`, the result is `12`. The print statement then outputs this value.

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
What is the output of the following Python code snippet?
```python
def greet(name):
    return f'Hello, {name}!'

print(greet('Alice'))
```

**Choices:**
- **[A]** `Hello, Alice!` **(CORRECT)**
- **[B]** `None`
- **[C]** `Hello, !`
- **[D]** `TypeError: greet() missing 1 required positional argument: 'name'`

**Explanation:** The function `greet` is defined to return a greeting string. When called with the argument `'Alice'`, it correctly returns 'Hello, Alice!'. The print statement then outputs this returned value.

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
- **[B]** `Hello, Alice!`
- **[C]** `'Hello, Alice!'`
- **[D]** `Error: function has no return statement`

**Explanation:** The `greet` function is defined to print a greeting message but does not have an explicit return statement. In Python, if a function does not have a return statement, it implicitly returns `None`. Therefore, the output of the code will be `None`, and nothing else will be printed.

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
Which of the following functions correctly returns a tuple containing the sum and product of two numbers?

**Choices:**
- **[A]** ````python
def calculate(a, b):
    return a + b
````
- **[B]** ````python
def calculate(a, b):
    sum = a + b
    product = a * b
    return (sum, product)
```` **(CORRECT)**
- **[C]** ````python
def calculate(a, b):
    result = a + b * a
    return result
````
- **[D]** ````python
def calculate(a, b):
    sum = a + b
    product = a * b
    return sum, product
````

**Explanation:** The correct function returns a tuple containing both the sum and product of two numbers. Choice A only returns the sum, Choice C calculates an incorrect value, and Choice D has the same issue as Choice A.

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
Which of the following is the correct way to define a function with default parameters in Python, avoiding potential bugs related to mutable default arguments?

**Choices:**
- **[A]** ````python
def add_item(item, items=[]): items.append(item); return items
````
- **[B]** ````python
def add_item(item, items=None): if items is None: items = []; items.append(item); return items
```` **(CORRECT)**
- **[C]** ````python
def add_item(item, items=()): items += (item,); return items
````
- **[D]** ````python
def add_item(item, items={}): items[item] = 1; return items
````

**Explanation:** The correct answer initializes the default mutable argument `items` to `None` and then checks if it is `None` inside the function. If it is, it reassigns it to an empty list. This avoids the common pitfall of using a mutable object as a default argument in Python, which can lead to unexpected behavior when the function is called multiple times. The other options either use incorrect syntax or do not properly handle the initialization of the default argument.

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
Which of the following function calls will correctly pass keyword arguments to a function named `greet` that expects two parameters: `name` and `age`?
```python
def greet(name, age):
    print(f'Hello, {name}. You are {age} years old.')

# Which of these calls is correct?
greet(?, ?)
```


**Choices:**
- **[A]** `greet('Alice', 30)`
- **[B]** `greet(name='Alice', age=30)` **(CORRECT)**
- **[C]** `greet(age=30, 'Alice')`
- **[D]** `greet(30, 'Alice')`

**Explanation:** The correct choice is `greet(name='Alice', age=30)`. This correctly passes keyword arguments to the function, specifying both `name` and `age`. The other choices either use positional arguments incorrectly or mix up the order of parameters.

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
- **[A]** `Output: 10 10`
- **[B]** `Output: 10 5` **(CORRECT)**
- **[C]** `Output: 5 10`
- **[D]** `Error: UnboundLocalError`

**Explanation:** The function `my_function` has a local variable `x` that shadows the global variable `x`. When `print(x)` is called inside the function, it prints the value of the local `x`, which is 10. Outside the function, the global `x` remains unchanged and is printed as 5.

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
Consider the following Python code snippet:
```python
def calculate_average(numbers):
    return sum(numbers) / len(numbers)

average = calculate_average([1, 2, 3])
print(average)
```
What will be the output of this code?

**Choices:**
- **[A]** `6.0`
- **[B]** `2.0` **(CORRECT)**
- **[C]** `1.5`
- **[D]** `3.0`

**Explanation:** The function `calculate_average` correctly calculates the average of the numbers in the list `[1, 2, 3]`, which is `(1 + 2 + 3) / 3 = 6.0 / 3 = 2.0`. The variable `average` holds this value and is printed.

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
- **[A]** `10 10`
- **[B]** `5 10` **(CORRECT)**
- **[C]** `10 5`
- **[D]** `5 5`

**Explanation:** The function `my_function` defines a local variable `x` with the value 10. When `print(x)` is called inside the function, it prints the local `x`, which is 10. Outside the function, the global `x` remains unchanged at its initial value of 5.

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
Which of the following code snippets correctly demonstrates how to pass a mutable object like a list to a function without causing in-place side effects?

**Choices:**
- **[A]** ````python
def add_item(item, items=[]):
    items.append(item)
    return items
my_list = [1, 2, 3]
new_list = add_item(4, my_list)
print(new_list) # Output: [1, 2, 3, 4]`
- **[B]** ````python
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
my_list = [1, 2, 3]
new_list = add_item(4, my_list)
print(new_list) # Output: [1, 2, 3, 4]` **(CORRECT)**
- **[C]** ````python
def add_item(item, items=[]):
    items.append(item)
    return items
my_list = [1, 2, 3]
new_list = add_item(4)
print(new_list) # Output: [1, 2, 3, 4]`
- **[D]** ````python
def add_item(item, items=[]):
    return items + [item]
my_list = [1, 2, 3]
new_list = add_item(4, my_list)
print(new_list) # Output: [1, 2, 3, 4]`

**Explanation:** The correct answer uses `items=None` and initializes the list inside the function if it is not provided. This prevents in-place side effects on the original list, ensuring that the function does not modify the input list directly.

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
Consider the following Python function that calculates the sum of a list of numbers and returns the average. ```python
def calculate_average(numbers):
    return sum(numbers) / len(numbers)
``` What will be the output when calling `calculate_average([1, 2, 3])`?

**Choices:**
- **[A]** `6`
- **[B]** `2.0` **(CORRECT)**
- **[C]** `5`
- **[D]** `4`

**Explanation:** The function `calculate_average` takes a list of numbers as input. It calculates the sum of the numbers using `sum(numbers)` and then divides by the length of the list using `len(numbers)`. For the input `[1, 2, 3]`, the sum is 6 and the length is 3, so the average is 6 / 3 = 2.0.

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
What is the output of the following Python code snippet?
```python
def greet(name):
    return f'Hello, {name}!'

print(greet('Alice'))
```

**Choices:**
- **[A]** `Hello, Alice!` **(CORRECT)**
- **[B]** `Hello, Bob!`
- **[C]** `NameError: name 'name' is not defined`
- **[D]** `TypeError: greet() takes 0 positional arguments but 1 was given`

**Explanation:** The function `greet` is defined to take one parameter, `name`. When calling `greet('Alice')`, the argument 'Alice' is correctly passed to the function. The function returns a string with the greeting message, which is then printed as 'Hello, Alice!'.

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
- **[C]** `8.0`
- **[D]** `1.0`

**Explanation:** The function `calculate_average` takes a list of numbers as input and returns their average. The sum of [1, 2, 3, 4] is 10, and the length of the list is 4. Therefore, the average is 10 / 4 = 2.5.

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
What is the output of the following Python code snippet?
```python
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)
print(factorial(3))
```

**Choices:**
- **[A]** `6` **(CORRECT)**
- **[B]** `5`
- **[C]** `4`
- **[D]** `7`

**Explanation:** The `factorial` function is a recursive function that calculates the factorial of a number. The base case is when `n == 0`, in which case it returns 1. For any other value of `n`, it returns `n * factorial(n - 1)`. When called with `factorial(3)`, it computes 3 * 2 * 1, which equals 6.

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
Consider the following Python function that calculates the factorial of a number using recursion:
```python
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)
```
What will be the output when calling `factorial(3)`?

**Choices:**
- **[A]** `6` **(CORRECT)**
- **[B]** `5`
- **[C]** `4`
- **[D]** `3`

**Explanation:** The function `factorial(3)` will call itself with the arguments `factorial(2)`, `factorial(1)`, and finally `factorial(0)`. Each recursive call multiplies the current value of `n` by the result of the next recursive call until it reaches `factorial(0)`, which returns 1. The final result is 3 * 2 * 1 = 6.

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
What is the output of the following code snippet?
```python
x = lambda a, b: a + b
print(x(3, 4))
```

**Choices:**
- **[A]** `7` **(CORRECT)**
- **[B]** `8`
- **[C]** `9`
- **[D]** `10`

**Explanation:** The lambda function `x` takes two arguments, `a` and `b`, and returns their sum. When called with `x(3, 4)`, it adds 3 and 4 to get 7.

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
Which of the following code snippets correctly uses a lambda function with `map()` to square each number in a list?

**Choices:**
- **[A]** ````python
numbers = [1, 2, 3]
squared_numbers = map(lambda x: x * x, numbers)
print(list(squared_numbers))
```` **(CORRECT)**
- **[B]** ````python
numbers = [1, 2, 3]
squared_numbers = map(lambda x: x + x, numbers)
print(list(squared_numbers))
````
- **[C]** ````python
numbers = [1, 2, 3]
squared_numbers = map(x * x, numbers)
print(list(squared_numbers))
````
- **[D]** ````python
numbers = [1, 2, 3]
squared_numbers = map(lambda x: x ** 2, numbers)
print(list(squared_numbers))
````

**Explanation:** The correct choice is A. The lambda function `lambda x: x * x` correctly squares each number in the list. Choice B uses addition instead of multiplication, which would not square the numbers. Choice C lacks the necessary lambda keyword and uses an invalid syntax for squaring. Choice D uses the exponentiation operator `**`, but it is not necessary as `x * x` achieves the same result.

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
What is the output of the following Python code?
```python
def greet(name):
    return f'Hello, {name}!'
def introduce(greet_func, person):
    return greet_func(person)
print(introduce(greet, 'Alice'))
```

**Choices:**
- **[A]** `Hello, Alice!` **(CORRECT)**
- **[B]** `Hello, Bob!`
- **[C]** `NameError: name 'person' is not defined`
- **[D]** `TypeError: greet() takes 0 positional arguments but 1 was given`

**Explanation:** The code defines two functions, `greet` and `introduce`. The `greet` function takes a name as an argument and returns a greeting string. The `introduce` function takes another function (`greet_func`) and a person's name as arguments, then calls the passed function with the person's name. When calling `introduce(greet, 'Alice')`, it correctly passes the `greet` function and the string `'Alice'` to `introduce`. The `introduce` function then calls `greet('Alice')`, which returns the string 'Hello, Alice!', which is printed.

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

