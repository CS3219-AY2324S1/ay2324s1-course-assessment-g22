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
import { Tooltip } from 'react-tooltip'
import { Button } from '@mui/material';
import Match from '../Components/Matching/Match';
import Card from '@mui/material/Card';

export default function HomePage({ socket }) {
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
        // Initialised dates outside in case of axios failure
        const dateList = [];
        const startDate = new Date(new Date().getFullYear(), 0, 0);
        const endDate = new Date(new Date().getFullYear(), 11, 31);
        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
            dateList.push({ date: date.toLocaleDateString('en-US'), count: 0 });
        }
        setDates(dateList);

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

                const findDate = (date) => dateList.find((item) => item.date === date);

                for (const history of historyData) {
                    if (history.difficulty === 'Easy') {
                        difficultyList[0].value += 1;
                    } else if (history.difficulty === 'Medium') {
                        difficultyList[1].value += 1;
                    } else {
                        difficultyList[2].value += 1;
                    }
                    const date = new Date(history.time_started).toLocaleDateString('en-US');
                    const existingDate = findDate(date);
                    if (existingDate) {
                        existingDate.count += 1;
                    }
                }
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
                    <div className='font-medium text-2xl mb-7'>
                        {numQuestionsAttempted === 1 ? `1 Question attempted in ${new Date().getFullYear()}` :
                            `${numQuestionsAttempted} Questions attempted in ${new Date().getFullYear()}`}</div>
                    <CalendarHeatmap
                        startDate={new Date(new Date().getFullYear(), 0, 0)}
                        endDate={new Date(new Date().getFullYear(), 11, 31)}
                        values={dates}
                        classForValue={(value) => {
                            if (!value || value.count === 0) {
                                return 'color-empty';
                            }
                            if (value.count > 8) {
                                return `color-scale-8`
                            }
                            return `color-scale-${value.count}`;
                        }}
                        tooltipDataAttrs={value => {
                            if (value.count === 1) {
                                return {
                                    'data-tooltip-content':
                                        `1 question attempted on ${value.date}`,
                                    'data-tooltip-id': 'calendar-tooltip'
                                };
                            }
                            console.log(value.count);
                            return {
                                'data-tooltip-content':
                                    `${value.count} questions attempted on ${value.date}`,
                                'data-tooltip-id': 'calendar-tooltip'
                            };
                        }}
                    />
                    <Tooltip id='calendar-tooltip' />
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