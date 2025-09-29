import React from 'react';
import '../../react-layout.css';
import Navbar from './Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';

const YoutubeChannel: React.FC=()=>{
    return (
        <section className="welcome-section">
            <div className="tp-react-root two-column-row">
                {/* 🟢 Left column: Destiny heading */}
                <div className="destiny-column">
                    <div className="welcome-row3">
                        <div className="welcome-logo1">
                            <div className="image-block">
                                <iframe className="embed-responsive-item"
                                        src="https://www.youtube.com/embed/ZVfAXZwWPyw"
                                    /*width="272" height="150"*/

                                        allow="autoplay; encrypted-media"
                                        allowFullScreen></iframe>


                            </div>
                        </div>
                        <div className="welcome-logo1">
                            <div className="image-block">
                                <iframe className="embed-responsive-item"
                                        src="https://www.youtube.com/embed/Cg_GW7yhq20?playlist=Cg_GW7yhq20,FoRku07ShZM,XMcab1MFaLc,5JtV8B_z7uo,QWF9mGtjju4,JuuuXWzg8ZI&loop=1"
                                    /* width="272" height="150"*/   title="Natural Beautiful Green Video"


                                        allowFullScreen></iframe>
                            </div>
                        </div>
                        <div className="welcome-logo1">
                            <div className="image-block">
                                <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/RzVvThhjAKw"
                                    /*width="350" height="155"*/
                                        allowFullScreen></iframe>
                            </div>
                        </div>
                        <div className="welcome-logo1">
                            <div className="image-block">
                                <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/videoseries?list=RDY21kE_LHaOY"
                                    /*width="350" height="155"*/
                                        allowFullScreen></iframe>
                            </div>
                        </div>

                    </div>


                </div>
                </div>
        </section>




            );

            };
            export default YoutubeChannel;