import React from 'react';
import '../../react-layout.css';


import Navbar from './Navbar';

const SkillsExperiencePage: React.FC = () => {
  return (
      <div className="skills-experience-wrapper" id="skill">





           <h2 className="section-title">Skills & Experience</h2>
           <p className="intro-text">
             Please find the below showing as my skills and my experience:
           </p>

           <div className="skills-experience-grid">
             {/* Skills Table */}
             <div className="skills-block">
               <h3>My Skills</h3>
               <table className="skills-table">
                 <thead>
                   <tr><th>Skill</th><th>Proficiency</th></tr>
                 </thead>
                 <tbody>
                   <tr><td>HTML</td><td>95%</td></tr>
                   <tr><td>CSS</td><td>70%</td></tr>
                   <tr><td>Core Java</td><td>85%</td></tr>
                   <tr><td>Servlets,JSP</td><td>80%</td></tr>
                   <tr><td>Spring,Spring boot,Webservices</td><td>80%</td></tr>
                   <tr><td>JDBC,Hibernate,PostgreSql DB,Oracle</td><td>80%</td></tr>
                   <tr><td>Tomact Server</td><td>85%</td></tr>


                 </tbody>
               </table>
             </div>


   {/* Experience Table */}

   <div className="experience-block">
              <h3>My Experience</h3>
              <table className="experience-table">
                <thead>
                  <tr><th>Role</th><th>Years</th><th>Organization</th></tr>
                </thead>
                <tbody>
                  <tr><td>UI Designer</td><td>2000–2045</td><td>Apex Software Inc.</td></tr>
                  <tr><td>Product Designer</td><td>2000–2045</td><td>Apex Software Inc.</td></tr>
                  <tr><td>Web Designer</td><td>2000–2045</td><td>Apex Software Inc.</td></tr>
                  <tr><td>Apps Designer</td><td>2000–2045</td><td>Apex Software Inc.</td></tr>
                </tbody>
              </table>
            </div>
          </div>






        </div>




 );
};

export default SkillsExperiencePage;

