import React from "react";
import { useState, useEffect } from "react";
import Question from "./Question";
import { setQuestionsLS, getQuestionsLS } from "./utils/QuestionQueries";
import { v4 as uuidv4 } from "uuid";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "title", headerName: "Title", width: 70 },
  { field: "category", headerName: "Category", width: 200 },
  { field: "complexity", headerName: "Complexity", width: 130 },
];

export default function QuestionBank() {
  useEffect(() => {
    setQuestionsLS();
  }, []);

  const [questions] = useState(() => {
    return (
      getQuestionsLS().map((question) => {
        return { ...question, id: uuidv4() };
      }) || []
    );
  });

  return (
    <DataGrid
      rows={questions}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
  );
  // return questions.map((question) => (
  //   <Question key={uuidv4()} question={question} />
  // ));
}
