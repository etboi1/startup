import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles.css';

export function PopulateGoals(props) {
    const navigate = useNavigate()

    const goals = [];
    if (props.personalGoals.length) {
        for (const [i, goal] of props.personalGoals.entries()) {
            {goal.goalType === props.goalType &&
                goals.push(
                    <div className='inner-container' key={goal.goalTitle}>
                        <strong>{goal.goalTitle}</strong>
                        <span>Due Date - {goal.dueDate}</span>
                        <span>{goal.milestoneTitle} - {goal.milestoneDate}</span>
                        <div>
                            <button className='button' type='submit' onClick={() => navigate('/progress')}>Report Progress</button>
                        </div>
                    </div>
                )
            }
        }
    }
    else {
        goals.push(
            <div className='inner-container' key={'no goals'}></div>
        )
    }

    return (
        <div className='outer-container'>
            {goals}
        </div>
    )
}