import React from "react";
import { useState, useEffect } from "react";
import {
  deleteQuestions,
  getQuestions,
  addQuestion,
  updateQuestion,
} from "./utils/mongodb/questionApi";
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
  const [isAdd, setIsAdd] = useState(false);
  const [editQuestionTitle, setEditQuestionTitle] = useState("");
  const [category, setCategory] = useState([]);

  // State for storing form input values
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    complexity: "",
    description: "",
  });

  // Function to open the modal
  const openModal = (isAdd) => {
    setIsAdd(isAdd);
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
      value,
    });
    const categoryString = "category";
    setFormData({
      ...formData,
      [categoryString]: value.toString(),
    });
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
  const handleSubmit = async () => {
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
      isAdd
        ? await addQuestion(formData)
        : await updateQuestion(formData, editQuestionTitle);
      closeModal(); // Close the modal after handling the form submission
      window.location.reload();
    }
  };

  // Function to check for duplicate questions (Case insensitive)
  const hasDuplicateTitle = (array, newTitle) => {
    return array.some((item) => item.title.toLowerCase() === newTitle);
  };

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const handleDelete = async () => {
    if (rowSelectionModel.length === 0) {
      alert("Please select at least one question to delete.");
      return;
    }
    const questionsToDelete = questions.filter((question) => {
      for (let i = 0; i < rowSelectionModel.length; i++) {
        if (question.id === rowSelectionModel[i]) {
          return true;
        }
      }
      return false;
    });
    await deleteQuestions(questionsToDelete);
    setRowSelectionModel([]);
    window.location.reload();
  };

  const handleEdit = async () => {
    if (rowSelectionModel.length !== 1) {
      alert("Please select only one question to edit.");
      return;
    }
    const questionToEdit = questions.find(
      (question) => question.id === rowSelectionModel[0]
    );
    setEditQuestionTitle(questionToEdit.title);
    openModal(false);
  };

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let count = 1;
    getQuestions().then((data) => {
      const displayQuestions = data.questions.map((q) => ({
        ...q,
        id: q._id,
        qid: count++,
      }));
      setQuestions(displayQuestions);
    });
  }, []);

  return (
    <div className="p-10 bg-grey">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Question Bank</h2>
        <div className="space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => openModal(true)}
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
        isAdd={isAdd}
      />
    </div>
  );
}
