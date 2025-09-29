import React from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';

function SendMessageForm() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', form); // ✅ Debug output


        try {
            const response = await axios.post('http://localhost:8081/thoughtprocessing-core/submit', form, {
                headers: { 'Content-Type': 'application/json' }
            });
            alert(response.data); // "Message received from: Singu"
        } catch (error) {
            console.error('Submission failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row g-3">
                {/*<div className="col-md-6">
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={handleChange}
                        />
                        <label htmlFor="name">Your Name</label>
                    </div>
                </div>*/}
                {/*<div className="col-md-6">
                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Your Email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="email">Your Email</label>
                    </div>
                </div>*/}
                {/*<div className="col-md-6">
                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Your Email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="email">Your Email</label>
                    </div>
                </div>
           */}     {/*<div className="col-12">
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                            value={form.subject}
                            onChange={handleChange}
                        />
                        <label htmlFor="subject">Subject</label>
                    </div>
                </div>*/}

                {/*<div className="col-12">
                    <div className="form-floating">
            <textarea
                className="form-control"
                placeholder="Leave a message here"
                id="message"
                style={{ height: '100px' }}
                value={form.message}
                onChange={handleChange}
            ></textarea>
                        <label htmlFor="message">Message</label>
                    </div>
                </div>*/}
                <div className="col-12">
                    <button  type="submit">
                        Send Message
                    </button>
                </div>
            </div>
            {/*<div className="col-12">
                <button  type="submit">
                    Send Message
                </button>
            </div>*/}
        </form>

    );
}

export default SendMessageForm;
