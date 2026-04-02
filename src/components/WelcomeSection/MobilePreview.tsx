// src/components/LaptopPreview.tsx
import React, {useEffect, useState} from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';

import { useNavigate } from 'react-router-dom';

import mobileImage from '@img/mobile.png'

export const MobilePreview = () => {
    const navigate = useNavigate();

    return (
        <div className="preview-card" onClick={() => navigate('/mobiles')}>
            <img
                src={mobileImage}
                alt="Explore Mobiles"
                style={{ cursor: 'pointer', height: '250px', objectFit: 'cover' }}
            />
            <h4 className="mt-2">Explore Mobiles</h4>
        </div>




    );
};

