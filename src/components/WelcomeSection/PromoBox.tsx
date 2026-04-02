import { ProductList } from "./ProductList";


import React, {useEffect} from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import { useState } from 'react';
import { Product } from '../../typed/Product';
import latop from '@img/latop.png';
import { useNavigate } from 'react-router-dom';


interface PromoBoxProps {
    title: string;
    festivalLabel?: string;
    subtext?: string;
    offer: string;
    route: string;
    badge?: string;
}

export const PromoBox: React.FC<PromoBoxProps> = ({
                                                      title,
                                                      festivalLabel,
                                                      subtext,
                                                      offer,
                                                      route,
                                                      badge,
                                                  }) => {
    const navigate = useNavigate();

    return (
        <div className="promo-box" onClick={() => navigate(route)}>
            {badge && <div className="promo-badge">{badge}</div>}
            <h2 className="promo-title">{title}</h2>
            {festivalLabel && <div className="promo-festival">{festivalLabel}</div>}
            {subtext && <div className="promo-subtext">{subtext}</div>}
            <p className="promo-offer">{offer}</p>
        </div>
    );
};

