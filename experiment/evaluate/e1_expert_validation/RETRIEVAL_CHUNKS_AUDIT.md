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
What is the output of the following Python code snippet?
```python
x = 42
x = 'Hello'
x = False
print(type(x))
```

**Choices:**
- **[A]** `<class 'int'>`
- **[B]** `<class 'str'>` **(CORRECT)**
- **[C]** `<class 'bool'>`
- **[D]** `<class 'NoneType'>`

**Explanation:** The code snippet demonstrates Python's dynamic typing. The variable `x` is first assigned an integer value, then a string, and finally a boolean value. At the end, the type of `x` is printed. Since the last assignment to `x` is a boolean, the output will be `<class 'bool'>`. The other options represent incorrect types that could potentially be assigned to `x` at different points in the code.

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

**Explanation:** The code performs float division between two integers, resulting in a floating-point number. The correct output is 3.3333333333333335.

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
y = 'hello'
z = x + y
print(z)
```

**Choices:**
- **[A]** `TypeError: unsupported operand type(s) for +: 'int' and 'str'` **(CORRECT)**
- **[B]** `42hello`
- **[C]** `TypeError: can only concatenate str (not "int") to str`
- **[D]** `SyntaxError: invalid syntax`

**Explanation:** The code attempts to add an integer and a string, which is not allowed in Python. The correct error message is 'TypeError: unsupported operand type(s) for +: 'int' and 'str''. Options B and C are plausible mistakes due to common off-by-one errors or confusion between types. Option D represents a syntax error, which is not the case here.

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

**Explanation:** The `int()` function truncates the decimal part of a float, so `int_from_float` will be 5. The correct answer is B.

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

**Explanation:** The code snippet converts an integer to a float using the `float()` function. The correct output is `5.0`. Choice A is incorrect because it does not include the decimal point. Choice C is incorrect because there is no error in the code; it simply performs type casting. Choice D is incorrect because there are no syntax errors.

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
age = 30
print(str(age) + ' years old')
```

**Choices:**
- **[A]** `30 years old`
- **[B]** `'30' years old` **(CORRECT)**
- **[C]** `TypeError: can only concatenate str (not "int") to str`
- **[D]** `SyntaxError: invalid syntax`

**Explanation:** The code attempts to concatenate a string and an integer. In Python, you cannot directly concatenate these types without explicit type casting. The correct answer is '30' years old because the int value of age is cast to a string using str(age) before concatenation.

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

**Explanation:** The code attempts to concatenate a string ('5') and an integer (3). In Python, the '+' operator is overloaded for strings to perform concatenation. Therefore, '5' + 3 results in '53'. The other options are incorrect because they either involve type errors or incorrect arithmetic operations.

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

**Explanation:** The code attempts to add an integer (5) and a string ('10'). In Python, you cannot directly add these types. The correct output is '510' because the '+' operator for strings concatenates them rather than performing arithmetic addition.

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
What will be the output of the following code snippet?
```python
x = True
y = False
print(x or y)
```

**Choices:**
- **[A]** `True` **(CORRECT)**
- **[B]** `False`
- **[C]** `1`
- **[D]** `0`

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

**Explanation:** The variable `x` is reassigned three times. Initially, it holds an integer value (42). Then, it is reassigned to a string ('Hello'). Finally, it is reassigned to a boolean value (False). The last assignment determines the final value of `x`, which is False. Therefore, the output will be 'False'.

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
- **[B]** `'l'` **(CORRECT)**
- **[C]** `'i'`
- **[D]** `'c'`

**Explanation:** The code snippet prints the character at index 2 of the string 'Alice'. In Python, indexing starts at 0. Therefore, name[2] refers to the third character in the string, which is 'l'.

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
my_string = "Hello, World!"
print(len(my_string))
```

**Choices:**
- **[A]** `12`
- **[B]** `13` **(CORRECT)**
- **[C]** `14`
- **[D]** `15`

**Explanation:** The `len()` function in Python returns the number of characters in a string. In this case, 'Hello, World!' has 13 characters including the comma and space.

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
- **[A]** `3 1`
- **[B]** `4 2` **(CORRECT)**
- **[C]** `5 0`
- **[D]** `6 -1`

**Explanation:** The floor division operator // divides the first operand by the second and rounds down to the nearest whole number. In this case, 10 // 3 equals 3. The modulus operator % returns the remainder of the division. Here, 10 % 3 equals 1.

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
result = x ** y + 1
print(result)
```

**Choices:**
- **[A]** `9`
- **[B]** `8` **(CORRECT)**
- **[C]** `7`
- **[D]** `6`

**Explanation:** The code calculates the exponentiation of x by y (2^3 = 8) and then adds 1, resulting in 9. The correct answer is A.

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
What is the output of the following code snippet?
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

**Explanation:** The code snippet uses the compound assignment operator `+=` to add 3 to the variable `x`. Initially, `x` is assigned the value 5. After executing `x += 3`, `x` becomes 8. The print statement then outputs the value of `x`, which is 8.

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
name = "Alice"
print(name * 3)
```

**Choices:**
- **[A]** `AliceAliceAlice` **(CORRECT)**
- **[B]** `Alice, Alice, Alice`
- **[C]** `Alice*3`
- **[D]** `Error: unsupported operand type(s) for *: 'str' and 'int'`

**Explanation:** The code snippet multiplies the string 'Alice' by 3, resulting in 'AliceAliceAlice'. The multiplication operator * is used to repeat a string a specified number of times.

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
- **[C]** `-1`
- **[D]** `2`

**Explanation:** The `int()` function converts boolean values to integers. `True` is converted to 1 and `False` is converted to 0. Therefore, `c = int(True) + int(False)` results in `c = 1 + 0`, which equals 1.

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
Which of the following code snippets correctly converts a string to an integer and then adds it to another integer?

**Choices:**
- **[A]** ````python
str_num = '5'
int_num = int(str_num)
total = int_num + 3
print(total) # Output: 8
```` **(CORRECT)**
- **[B]** ````python
str_num = '5'
int_num = float(str_num)
total = int_num + 3
print(total) # Output: 8.0
````
- **[C]** ````python
str_num = '5'
int_num = str(str_num)
total = int_num + 3
print(total) # Output: '53'
````
- **[D]** ````python
str_num = '5'
int_num = int(str_num)
total = int_num * 3
print(total) # Output: 15
````

**Explanation:** The correct answer converts the string '5' to an integer using int(str_num) and then adds it to another integer (3), resulting in a total of 8. The other options either perform incorrect type conversions or use operations that do not match the problem statement.

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
x = 5
y = 2
z = x + y * 3
print(z)
```

**Choices:**
- **[A]** `17`
- **[B]** `11` **(CORRECT)**
- **[C]** `9`
- **[D]** `8`

**Explanation:** The code snippet calculates the value of z using operator precedence. According to Python rules, multiplication is performed before addition. Therefore, y * 3 is calculated first (2 * 3 = 6), and then added to x (5 + 6 = 11). The correct output is 11.

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
age = 30
Age = 40
print(age)
```

**Choices:**
- **[A]** `30` **(CORRECT)**
- **[B]** `40`
- **[C]** `Error: NameError`
- **[D]** `Error: TypeError`

**Explanation:** In Python, variable names are case-sensitive. The code declares a variable 'age' and then attempts to print it. Since 'Age' is a different variable (case difference), the original value of 'age' remains unchanged and is printed as 30.

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
Which of the following Python code snippets correctly creates a list with elements 'apple', 42, and True, and then accesses the first element using zero-based indexing?

**Choices:**
- **[A]** ````python
my_list = ['apple', 42, True]
print(my_list[0])
```` **(CORRECT)**
- **[B]** ````python
my_list = ('apple', 42, True)
print(my_list[1])
````
- **[C]** ````python
my_list = ['apple', 42, True]
print(my_list[-1])
````
- **[D]** ````python
my_list = [42, 'apple', True]
print(my_list[0])
````

**Explanation:** The correct answer is A. It creates a list with the specified elements and accesses the first element using zero-based indexing correctly. Choice B uses a tuple instead of a list, which is incorrect for this task. Choice C attempts to access the last element using negative indexing, which is not relevant to the question. Choice D has the correct order of elements but incorrectly accesses the first element.

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
Which of the following Python code snippets correctly prints the last element of a list using negative indexing?

**Choices:**
- **[A]** ````python
my_list = [10, 'hello', 3.14, True]
print(my_list[-2])
````
- **[B]** ````python
my_list = [10, 'hello', 3.14, True]
print(my_list[-1])
```` **(CORRECT)**
- **[C]** ````python
my_list = [10, 'hello', 3.14, True]
print(my_list[0])
````
- **[D]** ````python
my_list = [10, 'hello', 3.14, True]
print(my_list[-5])
````

**Explanation:** The correct answer is B: ```python
my_list = [10, 'hello', 3.14, True]
print(my_list[-1])
``` This code snippet correctly prints the last element of the list using negative indexing (-1). The other options either print an incorrect element or raise an IndexError.

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
Which of the following code snippets correctly demonstrates reassigning an element in a list and verifying its mutability?

**Choices:**
- **[A]** ````python
my_list = [1, 2, 3]
my_list[0] = 4
print(my_list)
````
- **[B]** ````python
my_tuple = (1, 2, 3)
my_tuple[0] = 4
print(my_tuple)
````
- **[C]** ````python
my_list = [1, 2, 3]
my_list.append(4)
print(my_list)
```` **(CORRECT)**
- **[D]** ````python
my_dict = {1: 'a', 2: 'b'}
del my_dict[1]
print(my_dict)
````

**Explanation:** The correct answer demonstrates reassigning an element in a list, which is mutable. The other options involve operations on immutable data structures (tuple) or dictionary operations that do not demonstrate element reassignment.

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
Which of the following code snippets correctly slices a list to get elements from index 2 to 5 with a step of 2?

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
sliced_list = my_list[2:5:3]
print(sliced_list)
````
- **[D]** ````python
my_list = [1, 2, 3, 4, 5, 6]
sliced_list = my_list[2:7:2]
print(sliced_list)
````

**Explanation:** The correct answer is B. The slice `my_list[2:6:2]` correctly starts at index 2, ends before index 6 (exclusive), and takes every second element, resulting in `[3, 5]`. Choice A has an incorrect end index, C has an incorrect step size, and D has an incorrect end index.

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

**Explanation:** The code snippet slices the list `my_list` from the beginning up to but not including index 2. Therefore, it outputs `[10, 'hello']`. The other options are incorrect because they either include elements beyond index 1 or do not include all elements up to index 1.

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
- **[D]** `Choice D: reversed_list = my_list[0:-1]`

**Explanation:** The correct answer is Choice B: reversed_list = my_list[::-1]. This uses Python's slicing syntax to create a new list that is the reverse of my_list. The slice [::-1] means start at the end of the list and end at position 0, move with the step -1 (which means one step backwards). Choices A, C, and D are incorrect because they do not correctly reverse the list.

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
Which of the following code snippets correctly appends an element to a list?

**Choices:**
- **[A]** ````python
my_list = [1, 2, 3]
my_list.append(4)
print(my_list) # Output: [1, 2, 3, 4]
```` **(CORRECT)**
- **[B]** ````python
my_list = [1, 2, 3]
my_list.insert(4, 4)
print(my_list) # Output: [1, 2, 3, 4]
````
- **[C]** ````python
my_list = [1, 2, 3]
my_list.remove(4)
print(my_list) # Output: [1, 2, 3]
````
- **[D]** ````python
my_list = [1, 2, 3]
my_list.extend([4])
print(my_list) # Output: [1, 2, 3, 4]
````

**Explanation:** The correct answer is A. The `append()` method adds an item to the end of the list, so `[1, 2, 3]` becomes `[1, 2, 3, 4]`. Option B uses `insert(4, 4)`, which inserts the element at index 4, resulting in `[1, 2, 3, None, 4]`. Option C attempts to remove an item that does not exist, so the list remains unchanged. Option D uses `extend([4])`, which adds each element of the iterable to the end of the list, resulting in `[1, 2, 3, 4]`.

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
# insert code here
print(my_list)
```

**Choices:**
- **[A]** `my_list.insert(2, 'world')` **(CORRECT)**
- **[B]** `my_list.append('world', 2)`
- **[C]** `my_list[2] = 'world'`
- **[D]** `my_list.insert(1, 'world')`

**Explanation:** The correct answer is A: my_list.insert(2, 'world'). The insert() method inserts an item at a specified position. In this case, we want to insert 'world' at index 2.

Choice B is incorrect because append() adds an item to the end of the list and takes only one argument, not two.

Choice C is incorrect because it attempts to assign a value directly to an index in the list, which will result in an IndexError if the index is out of range. In this case, my_list does not have an index 2 yet, so this would raise an error.

Choice D is incorrect because it inserts 'world' at index 1, not index 2.

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
# Code here
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

**Explanation:** The correct choice is B. The `pop(3)` method removes the element at index 3, which is the fourth element in the list (since Python uses zero-indexing). The other choices either use the wrong method (`remove` instead of `pop`) or remove a different element.

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
nested_length = len(my_list)
print(nested_length)
```

**Choices:**
- **[A]** `3` **(CORRECT)**
- **[B]** `6`
- **[C]** `2`
- **[D]** `1`

**Explanation:** The `len()` function returns the number of elements in a list. In this case, `my_list` contains three sublists, so `len(my_list)` returns 3.

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
What is the output of the following code snippet?
```python
list1 = [1, 2, 3]
list2 = [4, 5]
result = list1 + list2
print(result)
```

**Choices:**
- **[A]** `[1, 2, 3, 4, 5]` **(CORRECT)**
- **[B]** `[1, 2, 3, 4]`
- **[C]** `[4, 5, 1, 2, 3]`
- **[D]** `[1, 2, 3, 5]`

**Explanation:** The '+' operator is used for list concatenation in Python. It combines the elements of two lists into a new list. Therefore, `list1 + list2` results in `[1, 2, 3, 4, 5]`. The other options are incorrect because they either miss or include extra elements.

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
Which of the following code snippets correctly checks if the number 4 is a member of the list `my_list` using the 'in' operator?

**Choices:**
- **[A]** ````python
my_list = [1, 2, 3]
if my_list in 4:
    print('Found')
else:
    print('Not Found')
````
- **[B]** ````python
my_list = [1, 2, 3]
if 4 in my_list:
    print('Found')
else:
    print('Not Found')
```` **(CORRECT)**
- **[C]** ````python
my_list = [1, 2, 3]
if 4 not in my_list:
    print('Found')
else:
    print('Not Found')
````
- **[D]** ````python
my_list = [1, 2, 3]
if 4 == my_list:
    print('Found')
else:
    print('Not Found')
````

**Explanation:** The 'in' operator in Python checks if a value is present in a sequence (like a list). The correct code snippet uses `4 in my_list` to check if the number 4 is an element of the list. Choice A incorrectly uses `my_list in 4`, which will always be False because it checks if the entire list is equal to the integer 4. Choice C incorrectly uses `4 not in my_list`, which would print 'Not Found' even though 4 is in the list. Choice D incorrectly uses `4 == my_list`, which compares the value of 4 with the entire list, resulting in False.

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
Which of the following Python code snippets correctly creates a tuple with two elements?

**Choices:**
- **[A]** ````python
my_tuple = (10, 20)
```` **(CORRECT)**
- **[B]** ````python
my_tuple = [10, 20]
````
- **[C]** ````python
my_tuple = (10)  # Missing comma
````
- **[D]** ````python
my_tuple = (10, 20,)
```` **(CORRECT)**

**Explanation:** The correct answer is `my_tuple = (10, 20,)`. In Python, a tuple with more than one element must include a trailing comma to distinguish it from a parenthesized expression. The other options are incorrect because they either use square brackets (which create lists), lack the required trailing comma, or do not use parentheses at all.

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
What will be the output of the following code snippet?
```python
my_tuple = (1, 'hello', 3.14)
my_tuple[0] = 2
```

**Choices:**
- **[A]** `TypeError: 'tuple' object does not support item assignment` **(CORRECT)**
- **[B]** `(2, 'hello', 3.14)`
- **[C]** `(1, 'hello', 3.14)`
- **[D]** `(1, 'world', 3.14)`

**Explanation:** The code attempts to modify an element of a tuple, which is not allowed because tuples are immutable in Python. This will raise a TypeError.

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
- **[A]** `A. 4`
- **[B]** `B. 5` **(CORRECT)**
- **[C]** `C. 6`
- **[D]** `D. 7`

**Explanation:** The `len()` function in Python returns the number of items in an object. For a tuple, it counts all elements including those at both ends. Therefore, the length of `(10, 20, 30, 40, 50)` is 5.

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
Which of the following code snippets correctly creates a set from a list while removing duplicates?

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
my_set = set(my_list)
print(my_set)  # Output: {4, 2, 3, 1}
````

**Explanation:** The correct answer is A. The `set()` function in Python automatically removes duplicate values from a list when creating a set, and it does not maintain any order of elements. Option B attempts to convert the set back to a list, which is unnecessary and does not change the output. Option C prints the original list instead of the set. Option D shows an incorrect output due to the unordered nature of sets.

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
Which of the following Python code snippets correctly demonstrates how to find the intersection of two sets?

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
set2 = {4, 5, 6}
difference = set1 - set2
print(difference)
````

**Explanation:** The correct answer demonstrates the use of the '&' operator to find the intersection of two sets. The other options either use incorrect data types (list, dictionary) or perform a different operation (difference).

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
Which of the following Python code snippets correctly creates a dictionary with three key-value pairs?

**Choices:**
- **[A]** ````python
dict = {'name': 'Alice', 'age': 20, 'major': 'Computer Science'}
```` **(CORRECT)**
- **[B]** ````python
student = ('name': 'Alice', 'age': 20, 'major': 'Computer Science')
````
- **[C]** ````python
student = {'name': 'Alice', age: 20, major: 'Computer Science'}
````
- **[D]** ````python
student = {name='Alice', age=20, major='Computer Science'}
````

**Explanation:** The correct answer is A. It uses curly braces `{}` to create a dictionary with three key-value pairs, where each key is unique and maps to a specific value. Option B uses parentheses `()` instead of curly braces, which creates a tuple not a dictionary. Option C incorrectly uses colons `:` instead of commas `,` in the dictionary syntax. Option D uses equal signs `=` instead of colons `:` for key-value pairs.

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

**Explanation:** The correct choice is 'Computer Science'. The code accesses the value associated with the key 'major' in the dictionary `student`. Distractors include incorrect keys ('name', 'age'), and a NameError which would occur if trying to access an undefined variable.

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
- **[D]** `TypeError: unhashable type: 'list'`

**Explanation:** The code snippet modifies the existing dictionary by changing the value associated with the key 'age' from 20 to 21. It also adds a new key-value pair ('gender': 'Female') to the dictionary. The output will be {'name': 'Alice', 'age': 21, 'major': 'Computer Science', 'gender': 'Female'}.

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
- **[D]** `20 None`

**Explanation:** The `get()` method is used to retrieve the value for a specified key in a dictionary. If the key does not exist, it returns `None` by default unless a second argument (default value) is provided. In this case, 'email' and 'phone' keys do not exist in the `student` dictionary, so the first print statement outputs `None`. The second print statement provides a default value of 'N/A', so it outputs 'N/A'.

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
Which of the following code snippets correctly prints all keys in a dictionary named `student`?

**Choices:**
- **[A]** ````python
for key in student:
    print(key)
````
- **[B]** ````python
for key in student.keys():
    print(key)
```` **(CORRECT)**
- **[C]** ````python
for value in student.values():
    print(value)
````
- **[D]** ````python
print(student.keys())
````

**Explanation:** The correct choice uses the `keys()` method to iterate over all keys in the dictionary. The other options either attempt to print values or use a non-existent method, which would result in errors.

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
- **[C]** `{'name': 'Alice', 'age': 21, 'major': 'Computer Science'}`
- **[D]** `{'name': 'Bob', 'major': 'Computer Science'}`

**Explanation:** The correct answer is A. The `del` statement removes the key-value pair with the key 'age' from the dictionary, resulting in {'name': 'Alice', 'major': 'Computer Science'}. Choice B is incorrect because it does not reflect any changes to the dictionary. Choice C is incorrect because it attempts to modify an element that no longer exists in the dictionary. Choice D is completely unrelated and does not follow the code provided.

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
Which of the following Python code snippets correctly accesses the value 'world' from a nested dictionary?

**Choices:**
- **[A]** ````python
dict = {'hello': {'world': 'Python'}}
print(dict['hello']['world'])
```` **(CORRECT)**
- **[B]** ````python
dict = {'hello': ['world', 'Python']}
print(dict['hello'][1])
````
- **[C]** ````python
dict = {'hello': {'world': 'Python'}}
print(dict['hello'][0])
````
- **[D]** ````python
dict = {'hello': ['Python']}
print(dict['hello']['world'])
````

**Explanation:** The correct answer accesses the nested dictionary correctly by first accessing the inner dictionary with the key 'hello' and then accessing the value associated with the key 'world'. The other options either attempt to access elements in a list or use incorrect keys.

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

**Explanation:** The code snippet correctly compares the values of x and y. Since 5 is less than 10, the condition `x < y` evaluates to True, and the first print statement executes. The else block is not executed because the if condition is met.

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
    if x > 3:
        print('Both conditions met')
else:
    print('Outer condition not met')
```
What will be the output of this code?

**Choices:**
- **[A]** `Both conditions met` **(CORRECT)**
- **[B]** `Outer condition not met`
- **[C]** `SyntaxError`
- **[D]** `TypeError`

**Explanation:** The code snippet first checks if x < y, which is True. Then it checks the inner condition if x > 3, which is also True. Since both conditions are met, 'Both conditions met' will be printed.

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
x = 5
if x > 3:
    print('1')
elif x == 4:
    print('2')
else:
    print('3')
```` **(CORRECT)**
- **[B]** ````python
x = 5
if x > 4:
    print('1')
elif x == 4:
    print('2')
else:
    print('3')
````
- **[C]** ````python
x = 5
if x > 3:
    print('1')
elif x == 5:
    print('2')
else:
    print('3')
````
- **[D]** ````python
x = 5
if x > 4:
    print('1')
elif x < 5:
    print('2')
else:
    print('3')
````

**Explanation:** The correct answer is A. The code checks the conditions sequentially. Since x = 5, the first condition `x > 3` is True, but it does not execute the print statement because there is an `elif` clause that follows. The second condition `x == 4` is False, so it moves to the next `elif` clause. The third condition `x == 5` is True, and it prints '2'. The other options have errors in their conditions or logic.

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
Which of the following code snippets correctly uses a conditional statement to check if a number is even?

**Choices:**
- **[A]** ````python
number = 5
if number == 0:
    print('Even')
else:
    print('Odd')````
- **[B]** ````python
number = 6
if number % 2 == 0:
    print('Even')
else:
    print('Odd')```` **(CORRECT)**
- **[C]** ````python
number = 7
if number != 0:
    print('Even')
else:
    print('Odd')````
- **[D]** ````python
number = 8
if number == 2:
    print('Even')
else:
    print('Odd')````

**Explanation:** The correct choice uses the modulo operator `%` to check if a number is even. The expression `number % 2 == 0` evaluates to True if the remainder when `number` is divided by 2 is zero, indicating that the number is even.

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
- **[D]** `Syntax Error`

**Explanation:** The code snippet checks if x is not equal to y. Since 5 is indeed not equal to 10, the condition is True and 'x is not equal to y' will be printed.

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
print(x and y) # Output: True``
- **[B]** ````python
x = True
y = True
print(x and y) # Output: True`` **(CORRECT)**
- **[C]** ````python
x = False
y = False
print(x and y) # Output: False``
- **[D]** ````python
x = 5
y = 10
print(x and y) # Output: 5``

**Explanation:** The correct answer is B. The 'and' operator returns True only if both conditions are True. In this case, x and y are both True, so the output will be True. Option A is incorrect because it sets y to False, making the result False. Option C is incorrect because both x and y are False, making the result False. Option D is incorrect because 'and' does not work with integers in this way; it returns the first False value or the last value if all are True.

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
print(x or y) # Output: 5``
- **[D]** ````python
x = 'hello'
y = 'world'
print(x or y) # Output: hello``

**Explanation:** The correct answer is B. The 'or' operator returns True if at least one of the conditions is True. In this case, x is True and y is False, so the output should be True. Choice A is incorrect because both conditions are False, so the output would be False. Choice C is incorrect because it uses numerical values instead of boolean expressions. Choice D is incorrect because it uses string concatenation instead of a logical 'or' operation.

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

**Explanation:** The `not` operator negates the boolean value of `x`, making it False. The `or` operator then checks if at least one condition is True, which is true because `y` is True. Therefore, the output is True.

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
print(x and y)
```

**Choices:**
- **[A]** `True`
- **[B]** `False` **(CORRECT)**
- **[C]** `SyntaxError`
- **[D]** `TypeError`

**Explanation:** The 'and' operator in Python performs a logical AND operation. It returns True if both operands are True, otherwise it returns False. In this case, x is True and y is False, so the expression evaluates to False.

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
x = []
print(bool(x))
````
- **[B]** ````python
y = ''
print(y == '')
```` **(CORRECT)**
- **[C]** ````python
d = {}
print(d is None)
````
- **[D]** ````python
z = 0
print(z != 0)
````

**Explanation:** The correct choice is B. The empty string '' evaluates to False in Python, so the comparison y == '' returns True. Choice A and C are incorrect because they evaluate to True (an empty list and an empty dictionary are considered truthy). Choice D is incorrect because 0 evaluates to False.

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
- **[C]** `SyntaxError`
- **[D]** `RuntimeError`

**Explanation:** The code snippet compares the values of x and y using the less than operator. Since 5 is indeed less than 10, the condition `x < y` evaluates to True. Therefore, the first branch of the if-else statement is executed, printing 'x is less than y'. The other options are incorrect because there are no syntax or runtime errors in the code.

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
    print('Outer condition is false')
```

**Choices:**
- **[A]** `Both conditions are true`
- **[B]** `Outer condition is false` **(CORRECT)**
- **[C]** `Inner condition is false`
- **[D]** `Syntax error`

**Explanation:** The outer if statement checks if x < y, which is true (5 < 10). The inner if statement checks if y > 7, which is also true (10 > 7). Therefore, the code inside both conditions will execute, printing 'Both conditions are true'.

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
Consider the following Python code snippet:
```python
x = 15
if 10 < x < 20:
    print('x is between 10 and 20')
else:
    print('x is not between 10 and 20')
```

**Choices:**
- **[A]** `Choice A: 'x is between 10 and 20'`
- **[B]** `Choice B: 'x is not between 10 and 20'` **(CORRECT)**
- **[C]** `Choice C: 'SyntaxError'`
- **[D]** `Choice D: 'RuntimeError'`

**Explanation:** The code snippet uses chained comparison operators to check if x is between 10 and 20. Since x = 15, the condition 10 < x < 20 evaluates to True, so 'x is between 10 and 20' is printed. Choice A is incorrect because it does not match the output. Choice C is incorrect because there are no syntax errors in the code. Choice D is incorrect because there are no runtime errors.

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

**Explanation:** The ternary operator checks if `age >= 18`. Since `20` is greater than or equal to `18`, the condition is True, and 'Adult' is assigned to `status`. The code then prints 'Adult'. Choice A is incorrect because it suggests 'Minor', which is not the output. Choice C and D are incorrect as there are no errors in the syntax.

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
- **[D]** `TypeError: '<' not supported between instances of 'int' and 'str'`

**Explanation:** The code snippet compares the values of x and y using the less than operator (<). Since 5 is indeed less than 10, the condition `x < y` evaluates to True. Therefore, the code inside the if block will execute, printing 'x is less than y'. The other choices are incorrect because they either represent a different output or an error that would occur in this context.

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

**Explanation:** Explanation: The for loop iterates over each number in the list [1, 2, 3, 4] and adds it to the variable total. After the loop completes, the final value of total is printed, which is 10.

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
Which of the following code snippets will correctly print each character of the string 'hello' on a new line using a for loop?

**Choices:**
- **[A]** ````python
for i in range(5):
    print('hello'[i])
````
- **[B]** ````python
word = 'hello'
for char in word:
    print(char)
```` **(CORRECT)**
- **[C]** ````python
word = 'hello'
for i in range(6):
    print(word[i])
````
- **[D]** ````python
word = 'hello'
for i in range(len(word)):
    print(word[i+1])
````

**Explanation:** The correct answer is B. The for loop iterates over each character in the string 'hello' and prints it on a new line. Choice A uses range(5) which will only iterate 5 times, but does not correctly access each character of the string. Choice C attempts to access an index that is out of bounds (word[5] does not exist). Choice D tries to print all characters except the first one by using i+1, which also results in an out-of-bounds error.

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
- **[C]** `0 2 4 6 8`
- **[D]** `-1 0 1 2 3`

**Explanation:** The `range(5)` function generates numbers starting from 0 up to (but not including) 5. Therefore, the output will be '0 1 2 3 4'. Choice B is incorrect because it starts from 1 instead of 0. Choice C is incorrect because it uses a step of 2 and starts from 0, which does not match the range function used here. Choice D is incorrect because it uses negative numbers.

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
What will be printed when the following code is executed?
```python
for i in range(3, 8):
    print(i)
```

**Choices:**
- **[A]** `1 2 3 4 5 6 7`
- **[B]** `3 4 5 6 7` **(CORRECT)**
- **[C]** `0 1 2 3 4 5 6`
- **[D]** `2 3 4 5 6 7 8`

**Explanation:** The range function starts from the 'start' value (inclusive) and goes up to but does not include the 'stop' value. Therefore, for i in range(3, 8), it will print numbers starting from 3 up to but not including 8.

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
What is the output of the following Python code snippet?
```python
for i in range(1, 5, 2):
    print(i)
```

**Choices:**
- **[A]** `1 3` **(CORRECT)**
- **[B]** `0 2 4`
- **[C]** `1 2 3 4`
- **[D]** `2 4`

**Explanation:** The range function generates numbers starting from the 'start' value (1) up to but not including the 'stop' value (5), incrementing by the 'step' value (2). Therefore, it prints 1 and then skips 3, printing only 1.

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

**Explanation:** The range function starts at 10 and decrements by 2 each iteration until it reaches -1 (exclusive). The correct sequence is 8, 6, 4, 2, 0.

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
Consider the following Python code snippet:
```python
i = 0
while i < 5:
    print(i)
    i += 1
```
What will be the output of this code?

**Choices:**
- **[A]** `0 1 2 3 4` **(CORRECT)**
- **[B]** `0 1 2 3 5`
- **[C]** `-1 0 1 2 3`
- **[D]** `1 2 3 4 5`

**Explanation:** The correct answer is '0 1 2 3 4'. The loop starts with i = 0 and increments i by 1 in each iteration. It continues as long as i is less than 5, printing the current value of i each time. The distractors are incorrect because they either include an extra number (Choice B), start from a negative number (Choice C), or print numbers starting from 1 (Choice D).

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
# Count down from 5 to 1 with a while loop
count = 5
while count > 0:
    print(count)
    # Missing line of code
```
Which line should be added after `print(count)` to ensure the loop terminates correctly?


**Choices:**
- **[A]** `count += 1` **(CORRECT)**
- **[B]** `count -= 1`
- **[C]** `count = count + 2`
- **[D]** `count *= 0.5`

**Explanation:** The correct choice is `count += 1` because it updates the loop counter variable, ensuring that the condition `count > 0` will eventually become false and the loop will terminate. The other choices either do not update the counter (B), increase it too much (C), or modify it in a way that does not help the loop terminate (D).

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
Which of the following code snippets will terminate the loop immediately when `x` equals 3?

**Choices:**
- **[A]** ````python
for x in range(5):
    if x == 3:
        continue
````
- **[B]** ````python
while True:
    x = int(input('Enter a number: '))
    if x == 3:
        break
```` **(CORRECT)**
- **[C]** ````python
for x in range(5):
    if x == 3:
        print('Found 3')
````
- **[D]** ````python
x = 0
while x < 5:
    x += 1
    if x == 3:
        pass
````

**Explanation:** The correct answer is B. The `break` statement in the while loop will terminate the entire loop immediately when `x` equals 3. In contrast, options A and C use `continue`, which skips the current iteration but does not exit the loop. Option D uses a `pass` statement, which does nothing and continues to the next iteration.

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
    if num % 2 != 0:
        continue
    print(num)
```` **(CORRECT)**
- **[C]** ````python
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        break
    print(num)
````
- **[D]** ````python
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 != 0:
        print(num)
````

**Explanation:** The correct choice uses the `continue` statement to skip printing even numbers. The code checks if a number is even (`num % 2 == 0`). If it is, the `continue` statement skips the rest of the current iteration and moves on to the next number. This results in only odd numbers being printed. Choice A incorrectly prints even numbers because it does not use `continue`. Choice C uses `break`, which exits the loop entirely when an even number is found, rather than skipping the print statement for that number. Choice D correctly prints odd numbers but does not use `continue` to skip printing even numbers.

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
# code here
```

**Choices:**
- **[A]** ````python
sum = 0
for i in range(6):
    sum += i
print(sum)
````
- **[B]** ````python
sum = 0
for i in range(1, 6):
    sum += i
print(sum)
```` **(CORRECT)**
- **[C]** ````python
sum = 0
for i in range(5):
    sum += i + 1
print(sum)
````
- **[D]** ````python
sum = 0
i = 1
while i <= 5:
    sum += i
    i += 1
print(sum)
````

**Explanation:** The correct answer is B. The range function in Python starts from the first argument and goes up to, but does not include, the second argument. Therefore, range(1, 6) generates numbers from 1 to 5. Choice A has an off-by-one error because it includes 0 in the sum. Choice C also has an off-by-one error by starting the loop at 0 and adding 1 to each iteration. Choice D uses a while loop instead of a for loop, which is not required for this problem.

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
    squares.append(num ** 2)
print(squares)
```

**Choices:**
- **[A]** `[1, 4, 9]` **(CORRECT)**
- **[B]** `[0, 1, 4]`
- **[C]** `[1, 3, 5]`
- **[D]** `[2, 4, 6]`

**Explanation:** The code iterates over the list `numbers` and appends the square of each number to the list `squares`. The correct output is `[1, 4, 9]`. Option B is incorrect because it squares the indices instead of the numbers. Options C and D are completely wrong as they do not represent the squares of the original numbers.

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

**Explanation:** The code iterates over the keys of the dictionary `my_dict` and prints each key. The correct output is 'a b c'. Choice B is incorrect because it prints the values instead of keys. Choice C is incorrect because it attempts to print the entire dictionary, not its keys. Choice D is incorrect because there are no issues with iterating over dictionary keys.

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
for index, fruit in enumerate(fruits):
    print(index, fruit)
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

**Explanation:** The `enumerate()` function adds a counter to an iterable and returns it in a form of enumerate object. In this case, it starts counting from 0 by default. Therefore, the output will be '0 apple', '1 banana', and '2 cherry'. Choice B is incorrect because it reverses the order of index and fruit name. Choice C is incorrect because it only prints the fruit names without their indices. Choice D is incorrect because there are no syntax errors in the code.

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

**Explanation:** The correct code snippet initializes `max_value` to `None` and updates it whenever a larger number is found in the list. This ensures that by the end of the loop, `max_value` holds the maximum value in the list. The distractors involve common mistakes such as initializing `max_value` to an incorrect initial value or not updating `max_value` correctly.

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
word = 'banana'
count = 0
for char in word:
    if char == 'a':
        count += 1
print(count)
```

**Choices:**
- **[A]** `Choice A text`
- **[B]** `Choice B text` **(CORRECT)**
- **[C]** `Choice C text`
- **[D]** `Choice D text`

**Explanation:** The correct choice is B. The code iterates over each character in the string 'banana' and increments the count variable every time it encounters the letter 'a'. After the loop, it prints the final count, which should be 3. Choice A has a syntax error (missing colon at the end of the if statement). Choice C attempts to use a while loop instead of a for loop, which is not necessary in this case since we know the length of the string. Choice D incorrectly increments the count when encountering any vowel, not just 'a'.

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
Given the following code snippet, which of the following is the correct output?
```python
numbers = [1, 2, 3, 4, 5]
even_numbers = []
for number in numbers:
    if number % 2 == 0:
        even_numbers.append(number)
print(even_numbers)
```

**Choices:**
- **[A]** `[1, 2, 3, 4]`
- **[B]** `[2, 4]` **(CORRECT)**
- **[C]** `[1, 3, 5]`
- **[D]** `[0, 2, 4]`

**Explanation:** The code iterates over the list `numbers` and checks if each number is even. If it is, the number is appended to the `even_numbers` list. The final output should be `[2, 4]`, which are the even numbers in the original list.

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
- **[A]** `The loop will run indefinitely until the program is manually stopped.`
- **[B]** `The loop will print 'Loop ended' and then terminate when the user enters 'quit'.` **(CORRECT)**
- **[C]** `The loop will print 'Loop ended' and then terminate when the user enters 'stop'.`
- **[D]** `The loop will raise an error because 'break' is used outside a loop.`

**Explanation:** Explanation: The code uses a while loop to continuously prompt the user for input until they enter 'quit'. Inside the loop, there is an if statement that checks if the user enters 'stop'. If 'stop' is entered, the break statement is executed, which terminates the loop. Therefore, the correct output is 'Loop ended'. The other options are incorrect because they either misinterpret the behavior of the code or introduce non-existent errors.

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
- **[A]** `The code will output 0`
- **[B]** `The code will output 5` **(CORRECT)**
- **[C]** `The code will output 4`
- **[D]** `The code will output an error`

**Explanation:** Explanation: The loop iterates over the list `numbers`. When it encounters an even number (2 and 4), the `continue` statement is executed, skipping the rest of the current iteration. Therefore, the count variable is only incremented for odd numbers (1 and 3). Since there are two odd numbers in the list, the final value of `count` will be 2. However, due to a mistake in the code snippet provided, it seems the intention was to increment `count` for each number processed, leading to an output of 5.

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
if not found:
    print('Number not found')
else:
    print('Number found')
```

**Choices:**
- **[A]** `The output will be 'Number not found'`
- **[B]** `The output will be 'Number found'` **(CORRECT)**
- **[C]** `The code will enter an infinite loop`
- **[D]** `The code will raise a TypeError`

**Explanation:** Explanation: The for loop iterates over the list 'numbers'. When it encounters the number 3, it sets the variable 'found' to True. After the loop, since 'found' is True, the code prints 'Number found'. Choice A is incorrect because the number 3 is found in the list. Choice C is incorrect because there is no condition that would cause an infinite loop. Choice D is incorrect because there are no type errors in the code.

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

main()
```

**Choices:**
- **[A]** `Hello, Alice!` **(CORRECT)**
- **[B]** `Hello, Bob!`
- **[C]** `NameError: name 'name' is not defined`
- **[D]** `TypeError: greet() takes 0 positional arguments but 1 was given`

**Explanation:** The function `greet` is defined to take one parameter, `name`. In the `main` function, we call `greet('Alice')`, which correctly passes 'Alice' as an argument. The function returns the string 'Hello, Alice!', which is then printed by the `print` statement in `main()`. Choice B is incorrect because it assumes a different name was passed. Choice C is incorrect because there are no issues with variable scope or undefined names. Choice D is incorrect because the function correctly accepts one argument.

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
What is the output of the following Python code snippet?
```python
def greet(name):
    return 'Hello, ' + name

result = greet('Alice')
print(result)
```

**Choices:**
- **[A]** `Hello, Alice` **(CORRECT)**
- **[B]** `Hello, Bob`
- **[C]** `Good morning, Alice`
- **[D]** `Alice`

**Explanation:** The function `greet` is called with the argument 'Alice'. The function concatenates 'Hello, ' with the name provided and returns the result. Therefore, the output is 'Hello, Alice'.

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
    return a * b + 1
result = multiply(3, 4)
print(result)
```

**Choices:**
- **[A]** `12`
- **[B]** `13` **(CORRECT)**
- **[C]** `15`
- **[D]** `16`

**Explanation:** The function `multiply(a, b)` is defined to return the product of `a` and `b`, plus one. When called with `multiply(3, 4)`, it computes `3 * 4 + 1 = 12 + 1 = 13`. Therefore, the output is 13.

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
What is the output of the following code snippet?
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

**Explanation:** The function `greet` is defined to return a string that includes the name passed as an argument. When calling `print(greet('Alice'))`, the function returns 'Hello, Alice!', which is then printed. Choice A is correct because it matches the expected output. Choice B is incorrect because it omits the name in the greeting. Choice C is incorrect because the function does not return None; instead, it returns a string. Choice D is incorrect because there are no missing arguments when calling the function.

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
- **[C]** `SyntaxError`
- **[D]** `TypeError`

**Explanation:** The function `greet` does not have an explicit return statement. In Python, if no return statement is provided, the function implicitly returns None. Therefore, `result` will be None.

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

**Explanation:** The correct function returns a tuple containing two values, `x` and `y`. Choice B is incorrect because it returns a single value in parentheses, which is not a tuple. Choice C is incorrect because it returns a list instead of a tuple. Choice D is incorrect because it returns the sum of `x` and `y`, not a tuple.

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
def add_item(item, items=[]):\n    items.append(item)\n    return items```
This will work correctly and avoid any issues.`
- **[B]** ````python
def greet(name='World', message='Hello'):\n    print(f'{message}, {name}!')```
This is the correct way to define a function with default parameters.` **(CORRECT)**
- **[C]** ````python
def calculate_total(quantity, price=4.44):\n    return quantity * price\ncalculate_total(6)  # Output: $26.64```
This will not work correctly because the default value is calculated at function definition time.`
- **[D]** ````python
def add_to_list(item, my_list=None):\n    if my_list is None:\n        my_list = []\n    my_list.append(item)\n    return my_list```
This is the correct way to define a function with default parameters and avoid issues related to mutable defaults.`

**Explanation:** The correct answer defines a function with default parameters using the recommended approach. The distractors include common mistakes related to mutable default arguments and incorrect usage of default values.

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
# Define a function that takes two parameters
def greet(name, age):
    print(f'Hello, {name}. You are {age} years old.')

# Call the function using keyword arguments
```

**Choices:**
- **[A]** `greet('Alice', 30)`
- **[B]** `greet(name='Alice', age=30)` **(CORRECT)**
- **[C]** `greet(age=30, 'Alice')`
- **[D]** `greet(30, name='Alice')`

**Explanation:** The correct way to call a function with keyword arguments is by specifying the parameter names followed by their values. This allows for clearer and more readable code, especially when dealing with functions that have many parameters. The other options either miss the parameter names (A and C) or incorrectly place the argument values (B and D).

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
- **[A]** `10 5` **(CORRECT)**
- **[B]** `5 10`
- **[C]** `10 10`
- **[D]** `5 5`

**Explanation:** The function `my_function` has a local variable `x` which shadows the global variable `x`. When `my_function` is called, it prints its local `x`, which is 10. After the function call, the global `x` remains unchanged and is printed as 5.

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
- **[C]** `5.0`
- **[D]** `2.5`

**Explanation:** The function `calculate_average` correctly calculates the average of the numbers in the list [1, 2, 3, 4, 5], which is 3.0.

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
    return x

result = my_function()
print(result)
```
What will be printed to the console?

**Choices:**
- **[A]** `5`
- **[B]** `10` **(CORRECT)**
- **[C]** `None`
- **[D]** `Error`

**Explanation:** The function `my_function` defines a local variable `x` with the value 10. When `result = my_function()` is executed, it calls the function and returns the local `x`, which is 10. The global `x` remains unchanged at 5.

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
Which of the following code snippets correctly demonstrates how to pass a mutable object like a list to a function without causing side effects?

**Choices:**
- **[A]** ````python
def modify_list(items=[]):
    items.append(1)

my_list = [2, 3]
modify_list(my_list)
print(my_list) # Output: [2, 3, 1]`
- **[B]** ````python
def modify_list(items=None):
    if items is None:
        items = []
    items.append(1)

my_list = [2, 3]
modify_list(my_list)
print(my_list) # Output: [2, 3, 1]` **(CORRECT)**
- **[C]** ````python
def modify_list(items=[]):
    items.append(1)

my_list = [2, 3]
modify_list()
print(my_list) # Output: [2, 3, 1]`
- **[D]** ````python
def modify_list(items=None):
    if items is None:
        items = []
    return items.append(1)

my_list = [2, 3]
modify_list(my_list)
print(my_list) # Output: [2, 3, 1]`

**Explanation:** The correct answer uses `items=None` and initializes the list inside the function if it is not provided. This avoids the common pitfall of using mutable default arguments in Python, which can lead to unintended side effects when the function is called multiple times.

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
Consider the following Python function that calculates the square of a number. ```python
def square(number):
    return number ** 2
``` What will be the output if we call this function with `square(5)`?

**Choices:**
- **[A]** `10`
- **[B]** `25` **(CORRECT)**
- **[C]** `30`
- **[D]** `40`

**Explanation:** The function `square` takes an integer as input and returns its square. When called with `square(5)`, the function calculates 5 ** 2, which equals 25.

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
Consider the following Python code snippet:
```python
def greet(name):
    return f'Hello, {name}!'
def introduce(greeting):
    print(greet('Alice'))
introduce()
``` What will be the output of this code?


**Choices:**
- **[A]** `Hello, Alice!` **(CORRECT)**
- **[B]** `Hello, Bob!`
- **[C]** `NameError: name 'name' is not defined`
- **[D]** `TypeError: greet() missing 1 required positional argument: 'name'`

**Explanation:** The `introduce()` function calls the `greet('Alice')` function, which returns the string 'Hello, Alice!'. The `print()` statement in `introduce()` then outputs this string. Choice B is incorrect because it assumes a different name is passed to `greet()`. Choice C is incorrect because there are no undefined names in the code. Choice D is incorrect because `greet()` is called with an argument, so it does not raise a TypeError.

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
What is the output of the following code snippet?
```python
def calculate_average(numbers):
    return sum(numbers) / len(numbers)

data = [1, 2, 3, 4, 5]
avg = calculate_average(data)
print(avg)
```

**Choices:**
- **[A]** `5.0`
- **[B]** `3.0` **(CORRECT)**
- **[C]** `2.5`
- **[D]** `1.0`

**Explanation:** The function `calculate_average` calculates the average of a list of numbers by summing them up and dividing by the count. The input list is [1, 2, 3, 4, 5], so the sum is 15 and the length is 5. Therefore, the average is 15 / 5 = 3.0.

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

**Explanation:** The `factorial` function is a recursive function that calculates the factorial of a number. The base case is when `n == 0`, in which case it returns 1. For other values, it recursively calls itself with `n - 1`. When `print(factorial(3))` is executed, the function will call itself as follows: `factorial(3) = 3 * factorial(2) = 3 * (2 * factorial(1)) = 3 * (2 * (1 * factorial(0))) = 3 * (2 * 1) = 6`. Therefore, the output is 6.

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
What is the output when calling `factorial(3)`?


**Choices:**
- **[A]** `6` **(CORRECT)**
- **[B]** `5`
- **[C]** `4`
- **[D]** `3`

**Explanation:** The function `factorial(3)` calls itself with `n=2`, then `n=1`, and finally `n=0`. When `n=0`, it returns 1. The recursive calls return `2 * 1` and `1 * 1`, resulting in a final output of 6.

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
square = lambda x: x * 2
````
- **[D]** ````python
square = lambda x: x + x
````

**Explanation:** The correct choice is `lambda x: x ** 2` because it correctly applies the exponentiation operator to calculate the square of a number. The other choices either add an extra value (A), double the number instead of squaring it (C), or simply add the number to itself (D), which are incorrect.

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
squared_numbers = map(lambda: x * x, numbers)
print(list(squared_numbers))
````
- **[D]** ````python
numbers = [1, 2, 3]
squared_numbers = map(lambda x: x ** 2, numbers)
print(list(squared_numbers))
````

**Explanation:** The correct answer uses a lambda function `lambda x: x * x` to square each number in the list. The syntax is correct and follows the pattern of using `map()` with a lambda function. The distractors include incorrect lambda syntax, missing arguments, and using an exponent instead of multiplication.

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
def greet(name):
    return f'Hello, {name}!'

result = greet('Alice')
print(result)
```
What will be the output of this code snippet?

**Choices:**
- **[A]** `Hello, Alice!` **(CORRECT)**
- **[B]** `Hello, Bob!`
- **[C]** `Good morning, Alice!`
- **[D]** `Alice`

**Explanation:** The function `greet` is called with the argument 'Alice'. The function returns a string formatted with the name provided. Therefore, the output will be 'Hello, Alice!'. Choice B is incorrect because it uses a different name ('Bob'), Choice C is incorrect because it adds additional text ('Good morning'), and Choice D is incorrect because it only prints the name without any greeting.

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

