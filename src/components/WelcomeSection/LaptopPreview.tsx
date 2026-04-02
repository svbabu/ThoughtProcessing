// src/components/LaptopPreview.tsx
import React, {useEffect, useState} from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';

import { useNavigate } from 'react-router-dom';
import laptopImage from '@img/latop.png';

export const LaptopPreview = () => {
    const navigate = useNavigate();

    return (
        <div className="preview-card" onClick={() => navigate('/laptops')}>
            <img
                src={laptopImage}
                alt="Explore Laptops"
                style={{ cursor: 'pointer', height: '250px', objectFit: 'cover' }}
            />
            <h4 className="mt-2">Explore Laptops</h4>
        </div>




    );
};

