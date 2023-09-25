import React from "react";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import { categories } from "./utils/QuestionCategories";

export default function CustomModal({
  open,
  handleClose,
  formData,
  category,
  handleInputChange,
  handleCategoryChange,
  handleSubmit,
  isAdd,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isAdd ? "Add a Question" : "Edit a Question"}
        </Typography>
        <form>
          <TextField
            name="title"
            label="Question Title"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={formData.title}
            onChange={handleInputChange}
          />
          <Autocomplete
            multiple
            options={categories}
            getOptionLabel={(option) => option}
            value={category}
            onChange={handleCategoryChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Question Categories"
                placeholder="Favorites"
              />
            )}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-autowidth-label">
              Complexity
            </InputLabel>
            <Select
              name="complexity"
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={formData.complexity}
              onChange={handleInputChange}
              label="Complexity"
            >
              <MenuItem value={"Easy"}>Easy</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"Hard"}>Hard</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="description"
            label="Question Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={10}
            value={formData.description}
            onChange={handleInputChange}
          />
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                backgroundColor: "#0074d9", // Blue background color
                color: "white", // Text color
                border: "2px solid #001f3f", // Blue border
                borderRadius: "5px", // Curved border
                padding: "8px 16px", // Padding around text
                cursor: "pointer", // Show pointer cursor on hover
              }}
            >
              {isAdd ? "Add" : "Edit"}
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
