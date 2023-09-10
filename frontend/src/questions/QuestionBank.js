import React from "react";
import { useState, useEffect } from "react";
// import Question from "./Question";
import { setQuestionsLS, getQuestionsLS } from "./utils/QuestionQueries";
import { v4 as uuidv4 } from "uuid";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "qid", headerName: "Question Id", flex: 1 },
  { field: "title", headerName: "Question Title", flex: 3 },
  { field: "category", headerName: "Question Category", flex: 4 },
  { field: "complexity", headerName: "Question Complexity", flex: 1.5 },
];

export default function QuestionBank() {
  useEffect(() => {
    setQuestionsLS();
  }, []);

  const [questions] = useState(() => {
    let count = 1;
    return (
      getQuestionsLS().map((question) => {
        return { ...question, id: uuidv4(), qid: count++ };
      }) || []
    );
  });

  return (
    <div className="p-10 bg-grey">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Question Bank</h2>
        <div className="space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Add
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Delete
          </button>
        </div>
      </div>
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
    </div>
  );
}
