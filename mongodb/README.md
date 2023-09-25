## API calls to MongoDB question database

All API calls to MongoDB uses:

- Port 4567
- Raw JSON input/output

Nuances

- All fields (title, category, complexity, description) must be included for each item

### To run connection:

- In mongodb directory, `node ./config/dbConnect.js`
- Connection with the frontend is done through the concurrently library. To be removed when services are dockerized.

### Create new question

- API: POST http://localhost:4567/api/questions
- Body of the HTTP POST request should have **title, category, complexity, description**

### Read question data

- API: GET http://localhost:4567/api/questions

### Update question

- API: PUT http://localhost:4567/api/questions/{question_title}
- Body of the HTTP POST request should have **title, category, complexity, description** of the new question
- The question title in the URL should reflect the old question title that is going to be changed.

### Delete question

- API: DELETE http://localhost:4567/api/questions/{question_title}
- The question title in the URL should reflect the question title that is going to be deleted.
