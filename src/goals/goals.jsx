import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { PopulateGoals } from './pupulateGoals';
import { useNavigate } from 'react-router-dom';
import { WebSocketManager } from '../WebSocketManager';
import { DisplayNotification } from './notifications';

import '../styles.css';

export function Goals() {
    const [quote, setQuote] = React.useState('Loading...');
    const [author, setAuthor] = React.useState('');
    const [personalGoals, setPersonalGoals] = React.useState([]);
    const [notification, setNotification] = React.useState(null);
    const navigate = useNavigate();
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const url = `${protocol}://${window.location.host}/ws`

    React.useEffect(() => {
        fetch('/api/goals')
            .then((response) => response.json())
            .then((goals) => {
                setPersonalGoals(goals);
                localStorage.setItem('personalGoals', JSON.stringify(goals));
            })
            .catch(() => {
                const personalGoalsText = localStorage.getItem('personalGoals');
                if (personalGoalsText) {
                    setPersonalGoals(JSON.parse(personalGoalsText));
                }
            });

        fetch("/api/quotes")
            .then((response) => response.json())
            .then((quote) => {
                setAuthor(quote.author);
                setQuote(quote.content);
            })
    }, []);

    const handleMessage = (notification) => {
        setNotification(notification.from);
    }

    return (
        <main>
            <WebSocketManager 
                currentUser={localStorage.getItem('username')}
                url={url}
                onMessage={handleMessage}
            />
            <div className='notification-outer' id='outer-notification'>
                {notification && <DisplayNotification 
                    durationInSeconds={15}
                    sharer={notification}
                />
                }
            </div>
            <h1 className='fix-header'>Personal Goals</h1>
            <h4 className='center-text' id='inspirationalQuote'>{quote} - {author}</h4>
            <Accordion defaultActiveKey="0" className='accordion'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Physical Goals</Accordion.Header>
                    <Accordion.Body>
                        <PopulateGoals 
                            personalGoals={personalGoals}
                            goalType='Physical'
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                    <Accordion.Header>Educational Goals</Accordion.Header>
                    <Accordion.Body>
                        <PopulateGoals 
                            personalGoals={personalGoals}
                            goalType='Educational'
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Occupational Goals</Accordion.Header>
                    <Accordion.Body>
                        <PopulateGoals 
                            personalGoals={personalGoals}
                            goalType='Occupational'
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='3'>
                    <Accordion.Header>Hobby Goals</Accordion.Header>
                    <Accordion.Body>
                        <PopulateGoals 
                            personalGoals={personalGoals}
                            goalType='Hobby'
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='4'>
                    <Accordion.Header>Social Goals</Accordion.Header>
                    <Accordion.Body>
                        <PopulateGoals 
                            personalGoals={personalGoals}
                            goalType='Social'
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <button onClick={() => navigate('/add')} className='button' type='submit'>Add Goal</button>
        </main>
    )
}