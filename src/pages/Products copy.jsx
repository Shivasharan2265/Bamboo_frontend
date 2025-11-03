import React, { useState, useEffect } from 'react';
import chair from "../assets/bamboo_chair.jpg";
import table from "../assets/bamboo_table.jpg";
import thread from "../assets/bamboo_thead.jpg";
import spoon from "../assets/bamboo_spoon.jpeg";
import HeaderOne from '../layout/Header copy';
import image from "../assets/generated-image.png"
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Bamboo Lounge Chair',
            price: '$299',
            image: chair,
            description: 'Elegant seating with natural curves',
            category: 'chairs',
            material: 'bamboo',
            featured: true
        },
        {
            id: 2,
            name: 'Bamboo Dining Table',
            price: '$599',
            image: table,
            description: 'Modern table for family gatherings',
            category: 'tables',
            material: 'bamboo',
            featured: true
        },
        {
            id: 3,
            name: 'Bamboo Thread Set',
            price: '$89',
            image: thread,
            description: 'Handcrafted decorative threads',
            category: 'accessories',
            material: 'bamboo',
            featured: false
        },
        {
            id: 4,
            name: 'Bamboo Utensil Set',
            price: '$49',
            image: spoon,
            description: 'Eco-friendly kitchen essentials',
            category: 'accessories',
            material: 'bamboo',
            featured: false
        },
        {
            id: 5,
            name: 'Bamboo Side Table',
            price: '$199',
            image: table,
            description: 'Compact table for small spaces',
            category: 'tables',
            material: 'bamboo',
            featured: false
        },
        {
            id: 6,
            name: 'Bamboo Rocking Chair',
            price: '$399',
            image: chair,
            description: 'Comfortable rocking chair',
            category: 'chairs',
            material: 'bamboo',
            featured: true
        },
        {
            id: 7,
            name: 'Bamboo Cutlery Set',
            price: '$39',
            image: spoon,
            description: 'Sustainable dining utensils',
            category: 'accessories',
            material: 'bamboo',
            featured: false
        },
        {
            id: 8,
            name: 'Bamboo Coffee Table',
            price: '$349',
            image: table,
            description: 'Stylish centerpiece for your living room',
            category: 'tables',
            material: 'bamboo',
            featured: true
        },
         {
            id: 9,
            name: 'Bamboo Rocking Chair',
            price: '$399',
            image: chair,
            description: 'Comfortable rocking chair',
            category: 'chairs',
            material: 'bamboo',
            featured: true
        },
    ]);

    const [filters, setFilters] = useState({
        category: 'all',
        priceRange: 'all',
        material: 'all',
        featured: false
    });

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [isMobile, setIsMobile] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

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

    // Filter products based on selected filters
    useEffect(() => {
        let filtered = products;

        if (filters.category !== 'all') {
            filtered = filtered.filter(product => product.category === filters.category);
        }

        if (filters.priceRange !== 'all') {
            switch (filters.priceRange) {
                case 'under-100':
                    filtered = filtered.filter(product => parseInt(product.price.replace('$', '')) < 100);
                    break;
                case '100-300':
                    filtered = filtered.filter(product => {
                        const price = parseInt(product.price.replace('$', ''));
                        return price >= 100 && price <= 300;
                    });
                    break;
                case '300-500':
                    filtered = filtered.filter(product => {
                        const price = parseInt(product.price.replace('$', ''));
                        return price >= 300 && price <= 500;
                    });
                    break;
                case 'over-500':
                    filtered = filtered.filter(product => parseInt(product.price.replace('$', '')) > 500);
                    break;
                default:
                    break;
            }
        }

        if (filters.material !== 'all') {
            filtered = filtered.filter(product => product.material === filters.material);
        }

        if (filters.featured) {
            filtered = filtered.filter(product => product.featured);
        }

        setFilteredProducts(filtered);
    }, [filters, products]);

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            category: 'all',
            priceRange: 'all',
            material: 'all',
            featured: false
        });
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div style={{
            width: '100%',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
            marginTop: isMobile ? '70px' : '100px',
            overflowX: 'hidden',
            backgroundColor: '#FFFFFF',
            minHeight: '100vh',
            position: 'relative'
        }}>
            <HeaderOne />
           
            {/* Mobile Filter Toggle Button */}
            {isMobile && (
                <div style={{
                    position: 'sticky',
                    top: isMobile ? '70px' : '100px',
                    zIndex: 100,
                    backgroundColor: '#FFFFFF',
                    borderBottom: '1px solid #F2EDE8',
                    padding: '15px 20px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            fontSize: '14px',
                            color: '#434242',
                            opacity: 0.7
                        }}>
                            {filteredProducts.length} products
                        </div>
                        <button
                            onClick={toggleFilters}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#F8F8F8',
                                border: '1px solid #E39963',
                                color: '#E39963',
                                fontSize: '14px',
                                fontWeight: '400',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            Filters
                        </button>
                    </div>
                </div>
            )}

            {/* Mobile Filter Overlay and Sidebar */}
            {isMobile && (
                <>
                    {/* Overlay */}
                    {showFilters && (
                        <div
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                zIndex: 999,
                                transition: 'opacity 0.3s ease'
                            }}
                            onClick={toggleFilters}
                        />
                    )}
                    
                    {/* Filter Sidebar */}
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: 'min(380px, 85vw)',
                        height: '100%',
                        backgroundColor: '#F8F8F8',
                        padding: '30px 25px',
                        zIndex: 1000,
                        transform: showFilters ? 'translateX(0)' : 'translateX(-100%)',
                        transition: 'transform 0.3s ease',
                        overflowY: 'auto',
                        boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
                    }}>
                        {/* Mobile Header */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '25px',
                            paddingBottom: '15px',
                            borderBottom: '1px solid #E0E0E0'
                        }}>
                            <h3 style={{
                                fontSize: '1.3rem',
                                fontWeight: '500',
                                color: '#434242',
                                margin: 0
                            }}>
                                Filters
                            </h3>
                            <button
                                onClick={toggleFilters}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '22px',
                                    color: '#434242',
                                    cursor: 'pointer',
                                    padding: '5px',
                                    width: '35px',
                                    height: '35px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    transition: 'background-color 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = 'rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Clear All Button - Mobile */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '25px'
                        }}>
                            <h3 style={{
                                fontSize: '1.1rem',
                                fontWeight: '400',
                                color: '#434242',
                                margin: 0
                            }}>
                                Filter Products
                            </h3>
                            <button
                                onClick={clearFilters}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: 'transparent',
                                    border: '1px solid #434242',
                                    color: '#434242',
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    borderRadius: '4px'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#434242';
                                    e.target.style.color = '#FFFFFF';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#434242';
                                }}
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div style={{ marginBottom: '25px' }}>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '500',
                                color: '#434242',
                                marginBottom: '15px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Category
                            </h4>
                            {['all', 'chairs', 'tables', 'accessories'].map(category => (
                                <label key={category} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '15px',
                                    cursor: 'pointer',
                                    fontSize: '15px',
                                    color: '#434242',
                                    padding: '10px 0'
                                }}>
                                    <input
                                        type="radio"
                                        name="category"
                                        value={category}
                                        checked={filters.category === category}
                                        onChange={(e) => handleFilterChange('category', e.target.value)}
                                        style={{
                                            marginRight: '12px',
                                            accentColor: '#E39963',
                                            transform: 'scale(1.3)'
                                        }}
                                    />
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </label>
                            ))}
                        </div>

                        {/* Price Range Filter */}
                        <div style={{ marginBottom: '25px' }}>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '500',
                                color: '#434242',
                                marginBottom: '15px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Price Range
                            </h4>
                            {[
                                { value: 'all', label: 'All Prices' },
                                { value: 'under-100', label: 'Under $100' },
                                { value: '100-300', label: '$100 - $300' },
                                { value: '300-500', label: '$300 - $500' },
                                { value: 'over-500', label: 'Over $500' }
                            ].map(range => (
                                <label key={range.value} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '15px',
                                    cursor: 'pointer',
                                    fontSize: '15px',
                                    color: '#434242',
                                    padding: '10px 0'
                                }}>
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        value={range.value}
                                        checked={filters.priceRange === range.value}
                                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                        style={{
                                            marginRight: '12px',
                                            accentColor: '#E39963',
                                            transform: 'scale(1.3)'
                                        }}
                                    />
                                    {range.label}
                                </label>
                            ))}
                        </div>

                        {/* Material Filter */}
                        <div style={{ marginBottom: '25px' }}>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '500',
                                color: '#434242',
                                marginBottom: '15px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Material
                            </h4>
                            {['all', 'bamboo'].map(material => (
                                <label key={material} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '15px',
                                    cursor: 'pointer',
                                    fontSize: '15px',
                                    color: '#434242',
                                    padding: '10px 0'
                                }}>
                                    <input
                                        type="radio"
                                        name="material"
                                        value={material}
                                        checked={filters.material === material}
                                        onChange={(e) => handleFilterChange('material', e.target.value)}
                                        style={{
                                            marginRight: '12px',
                                            accentColor: '#E39963',
                                            transform: 'scale(1.3)'
                                        }}
                                    />
                                    {material.charAt(0).toUpperCase() + material.slice(1)}
                                </label>
                            ))}
                        </div>

                        {/* Featured Filter */}
                        <div style={{ marginBottom: '30px' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                fontSize: '15px',
                                color: '#434242',
                                padding: '10px 0'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={filters.featured}
                                    onChange={(e) => handleFilterChange('featured', e.target.checked)}
                                    style={{
                                        marginRight: '12px',
                                        accentColor: '#E39963',
                                        transform: 'scale(1.3)'
                                    }}
                                />
                                Featured Products Only
                            </label>
                        </div>

                        {/* Mobile Apply Button */}
                        <button
                            onClick={toggleFilters}
                            style={{
                                padding: '18px',
                                backgroundColor: '#E39963',
                                border: 'none',
                                color: '#FFFFFF',
                                fontSize: '16px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                borderRadius: '8px',
                                width: '100%',
                                marginTop: '20px'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#d18a55';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#E39963';
                            }}
                        >
                            Apply Filters
                        </button>
                    </div>
                </>
            )}

            {/* Main Content */}
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: isMobile ? '20px 15px' : '60px 50px',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '30px' : '60px'
            }}>
                {/* Desktop Filters Sidebar */}
                {!isMobile && (
                    <div style={{
                        flex: '0 0 300px',
                        padding: '30px',
                        backgroundColor: '#F8F8F8',
                        borderRadius: '10px',
                        height: 'fit-content',
                        position: 'sticky',
                        top: '120px'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '30px'
                        }}>
                            <h3 style={{
                                fontSize: '1.3rem',
                                fontWeight: '400',
                                color: '#434242',
                                margin: 0
                            }}>
                                Filters
                            </h3>
                            <button
                                onClick={clearFilters}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: 'transparent',
                                    border: '1px solid #434242',
                                    color: '#434242',
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    borderRadius: '4px'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#434242';
                                    e.target.style.color = '#FFFFFF';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#434242';
                                }}
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div style={{ marginBottom: '25px' }}>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '500',
                                color: '#434242',
                                marginBottom: '15px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Category
                            </h4>
                            {['all', 'chairs', 'tables', 'accessories'].map(category => (
                                <label key={category} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '12px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    color: '#434242'
                                }}>
                                    <input
                                        type="radio"
                                        name="category"
                                        value={category}
                                        checked={filters.category === category}
                                        onChange={(e) => handleFilterChange('category', e.target.value)}
                                        style={{
                                            marginRight: '10px',
                                            accentColor: '#E39963'
                                        }}
                                    />
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </label>
                            ))}
                        </div>

                        {/* Price Range Filter */}
                        <div style={{ marginBottom: '25px' }}>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '500',
                                color: '#434242',
                                marginBottom: '15px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Price Range
                            </h4>
                            {[
                                { value: 'all', label: 'All Prices' },
                                { value: 'under-100', label: 'Under $100' },
                                { value: '100-300', label: '$100 - $300' },
                                { value: '300-500', label: '$300 - $500' },
                                { value: 'over-500', label: 'Over $500' }
                            ].map(range => (
                                <label key={range.value} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '12px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    color: '#434242'
                                }}>
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        value={range.value}
                                        checked={filters.priceRange === range.value}
                                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                        style={{
                                            marginRight: '10px',
                                            accentColor: '#E39963'
                                        }}
                                    />
                                    {range.label}
                                </label>
                            ))}
                        </div>

                        {/* Material Filter */}
                        <div style={{ marginBottom: '25px' }}>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '500',
                                color: '#434242',
                                marginBottom: '15px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Material
                            </h4>
                            {['all', 'bamboo'].map(material => (
                                <label key={material} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '12px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    color: '#434242'
                                }}>
                                    <input
                                        type="radio"
                                        name="material"
                                        value={material}
                                        checked={filters.material === material}
                                        onChange={(e) => handleFilterChange('material', e.target.value)}
                                        style={{
                                            marginRight: '10px',
                                            accentColor: '#E39963'
                                        }}
                                    />
                                    {material.charAt(0).toUpperCase() + material.slice(1)}
                                </label>
                            ))}
                        </div>

                        {/* Featured Filter */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: '#434242'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={filters.featured}
                                    onChange={(e) => handleFilterChange('featured', e.target.checked)}
                                    style={{
                                        marginRight: '10px',
                                        accentColor: '#E39963'
                                    }}
                                />
                                Featured Products Only
                            </label>
                        </div>
                    </div>
                )}

                {/* Products Grid */}
                <div style={{ 
                    flex: '1',
                    width: isMobile ? '100%' : 'auto'
                }}>
                    {/* Results Count - Desktop */}
                    {!isMobile && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '40px'
                        }}>
                            <div style={{
                                fontSize: '14px',
                                color: '#434242',
                                opacity: 0.7
                            }}>
                                Showing {filteredProducts.length} of {products.length} products
                            </div>
                        </div>
                    )}

                    {/* Products Grid */}
                    {filteredProducts.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: isMobile ? '25px' : '40px',
                            padding: isMobile ? '10px 0' : '0'
                        }}>
                            {filteredProducts.map(product => (
                                <div key={product.id}
                                onClick={() => navigate(`/product/${product.id}`)}
                                style={{
                                    position: 'relative',
                                    cursor: 'pointer',
                                    border: isMobile ? '1px solid #F2EDE8' : 'none',
                                    borderRadius: isMobile ? '10px' : '0',
                                    padding: isMobile ? '15px' : '0',
                                    backgroundColor: isMobile ? '#FFFFFF' : 'transparent',
                                    boxShadow: isMobile ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'
                                }}
                                    onMouseEnter={(e) => {
                                        if (!isMobile) {
                                            const img = e.currentTarget.querySelector('img');
                                            const overlay = e.currentTarget.querySelector('.product-overlay');
                                            if (img) img.style.transform = 'scale(1.05)';
                                            if (overlay) overlay.style.opacity = '1';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isMobile) {
                                            const img = e.currentTarget.querySelector('img');
                                            const overlay = e.currentTarget.querySelector('.product-overlay');
                                            if (img) img.style.transform = 'scale(1)';
                                            if (overlay) overlay.style.opacity = '0';
                                        }
                                    }}>
                                    {/* Product Image */}
                                    <div style={{
                                        position: 'relative',
                                        height: isMobile ? '250px' : '350px',
                                        overflow: 'hidden',
                                        marginBottom: isMobile ? '15px' : '20px',
                                        borderRadius: isMobile ? '8px' : '0'
                                    }}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: isMobile ? 'none' : 'transform 0.4s ease'
                                            }}
                                        />
                                        {/* Hover Overlay */}
                                        {!isMobile && (
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
                                        )}
                                        
                                        {/* Featured Badge */}
                                        {product.featured && (
                                            <div style={{
                                                position: 'absolute',
                                                top: isMobile ? '10px' : '15px',
                                                right: isMobile ? '10px' : '15px',
                                                backgroundColor: '#E39963',
                                                color: '#FFFFFF',
                                                padding: isMobile ? '4px 8px' : '5px 10px',
                                                fontSize: isMobile ? '10px' : '12px',
                                                fontWeight: '400',
                                                letterSpacing: '0.5px',
                                                borderRadius: '3px'
                                            }}>
                                                Featured
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div style={{
                                        textAlign: isMobile ? 'left' : 'center',
                                        padding: isMobile ? '0' : '0 10px'
                                    }}>
                                        <h3 style={{
                                            fontSize: isMobile ? '1rem' : '1.1rem',
                                            fontWeight: '400',
                                            color: '#434242',
                                            margin: '0 0 8px 0',
                                            letterSpacing: '0.5px',
                                            lineHeight: '1.4'
                                        }}>
                                            {product.name}
                                        </h3>
                                        <p style={{
                                            fontSize: isMobile ? '0.85rem' : '0.9rem',
                                            color: '#434242',
                                            margin: '0 0 12px 0',
                                            opacity: 0.7,
                                            lineHeight: '1.4',
                                            minHeight: isMobile ? 'auto' : '40px'
                                        }}>
                                            {product.description}
                                        </p>
                                        <div style={{
                                            fontSize: isMobile ? '1rem' : '1rem',
                                            fontWeight: '400',
                                            color: '#E39963',
                                            letterSpacing: '0.5px',
                                            marginBottom: isMobile ? '12px' : '15px'
                                        }}>
                                            {product.price}
                                        </div>
                                        <button style={{
                                            padding: isMobile ? '12px 20px' : '12px 30px',
                                            backgroundColor: 'transparent',
                                            border: '1px solid #434242',
                                            color: '#434242',
                                            fontSize: isMobile ? '11px' : '12px',
                                            fontWeight: '400',
                                            letterSpacing: '1px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            textTransform: 'uppercase',
                                            width: isMobile ? '100%' : '100%',
                                            borderRadius: isMobile ? '5px' : '0'
                                        }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = '#434242';
                                                e.target.style.color = '#FFFFFF';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = 'transparent';
                                                e.target.style.color = '#434242';
                                            }}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // No Results Message
                        <div style={{
                            textAlign: 'center',
                            padding: isMobile ? '60px 20px' : '80px 20px'
                        }}>
                            <h3 style={{
                                fontSize: isMobile ? '1.3rem' : '1.5rem',
                                fontWeight: '300',
                                color: '#434242',
                                marginBottom: '20px'
                            }}>
                                No products found
                            </h3>
                            <p style={{
                                fontSize: isMobile ? '0.9rem' : '1rem',
                                color: '#434242',
                                opacity: 0.7,
                                marginBottom: '30px'
                            }}>
                                Try adjusting your filters to see more results.
                            </p>
                            <button
                                onClick={clearFilters}
                                style={{
                                    padding: isMobile ? '12px 25px' : '12px 30px',
                                    backgroundColor: 'transparent',
                                    border: '1px solid #E39963',
                                    color: '#E39963',
                                    fontSize: isMobile ? '13px' : '14px',
                                    fontWeight: '400',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    borderRadius: isMobile ? '5px' : '0'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#E39963';
                                    e.target.style.color = '#FFFFFF';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#E39963';
                                }}
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

           

        

         
        </div>
    );
};

export default Products;