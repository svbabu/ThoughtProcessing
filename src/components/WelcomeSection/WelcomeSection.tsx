// src/components/WelcomeSection/WelcomeSection.tsx
import React from 'react';

import TwoWomenHan from '@img/TwoWomenHan.png';
import freeflagspiritmotherkid from '@img/freeflagspiritmotherkid.png';
import fatherkid from '@img/fatherkid.png';
import familyenjoy from '@img/familyenjoy.png';
import shakehands1 from '@img/shakehands1.png';
import teamcoffee from  '@img/teamcoffee.png';
import istockphoto from '@img/istockphoto.png';
import unlockcreativity from '@img/unlockcreativity.png';
import teammeet from '@img/teammeet.png';
import goodfriends from '@img/goodfriends.png';
import housedesign from '@img/housedesign.png';
import goodlooklady from '@img/goodlooklady.png';
import goodlooklady1 from '@img/goodlooklady1.png';
import cutelady3 from '@img/cutelady3.png';





import wmotherdaugteru1 from '@img/motherdaugteru1.png';
import breathingextense from '@img/breathingextense.png';

import WelcomeLogo from './WelcomeLogo';
import FlickerLady from './FlickerLady';
import YoutubeChannel from './YoutubeChannel';
import Navbar from './Navbar';
import About from './About';
import SkillsExperiencePage from './Skills';
import Services from './Services';
import Projects from './Projects';
import Testimonial from './Testimonial';
import Contact from './Contact';
import  MapLocation from './MapLocation';


import '../../react-layout.css';





const WelcomeSection: React.FC = () => {
  const [isNoteVisible, setNoteVisible] = React.useState(false);
  const toggleNote = () => setNoteVisible(!isNoteVisible);

  return (
      <div>
      <Navbar />

      <section className="welcome-message">
        <p>
          Welcome to <span className="brand-name">ThoughtProcessing</span> —
          where <span className="highlight">clarity</span> meets <span className="highlight">care</span>,
          and every module is a <span className="metaphor">lantern of growth</span>.
        </p>
      </section>
      <section className="welcome-section">
        <div className="tp-react-root two-column-row">
          {/* 🟢 Left column: Destiny heading */}
          <div className="destiny-column">
            <h2 className="destiny-heading">
              I'm &amp; We're looking forward to reach the destiny...
            </h2>


          {/* 🔵 Right column: Logos + handshake block */}
           <div className="welcome-row">
            {/* Optional: Handshake block at the top of logo column */}
            <div className="welcome-logo1">
            <div className="image-block">
                <img src={TwoWomenHan} alt="Welcome handshake" />
                <p className="image-caption">Every handshake begins with trust.</p>
                <p className="image-note">Trust is not a transaction—it’s a quiet agreement to show up with care.
                  <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
                </p>
                <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
                  Every gesture affirms presence.This handshake begins a build, not just an exchange.
                  ThoughtProcessing starts with quiet intent—clarity, honour, and shared growth.
                </div>
              </div>
            </div>
         <div className="welcome-logo1">
         <div className="image-block">
                <img src={istockphoto} alt="Lantern of growth" />
                <p className="image-caption">This lantern reminds us: clarity is care. </p>

                <p className="image-note">This lantern reminds us: clarity is care.
                <span className="read-more-toggle" onClick={toggleNote}>Read more</span></p>
              <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
              Each glow is a signal—your presence matters, your growth is welcome.Every gesture—spoken or silent—affirms our presence and intent.
                In ThoughtProcessing,each module begins with a quiet promise:honour, clarity, and mutual growth.
              </div>
          </div>
          </div><div className="welcome-logo1">
          <div className="image-block">
             <img src={wmotherdaugteru1} alt="Lantern of growth" />
               <p className="image-caption">Code is not just logic—it’s a gesture of kindness. </p>

               <p className="image-note">Code is not just logic—it’s a gesture of kindness.
               <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
               </p>
            <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
                         Each function, each layout, quietly affirms: I see you, I’ve thought of you.
                        In ThoughtProcessing, every module is built not just to work—but to welcome, teach, and grow.
            </div>
          </div>
          </div>
          <div className="welcome-logo1">
          <div className="image-block">
              <img src={breathingextense} alt="Lantern of growth" />
                 <p className="image-caption">This lantern reminds us: clarity is care. </p>

                  <p className="image-note">
                  This lantern reminds us: clarity is care.
                   <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
                   </p>
           <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
           Every gesture—spoken or silent—affirms our presence and intent.
           In ThoughtProcessing, each module begins with a quiet promise: honour, clarity, and mutual growth.
           </div>
       </div>
     </div>

</div> {/*welcome-row*/}
{/*welcome-row1*/}
<div className="welcome-row1">
        <div className="welcome-logo1">
                                                      <div className="image-block">
                                                      <img src={unlockcreativity} alt="Lantern of growth" />
                                                      <p className="image-caption">This lantern reminds us: clarity is care. </p>
                                                      <p className="image-note">Each glow is a signal—your presence matters, your growth is welcome.
                                                      </p>
                                                          <p className="image-note">
                                                          This lantern reminds us: clarity is care.
                                                          <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
                                                          </p>
                                                          <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
                                                          Every gesture—spoken or silent—affirms our presence and intent.
                                                          In ThoughtProcessing, each module begins with a quiet promise: honour, clarity, and mutual growth.
                                                          </div>
                                            </div>
                                            </div>
                                                                                               <div className="welcome-logo1">
                                                                                                  <div className="image-block">
                                                                                                  <img src={housedesign} alt="Lantern of growth" />
                                                                                                  <p className="image-caption">This lantern reminds us: clarity is care. </p>
                                                                                                  <p className="image-note">Each glow is a signal—your presence matters, your growth is welcome.
                                                                                                  </p>
                                                                                                      <p className="image-note">
                                                                                                      This lantern reminds us: clarity is care.
                                                                                                      <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
                                                                                                      </p>
                                                                                                      <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
                                                                                                      Every gesture—spoken or silent—affirms our presence and intent.
                                                                                                      In ThoughtProcessing, each module begins with a quiet promise: honour, clarity, and mutual growth.
                                                                                                      </div>
                                                                                        </div>
                                                                                        </div>
                   <div className="welcome-logo1">
                                                                         <div className="image-block">
                                                                         <img src={teammeet} alt="Lantern of growth" />
                                                                         <p className="image-caption">This lantern reminds us: clarity is care. </p>
                                                                         <p className="image-note">Each glow is a signal—your presence matters, your growth is welcome.
                                                                         </p>
                                                                             <p className="image-note">
                                                                             This lantern reminds us: clarity is care.
                                                                             <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
                                                                             </p>
                                                                             <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
                                                                             Every gesture—spoken or silent—affirms our presence and intent.
                                                                             In ThoughtProcessing, each module begins with a quiet promise: honour, clarity, and mutual growth.
                                                                             </div>
                                                               </div>
                                                               </div>
                    <div className="welcome-logo1">
                                                                          <div className="image-block">
                                                                          <img src={goodfriends} alt="Lantern of growth" />
                                                                          <p className="image-caption">This lantern reminds us: clarity is care. </p>
                                                                          <p className="image-note">Each glow is a signal—your presence matters, your growth is welcome.
                                                                          </p>
                                                                              <p className="image-note">
                                                                              This lantern reminds us: clarity is care.
                                                                              <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
                                                                              </p>
                                                                              <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
                                                                              Every gesture—spoken or silent—affirms our presence and intent.
                                                                              In ThoughtProcessing, each module begins with a quiet promise: honour, clarity, and mutual growth.
                                                                              </div>
                                                                </div>
                                                                </div>
            </div> {/*close welcome-row1*/}
   <div className="welcome-row2">
           <div className="welcome-logo1">
                                                         <div className="image-block">
                                                         <img src={goodlooklady} alt="Lantern of growth" />
                                                         <p className="image-caption">This lantern reminds us: clarity is care. </p>
                                                         <p className="image-note">Each glow is a signal—your presence matters, your growth is welcome.
                                                         </p>
                                                             <p className="image-note">
                                                             This lantern reminds us: clarity is care.
                                                             <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
                                                             </p>
                                                             <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
                                                             Every gesture—spoken or silent—affirms our presence and intent.
                                                             In ThoughtProcessing, each module begins with a quiet promise: honour, clarity, and mutual growth.
                                                             </div>
                                               </div>
                                               </div>
<div className="welcome-logo1">
                                                         <div className="image-block">
                                                         <img src={goodlooklady} alt="Lantern of growth" />
                                                         <p className="image-caption">This lantern reminds us: clarity is care. </p>
                                                         <p className="image-note">Each glow is a signal—your presence matters, your growth is welcome.
                                                         </p>
                                                             <p className="image-note">
                                                             This lantern reminds us: clarity is care.
                                                             <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
                                                             </p>
                                                             <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
                                                             Every gesture—spoken or silent—affirms our presence and intent.
                                                             In ThoughtProcessing, each module begins with a quiet promise: honour, clarity, and mutual growth.
                                                             </div>
                                               </div>
                                               </div>

<div className="welcome-logo1">
<div className="image-block">
                                                         <img src={goodlooklady1 } alt="Lantern of growth" />
                                                         <p className="image-caption">This lantern reminds us: clarity is care. </p>
                                                         <p className="image-note">Each glow is a signal—your presence matters, your growth is welcome.
                                                         </p>
                                                             <p className="image-note">
                                                             This lantern reminds us: clarity is care.
                                                             <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
                                                             </p>
                                                             <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
                                                             Every gesture—spoken or silent—affirms our presence and intent.
                                                             In ThoughtProcessing, each module begins with a quiet promise: honour, clarity, and mutual growth.
                                                             </div>
                                               </div>
                                               </div>
  <div className="welcome-logo1">
      <div className="image-block">
                                                                <img src={goodlooklady} alt="Lantern of growth" />
                                                                <p className="image-caption">This lantern reminds us: clarity is care. </p>
                                                                <p className="image-note">Each glow is a signal—your presence matters, your growth is welcome.
                                                                </p>
                                                                    <p className="image-note">
                                                                    This lantern reminds us: clarity is care.
                                                                    <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
                                                                    </p>
                                                                    <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
                                                                    Every gesture—spoken or silent—affirms our presence and intent.
                                                                    In ThoughtProcessing, each module begins with a quiet promise: honour, clarity, and mutual growth.
                                                                    </div>
                                                 </div>
                                                 </div>
                                               </div>  {/*close welcome-row2*/}


              <YoutubeChannel />
<About />
      <section id="skill">
        <SkillsExperiencePage  />
      </section>
<Services />
<Projects />
<Testimonial />
<Contact />


</div> {/*destiny-column*/}

{/*</div> */} {/*two-column-row*/}
          {/* 🔽 Logo blocks */}
           {/* 🔵 Right column: Logo blocks */}
        <div className="welcome-logo-column">
            <WelcomeLogo
          src={goodlooklady}
          alt="Welcome handshake"
          caption="We build together. We validate each other"
          />
          <WelcomeLogo
            src={freeflagspiritmotherkid}
            alt="Welcome Logo 2"
            caption="A mother’s love, a nation’s hope"
          />
          <WelcomeLogo
            src={fatherkid}
            alt="Welcome Logo 2"
            caption="In every coin they drop together, he’s investing in her dreams"
          />
          <WelcomeLogo
            src={familyenjoy}
            alt="Welcome Logo 2"
            caption="In every circle, you inspire hope, light, and dreams. In every play, laughter lives. In every ThoughtProcessing, you inspire the world."
          />

          <FlickerLady />


           {/* 🔽 Footer and profile */}
            {/*  <LegacyFooter />*/}


</div> {/*main welcome logo column*/}


</div>  {/*two-column-row*/}



      </section> {/*destiny and welcomelogo column section*/}

</div>

  );
};


export default WelcomeSection;
