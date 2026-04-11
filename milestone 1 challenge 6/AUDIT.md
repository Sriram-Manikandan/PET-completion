# Pre-Refactor Audit

This document lists all structural, readability, and maintainability issues identified in the current codebase before refactoring. Each issue will be addressed in subsequent refactoring steps.

---

## 1. File Structure Issues
- Entire application logic is contained in a single file (`app.js`)
- No separation between:
  - Routing
  - Business logic
  - Data handling
  - Validation
- Violates separation of concerns → difficult to scale and maintain

---

## 2. Function Design Problems
- Single function `handleAll()` handles multiple responsibilities:
  - Input validation
  - Data creation
  - Data retrieval
  - Filtering
  - Deletion
  - Response handling
- Uses a flag (`'create'`, `'getAll'`, `'getOne'`, `'getCat'`, `'del'`) to switch behavior
- Function is long, complex, and not reusable
- Violates Single Responsibility Principle (SRP)

---

## 3. Variable Naming Issues

Several variables are unclear and non-descriptive:

| Variable | Issue |
|----------|------|
| `d` | unclear → request body |
| `r` | unclear → request params |
| `x` | unclear → ID counter |
| `tmp` | vague → confession object |
| `arr` | generic → sorted confessions |
| `res2` | unclear → deleted item |
| `i` | unclear → parsed ID |
| `handler` | unclear → index of item |

- Makes code hard to read and understand  
- Requires reading implementation to infer meaning  

---

## 4. Hardcoded Values
- Categories array repeated:
  ```js
  ["bug", "deadline", "imposter", "vibe-code"]
  ```
- Delete token hardcoded:
  ```js
  'supersecret123'
  ```
- Port hardcoded:
  ```js
  3000
  ```

**Problems:**
- No central configuration  
- Hard to update safely  
- Not production-ready  

---

## 5. Deeply Nested Conditionals
- Multiple nested `if` statements in create logic:
  ```
  if (d) → if (d.text) → if (length < 500) → if (length > 0)
  ```
- Makes logic hard to follow  
- Increases cognitive load  
- Should use early returns instead  

---

## 6. Repeated Logic
- Category validation logic duplicated in multiple places  

- Filtering logic unnecessarily verbose:
  ```js
  if (x.category === cat) return true
  return false
  ```

- Could be simplified  

---

## 7. No Environment Variables
- Sensitive and configurable values not stored in `.env`:
  - Port  
  - Delete token  

- Violates best practices (12-factor app)  

---

## 8. Lack of Comments
- No explanation of:
  - Why validation rules exist  
  - Why sorting is applied  
  - Why `reverse()` is used  

- Makes onboarding difficult  

---

## 9. Inconsistent Response Handling
- Mix of:
  - `res.json()`  
  - `res.send()`  
  - `res.status().json()`  

- No consistent API response structure  

---

## 10. Error Handling Issues
- No centralized error handling  

- Generic error responses:
  ```js
  res.status(500).send("error")
  ```

- No meaningful debugging information  

---

## 11. Global State Management
- `confessions` stored in memory  
- `x` used as global counter  

**Problems:**
- Not scalable or persistent  
- Risk of data loss on restart  

---

## 12. Routing Issues
- Routes directly call `handleAll()` with string flags  
- Business logic tightly coupled with routing  
- No controller layer  

---

## 13. Code Readability Issues
- Inconsistent use of `var`, `let`, `const`  
- Mixed function styles (arrow + traditional)  
- Poor formatting and naming reduces clarity  

---

## 14. Edge Case Handling
- Missing validation for:
  - Invalid IDs (`NaN`)  
  - Missing params  

- Possible runtime issues  

---

## 15. Unnecessary Code
- This block is unrelated to API logic:
  ```js
  if (confessions.length > 500) {
    console.log("too many")
  }
  ```

- Should not exist outside request lifecycle  