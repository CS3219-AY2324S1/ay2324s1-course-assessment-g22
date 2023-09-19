import React from "react";
import { useState } from "react";
import {
  setQuestionsLS,
  getQuestionsLS,
  addQuestionLS,
} from "./utils/QuestionQueries";
import { v4 as uuidv4 } from "uuid";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import QuestionModal from "./QuestionModal";
import { Link } from "react-router-dom";

const columns = [
  { field: "qid", headerName: "Question Id", flex: 1 },
  { field: "title", headerName: "Question Title", flex: 3 },
  { field: "category", headerName: "Question Category", flex: 4 },
  { field: "complexity", headerName: "Question Complexity", flex: 1.5 },
  {
    field: "description",
    headerName: "Question Description",
    flex: 2,
    renderCell: (params) => {
      return (
        <Link to={`/question/${params.row.title}`}>
          <Button variant="outlined" color="primary">
            Description
          </Button>
        </Link>
      );
    },
  },
];

export default function QuestionBank() {
  // State for managing the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [category, setCategory] = useState([]);

  // State for storing form input values
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    complexity: "",
    description: "",
  });

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle category changes
  const handleCategoryChange = (event, value) => {
    setCategory({
      ...category,
      value
    });
    const categoryString = "category";
    setFormData({
      ...formData,
      [categoryString]: value.toString()
    });
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  // Function to handle form submission
  const handleSubmit = () => {
    if (hasDuplicateTitle(questions, formData.title.toLowerCase())) {
      alert("Duplicate title found. Please check your input.");
    } else if (
      formData.title === "" ||
      formData.category === "" ||
      formData.complexity === "" ||
      formData.description === ""
    ) {
      alert("Please fill out all fields.");
    } else {
      addQuestionLS(formData); // Add the form data to local storage
      closeModal(); // Close the modal after handling the form submission
      window.location.reload();
    }
  };

  // Function to check for duplicate questions (Case insensitive)
  const hasDuplicateTitle = (array, newTitle) => {
    return array.some((item) => item.title.toLowerCase() === newTitle);
  };

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const handleDelete = () => {
    if (rowSelectionModel.length === 0) {
      alert("Please select at least one question to delete.");
      return;
    }
    const newQuestions = questions.filter((question) => {
      for (let i = 0; i < rowSelectionModel.length; i++) {
        if (question.id === rowSelectionModel[i]) {
          return false;
        }
      }
      return true;
    });
    setQuestionsLS(newQuestions);
    setRowSelectionModel([]);
    window.location.reload();
  };

  const [questions] = useState(() => {
    let count = 1;
    return (
      getQuestionsLS().map((question) => {
        return { ...question, id: uuidv4(), qid: count++ };
      }) || []
    );
  }, []);

  return (
    <div className="p-10 bg-grey">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Question Bank</h2>
        <div className="space-x-4">       
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={openModal}
          >
            Add
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={handleDelete}
          >
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
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
      />

      <QuestionModal
        open={isModalOpen}
        handleClose={closeModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleCategoryChange={handleCategoryChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
