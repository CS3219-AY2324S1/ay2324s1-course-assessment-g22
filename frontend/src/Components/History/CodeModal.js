import Editor from "@monaco-editor/react";
import { Box, Modal } from "@mui/material";

export default function CodeModal({ open, handleClose, code, language }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                width: '50%',
                p: 0.3,
                bgcolor: 'white',
                margin: 'auto',
                marginTop: 10,
                borderRadius: 3,
            }}>
                <div className="mb-10 font-medium text-3xl">Code</div>
                <Editor
                    height="50vh"
                    options={{ domReadOnly: true, readOnly: true }}
                    defaultLanguage={language}
                    defaultValue={code}
                />
            </Box>
        </Modal>);
}