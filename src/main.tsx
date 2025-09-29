/* min.tsx */
import React from 'react';
/* import ReactDOM from 'react-dom/client'; */
import { Header } from './components/Header'; // ✅ matches named export
import { initTypedText } from './typed/typed-init';
import { useEffect } from 'react';
import Typed from 'typed.js';
import TypedTextBlock from './components/TypedTextBlock';
import { createRoot } from 'react-dom/client';
import WelcomeSection from './components/WelcomeSection/WelcomeSection';
import './react-layout.css'; // Adjust path as needed
import Navbar from './components/WelcomeSection/Navbar';
//import Sidebar from './components/WelcomeSection/Sidebar';




const roles = [
  "Web Designer",
  "Web Developer",
  "Front End Developer",
  "Apps Designer",
  "Apps Developer"
];

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <div className="tp-react-root">
        {/* ✅ Scoped container */}
        <main className="main-column">
          <Header />
          {/*<Navbar />*/}
            {/*<Sidebar>*/}
            <WelcomeSection />
           {/* <TypedTextBlock roles={roles} /> */}


        </main>
      </div>
    </React.StrictMode>
  );


}







