import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function CustomModal({ open, handleClose, formData, handleInputChange, handleSubmit }) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a New Item
          </Typography>
          <form>
            <TextField
              name="title" // Updated name to "title"
              label="Question Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.title}
              onChange={handleInputChange}
            />
            <TextField
              name="category" // Updated name to "category"
              label="Question Category"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={formData.category}
              onChange={handleInputChange}
            />
            <TextField
              name="complexity" // Updated name to "complexity"
              label="Question Complexity"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={formData.complexity}
              onChange={handleInputChange}
            />
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
          </form>
        </Box>
      </Modal>
    );
  }
