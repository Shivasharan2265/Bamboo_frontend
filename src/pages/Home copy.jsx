import React, { useState, useEffect, useRef } from 'react';
import video from "../assets/bamboo.mp4";
import logo from "../assets/bambootable.jpg";
import natural from "../assets/naturalbamboo.jpg";

import chair from "../assets/bamboo_chair.jpg";

import table from "../assets/bamboo_table.jpg";
import thread from "../assets/bamboo_thead.jpg";
import spoon from "../assets/bamboo_spoon.jpeg";
import Header from '../layout/Header';
import { useNavigate } from 'react-router-dom';
import image from "../assets/generated-image.png"


// dweferferferf

const Home = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isSoundOn, setIsSoundOn] = useState(false);
    const videoRef = useRef(null);
    const navigate = useNavigate()
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSound = () => {
        if (videoRef.current) {
            if (isSoundOn) {
                videoRef.current.muted = true;
            } else {
                videoRef.current.muted = false;
            }
            setIsSoundOn(!isSoundOn);
        }
    };

    return (
        <div style={{
            width: '100%',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
            margin: 0,
            overflowX: 'hidden'
        }}>
            <Header />
            {/* Full Page Hero Video with Overlay */}
            <div style={{
                width: '100%',
                height: '100vh',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Video Background */}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: 'translate(-50%, -50%) scale(1.1)',
                        transition: 'transform 0.8s ease'
                    }}
                >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Dark Overlay for better text readability */}
                {/* <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    
                    <div style={{
                        textAlign: 'center',
                        color: '#FFFFFF',
                        padding: '0 20px'
                    }}>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: '300',
                            letterSpacing: '3px',
                            marginBottom: '20px',
                            textTransform: 'uppercase',
                            opacity: 0,
                            animation: 'fadeInUp 1s ease 0.5s forwards'
                        }}>
                            Sustainable Bamboo Design
                        </h1>
                        <p style={{
                            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                            fontWeight: '300',
                            letterSpacing: '1px',
                            maxWidth: '600px',
                            margin: '0 auto',
                            opacity: 0,
                            animation: 'fadeInUp 1s ease 1s forwards'
                        }}>
                            Crafting harmony between modern living and natural beauty
                        </p>
                        
                      
                        <div style={{
                            position: 'absolute',
                            bottom: '40px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            opacity: 0,
                            animation: 'fadeIn 1s ease 2s forwards'
                        }}>
                            <div style={{
                                width: '20px',
                                height: '35px',
                                border: '2px solid #FFFFFF',
                                borderRadius: '15px',
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: '4px',
                                    height: '8px',
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: '2px',
                                    position: 'absolute',
                                    top: '8px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    animation: 'scrollBounce 2s infinite'
                                }}></div>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Sound Toggle Button - Bottom Right */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '30px',
                        right: '30px',
                        zIndex: 10,
                        cursor: 'pointer',
                        padding: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50px',
                        height: '50px'
                    }}
                    onClick={toggleSound}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                        e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    {isSoundOn ? (
                        // Sound On Icon
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11 5L6 9H2V15H6L11 19V5Z"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 11.995C17.004 13.3208 16.4774 14.5924 15.54 15.53"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ) : (
                        // Sound Off Icon
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11 5L6 9H2V15H6L11 19V5Z"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M23 9L17 15"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M17 9L23 15"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </div>
            </div>

            {/* Content Section with Logo and Text */}
            <section style={{
                padding: '60px 50px',
                backgroundColor: '#FFFFFF',
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    maxWidth: '1400px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '80px',
                    flexWrap: 'wrap'
                }}>
                    {/* Big Logo with decorative elements */}
                    <div style={{
                        flex: '1',
                        minWidth: '300px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'relative',
                            padding: '40px'
                        }}>
                            {/* Decorative circle */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '350px',
                                height: '350px',

                                zIndex: 0
                            }}></div>

                            <img
                                src={logo}
                                alt="Doobamboo Logo"
                                style={{
                                    maxWidth: '400px',
                                    width: '100%',
                                    borderRadius: '10px',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    position: 'relative',
                                    zIndex: 1,
                                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
                                }}
                            />
                        </div>
                    </div>

                    {/* Content on Right */}
                    <div style={{
                        flex: '1',
                        minWidth: '300px',
                        padding: '0'
                    }}>
                        <div style={{
                            fontSize: '18px',
                            lineHeight: '1.8',
                            color: '#434242',
                            fontWeight: '300',
                            maxWidth: '500px'
                        }}>
                            <h2 style={{
                                fontSize: '2rem',
                                fontWeight: '300',
                                color: '#E39963',
                                marginBottom: '30px',
                                position: 'relative'
                            }}>
                                Our Philosophy
                                <span style={{
                                    position: 'absolute',
                                    bottom: '-10px',
                                    left: 0,
                                    width: '60px',
                                    height: '2px',
                                    backgroundColor: '#FCD647'
                                }}></span>
                            </h2>

                            <p style={{
                                marginBottom: '30px',
                                paddingLeft: '20px',
                                borderLeft: '3px solid #E37DCC'
                            }}>
                                Doobamboo designs furniture and accessories made from
                                bamboo, blending functional design with a deep connection
                                to nature. Each piece is crafted to bring harmony, beauty,
                                and balance into everyday living spaces.
                            </p>
                            <p style={{
                                marginBottom: '30px',
                                paddingLeft: '20px',
                                borderLeft: '3px solid #7DBA00'
                            }}>
                                With a sustainable and artisanal approach, the brand celebrates
                                bamboo as a renewable, durable material that supports mindful,
                                modern lifestyles.
                            </p>
                            <p style={{
                                paddingLeft: '20px',
                                borderLeft: '3px solid #57C7C2'
                            }}>
                                Doobamboo products invite people to live with intention
                                —choosing objects that not only enhance their homes,
                                but also tell a story of respect, simplicity, and well-being.
                            </p>

                            {/* Call to Action Button */}
                            <button 
                            onClick={() => navigate("/products")}
                            style={{
                                marginTop: '40px',
                                padding: '15px 40px',
                                backgroundColor: 'transparent',
                                border: '2px solid #7DBA00',
                                color: '#7DBA00',
                                fontSize: '16px',
                                fontWeight: '400',
                                letterSpacing: '1px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase'
                            }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#7DBA00';
                                    e.target.style.color = '#FFFFFF';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#7DBA00';
                                }}>
                                Discover Our Collection
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            <section style={{
                padding: isMobile ? '60px 20px' : '100px 50px',
                backgroundColor: '#FFFFFF'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#E39963',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        marginBottom: '20px'
                    }}>
                        The Process
                    </div>
                    <h2 style={{
                        fontSize: isMobile ? '2rem' : '2.5rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: '60px'
                    }}>
                        Masterful Craftsmanship
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                        gap: '30px'
                    }}>
                        {[
                            {
                                step: '01',
                                title: 'Sustainable Harvesting',
                                description: 'Bamboo is carefully selected from managed forests'
                            },
                            {
                                step: '02',
                                title: 'Artisan Treatment',
                                description: 'Traditional techniques meet modern precision'
                            },
                            {
                                step: '03',
                                title: 'Eco-Friendly Finishing',
                                description: 'Natural oils and waxes for lasting protection'
                            },
                            {
                                step: '04',
                                title: 'Quality Assurance',
                                description: 'Every piece inspected for perfection'
                            }
                        ].map((process, index) => (
                            <div key={index} style={{
                                padding: '40px 30px',
                                backgroundColor: '#F2EDE8',
                                borderRadius: '15px',
                                position: 'relative',
                                transition: 'transform 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(-10px)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }
                                }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    left: '30px',
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: '#E39963',
                                    color: '#FFFFFF',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '16px',
                                    fontWeight: '600'
                                }}>
                                    {process.step}
                                </div>
                                <h3 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: '400',
                                    color: '#434242',
                                    marginBottom: '15px',
                                    marginTop: '10px'
                                }}>
                                    {process.title}
                                </h3>
                                <p style={{
                                    fontSize: '15px',
                                    color: '#666',
                                    lineHeight: '1.6'
                                }}>
                                    {process.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div style={{
                width: '100%',
                height: '400px',
                overflow: 'hidden'
            }}>
                <img
                    src={natural}
                    alt="Natural Bamboo"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />
            </div>



            {/* Product Description Section */}
            <div style={{
                padding: '80px 50px',
                backgroundColor: '#F2EDE8',
                textAlign: 'center'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <p style={{
                        fontSize: '20px',
                        lineHeight: '1.8',
                        color: '#434242',
                        fontWeight: '300',
                        margin: 0
                    }}>
                        At DooBamboo, we craft exquisite furniture and home accessories from sustainably sourced bamboo.
                        Our collection includes elegant tables, chairs, shelving units, and decorative items that blend
                        modern design with natural beauty. This ecommerce platform brings you closer to sustainable living
                        by offering carefully curated bamboo products that are not only environmentally friendly but also
                        durable, stylish, and perfect for conscious homeowners seeking to create harmonious living spaces.
                    </p>
                </div>
            </div>

            {/* Categories Section - LV Inspired */}
            <section style={{
                padding: '50px',
                backgroundColor: '#FFFFFF',
                minHeight: '60vh'
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: '60px',
                        textAlign: 'center',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                    }}>
                        Our Collections
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '30px'
                    }}>
                        {[
                            {
                                title: 'Chairs',
                                image: chair,
                                description: 'Elegant seating solutions'
                            },
                            {
                                title: 'Tables',
                                image: table,
                                description: 'Modern dining and coffee tables'
                            },
                            {
                                title: 'Accessories',
                                image: thread,
                                description: 'Decorative bamboo items'
                            }
                        ].map((category, index) => (
                            <div key={index} style={{
                                position: 'relative',
                                overflow: 'hidden',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => {
                                    const img = e.currentTarget.querySelector('img');
                                    const overlay = e.currentTarget.querySelector('.category-overlay');
                                    const content = e.currentTarget.querySelector('.category-content');
                                    const vintage = e.currentTarget.querySelector('.vintage-effect');
                                    if (img) img.style.transform = 'scale(1.05)';
                                    if (overlay) overlay.style.backgroundColor = 'rgba(0,0,0,0.3)';
                                    if (content) content.style.transform = 'translateY(-10px)';
                                    if (vintage) vintage.style.opacity = '0.8';
                                }}
                                onMouseLeave={(e) => {
                                    const img = e.currentTarget.querySelector('img');
                                    const overlay = e.currentTarget.querySelector('.category-overlay');
                                    const content = e.currentTarget.querySelector('.category-content');
                                    const vintage = e.currentTarget.querySelector('.vintage-effect');
                                    if (img) img.style.transform = 'scale(1)';
                                    if (overlay) overlay.style.backgroundColor = 'rgba(0,0,0,0.1)';
                                    if (content) content.style.transform = 'translateY(0)';
                                    if (vintage) vintage.style.opacity = '0.6';
                                }}>

                                <div style={{
                                    position: 'relative',
                                    height: '500px',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.6s ease'
                                        }}
                                    />

                                    {/* Vintage Effect Overlay */}
                                    <div className="vintage-effect" style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '60%',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                                        opacity: 0.6,
                                        transition: 'opacity 0.3s ease'
                                    }}></div>

                                    <div className="category-overlay" style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'rgba(0,0,0,0.1)',
                                        transition: 'background-color 0.3s ease'
                                    }}></div>

                                    <div className="category-content" style={{
                                        position: 'absolute',
                                        bottom: '40px',
                                        left: '30px',
                                        color: '#FFFFFF',
                                        transition: 'transform 0.3s ease',
                                        zIndex: 2
                                    }}>
                                        <h3 style={{
                                            fontSize: '1.5rem',
                                            fontWeight: '400',
                                            margin: '0 0 8px 0',
                                            letterSpacing: '1px',
                                            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                                        }}>
                                            {category.title}
                                        </h3>
                                        <p style={{
                                            fontSize: '0.9rem',
                                            margin: 0,
                                            opacity: 0.9,
                                            letterSpacing: '0.5px',
                                            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                                        }}>
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bring It Home Description */}
            <section style={{
                padding: '80px 50px',
                backgroundColor: '#F2EDE8',
                textAlign: 'center'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <h2 style={{
                        fontSize: '2.2rem',
                        fontWeight: '300',
                        color: '#E39963',
                        marginBottom: '30px',
                        marginTop: 0,
                        letterSpacing: '1px'
                    }}>
                        Bring It Home
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        lineHeight: '1.8',
                        color: '#434242',
                        fontWeight: '300',
                        margin: 0
                    }}>
                        Transform your living space with our exquisite bamboo collection. Each piece is carefully crafted
                        to bring the beauty of nature into your home while maintaining the highest standards of quality
                        and sustainability. Experience the perfect blend of modern design and natural elegance.
                    </p>
                </div>
            </section>

            {/* Products Section - LV Inspired */}
            <section style={{
                padding: '100px 50px',
                backgroundColor: '#FFFFFF',
                minHeight: '60vh'
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    <h2 style={{
                        fontSize: '1.8rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: '60px',
                        textAlign: 'center',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                    }}>
                        Featured Products
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '40px'
                    }}>
                        {[
                            {
                                name: 'Bamboo Lounge Chair',
                                price: '$299',
                                image: chair,
                                description: 'Elegant seating with natural curves'
                            },
                            {
                                name: 'Bamboo Dining Table',
                                price: '$599',
                                image: table,
                                description: 'Modern table for family gatherings'
                            },
                            {
                                name: 'Bamboo Thread Set',
                                price: '$89',
                                image: thread,
                                description: 'Handcrafted decorative threads'
                            },
                            {
                                name: 'Bamboo Utensil Set',
                                price: '$49',
                                image: spoon,
                                description: 'Eco-friendly kitchen essentials'
                            }
                        ].map((product, index) => (
                            <div key={index} style={{
                                position: 'relative',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => {
                                    const img = e.currentTarget.querySelector('img');
                                    const overlay = e.currentTarget.querySelector('.product-overlay');
                                    if (img) img.style.transform = 'scale(1.05)';
                                    if (overlay) overlay.style.opacity = '1';
                                }}
                                onMouseLeave={(e) => {
                                    const img = e.currentTarget.querySelector('img');
                                    const overlay = e.currentTarget.querySelector('.product-overlay');
                                    if (img) img.style.transform = 'scale(1)';
                                    if (overlay) overlay.style.opacity = '0';
                                }}>
                                {/* Product Image */}
                                <div style={{
                                    position: 'relative',
                                    height: '400px',
                                    overflow: 'hidden',
                                    marginBottom: '20px'
                                }}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.4s ease'
                                        }}
                                    />
                                    {/* Hover Overlay */}
                                    <div className="product-overlay" style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'rgba(0,0,0,0.05)',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease'
                                    }}></div>
                                </div>

                                {/* Product Info */}
                                <div style={{
                                    textAlign: 'center',
                                    padding: '0 10px'
                                }}>
                                    <h3 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '400',
                                        color: '#434242',
                                        margin: '0 0 8px 0',
                                        letterSpacing: '0.5px',
                                        lineHeight: '1.4'
                                    }}>
                                        {product.name}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: '#434242',
                                        margin: '0 0 12px 0',
                                        opacity: 0.7,
                                        lineHeight: '1.4',
                                        minHeight: '40px'
                                    }}>
                                        {product.description}
                                    </p>
                                    <div style={{
                                        fontSize: '1rem',
                                        fontWeight: '400',
                                        color: '#E39963',
                                        letterSpacing: '0.5px'
                                    }}>
                                        {product.price}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <div style={{
                        textAlign: 'center',
                        marginTop: '60px'
                    }}>
                        <button
                            onClick={() => navigate("/products")}
                            style={{
                                padding: '15px 40px',
                                backgroundColor: 'transparent',
                                border: '1px solid #434242',
                                color: '#434242',
                                fontSize: '14px',
                                fontWeight: '400',
                                letterSpacing: '1px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#434242';
                                e.target.style.color = '#FFFFFF';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#434242';
                            }}>
                            View All Products
                        </button>
                    </div>
                </div>
            </section>

            <section style={{
                padding: isMobile ? '60px 20px' : '100px 50px',
                backgroundColor: '#FAF9F7',
                position: 'relative'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '60px',
                    alignItems: 'center'
                }}>
                    {/* Content */}
                    <div>
                        <div style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#E39963',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            marginBottom: '20px'
                        }}>
                            Our Commitment
                        </div>
                        <h2 style={{
                            fontSize: isMobile ? '2rem' : '2.8rem',
                            fontWeight: '300',
                            color: '#434242',
                            lineHeight: '1.2',
                            marginBottom: '30px'
                        }}>
                            Crafting Sustainable<br />Elegance
                        </h2>
                        <p style={{
                            fontSize: '18px',
                            lineHeight: '1.8',
                            color: '#666',
                            marginBottom: '40px'
                        }}>
                            Each bamboo piece in our collection tells a story of environmental stewardship
                            and artisanal excellence. We partner with sustainable farms and master craftsmen
                            to bring you furniture that's not just beautiful, but built to last generations.
                        </p>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '30px'
                        }}>
                            {[
                                { number: '5+', label: 'Years Warranty' },
                                { number: '100%', label: 'Natural Materials' },
                                { number: '0%', label: 'Chemical Treatment' },
                                { number: '24/7', label: 'Customer Support' }
                            ].map((stat, index) => (
                                <div key={index} style={{

                                }}>
                                    <div style={{
                                        fontSize: '2rem',
                                        fontWeight: '300',
                                        color: '#E39963',
                                        marginBottom: '8px',

                                    }}>
                                        {stat.number}
                                    </div>
                                    <div style={{
                                        fontSize: '14px',
                                        color: '#666',
                                        fontWeight: '500'
                                    }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div style={{
                        position: 'relative'
                    }}>
                        <img
                            src={image}
                            alt="Sustainable Bamboo Craftsmanship"
                            style={{
                                width: '100%',
                                height: isMobile ? '300px' : '500px',
                                objectFit: 'cover',
                                borderRadius: '15px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '-20px',
                            right: '-20px',
                            width: '120px',
                            height: '120px',
                            backgroundColor: '#E39963',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            fontSize: '14px',
                            fontWeight: '500',
                            textAlign: 'center',
                            padding: '20px',
                            boxShadow: '0 10px 30px rgba(227, 153, 99, 0.3)'
                        }}>
                            Eco-Friendly Since 2020
                        </div>
                    </div>
                </div>
            </section>



            {/* Global Styles */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes scrollBounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateX(-50%) translateY(0);
                    }
                    40% {
                        transform: translateX(-50%) translateY(5px);
                    }
                    60% {
                        transform: translateX(-50%) translateY(3px);
                    }
                }
            `}</style>
        </div>
    );
};

export default Home;