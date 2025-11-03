import React, { useState, useEffect } from 'react';
import chair from "../assets/bamboo_chair.jpg";
import table from "../assets/bamboo_table.jpg";
import thread from "../assets/bamboo_thead.jpg";
import spoon from "../assets/bamboo_spoon.jpeg";
import HeaderOne from '../layout/Header copy';
import image from "../assets/generated-image.png"
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    const [filters, setFilters] = useState({
        category: 'all',
        priceRange: 'all',
        material: 'all',
        featured: false
    });

    const [filteredProducts, setFilteredProducts] = useState([]);
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

    // Fetch categories when component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    // Fetch data when component mounts or category id changes
    useEffect(() => {
        fetchData();
    }, [id]);

    // Refetch data when category filter changes (not 'all')
    useEffect(() => {
        if (filters.category !== 'all') {
            fetchDataByCategory(filters.category);
        }
    }, [filters.category]);

    const fetchCategories = async () => {
        try {
            setCategoriesLoading(true);
            const response = await axios.get("http://localhost:5055/api/category");
            console.log("✅ Categories API Response:", response.data);
            
            // Extract categories from the response structure
            const categoriesData = response.data[0]?.children || [];
            setCategories(categoriesData);
            
        } catch (error) {
            console.error("❌ Category API Error:", error);
            setCategories([]);
        } finally {
            setCategoriesLoading(false);
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const page = 1;
            const limit = 5;

            const requestParams = { page, limit };

            if (id) {
                requestParams.category = id;
            }

            const response = await axios.get("http://localhost:5055/api/products", {
                params: requestParams,
            });

            console.log("✅ Products API Response:", response.data);
            
            const productsFromApi = response.data.products || [];
            setProducts(productsFromApi);
            setFilteredProducts(productsFromApi);

        } catch (error) {
            console.error("❌ Products API Error:", error);
            console.log("🚫 Category ID that caused error:", id);
            setProducts([]);
            setFilteredProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataByCategory = async (categoryName) => {
        try {
            setLoading(true);
            const page = 1;
            const limit = 5;

            // Find category ID by name
            const category = categories.find(cat => 
                cat.name?.en?.toLowerCase() === categoryName.toLowerCase()
            );

            if (category) {
                const requestParams = { 
                    page, 
                    limit,
                    category: category._id
                };

                const response = await axios.get("http://localhost:5055/api/products", {
                    params: requestParams,
                });

                console.log(`✅ Products for category ${categoryName}:`, response.data);
                
                const productsFromApi = response.data.products || [];
                setProducts(productsFromApi);
                setFilteredProducts(productsFromApi);
            }

        } catch (error) {
            console.error(`❌ Products API Error for category ${categoryName}:`, error);
            setProducts([]);
            setFilteredProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Filter products based on selected filters (price, material, featured)
    useEffect(() => {
        if (products.length === 0) {
            setFilteredProducts([]);
            return;
        }

        let filtered = products;

        // Price filter - only apply if we're not filtering by category from API
        if (filters.priceRange !== 'all') {
            switch (filters.priceRange) {
                case 'under-100':
                    filtered = filtered.filter(product => product.prices?.price < 100);
                    break;
                case '100-300':
                    filtered = filtered.filter(product => {
                        const price = product.prices?.price;
                        return price >= 100 && price <= 300;
                    });
                    break;
                case '300-500':
                    filtered = filtered.filter(product => {
                        const price = product.prices?.price;
                        return price >= 300 && price <= 500;
                    });
                    break;
                case 'over-500':
                    filtered = filtered.filter(product => product.prices?.price > 500);
                    break;
                default:
                    break;
            }
        }

        if (filters.material !== 'all') {
            filtered = filtered.filter(product =>
                product.material ? product.material === filters.material : true
            );
        }

        if (filters.featured) {
            filtered = filtered.filter(product =>
                product.featured ? product.featured === true : false
            );
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
        // Refetch all products when clearing category filter
        if (filters.category !== 'all') {
            fetchData();
        }
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    // Get category options for filter dropdowns
    const getCategoryOptions = () => {
        const baseCategories = ['all'];
        const apiCategories = categories.map(category => 
            category.name?.en?.toLowerCase() || ''
        ).filter(name => name !== '');
        
        return [...baseCategories, ...apiCategories];
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
            {isMobile && !loading && (
                <div style={{
                    position: 'sticky',
                    top: isMobile ? '70px' : '100px',
                    zIndex: 100,
                    backgroundColor: '#FFFFFF',
                    borderBottom: '1px solid rgba(87, 199, 194, 0.2)',
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
                                border: '1px solid #7DBA00',
                                color: '#7DBA00',
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
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#7DBA00';
                                e.target.style.color = '#FFFFFF';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#F8F8F8';
                                e.target.style.color = '#7DBA00';
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
                                backgroundColor: 'rgba(227, 125, 204, 0.1)',
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
                        boxShadow: '2px 0 10px rgba(227, 125, 204, 0.1)'
                    }}>
                        {/* Mobile Header */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '25px',
                            paddingBottom: '15px',
                            borderBottom: '1px solid rgba(125, 186, 0, 0.3)'
                        }}>
                            <h3 style={{
                                fontSize: '1.3rem',
                                fontWeight: '500',
                                color: '#7DBA00',
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
                                    color: '#E37DCC',
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
                                    e.target.style.backgroundColor = 'rgba(227, 125, 204, 0.1)';
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
                                    border: '1px solid #57C7C2',
                                    color: '#57C7C2',
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    borderRadius: '4px'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#57C7C2';
                                    e.target.style.color = '#FFFFFF';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#57C7C2';
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
                                color: '#E37DCC',
                                marginBottom: '15px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                borderLeft: '3px solid #E37DCC',
                                paddingLeft: '10px'
                            }}>
                                Category
                            </h4>
                            {categoriesLoading ? (
                                <div style={{ color: '#434242', fontSize: '14px' }}>Loading categories...</div>
                            ) : (
                                getCategoryOptions().map(category => (
                                    <label key={category} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '15px',
                                        cursor: 'pointer',
                                        fontSize: '15px',
                                        color: '#434242',
                                        padding: '10px 0',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <input
                                            type="radio"
                                            name="category"
                                            value={category}
                                            checked={filters.category === category}
                                            onChange={(e) => handleFilterChange('category', e.target.value)}
                                            style={{
                                                marginRight: '12px',
                                                accentColor: '#E37DCC',
                                                transform: 'scale(1.3)'
                                            }}
                                        />
                                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                                    </label>
                                ))
                            )}
                        </div>

                        {/* Price Range Filter */}
                        <div style={{ marginBottom: '25px' }}>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '500',
                                color: '#7DBA00',
                                marginBottom: '15px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                borderLeft: '3px solid #7DBA00',
                                paddingLeft: '10px'
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
                                    padding: '10px 0',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        value={range.value}
                                        checked={filters.priceRange === range.value}
                                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                        style={{
                                            marginRight: '12px',
                                            accentColor: '#7DBA00',
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
                                color: '#57C7C2',
                                marginBottom: '15px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                borderLeft: '3px solid #57C7C2',
                                paddingLeft: '10px'
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
                                    padding: '10px 0',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <input
                                        type="radio"
                                        name="material"
                                        value={material}
                                        checked={filters.material === material}
                                        onChange={(e) => handleFilterChange('material', e.target.value)}
                                        style={{
                                            marginRight: '12px',
                                            accentColor: '#57C7C2',
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
                                padding: '10px 0',
                                borderLeft: '3px solid #E37DCC',
                                paddingLeft: '10px'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={filters.featured}
                                    onChange={(e) => handleFilterChange('featured', e.target.checked)}
                                    style={{
                                        marginRight: '12px',
                                        accentColor: '#E37DCC',
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
                                backgroundColor: '#7DBA00',
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
                                e.target.style.backgroundColor = '#6aa800';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#7DBA00';
                                e.target.style.transform = 'translateY(0)';
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
                        top: '120px',
                        border: '1px solid rgba(87, 199, 194, 0.2)'
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
                                color: '#7DBA00',
                                margin: 0
                            }}>
                                Filters
                            </h3>
                            <button
                                onClick={clearFilters}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: 'transparent',
                                    border: '1px solid #57C7C2',
                                    color: '#57C7C2',
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    borderRadius: '4px'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#57C7C2';
                                    e.target.style.color = '#FFFFFF';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#57C7C2';
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
                                color: '#E37DCC',
                                marginBottom: '15px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                borderLeft: '3px solid #E37DCC',
                                paddingLeft: '10px'
                            }}>
                                Category
                            </h4>
                            {categoriesLoading ? (
                                <div style={{ color: '#434242', fontSize: '14px' }}>Loading categories...</div>
                            ) : (
                                getCategoryOptions().map(category => (
                                    <label key={category} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '12px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        color: '#434242',
                                        transition: 'all 0.3s ease',
                                        padding: '5px 0'
                                    }}>
                                        <input
                                            type="radio"
                                            name="category"
                                            value={category}
                                            checked={filters.category === category}
                                            onChange={(e) => handleFilterChange('category', e.target.value)}
                                            style={{
                                                marginRight: '10px',
                                                accentColor: '#E37DCC'
                                            }}
                                        />
                                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                                    </label>
                                ))
                            )}
                        </div>

                        {/* Price Range Filter */}
                        <div style={{ marginBottom: '25px' }}>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '500',
                                color: '#7DBA00',
                                marginBottom: '15px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                borderLeft: '3px solid #7DBA00',
                                paddingLeft: '10px'
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
                                    color: '#434242',
                                    transition: 'all 0.3s ease',
                                    padding: '5px 0'
                                }}>
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        value={range.value}
                                        checked={filters.priceRange === range.value}
                                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                        style={{
                                            marginRight: '10px',
                                            accentColor: '#7DBA00'
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
                                color: '#57C7C2',
                                marginBottom: '15px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                borderLeft: '3px solid #57C7C2',
                                paddingLeft: '10px'
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
                                    color: '#434242',
                                    transition: 'all 0.3s ease',
                                    padding: '5px 0'
                                }}>
                                    <input
                                        type="radio"
                                        name="material"
                                        value={material}
                                        checked={filters.material === material}
                                        onChange={(e) => handleFilterChange('material', e.target.value)}
                                        style={{
                                            marginRight: '10px',
                                            accentColor: '#57C7C2'
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
                                color: '#434242',
                                borderLeft: '3px solid #E37DCC',
                                paddingLeft: '10px',
                                padding: '5px 0'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={filters.featured}
                                    onChange={(e) => handleFilterChange('featured', e.target.checked)}
                                    style={{
                                        marginRight: '10px',
                                        accentColor: '#E37DCC'
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
                    {!isMobile && !loading && (
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

                    {/* Loading State */}
                    {loading ? (
                        <div style={{
                            textAlign: 'center',
                            padding: isMobile ? '60px 20px' : '80px 20px'
                        }}>
                            <h3 style={{
                                fontSize: isMobile ? '1.3rem' : '1.5rem',
                                fontWeight: '300',
                                color: '#7DBA00',
                                marginBottom: '20px'
                            }}>
                                Loading products...
                            </h3>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: isMobile ? '25px' : '40px',
                            padding: isMobile ? '10px 0' : '0'
                        }}>
                            {filteredProducts.map((product, index) => (
                                <div key={product._id}
                                    onClick={() => navigate(`/product/${product._id}`)}
                                    style={{
                                        position: 'relative',
                                        cursor: 'pointer',
                                        border: isMobile ? '1px solid rgba(87, 199, 194, 0.2)' : 'none',
                                        borderRadius: isMobile ? '10px' : '0',
                                        padding: isMobile ? '15px' : '0',
                                        backgroundColor: isMobile ? '#FFFFFF' : 'transparent',
                                        boxShadow: isMobile ? '0 2px 10px rgba(87, 199, 194, 0.1)' : 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isMobile) {
                                            const img = e.currentTarget.querySelector('img');
                                            const overlay = e.currentTarget.querySelector('.product-overlay');
                                            if (img) img.style.transform = 'scale(1.05)';
                                            if (overlay) overlay.style.opacity = '1';
                                            e.currentTarget.style.transform = 'translateY(-5px)';
                                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(227, 125, 204, 0.1)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isMobile) {
                                            const img = e.currentTarget.querySelector('img');
                                            const overlay = e.currentTarget.querySelector('.product-overlay');
                                            if (img) img.style.transform = 'scale(1)';
                                            if (overlay) overlay.style.opacity = '0';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
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
                                            src={product.image && product.image.length > 0 ? product.image[0] : chair}
                                            alt={product.title?.en || 'Product'}
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
                                                backgroundColor: 'rgba(125, 186, 0, 0.05)',
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
                                            {product.title?.en || 'Product Name'}
                                        </h3>
                                        <p style={{
                                            fontSize: isMobile ? '0.85rem' : '0.9rem',
                                            color: '#434242',
                                            margin: '0 0 12px 0',
                                            opacity: 0.7,
                                            lineHeight: '1.4',
                                            minHeight: isMobile ? 'auto' : '40px'
                                        }}>
                                            {product.description?.en || 'Product description'}
                                        </p>
                                        <div style={{
                                            fontSize: isMobile ? '1rem' : '1rem',
                                            fontWeight: '400',
                                            color: index % 3 === 0 ? '#E37DCC' : index % 3 === 1 ? '#7DBA00' : '#57C7C2',
                                            letterSpacing: '0.5px',
                                            marginBottom: isMobile ? '12px' : '15px'
                                        }}>
                                            ${product.prices?.price || '0'}
                                        </div>
                                        <button style={{
                                            padding: isMobile ? '12px 20px' : '12px 30px',
                                            backgroundColor: 'transparent',
                                            border: '1px solid #57C7C2',
                                            color: '#57C7C2',
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
                                                e.target.style.backgroundColor = '#57C7C2';
                                                e.target.style.color = '#FFFFFF';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = 'transparent';
                                                e.target.style.color = '#57C7C2';
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
                                color: '#E37DCC',
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
                                {products.length === 0 ? 'No products available.' : 'Try adjusting your filters to see more results.'}
                            </p>
                            <button
                                onClick={clearFilters}
                                style={{
                                    padding: isMobile ? '12px 25px' : '12px 30px',
                                    backgroundColor: 'transparent',
                                    border: '1px solid #7DBA00',
                                    color: '#7DBA00',
                                    fontSize: isMobile ? '13px' : '14px',
                                    fontWeight: '400',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    borderRadius: isMobile ? '5px' : '0'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#7DBA00';
                                    e.target.style.color = '#FFFFFF';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#7DBA00';
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