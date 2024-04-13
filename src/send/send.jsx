import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WebSocketManager } from '../WebSocketManager';
import '../forms.css';

export function ShareGoal() {
    const [personalGoals, setPersonalGoals] = React.useState([])
    const [goalTitle, setGoalTitle] = React.useState('');
    const [users, setUsers] = React.useState('');
    const currentUser = localStorage.getItem('username');
    const navigate = useNavigate();
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const [url] = React.useState(`${protocol}://${window.location.host}/ws`)
    
    React.useEffect(() => {
        fetch('/api/goals')
            .then((response) => response.json())
            .then((goals) => {
                setPersonalGoals(goals);
                setGoalTitle(goals.length > 0 ? goals[0].goalTitle : '');
                localStorage.setItem('personalGoals', JSON.stringify(goals));
            })
            .catch(() => {
                const personalGoalsText = localStorage.getItem('personalGoals');
                if (personalGoalsText) {
                    const parsedGoals = JSON.parse(personalGoalsText);
                    setPersonalGoals(parsedGoals);
                    setGoalTitle(parsedGoals.length > 0 ? parsedGoals[0].goalTitle : '');
                }
            });
    }, []);

    let goalOptions = []
    for (const [i, goal] of personalGoals.entries()) {
        goalOptions.push(
            <option key={goal.goalTitle}>{goal.goalTitle}</option>
        )
    }

    async function sendGoal() {
        const newShare = {
            'username': currentUser,
            'goalTitle': goalTitle,
            'users': users,
        }
        try {
            await fetch(`/api/share`, {
                method: 'PUT',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(newShare),
            })
            let userList = users.split(',');
            const event = {
                type: 'share',
                from: currentUser,
                shareWith: userList,
            }
            sendMessage(event)
        }
        catch {
            console.error('Error: unable to share goals at this time');
        }
        finally {
            navigate('/share');
        }
    }

    const handleMessage = (notification) => {
        console.log('Message received. Messages can only be viewed on the personal goals page.')
    }

    const sendMessage = (message) => {
        // Logic to send message through WebSocket connection
        console.log('Sending message from ParentComponent:', message);
    
        // Create a new WebSocket connection for sending messages
        const ws = new WebSocket(url);
        ws.onopen = () => {
          console.log('WebSocket connected for sending');
          ws.send(JSON.stringify(message));
          ws.close(); // Close the connection after sending the message
        };
      };

    return (
        <main>
            <WebSocketManager 
                currentUser={localStorage.getItem('username')}
                url={url}
                onMessage={handleMessage}
            />
            <h1>Share a Goal!</h1>
            <div className='form'>
                <label htmlFor="goalTitle">Goal Title:</label>
                <select name="goalTitle" id="goalTitle" onChange={(e) => setGoalTitle(e.target.value)}>
                    {goalOptions}
                </select>
                <label htmlFor="users">Type Username of User(s) to Share With:</label>
                <input type="text" id='users' placeholder='Seperate usernames by commas (eg. john1, goalcrusher32)' onChange={(e) => setUsers(e.target.value)}/>
                <button onClick={sendGoal} className='button' type='submit' id='sendGoal'>Share Goal</button>
            </div>
        </main>
    )
}