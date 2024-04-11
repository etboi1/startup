import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import '../styles.css';

export function Goals() {
    return (
        <main>
            <h1 className='fix-header'>Personal Goals</h1>
            <h4 className='center-text' id='inspirationalQuote'></h4>
            <Accordion defaultActiveKey="0" className='accordion'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Physical Goals</Accordion.Header>
                    <Accordion.Body>Example Goal</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                    <Accordion.Header>Educational Goals</Accordion.Header>
                    <Accordion.Body>Example Goal</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Occupational Goals</Accordion.Header>
                    <Accordion.Body>Example Goal</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='3'>
                    <Accordion.Header>Hobby Goals</Accordion.Header>
                    <Accordion.Body>Example Goal</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='4'>
                    <Accordion.Header>Social Goals</Accordion.Header>
                    <Accordion.Body>Example Goal</Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </main>
    )
}