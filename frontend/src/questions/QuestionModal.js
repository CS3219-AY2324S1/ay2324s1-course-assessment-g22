import React from "react";
import Select from '@mui/material/Select';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
// import Autocomplete from '@mui/material/Autocomplete';
import { categories } from "./utils/QuestionCategories";
import MultiSelectComponent from './components/MultiSelectComponent';

export default function CustomModal({ open, handleClose, formData, category, handleInputChange, handleCategoryChange, handleSubmit }) {

    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a Question
          </Typography>
          <form>
            <TextField
              name="title"
              label="Question Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.title}
              onChange={handleInputChange}
            />
            <MultiSelectComponent
              fullWidth
              margin="normal"
              getOptionLabel={options => options}
              label="Question Category"
              value={category}
              options={categories}
              onChange={handleCategoryChange}
              limitTags={3} // limits number of chip to render while out of focus, useful for responsiveness
              getLimitTagsText={count => `+${count}📦`} // modify the limit tag text, useful for translation too
            />
            <FormControl
              fullWidth
              margin="normal" 
            >
              <InputLabel id="demo-simple-select-autowidth-label">Complexity</InputLabel>
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
            <div>
            <button 
              type="button" 
              onClick={handleSubmit}
              style={{
                backgroundColor: '#0074d9',    // Blue background color
                color: 'white',                // Text color
                border: '2px solid #001f3f',  // Blue border
                borderRadius: '5px',          // Curved border
                padding: '8px 16px',          // Padding around text
                cursor: 'pointer',            // Show pointer cursor on hover
              }}
              >
                Add
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    );
  }
