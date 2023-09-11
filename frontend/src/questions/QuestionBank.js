import React from "react";
import { useState, useEffect } from "react";
import { setQuestionsLS, getQuestionsLS, addQuestionLS } from "./utils/QuestionQueries";
import { v4 as uuidv4 } from "uuid";
import { DataGrid } from "@mui/x-data-grid";
import QuestionModal from "./QuestionModal";


const columns = [
  { field: "qid", headerName: "Question Id", flex: 1 },
  { field: "title", headerName: "Question Title", flex: 3 },
  { field: "category", headerName: "Question Category", flex: 4 },
  { field: "complexity", headerName: "Question Complexity", flex: 1.5 },
];

export default function QuestionBank() {
  // State for managing the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for storing form input values
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    complexity: "",
  });

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = () => {
    addQuestionLS(formData); // Add the form data to local storage
    closeModal(); // Close the modal after handling the form submission
    window.location.reload();
  };

  useEffect(() => {
    setQuestionsLS();
  }, []);

  const [questions] = useState(() => {
    let count = 1;
    setQuestionsLS();
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
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={openModal}>
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

      <QuestionModal
        open={isModalOpen}
        handleClose={closeModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
