import React from 'react';
import { PopulateShare } from './populateShare';
import Accordion from 'react-bootstrap/Accordion';

export function Share() {
    const [sharedGoals, setSharedGoals] = React.useState([]);
    const [sharedWithMe, setSharedWithMe] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/shared')
            .then((response) => response.json())
            .then((goals) => {
                setSharedWithMe(goals);
                localStorage.setItem('sharedWithMe', JSON.stringify(goals));
            })
            .catch(() => {
                const sharedWithMeText = localStorage.getItem('sharedWithMe');
                if (sharedWithMeText) {
                    setSharedWithMe(JSON.parse(sharedWithMeText));
                }
            });
    }, []);

    React.useEffect(() => {
        fetch('/api/share')
            .then((response) => response.json())
            .then((goals) => {
                setSharedGoals(goals);
                localStorage.setItem('sharedGoals', JSON.stringify(goals));
            })
            .catch(() => {
                const sharedGoalsText = localStorage.getItem('sharedGoals');
                if (sharedGoalsText) {
                    setSharedGoals(JSON.parse(sharedGoalsText));
                }
            })
    })

    return (
        <main>
            <Accordion defaultActiveKey="0" className='accordion'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Shared with You</Accordion.Header>
                    <Accordion.Body>
                        <PopulateShare
                            goalData={sharedWithMe}
                            type='sharedWith'
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                    <Accordion.Header>Shared by You</Accordion.Header>
                    <Accordion.Body>
                        <PopulateShare
                            goalData={sharedGoals}
                            type='sharing'
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </main>
    )
}
