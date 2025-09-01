/*import React from 'react';
import ReactDOM from 'react-dom/client';
import { Header } from './components/Header';*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Header } from './components/Header';
import { initTypedText } from './typed/typed-init';
import ReactDOM from 'react-dom';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <Header />
    </React.StrictMode>
);