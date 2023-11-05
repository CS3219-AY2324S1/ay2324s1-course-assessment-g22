import React, { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { HISTORY_URL } from '../Constants';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Button } from '@mui/material';
import Match from '../Components/Matching/Match';
import Card from '@mui/material/Card';

export default function HomePage({ socket }) {
    // Will remove module.css later
    const [difficulties, setDifficulties] = useState([{
        value: 1
    }]);
    const [hasHistory, setHasHistory] = useState(false);
    const [dates, setDates] = useState([]);
    const [numQuestionsAttempted, setNumQuestionsAttempted] = useState(0);

    const navigate = useNavigate();
    const onClickHistory = () => {
        navigate(`/history`, { replace: true })
    };
    const onClickQuestions = () => {
        navigate(`/question`, { replace: true })
    };

    const size = {
        width: 350,
        height: 200,
    };

    const StyledText = styled('text')(({ theme }) => ({
        fill: theme.palette.text.primary,
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 20,
    }));


    function PieCenterLabel({ children }) {
        const { width, height, left, top } = useDrawingArea();
        return (
            <StyledText x={left + width / 2} y={top + height / 2}>
                {children}
            </StyledText>
        );
    }


    useEffect(() => {
        const getHistory = async () => {
            try {
                const response = await axios.get(`${HISTORY_URL}/stats`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("_auth")}`,
                    },
                });
                const historyData = await response.data;
                const difficultyList = [{
                    value: 0, label: 'Easy'
                },
                { value: 0, label: 'Medium' }, { value: 0, label: 'Hard' }];
                const dateList = [];
                const findDate = (date) => dateList.find((item) => item.date === date);

                historyData.map(history => {
                    if (history.difficulty === 'Easy') {
                        difficultyList[0].value += 1;
                    } else if (history.difficulty === 'Medium') {
                        difficultyList[1].value += 1;
                    } else {
                        difficultyList[2].value += 1;
                    }
                    const date = new Date(history.time_started).toLocaleDateString('en-US');
                    const existingDate = findDate(new Date(history.time_started).toLocaleDateString('en-US'));
                    if (existingDate) {
                        existingDate.count += 1;
                    } else {
                        dateList.push({ date: date, count: 1 });
                    }
                });
                setDifficulties(difficultyList);
                setDates(dateList);
                setNumQuestionsAttempted(historyData.length);
                setHasHistory(true);
            } catch (error) {
                console.log("Unable to retrieve history of collaboration:", error);
            }
        }

        getHistory();
    }, []);

    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-row w-3/4'>
                <Card variant="outlined" sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    width: '80%',
                    p: 2,
                    paddingTop: 4,
                    paddingBottom: 4,
                    marginTop: 5,
                    marginLeft: 5,
                    marginRight: 1,
                    marginBottom: 3,
                }}>
                    <div className='font-medium text-2xl mb-5 '>View list of questions</div>
                    <Button variant="contained" sx={{
                        width: '65%',
                        textTransform: 'Capitalize',
                        fontSize: '1rem',
                    }} onClick={onClickQuestions}>View Questions</Button>
                </Card>
                <Card variant="outlined" sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    width: '80%',
                    p: 2,
                    paddingTop: 4,
                    paddingBottom: 4,
                    marginTop: 5,
                    marginRight: 5,
                    marginLeft: 1,
                    marginBottom: 3,
                }}>
                    <div className='font-medium text-2xl mb-5 '>View past history</div>
                    <Button variant="contained" sx={{
                        width: '65%',
                        textTransform: 'Capitalize',
                        fontSize: '1rem',
                    }} onClick={onClickHistory}>View History</Button>
                </Card>
            </div>
            <div className='flex flex-col items-center w-3/4'>
                <Card variant="outlined" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    width: '100%',
                    p: 2,
                    marginLeft: 2,
                    marginRight: 2,
                    marginBottom: 2
                }}>
                    <div className='font-medium text-2xl mb-7'>{numQuestionsAttempted} Questions attempted in {new Date().getFullYear()}</div>
                    <CalendarHeatmap
                        startDate={new Date(new Date().getFullYear(), 0, 1)}
                        endDate={new Date(new Date().getFullYear(), 11, 31)}
                        values={dates}
                        classForValue={(value) => {
                            if (!value) {
                                return 'color-empty';
                            }
                            if (value.count > 8) {
                                return `color-scale-8`
                            }
                            return `color-scale-${value.count}`;
                        }}
                    />
                </Card>
                <Card variant="outlined" sx={{
                    width: '65%',
                    p: 2,
                    m: 1,
                    marginRight: 1,
                    marginBottom: 2,
                }}>
                    <div className='font-medium text-2xl mb-7'>Difficulty of questions attempted</div>
                    <PieChart series={[{ data: difficulties, innerRadius: 80 }]} {...size}>
                        <PieCenterLabel>{hasHistory ? "Difficulty" : "No attempts"}</PieCenterLabel>
                    </PieChart>
                </Card>
            </div>
            <Match socket={socket} />
        </div>
    )
}