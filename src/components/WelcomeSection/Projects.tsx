import React, {useEffect, useState} from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';
import Team from './Team';
import {LaptopPromoCard} from './LaptopPromoCard'
import {MobilePromoCard} from './MobilePromoCard';
import {ShoesPromoCard} from './ShoesPromoCard';
import {ProductCard} from './ProductCard';
import { useNavigate } from 'react-router-dom';
import { featuredProducts } from '../../typed/Product';


import 'bootstrap/dist/css/bootstrap.min.css';
import testimonialone from '@img/testimonial-1.png';
import testimonialtwo from '@img/testimonial-2.png';
import testimonialthree from '@img/testimonial-3.png';

import projectone from '@img/project-1.png';
import projecttwo from '@img/project-2.png';
import projectthree from '@img/project-3.png';
import projectfour from '@img/project-4.png';
import projectfive from '@img/project-5.png';
import projectsix from '@img/project-6.png';
import latop from'@img/latop.png'
import mobile from '@img/mobile.png'
import shoes from'@img/shoes.png'

import teamone from '@img/team-1.png';
import teamtwo from '@img/team-2.png';
import teamthree from '@img/team-3.png';
import OwlCarousel from 'react-owl-carousel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';




//offer-attender entry in react
/*const [offers, setOffers] = useState([]);*/


const Projects: React.FC = () => {
    const key = "productName"; // ✅ string
    const obj = {
        [key]: "Laptop"

    };
    type Offer = {
        productName: string;
        description:string;
        originalPrice: number;
        discountPercentage: number;
        appliedPrice: number;
    };

    const [offers, setOffers] = useState<Offer[]>([]);
    const productImages: Record<string, string> = {
        "Laptop": latop,
        "Mobile Phone": mobile,
        "Shoes": shoes,

    };
    const navigate = useNavigate();

    const [clickedIndex, setClickedIndex] = useState<number | null>(null);


const API_URL = process.env.REACT_APP_API_URL;
console.log("API_URL:", process.env.REACT_APP_API_URL);

    useEffect(() => {
        console.log("API_URL:", process.env.REACT_APP_API_URL);
        const payload = [
          {
            productName: "Laptop",
            originalprice: 40000,
            offer: { description: "Diwali Festival Offer", discount: 30.0 }
          },
          {
            productName: "Laptop",
            originalprice: 50000,
            offer: { description: "Diwali Festival Offer", discount: 30.0 }
          },
          {
            productName: "Laptop",
            originalprice: 74000,
            offer: { description: "Clearance Sale", discount: 35.0 }
          },
          {
            productName: "Laptop",
            originalprice: 80000,
            offer: { description: "New Year Sale", discount: 25.0 }
          }
        ];
     // fetch("http://localhost:8081/api/prod-offers/calculate", {
            //fetch("/api/prod-offers/calculate", {
      console.log("Calling API:", `${API_URL}/prod-offers/calculate`);
    fetch(`${API_URL}/prod-offers/calculate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
           .then(data => setOffers(data)) // ✅ Correct setter
            .catch(err => console.error("Offer fetch failed:", err));
           }, []);

           /*  .then(res => res.json())
            .then(data => {
              if (Array.isArray(data)) {
                setOffers(data);              // ✅ backend returned a list of offers
              } else if (data.offer) {
                setOffers([data.offer]);      // ✅ backend returned a single offer object
              } else {
                setOffers([]);                // ✅ fallback: no offers
              }
            }).catch(err => console.error("Offer fetch failed:", err));
                  }, []);
 */

        /*const payload = [
            {
              productName: "Laptop",
              originalprice: 40000,
              offer: { description: "Diwali Festival Offer", discount: 30.0 }
            },
            {
              productName: "Laptop",
              originalprice: 50000,
              offer: { description: "Diwali Festival Offer", discount: 30.0 }
            },
            {
              productName: "Laptop",
              originalprice: 60000,
              offer: { description: "Clearance Sale", discount: 35.0 }
            },
            {
              productName: "Laptop",
              originalprice: 80000,
              offer: { description: "New Year Sale", discount: 25.0 }
            }
          ];
 */

            /* .then(data =>
                setOffers(data))
            .catch(err => console.error("Offer fetch failed:", err));
    }, []); */


    return (
        <div className="container-xxl pb-5" id="project" style={{ backgroundColor: 'red' }}>
            <div className="container-xxl py-6 pt-5" style={{ backgroundColor: 'red' }}>
                <div className="container">
                    <div className="row g-5 mb-5 align-items-center wow fadeInUp" data-wow-delay="0.1s">
                        <div className="col-lg-6">
                            <h1 className="display-5 mb-0">My Projects</h1>
                        </div>
                        <div className="col-lg-6 text-lg-end">
                            <ul className="list-inline mx-n3 mb-0" id="portfolio-flters">
                                <li className="mx-3 active" data-filter="*">All Projects</li>
                                <li className="mx-3" data-filter=".first">UI/UX Design</li>
                                <li className="mx-3" data-filter=".second">Graphic Design</li>
                            </ul>
                        </div>
                    </div>


                    <div className="row g-4 portfolio-container wow fadeInUp" data-wow-delay="0.1s">
                        {/* <div className="col-lg-4 col-md-6 portfolio-item first">
              <div className="portfolio-img rounded overflow-hidden">
                <img className="img-fluid" src={projectone}  alt="" />
                <div className="portfolio-btn">
                  <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href={projectone} data-lightbox="portfolio"><i className="fa fa-eye"></i></a>
                  <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href=""><i className="fa fa-link"></i></a>
                </div>
              </div>
            </div>*/}
                       <LaptopPromoCard />
                        <MobilePromoCard/>
                        <ShoesPromoCard/>
                       {/* <div className="product-list">
                            {featuredProducts.map((product, index) => (
                                <ProductCard key={index} data={product} />
                            ))}
                        </div>*/}



                        {offers.filter(offer => !['Laptop', 'Mobile Phone', 'Shoes'].includes(offer.productName))
                            .map((offer, index) => (
                                /*<ProductCard key={index} offer={offer} />*/
                                /* if (offer.productName === 'Laptop') return null; // ✅ Skip laptop here*!/*/
                            <div key={index} className="col-lg-4 col-md-6 portfolio-item first">
                                <div className="portfolio-img rounded overflow-hidden">
                                    <img className="img-fluid"
                                         src={productImages[offer.productName] || latop}
                                         alt={offer.productName}
                                         style={{cursor: 'pointer'}}
                                         onClick={() => {
                                             navigate(`/${offer.productName.toLowerCase()}`);
                                                        }
                                                  }
                                    />
                                    {clickedIndex === index && offer.productName === 'Laptop'
                                        && (
                                        <div className="discount-overlay">
                                            {offer.discountPercentage}% OFF
                                        </div>
                                    )}



                                    {clickedIndex === index && offer.productName === 'Mobile Phone'
                                        && (
                                            <div className="discount-overlay">
                                                {offer.discountPercentage}% OFF
                                            </div>
                                        )}


                                    {/*<div className="portfolio-btn" style={{backgroundColor: 'blue'}}>
                                        <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1"
                                           href={latop} data-lightbox="portfolio" style={{backgroundColor: 'red'}}>
                                            <i className="fa fa-eye"></i>
                                        </a>
                                        <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href="">
                                            <i className="fa fa-link"></i>
                                        </a>
                                    </div>*/}
                                    {/*<div className="p-3 text-white" style={{ backgroundColor: '#001f3f' }}>
                                        <h5>{offer.productName}</h5>
                                        <p>{offer.description}</p>
                                        <p>Original: ₹{offer.originalPrice}</p>
                                        <p>Discount: {offer.discountPercentage}%</p>
                                        <p>Final: ₹{offer.appliedPrice}</p>
                                    </div>*/}
                                </div>
                            </div>
                            ))}



                        <div className="col-lg-4 col-md-6 portfolio-item second">
                            <div className="portfolio-img rounded overflow-hidden">
                                <img className="img-fluid" src={projecttwo} alt=""/>
                                <div className="portfolio-btn">
                                    <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href={projecttwo} data-lightbox="portfolio"><i className="fa fa-eye"></i></a>
                                    <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href=""><i className="fa fa-link"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 portfolio-item first">
                            <div className="portfolio-img rounded overflow-hidden">
                                <img className="img-fluid" src={projectthree} alt=""/>
                                <div className="portfolio-btn">
                                    <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href={projectthree}   data-lightbox="portfolio"><i className="fa fa-eye"></i></a>
                                    <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href=""><i className="fa fa-link"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 portfolio-item second">
                            <div className="portfolio-img rounded overflow-hidden">
                                <img className="img-fluid" src={projectfour} alt=""/>
                                <div className="portfolio-btn">
                                    <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href={projectfour} data-lightbox="portfolio"><i className="fa fa-eye"></i></a>
                                    <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href=""><i className="fa fa-link"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 portfolio-item first">
                            <div className="portfolio-img rounded overflow-hidden">
                                <img className="img-fluid" src={projectfive}  alt=""/>
                                <div className="portfolio-btn">
                                    <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href={projectfive} data-lightbox="portfolio"><i className="fa fa-eye"></i></a>
                                    <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href=""><i className="fa fa-link"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 portfolio-item second">
                            <div className="portfolio-img rounded overflow-hidden">
                                <img className="img-fluid" src={projectsix} alt=""/>
                                <div className="portfolio-btn">
                                    <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href={projectsix} data-lightbox="portfolio"><i className="fa fa-eye"></i></a>
                                    <a className="btn btn-lg-square btn-outline-secondary border-2 mx-1" href=""><i className="fa fa-link"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Team />
            </div>
        </div>

    );
};

export default Projects;