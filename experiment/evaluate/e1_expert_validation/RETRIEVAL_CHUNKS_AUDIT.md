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
- **[C]** `TypeError`
- **[D]** `'x' and 'y' cannot be added together`

**Explanation:** The code attempts to add an integer (5) and a string ('10'). In Python, attempting to perform arithmetic operations between different types results in a TypeError. The correct output is '510' because the '+' operator concatenates strings instead of performing addition.

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
- **[D]** `3.0`

**Explanation:** The code performs floating-point division of `int_a` by `int_b`. In Python, when both operands are integers, the result of the division is a float. Therefore, `10 / 3` results in approximately `3.3333333333333335`, not `3` or `3.0`.

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
z = x + y
print(z)
```

**Choices:**
- **[A]** `TypeError: unsupported operand type(s) for +: 'int' and 'str'` **(CORRECT)**
- **[B]** `42Hello`
- **[C]** `TypeError: can only concatenate str (not "int") to str`
- **[D]** `SyntaxError: invalid syntax`

**Explanation:** The code attempts to add an integer (x) and a string (y), which is not allowed in Python. The correct output is a TypeError indicating that the operands are of unsupported types for addition.

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
What will be the output of the following Python code snippet?
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

**Explanation:** The `int()` function truncates the decimal part of a float, converting it to an integer. Therefore, `int_from_float` will be 5.

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
- **[C]** `TypeError: 'int' object is not callable`
- **[D]** `SyntaxError: invalid syntax`

**Explanation:** The `float()` function converts an integer to a floating-point number. In this case, `int_num` is 5, so `float_from_int` becomes 5.0. The output of the print statement will be '5.0'.

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
What will be the output of the following Python code snippet?
```python
num = 42
result = str(num) + ' is a number'
print(result)
```

**Choices:**
- **[A]** `42 is a number` **(CORRECT)**
- **[B]** `42 is a Number`
- **[C]** `43 is a number`
- **[D]** `TypeError: can only concatenate str (not "int") to str`

**Explanation:** The code snippet converts an integer `num` to a string using the `str()` function and then concatenates it with another string. The correct output is '42 is a number'. Option B has a capital 'N' in 'Number', which would result in a different string if printed. Option C incorrectly increments the value of `num`. Option D indicates an error, but the code does not raise any exceptions.

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
What is the output of the following Python code snippet?
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

**Explanation:** The code attempts to concatenate a string ('5') with an integer (3). In Python, the '+' operator is used for both addition and concatenation. When one operand is a string, it performs concatenation rather than numeric addition. Therefore, '5' + 3 results in '53'.

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
What will be the output of the following code snippet?
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

**Explanation:** The code attempts to add an integer (`age`) and a string (`name`). In Python, you cannot directly add these types together. The correct output is the concatenated string '30Alice'. Choice A (60) is incorrect because it assumes integer addition. Choice C ('TypeError: unsupported operand type(s) for +: 'int' and 'str'') is the correct answer as it accurately describes the error that would be raised if the code were executed. Choice D ('SyntaxError: invalid syntax') is incorrect because there are no syntax errors in the code.

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
What will be the output of the following Python code snippet?
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

**Explanation:** The 'or' operator returns True if at least one of the operands is True. In this case, x is True, so the expression evaluates to True.

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
x = 5
x = 'Hello'
print(x)
```

**Choices:**
- **[A]** `5`
- **[B]** `'Hello'` **(CORRECT)**
- **[C]** `TypeError`
- **[D]** `SyntaxError`

**Explanation:** The variable `x` is initially assigned an integer value of 5. Later, it is reassigned a string value 'Hello'. In Python, variables can hold different types during execution. The final print statement outputs the current value of `x`, which is now a string.

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
What is the output of the following Python code snippet?
```python
name = 'Alice'
length = len(name)
print(length)
```

**Choices:**
- **[A]** `A. 3`
- **[B]** `B. 4` **(CORRECT)**
- **[C]** `C. 5`
- **[D]** `D. Error`

**Explanation:** The `len()` function returns the number of characters in a string. In this case, 'Alice' has 4 characters, so the output is 4.

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
What will be the output of the following code snippet?
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

**Explanation:** The floor division operator // performs integer division, resulting in the largest whole number less than or equal to the division result. For a = 10 and b = 3, 10 // 3 equals 3. The modulus operator % returns the remainder of the division, which is 10 - (3 * 3) = 1.

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
What is the output of the following Python code?
```python
x = 2
y = 3
result = x ** y
print(result)
```

**Choices:**
- **[A]** `6`
- **[B]** `8` **(CORRECT)**
- **[C]** `9`
- **[D]** `12`

**Explanation:** The code snippet calculates the exponentiation of x to the power of y. In Python, the ** operator is used for exponentiation. Here, x = 2 and y = 3, so result = 2 ** 3 = 8.

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
- **[B]** `10`
- **[C]** `7`
- **[D]** `6`

**Explanation:** The `+=` operator is a compound assignment operator that adds the value on its right to the variable on its left and assigns the result back to the variable. In this case, `x += 3` is equivalent to `x = x + 3`. Initially, `x` is 5. After executing `x += 3`, `x` becomes 8. Therefore, the output will be 8.

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
What is the output of the following code snippet?
```python
name = 'Alice'
print(name * 3)
```

**Choices:**
- **[A]** `'AliceAlice'`
- **[B]** `'AliceAliceAlice'` **(CORRECT)**
- **[C]** `TypeError: can only concatenate str (not "int") to str`
- **[D]** `'Alic'Alic'Alic'`

**Explanation:** The code multiplies the string 'Alice' by 3, resulting in 'AliceAliceAlice'. The multiplication operator (*) is used to repeat a string in Python.

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
Which of the following code snippets correctly converts a boolean value to an integer in Python?

**Choices:**
- **[A]** ````python
result = int(True)
```` **(CORRECT)**
- **[B]** ````python
result = int(False)
````
- **[C]** ````python
result = bool(1)
````
- **[D]** ````python
result = str(True)
````

**Explanation:** The correct answer is `int(True)`, which converts the boolean value True to the integer 1. The other options either do not perform a type conversion (choice C), convert to a different data type (choice D), or are incorrect syntax (choice B).

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

**Explanation:** The code snippet converts the string '123' to an integer using int(str_num), resulting in 123. Then, it adds 5 to this integer, yielding 128. Choice B is incorrect because there are no issues with the conversion or arithmetic operation. Choice C is wrong as it incorrectly adds a string and an integer without proper type casting. Choice D is incorrect because it attempts to concatenate a string and an integer, which raises a TypeError.

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
What is the output of the following Python code?
```python
a = 5
b = 2
c = a * b + 3
print(c)
```

**Choices:**
- **[A]** `10`
- **[B]** `13` **(CORRECT)**
- **[C]** `14`
- **[D]** `15`

**Explanation:** The code performs multiplication first (a * b = 10) and then addition (10 + 3 = 13). The result is printed, which is 13.

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

**Explanation:** The code attempts to add an integer (5) and a string ('10'). In Python, attempting to perform arithmetic operations between different types results in a TypeError. The correct output is '510' because the '+' operator concatenates strings instead of performing addition when one or both operands are strings.

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
- **[A]** `3.14`
- **[B]** `'hello'` **(CORRECT)**
- **[C]** `True`
- **[D]** `10`

**Explanation:** The code snippet prints the element at index 2 of the list my_list. In Python, indexing starts at 0, so my_list[2] refers to the third element in the list. The third element is 'hello', which is a string.

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
Which of the following Python code snippets correctly prints the second last element of a list using negative indexing?
```python
my_list = [10, 'hello', 3.14, True]
print(my_list[-2])
```

**Choices:**
- **[A]** `Choice A: my_list[1]`
- **[B]** `Choice B: my_list[-2]` **(CORRECT)**
- **[C]** `Choice C: my_list[3]`
- **[D]** `Choice D: my_list[-1]`

**Explanation:** The correct answer is Choice B: my_list[-2]. Negative indexing in Python starts from -1 for the last element. Therefore, my_list[-2] accesses the second last element of the list. Choices A (my_list[1]) and D (my_list[-1]) are incorrect because they access different elements. Choice C (my_list[3]) is out of range since the list only has 4 elements.

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
Which of the following code snippets correctly demonstrates how to modify an element in a list in Python?

**Choices:**
- **[A]** ````python
my_list = [1, 2, 3]
my_list[0] = 'a'
````
- **[B]** ````python
my_list = [1, 2, 3]
my_list.append(4)
````
- **[C]** ````python
my_list = [1, 2, 3]
my_list[1] = 5
```` **(CORRECT)**
- **[D]** ````python
my_list = (1, 2, 3)
my_list[1] = 5
````

**Explanation:** The correct choice modifies an element in a list using the index. Lists are mutable, so elements can be changed after creation. Choice A attempts to change an integer to a string, which is not allowed. Choice B adds an element to the end of the list, but it does not modify an existing element. Choice D tries to modify an element in a tuple, which is immutable.

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

**Explanation:** The correct slice is my_list[2:5], which includes elements at indices 2, 3, and 4. Python list slicing is inclusive of the start index but exclusive of the stop index.

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

**Choices:**
- **[A]** ````python
my_list = [1, 2, 3, 4, 5, 6]
sliced_list = my_list[2:5:2]
print(sliced_list)
````
- **[B]** ````python
my_list = [1, 2, 3, 4, 5, 6]
sliced_list = my_list[2:6:2]
print(sliced_list)
```` **(CORRECT)**
- **[C]** ````python
my_list = [1, 2, 3, 4, 5, 6]
sliced_list = my_list[1:5:2]
print(sliced_list)
````
- **[D]** ````python
my_list = [1, 2, 3, 4, 5, 6]
sliced_list = my_list[2:5:3]
print(sliced_list)
````

**Explanation:** The correct answer is B. The slice `my_list[2:6:2]` correctly starts at index 2, ends before index 6 (exclusive), and steps by 2, resulting in `[3, 5]`. Choice A has an incorrect end index, choice C has an incorrect start index, and choice D has an incorrect step value.

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
Which of the following Python code snippets correctly slices a list to get elements from index 2 to the end?

**Choices:**
- **[A]** `my_list[2:] # Correct` **(CORRECT)**
- **[B]** `my_list[:2] # Incorrect, gets first two elements`
- **[C]** `my_list[2:3] # Incorrect, gets only the third element`
- **[D]** `my_list[-1:] # Incorrect, gets last element`

**Explanation:** The correct answer is my_list[2:]. This slice starts at index 2 and goes to the end of the list. The other options are incorrect because they either start at the wrong index or do not include all elements from index 2 onwards.

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

**Choices:**
- **[A]** ````python
my_list = [1, 2, 3]
reversed_list = my_list[::-1]
print(reversed_list)
```` **(CORRECT)**
- **[B]** ````python
my_list = [1, 2, 3]
reversed_list = my_list[::1]
print(reversed_list)
````
- **[C]** ````python
my_list = [1, 2, 3]
reversed_list = my_list[::-2]
print(reversed_list)
````
- **[D]** ````python
my_list = [1, 2, 3]
reversed_list = my_list[1::-1]
print(reversed_list)
````

**Explanation:** The correct answer uses slicing with a step of -1 to reverse the list. The other options either do not reverse the list (choice B), reverse every second element (choice C), or start reversing from the wrong index (choice D).

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
Which of the following code snippets correctly appends an element to a list named `my_list`?

**Choices:**
- **[A]** ````python
my_list = [1, 2, 3]
my_list.append(4)
print(my_list)  # Output: [1, 2, 3, 4]
```` **(CORRECT)**
- **[B]** ````python
my_list = [1, 2, 3]
my_list.insert(3, 4)
print(my_list)  # Output: [1, 2, 3, 4]
````
- **[C]** ````python
my_list = [1, 2, 3]
my_list.remove(3)
print(my_list)  # Output: [1, 2]
````
- **[D]** ````python
my_list = [1, 2, 3]
my_list.extend([4])
print(my_list)  # Output: [1, 2, 3, 4]
````

**Explanation:** The correct answer uses the `append()` method to add an element to the end of the list. The other options either insert at a specific index, remove an element, or extend the list with another list, which are not the intended operations for appending.

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
# code here
```

**Choices:**
- **[A]** `my_list.insert(2, 'world')` **(CORRECT)**
- **[B]** `my_list.append('world', 2)`
- **[C]** `my_list[2] = 'world'`
- **[D]** `my_list.extend([2, 'world'])`

**Explanation:** The correct choice is `my_list.insert(2, 'world')`. This correctly inserts the string 'world' at index 2 in the list. The distractors are incorrect because: (B) uses a non-existent method `append` with two arguments; (C) attempts to assign directly to an index which does not exist yet and will raise an error; (D) extends the list with another list, which is not what was asked for.

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
Which of the following code snippets correctly removes an element by value from a list in Python?

**Choices:**
- **[A]** ````python
my_list = [1, 2, 3]
popped = my_list.pop(2)
print(popped)  # Output: 3
````
- **[B]** ````python
my_list = [1, 2, 3]
removed = my_list.remove(2)
print(removed)  # Output: None
```` **(CORRECT)**
- **[C]** ````python
my_list = [1, 2, 3]
popped = my_list.pop()
print(popped)  # Output: 1
````
- **[D]** ````python
my_list = [1, 2, 3]
del my_list[1]
print(my_list)  # Output: [1, 3]
````

**Explanation:** The correct choice uses the `remove()` method to remove an element by value. The `pop()` method removes and returns an element at a specific index, not by value. The `del` statement removes an item at a specific index.

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
my_list = [[1, 2], [3, 4, 5], [6]]
print(len(my_list))
```
What will be the output of this code?

**Choices:**
- **[A]** `3` **(CORRECT)**
- **[B]** `6`
- **[C]** `2`
- **[D]** `1`

**Explanation:** The `len()` function returns the number of elements in a list. In this case, `my_list` contains three sublists: `[1, 2]`, `[3, 4, 5]`, and `[6]`. Therefore, the length of `my_list` is 3.

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
result = list1 * list2
print(result)
````
- **[C]** ````python
list1 = [1, 2]
list2 = [3, 4]
result = list1 - list2
print(result)
````
- **[D]** ````python
list1 = [1, 2]
list2 = [3, 4]
result = list1 / list2
print(result)
````

**Explanation:** The correct choice uses the plus operator (`+`) to concatenate two lists, which is the appropriate method for combining lists in Python. The other choices use operators that are not valid for list concatenation: `*` performs repetition, `-` and `/` perform arithmetic operations on lists, which are not defined.

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
Which of the following code snippets correctly checks if the element '3' is in the list `my_list` using the 'in' operator?

**Choices:**
- **[A]** ````python
my_list = [1, 2, 3]
if my_list[0] == 3:
    print('3 is in the list')
else:
    print('3 is not in the list')
````
- **[B]** ````python
my_list = [1, 2, 3]
if 3 in my_list:
    print('3 is in the list')
else:
    print('3 is not in the list')
```` **(CORRECT)**
- **[C]** ````python
my_list = [1, 2, 3]
if my_list[2] == 3:
    print('3 is in the list')
else:
    print('3 is not in the list')
````
- **[D]** ````python
my_list = [1, 2, 3]
if my_list[3] == 3:
    print('3 is in the list')
else:
    print('3 is not in the list')
````

**Explanation:** The correct choice uses the 'in' operator to check for membership, which is the proper way to determine if an element exists in a list. The other choices either use incorrect indexing or try to access an index that does not exist.

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
Which of the following code snippets correctly creates a tuple with three elements?

**Choices:**
- **[A]** ````python
my_tuple = (1, 2, 3)
```` **(CORRECT)**
- **[B]** ````python
my_tuple = [1, 2, 3]
````
- **[C]** ````python
my_tuple = (1, 2)
````
- **[D]** ````python
my_tuple = 1, 2, 3
````

**Explanation:** The correct answer is A. Tuples are created using parentheses and must include a trailing comma for single-element tuples. Option B uses square brackets, which creates a list instead of a tuple. Option C is missing the trailing comma, making it an invalid tuple syntax. Option D correctly creates a tuple without parentheses but with a trailing comma.

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

**Explanation:** The correct choice is A because tuples are immutable in Python. Attempting to assign a new value to an element of a tuple will raise a TypeError. The other choices involve mutable data structures (list, dictionary, set) where such assignments are allowed.

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

**Explanation:** The code snippet prints the third element of the tuple `my_tuple`. In Python, indexing starts at 0, so the third element is at index 2. Therefore, the output is 30.

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
my_set = list(my_list)
print(my_set)  # Output: [1, 2, 3, 2, 4]
````

**Explanation:** The correct answer is A. The code snippet correctly creates a set from the list `my_list`, which automatically removes any duplicate elements, resulting in `{1, 2, 3, 4}`. Choice B attempts to convert the set back to a list, which is unnecessary and does not change the output. Choice C tries to print the original list instead of the set, which would result in `[1, 2, 3, 2, 4]`. Choice D also tries to print the original list, leading to the same incorrect output.

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
Which of the following Python code snippets correctly demonstrates the use of a set to find the intersection of two sets, `set1` and `set2`, and prints the result?

**Choices:**
- **[A]** ````python
set1 = {1, 2, 3}
set2 = {3, 4, 5}
intersection = set1.intersection(set2)
print(intersection)
```` **(CORRECT)**
- **[B]** ````python
set1 = [1, 2, 3]
set2 = [3, 4, 5]
intersection = set1 & set2
print(intersection)
````
- **[C]** ````python
set1 = {1, 2, 3}
set2 = {4, 5, 6}
difference = set1 - set2
print(difference)
````
- **[D]** ````python
set1 = {1, 2, 3}
set2 = {3, 4, 5}
difference = set2 - set1
print(difference)
````

**Explanation:** The correct answer demonstrates the proper use of the `.intersection()` method to find common elements between two sets. The other options either use incorrect data types or operators for set intersection.

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
What is the output of the following Python code snippet?
```python
student = {'name': 'Alice', 'age': 20, 'major': 'Computer Science'}
print(student['major'])
```

**Choices:**
- **[A]** `Alice`
- **[B]** `Computer Science` **(CORRECT)**
- **[C]** `20`
- **[D]** `{'name': 'Alice', 'age': 20, 'major': 'Computer Science'}`

**Explanation:** The code snippet creates a dictionary named `student` with three key-value pairs. The keys are 'name', 'age', and 'major'. The value associated with the key 'major' is 'Computer Science'. When `print(student['major'])` is executed, it retrieves and prints the value of the 'major' key, which is 'Computer Science'.

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

**Explanation:** The correct answer is 'Computer Science'. The code accesses the value associated with the key 'major' in the dictionary `student`. Distractors include incorrect keys ('name', 'age'), and a NameError which would occur if the variable `student` was not defined.

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

**Explanation:** The code first updates the value of the key 'age' to 21. Then, it adds a new key-value pair ('gender': 'Female') to the dictionary. The final output is the updated dictionary with both changes applied.

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
print(student.get('phone', 'N/A'))
```

**Choices:**
- **[A]** `None N/A`
- **[B]** `None N/A` **(CORRECT)**
- **[C]** `Alice None`
- **[D]** `20 N/A`

**Explanation:** The `get()` method is used to retrieve the value associated with a key in a dictionary. If the key does not exist, it returns `None` by default or the specified default value if provided. In this case, 'email' and 'phone' keys do not exist in the `student` dictionary, so the first print statement outputs `None`. The second print statement provides a default value of 'N/A', so it also outputs 'N/A'.

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
- **[C]** `[('name', 'Alice'), ('age', 20), ('major', 'Computer Science')]`
- **[D]** `{'name': 'Alice', 'age': 20, 'major': 'Computer Science'}`

**Explanation:** The `keys()` method returns a view object that displays a list of all the keys in the dictionary. Therefore, the output will be a list containing the keys 'name', 'age', and 'major'. The other options are incorrect because they either return the values or the entire dictionary instead of just the keys.

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
What is the output of the following code snippet?
```python
student = {'name': 'Alice', 'age': 20, 'major': 'Computer Science'}
del student['age']
print(student)
```

**Choices:**
- **[A]** `{'name': 'Alice', 'major': 'Computer Science'}` **(CORRECT)**
- **[B]** `{'name': 'Alice', 'age': 20}`
- **[C]** `{'name': 'Alice', 'age': 20, 'major': 'Computer Science'}`
- **[D]** `KeyError: 'age'`

**Explanation:** The `del` statement is used to remove a key-value pair from the dictionary. In this case, 'age' and its value are removed, leaving only {'name': 'Alice', 'major': 'Computer Science'}.

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
Which of the following code snippets correctly accesses the value 'world' from a nested dictionary in Python? ```python
nested_dict = {'hello': {'world': 42}}
```

**Choices:**
- **[A]** `print(nested_dict['hello']['world'])` **(CORRECT)**
- **[B]** `print(nested_dict[0]['world'])`
- **[C]** `print(nested_dict['hello'][1])`
- **[D]** `print(nested_dict[0][1])`

**Explanation:** The correct answer accesses the nested dictionary using the appropriate keys. The first choice correctly uses 'hello' and 'world' as keys to retrieve the value 42. The other choices either use incorrect indices or keys, leading to errors.

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
- **[A]** `x is less than y` **(CORRECT)**
- **[B]** `x is not less than y`
- **[C]** `SyntaxError: invalid syntax`
- **[D]** `IndentationError: unexpected indent`

**Explanation:** The code snippet is a simple if-else statement. The condition `x < y` evaluates to True because 5 is less than 10. Therefore, the block under 'if' will execute and print 'x is less than y'. Choice B is incorrect because it contradicts the output of the code. Choices C and D are distractors as they represent common Python syntax errors that could occur if the code were incorrectly written.

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
- **[A]** `Choice A: x is less than y`
- **[B]** `Choice B: x is not less than y` **(CORRECT)**
- **[C]** `Choice C: SyntaxError`
- **[D]** `Choice D: NameError`

**Explanation:** The code snippet compares the values of x and y. Since 5 is less than 10, the condition `x < y` is True. Therefore, the correct output is 'x is less than y'. Choice B is incorrect because it states the opposite of what happens in this case. Choice C is incorrect because there are no syntax errors in the code. Choice D is incorrect because all variables used in the code are defined.

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
if x > 1:
    print('1')
elif x == 1:
    print('2')
else:
    print('3')
x = 0
````
- **[B]** ````python
x = 1
if x == 1:
    print('2')
elif x > 1:
    print('1')
else:
    print('3')
```` **(CORRECT)**
- **[C]** ````python
x = 0
if x < 1:
    print('3')
elif x == 1:
    print('2')
else:
    print('1')
````
- **[D]** ````python
x = 2
if x > 1:
    print('1')
elif x == 1:
    print('2')
else:
    print('3')
````

**Explanation:** The correct answer is B. The code snippet sets x to 1 and checks the conditions sequentially. Since x == 1, it prints '2'. Choice A is incorrect because it checks if x > 1 first, which is False, so it moves to the elif block where x == 1 is also False, printing '3'. Choice C is incorrect because it sets x to 0 and checks if x < 1, which is True, but then moves to the elif block where x == 1 is False, printing '3'. Choice D is incorrect because it sets x to 2 and checks if x > 1 first, which is True, so it prints '1' instead of '2'.

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
- **[A]** `Choice A: 'Equal'`
- **[B]** `Choice B: 'Not Equal'` **(CORRECT)**
- **[C]** `Choice C: 'True'`
- **[D]** `Choice D: 'False'`

**Explanation:** The code compares the values of x and y using the equality operator ==. Since x (5) is not equal to y (10), the condition in the if statement evaluates to False, and the else block is executed, printing 'Not Equal'.

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
- **[A]** `x is not equal to y` **(CORRECT)**
- **[B]** `x is equal to y`
- **[C]** `SyntaxError: invalid syntax`
- **[D]** `RuntimeError: division by zero`

**Explanation:** The code snippet uses the inequality operator != to compare x and y. Since 5 is not equal to 10, the condition x != y evaluates to True. Therefore, the first print statement 'x is not equal to y' will be executed.

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
Which of the following code snippets will output 'True' when executed?

**Choices:**
- **[A]** ````python
x = True
y = False
print(x or y)
````
- **[B]** ````python
x = True
y = True
print(x and y)
```` **(CORRECT)**
- **[C]** ````python
x = False
y = True
print(x and y)
````
- **[D]** ````python
x = False
y = False
print(x or y)
````

**Explanation:** The 'and' operator requires both conditions to be True for the result to be True. In option B, both x and y are True, so the output is 'True'. The other options either have one or both conditions as False, resulting in 'False' outputs.

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
Which of the following code snippets will output 'True' when executed?

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

**Explanation:** The correct choice is A. The `or` operator returns True if at least one of the conditions is True. In this case, x or y will be True because x is True. Choice B uses `and`, which requires both conditions to be True for the result to be True. Choice C compares integers and will output False since 5 is not greater than 10. Choice D checks if two strings are equal, which will also output False.

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
What is the output of the following Python code snippet?
```python
x = True
y = False
print(not x or y)
```

**Choices:**
- **[A]** `True`
- **[B]** `False` **(CORRECT)**
- **[C]** `SyntaxError`
- **[D]** `TypeError`

**Explanation:** The expression `not x or y` is evaluated as follows:
- `not x` evaluates to `False`
- `False or y` evaluates to `y`, which is `False`
Thus, the output is `False`. The distractors are plausible bugs: a syntax error would occur if there were an unclosed parenthesis, and a type error would occur if `x` or `y` were not boolean values.

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
Which of the following code snippets correctly demonstrates short-circuit evaluation in Python using the `and` operator?

**Choices:**
- **[A]** ````python
x = True
y = False
print(x and y) # Output: False`
` **(CORRECT)**
- **[B]** ````python
x = False
y = True
print(x and y) # Output: True`
`
- **[C]** ````python
x = True
y = 0
print(x and y) # Output: 0`
`
- **[D]** ````python
x = False
y = None
print(x and y) # Output: None`
`

**Explanation:** The correct answer demonstrates short-circuit evaluation where the `and` operator stops evaluating further conditions as soon as it encounters a False value. In this case, since `x` is True and `y` is False, the expression evaluates to False without checking the value of `y`. The other options either do not demonstrate short-circuiting or contain errors.

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
Consider the following Python code snippet:
```python
x = []
y = 'hello'
z = 0
if x or y or z:
    print('At least one condition is True')
else:
    print('All conditions are False')
```

**Choices:**
- **[A]** `Choice A: All conditions are False`
- **[B]** `Choice B: At least one condition is True` **(CORRECT)**
- **[C]** `Choice C: The code will raise an error`
- **[D]** `Choice D: The output will be empty`

**Explanation:** The `or` operator in Python short-circuits, meaning it stops evaluating further conditions as soon as it finds a True value. In this case, `y` is a non-empty string, which evaluates to True. Therefore, the condition `x or y or z` is True, and 'At least one condition is True' will be printed.

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
y = 10
if x < y or x == y:
    print('Condition met')
else:
    print('Condition not met')
```

**Choices:**
- **[A]** `Condition met` **(CORRECT)**
- **[B]** `Condition not met`
- **[C]** `Syntax error`
- **[D]** `Runtime error`

**Explanation:** The code snippet uses the 'or' operator, which means that if at least one of the conditions is True, the entire expression evaluates to True. In this case, both x < y (True) and x == y (False) are checked, but since 'or' short-circuits and stops at the first True condition, the overall expression evaluates to True. Therefore, 'Condition met' is printed.

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

**Explanation:** The code snippet has a nested if statement. The outer condition `x > 3` is True because 5 is greater than 3. The inner condition `y < 12` is also True because 10 is less than 12. Therefore, the code inside the innermost block executes and prints 'Condition met'. Choice B is incorrect because it refers to an outer else block that does not execute in this case. Choices C and D are distractors representing common Python errors, but they do not apply here.

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

**Explanation:** The code snippet uses chained comparison operators to check if x is between 10 and 20. Since x = 15, the condition 10 < x < 20 evaluates to True, leading to the output 'x is between 10 and 20'. The other options are incorrect because there is no syntax or type error in the code.

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
Which of the following code snippets correctly uses a ternary operator to determine if a number is even or odd?

**Choices:**
- **[A]** ````python
number = 7
even_or_odd = 'Even' if number % 2 == 0 else 'Odd'
print(even_or_odd)
```` **(CORRECT)**
- **[B]** ````python
number = 7
even_or_odd = 'Odd' if number % 2 != 0 else 'Even'
print(even_or_odd)
````
- **[C]** ````python
number = 7
even_or_odd = 'Even' if number % 2 == 1 else 'Odd'
print(even_or_odd)
````
- **[D]** ````python
number = 7
even_or_odd = 'Odd' if number % 2 == 0 else 'Even'
print(even_or_odd)
````

**Explanation:** The correct answer uses the ternary operator to check if `number % 2 == 0`. If true, it assigns 'Even' to `even_or_odd`; otherwise, it assigns 'Odd'. The distractors have errors in their conditions or logic.

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
- **[D]** `RuntimeError: division by zero`

**Explanation:** The code snippet compares the values of x and y using the less than operator (<). Since 5 is indeed less than 10, the condition `x < y` evaluates to True. Therefore, the program will print 'x is less than y'. The other options are incorrect because they either represent a logical error (choice C) or an unrelated runtime error (choice D), which would not occur in this specific code snippet.

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
numbers = [1, 2, 3, 4]
total = 0
for number in numbers:
total += number
print(total)
```

**Choices:**
- **[A]** `The output will be 10` **(CORRECT)**
- **[B]** `The output will be 9`
- **[C]** `The output will be 8`
- **[D]** `The output will be 7`

**Explanation:** Explanation: The for loop iterates over each number in the list [1, 2, 3, 4] and adds it to the total. After the loop completes, the total is printed, which should be 10. Choice B (9) is incorrect because it misses one of the numbers. Choice C (8) is incorrect because it misses two of the numbers. Choice D (7) is incorrect because it misses three of the numbers.

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
Consider the following Python code snippet:
```python
word = 'Python'
for char in word:
    print(char, end=' ')
``` What will be the output of this code?


**Choices:**
- **[A]** `P y t h o n`
- **[B]** `P y t h o n ` **(CORRECT)**
- **[C]** `Python`
- **[D]** `p y t h o n`

**Explanation:** The code iterates over each character in the string 'Python' and prints it with a space at the end. The `end=' '` argument in the print function ensures that each character is printed on the same line separated by spaces, resulting in 'P y t h o n '.

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
What will be the output of the following Python code snippet?
```python
for i in range(5):
    print(i)
```

**Choices:**
- **[A]** `0 1 2 3 4` **(CORRECT)**
- **[B]** `1 2 3 4 5`
- **[C]** `0 2 4 6 8`
- **[D]** `-1 0 1 2 3`

**Explanation:** The range(5) function generates numbers starting from 0 up to (but not including) 5. Therefore, the output will be 0 1 2 3 4.

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
- **[C]** `0 1 2 3 4 5 6`
- **[D]** `2 3 4 5 6 7 8`

**Explanation:** The range function starts from the 'start' value (inclusive) and goes up to but does not include the 'stop' value. In this case, it starts at 3 and stops just before 8, so the output will be 3 4 5 6 7.

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
What will be printed when the following code is executed?
```python
for i in range(0, 10, 3):
    print(i)
```

**Choices:**
- **[A]** `0 3 6 9` **(CORRECT)**
- **[B]** `0 2 4 6 8`
- **[C]** `1 4 7`
- **[D]** `0 1 2 3 4 5 6 7 8 9`

**Explanation:** The range function generates numbers starting from 0 up to (but not including) 10, incrementing by 3. Therefore, it will print 0, 3, 6, and 9.

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
What will be printed when the following code is executed?
```python
for i in range(10, -1, -2):
    print(i)
```

**Choices:**
- **[A]** `8 6 4 2 0` **(CORRECT)**
- **[B]** `9 7 5 3 1`
- **[C]** `10 8 6 4 2`
- **[D]** `10 8 6 4 2 0 -2`

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
What is the output of the following code snippet?
```python
i = 0
while i < 5:
    print(i)
    i += 1
```

**Choices:**
- **[A]** `0 1 2 3 4` **(CORRECT)**
- **[B]** `0 1 2 3 4 5`
- **[C]** `1 2 3 4 5`
- **[D]** `-1 -2 -3 -4 -5`

**Explanation:** The code initializes `i` to 0 and enters a while loop that continues as long as `i` is less than 5. Inside the loop, it prints the value of `i` and then increments `i` by 1. The loop runs for 5 iterations (i = 0, 1, 2, 3, 4), printing each value before incrementing. Therefore, the correct output is '0 1 2 3 4'.

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
Which of the following code snippets correctly updates the loop counter variable to prevent an infinite loop in a while loop?

**Choices:**
- **[A]** ````python
i = 0
while i < 5:
    print(i)
````
- **[B]** ````python
i = 0
while i < 5:
    print(i)
    i += 1
```` **(CORRECT)**
- **[C]** ````python
i = 0
while i <= 5:
    print(i)
````
- **[D]** ````python
i = 0
while i < 5:
    print(i)
    i -= 1
````

**Explanation:** The correct choice updates the loop counter variable `i` by incrementing it (`i += 1`) within the loop. This ensures that the condition `i < 5` will eventually become false, thus preventing an infinite loop. The other choices either do not update the counter (A and D) or have a condition that never becomes false (C), leading to infinite loops.

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
Which of the following code snippets will correctly print all numbers from 1 to 5, excluding the number 3?

**Choices:**
- **[A]** ````python
for i in range(1, 6):
    if i == 3:
        continue
    print(i)
```` **(CORRECT)**
- **[B]** ````python
i = 1
while i <= 5:
    if i == 3:
        break
    print(i)
    i += 1
````
- **[C]** ````python
for i in range(1, 6):
    if i != 3:
        print(i)
````
- **[D]** ````python
i = 1
while i <= 5:
    if i == 3:
        continue
    print(i)
    i += 1
````

**Explanation:** The correct answer uses a for loop with the `continue` statement to skip printing the number 3. The distractors either use `break` instead of `continue`, which would terminate the loop entirely, or they do not include any conditional logic to skip the number 3.

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

**Explanation:** The correct answer uses the continue statement to skip even numbers and print only odd numbers. Choice A is incorrect because it prints all even numbers instead of skipping them. Choice C is also incorrect for the same reason as Choice A. Choice D is incorrect because it uses break instead of continue, which would exit the loop entirely when an even number is encountered.

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
Which of the following code snippets correctly calculates the sum of numbers from 1 to 5 using a for loop? ```python
sum = 0
for i in range(1, 6):
    sum += i
print(sum)
```

**Choices:**
- **[A]** `Choice A: The code is correct and will output 15.`
- **[B]** `Choice B: The code is incorrect because it uses a while loop instead of a for loop.` **(CORRECT)**
- **[C]** `Choice C: The code is incorrect because it starts the range from 0 instead of 1.`
- **[D]** `Choice D: The code is incorrect because it does not initialize the sum variable before using it.`

**Explanation:** The correct answer is B. The code uses a for loop to iterate over numbers from 1 to 5 and correctly calculates their sum, which is 15. Choice A is incorrect because it suggests the code is correct when in fact it is not using a for loop as specified in the question. Choice C is incorrect because it points out an off-by-one error in the range but does not address the use of a while loop instead of a for loop, which is the main issue with the code. Choice D is incorrect because the sum variable is initialized before being used.

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
Which of the following code snippets correctly prints each element in a list of numbers from 1 to 5 using a for loop?

**Choices:**
- **[A]** ````python
for i in range(1, 6):
    print(i)
```` **(CORRECT)**
- **[B]** ````python
i = 1
while i <= 5:
    print(i)
    i += 1
````
- **[C]** ````python
numbers = [1, 2, 3, 4, 5]
for number in numbers:
    print(number + 1)
````
- **[D]** ````python
numbers = [1, 2, 3, 4, 5]
for i in range(0, 6):
    print(numbers[i])
````

**Explanation:** The correct answer uses a for loop with the `range` function to iterate from 1 to 5. The other options either use a while loop, modify the printed numbers incorrectly, or have an off-by-one error in their range.

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
- **[B]** `It will raise an error because dictionaries are unordered`
- **[C]** `It will print: {'a': 1, 'b': 2, 'c': 3}`
- **[D]** `It will print: a
b
c
and then raise an error`

**Explanation:** The correct answer is A. The for loop iterates over the keys of the dictionary and prints each key on a new line. Dictionaries in Python are ordered as of version 3.7, so the order of printing will be 'a', 'b', and 'c'. Choice B is incorrect because dictionaries can be ordered from Python 3.7 onwards. Choice C is incorrect because it attempts to print the dictionary itself rather than its keys. Choice D is incorrect because there are no errors in the code.

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
- **[D]** `1 apple
2 banana
3 cherry`

**Explanation:** The enumerate() function adds a counter to an iterable and returns it in a form of enumerate object. The syntax is enumerate(iterable, start=0). In this case, the loop starts with index 0 and prints both the index and the fruit name. Therefore, the correct output is '0 apple
1 banana
2 cherry'.

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
Which of the following Python code snippets correctly finds the maximum value in a list using a for loop? ```python
numbers = [3, 5, 1, 8, 2]
max_value = None
for number in numbers:
    if max_value is None or number > max_value:
        max_value = number
print(max_value)
```

**Choices:**
- **[A]** `Choice A text`
- **[B]** `Choice B text` **(CORRECT)**
- **[C]** `Choice C text`
- **[D]** `Choice D text`

**Explanation:** The correct code snippet initializes `max_value` to `None` and iterates through the list, updating `max_value` whenever it finds a number greater than the current `max_value`. This ensures that by the end of the loop, `max_value` holds the maximum value in the list. The distractors represent common mistakes such as not initializing `max_value`, using an incorrect comparison operator, or modifying the list during iteration.

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
Which of the following code snippets correctly counts how many times the letter 'a' appears in a given string using a for loop?

**Choices:**
- **[A]** ````python
string = "banana"
count = 0
for char in string:
    if char == 'b':
        count += 1
print(count)
````
- **[B]** ````python
string = "banana"
count = 0
for char in string:
    if char == 'a':
        count += 1
print(count)
```` **(CORRECT)**
- **[C]** ````python
string = "banana"
count = 0
for char in string:
    if char == 'A':
        count += 1
print(count)
````
- **[D]** ````python
string = "banana"
count = 0
for char in string:
    if char != 'a':
        count += 1
print(count)
````

**Explanation:** The correct answer is B. The code iterates over each character in the string 'banana' and increments the count whenever it encounters the letter 'a'. Choice A has an off-by-one error by checking for 'b' instead of 'a'. Choice C confuses case sensitivity by checking for 'A' instead of 'a'. Choice D incorrectly counts non-'a' characters, which is the opposite of what we want.

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
Which of the following code snippets correctly filters out even numbers from a list using a for loop and appends them to a new list? ```python
numbers = [1, 2, 3, 4, 5]
filtered_numbers = []
for number in numbers:
    if number % 2 == 0:
        filtered_numbers.append(number)
print(filtered_numbers)
```

**Choices:**
- **[A]** `[1, 3, 5]`
- **[B]** `[2, 4]` **(CORRECT)**
- **[C]** `[1, 2, 3, 4, 5]`
- **[D]** `[0, 2, 4]`

**Explanation:** The correct answer is [2, 4]. The code iterates over the list 'numbers' and checks if each number is even using the modulus operator (%). If the number is even (i.e., number % 2 == 0), it appends the number to the 'filtered_numbers' list. After the loop completes, the 'filtered_numbers' list contains only the even numbers [2, 4]. The other options are incorrect because they either contain odd numbers or include zero.

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
- **[A]** `The program will print 'Loop ended' and then wait for the next user input.`
- **[B]** `The program will continuously prompt the user to enter a command until they type 'quit'.` **(CORRECT)**
- **[C]** `The program will print 'Loop ended' immediately without waiting for any user input.`
- **[D]** `The program will enter an infinite loop and never terminate.`

**Explanation:** Explanation: The code uses a while loop to continuously prompt the user for input until they type 'quit'. Inside the loop, there is an if statement that checks if the user input is 'stop'. If it is, the break statement is executed, which exits the loop immediately. Therefore, the correct output is that the program will continuously prompt the user to enter a command until they type 'quit', and then it will print 'Loop ended' and terminate.

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
        count += 1
print(count)
```

**Choices:**
- **[A]** `The code will print 3`
- **[B]** `The code will print 2` **(CORRECT)**
- **[C]** `The code will print 5`
- **[D]** `The code will print 0`

**Explanation:** Explanation: The loop iterates through the list [1, 2, 3, 4, 5]. For each number, it checks if the number is even (num % 2 == 0). If true, it increments the count. After the loop, it prints the value of count. There are two even numbers in the list: 2 and 4. Therefore, the code will print 2.

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
What will be the output of the following code snippet?
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
- **[D]** `SyntaxError: unexpected indent`

**Explanation:** The code defines a function `greet` that takes a name as an argument and returns a greeting message. The `main` function calls `greet('Alice')`, which should output 'Hello, Alice!'. The correct answer is A. Choice B is incorrect because the name passed to `greet` is 'Alice', not 'Bob'. Choice C is incorrect because there are no errors in the code that would prevent it from running and producing the expected output. Choice D is incorrect because there are no syntax errors in the code.

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
Which of the following is the correct way to call a function named `calculate_area` with two arguments, `length` and `width`, in Python? ```python
# code here
```

**Choices:**
- **[A]** `calculate_area(length=5, width=10)`
- **[B]** `calculate_area(5, 10)` **(CORRECT)**
- **[C]** `length, width = calculate_area(5, 10)`
- **[D]** `area = calculate_area(length=5, width=10)`

**Explanation:** The correct way to call a function in Python is by using the function name followed by parentheses containing the arguments. Positional arguments must be provided in the order they are defined in the function definition.

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
Which of the following functions will correctly return the sum of a list of numbers?

**Choices:**
- **[A]** ````python
def sum_list(numbers):
    return sum(numbers)
```` **(CORRECT)**
- **[B]** ````python
def sum_list(numbers):
    total = 0
    for num in numbers:
        total += num
    return total + 1
````
- **[C]** ````python
def sum_list(numbers):
    total = 0
    for num in numbers:
        total += num
    return total - 1
````
- **[D]** ````python
def sum_list(numbers):
    total = 0
    for num in numbers:
        total += num
    return str(total)
````

**Explanation:** The correct function `sum_list(numbers)` returns the sum of a list of numbers without any modifications. The distractors introduce errors: adding 1 (Choice B), subtracting 1 (Choice C), and converting to string (Choice D).

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
    return f"Hello, {name}!"

greet("Alice")
```

**Choices:**
- **[A]** `Hello, Alice!` **(CORRECT)**
- **[B]** `None`
- **[C]** `Hello,`
- **[D]** `Error: name is not defined`

**Explanation:** The function `greet` returns a string formatted with the input `name`. When calling `greet("Alice")`, it should return 'Hello, Alice!'. Choice A is correct. Choice B is incorrect because the function does not return None; it returns a string. Choice C is incorrect because the function includes the name in its output. Choice D is incorrect because there are no undefined variables.

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
What will be the output of the following Python code snippet?
```python
def greet(name):
    print(f'Hello, {name}!')
result = greet('Alice')
print(result)
```

**Choices:**
- **[A]** `None` **(CORRECT)**
- **[B]** `'Hello, Alice!'`
- **[C]** `Error: function has no return statement`
- **[D]** `TypeError: greet() takes 0 positional arguments but 1 was given`

**Explanation:** The function `greet` is defined to print a greeting message. Since it does not have an explicit return statement, it implicitly returns None by default. Therefore, when we call `result = greet('Alice')`, the value of `result` will be None. The subsequent `print(result)` will output 'None'.

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
Which of the following functions correctly returns multiple values as a tuple?

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
    return (x, y)
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

**Explanation:** The correct function returns multiple values as a tuple using the syntax `return x, y`. This is the standard way to return multiple values from a Python function. The other options either return a list or a single value, which do not meet the requirement of returning multiple values as a tuple.

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

result = add_item('apple')
result2 = add_item('banana', result)
print(result2)
```
What will be the output of this code?

**Choices:**
- **[A]** `[apple, banana]` **(CORRECT)**
- **[B]** `[apple]`
- **[C]** `[banana]`
- **[D]** `[apple, banana, apple]`

**Explanation:** The function `add_item` uses a mutable default argument `items=[]`. When called without an argument for `items`, it appends the new item to this shared list. In the given code, `result` is assigned the result of calling `add_item('apple')`, which modifies the shared list. Then, `result2` is assigned the result of calling `add_item('banana', result)`, appending 'banana' to the same list. The final print statement outputs `[apple, banana]`. Therefore, choice A is correct.

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
Which of the following function calls will correctly pass keyword arguments to a function named `calculate_area` that expects parameters `length` and `width`?
```python
def calculate_area(length, width):
    return length * width
```

**Choices:**
- **[A]** `calculate_area(5, 3)`
- **[B]** `calculate_area(length=5, width=3)` **(CORRECT)**
- **[C]** `calculate_area(3, length=5)`
- **[D]** `calculate_area(width=3, 5)`

**Explanation:** The correct choice is `calculate_area(length=5, width=3)`. This correctly passes keyword arguments to the function. The other choices either use positional arguments incorrectly or mix up the order of keyword arguments.

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
- **[A]** `6 and 5`
- **[B]** `10 and 5` **(CORRECT)**
- **[C]** `10 and 10`
- **[D]** `5 and 10`

**Explanation:** In the code, `x` is declared as a global variable outside the function with the value 5. Inside the function `my_function`, another `x` is declared and assigned the value 10. This creates a new local variable `x` that shadows the global one. When `print(x)` is called inside the function, it prints the local `x` which is 10. Outside the function, the global `x` remains unchanged at 5.

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

**Choices:**
- **[A]** `The output will be 2.0`
- **[B]** `The output will be 3.0` **(CORRECT)**
- **[C]** `The code will raise a NameError`
- **[D]** `The code will raise a TypeError`

**Explanation:** Explanation: The function `calculate_average` is called with the list `[1, 2, 3]`. Inside the function, the sum of the numbers (1 + 2 + 3 = 6) is divided by the length of the list (3), resulting in an average of 2.0. Therefore, the correct output will be 3.0.

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
What is the output of the following Python code?
```python
x = 5

def my_function():
    x = 10
    return x

print(my_function())
```

**Choices:**
- **[A]** `5`
- **[B]** `10` **(CORRECT)**
- **[C]** `None`
- **[D]** `Error`

**Explanation:** The function `my_function` defines a local variable `x` with the value 10. When calling the function, it returns this local `x`, not the global `x`. Therefore, the output is 10.

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
Which of the following code snippets correctly demonstrates how to pass a mutable object like a list to a function without causing unintended side effects?

**Choices:**
- **[A]** ````python
def add_item(item, items=[]):
    items.append(item)
    return items

my_list = [1, 2, 3]
new_list = add_item(4, my_list)
print(new_list) # Output: [1, 2, 3, 4]
````
- **[B]** ````python
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

my_list = [1, 2, 3]
new_list = add_item(4, my_list)
print(new_list) # Output: [1, 2, 3, 4]
```` **(CORRECT)**
- **[C]** ````python
def add_item(item, items=[]):
    items.append(item)
    return items

my_list = [1, 2, 3]
new_list = add_item(4)
print(new_list) # Output: [4]
````
- **[D]** ````python
def add_item(item):
    my_list = [item]
    return my_list

my_list = [1, 2, 3]
new_list = add_item(4)
print(new_list) # Output: [4]
````

**Explanation:** The correct answer uses `items=None` as the default value for the function parameter and initializes `items = []` inside the function if it is `None`. This prevents the use of a mutable default argument, which can lead to unintended side effects. The other options either incorrectly modify the default list or do not handle the list correctly.

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
Consider the following Python function that calculates the sum of a list of numbers and then divides by the length of the list to find the average. ```python
def calculate_average(numbers):
    return sum(numbers) / len(numbers)
``` What will be the output if we call `calculate_average([1, 2, 3])`?

**Choices:**
- **[A]** `6`
- **[B]** `2.0` **(CORRECT)**
- **[C]** `4`
- **[D]** `3`

**Explanation:** The function `calculate_average` takes a list of numbers as input. It calculates the sum of the numbers using `sum(numbers)`, which is 6. Then, it divides this sum by the length of the list using `len(numbers)`, which is 3. Therefore, the result is 6 / 3 = 2.0.

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

def main():
    print(greet('Alice'))

main()
```

**Choices:**
- **[A]** `Hello, Alice!` **(CORRECT)**
- **[B]** `Hello, Bob!`
- **[C]** `Good morning, Alice!`
- **[D]** `NameError: name 'name' is not defined`

**Explanation:** The `greet` function takes a parameter `name` and returns a greeting string. The `main` function calls `greet('Alice')`, which correctly substitutes 'Alice' into the greeting template, resulting in 'Hello, Alice!'.

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
``` What is the output when calling `calculate_average([1, 2, 3])`?


**Choices:**
- **[A]** `6`
- **[B]** `2.0` **(CORRECT)**
- **[C]** `3`
- **[D]** `4`

**Explanation:** The function `calculate_average` takes a list of numbers as input. It calculates the sum of the numbers using `sum(numbers)` and then divides by the length of the list using `len(numbers)`. For the input `[1, 2, 3]`, the sum is 6 and the length is 3, so the average is 6 / 3 = 2.0.

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
        return n * factorial(n-1)

result = factorial(3)
print(result)
```

**Choices:**
- **[A]** `6` **(CORRECT)**
- **[B]** `5`
- **[C]** `4`
- **[D]** `3`

**Explanation:** The `factorial` function is a recursive function that calculates the factorial of a number. The base case is when `n == 0`, in which case it returns 1. For other values, it recursively calls itself with `n-1`. When `result = factorial(3)`, the function calls itself as follows: `factorial(3)` -> `3 * factorial(2)` -> `3 * (2 * factorial(1))` -> `3 * (2 * (1 * factorial(0)))` -> `3 * (2 * 1) = 6`. Therefore, the output is 6.

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
        return n * factorial(n - 1)
```
What is the output when calling `factorial(3)`?


**Choices:**
- **[A]** `6` **(CORRECT)**
- **[B]** `5`
- **[C]** `4`
- **[D]** `7`

**Explanation:** The function `factorial(3)` calls itself with `n-1` until it reaches the base case where `n == 0`. The correct output is 6, as 3! = 3 * 2 * 1.

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

**Explanation:** The correct lambda function is `lambda x: x ** 2`, which correctly calculates the square of a number. The distractors introduce errors: adding 1 (`x * x + 1`), subtracting 1 (`x * x - 1`), and dividing by 2 (`x / 2`) are incorrect operations for squaring a number.

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
squared_numbers = map(x * x, numbers)
print(list(squared_numbers))
````
- **[C]** ````python
numbers = [1, 2, 3]
squared_numbers = map(lambda x: x + x, numbers)
print(list(squared_numbers))
````
- **[D]** ````python
numbers = [1, 2, 3]
squared_numbers = map(lambda x: x ** 2, numbers)
print(list(squared_numbers))
````

**Explanation:** The correct choice uses a lambda function with `map()` to square each number in the list. The lambda function correctly applies the squaring operation (`x * x`). The distractors either lack the lambda keyword, use an incorrect expression for squaring, or incorrectly apply the map function.

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
What will be the output of the following Python code?
```python
def greet(name):
    return f'Hello, {name}!'
def introduce(greet_func, person):
    return greet_func(person)
print(introduce(greet, 'Alice'))
```

**Choices:**
- **[A]** `Hello, Alice!` **(CORRECT)**
- **[B]** `Hello, !`
- **[C]** `greet('Alice')`
- **[D]** `TypeError: greet() missing 1 required positional argument: 'name'`

**Explanation:** The code defines two functions, `greet` and `introduce`. The `greet` function takes a name as an argument and returns a greeting string. The `introduce` function takes another function (like `greet`) and a person's name as arguments, then calls the passed function with the person's name. When calling `introduce(greet, 'Alice')`, it correctly passes the `greet` function and the string `'Alice'`. Therefore, the output is 'Hello, Alice!'. The other options are incorrect because they either misinterpret the code or result from errors in function calls.

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

