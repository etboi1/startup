import React from 'react';

import '../styles.css';

export function PopulateShare(props) {
    const goals = []
    if (props.goalData.length) {
        for (const [i, goal] of props.goalData.entries()) {
            {props.type === 'sharedWith' &&
                goals.push(
                    <div className='inner-container' key={goal.goalTitle}>
                        <strong>{goal.username}</strong>
                        <span>{goal.goalTitle} (Due: {goal.targetCompletionDate})</span>
                    </div>
                )
            }
            {props.type === 'sharing' &&
                goals.push(
                    <div className='inner-container' key={goal.goalTitle}>
                        <strong>{goal.goalTitle}</strong>
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