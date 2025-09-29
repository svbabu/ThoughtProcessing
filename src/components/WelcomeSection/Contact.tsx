import React from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import { useState } from 'react';
import axios from 'axios';
import SendMessageForm from './SendMessageForm';
import  MapLocation from './MapLocation';
import CopyrightFooter from './CopyrightFooter';
import 'bootstrap/dist/css/bootstrap.min.css';

import testimonialone from '@img/testimonial-1.png';
import testimonialtwo from '@img/testimonial-2.png';
import testimonialthree from '@img/testimonial-3.png';



const Contact: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        mobile:'',
        subject: '',
        message: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submitting:', form);
        // 🌱 Frontend validation

        const nameRegex = /^[A-Za-z\s]+$/;
        if (
            !form.name ||
            form.name.trim().length < 2 ||
            !nameRegex.test(form.name.trim())
        ) {
            alert('Name must be at least 2 characters and contain only letters');
            return;
        }
        if (!form.subject || form.subject.trim().length<5) {
            alert('Subject must be at least 5 characters');
            return;
        }
        if (!form.message || form.message.trim().length<10) {
            alert('Message must be at least 10 characters');
            return;
        }



        try {
            const endpoint = form.subject.includes("feedback") ? "/submit" : "/contact/send";
            const response = await axios.post(`http://localhost:8081/thoughtprocessing-core${endpoint}`, form, { headers: { 'Content-Type': 'application/json' } });

            console.log(`Routing to: ${endpoint}`);



            /*const response = await axios.post('http://localhost:8081/thoughtprocessing-core/contact/send', form, {
                headers: { 'Content-Type': 'application/json' }
            });*/
            console.log('Response:', response.data);
            alert('Message sent successfully!');
            setForm({ name: '', email: '', mobile:'', subject: '', message: '' }); // Clear form


        } catch (error) {
            console.error('Error:', error);
            /*console.error('Submission error:', error.response?.data || error.message);
*/

            alert('Failed to send message.');
           /* alert('❌ Failed to send message: ' + (error.response?.data || 'Unknown error'));*/

        }
    };

    return (
    <div className="container-xxl pb-5" id="contact" style={{backgroundColor:'white'}}>
      <Navbar />

      <div className="container py-5">

      {/* <div className="row text-center mb-5">
          {[
            { img:testimonialone, name: 'Client One', role: 'Designer' },
            { img: testimonialtwo, name: 'Client Two', role: 'Developer' },
            { img:testimonialthree, name: 'Client Three', role: 'Strategist' },
          ].map((person, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <img
                src={person.img}
                alt={person.name}
                className="img-fluid rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />

             { *//*  <h5>{person.name}</h5>
              <p>{person.role}</p> *//* }
            </div>
          ))}
        </div> */}
         {/* <input type="text" name="name" value={form.name} onChange={handleChange}
          />*/}
          {/*<input type="text" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}

          />
          <input type="text" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input type="text" name="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
          <input type="text" name="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          />*/}


          <form className="form-bg"  onSubmit={handleSubmit}>
      <h1 className="display-5 text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Contact Me</h1>

        <div className="row g-5 mb-5 wow fadeInUp" data-wow-delay="0.1s">
          <div className="col-lg-6">
          <div className="position-relative text-center mb-5">
           {/* <h1 className="display-5 mb-4">Let's Work Together</h1> */}

            <img
              src={testimonialone}
              className="rounded-circle position-absolute"
              style={{ top: '20px', left:'8%', width: '80px' }}



              alt="Client One"
            />
            <img
              src={testimonialtwo}
              className="rounded-circle position-absolute"
             style={{ top: '80px', right: '50%', left: '0%',width: '80px' }}



              alt="Client Two"
            />
            <img
              src={testimonialthree}
              className="rounded-circle position-absolute"
              style={{ top: '10px', left: '0%',  width: '80px' }}


              alt="Client Three"
            />
          </div>


            <h1 className="display-5 mb-0">Let's Work Together</h1>
          </div>
          <div className="col-lg-6 text-lg-end">
            <a className="btn btn-primary py-3 px-5" href="mailto:veerababusingu@gmail.com?subject=Project Inquiry&body=Hi Singu, I’d love to work with you!">Say Hello</a>
          </div>
        </div>

        <div className="row g-5">
          <div className="col-lg-5 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <p className="mb-2">My office:</p>
            <h3 className="fw-bold">2nd Street, Bangalore, India</h3>
            <hr className="w-100" />
            <p className="mb-2">Call me:</p>
            <h3 className="fw-bold">+9620562722</h3>
            <hr className="w-100" />
            <p className="mb-2">Mail me:</p>
            <h3 className="fw-bold">veerababusingu@gmail.com</h3>
            <hr className="w-100" />
            <p className="mb-2">Follow me:</p>
            <div className="d-flex pt-2">
              <a className="btn btn-square btn-primary me-2" href="#"><i className="fab fa-twitter"></i></a>
              <a className="btn btn-square btn-primary me-2"
                 href="https://www.facebook.com/veera.babu.1048"
                 target="_blank" rel="noopener noreferrer">
                 <i className="fab fa-facebook-f"></i></a>
               <a className="btn btn-square btn-primary me-2"
                 href="https://www.youtube.com/@veerababus5517"
                 target="_blank"
                 rel="noopener noreferrer">
                <i className="fab fa-youtube"></i></a>
              <a className="btn btn-square btn-primary me-2" href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          <div className="col-lg-7 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <p className="mb-4">
              The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes.
              Just copy and paste the files, add a little code and you're done.{' '}
              <a href="https://htmlcodex.com/contact-form" target="_blank" rel="noopener noreferrer">Download Now</a>.
            </p>


              <div className="form-section">
                  <h1 className="display-5 text-center mb-4">Send Message</h1>
                  <p className="text-center mb-4">Feel free to reach out—I'm listening.</p>
                  <div className="row g-3">
                      {/* Input fields */}
                      <div className="col-md-6">
                  <div className="form-floating">
                      <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          value={form.name}
                          onChange={handleChange}
                      />


                      <label htmlFor="name">Your Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                      <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Your Email"
                          value={form.email}
                          onChange={handleChange}
                      />


                      <label htmlFor="email">Your Email</label>
                  </div>
                </div>
                      <div className="col-md-6">
                          <div className="form-floating">
                              <input
                                  type="tel"
                                  className="form-control"
                                  id="mobile"
                                  name="mobile"
                                  placeholder="Your Mobile Number"
                                  pattern="[0-9]{10}"
                                  required
                                  value={form.mobile}
                                  onChange={handleChange}
                              />


                              <label htmlFor="email">Your Mobile Number</label>
                          </div>
                      </div>
                <div className="col-12">
                  <div className="form-floating">
                      <input
                          type="text"
                          className="form-control"
                          id="subject"
                          name="subject"
                          placeholder="Subject"
                          value={form.subject}
                          onChange={handleChange}
                      />

                      <label htmlFor="subject">Subject</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        placeholder="Leave a message here"
                        style={{ height: '100px' }}
                        value={form.message}
                        onChange={handleChange}
                    />


                      <label htmlFor="message">Message</label>
                  </div>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary py-3 px-5" type="submit">Send Message</button>

                   {/* <SendMessageForm />*/}
                </div>
                  </div>






              </div>

          </div>
        </div>


      </form>
      </div>



    <MapLocation />
    <CopyrightFooter />

    </div>
  );
};

export default Contact;
