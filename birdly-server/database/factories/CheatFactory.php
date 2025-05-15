<?php

namespace Database\Factories;

use App\Services\CheatFileService;
use Illuminate\Database\Eloquent\Factories\Factory;


class CheatFactory extends Factory {
    public function definition(): array {
        $content =
            <<<MDX
": 1}      # Dictionary
```

---

## 🧮 Operators

```python
# Arithmetic
+, -, *, /, //, %, **

# Comparison
==, !=, >, <, >=, <=

# Logical
and, or, not
```

---

## 📌 Control Flow

```python
if x > 0:
    print("Positive")
elif x == 0:
    print("Zero")
else:
    print("Negative")

for i in range(5):
    print(i)
    <<<MDX
# 🐍 Python Basics Cheat Sheet

---

## 📦 Variables

```python
x = 5
name = "Alice"
pi = 3.14
is_active = True
```

---

## 🔢 Data Types

- `int`, `float`, `str`, `bool`
- `list`, `tuple`, `set`, `dict`

```python
a = [1, 2, 3]     # List
b = (1, 2, 3)     # Tuple
c = {1, 2, 3}     # Set
d = {"
while x > 0:
    x -= 1
```

---

## 🎒 Functions

```python
def greet(name):
    return f"Hello, {name}!"
```

Arrow-style (lambda):

```python
square = lambda x: x * x
```

---

## 🎲 Built-in Functions

- `print()`
- `len()`
- `range()`
- `type()`
- `int()`, `str()`, `float()`, `list()`

---

## 🧰 List Comprehension

```python
squares = [x*x for x in range(10)]
```

---

## 📚 Strings

```python
name = "Alice"
name.upper()      # 'ALICE'
name.lower()      # 'alice'
name[0:3]         # 'Ali'
```

---

## 🧱 Classes

```python
class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        return f"{self.name} says woof!"
```

---

## 📂 Modules

```python
import math

print(math.sqrt(16))  # 4.0
```

---

## 🧪 Exceptions

```python
try:
    x = 1 / 0
except ZeroDivisionError:
    print("Cannot divide by zero.")
finally:
    print("Done")
```

---

## 🗃️ File I/O

```python
with open("file.txt", "r") as f:
    contents = f.read()
```

---

## ✨ Tips

- Indentation matters!
- Python uses `None` for null values.
- Use `virtualenv` or `venv` for isolated environments.

---

Happy coding! 🐍
MDX;
        $title = "python_cheat";
        $fileService = app(CheatFileService::class);
        $path = $fileService->store(1, $title, $content);

        return [
            'title' => $title,
            'course_id' => 1,
            'path' => $path,
        ];
    }
}
