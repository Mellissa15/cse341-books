# Books API Week 02 Spec - Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal
Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model
Book documents will be stored in the `books` collection.

Required book fields:
- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author document
- `title`: string, required
- `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books
Purpose: Return all books.

Success:
- Status code: `200`
- Response body: an array of book objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /books/:id
Purpose: Return one book by its custom id.

Success:
- Status code: `200`
- Response body: the matching book object

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### POST /books
Purpose: Create a new book.

Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:
- Status code: `201`
- Response body: the newly created book object

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if the `authorId` does not match an existing author
- `500` if an unexpected server or database error occurs

#### PUT /books/:id
Purpose: Update an existing book.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:
- Status code: `200`
- Response body: the updated book object

Errors:
- `400` if a required field is missing
- `400` if the `authorId` does not match an existing author
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /books/:id
Purpose: Delete an existing book.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

### Swagger Documentation
Swagger must document every book route.

### Deployment Expectations
After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

---

## Feature 2: Author CRUD Operations

### Goal
Create an authors API that supports all CRUD operations for authors. Each author will use a custom string id, and books will reference authors through the author's custom id. Every author route must be documented and testable in Swagger.

### Data Model
Author documents will be stored in the `authors` collection.

Required author fields:
- `id`: string, required, non-empty, custom id such as `a1`
- `firstName`: string, required, non-empty
- `lastName`: string, required, non-empty

Authors will continue to use custom string ids instead of MongoDB `_id` values for route parameters. Clients will not be allowed to modify MongoDB's internal `_id` value.

### Relationship to Books
Books reference authors through the `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

An author cannot be deleted while one or more books still reference that author's id.

Before deleting an author, the API must check the `books` collection for books whose `authorId` matches the author's custom id.

### Validation
For create and update requests:
- Required fields must be present.
- Required fields must contain strings.
- Required string fields must not be empty.
- Unexpected fields should not be used to modify the stored author document.

### Routes

#### GET /authors
Purpose: Return all authors.

Success:
- Status code: `200`
- Response body: an array of author objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /authors/:id
Purpose: Return one author by its custom id.

Success:
- Status code: `200`
- Response body: the matching author object

Errors:
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### POST /authors
Purpose: Create a new author.

Request body:

    {
      "id": "a1",
      "firstName": "Jane",
      "lastName": "Smith"
    }

Success:
- Status code: `201`
- Response body: the newly created author object

Errors:
- `400` if a required field is missing, empty, or has the wrong type
- `400` if the `id` already exists
- `500` if an unexpected server or database error occurs

#### PUT /authors/:id
Purpose: Update an existing author identified by its custom id.

Request body:

    {
      "firstName": "Jane",
      "lastName": "Johnson"
    }

The request body must contain all required author fields except `id`. The author's existing custom `id` remains unchanged.

Success:
- Status code: `200`
- Response body: the updated author object

Errors:
- `400` if a required field is missing, empty, or has the wrong type
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /authors/:id
Purpose: Delete an existing author.

Before deleting the author, the API must check whether any books reference the author's custom id.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no author exists with that id
- `409` if one or more books still reference the author
- `500` if an unexpected server or database error occurs

### Error Response Format
Errors should return a JSON object containing a `message` field.

Example:

    {
      "message": "Author not found"
    }

For an author that cannot be deleted because books reference it:

    {
      "message": "Author cannot be deleted because books reference this author"
    }

The same general format should be used for validation, relationship, and server errors.

### Swagger Documentation
Swagger must document every author route, including path parameters, request bodies, successful responses, and documented error responses.

### Deployment Expectations
After implementation, the author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.

---

# Books API Week 02 Spec - Version 2

## Feature 1: Book CRUD Operations and Author References

### Goal
Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model
Book documents will be stored in the `books` collection.

Required book fields:
- `id`: string, required, non-empty, custom id such as `b1`
- `authorId`: string, required, non-empty, references the `id` field of an author document
- `title`: string, required, non-empty
- `publicationDate`: string, required 
- `birthYear`: number, required, valid four-digit year

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters. Clients will not be allowed to modify MongoDB's internal `_id` value.

### Relationship to Authors
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API must reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Validation
For create and update requests:
- Required fields must be present.
- Required fields must contain strings.
- Required string fields must not be empty. 
- `birthYear` must be a number.
- `birthYear` must be a valid four-digit year.
- Unexpected fields should not be used to modify the stored book document.

### Routes

#### GET /books
Purpose: Return all books.

Success:
- Status code: `200`
- Response body: an array of book objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /books/:id
Purpose: Return one book by its custom id.

Success:
- Status code: `200`
- Response body: the matching book object

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### POST /books
Purpose: Create a new book.

Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:
- Status code: `201`
- Response body: the newly created book object

Errors:
- `400` if a required field is missing, empty, or has the wrong type
- `400` if the `id` already exists
- `400` if the `authorId` does not match an existing author
- `500` if an unexpected server or database error occurs

#### PUT /books/:id
Purpose: Update an existing book identified by its custom id.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

The request body must contain all required book fields except `id`. The book's existing custom `id` remains unchanged.

Success:
- Status code: `200`
- Response body: the updated book object

Errors:
- `400` if a required field is missing, empty, or has the wrong type
- `400` if the `authorId` does not match an existing author
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /books/:id
Purpose: Delete an existing book.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

### Error Response Format
Errors should return a JSON object containing a `message` field.

Example:

    {
      "message": "Book not found"
    }

The same general format should be used for validation, relationship, and server errors.

### Swagger Documentation
Swagger must document every book route, including path parameters, request bodies, successful responses, and documented error responses.

### Deployment Expectations
After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

---

## Feature 2: Author CRUD Operations

### Goal
Create an authors API that supports all CRUD operations for authors. Each author will use a custom string id, and books will reference authors through the author's custom id. Every author route must be documented and testable in Swagger.

### Data Model
Author documents will be stored in the `authors` collection.

Required author fields:
- `id`: string, required, non-empty, custom id such as `a1`
- `firstName`: string, required, non-empty
- `lastName`: string, required, non-empty

Authors will continue to use custom string ids instead of MongoDB `_id` values for route parameters. Clients will not be allowed to modify MongoDB's internal `_id` value.

### Relationship to Books
Books reference authors through the `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

An author cannot be deleted while one or more books still reference that author's id.

Before deleting an author, the API must check the `books` collection for books whose `authorId` matches the author's custom id.

### Validation
For create and update requests:
- Required fields must be present.
- Required fields must contain strings.
- Required string fields must not be empty.
- Unexpected fields should not be used to modify the stored author document.

### Routes

#### GET /authors
Purpose: Return all authors.

Success:
- Status code: `200`
- Response body: an array of author objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /authors/:id
Purpose: Return one author by its custom id.

Success:
- Status code: `200`
- Response body: the matching author object

Errors:
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### POST /authors
Purpose: Create a new author.

Request body:

    {
      "id": "a1",
      "firstName": "Jane",
      "lastName": "Smith" 
      "birthYear": 1985
    }

Success:
- Status code: `201`
- Response body: the newly created author object

Errors:
- `400` if a required field is missing, empty, or has the wrong type
- `400` if the `id` already exists 
- `400` if `birthYear` is not a valid four-digit year
- `500` if an unexpected server or database error occurs

#### PUT /authors/:id
Purpose: Update an existing author identified by its custom id.

Request body:

    {
      "firstName": "Jane",
      "lastName": "Johnson" 
      "birthYear": 1985
    }

The request body must contain all required author fields except `id`. The author's existing custom `id` remains unchanged.

Success:
- Status code: `200`
- Response body: the updated author object

Errors:
- `400` if a required field is missing, empty, or has the wrong type
- `400` if `birthYear` is not a valid four-digit year
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /authors/:id
Purpose: Delete an existing author.

Before deleting the author, the API must check whether any books reference the author's custom id.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no author exists with that id
- `409` if one or more books still reference the author
- `500` if an unexpected server or database error occurs

### Error Response Format
Errors should return a JSON object containing a `message` field.

Example:

    {
      "message": "Author not found"
    }

For an author that cannot be deleted because books reference it:

    {
      "message": "Author cannot be deleted because books reference this author"
    }

The same general format should be used for validation, relationship, and server errors.

### Swagger Documentation
Swagger must document every author route, including path parameters, request bodies, successful responses, and documented error responses.

### Deployment Expectations
After implementation, the author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.

