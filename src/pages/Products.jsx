import React, { useState, useEffect } from 'react';
import chair from "../assets/bamboo_chair.jpg";
import table from "../assets/bamboo_table.jpg";
import thread from "../assets/bamboo_thead.jpg";
import spoon from "../assets/bamboo_spoon.jpeg";
import HeaderOne from '../layout/Header copy';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState({});

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

    // Handle category filter changes - fetch data from API when category changes
    useEffect(() => {
        if (filters.category !== 'all') {
            fetchDataByCategory(filters.category);
        } else {
            // If category is 'all', fetch all products
            fetchData();
        }
    }, [filters.category]);

    const fetchCategories = async () => {
        try {
            setCategoriesLoading(true);
            const response = await axios.get("http://localhost:5055/api/category");
            console.log("✅ Categories API Response:", response.data);

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
            const limit = 50;

            const requestParams = { page, limit };

            if (id) {
                requestParams.category = id;
                // Also update the filter to match the URL category
                setFilters(prev => ({ ...prev, category: id }));
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
            const limit = 50;

            // Find category by name in the categories list
            const category = categories.find(cat => {
                const catName = cat.name?.en?.toLowerCase() || '';
                return catName === categoryName.toLowerCase();
            });

            if (category) {
                console.log(`🔄 Fetching products for category: ${categoryName} (ID: ${category._id})`);

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
                // Don't set filteredProducts here - let the useEffect handle filtering
            } else {
                console.log(`❌ Category ${categoryName} not found in categories list`);
                // If category not found, fetch all products
                fetchData();
            }

        } catch (error) {
            console.error(`❌ Products API Error for category ${categoryName}:`, error);
            // On error, fall back to all products
            fetchData();
        } finally {
            setLoading(false);
        }
    };

    // Add to Cart Function
const addToCart = async (product, e) => {
    e.stopPropagation();

    try {
        setAddingToCart(prev => ({ ...prev, [product._id]: true }));

        const cartItem = {
            productId: product._id,
            title: product.title?.en || 'Product',
            price: product.prices?.price || 0,
            image: product.image && product.image.length > 0 ? product.image[0] : chair,
            quantity: 1,
            description: product.description?.en || 'Product description'
        };

        console.log("🛒 Adding to cart:", cartItem);

        // Get token from localStorage
        const token = localStorage.getItem('authToken');
        
        // Check if user is authenticated
        if (!token) {
            alert('Please login to add items to cart');
            navigate('/login');
            return;
        }

        const response = await axios.post('http://localhost:5055/api/order/add', cartItem, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("✅ Add to cart response:", response.data);
        alert('Product added to cart successfully!');

    } catch (error) {
        console.error("❌ Add to cart error:", error);
        
        // More detailed error handling
        if (error.response) {
            // Server responded with error status
            console.log("Error response data:", error.response.data);
            console.log("Error status:", error.response.status);
            
            if (error.response.status === 401) {
                alert('Your session has expired. Please login again.');
                localStorage.removeItem('authToken');
                navigate('/login');
            } else if (error.response.status === 500) {
                alert('Server error. Please try again later.');
            } else {
                alert(`Error: ${error.response.data.message || 'Failed to add to cart'}`);
            }
        } else if (error.request) {
            // Request was made but no response received
            console.log("No response received:", error.request);
            alert('Network error. Please check your connection.');
        } else {
            // Something else happened
            console.log("Error message:", error.message);
            alert('Failed to add product to cart. Please try again.');
        }
    } finally {
        setAddingToCart(prev => ({ ...prev, [product._id]: false }));
    }
};

    // Filter products based on selected filters (price, material, featured)
    // This now only handles client-side filters, not category
    useEffect(() => {
        if (products.length === 0) {
            setFilteredProducts([]);
            return;
        }

        let filtered = [...products]; // Start with all products from current category

        // Price filter
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

        // Material filter
        if (filters.material !== 'all') {
            filtered = filtered.filter(product =>
                product.material ? product.material.toLowerCase() === filters.material.toLowerCase() : true
            );
        }

        // Featured filter
        if (filters.featured) {
            filtered = filtered.filter(product => product.featured === true);
        }

        setFilteredProducts(filtered);
    }, [filters.priceRange, filters.material, filters.featured, products]);

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
        // When clearing category filter, fetch all products
        if (filters.category !== 'all') {
            fetchData();
        }
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    // Get available categories from API for filters
    const getAvailableCategories = () => {
        const categoriesList = ['all'];

        if (categories.length > 0) {
            categories.forEach(category => {
                if (category.name?.en) {
                    categoriesList.push(category.name.en.toLowerCase());
                }
            });
        }

        return categoriesList;
    };

    // Get available materials from products for filters
    const getAvailableMaterials = () => {
        const materialsSet = new Set(['all']);
        products.forEach(product => {
            if (product.material) {
                materialsSet.add(product.material.toLowerCase());
            }
        });
        return Array.from(materialsSet);
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
                            {categoriesLoading ? (
                                <div style={{ color: '#434242', fontSize: '14px' }}>Loading categories...</div>
                            ) : (
                                getAvailableCategories().map(category => (
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
                                ))
                            )}
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
                            {getAvailableMaterials().map(material => (
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
                            {categoriesLoading ? (
                                <div style={{ color: '#434242', fontSize: '14px' }}>Loading categories...</div>
                            ) : (
                                getAvailableCategories().map(category => (
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
                                ))
                            )}
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
                            {getAvailableMaterials().map(material => (
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
                                {filters.category !== 'all' && ` in ${filters.category}`}
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
                                color: '#E39963',
                                marginBottom: '20px'
                            }}>
                                {filters.category !== 'all' ? `Loading ${filters.category} products...` : 'Loading products...'}
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
                                        border: isMobile ? '1px solid #F2EDE8' : 'none',
                                        borderRadius: isMobile ? '10px' : '0',
                                        padding: isMobile ? '15px' : '0',
                                        backgroundColor: isMobile ? '#FFFFFF' : 'transparent',
                                        boxShadow: isMobile ? '0 2px 10px rgba(0,0,0,0.05)' : 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isMobile) {
                                            const img = e.currentTarget.querySelector('img');
                                            const overlay = e.currentTarget.querySelector('.product-overlay');
                                            if (img) img.style.transform = 'scale(1.05)';
                                            if (overlay) overlay.style.opacity = '1';
                                            e.currentTarget.style.transform = 'translateY(-5px)';
                                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
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
                                            {product.title?.en || 'Product Name'}
                                        </h3>
                                       <p style={{
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    color: '#434242',
    margin: '0 0 12px 0',
    opacity: 0.7,
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minHeight: isMobile ? 'auto' : '40px'
}}>
    {product.description?.en || 'Product description'}
</p>

                                        <div style={{
                                            fontSize: isMobile ? '1rem' : '1rem',
                                            fontWeight: '400',
                                            color: '#E39963',
                                            letterSpacing: '0.5px',
                                            marginBottom: isMobile ? '12px' : '15px'
                                        }}>
                                            ${product.prices?.price || '0'}
                                        </div>
                                        <button
                                            onClick={(e) => addToCart(product, e)}
                                            disabled={addingToCart[product._id]}
                                            style={{
                                                padding: isMobile ? '12px 20px' : '12px 30px',
                                                backgroundColor: addingToCart[product._id] ? '#cccccc' : 'transparent',
                                                border: '1px solid #434242',
                                                color: addingToCart[product._id] ? '#666' : '#434242',
                                                fontSize: isMobile ? '11px' : '12px',
                                                fontWeight: '400',
                                                letterSpacing: '1px',
                                                cursor: addingToCart[product._id] ? 'not-allowed' : 'pointer',
                                                transition: 'all 0.3s ease',
                                                textTransform: 'uppercase',
                                                width: isMobile ? '100%' : '100%',
                                                borderRadius: isMobile ? '5px' : '0',
                                                opacity: addingToCart[product._id] ? 0.7 : 1
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!addingToCart[product._id] && !isMobile) {
                                                    e.target.style.backgroundColor = '#434242';
                                                    e.target.style.color = '#FFFFFF';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!addingToCart[product._id] && !isMobile) {
                                                    e.target.style.backgroundColor = 'transparent';
                                                    e.target.style.color = '#434242';
                                                }
                                            }}>
                                            {addingToCart[product._id] ? (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                                    <div style={{
                                                        width: '14px',
                                                        height: '14px',
                                                        border: '2px solid transparent',
                                                        borderTop: '2px solid currentColor',
                                                        borderRadius: '50%',
                                                        animation: 'spin 1s linear infinite'
                                                    }}></div>
                                                    Adding...
                                                </div>
                                            ) : (
                                                'Add to Cart'
                                            )}
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
                                {products.length === 0 ? 'No products available.' : 'Try adjusting your filters to see more results.'}
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

export default Products;