// src/components/WelcomeSection/WelcomeSection.tsx
import React from 'react';

import TwoWomenHan from '@img/TwoWomenHan.png';
import freeflagspiritmotherkid from '@img/freeflagspiritmotherkid.png';
import fatherkid from '@img/fatherkid.png';
import familyenjoy from '@img/familyenjoy.png';
import shakehands1 from '@img/shakehands1.png';
import teeamcoffee from  '@img/teeamcoffee.png';
import istockphoto from '@img/istockphoto.png';
import unlockcreativity from '@img/unlockcreativity.png';
import teammeet from '@img/teammeet.png';
import goodfriends from '@img/goodfriends.png';
import housedesign from '@img/housedesign.png';
import goodlooklady from '@img/goodlooklady.png';
import goodlooklady1 from '@img/goodlooklady1.png';
import cutelady3 from '@img/cutelady3.png';
import twofriends1 from '@img/twofriends1.png';
import motherwithdougter1 from '@img/motherwithdougter1.png';
import whiteflower from '@img/whiteflower.png';
import wmotherdaugteru1 from '@img/motherdaugteru1.png';
import breathingextense from '@img/breathingextense.png';
import nature from '@img/nature.png';
import waterfall from '@img/waterfall.png';
import beautifulglasssoutdoorimg from '@img/beautifulglasssoutdoorimg.png';
import loveeach from '@img/loveeach.png';
import lightingwithshinehouse2 from '@img/lightingwithshinehouse2.png';
import redcolorwithsun from '@img/redcolorwithsun.png';
import allclipswithyogaandlife from '@img/allclipswithyogaandlife.png';
import timetell from '@img/timetell.png';
import home from '@img/home.png';
import womenstudywithmother from '@img/womenstudywithmother.png';

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
import HomePage from './HomePage';

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
                <p className="image-note">Trust is not a transaction—it’s a quiet agreement to show up with care.</p>
                 <p> <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
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

                <p className="image-note"> Clarity is gentle design—turning intent into visible care.</p>
                <p><span className="read-more-toggle" onClick={toggleNote}>Read more</span></p>
              <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
              Each glow is a signal—your presence matters, your growth is welcome.Every gesture—spoken or silent—affirms our presence and intent.
                {/* In ThoughtProcessing,each module begins with a quiet promise:honour, clarity, and mutual growth. */}
              </div>
          </div>
          </div>
          <div className="welcome-logo1">
            <div className="image-block">
              <img src={wmotherdaugteru1} alt="Mother and Daughter" />

                       <p className="image-caption">
                          Gesture of care” becomes “act of care
                         </p>

                         <p className="image-note">
                           Each line is a quiet kindness, written to connect.
                         </p>

                         <p>
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
             <img src={whiteflower} alt="White Lisianthus" />

             <p className="image-caption">
               This flower reminds us: clarity is care.
             </p>

             <p className="image-note">
               Each bloom signals presence, each petal honors intent.
             </p>

             <p>
               <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
             </p>

             <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
               Every gesture—spoken or silent—affirms our presence and growth.
               In ThoughtProcessing, each module begins with a quiet promise: honour, clarity, and mutual care.
             </div>
           </div>
         </div>

</div> {/*welcome-row*/}
{/*welcome-row1*/}
<div className="welcome-row1">
       <div className="welcome-logo1">
       <div className="image-block">
       <img src={unlockcreativity} alt="Lantern of growth"
       style={{ height: "30vh", width: "auto" }} />
 <p className="image-caption">
        Together we grow:clarity is shared care.
      </p>

      <p className="image-note">
        Each voice is a signal—your ideas matter, your presence shapes our path.
      </p>
      {/*  <p className="image-note">
        Creativity reminds us: clarity is care, and each glow is a signal.
      </p> */}
      <p>
        <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
      </p>

      <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
              "Every shared moment affirms trust and care.
               In ThoughtProcessing, each module begins with a promise of clarity and inclusion."
            </div>
        </div>
       </div>

      <div className="welcome-logo1">
        <div className="image-block">
         <img src={teeamcoffee} alt="Lantern of growth" />
          <p className="image-caption">Together we grow: shared clarity.</p>
            <p className="image-note">Each voice is a signal—your ideas matter, your presence shapes our path.
           </p>
             {/* <p className="image-note">Shared voices build,growth and Presence turns clarity into care.</p>*/}

  <p><span className="read-more-toggle" onClick={toggleNote}>Read more</span>
 </p>
   <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
     "Collaboration is continuity made visible.
      In ThoughtProcessing, every gesture carries forward a rhythm of clarity, care, and mutual growth."
     </div>
      </div>
         </div>
<div className="welcome-logo1">
  <div className="image-block">
     <img src={teammeet} alt="Team meeting collaboration" />
      <p className="image-caption">Collaboration is care made visible.</p>
      {/*  <p className="image-note"> Every voice shapes our shared growth.
          </p> */}
     <p className="image-note">
     In every discussion, clarity grows—your words bring light, your presence builds trust.</p>
       <p> <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
         </p>
       <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
       "Dialogue is the seed of growth.
       Each module opens with a quiet vow: honour ideas, nurture presence, and welcome change."
     </div>
     </div>
       </div>
      <div className="welcome-logo1">
        <div className="image-block">
        <img src={goodfriends} alt="Lantern of growth" />
     <p className="image-caption">  Shared clarity builds shared trust. </p>
      {/* <p className="image-note">
       Side by side, women and men remind us: clarity is collective.

       </p> */}
      <p className="image-note">
       In every gathering, ideas cross and connect—women and men shaping paths through dialogue and care.</p>
      <p><span className="read-more-toggle" onClick={toggleNote}>Read more</span>
      </p>
   <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
      Every shared task affirms belonging.
        In ThoughtProcessing, presence becomes care and growth becomes mutual
    </div>
      </div>
           </div>
            </div> {/*close welcome-row1*/}
   <div className="welcome-row2">
           <div className="welcome-logo1">
           <div className="image-block">
           <img src={timetell} alt="Lantern of growth"
           style={{ height: "29.7vh", width: "auto" }} />
      <p className="image-caption">Time reminds us:strength grows with patience.</p>
     <p className="image-note">Each moment is a signal—pain today becomes resilience tomorrow, presence shapes endurance.
 </p>
      <p className="image-note">

  <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
    </p>
 <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
   Every tick—silent or loud—marks our intent and growth.
    In ThoughtProcessing, each module begins with a quiet promise: honour time, embrace clarity, and welcome strength.
          </div>
      </div>
</div>
<div className="welcome-logo1">
     <div className="image-block">
     <img src={womenstudywithmother} alt="Lantern of growth"
      style={{ height: "30vh", width: "auto" }}/>
      <p className="image-caption">A mother’s care: clarity through love and affection. </p>
      <p className="image-note">Each moment together is a signal—your presence nurtures, your guidance shapes growth and trust.</p>
     <p className="image-note">
    {/*  This lantern reminds us: clarity is care. */}
 <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
    </p>
 <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
 Every gesture—spoken or silent—affirms belonging and care.
   In ThoughtProcessing, each module begins with a quiet promise: honour relationships, embrace clarity, and welcome mutual growth.
  </div>
  </div>
    </div>

<div className="welcome-logo1">
<div className="image-block">
   <img src={lightingwithshinehouse2 } alt="Lantern of growth"  />

   <p className="image-caption"> Each effort shines: together we celebrate.
    </p>
   <p className="image-note">One hand decorates, two voices share presence, and a child learns with guidance—every role matters.
    </p>
 <p className="image-note">

 <span className="read-more-toggle" onClick={toggleNote}>Read more</span>
 </p>
 <div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
   Every gesture—spoken or silent—affirms belonging and care.
     In ThoughtProcessing, each module begins with a quiet promise: honour contributions, embrace clarity, and welcome mutual growth.
   </div>
</div>
</div>
  <div className="welcome-logo1">
      <div className="image-block">
    <img src={waterfall} alt="Lantern of growth"
   style={{ height: "30vh", width: "47vh" }} />
    <p className="image-caption">The waterfall reminds us: clarity flows with care. </p>
       <p className="image-note">Each drop is a signal—presence nourishes, growth is welcomed, and nature teaches us renewal.
       </p>
         <p className="image-note">
  <span className="read-more-toggle" onClick={toggleNote}>Read more</span></p>
<div className={`extra-note${isNoteVisible ? ' visible' : ''}`}>
 Every stream—gentle or strong—affirms our rhythm and intent.
   In ThoughtProcessing, each module begins with a quiet promise: honour nature, embrace clarity, and welcome mutual growth.
  </div>
</div>
</div>
</div>  {/*close welcome-row2*/}

  <YoutubeChannel />
<About />
<HomePage />
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
