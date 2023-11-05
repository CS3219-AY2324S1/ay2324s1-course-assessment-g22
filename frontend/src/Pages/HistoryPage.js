import React, { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { HISTORY_URL } from '../Constants';
import CodeModal from '../Components/History/CodeModal';

export default function HistoryPage() {
    const [history, setHistory] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("");
    const onHandleClick = (code, language) => {
        console.log("handleClicking")
        setCode(code);
        setLanguage(language);
        setIsModalOpen(true);
    }
    
    const closeModal = () => {
        console.log("closing modal")
        setIsModalOpen(false);
    }


    const columns = [
        { field: "other_username", headerName: "Collaborator", flex: 2 },
        { field: "question", headerName: "Question", flex: 2, },
        { field: "date_started", headerName: "Start Date", flex: 2 },
        { field: "time_started", headerName: "Start Time", flex: 2 },
        { field: "time_taken", headerName: "Time Taken", flex: 2 },
        { field: "language_used", headerName: "Language", flex: 2, },
        { field: "code", headerName: "Code", flex: 2, renderCell: (params) => {
            const code = params.row.code;
            const language = params.row.language_used;
            return <Button variant="contained" sx={{
                fontWeight: 500,
                textTransform: 'Capitalize'
            }} onClick={() => onHandleClick(code, language)}>View Code</Button>
        }}
    ];

    function formatTime(date1, date2) {
        const firstDate = new Date(date1);
        const secondDate = new Date(date2);
        const time = secondDate - firstDate;
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const remainingMilliseconds = time % (1000 * 60 * 60 * 24);
        const hours = Math.floor(remainingMilliseconds / (1000 * 60 * 60));
        const remainingMilliseconds2 = remainingMilliseconds % (1000 * 60 * 60);
        const minutes = Math.floor(remainingMilliseconds2 / (1000 * 60));
        const seconds = Math.floor((remainingMilliseconds2 % (1000 * 60)) / 1000);
        let timeString = "";
        if (days !== 0) {
            timeString += `${days} day `;
        }
        if (hours !== 0) {
            timeString += `${hours} hour `;
        }
        if (minutes !== 0) {
            timeString += `${minutes} min `;
        }
        if (seconds !== 0) {
            timeString += `${seconds} sec`;
        }
        return timeString;

    }
    useEffect(() => {
        const getHistory = async () => {
            try {
                const response = await axios.get(`${HISTORY_URL}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("_auth")}`,
                    },
                });
                const historyData = await response.data;
                const historyDisplay = historyData.map((history, index) => ({
                    id: index,
                    ...history,
                    date_started: new Date(history.time_started).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' }),
                    time_started: new Date(history.time_ended).toLocaleTimeString(),
                    time_taken: formatTime(history.time_started, history.time_ended)
                }));
                setHistory(historyDisplay);
                console.log(historyDisplay);
            } catch (error) {
                console.log("Unable to retrieve history of collaboration:", error);
            }
        }

        getHistory();
    }, []);

    return (
        <div>
            <div className='w-1/2 text-center pt-4 m-auto font-medium text-3xl'>Past history of collaboration</div>
            <div className='p-10'>
                <DataGrid
                    sx={{
                        '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '10px' },
                    }}
                    rows={history}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    getRowHeight={() => 'auto'}
                    disableRowSelectionOnClick
                    pageSizeOptions={[5, 10]}
                />
            </div>
            <CodeModal 
            open={isModalOpen}
            handleClose={closeModal}
            code={code}
            language={language}
            />
        </div>
    )
}