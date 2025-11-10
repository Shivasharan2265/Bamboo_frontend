import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../layout/Header';
import chair from "../assets/bamboo_chair.jpg";
import table from "../assets/bamboo_table.jpg";
import thread from "../assets/bamboo_thead.jpg";
import spoon from "../assets/bamboo_spoon.jpeg";
import HeaderOne from '../layout/Header copy';

const Categories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [imageLoading, setImageLoading] = useState({});

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Fetch categories when component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    // Image Quality Enhancement Functions
    const getHighQualityCategoryImage = (category, index, fallbackImages = [chair, table, thread, spoon]) => {
        // First priority: category image with quality enhancement
        if (category.image && category.image.trim() !== "") {
            return enhanceImageQuality(category.image, 600, 400);
        }
        
        // Second priority: category icon with quality enhancement
        if (category.icon && category.icon.trim() !== "") {
            return enhanceImageQuality(category.icon, 600, 400);
        }
        
        // Fallback to high-quality local images
        return fallbackImages[index % fallbackImages.length];
    };

    const enhanceImageQuality = (url, width = 600, height = 400) => {
        if (!url) return url;
        
        // Cloudinary optimization for maximum quality
        if (url.includes('cloudinary.com')) {
            const parts = url.split('/upload/');
            if (parts.length === 2) {
                return `${parts[0]}/upload/c_fill,w_${width},h_${height},q_auto:best,f_auto,fl_progressive:steep/${parts[1]}`;
            }
        }
        
        // For other CDNs or direct URLs, return as is
        return url;
    };

    // Image loading handlers
    const handleImageLoad = (categoryId) => {
        setImageLoading(prev => ({ ...prev, [categoryId]: false }));
    };

    const handleImageError = (categoryId, index, e) => {
        setImageLoading(prev => ({ ...prev, [categoryId]: false }));
        // Fallback to local high-quality images
        const fallbackImages = [chair, table, thread, spoon];
        e.target.src = fallbackImages[index % fallbackImages.length];
    };

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5055/api/category");
            console.log("✅ Categories API Response:", response.data);

            // Extract categories from the children array
            let categoriesData = [];
            if (response.data && response.data[0] && response.data[0].children) {
                categoriesData = response.data[0].children;
            }

            setCategories(categoriesData);

            // Preload images
            categoriesData.forEach((category, index) => {
                const img = new Image();
                img.src = getHighQualityCategoryImage(category, index);
                setImageLoading(prev => ({ ...prev, [category._id]: true }));
            });

        } catch (error) {
            console.error("❌ Category API Error:", error);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to get category name
    const getCategoryName = (category) => {
        return category?.name?.en || category?.name || 'Category';
    };

    // Helper function to get category description
    const getCategoryDescription = (category) => {
        return category?.description?.en || category?.description || 'Explore our beautiful collection';
    };

    // Get color based on index for variety
    const getCategoryColor = (index) => {
        const colors = [
            { primary: '#E37DCC', secondary: 'rgba(227, 125, 204, 0.1)' },
            { primary: '#7DBA00', secondary: 'rgba(125, 186, 0, 0.1)' },
            { primary: '#57C7C2', secondary: 'rgba(87, 199, 194, 0.1)' },
            { primary: '#E39963', secondary: 'rgba(227, 153, 99, 0.1)' },
            { primary: '#9B6BCC', secondary: 'rgba(155, 107, 204, 0.1)' },
            { primary: '#4A90E2', secondary: 'rgba(74, 144, 226, 0.1)' }
        ];
        return colors[index % colors.length];
    };

    return (
        <div style={{
            width: '100%',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
            marginTop: isMobile ? '70px' : '80px',
            overflowX: 'hidden',
            backgroundColor: '#FFFFFF',
            minHeight: '100vh'
        }}>
            <HeaderOne />

            {/* Hero Section */}
            <section style={{
                padding: isMobile ? '40px 20px' : '80px 50px',
                backgroundColor: '#FAF9F7',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Pattern */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at 20% 80%, rgba(227, 125, 204, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(125, 186, 0, 0.05) 0%, transparent 50%)',
                    zIndex: 0
                }}></div>
                
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <h1 style={{
                        fontSize: isMobile ? '2rem' : '3rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: '15px',
                        lineHeight: '1.1',
                        letterSpacing: '-0.5px'
                    }}>
                        Our Collections
                    </h1>
                    <p style={{
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        color: '#666',
                        lineHeight: '1.6',
                        fontWeight: '300',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Discover our carefully curated bamboo collections, each piece crafted with sustainability and elegance in mind.
                    </p>
                </div>
            </section>

            {/* Categories Grid */}
            <section style={{
                padding: isMobile ? '30px 20px' : '60px 50px',
                backgroundColor: '#FFFFFF'
            }}>
                <div style={{
                    maxWidth: '1300px',
                    margin: '0 auto'
                }}>

                    {loading ? (
                        // Loading State
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: isMobile ? '20px' : '30px'
                        }}>
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} style={{
                                    height: isMobile ? '250px' : '300px',
                                    backgroundColor: '#F8F8F8',
                                    borderRadius: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#E37DCC',
                                    fontSize: '1rem'
                                }}>
                                    Loading...
                                </div>
                            ))}
                        </div>
                    ) : categories.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: isMobile ? '20px' : '30px'
                        }}>
                            {categories.map((category, index) => {
                                const colors = getCategoryColor(index);
                                return (
                                    <div key={category._id}
                                        onClick={() => navigate(`/products?category=${getCategoryName(category).toLowerCase()}`)}
                                        style={{
                                            position: 'relative',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            borderRadius: '15px',
                                            boxShadow: '0 3px 15px rgba(0,0,0,0.08)',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#FFFFFF',
                                            height: isMobile ? '250px' : '300px'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isMobile) {
                                                const img = e.currentTarget.querySelector('img');
                                                const content = e.currentTarget.querySelector('.category-content');
                                                const overlay = e.currentTarget.querySelector('.category-overlay');
                                                if (img) img.style.transform = 'scale(1.05)';
                                                if (content) content.style.transform = 'translateY(-5px)';
                                                if (overlay) overlay.style.opacity = '0.9';
                                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
                                                e.currentTarget.style.transform = 'translateY(-5px)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isMobile) {
                                                const img = e.currentTarget.querySelector('img');
                                                const content = e.currentTarget.querySelector('.category-content');
                                                const overlay = e.currentTarget.querySelector('.category-overlay');
                                                if (img) img.style.transform = 'scale(1)';
                                                if (content) content.style.transform = 'translateY(0)';
                                                if (overlay) overlay.style.opacity = '0.7';
                                                e.currentTarget.style.boxShadow = '0 3px 15px rgba(0,0,0,0.08)';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }
                                        }}>

                                        {/* Category Image */}
                                        <div style={{
                                            position: 'relative',
                                            height: '100%',
                                            overflow: 'hidden'
                                        }}>
                                            {/* Loading State */}
                                            {imageLoading[category._id] && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundColor: '#f8f8f8',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    zIndex: 1,
                                                    borderRadius: '15px'
                                                }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: '10px'
                                                    }}>
                                                        <div style={{
                                                            width: '30px',
                                                            height: '30px',
                                                            border: '2px solid #f0f0f0',
                                                            borderTop: `2px solid ${colors.primary}`,
                                                            borderRadius: '50%',
                                                            animation: 'spin 1s linear infinite'
                                                        }}></div>
                                                        <div style={{
                                                            color: colors.primary,
                                                            fontSize: '12px',
                                                            fontWeight: '500'
                                                        }}>
                                                            Loading...
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* High Quality Image */}
                                            <img
                                                src={getHighQualityCategoryImage(category, index)}
                                                alt={getCategoryName(category)}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    transition: "transform 0.4s ease",
                                                    opacity: imageLoading[category._id] ? 0 : 1,
                                                    imageRendering: "crisp-edges"
                                                }}
                                                onLoad={() => handleImageLoad(category._id)}
                                                onError={(e) => handleImageError(category._id, index, e)}
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="category-overlay" style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '60%',
                                                background: `linear-gradient(to top, ${colors.primary} 0%, transparent 100%)`,
                                                opacity: 0.7,
                                                transition: 'opacity 0.3s ease',
                                                mixBlendMode: 'multiply'
                                            }}></div>

                                            {/* Content */}
                                            <div className="category-content" style={{
                                                position: 'absolute',
                                                bottom: isMobile ? '20px' : '25px',
                                                left: isMobile ? '15px' : '20px',
                                                right: isMobile ? '15px' : '20px',
                                                color: '#FFFFFF',
                                                transition: 'transform 0.3s ease',
                                                zIndex: 2
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-end',
                                                    marginBottom: '8px'
                                                }}>
                                                    <h3 style={{
                                                        fontSize: isMobile ? '1.3rem' : '1.5rem',
                                                        fontWeight: '500',
                                                        margin: '0',
                                                        letterSpacing: '-0.5px',
                                                        textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                                        lineHeight: '1.1'
                                                    }}>
                                                        {getCategoryName(category)}
                                                    </h3>
                                                    <div style={{
                                                        width: '30px',
                                                        height: '30px',
                                                        backgroundColor: '#FFFFFF',
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'transform 0.3s ease',
                                                        flexShrink: 0,
                                                        marginLeft: '10px'
                                                    }}>
                                                        <svg 
                                                            width="16" 
                                                            height="16" 
                                                            viewBox="0 0 24 24" 
                                                            fill="none" 
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            style={{
                                                                color: colors.primary
                                                            }}
                                                        >
                                                            <path 
                                                                d="M5 12H19M19 12L12 5M19 12L12 19" 
                                                                stroke="currentColor" 
                                                                strokeWidth="2" 
                                                                strokeLinecap="round" 
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                                
                                                <p style={{
                                                    fontSize: isMobile ? '0.85rem' : '0.9rem',
                                                    margin: '5px 0 0 0',
                                                    opacity: 0.9,
                                                    textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                                                    lineHeight: '1.3',
                                                    fontWeight: '300',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}>
                                                    {getCategoryDescription(category)}
                                                </p>

                                                {/* Decorative Line */}
                                                <div style={{
                                                    width: '40px',
                                                    height: '2px',
                                                    backgroundColor: '#FFFFFF',
                                                    marginTop: '12px',
                                                    opacity: 0.8
                                                }}></div>
                                            </div>

                                            {/* Corner Accent */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '15px',
                                                right: '15px',
                                                width: '30px',
                                                height: '30px',
                                                borderTop: `2px solid ${colors.primary}`,
                                                borderRight: `2px solid ${colors.primary}`,
                                                opacity: 0.6
                                            }}></div>
                                        </div>

                                        {/* Hover Effect Border */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '8px',
                                            left: '8px',
                                            right: '8px',
                                            bottom: '8px',
                                            border: `1px solid ${colors.primary}`,
                                            borderRadius: '10px',
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease',
                                            pointerEvents: 'none'
                                        }}></div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        // Empty State
                        <div style={{
                            textAlign: 'center',
                            padding: '60px 20px'
                        }}>
                            <div style={{
                                fontSize: '3rem',
                                marginBottom: '15px',
                                opacity: 0.3
                            }}>
                                🎋
                            </div>
                            <h3 style={{
                                fontSize: '1.3rem',
                                fontWeight: '300',
                                color: '#434242',
                                marginBottom: '10px'
                            }}>
                                No Categories Available
                            </h3>
                            <p style={{
                                fontSize: '0.9rem',
                                color: '#666',
                                marginBottom: '25px'
                            }}>
                                We're currently updating our collections. Please check back soon.
                            </p>
                            <button
                                onClick={() => navigate('/products')}
                                style={{
                                    padding: '12px 30px',
                                    backgroundColor: 'transparent',
                                    border: '2px solid #E37DCC',
                                    color: '#E37DCC',
                                    fontSize: '13px',
                                    fontWeight: '400',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    borderRadius: '6px'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#E37DCC';
                                    e.target.style.color = '#FFFFFF';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#E37DCC';
                                }}
                            >
                                Browse All Products
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action Section */}
            {categories.length > 0 && (
                <section style={{
                    padding: isMobile ? '40px 20px' : '60px 50px',
                    backgroundColor: '#FAF9F7',
                    textAlign: 'center'
                }}>
                    <div style={{
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        <h2 style={{
                            fontSize: isMobile ? '1.5rem' : '2rem',
                            fontWeight: '300',
                            color: '#434242',
                            marginBottom: '15px'
                        }}>
                            Can't Find What You're Looking For?
                        </h2>
                        <p style={{
                            fontSize: isMobile ? '1rem' : '1.1rem',
                            color: '#666',
                            lineHeight: '1.6',
                            marginBottom: '30px'
                        }}>
                            Explore our complete product catalog or contact us for custom bamboo solutions tailored to your needs.
                        </p>
                        <div style={{
                            display: 'flex',
                            gap: '15px',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <button
                                onClick={() => navigate('/products')}
                                style={{
                                    padding: '12px 30px',
                                    backgroundColor: '#7DBA00',
                                    border: 'none',
                                    color: '#FFFFFF',
                                    fontSize: '13px',
                                    fontWeight: '400',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    borderRadius: '6px'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#6aa300';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#7DBA00';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                View All Products
                            </button>
                            <button
                                onClick={() => navigate('/contact')}
                                style={{
                                    padding: '12px 30px',
                                    backgroundColor: 'transparent',
                                    border: '2px solid #434242',
                                    color: '#434242',
                                    fontSize: '13px',
                                    fontWeight: '400',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    borderRadius: '6px'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#434242';
                                    e.target.style.color = '#FFFFFF';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#434242';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                Contact Us
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Add CSS for spinner animation */}
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default Categories;