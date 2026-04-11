# CHANGES.md

This document records all refactoring decisions made to improve the structure, readability, and maintainability of the codebase.

---

## 1. Variable Renames

| Old Name | New Name            | Why                              |
|----------|---------------------|----------------------------------|
| d        | requestBody         | Represents incoming request data |
| r        | requestParams       | Represents route parameters      |
| x        | confessionIdCounter | Tracks unique IDs                |
| tmp      | newConfession       | Represents newly created object  |
| arr      | sortedConfessions   | Clearly describes sorted data    |
| res2     | deletedConfession   | Represents deleted item          |
| i        | confessionId        | Parsed ID value                  |
| handler  | confessionIndex     | Index of item in array           |
| t        | actionType          | Indicates operation type         |

---

## 2. Function Splits

### handleAll() split into:

- `validateConfessionInput()` — validates input before processing  
- `createConfession()` — handles creation logic  
- `getAllConfessions()` — returns all confessions sorted  
- `getConfessionById()` — fetches a single confession  
- `getConfessionsByCategory()` — filters by category  
- `deleteConfession()` — handles deletion logic  

**Why:**  
The original `handleAll()` function handled multiple responsibilities including validation, data processing, filtering, and response handling.  
Splitting it into smaller functions improves readability, testability, and maintainability by following the Single Responsibility Principle.

---

## 3. MVC Refactor

- Moved routing logic to `routes/confessionRoutes.js`  
- Moved request handling to `controllers/confessionController.js`  
- Moved business logic to `services/confessionService.js`  

**Why:**  
Separating concerns into different layers makes the codebase more scalable, easier to debug, and easier to maintain.

---

## 4. Environment Variables

- Moved configuration values into `.env`:
  - `PORT`
  - `DELETE_TOKEN`
- Created `.env.example` for reference  

**Why:**  
Removes hardcoded values, improves security, and allows flexible configuration across environments.

---

## 5. Inline Comments

- Added comments explaining **why** key logic exists:
  - Validation rules  
  - Category filtering  
  - Security checks  
- Avoided redundant comments that explain obvious code  

**Why:**  
Improves readability and helps future developers understand the intent behind implementation decisions.

---

## Summary

The codebase was transformed from a single-file, tightly coupled structure into a modular and maintainable architecture using:

- Clear variable naming  
- Single-responsibility functions  
- MVC folder structure  
- Environment-based configuration  
- Meaningful inline documentation  

All existing functionality was preserved while significantly improving code clarity and scalability.