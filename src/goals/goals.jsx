import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { PopulateGoals } from './pupulateGoals';

import '../styles.css';

export function Goals() {
    const [personalGoals, setPersonalGoals] = React.useState([]);

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
    }, []);

    return (
        <main>
            <h1 className='fix-header'>Personal Goals</h1>
            <h4 className='center-text' id='inspirationalQuote'></h4>
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
        </main>
    )
}