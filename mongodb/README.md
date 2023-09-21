## API calls to MongoDB question database

All API calls to MongoDB uses:

- Port 3000
- Raw JSON input/output

Nuances

- All fields (title, category, complexity, description) must be included for each item

### To run connection:

- In mongodb directory, `node ./config/dbConnect.js`

### Create new question

- API: POST http://localhost:3000/api/questions
- Body of the HTTP POST request should have **title, category, complexity, description**

### Read question data

- API: GET http://localhost:3000/api/questions

### Update question

- API: PUT http://localhost:3000/api/questions/{question_title}
- Body of the HTTP POST request should have **title, category, complexity, description**

### Delete question

- API: DELETE http://localhost:3000//api/questions/{question_title}
