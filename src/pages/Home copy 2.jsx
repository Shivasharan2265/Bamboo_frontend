import React, { useState, useEffect, useRef } from 'react';
import video from "../assets/bamboo.mp4";
import logo from "../assets/bambootable.jpg";
import natural from "../assets/naturalbamboo.jpg";
import chair from "../assets/bamboo_chair.jpg";
import table from "../assets/bamboo_table.jpg";
import thread from "../assets/bamboo_thead.jpg";
import spoon from "../assets/bamboo_spoon.jpeg";
import Header from '../layout/Header';
import HeaderOne from '../layout/Header copy';
import stick from "../assets/bamboostick.png"
import { useNavigate } from 'react-router-dom';
import image from "../assets/generated-image.png"
import axios from 'axios';
import Loader from './Loader';

const Home = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isSoundOn, setIsSoundOn] = useState(false);
    const videoRef = useRef(null);
    const navigate = useNavigate()
    const [isMobile, setIsMobile] = useState(false);

    // New states for API data
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', checkMobile);

        // Initial check
        checkMobile();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkMobile);
        };
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

const fetchCategories = async () => {
    try {
        setLoading(true);
        const response = await axios.get(`https://bamboo-backend.onrender.com/api/category`);
        if (response.data && response.data[0] && response.data[0].children) {
            setCategories(response.data[0].children);
        } else {
            setCategories([]);
        }
    } catch (error) {
        console.error("❌ Category API Error:", error);
        setCategories([]);
    } finally {
        setLoading(false);
    }
};

const fetchProducts = async () => {
    try {
        setLoading(true);
        const page = 1;
        const limit = 8;
         const response = await axios.get(`https://bamboo-backend.onrender.com/api/products`, {
            params: { page, limit },
        });
        if (response.data && response.data.products) {
            setProducts(response.data.products);
        } else {
            setProducts([]);
        }
    } catch (error) {
        console.error("❌ Products API Error:", error);
        setProducts([]);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        await Promise.all([fetchCategories(), fetchProducts()]);
        setLoading(false);
    };
    fetchData();
}, []);


    // Helper function to get category name
    const getCategoryName = (category) => {
        return category?.name?.en || category?.name || 'Category';
    };

    // Helper function to get product name
    const getProductName = (product) => {
        return product?.title?.en || product?.title || 'Product';
    };

    // Helper function to get product description
    const getProductDescription = (product) => {
        return product?.description?.en || product?.description || 'Product description';
    };

    // Helper function to get product price
    const getProductPrice = (product) => {
        return product?.prices?.price || product?.prices?.originalPrice || 0;
    };

    // Helper function to get product image
    const getProductImage = (product) => {
        if (Array.isArray(product.image) && product.image.length > 0) {
            return product.image[0];
        } else if (product.image) {
            return product.image;
        }
        return chair; // fallback image
    };

    // Helper function to format price
    const formatPrice = (price) => {
        if (!price) return '$0';
        return `$${parseFloat(price).toFixed(2)}`;
    };

    // Add these helper functions at the top of your component
const getHighQualityCategoryImage = (category, index, fallbackImages = [chair, table, thread]) => {
  // If category has a proper image URL (not icon), use it with quality enhancements
  if (category.image && category.image.trim() !== "") {
    return enhanceImageQuality(category.image);
  }
  
  // If icon exists but might be low quality, try to enhance it
  if (category.icon && category.icon.trim() !== "") {
    return enhanceImageQuality(category.icon);
  }
  
  // Use high-quality fallback images
  return fallbackImages[index] || fallbackImages[0];
};

const enhanceImageQuality = (url, width = 800, height = 600) => {
  if (!url) return url;
  
  // Cloudinary optimization
  if (url.includes('cloudinary.com')) {
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      return `${parts[0]}/upload/c_fill,w_${width},h_${height},q_auto:best,f_auto,fl_progressive/${parts[1]}`;
    }
  }
  
  // For other image URLs, you might want to add your own CDN transformations
  return url;
};

// Ultra high quality settings for critical images
const getUltraHighQualityImage = (url) => {
  if (!url) return url;
  
  if (url.includes('cloudinary.com')) {
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      // Maximum quality with multiple optimizations
      return `${parts[0]}/upload/c_fill,w_1600,h_1200,q_100,f_auto,fl_progressive:steep/${parts[1]}`;
    }
  }
  
  return url;
};


  // Show full page loader while loading
if (loading) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#fff',
        position: 'relative',
      }}
    >
      <HeaderOne />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {/* Stick image on left */}
        {/* <img
          src={stick}
          alt="bamboo stick"
          style={{
            height: '70px',
            width: 'auto',
            objectFit: 'contain',
            
          }}
        /> */}

        {/* Colorful loader */}
        <div className="loader"></div>
      </div>

      <style>
        {`
          .loader {
            --c1: no-repeat linear-gradient(#E37DCC 0 0);
            --c2: no-repeat linear-gradient(#7DBA00 0 0);
            --c3: no-repeat linear-gradient(#57C7C2 0 0);
            --c4: no-repeat linear-gradient(#FCD647 0 0);
            --c5: no-repeat linear-gradient(#E39963 0 0);
            background:
              var(--c1), var(--c2), var(--c3),
              var(--c4), var(--c5), var(--c1),
              var(--c2), var(--c3), var(--c4);
            background-size: 16px 16px;
            animation:
              l32-1 1s infinite,
              l32-2 1s infinite;
          }

          @keyframes l32-1 {
            0%, 100% { width: 45px; height: 45px; }
            35%, 65% { width: 65px; height: 65px; }
          }

          @keyframes l32-2 {
            0%, 40% {
              background-position:
                0 0, 0 50%, 0 100%,
                50% 100%, 100% 100%,
                100% 50%, 100% 0,
                50% 0, 50% 50%;
            }
            60%, 100% {
              background-position:
                0 50%, 0 100%, 50% 100%,
                100% 100%, 100% 50%,
                100% 0, 50% 0,
                0 0, 50% 50%;
            }
          }

          /* Bamboo stick floating effect */
        
        `}
      </style>
    </div>
  );
}



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

                {/* Sound Toggle Button - Bottom Right */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: isMobile ? '20px' : '30px',
                        right: isMobile ? '20px' : '30px',
                        zIndex: 10,
                        cursor: 'pointer',
                        padding: isMobile ? '10px' : '12px',
                        backgroundColor: 'rgba(227, 125, 204, 0.2)',
                        borderRadius: '50%',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(227, 125, 204, 0.3)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: isMobile ? '45px' : '50px',
                        height: isMobile ? '45px' : '50px'
                    }}
                    onClick={toggleSound}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(227, 125, 204, 0.3)';
                        e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(227, 125, 204, 0.2)';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    {isSoundOn ? (
                        // Sound On Icon
                        <svg
                            width={isMobile ? "20" : "24"}
                            height={isMobile ? "20" : "24"}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11 5L6 9H2V15H6L11 19V5Z"
                                stroke="#E37DCC"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07"
                                stroke="#E37DCC"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 11.995C17.004 13.3208 16.4774 14.5924 15.54 15.53"
                                stroke="#E37DCC"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ) : (
                        // Sound Off Icon
                        <svg
                            width={isMobile ? "20" : "24"}
                            height={isMobile ? "20" : "24"}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11 5L6 9H2V15H6L11 19V5Z"
                                stroke="#E37DCC"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M23 9L17 15"
                                stroke="#E37DCC"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M17 9L23 15"
                                stroke="#E37DCC"
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
                padding: isMobile ? '40px 20px' : '60px 50px',
                backgroundColor: '#FFFFFF',
                minHeight: isMobile ? 'auto' : '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    maxWidth: '1400px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: isMobile ? '40px' : '80px',
                    flexWrap: 'wrap',
                    flexDirection: isMobile ? 'column' : 'row'
                }}>
                    {/* Big Logo with decorative elements */}
                    <div style={{
                        flex: '1',
                        minWidth: isMobile ? 'auto' : '300px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'relative',
                            padding: isMobile ? '20px' : '40px'
                        }}>
                            {/* Decorative circle */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: isMobile ? '250px' : '350px',
                                height: isMobile ? '250px' : '350px',
                                background: 'radial-gradient(circle, rgba(227,125,204,0.1) 0%, rgba(125,186,0,0.05) 50%, rgba(87,199,194,0.1) 100%)',
                                borderRadius: '50%',
                                zIndex: 0
                            }}></div>

                            <img
                                src={logo}
                                alt="Doobamboo Logo"
                                style={{
                                    maxWidth: isMobile ? '300px' : '400px',
                                    width: '100%',
                                    borderRadius: '10px',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    position: 'relative',
                                    zIndex: 1,
                                    filter: 'drop-shadow(0 10px 20px rgba(227,125,204,0.1))'
                                }}
                            />
                        </div>
                    </div>

                    {/* Content on Right */}
                    <div style={{
                        flex: '1',
                        minWidth: isMobile ? 'auto' : '300px',
                        padding: '0'
                    }}>
                        <div style={{
                            fontSize: isMobile ? '16px' : '18px',
                            lineHeight: '1.8',
                            color: '#434242',
                            fontWeight: '300',
                            maxWidth: '500px',
                            textAlign: isMobile ? 'center' : 'left'
                        }}>
                            <h2 style={{
                                fontSize: isMobile ? '1.5rem' : '2rem',
                                fontWeight: '300',
                                color: '#E37DCC',
                                marginBottom: '30px',
                                position: 'relative'
                            }}>
                                Our Philosophy
                                <span style={{
                                    position: 'absolute',
                                    bottom: '-10px',
                                    left: isMobile ? '50%' : '0',
                                    transform: isMobile ? 'translateX(-50%)' : 'none',
                                    width: '60px',
                                    height: '2px',
                                    backgroundColor: '#7DBA00'
                                }}></span>
                            </h2>

                            <p style={{
                                marginBottom: '30px',
                                paddingLeft: isMobile ? '0' : '20px',
                                borderLeft: isMobile ? 'none' : '3px solid #E37DCC',
                                textAlign: isMobile ? 'center' : 'left'
                            }}>
                                Doobamboo designs furniture and accessories made from
                                bamboo, blending functional design with a deep connection
                                to nature. Each piece is crafted to bring harmony, beauty,
                                and balance into everyday living spaces.
                            </p>
                            <p style={{
                                marginBottom: '30px',
                                paddingLeft: isMobile ? '0' : '20px',
                                borderLeft: isMobile ? 'none' : '3px solid #7DBA00',
                                textAlign: isMobile ? 'center' : 'left'
                            }}>
                                With a sustainable and artisanal approach, the brand celebrates
                                bamboo as a renewable, durable material that supports mindful,
                                modern lifestyles.
                            </p>
                            <p style={{
                                paddingLeft: isMobile ? '0' : '20px',
                                borderLeft: isMobile ? 'none' : '3px solid #57C7C2',
                                textAlign: isMobile ? 'center' : 'left'
                            }}>
                                Doobamboo products invite people to live with intention
                                —choosing objects that not only enhance their homes,
                                but also tell a story of respect, simplicity, and well-being.
                            </p>

                            {/* Call to Action Button */}
                            <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                                <button
                                    onClick={() => navigate("/products")}
                                    style={{
                                        marginTop: '40px',
                                        padding: isMobile ? '12px 30px' : '15px 40px',
                                        backgroundColor: 'transparent',
                                        border: '2px solid #7DBA00',
                                        color: '#7DBA00',
                                        fontSize: isMobile ? '14px' : '16px',
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
                </div>
            </section>

            {/* Process Section */}
            <section style={{
                padding: isMobile ? '40px 20px' : '100px 50px',
                backgroundColor: '#FFFFFF'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: isMobile ? '12px' : '14px',
                        fontWeight: '500',
                        color: '#E37DCC',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        marginBottom: '20px'
                    }}>
                        The Process
                    </div>
                    <h2 style={{
                        fontSize: isMobile ? '1.5rem' : '2.5rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: isMobile ? '40px' : '60px'
                    }}>
                        Masterful Craftsmanship
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                        gap: isMobile ? '20px' : '30px'
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
                                padding: isMobile ? '30px 20px' : '40px 30px',
                                backgroundColor: '#F8F8F8',
                                borderRadius: '15px',
                                position: 'relative',
                                transition: 'transform 0.3s ease',
                                border: `1px solid ${index === 0 ? '#E37DCC' : index === 1 ? '#7DBA00' : index === 2 ? '#57C7C2' : '#E37DCC'}20`
                            }}
                                onMouseEnter={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(-10px)';
                                        e.currentTarget.style.boxShadow = `0 10px 30px ${index === 0 ? '#E37DCC' : index === 1 ? '#7DBA00' : index === 2 ? '#57C7C2' : '#E37DCC'}20`;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }
                                }}>
                                <div style={{
                                    position: 'absolute',
                                    top: isMobile ? '-15px' : '-20px',
                                    left: isMobile ? '20px' : '30px',
                                    width: isMobile ? '30px' : '40px',
                                    height: isMobile ? '30px' : '40px',
                                    backgroundColor: index === 0 ? '#E37DCC' : index === 1 ? '#7DBA00' : index === 2 ? '#57C7C2' : '#E37DCC',
                                    color: '#FFFFFF',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: isMobile ? '14px' : '16px',
                                    fontWeight: '600'
                                }}>
                                    {process.step}
                                </div>
                                <h3 style={{
                                    fontSize: isMobile ? '1.1rem' : '1.3rem',
                                    fontWeight: '400',
                                    color: '#434242',
                                    marginBottom: '15px',
                                    marginTop: isMobile ? '15px' : '10px'
                                }}>
                                    {process.title}
                                </h3>
                                <p style={{
                                    fontSize: isMobile ? '14px' : '15px',
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

            {/* Natural Bamboo Image */}
            <div style={{
                width: '100%',
                height: isMobile ? '250px' : '400px',
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
                padding: isMobile ? '40px 20px' : '80px 50px',
                backgroundColor: '#F2EDE8',
                textAlign: 'center'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <p style={{
                        fontSize: isMobile ? '16px' : '20px',
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

            {/* Categories Section */}
            <section style={{
                padding: isMobile ? '30px 20px' : '50px',
                backgroundColor: '#FFFFFF',
                minHeight: isMobile ? 'auto' : '60vh'
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.5rem' : '2rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: isMobile ? '40px' : '60px',
                        textAlign: 'center',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                    }}>
                        Our Collections
                    </h2>

                    {loading ? (
                        <div style={{ textAlign: 'center', color: '#E37DCC' }}>
                            Loading categories...
                        </div>
                    ) : categories.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: isMobile ? '20px' : '30px'
                        }}>
                            {categories.slice(0, 3).map((category, index) => (
                                <div key={category._id}
                                    onClick={() => navigate(`/products?category=${getCategoryName(category).toLowerCase()}`)}
                                    style={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isMobile) {
                                            const img = e.currentTarget.querySelector('img');
                                            const overlay = e.currentTarget.querySelector('.category-overlay');
                                            const content = e.currentTarget.querySelector('.category-content');
                                            const vintage = e.currentTarget.querySelector('.vintage-effect');
                                            if (img) img.style.transform = 'scale(1.05)';
                                            if (overlay) overlay.style.backgroundColor = 'rgba(227,125,204,0.1)';
                                            if (content) content.style.transform = 'translateY(-10px)';
                                            if (vintage) vintage.style.opacity = '0.8';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isMobile) {
                                            const img = e.currentTarget.querySelector('img');
                                            const overlay = e.currentTarget.querySelector('.category-overlay');
                                            const content = e.currentTarget.querySelector('.category-content');
                                            const vintage = e.currentTarget.querySelector('.vintage-effect');
                                            if (img) img.style.transform = 'scale(1)';
                                            if (overlay) overlay.style.backgroundColor = 'rgba(125,186,0,0.05)';
                                            if (content) content.style.transform = 'translateY(0)';
                                            if (vintage) vintage.style.opacity = '0.6';
                                        }
                                    }}>

                                    <div style={{
                                        position: 'relative',
                                        height: isMobile ? '300px' : '500px',
                                        overflow: 'hidden'
                                    }}>
                                        {/* Using placeholder images since categories don't have images in API */}
                                        <img
                                            src={
                                                category.icon && category.icon.trim() !== ""
                                                    ? category.icon
                                                    : [chair, table, thread][index] // fallback if icon missing
                                            }
                                            alt={getCategoryName(category)}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                transition: "transform 0.6s ease",
                                            }}
                                        />


                                        {/* Vintage Effect Overlay */}
                                        <div className="vintage-effect" style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '60%',
                                            background: `linear-gradient(to top, ${index === 0 ? 'rgba(227,125,204,0.6)' : index === 1 ? 'rgba(125,186,0,0.6)' : 'rgba(87,199,194,0.6)'} 0%, ${index === 0 ? 'rgba(227,125,204,0.4)' : index === 1 ? 'rgba(125,186,0,0.4)' : 'rgba(87,199,194,0.4)'} 30%, ${index === 0 ? 'rgba(227,125,204,0.2)' : index === 1 ? 'rgba(125,186,0,0.2)' : 'rgba(87,199,194,0.2)'} 60%, transparent 100%)`,
                                            opacity: 0.6,
                                            transition: 'opacity 0.3s ease'
                                        }}></div>

                                        <div className="category-overlay" style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: 'rgba(125,186,0,0.05)',
                                            transition: 'background-color 0.3s ease'
                                        }}></div>

                                        <div className="category-content" style={{
                                            position: 'absolute',
                                            bottom: isMobile ? '20px' : '40px',
                                            left: isMobile ? '20px' : '30px',
                                            color: '#FFFFFF',
                                            transition: 'transform 0.3s ease',
                                            zIndex: 2
                                        }}>
                                            <h3 style={{
                                                fontSize: isMobile ? '1.2rem' : '1.5rem',
                                                fontWeight: '400',
                                                margin: '0 0 8px 0',
                                                letterSpacing: '1px',
                                                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                                            }}>
                                                {getCategoryName(category)}
                                            </h3>
                                            <p style={{
                                                fontSize: isMobile ? '0.8rem' : '0.9rem',
                                                margin: 0,
                                                opacity: 0.9,
                                                letterSpacing: '0.5px',
                                                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                                            }}>
                                                {category.description?.en || 'Explore our collection'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#666' }}>
                            No categories available
                        </div>
                    )}

                         {/* View All Button */}
                    <div style={{
                        textAlign: 'center',
                        marginTop: isMobile ? '40px' : '60px'
                    }}>
                        <button
                            onClick={() => navigate("/categories")}
                            style={{
                                padding: isMobile ? '12px 30px' : '15px 40px',
                                backgroundColor: 'transparent',
                                border: '1px solid #57C7C2',
                                color: '#57C7C2',
                                fontSize: isMobile ? '13px' : '14px',
                                fontWeight: '400',
                                letterSpacing: '1px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#57C7C2';
                                e.target.style.color = '#FFFFFF';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#57C7C2';
                            }}>
                            View All Categories
                        </button>
                    </div>


                </div>
            </section>

            {/* Bring It Home Description */}
            <section style={{
                padding: isMobile ? '40px 20px' : '80px 50px',
                backgroundColor: '#F8F8F8',
                textAlign: 'center'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.5rem' : '2.2rem',
                        fontWeight: '300',
                        color: '#7DBA00',
                        marginBottom: '30px',
                        marginTop: 0,
                        letterSpacing: '1px'
                    }}>
                        Bring It Home
                    </h2>
                    <p style={{
                        fontSize: isMobile ? '16px' : '18px',
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

            {/* Products Section */}
            <section style={{
                padding: isMobile ? '40px 20px' : '100px 50px',
                backgroundColor: '#FFFFFF',
                minHeight: isMobile ? 'auto' : '60vh'
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.5rem' : '1.8rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: isMobile ? '40px' : '60px',
                        textAlign: 'center',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                    }}>
                        Featured Products
                    </h2>

                    {loading ? (
                        <div style={{ textAlign: 'center', color: '#E37DCC' }}>
                            Loading products...
                        </div>
                    ) : products.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                            gap: isMobile ? '25px' : '40px'
                        }}>
                            {products.slice(0, 4).map((product, index) => (
                                <div key={product._id}
                                    onClick={() => navigate(`/product/${product._id}`)}
                                    style={{
                                        position: 'relative',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isMobile) {
                                            const img = e.currentTarget.querySelector('img');
                                            const overlay = e.currentTarget.querySelector('.product-overlay');
                                            if (img) img.style.transform = 'scale(1.05)';
                                            if (overlay) overlay.style.opacity = '1';
                                            if (overlay) overlay.style.backgroundColor = index === 0 ? 'rgba(227,125,204,0.1)' : index === 1 ? 'rgba(125,186,0,0.1)' : index === 2 ? 'rgba(87,199,194,0.1)' : 'rgba(227,125,204,0.1)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isMobile) {
                                            const img = e.currentTarget.querySelector('img');
                                            const overlay = e.currentTarget.querySelector('.product-overlay');
                                            if (img) img.style.transform = 'scale(1)';
                                            if (overlay) overlay.style.opacity = '0';
                                        }
                                    }}
                                >
                                    {/* Product Image */}
                                    <div style={{
                                        position: 'relative',
                                        height: isMobile ? '250px' : '400px',
                                        overflow: 'hidden',
                                        marginBottom: isMobile ? '15px' : '20px'
                                    }}>
                                        <img
                                            src={getProductImage(product)}
                                            alt={getProductName(product)}
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
                                            backgroundColor: 'rgba(87,199,194,0.05)',
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease, background-color 0.3s ease'
                                        }}></div>
                                    </div>

                                    {/* Product Info */}
                                    <div style={{
                                        textAlign: 'center',
                                        padding: '0 10px'
                                    }}>
                                        <h3 style={{
                                            fontSize: isMobile ? '1rem' : '1.1rem',
                                            fontWeight: '400',
                                            color: '#434242',
                                            margin: '0 0 8px 0',
                                            letterSpacing: '0.5px',
                                            lineHeight: '1.4'
                                        }}>
                                            {getProductName(product)}
                                        </h3>
                                        <p style={{
                                            fontSize: isMobile ? '0.8rem' : '0.9rem',
                                            color: '#434242',
                                            margin: '0 0 12px 0',
                                            opacity: 0.7,
                                            lineHeight: '1.4',
                                            minHeight: isMobile ? 'auto' : '40px',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {getProductDescription(product)}
                                        </p>
                                        <div style={{
                                            fontSize: isMobile ? '0.9rem' : '1rem',
                                            fontWeight: '400',
                                            color: index === 0 ? '#E37DCC' : index === 1 ? '#7DBA00' : index === 2 ? '#57C7C2' : '#E37DCC',
                                            letterSpacing: '0.5px'
                                        }}>
                                            {formatPrice(getProductPrice(product))}
                                        </div>
                                        {product.prices?.originalPrice && product.prices.originalPrice !== getProductPrice(product) && (
                                            <div style={{
                                                fontSize: isMobile ? '12px' : '14px',
                                                color: '#434242',
                                                textDecoration: 'line-through',
                                                opacity: 0.6,
                                                marginTop: '2px'
                                            }}>
                                                {formatPrice(product.prices.originalPrice)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#666' }}>
                            No products available
                        </div>
                    )}

                    {/* View All Button */}
                    <div style={{
                        textAlign: 'center',
                        marginTop: isMobile ? '40px' : '60px'
                    }}>
                        <button
                            onClick={() => navigate("/products")}
                            style={{
                                padding: isMobile ? '12px 30px' : '15px 40px',
                                backgroundColor: 'transparent',
                                border: '1px solid #57C7C2',
                                color: '#57C7C2',
                                fontSize: isMobile ? '13px' : '14px',
                                fontWeight: '400',
                                letterSpacing: '1px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#57C7C2';
                                e.target.style.color = '#FFFFFF';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#57C7C2';
                            }}>
                            View All Products
                        </button>
                    </div>
                </div>
            </section>

            {/* Commitment Section */}
            <section style={{
                padding: isMobile ? '40px 20px' : '100px 50px',
                backgroundColor: '#FAF9F7',
                position: 'relative'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: isMobile ? '40px' : '60px',
                    alignItems: 'center'
                }}>
                    {/* Content */}
                    <div>
                        <div style={{
                            fontSize: isMobile ? '12px' : '14px',
                            fontWeight: '500',
                            color: '#E37DCC',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            marginBottom: '20px'
                        }}>
                            Our Commitment
                        </div>
                        <h2 style={{
                            fontSize: isMobile ? '1.5rem' : '2.8rem',
                            fontWeight: '300',
                            color: '#434242',
                            lineHeight: '1.2',
                            marginBottom: '30px'
                        }}>
                            Crafting Sustainable<br />Elegance
                        </h2>
                        <p style={{
                            fontSize: isMobile ? '16px' : '18px',
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
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                            gap: isMobile ? '20px' : '30px'
                        }}>
                            {[
                                { number: '5+', label: 'Years Warranty' },
                                { number: '100%', label: 'Natural Materials' },
                                { number: '0%', label: 'Chemical Treatment' },
                                { number: '24/7', label: 'Customer Support' }
                            ].map((stat, index) => (
                                <div key={index} style={{
                                    textAlign: isMobile ? 'center' : 'left'
                                }}>
                                    <div style={{
                                        fontSize: isMobile ? '1.5rem' : '2rem',
                                        fontWeight: '300',
                                        color: index === 0 ? '#E37DCC' : index === 1 ? '#7DBA00' : index === 2 ? '#57C7C2' : '#E37DCC',
                                        marginBottom: '8px',
                                    }}>
                                        {stat.number}
                                    </div>
                                    <div style={{
                                        fontSize: isMobile ? '13px' : '14px',
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
                                height: isMobile ? '250px' : '500px',
                                objectFit: 'cover',
                                borderRadius: '15px',
                                boxShadow: '0 20px 40px rgba(87,199,194,0.1)'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: isMobile ? '-15px' : '-20px',
                            right: isMobile ? '-15px' : '-20px',
                            width: isMobile ? '100px' : '120px',
                            height: isMobile ? '100px' : '120px',
                            backgroundColor: '#7DBA00',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            fontSize: isMobile ? '12px' : '14px',
                            fontWeight: '500',
                            textAlign: 'center',
                            padding: '15px',
                            boxShadow: '0 10px 30px rgba(125,186,0,0.3)'
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