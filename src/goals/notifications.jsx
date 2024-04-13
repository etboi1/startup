import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

export function DisplayNotification(props) {
    const navigate = useNavigate()
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
        setIsVisible(false);
        }, props.durationInSeconds * 1000); // Convert seconds to milliseconds

        return () => {
        clearTimeout(timeoutId); // Clear timeout when component unmounts
        };
    }, [props.durationInSeconds]);

    return isVisible ? (
        <button className='inner-notification button-notification-inner' id='notification-inner' onClick={() => {navigate('/share')}}>{props.notificationText}</button>
    )
    : null
}