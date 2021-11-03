import React from 'react';
import {ToastContainer, Toast} from 'react-bootstrap';

export default function ToasterComponent({show, message, variant}) {
    return (
        <ToastContainer position="top-end" className="p-3" style={{ marginTop: 50 }}>
            <Toast bg={variant == 'success' ? 'success' : 'danger' } show={show} delay={3000} autohide>
                <Toast.Body>
                    <span style={{color:'white'}}>{message}</span>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}