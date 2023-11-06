import { Button, Chip, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';

export default function Tagging({tagName, handleAddTag, handleDeleteTag, formData, setTagName, setTagType,}) {

    return (<div className="flex flex-col items-center mt-4 p-4 border-solid border border-slate-300 rounded">
        <div className='mb-2'>Question Tags</div>
        <Paper
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                width: '100%',
                minHeight: 50,
                p: 0.3,
                marginBottom: 1,
            }}
            component="ul"
        >
            {formData.tags != null && formData.tags.map((tag, index) => (
                <li key={index} className='m-2' >
                    <Chip label={tag.name} 
                    color={tag.type === 'companyQuestion' ? 'warning' : tag.type === 'popularity' ? 'error' : 'success'}
                    onDelete={() => handleDeleteTag(tag.name)}/>
                </li>
            ))}
        </Paper>

        <div className="flex flex-row items-center justify-between">
            <TextField size="medium" className="w-5/12 text-base" margin="normal" label="Tag name"
                value={tagName} variant="outlined" onChange={(event) => {
                    setTagName(event.target.value);
                }} />
            <select className="w-6/12 rounded border border-blue-500 text-base py-3 px-4"
                onChange={(event) => {
                    setTagType(event.target.value);
                }}>
                <option value="companyQuestion">Company Question</option>
                <option value="popularity">Popularity</option>
                <option value="questionType">Question Type</option>
            </select>
        </div>
        <Button className="w-1/2" variant="contained" onClick={handleAddTag}>Add tag</Button>
    </div>
    );
}