import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../forms.css';


export function NewGoal(){
    const [goalTitle, setGoalTitle] = React.useState('');
    const [goalType, setGoalType] = React.useState('Physical');
    const [goalDescription, setGoalDescription] = React.useState('');
    const [targetCompletionDate, setTargetCompletionDate] = React.useState('');
    const [milestoneDate, setMilestoneDate] = React.useState('');
    const [milestoneTitle, setMilestoneTitle] = React.useState('');
    const currentUser = localStorage.getItem('username');
    const navigate = useNavigate();

    async function PostGoal() {
        
        const newGoalData = {
            "username": currentUser,
            "goalType": goalType,
            "goalTitle": goalTitle,
            "goalDescription": goalDescription,
            "targetCompletionDate": targetCompletionDate,
            "milestoneDate": milestoneDate,
            "milestoneTitle": milestoneTitle,
            "status": 'not yet reported'
        }

        function updateGoals(newGoal) {
            let goals = [];
            const goalsText = localStorage.getItem('personalGoals');
            if (goalsText) {
                goals = JSON.parse(goalsText);
            }
        
            goals.push(newGoal);
        
            return goals;
        }
    
        try {
            const response = await fetch('/api/goals', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(newGoalData),
            });
    
            const goals = await response.json();
            localStorage.setItem('personalGoals', JSON.stringify(goals));
        }
        catch {
            const goals = updateGoals(newGoalData);
            localStorage.setItem('personalGoals', JSON.stringify(goals));
        }
        finally {
            navigate('/goals');
        }
    }

    return(
        <main>
            <h1>Create a New Goal!</h1>
            <div className='form'>
                <label htmlFor="goalTitle">Goal Title:</label>
                <input type="text" id='goalTitle' className='goal-title'placeholder='Goal Title...' onChange={(e) => setGoalTitle(e.target.value)}/>
                <label htmlFor="goalType">Goal Type:</label>
                <select name="goalType" id="goalType" onChange={(e) => setGoalType(e.target.value)}>
                    <option>Physical</option>
                    <option>Educational</option>
                    <option>Occupational</option>
                    <option>Hobbies</option>
                    <option>Social</option>
                </select>
                <label htmlFor="goalDescription">Goal Description:</label>
                <textarea name="description" id="goalDescription" placeholder='Goal Description...' onChange={(e) => setGoalDescription(e.target.value)}></textarea>
                <label htmlFor="targetCompletionDate">Target Completion Date:</label>
                <input id='targetCompletionDate' type="date" name='varCompletionDate' onChange={(e) => setTargetCompletionDate(e.target.value)}/>
                <label htmlFor="milestoneDate">Milestone Date:</label>
                <input type="date" id='milestoneDate' name='varMilestoneDate' onChange={(e) => setMilestoneDate(e.target.value)}/>
                <label htmlFor="milestoneTitle">Milestone Title:</label>
                <input type="text" id='milestoneTitle' placeholder='Milestone Title...' onChange={(e) => setMilestoneTitle(e.target.value)}/>
                <button className='button' type='submit' id='newGoal' onClick={PostGoal}>
                    Create Goal
                </button>
            </div>
        </main>
    )
}