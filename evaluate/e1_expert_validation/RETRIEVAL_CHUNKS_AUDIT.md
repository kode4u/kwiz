# Experiment 1 (E1): Retrieval Chunks & Course Grounding Audit Trail

This document provides full traceability for all 100 generated Python MCQs, verifying that each question is directly supported by retrieved chunks from the instructor's authentic course materials.

- **Total Questions**: 100
- **Course Corpus**: `/home/nubb/kwiz/data/extracted/full_course_corpus.txt`
- **Retrieval Model**: `nomic-embed-text` (Dense Cosine Similarity, Top-K=3)
- **Generation Model**: `qwen2.5-coder:7b`

---

## [Q001] Topic: Variables, Data Types & Type Casting

**Target Learning Objective:** *Python variable assignment, dynamic typing, and object identity*

### Generated MCQ
What is the output of the following code snippet?
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
- **[D]** `'510'`

**Explanation:** The code attempts to add an integer (x) and a string (y). In Python, when you try to perform arithmetic operations between different types, it tries to convert them to the same type. Since '10' is a string, Python converts x (5) to a string ('5') before concatenating, resulting in '510'.

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
What will be the output of the following Python code snippet?
```python
int_a = 10
int_b = 3
result = int_a / int_b
print(result)
```

**Choices:**
- **[A]** `3`
- **[B]** `3.3333333333333335` **(CORRECT)**
- **[C]** `10`
- **[D]** `3.0`

**Explanation:** The code performs floating-point division because both `int_a` and `int_b` are integers, but the `/` operator in Python 3 performs true division for integer operands. The result is a float with high precision.

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
y = 'Hello'
z = x + y
print(z)
```

**Choices:**
- **[A]** `TypeError: unsupported operand type(s) for +: 'int' and 'str'` **(CORRECT)**
- **[B]** `'Hello42'`
- **[C]** `42`
- **[D]** `'Hello'`

**Explanation:** The code attempts to add an integer (x) and a string (y), which is not allowed in Python. This results in a TypeError because the '+' operator cannot be used between these types.

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
What will be the output of the following code snippet?
```python
float_num = 10.7
int_from_float = int(float_num)
print(int_from_float)
```

**Choices:**
- **[A]** `10` **(CORRECT)**
- **[B]** `11`
- **[C]** `10.7`
- **[D]** `Error`

**Explanation:** The `int()` function truncates the decimal part of a float, converting it to an integer. Therefore, `int_from_float` will be 10.

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

**Explanation:** The `float()` function converts an integer to a floating-point number. In this case, `int_num` is 5, and calling `float(int_num)` results in the float value 5.0. The correct output is '5.0'.

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
What is the output of the following code snippet?
```python
age = 30
print(str(age) + ' years old')
```

**Choices:**
- **[A]** `30 years old`
- **[B]** `'30' years old` **(CORRECT)**
- **[C]** `TypeError: can only concatenate str (not "int") to str`
- **[D]** `SyntaxError: invalid syntax`

**Explanation:** The code attempts to concatenate a string and an integer. By using the `str()` function, we explicitly convert the integer `age` to a string before concatenation. This prevents a TypeError and correctly outputs the string '30 years old'.

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
What is the output of the following code snippet?
```python
a = '5'
b = 3
print(a + b)
```

**Choices:**
- **[A]** `8`
- **[B]** `'53'` **(CORRECT)**
- **[C]** `Error: unsupported operand type(s) for +: 'str' and 'int'`
- **[D]** `'5' * 3`

**Explanation:** The code attempts to concatenate a string and an integer using the '+' operator. In Python, the '+' operator is overloaded for strings to perform concatenation, not addition. Therefore, '5' (a string) and 3 (an integer) are concatenated to form the string '53'. The other options represent common mistakes or misunderstandings about type handling in Python.

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
What will be the output of the following Python code snippet?
```python
age = 30
name = 'Alice'
total = age + name
print(total)
```

**Choices:**
- **[A]** `'30Alice'`
- **[B]** `TypeError: unsupported operand type(s) for +: 'int' and 'str'` **(CORRECT)**
- **[C]** `60`
- **[D]** `30Alice30`

**Explanation:** The code attempts to add an integer (age) and a string (name), which is not allowed in Python. This results in a TypeError because the '+' operator cannot be used between incompatible types.

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

**Explanation:** The variable `x` is initially assigned an integer value (42). It is then reassigned a string ('Hello') and finally a boolean value (False). The last assignment to `x` determines its final value, which is False. Python allows variables to be reassigned to different types during execution.

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
print(name[1])
```

**Choices:**
- **[A]** `'A'`
- **[B]** `'l'` **(CORRECT)**
- **[C]** `'i'`
- **[D]** `'c'`

**Explanation:** The code snippet prints the second character of the string 'Alice'. In Python, indexing starts at 0, so 'A' is at index 0, 'l' is at index 1, and so on. Therefore, the output is 'l'.

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
- **[A]** `5`
- **[B]** `6` **(CORRECT)**
- **[C]** `7`
- **[D]** `8`

**Explanation:** The `len()` function returns the number of characters in a string. The string 'Alice' has 5 characters, so the output is 6.

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
- **[C]** `3 0`
- **[D]** `4 0`

**Explanation:** The floor division operator // divides the first operand by the second and rounds down to the nearest whole number. The modulus operator % returns the remainder of the division. In this case, 10 // 3 = 3 (since 10 divided by 3 is 3 with a remainder) and 10 % 3 = 1 (the remainder). Therefore, the output is '3 1'.

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
What is the output of the following Python code snippet?
```python
a = 2
b = 3
c = a ** b
print(c)
```

**Choices:**
- **[A]** `6`
- **[B]** `8` **(CORRECT)**
- **[C]** `9`
- **[D]** `12`

**Explanation:** The code snippet calculates the exponentiation of `a` to the power of `b`. Here, `a = 2` and `b = 3`, so `c = 2 ** 3 = 8`. Therefore, the output is 8.

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

**Explanation:** The code snippet uses the compound assignment operator `+=`, which is equivalent to `x = x + 3`. Initially, `x` is assigned the value 5. After executing `x += 3`, `x` becomes 8. The print statement then outputs the value of `x`, which is 8.

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
- **[A]** `AliceAliceAlice` **(CORRECT)**
- **[B]** `Alice, Alice, Alice`
- **[C]** `AliceeAliceeAlicee`
- **[D]** `Alice*3`

**Explanation:** The code snippet multiplies the string 'Alice' by 3, resulting in 'AliceAliceAlice'. The multiplication operator * is used to repeat a string multiple times.

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
- **[A]** `1`
- **[B]** `0` **(CORRECT)**
- **[C]** `-1`
- **[D]** `2`

**Explanation:** The code snippet converts the boolean values True and False to integers using int(True) which is 1 and int(False) which is 0. The sum of these two integers (1 + 0) results in 1.

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
str_num = "45"
int_from_str = int(str_num)
print(int_from_str)
```

**Choices:**
- **[A]** `45.0`
- **[B]** `45` **(CORRECT)**
- **[C]** `TypeError: invalid literal for int() with base 10: '45'`
- **[D]** `SyntaxError: invalid syntax`

**Explanation:** The code converts the string "45" to an integer using the int() function. The result is 45, which is printed as output.

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
b = 3
c = a + b * 2
print(c)
```

**Choices:**
- **[A]** `14`
- **[B]** `11` **(CORRECT)**
- **[C]** `8`
- **[D]** `7`

**Explanation:** The code performs arithmetic operations based on operator precedence. Multiplication is performed before addition, so the expression evaluates to `5 + (3 * 2) = 5 + 6 = 11`. Therefore, the correct output is 11.

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
What will be the output of the following Python code snippet?
```python
x = 10
y = '5'
z = x + y
print(z)
```

**Choices:**
- **[A]** `15`
- **[B]** `105` **(CORRECT)**
- **[C]** `TypeError: unsupported operand type(s) for +: 'int' and 'str'`
- **[D]** `'105'`

**Explanation:** The code attempts to add an integer (x) and a string (y). In Python, you cannot directly add these types. The correct output is '105' because the '+' operator concatenates strings when one of the operands is a string.

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
What is the output of the following Python code snippet?
```python
my_list = [10, 'hello', 3.14, True]
print(my_list[2])
```

**Choices:**
- **[A]** `10`
- **[B]** `3.14` **(CORRECT)**
- **[C]** `'hello'`
- **[D]** `True`

**Explanation:** The code snippet accesses the third element of the list `my_list` using a zero-based index. In Python, indices start at 0, so `my_list[2]` refers to the third element in the list, which is `3.14`. Therefore, the output will be `3.14`.

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
What is the output of the following Python code snippet?
```python
my_list = [10, 'hello', 3.14, True]
print(my_list[-2])
```

**Choices:**
- **[A]** `True`
- **[B]** `3.14` **(CORRECT)**
- **[C]** `'hello'`
- **[D]** `10`

**Explanation:** The code snippet accesses the second last element of the list using negative indexing. In Python, negative indices start from -1 for the last element. Therefore, my_list[-2] refers to the second last element, which is 3.14.

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
Which of the following code snippets correctly demonstrates reassigning an element in a list in Python?

**Choices:**
- **[A]** ````python
my_list = [1, 2, 3]
my_list[0] = 'a'
print(my_list)
````
- **[B]** ````python
my_list = [1, 2, 3]
my_list[1] = 4
print(my_list)
```` **(CORRECT)**
- **[C]** ````python
my_list = [1, 2, 3]
my_list.append(4)
print(my_list)
````
- **[D]** ````python
my_list = (1, 2, 3)
my_list[1] = 4
print(my_list)
````

**Explanation:** The correct answer demonstrates reassigning an element in a list, which is allowed due to the mutable nature of lists. Choice A attempts to change an element in a tuple, which is immutable and will raise a TypeError. Choice C shows appending an element to a list, not reassigning an existing one. Choice D tries to reassign an element in a tuple, which is also not allowed.

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
Which of the following Python code snippets correctly slices a list to include elements from index 2 to 4 (inclusive) in a new list? ```python
my_list = [10, 20, 30, 40, 50]
sliced_list = my_list[2:5]```

**Choices:**
- **[A]** `Choice A text`
- **[B]** `Choice B text` **(CORRECT)**
- **[C]** `Choice C text`
- **[D]** `Choice D text`

**Explanation:** The correct slicing syntax is my_list[2:5], which includes elements from index 2 to 4 (inclusive). The slice starts at the start index (2) and stops just before the stop index (5).

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
What is the output of the following Python code snippet?
```python
my_list = [10, 'hello', 3.14, True]
print(my_list[1:4:2])
```

**Choices:**
- **[A]** `['hello']`
- **[B]** `[10, 3.14]` **(CORRECT)**
- **[C]** `['hello', True]`
- **[D]** `[3.14]`

**Explanation:** The code snippet slices the list `my_list` from index 1 to index 4 with a step of 2. This means it starts at index 1 ('hello'), skips the next element (3.14), and takes the element at index 3 (True). The resulting slice is ['hello', True].

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
- **[C]** `['hello', 3.14]`
- **[D]** `[3.14, True]`

**Explanation:** The code snippet slices the list from the beginning up to but not including index 2. In Python, slicing is exclusive of the end index. Therefore, my_list[:2] returns [10, 'hello'].

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
- **[A]** `Choice A: reversed_list = my_list[::1]`
- **[B]** `Choice B: reversed_list = my_list[::-1]` **(CORRECT)**
- **[C]** `Choice C: reversed_list = my_list[-1::-1]`
- **[D]** `Choice D: reversed_list = my_list[1::2]`

**Explanation:** The correct answer is Choice B: reversed_list = my_list[::-1]. This uses Python's slicing feature to create a new list that is the reverse of my_list. The slice notation [::-1] means start at the end of the list and end at position 0, move with the step -1 (which means one step backwards). Choice A is incorrect because it does not reverse the list; it creates a copy of the original list. Choice C is also incorrect as it starts from the last element but does not include all elements in reverse order. Choice D is incorrect because it slices every other element starting from the second element, which does not reverse the list.

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

**Explanation:** The `append()` method adds an item to the end of the list. In this case, 3.14 is appended to the existing list `[10, 'hello']`, resulting in `[10, 'hello', 3.14]`.

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

- `my_list.append('world', 2)` is invalid syntax for the `append` method and does not support inserting at a specific index.
- `my_list[2] = 'world'` attempts to assign a value directly at index 2, which will raise an `IndexError` since the list only has two elements currently.
- `my_list.insert('world', 2)` is invalid syntax as the first argument should be the element to insert, not the index.

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
Which of the following code snippets correctly removes the first occurrence of the value '2' from a list and prints the updated list? ```python
my_list = [1, 2, 3, 4, 5]
# Code here
print(my_list)
```

**Choices:**
- **[A]** `my_list.remove(2)
` **(CORRECT)**
- **[B]** `my_list.pop(2)
`
- **[C]** `del my_list[1]
`
- **[D]** `my_list.sort()
`

**Explanation:** The correct choice is `my_list.remove(2)`, which removes the first occurrence of '2' from the list. The output will be `[1, 3, 4, 5]`. The distractors are incorrect because: `my_list.pop(2)` removes the item at index 2 (which is '3'), not '2'. `del my_list[1]` removes the item at index 1 (which is '2'), but it does not remove all occurrences of '2'. `my_list.sort()` sorts the list in ascending order, which is not related to removing an element.

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
my_list = [1, 2, [3, 4], 5]
print(len(my_list))
```

**Choices:**
- **[A]** `4`
- **[B]** `5` **(CORRECT)**
- **[C]** `6`
- **[D]** `7`

**Explanation:** The `len()` function in Python returns the number of items in an object. In this case, `my_list` contains four elements: two integers and one nested list. Therefore, the length of `my_list` is 4.

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

**Explanation:** The correct answer uses the '+' operator to concatenate two lists, which is the appropriate method for combining lists in Python. The distractors use operators that are not valid for list concatenation: '*' performs element-wise multiplication, '-' and '/' perform subtraction and division respectively, which do not apply to lists.

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
Which of the following code snippets correctly checks if the element `4` is in the list `[1, 2, 3]` using the 'in' operator?

**Choices:**
- **[A]** ````python
if 4 in [1, 2, 3]:
    print('Found')
else:
    print('Not Found')
````
- **[B]** ````python
if 4 not in [1, 2, 3]:
    print('Not Found')
else:
    print('Found')
```` **(CORRECT)**
- **[C]** ````python
if 4 == [1, 2, 3]:
    print('Found')
else:
    print('Not Found')
````
- **[D]** ````python
if 4 in range(1, 4):
    print('Found')
else:
    print('Not Found')
````

**Explanation:** The correct choice uses the 'in' operator to check if `4` is in the list `[1, 2, 3]`. The 'in' operator returns `False` because `4` is not an element of the list. Therefore, the code prints 'Not Found'. Choice A incorrectly checks for membership using `==`, which compares the entire list to `4`, resulting in `False`. Choice C attempts to check if `4` is equal to the list `[1, 2, 3]`, which is not a valid comparison and will raise a TypeError. Choice D uses `range(1, 4)`, which generates numbers from 1 to 3 (not including 4), so it correctly identifies that `4` is not in the range.

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
- **[D]** `my_tuple = (1)  # Missing trailing comma`

**Explanation:** A tuple in Python is created using parentheses. The correct syntax includes a trailing comma for single-element tuples to distinguish them from expressions.

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

**Explanation:** The correct answer is A. Tuples in Python are immutable, meaning that once a tuple is created, its elements cannot be changed. Attempting to assign a new value to an element of a tuple will raise a TypeError. In contrast, lists, dictionaries, and sets are mutable data structures, allowing for item assignment and modification.

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
print(my_tuple[2])
```

**Choices:**
- **[A]** `30` **(CORRECT)**
- **[B]** `20`
- **[C]** `10`
- **[D]** `40`

**Explanation:** The code snippet prints the third element of the tuple `my_tuple`. In Python, indexing starts at 0. Therefore, `my_tuple[2]` refers to the third element, which is 30.

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
Which of the following Python code snippets correctly creates a set from a list, ensuring all elements are unique?

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

**Explanation:** The correct answer is A. The `set()` function in Python automatically removes duplicate values from a collection, so when applied to a list, it creates a set with unique elements. Choice B attempts to convert the set back to a list, which is unnecessary and does not change the uniqueness of the elements. Choice C tries to print the original list instead of the set, which would output `[1, 2, 3, 2, 4]` rather than `{1, 2, 3, 4}`. Choice D attempts to create a set containing the entire list as a single element, resulting in `[[1, 2, 3, 2, 4]]` instead of `{1, 2, 3, 4}`.

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
intersection = set1.intersection(set2)
print(intersection)  # Output: {3, 4, 5}
````
- **[B]** ````python
set1 = {1, 2, 3}
set2 = {3, 4, 5}
intersection = set1 & set2
print(intersection)  # Output: {3}
```` **(CORRECT)**
- **[C]** ````python
set1 = [1, 2, 3]
set2 = [3, 4, 5]
intersection = list(set(set1) & set(set2))
print(intersection)  # Output: {3}
````
- **[D]** ````python
set1 = (1, 2, 3)
set2 = (3, 4, 5)
intersection = set(set1).intersection(set(set2))
print(intersection)  # Output: {3}
````

**Explanation:** The correct answer uses the intersection method or the '&' operator to find common elements between two sets. The first and third options are incorrect because they either use lists or tuples instead of sets, which would result in a TypeError. The fourth option is also incorrect because it attempts to create sets from tuples using set(set1) and set(set2), which is unnecessary and redundant.

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
Given the following Python code snippet, what will be the output of `print(student['major'])`?
```python
student = {'name': 'Alice', 'age': 20, 'major': 'Computer Science'}
```


**Choices:**
- **[A]** `Alice`
- **[B]** `Computer Science` **(CORRECT)**
- **[C]** `20`
- **[D]** `name`

**Explanation:** The correct choice is 'Computer Science'. The code snippet defines a dictionary `student` with keys 'name', 'age', and 'major'. When we access `student['major']`, it retrieves the value associated with the key 'major', which is 'Computer Science'. The other choices are incorrect because they either refer to other values in the dictionary or are not valid keys.

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
```

**Choices:**
- **[A]** `Alice`
- **[B]** `Computer Science` **(CORRECT)**
- **[C]** `20`
- **[D]** `NameError: name 'major' is not defined`

**Explanation:** The code snippet defines a dictionary `student` with keys 'name', 'age', and 'major'. The value associated with the key 'major' is 'Computer Science'. When we access `student['major']`, it retrieves the value 'Computer Science'. Therefore, the output will be 'Computer Science'.

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
What is the output of the following code snippet?
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
- **[D]** `TypeError: unhashable type: 'dict'`

**Explanation:** The code correctly modifies the value associated with the key 'age' and adds a new key-value pair for 'gender'. The dictionary maintains its order, so the output is {'name': 'Alice', 'age': 21, 'major': 'Computer Science', 'gender': 'Female'}.

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
What is the output of the following code snippet?
```python
student = {'name': 'Alice', 'age': 20}
print(student.get('email'))
print(student.get('phone', 'N/A'))
```

**Choices:**
- **[A]** `None N/A`
- **[B]** `None N/A` **(CORRECT)**
- **[C]** `Alice None`
- **[D]** `20 None`

**Explanation:** The `get()` method is used to retrieve the value for a specified key in the dictionary. If the key does not exist, it returns `None` by default. In this case, 'email' and 'phone' keys do not exist in the dictionary, so both calls return `None`. The second call with a default value of 'N/A' is ignored because the key exists.

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

**Explanation:** The `keys()` method returns a view object that displays a list of all the keys in the dictionary. The output is a list of strings representing the keys, not a tuple or another dictionary.

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
- **[D]** `{'name': 'Bob', 'age': 20, 'major': 'Computer Science'}`

**Explanation:** The `del` statement is used to remove a key-value pair from the dictionary. In this case, 'age': 20 is removed, leaving {'name': 'Alice', 'major': 'Computer Science'}. The other options are incorrect because they either do not reflect the removal of the 'age' key or introduce new keys and values that were not present in the original dictionary.

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

**Explanation:** The code snippet creates a list `my_list` with elements [1, 2, 3]. It then modifies the first element of the list to be 4. The correct output is `[4, 2, 3]`. Choice A is incorrect because it shows no change. Choice C and D are incorrect because they modify different elements.

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
- **[A]** `x is less than y`
- **[B]** `x is not less than y` **(CORRECT)**
- **[C]** `SyntaxError: invalid syntax`
- **[D]** `RuntimeError: division by zero`

**Explanation:** The code snippet correctly compares the values of x and y. Since 5 is less than 10, the condition `x < y` evaluates to True, and the first print statement 'x is less than y' is executed. The else block is not reached.

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
- **[A]** `x is less than y`
- **[B]** `x is not less than y` **(CORRECT)**
- **[C]** `SyntaxError: invalid syntax`
- **[D]** `RuntimeError: division by zero`

**Explanation:** The code snippet correctly compares the values of x and y. Since 5 is less than 10, the condition `x < y` evaluates to True, and 'x is less than y' is printed.

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
Which of the following code snippets will correctly print '2' when executed?

**Choices:**
- **[A]** ````python
x = 10
if x > 5:
    if x < 8:
        print('2')
else:
    print('3')
````
- **[B]** ````python
x = 7
if x > 5:
    if x < 10:
        print('2')
else:
    print('3')
```` **(CORRECT)**
- **[C]** ````python
x = 4
if x > 5:
    if x < 8:
        print('2')
else:
    print('3')
````
- **[D]** ````python
x = 6
if x > 5:
    if x < 7:
        print('2')
else:
    print('3')
````

**Explanation:** The correct choice is B. The code snippet checks if `x` is greater than 5 and less than 10, which is true for `x = 7`. Therefore, it prints '2'. Choice A fails because the inner condition is not met (x < 8). Choice C also fails because x is not greater than 5. Choice D fails because the inner condition is not met (x < 7).

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
- **[A]** `x is greater than y`
- **[B]** `x is not equal to y` **(CORRECT)**
- **[C]** `x is equal to y`
- **[D]** `SyntaxError: invalid syntax`

**Explanation:** The code snippet compares the values of x and y using the != operator. Since x (5) is not equal to y (10), the condition in the if statement evaluates to True, and 'x is not equal to y' is printed.

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
Which of the following Python code snippets correctly demonstrates the use of the 'and' operator to check if both conditions are True?

**Choices:**
- **[A]** ````python
x = True
y = False
if x and y:
    print('Both conditions are true')
else:
    print('At least one condition is false')
````
- **[B]** ````python
x = True
y = True
if x and y:
    print('Both conditions are true')
else:
    print('At least one condition is false')
```` **(CORRECT)**
- **[C]** ````python
x = False
y = False
if x and y:
    print('Both conditions are true')
else:
    print('At least one condition is false')
````
- **[D]** ````python
x = True
y = None
if x and y:
    print('Both conditions are true')
else:
    print('At least one condition is false')
````

**Explanation:** The correct choice demonstrates the use of the 'and' operator to check if both conditions are True. In this case, both x and y are True, so the condition is met and 'Both conditions are true' is printed. The other choices either have one or both conditions as False (Choice A), or they involve a non-boolean value (Choice D), which would result in an error.

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
Which of the following Python code snippets correctly demonstrates the use of the 'or' operator to check if at least one condition is True?

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

**Explanation:** The correct answer is B. The 'or' operator returns True if at least one of the conditions is True. In this case, x or y is True because x is True. Choice A is incorrect because both x and y are False, so the output should be False. Choice C is incorrect because 5 > 10 is False and 5 < 10 is True, but since 'or' only needs one condition to be True, the output should be True. Choice D is correct because 'hello' != 'world' is True, so the output will be True.

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
What will be the output of the following Python code?
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

**Explanation:** The expression `not x or y` is evaluated using short-circuit evaluation. Since `x` is True, `not x` evaluates to False. The OR operator then checks the second condition, which is `y`. Since `y` is False, the entire expression evaluates to False.

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
Which of the following code snippets will output 'True' when executed?

**Choices:**
- **[A]** ````python
x = True
y = False
print(x or y)
````
- **[B]** ````python
x = True
y = False
print(x and y)
```` **(CORRECT)**
- **[C]** ````python
x = False
y = True
print(not x)
````
- **[D]** ````python
x = 5
y = 10
print(x > y)
````

**Explanation:** The correct choice is B. The 'and' operator short-circuits and stops evaluating as soon as it encounters a False value, so it does not evaluate the second operand (y). Since x is True, the result of x and y is False. Choice A outputs 'True' because 'or' returns True if at least one condition is True. Choice C outputs 'False' because 'not' reverses the boolean value of x to False. Choice D outputs 'False' because 5 is not greater than 10.

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
if []:
    print(True)
else:
    print(False)
````
- **[B]** ````python
if '' in {}:
    print(True)
else:
    print(False)
```` **(CORRECT)**
- **[C]** ````python
if 0 == False:
    print(True)
else:
    print(False)
````
- **[D]** ````python
if 'hello' and []:
    print(True)
else:
    print(False)
````

**Explanation:** The empty list [], the empty dictionary {}, and zero all evaluate to False in Python. The 'in' operator checks for membership, so '' in {} is False. The 'and' operator short-circuits and returns the first False value it encounters, which is 0 == False.

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
Which of the following code snippets will output 'True'?

**Choices:**
- **[A]** ````python
x = 5
y = 10
print(x < y)
```` **(CORRECT)**
- **[B]** ````python
x = 3
y = 3
print(x != y)
````
- **[C]** ````python
x = 'hello'
y = ''
print(y == x)
````
- **[D]** ````python
x = True
y = False
print(not x and y)
````

**Explanation:** The correct choice is A. The expression `x < y` evaluates to True because 5 is less than 10. Choice B is incorrect because `x != y` evaluates to False because both x and y are equal to 3. Choice C is incorrect because an empty string evaluates to False in a boolean context, so `y == x` evaluates to False. Choice D is incorrect because `not x and y` evaluates to False because `not x` is True (since x is True), and the `and` operator requires both conditions to be True for the entire expression to evaluate to True.

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
What will be the output of the following Python code snippet?
```python
x = 5
y = 10
if x > 3:
    if y < 20:
        print('Condition met')
else:
    print('Outer else')
```

**Choices:**
- **[A]** `Condition met` **(CORRECT)**
- **[B]** `Outer else`
- **[C]** `SyntaxError`
- **[D]** `IndentationError`

**Explanation:** The code snippet has two nested if statements. The outer if condition `x > 3` is True because x (5) is greater than 3. The inner if condition `y < 20` is also True because y (10) is less than 20. Therefore, the code inside the inner if block will execute, printing 'Condition met'.

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
What will be the output of the following Python code?
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

**Explanation:** The code uses chained comparison operators to check if x is between 10 and 20. Since 15 satisfies this condition, the output will be 'x is between 10 and 20'. The other options are incorrect because there is no syntax or type error in the code.

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

**Choices:**
- **[A]** `Choice A: Minor`
- **[B]** `Choice B: Adult` **(CORRECT)**
- **[C]** `Choice C: Error`
- **[D]** `Choice D: SyntaxError`

**Explanation:** The ternary operator checks if `age >= 18`. Since `age` is 20, which is greater than or equal to 18, the condition is True. Therefore, 'Adult' is assigned to the variable `status`, and it gets printed.

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
Consider the following Python code snippet:
```python
x = 5
y = 10
if x < y and y > 7:
    print('Condition met')
else:
    print('Condition not met')
```

**Choices:**
- **[A]** `Condition met` **(CORRECT)**
- **[B]** `Condition not met`
- **[C]** `SyntaxError: invalid syntax`
- **[D]** `TypeError: unsupported operand type(s) for +: 'int' and 'str'`

**Explanation:** The code snippet checks if both conditions (x < y and y > 7) are true. Since x is indeed less than y (5 < 10) and y is greater than 7 (10 > 7), the condition is met, and 'Condition met' will be printed.

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
Which of the following code snippets correctly prints each element in a list of numbers from 0 to 4 using a for loop? ```python
# code here
```

**Choices:**
- **[A]** `for i in range(5): print(i)` **(CORRECT)**
- **[B]** `for i in range(6): print(i)`
- **[C]** `for i in range(0, 4): print(i)`
- **[D]** `for i in range(1, 5): print(i)`

**Explanation:** The correct answer is `for i in range(5): print(i)`. This loop starts from 0 and goes up to (but not including) 5, printing each number from 0 to 4. The other options either start from the wrong number or go one step too far.

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
What will be the output of the following Python code snippet?
```python
word = 'hello'
for char in word:
    print(char.upper())
```

**Choices:**
- **[A]** `HELLO` **(CORRECT)**
- **[B]** `hello`
- **[C]** `Hello`
- **[D]** `hELLO`

**Explanation:** The code iterates over each character in the string 'hello' and converts it to uppercase using the `upper()` method. The correct output is 'HELLO'. Choice B is incorrect because it does not convert any characters to uppercase. Choice C is incorrect because it capitalizes only the first letter of the word. Choice D is incorrect because it capitalizes every other character.

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
What will be printed when the following code is executed? ```python
for i in range(5):
    print(i)
```

**Choices:**
- **[A]** `0 1 2 3 4` **(CORRECT)**
- **[B]** `1 2 3 4 5`
- **[C]** `0 1 2 3`
- **[D]** `1 2 3 4`

**Explanation:** The range(5) function generates numbers from 0 to 4. The for loop iterates over this sequence and prints each number. Therefore, the output will be '0 1 2 3 4'.

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
What will be printed to the console?

**Choices:**
- **[A]** `3 4 5 6 7` **(CORRECT)**
- **[B]** `2 3 4 5 6`
- **[C]** `1 2 3 4 5`
- **[D]** `0 1 2 3 4`

**Explanation:** The range function starts at 3 and goes up to (but not including) 8. Therefore, the numbers printed will be 3, 4, 5, 6, and 7.

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
for i in range(0, 10, 3):
    print(i)
```
What will be the output of this code?

**Choices:**
- **[A]** `0 3 6 9` **(CORRECT)**
- **[B]** `0 2 4 6 8`
- **[C]** `1 4 7`
- **[D]** `0 1 2 3 4 5 6 7 8 9`

**Explanation:** The range function starts at 0, goes up to (but not including) 10, and increments by 3. Therefore, it will print 0, 3, 6, and 9.

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
Which of the following code snippets will correctly print the numbers from 5 to 2 in descending order using a range function?

**Choices:**
- **[A]** ````python
for i in range(2, 6):
    print(i)
````
- **[B]** ````python
for i in range(5, 0, -1):
    print(i)
```` **(CORRECT)**
- **[C]** ````python
for i in range(6, 2, -1):
    print(i)
````
- **[D]** ````python
for i in range(0, 5, -1):
    print(i)
````

**Explanation:** The correct answer uses the `range(start, stop, step)` function with a negative step to count backwards. The start is 5, the stop is 0 (exclusive), and the step is -1. This will print 5, 4, 3, 2. Option A has an incorrect range that starts from 2 instead of 5. Option C incorrectly sets the start to 6 instead of 5. Option D uses a positive step which would count upwards.

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
What will be the output of the following Python code snippet?
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
- **[D]** `1 2 3 4 5`

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
Consider the following Python code snippet:
```python
# Count down from 5 to 1, but it's missing a crucial line!
count = 5
while count > 0:
    print(count)
# Missing line here
```
Which of the following lines should be added after `print(count)` to ensure the loop terminates correctly and prints numbers from 5 to 1?


**Choices:**
- **[A]** `count += 1`
- **[B]** `count -= 1` **(CORRECT)**
- **[C]** `count = count + 1`
- **[D]** `count = count - 1`

**Explanation:** The correct answer is B: `count -= 1`. This line decrements the value of `count` by 1 after each iteration, ensuring that the loop will eventually terminate when `count` becomes less than or equal to 0. Option A increments `count`, which would cause an infinite loop since it never decreases. Options C and D are equivalent to A and B respectively, but using `-=` is more concise.

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
Which of the following code snippets will correctly print 'apple' and then terminate the loop immediately when encountering 'cherry'?

**Choices:**
- **[A]** ````python
fruits = ['apple', 'banana', 'cherry']
for fruit in fruits:
    if fruit == 'cherry':
        continue
    print(fruit)
````
- **[B]** ````python
fruits = ['apple', 'banana', 'cherry']
for fruit in fruits:
    if fruit == 'cherry':
        break
    print(fruit)
```` **(CORRECT)**
- **[C]** ````python
fruits = ['apple', 'banana', 'cherry']
for fruit in fruits:
    if fruit == 'cherry':
        pass
    print(fruit)
````
- **[D]** ````python
fruits = ['apple', 'banana', 'cherry']
for fruit in fruits:
    if fruit == 'cherry':
        return
    print(fruit)
````

**Explanation:** The correct answer uses the `break` statement, which terminates the loop immediately when 'cherry' is encountered. The other options use `continue`, `pass`, and `return`, which do not terminate the loop as intended.

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
Which of the following code snippets correctly uses the `continue` statement to skip printing even numbers in a list?

**Choices:**
- **[A]** ````python
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        print(num)
````
- **[B]** ````python
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        continue
    print(num)
```` **(CORRECT)**
- **[C]** ````python
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 != 0:
        continue
    print(num)
````
- **[D]** ````python
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        break
    print(num)
````

**Explanation:** The correct answer uses the `continue` statement inside an if condition to skip printing even numbers. This means that when a number is even, the loop continues to the next iteration without executing the print statement for that number. The other options either incorrectly use `print` instead of `continue`, or they use `break` which would exit the loop entirely.

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
- **[A]** `Choice A: The code is correct and will output 15.` **(CORRECT)**
- **[B]** `Choice B: The code has an off-by-one error and will output 20.`
- **[C]** `Choice C: The code uses the wrong loop type and will not work.`
- **[D]** `Choice D: The code initializes sum to 1 instead of 0, so it will output 15.`

**Explanation:** The correct answer is Choice A. The code initializes sum to 0 and iterates over the range from 1 to 5 (inclusive), adding each number to sum. After the loop, it prints the final value of sum, which is 15. Choice B has an off-by-one error because range(1, 6) already includes 5, so no additional increment is needed. Choice C suggests using a while loop instead of a for loop, which would require more code and is not necessary in this case. Choice D incorrectly initializes sum to 1 instead of 0.

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

**Explanation:** The code iterates over the list 'numbers' using a for loop with the range of its length. The index 'i' starts at 0 and goes up to len(numbers) - 1, which are the valid indices for the list. Therefore, it prints each element in the list starting from the first (index 0) to the last (index 2).

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
``` What will be the output of this code?


**Choices:**
- **[A]** `a b c` **(CORRECT)**
- **[B]** `1 2 3`
- **[C]** `{'a': 1, 'b': 2, 'c': 3}`
- **[D]** `TypeError: 'dict_keys' object is not iterable`

**Explanation:** The code snippet iterates over the keys of a dictionary using `my_dict.keys()`. The `keys()` method returns a view object that displays a list of all the keys in the dictionary. Therefore, the output will be 'a b c'. Option B is incorrect because it prints the values instead of the keys. Option C is incorrect because it attempts to print the entire dictionary rather than its keys. Option D is incorrect because there is no error; the code runs successfully.

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

**Explanation:** The `enumerate()` function adds a counter to an iterable and returns it in a form of enumerate object. The syntax is `enumerate(iterable, start=0)`. In this case, the loop starts with index 0 for 'apple', then 1 for 'banana', and 2 for 'cherry'. Therefore, the correct output is '0 apple
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
Which of the following code snippets correctly finds the maximum value in a list using a for loop? ```python
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

**Explanation:** The correct answer is B. The code initializes `max_value` to `None` and iterates through the list, updating `max_value` whenever it finds a number greater than the current `max_value`. This ensures that by the end of the loop, `max_value` holds the maximum value in the list. Choice A has an off-by-one error in the loop condition. Choice C attempts to find the minimum value instead of the maximum. Choice D incorrectly uses a while loop instead of a for loop.

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
string = 'banana'
count = 0
for char in string:
    if char == 'b':
        count += 1
print(count)
````
- **[B]** ````python
string = 'banana'
count = 0
for char in string:
    if char == 'a':
        count += 1
print(count)
```` **(CORRECT)**
- **[C]** ````python
string = 'banana'
count = 0
for char in string:
    if char == 'A':
        count += 1
print(count)
````
- **[D]** ````python
string = 'banana'
count = 0
for char in string:
    if char != 'a':
        count += 1
print(count)
````

**Explanation:** The correct code snippet counts the occurrences of 'a' in the string 'banana'. It initializes a counter to zero and increments it each time it encounters the character 'a'. The other options either count a different character, are case-sensitive, or incorrectly decrement the counter.

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
Given the following Python code snippet, what will be the output after its execution?
```python
numbers = [10, 20, 30, 40]
filtered_numbers = []
for number in numbers:
    if number > 25:
        filtered_numbers.append(number)
print(filtered_numbers)
```

**Choices:**
- **[A]** `[10, 20]`
- **[B]** `[30, 40]` **(CORRECT)**
- **[C]** `[10, 20, 30, 40]`
- **[D]** `SyntaxError`

**Explanation:** The for loop iterates over the list 'numbers'. The if condition checks if each number is greater than 25. If true, it appends the number to the 'filtered_numbers' list. After the loop completes, the output will be [30, 40].

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
What will be the output of the following Python code?
```python
user_input = ""
while user_input != "quit":
    user_input = input("Enter command: ")
    if user_input == "stop":
        break
print("Loop ended")
```

**Choices:**
- **[A]** `The program will print 'Loop ended' and then wait for the next input.`
- **[B]** `The program will keep asking for input until 'quit' is entered, or 'stop' is entered to break out of the loop.` **(CORRECT)**
- **[C]** `The program will print an error message and terminate.`
- **[D]** `The program will enter an infinite loop because 'stop' does not equal 'quit'.`

**Explanation:** Explanation: The code uses a while loop to continuously prompt the user for input until they enter 'quit'. If the user enters 'stop', the break statement is executed, which exits the loop immediately. Therefore, the correct output will be 'Loop ended' followed by the program terminating. Choice A is incorrect because it suggests the program waits for another input after printing 'Loop ended', which is not the case. Choice C is incorrect because there are no error messages in the code. Choice D is incorrect because entering 'stop' does not cause an infinite loop; instead, it breaks out of the loop.

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
Which of the following code snippets correctly counts down from 5 to 1 using a while loop? ```python
# code here
```

**Choices:**
- **[A]** `count = 5
while count > 0:
    print(count)
count -= 1`
- **[B]** `count = 5
while count >= 1:
    print(count)
count += 1` **(CORRECT)**
- **[C]** `count = 5
while count > 0:
    print(count)
count -= 2`
- **[D]** `count = 5
while count >= 1:
    print(count)
count -= 1`

**Explanation:** The correct answer is B. The while loop should continue as long as `count` is greater than or equal to 1, and it should decrement `count` by 1 each iteration. Choice A decrements `count` too early, Choice C decrements `count` by 2 instead of 1, and Choice D increments `count` instead of decrementing it.

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
for number in numbers:
    if number == 3:
        found = True
        break
print(found)
```

**Choices:**
- **[A]** `True`
- **[B]** `False` **(CORRECT)**
- **[C]** `SyntaxError`
- **[D]** `RuntimeError`

**Explanation:** The code initializes a boolean flag `found` to False. It then iterates over the list `numbers`. When it finds the number 3, it sets `found` to True and breaks out of the loop. The final print statement outputs the value of `found`, which is False because the loop completes without finding any other numbers.

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
- **[A]** `SyntaxError: invalid syntax`
- **[B]** `Hello, Alice!` **(CORRECT)**
- **[C]** `NameError: name 'greet' is not defined`
- **[D]** `TypeError: greet() missing 1 required positional argument: 'name'`

**Explanation:** The code defines a function `greet` that takes one parameter `name` and returns a greeting string. The `main` function calls `greet('Alice')`, which correctly substitutes 'Alice' for the `name` parameter in the `greet` function, resulting in the output 'Hello, Alice!'.

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
Which of the following code snippets correctly defines a function named `calculate_area` that takes two parameters, `length` and `width`, and returns their product?

**Choices:**
- **[A]** ````python
def calculate_area(length, width):
    return length * width
```` **(CORRECT)**
- **[B]** ````python
def calculate_area(length, width):
    area = length + width
    return area
````
- **[C]** ````python
def calculate_area(length, width):
    print(length * width)
````
- **[D]** ````python
def calculate_area(length, width):
    return length / width
````

**Explanation:** The correct answer defines a function named `calculate_area` with two parameters, `length` and `width`, and returns their product. Choice B incorrectly adds the length and width instead of multiplying them. Choice C prints the area instead of returning it. Choice D attempts to divide the length by the width, which is not what the question asks for.

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
- **[B]** `15`
- **[C]** `8`
- **[D]** `7`

**Explanation:** The function `multiply` takes two arguments, `a` and `b`, and returns their product. In this case, `4 * 3 = 12`. Choice A is correct. Choices B, C, and D are incorrect because they represent different arithmetic operations or results.

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
What will be the output of the following Python code snippet?
```python
def greet(name):
    return f'Hello, {name}!'

print(greet('Alice'))
```

**Choices:**
- **[A]** `Hello, Alice!` **(CORRECT)**
- **[B]** `Hello, !`
- **[C]** `None`
- **[D]** `TypeError: greet() missing 1 required positional argument: 'name'`

**Explanation:** The function `greet` is defined to return a string that includes the name passed as an argument. When calling `print(greet('Alice'))`, the function correctly returns 'Hello, Alice!', which is then printed.

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
- **[C]** `Error: function does not return anything`
- **[D]** `SyntaxError`

**Explanation:** The function `greet` is defined to print a greeting message but does not have an explicit return statement. In Python, if no return statement is provided, the function implicitly returns None.

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

**Explanation:** The correct answer is Choice A. The function `get_values` returns a tuple containing the values of `x` and `y`. Choices B, C, and D either return a list or a single value instead of a tuple.

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
What is the output of calling `add_item('apple')` followed by `add_item('banana')`?


**Choices:**
- **[A]** `[apple, banana]` **(CORRECT)**
- **[B]** `[banana]`
- **[C]** `[apple]`
- **[D]** `Error`

**Explanation:** The function `add_item` uses a mutable default argument `items=[]`. When called with 'apple', it appends 'apple' to the list. The same list is then used when calling with 'banana', appending 'banana'. Thus, the final output is [apple, banana].

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
Which of the following function calls will correctly pass keyword arguments to a function named `greet` that expects two parameters, `name` and `age`?
```python
def greet(name, age):
    print(f'Hello, {name}. You are {age} years old.')

# Function call
result = greet(?, ?)
```


**Choices:**
- **[A]** `greet('Alice', 30)`
- **[B]** `greet(name='Alice', age=30)` **(CORRECT)**
- **[C]** `greet(age=30, 'Alice')`
- **[D]** `greet(30, 'Alice')`

**Explanation:** The correct choice is `greet(name='Alice', age=30)`. This correctly passes keyword arguments to the function, specifying the parameter names. The other choices either use positional arguments incorrectly or mix up the order of parameters.

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
What will be the output of this code?

**Choices:**
- **[A]** `5 10`
- **[B]** `10 5` **(CORRECT)**
- **[C]** `5 5`
- **[D]** `10 10`

**Explanation:** The function `my_function` has a local variable `x` which shadows the global variable `x`. When `my_function` is called, it prints its local `x`, which is 10. After calling the function, the global `x` remains unchanged and is printed as 5.

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
What is the output of the following Python code?
```python
def calculate_average(numbers):
    return sum(numbers) / len(numbers)

average = calculate_average([1, 2, 3, 4, 5])
print(average)
```

**Choices:**
- **[A]** `10.0`
- **[B]** `3.0` **(CORRECT)**
- **[C]** `2.5`
- **[D]** `5.0`

**Explanation:** The function `calculate_average` correctly calculates the average of the list `[1, 2, 3, 4, 5]`, which is `(1+2+3+4+5) / 5 = 15 / 5 = 3.0`. The variable `average` holds this value and is printed.

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
result = add_item(4, my_list)
print(result) # Output: [1, 2, 3, 4]````
- **[B]** ````python
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

my_list = [1, 2, 3]
result = add_item(4, my_list)
print(result) # Output: [1, 2, 3, 4]```` **(CORRECT)**
- **[C]** ````python
def add_item(item, items=[]):
    items.append(item)
    return items

my_list = [1, 2, 3]
result = add_item(4)
print(result) # Output: [4]````
- **[D]** ````python
def add_item(item, items=[]):
    return items + [item]

my_list = [1, 2, 3]
result = add_item(4, my_list)
print(result) # Output: [1, 2, 3, 4]````

**Explanation:** The correct answer uses `items=None` and checks if it is `None` inside the function. This ensures that a new list is created each time the function is called without affecting any external lists passed as arguments.

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
    return s

greeting = 'Hello'
new_greeting = modify_string(greeting)
print(new_greeting)
```

**Choices:**
- **[A]** `Hello`
- **[B]** `Hello World` **(CORRECT)**
- **[C]** `World Hello`
- **[D]** `Error: cannot modify string`

**Explanation:** The function `modify_string` takes a string `s`, appends ' World' to it, and returns the new string. The variable `greeting` is passed to this function, and the returned value is stored in `new_greeting`. Therefore, the output is 'Hello World'.

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
What is the output of the following code snippet?
```python
def greet(name):
    return f'Hello, {name}!'

def introduce(greeting_function, name):
    print(greeting_function(name))

introduce(greet, 'Alice')
```

**Choices:**
- **[A]** `Hello, Alice!` **(CORRECT)**
- **[B]** `Hello, Bob!`
- **[C]** `NameError: name 'name' is not defined`
- **[D]** `TypeError: greet() takes 1 positional argument but 2 were given`

**Explanation:** The code defines two functions, `greet` and `introduce`. The `greet` function takes a name as an argument and returns a greeting string. The `introduce` function takes another function (a greeting function) and a name as arguments, then calls the greeting function with the provided name. When calling `introduce(greet, 'Alice')`, it correctly passes the `greet` function and the string `'Alice'` to `introduce`. Inside `introduce`, `greet('Alice')` is called, which returns `'Hello, Alice!'`, and this value is printed.

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
What is the output of the following Python code snippet?
```python
def calculate_stats(data):
    return sum(data) / len(data)

data = [1, 2, 3, 4, 5]
result = calculate_stats(data)
print(result)
```

**Choices:**
- **[A]** `10.0`
- **[B]** `3.0` **(CORRECT)**
- **[C]** `2.5`
- **[D]** `5.0`

**Explanation:** The function `calculate_stats` calculates the average of a list by summing all elements and dividing by the number of elements. For the input `[1, 2, 3, 4, 5]`, the sum is 15 and there are 5 elements, so the result should be 15 / 5 = 3.0.

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
What is the output of the following Python code?
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
- **[D]** `3`

**Explanation:** The `factorial` function is a recursive function that calculates the factorial of a number. The base case is when `n == 0`, in which case it returns 1. For other values, it recursively calls itself with `n - 1`. When `print(factorial(3))` is executed, the function will calculate 3 * 2 * 1 = 6.

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
Consider the following Python function that calculates the factorial of a number using recursion. ```python
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)
``` What will be the output when calling `factorial(3)`?

**Choices:**
- **[A]** `6` **(CORRECT)**
- **[B]** `5`
- **[C]** `4`
- **[D]** `3`

**Explanation:** The function `factorial(3)` will call itself with `n=2`, then `n=1`, and finally `n=0`. When `n=0`, it returns 1. The recursive calls multiply these values together: `3 * 2 * 1 = 6`. Therefore, the output is 6.

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
square = lambda x: x * x
```` **(CORRECT)**
- **[B]** ````python
square = lambda x: x + x
````
- **[C]** ````python
square = lambda x, y: x * y
````
- **[D]** ````python
square = lambda: x * x
````

**Explanation:** The correct choice is `square = lambda x: x * x`, which correctly calculates the square of a number. The other choices are incorrect because they either add instead of multiplying, take two arguments instead of one, or do not define the variable `x`.

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
squared_numbers = map(lambda x, y: x * y, numbers)
print(list(squared_numbers))
````

**Explanation:** The correct answer uses a lambda function with `map()` to square each number in the list. The lambda function takes one argument `x` and returns `x * x`. The distractors either lack the lambda keyword, have incorrect operations inside the lambda (e.g., addition instead of multiplication), or use an incorrect number of arguments.

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
Consider the following Python function:
```python
def multiply(a, b):
    return a * b

result = multiply(3, 4)
print(result)
```
What will be the output of this code?

**Choices:**
- **[A]** `12` **(CORRECT)**
- **[B]** `7`
- **[C]** `9`
- **[D]** `3`

**Explanation:** The function `multiply` takes two parameters, `a` and `b`, and returns their product. When called with `multiply(3, 4)`, it correctly calculates 3 * 4 = 12. Therefore, the output will be '12'.

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

