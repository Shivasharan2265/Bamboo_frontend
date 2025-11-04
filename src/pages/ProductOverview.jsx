import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderOne from '../layout/Header copy';
import chair from "../assets/bamboo_chair.jpg";
import axios from 'axios';
import api from '../utils/api';

const ProductOverview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
      const [relatedProducts, setRelatedProducts] = useState([]); // Add this state
    const [loadingRelated, setLoadingRelated] = useState(false); 

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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                console.log(`🔄 Fetching product with ID: ${id}`);

                const response = await api.post(`/products/${id}`);
                console.log("✅ Product API Response:", response.data);
                
                setProduct(response.data);
                
            } catch (err) {
                console.error("❌ Product API Error:", err);
                console.error("❌ Error details:", err.response?.data);
                setError(err.response?.data?.message || 'Failed to load product');
            } finally {
                setLoading(false);
            }
        };

        if (id && id !== 'undefined') {
            fetchProduct();
        } else {
            setError('Invalid product ID');
            setLoading(false);
        }
    }, [id]);

    
        useEffect(() => {
            fetchRelatedProducts(product);
        }, [product]);

       const fetchRelatedProducts = async (currentProduct) => {
        try {
            setLoadingRelated(true);
            
            // Get category IDs from the current product
            const categoryIds = [];
            
            // Check if categories array exists and has items
            if (currentProduct.categories && currentProduct.categories.length > 0) {
                categoryIds.push(...currentProduct.categories.map(cat => cat._id));
            }
            
            // Also check if single category exists
            if (currentProduct.category && currentProduct.category._id) {
                categoryIds.push(currentProduct.category._id);
            }
            
            console.log("🔍 Fetching related products for categories:", categoryIds);
            
            if (categoryIds.length === 0) {
                console.log("⚠️ No categories found for related products");
                setRelatedProducts([]);
                return;
            }

            // Create a query to find products with matching categories
            // Exclude the current product
            const requestParams = {
                page: 1,
                limit: 8, // Limit to 8 related products
                categories: categoryIds.join(','), // Send category IDs as comma-separated string
                exclude: currentProduct._id // Exclude current product
            };

            const response = await api.get("/products", {
                params: requestParams,
            });

            console.log("✅ Related Products API Response:", response.data);
            
            if (response.data && response.data.products) {
                setRelatedProducts(response.data.products);
            } else {
                setRelatedProducts([]);
            }

        } catch (error) {
            console.error("❌ Related Products API Error:", error);
            setRelatedProducts([]); // Set empty array on error
        } finally {
            setLoadingRelated(false);
        }
    };

    // Helper function to get related product name
    const getRelatedProductName = (product) => {
        return product?.title?.en || product?.title || 'Product';
    };

    // Helper function to get related product price
    const getRelatedProductPrice = (product) => {
        return product?.prices?.price || product?.prices?.originalPrice || 0;
    };

    // Helper function to get related product image
    const getRelatedProductImage = (product) => {
        if (Array.isArray(product.image) && product.image.length > 0) {
            return product.image[0];
        } else if (product.image) {
            return product.image;
        }
        return chair; // fallback image
    };

    // Navigate to related product
    const navigateToProduct = (productId) => {
        navigate(`/product/${productId}`);
    };

    // Helper functions to handle API data structure
    const getProductName = () => {
        return product?.title?.en || product?.title || 'Product';
    };

    const getProductDescription = () => {
        return product?.description?.en || product?.description || 'No description available.';
    };

    const getProductPrice = () => {
        return product?.prices?.price || product?.prices?.originalPrice || 0;
    };

    const getProductOriginalPrice = () => {
        return product?.prices?.originalPrice;
    };

    const getProductImages = () => {
        if (!product) return [chair];
        
        if (Array.isArray(product.image) && product.image.length > 0) {
            return product.image;
        } else if (product.image) {
            return [product.image];
        }
        return [chair];
    };

    const getProductCategory = () => {
        return product?.category?.name?.en || product?.category?.name || 'uncategorized';
    };

    const getProductFeatures = () => {
        const features = [];
        
        // Handle tags - they're stored as JSON strings in an array
        if (product?.tag && Array.isArray(product.tag)) {
            product.tag.forEach(tagString => {
                try {
                    // Parse the JSON string to get the actual tags
                    const parsedTags = JSON.parse(tagString);
                    if (Array.isArray(parsedTags)) {
                        features.push(...parsedTags);
                    } else if (typeof parsedTags === 'string') {
                        features.push(parsedTags);
                    }
                } catch (error) {
                    console.log('Error parsing tag:', tagString);
                    // If parsing fails, try to extract tags manually
                    const cleanedTags = tagString.replace(/[\[\]"]/g, '').split(',');
                    features.push(...cleanedTags.filter(tag => tag.trim() !== ''));
                }
            });
        }
        
        // Add additional product information as features
        if (product?.stock > 0) {
            features.push(`In stock (${product.stock} available)`);
        } else if (product?.stock === 0) {
            features.push('Out of stock');
        }
        
        if (product?.category?.name) {
            features.push(`${product.category.name.en || product.category.name} collection`);
        }
        
        if (product?.prices?.discount && product.prices.discount > 0) {
            features.push(`Save $${product.prices.discount}`);
        }
        
        // Remove any empty features and limit to 5
        return features.filter(feature => feature && feature.trim() !== '').slice(0, 5);
    };

    const getProductSpecifications = () => {
        const specs = {
            'SKU': product?.sku || 'N/A',
            'Barcode': product?.barcode || 'N/A',
            'Category': getProductCategory(),
            'Stock': product?.stock !== undefined ? `${product.stock} units` : 'N/A',
            'Status': product?.status || 'N/A',
            'Product ID': product?.productId || 'N/A'
        };
        
        // Remove entries with 'N/A'
        return Object.fromEntries(
            Object.entries(specs).filter(([_, value]) => value !== 'N/A')
        );
    };

    const formatPrice = (price) => {
        if (!price) return '$0';
        return `$${parseFloat(price).toFixed(2)}`;
    };

    // Add to Cart Function (keep your existing addToCart function)
    const addToCart = async (e) => {
        e.stopPropagation();
        if (!product) return;

        try {
            const cartItem = {
                productId: product._id,
                title: product.title?.en || 'Product',
                price: product.prices?.price || product.prices?.originalPrice || 0,
                image: product.image && product.image.length > 0 ? product.image[0] : chair,
                quantity: quantity,
                description: product.description?.en || 'Product description',
                paymentMethod: 'cash',
                subTotal: (product.prices?.price || product.prices?.originalPrice || 0) * quantity,
                total: (product.prices?.price || product.prices?.originalPrice || 0) * quantity,
                shippingCost: 0,
                status: 'Pending',
                cart: [
                    {
                        product: product._id,
                        quantity: quantity,
                        price: product.prices?.price || product.prices?.originalPrice || 0
                    }
                ]
            };

            console.log("🛒 Adding to cart:", cartItem);

            const token = localStorage.getItem('authToken');
            if (!token) {
                alert('Please login to add items to cart');
                navigate('/login');
                return;
            }

            const response = await api.post('/order/add', cartItem, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log("✅ Add to cart response:", response.data);
            alert('Product added to cart successfully!');

        } catch (error) {
            console.error("❌ Add to cart error:", error);
            if (error.response?.status === 401) {
                alert('Your session has expired. Please login again.');
                localStorage.removeItem('authToken');
                navigate('/login');
            } else {
                alert('Failed to add product to cart. Please try again.');
            }
        }
    };

    // Rest of your component remains the same...
    // (loading states, error handling, and JSX rendering)

    if (loading) {
        return (
            <div style={{
                width: '100%',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
                marginTop: isMobile ? '70px' : '100px',
                padding: isMobile ? '60px 20px' : '100px 20px',
                textAlign: 'center',
                backgroundColor: '#FFFFFF',
                minHeight: '100vh'
            }}>
                <HeaderOne />
                <h2 style={{
                    fontSize: isMobile ? '1.5rem' : '2rem',
                    fontWeight: '300',
                    color: '#57C7C2',
                    marginBottom: '20px'
                }}>
                    Loading Product...
                </h2>
            </div>
        );
    }


    if (error || !product) {
        return (
            <div style={{
                width: '100%',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
                marginTop: isMobile ? '70px' : '100px',
                padding: isMobile ? '60px 20px' : '100px 20px',
                textAlign: 'center',
                backgroundColor: '#FFFFFF',
                minHeight: '100vh'
            }}>
                <HeaderOne />
                <h2 style={{
                    fontSize: isMobile ? '1.5rem' : '2rem',
                    fontWeight: '300',
                    color: '#E37DCC',
                    marginBottom: '20px'
                }}>
                    {error || 'Product not found'}
                </h2>
                <button
                    onClick={() => navigate('/products')}
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
                        marginTop: '20px',
                        borderRadius: '5px'
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
                    Back to Products
                </button>
            </div>
        );
    }

const renderRelatedProducts = () => {
    if (loadingRelated) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '40px 0',
                color: '#E39963'
            }}>
                <h3 style={{
                    fontSize: isMobile ? '1.3rem' : '1.5rem',
                    fontWeight: '300',
                    marginBottom: '20px'
                }}>
                    Loading related products...
                </h3>
            </div>
        );
    }

    if (relatedProducts.length === 0) {
        return null; // Don't show section if no related products
    }

    return (
        <div  style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: isMobile ? '15px 15px 10px' : '30px 50px 20px',
            }}>
            <h2 style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: '300',
                color: '#434242',
                marginBottom: isMobile ? '20px' : '30px',
                textAlign: 'center'
            }}>
                You Might Also Like
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: isMobile ? '25px' : '40px',
                padding: isMobile ? '10px 0' : '0'
            }}>
                {relatedProducts.map((relatedProduct) => (
                    <div
                        key={relatedProduct._id}
                        onClick={() => navigateToProduct(relatedProduct._id)}
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
                        }}
                    >
                        {/* Product Image */}
                        <div style={{
                            position: 'relative',
                            height: isMobile ? '250px' : '350px',
                            overflow: 'hidden',
                            marginBottom: isMobile ? '15px' : '20px',
                            borderRadius: isMobile ? '8px' : '0'
                        }}>
                            <img
                                src={getRelatedProductImage(relatedProduct)}
                                alt={getRelatedProductName(relatedProduct)}
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
                            {relatedProduct.featured && (
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
                                {getRelatedProductName(relatedProduct)}
                            </h3>
                            <p style={{
                                fontSize: isMobile ? '0.85rem' : '0.9rem',
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
                                {relatedProduct.description?.en || 'Product description'}
                            </p>
                            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <div style={{
                                fontSize: isMobile ? '1rem' : '1rem',
                                fontWeight: '400',
                                color: '#E39963',
                                letterSpacing: '0.5px',
                                marginBottom: isMobile ? '12px' : '15px'
                            }}>
                                {formatPrice(getRelatedProductPrice(relatedProduct))}
                            </div>
                            {relatedProduct.prices?.originalPrice && 
                             relatedProduct.prices.originalPrice !== getRelatedProductPrice(relatedProduct) && (
                                <div style={{
                                    fontSize: isMobile ? '12px' : '14px',
                                    color: '#434242',
                                    textDecoration: 'line-through',
                                    opacity: 0.6,
                                    marginBottom: '15px',
                                    marginLeft: '10px'
                                }}>
                                    {formatPrice(relatedProduct.prices.originalPrice)}
                                </div>
                            )}
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // You can add addToCart functionality here if needed
                                    navigateToProduct(relatedProduct._id);
                                }}
                                style={{
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
                                    if (!isMobile) {
                                        e.target.style.backgroundColor = '#434242';
                                        e.target.style.color = '#FFFFFF';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile) {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.color = '#434242';
                                    }
                                }}
                            >
                                View Product
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

    const productImages = getProductImages();
    const productFeatures = getProductFeatures();
    const productSpecifications = getProductSpecifications();
    const productName = getProductName();
    const productDescription = getProductDescription();
    const productPrice = getProductPrice();
    const productOriginalPrice = getProductOriginalPrice();
    const productCategory = getProductCategory();

    return (
        <div style={{
            width: '100%',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
            marginTop: isMobile ? '70px' : '100px',
            overflowX: 'hidden',
            backgroundColor: '#FFFFFF',
            minHeight: '100vh'
        }}>
            <HeaderOne />

            {/* Breadcrumb */}
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: isMobile ? '15px 15px 10px' : '30px 50px 20px',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isMobile ? '6px' : '10px',
                    fontSize: isMobile ? '12px' : '14px',
                    color: '#666',
                    marginBottom: isMobile ? '15px' : '20px',
                    flexWrap: 'wrap'
                }}>
                    <span
                        style={{ cursor: 'pointer', color: '#57C7C2' }}
                        onClick={() => navigate('/products')}
                        onMouseEnter={(e) => {
                            e.target.style.color = '#7DBA00';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '#57C7C2';
                        }}
                    >
                        Products
                    </span>
                    <span style={{ color: '#E37DCC' }}>›</span>
                    <span
                        style={{ cursor: 'pointer', color: '#57C7C2' }}
                        onClick={() => navigate(`/products?category=${productCategory}`)}
                        onMouseEnter={(e) => {
                            e.target.style.color = '#7DBA00';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '#57C7C2';
                        }}
                    >
                        {productCategory.charAt(0).toUpperCase() + productCategory.slice(1)}
                    </span>
                    <span style={{ color: '#E37DCC' }}>›</span>
                    <span style={{
                        color: '#7DBA00',
                        fontSize: isMobile ? '12px' : '14px',
                        fontWeight: '500'
                    }}>
                        {productName}
                    </span>
                </div>
            </div>

            {/* Main Product Section */}
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: isMobile ? '0 15px 30px' : '0 50px 80px',
            }}>
                <div style={{
                    display: isMobile ? 'block' : 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: isMobile ? '30px' : '60px',
                    alignItems: 'start'
                }}>

                    {/* Product Images */}
                    <div>
                        {/* Main Image */}
                        <div style={{
                            position: 'relative',
                            marginBottom: isMobile ? '15px' : '20px',
                            borderRadius: isMobile ? '10px' : '15px',
                            overflow: 'hidden',
                            backgroundColor: '#F8F8F8',
                            border: '1px solid rgba(87, 199, 194, 0.1)'
                        }}>
                            <img
                                src={productImages[selectedImage]}
                                alt={productName}
                                style={{
                                    width: '100%',
                                    height: isMobile ? '280px' : '500px',
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease'
                                }}
                            />
                            {product.status === 'show' && (
                                <div style={{
                                    position: 'absolute',
                                    top: isMobile ? '12px' : '20px',
                                    right: isMobile ? '12px' : '20px',
                                    backgroundColor: '#7DBA00',
                                    color: '#FFFFFF',
                                    padding: isMobile ? '6px 12px' : '8px 16px',
                                    fontSize: isMobile ? '10px' : '12px',
                                    fontWeight: '500',
                                    letterSpacing: '0.5px',
                                    borderRadius: '20px'
                                }}>
                                    Available
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Images */}
                        {productImages.length > 1 && (
                            <div style={{
                                display: 'flex',
                                gap: isMobile ? '10px' : '15px',
                                overflowX: 'auto',
                                paddingBottom: '10px',
                                WebkitOverflowScrolling: 'touch'
                            }}>
                                {productImages.map((image, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            flex: '0 0 auto',
                                            width: isMobile ? '60px' : '80px',
                                            height: isMobile ? '60px' : '80px',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            border: selectedImage === index ? '2px solid #7DBA00' : '1px solid rgba(87, 199, 194, 0.2)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img
                                            src={image}
                                            alt={`${productName} view ${index + 1}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div style={{
                        padding: isMobile ? '0' : '0'
                    }}>
                        <h1 style={{
                            fontSize: isMobile ? '1.8rem' : '2.5rem',
                            fontWeight: '300',
                            color: '#434242',
                            marginBottom: isMobile ? '12px' : '15px',
                            lineHeight: '1.2',
                            padding: isMobile ? '0 5px' : '0'
                        }}>
                            {productName}
                        </h1>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: isMobile ? '12px' : '15px',
                            marginBottom: isMobile ? '20px' : '25px',
                            padding: isMobile ? '0 5px' : '0'
                        }}>
                            <div style={{
                                fontSize: isMobile ? '1.5rem' : '1.8rem',
                                fontWeight: '400',
                                color: '#7DBA00'
                            }}>
                                {formatPrice(productPrice)}
                            </div>
                            {productOriginalPrice && productOriginalPrice !== productPrice && (
                                <div style={{
                                    fontSize: isMobile ? '1rem' : '1.2rem',
                                    color: '#E37DCC',
                                    textDecoration: 'line-through',
                                    opacity: 0.7
                                }}>
                                    {formatPrice(productOriginalPrice)}
                                </div>
                            )}
                        </div>

                        <p style={{
                            fontSize: isMobile ? '15px' : '16px',
                            lineHeight: '1.6',
                            color: '#666',
                            marginBottom: isMobile ? '25px' : '30px',
                            padding: isMobile ? '0 5px' : '0'
                        }}>
                            {productDescription}
                        </p>

                        {/* Features List */}
                        {productFeatures.length > 0 && (
                            <div style={{
                                marginBottom: isMobile ? '25px' : '30px',
                                padding: isMobile ? '0 5px' : '0'
                            }}>
                                <h3 style={{
                                    fontSize: isMobile ? '1rem' : '1.1rem',
                                    fontWeight: '500',
                                    color: '#E37DCC',
                                    marginBottom: isMobile ? '12px' : '15px',
                                    borderLeft: '3px solid #E37DCC',
                                    paddingLeft: '10px'
                                }}>
                                    Product Features
                                </h3>
                                <div style={{
                                    display: 'grid',
                                    gap: isMobile ? '6px' : '8px'
                                }}>
                                    {productFeatures.map((feature, index) => (
                                        <div key={index} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: isMobile ? '8px' : '10px',
                                            fontSize: isMobile ? '13px' : '14px',
                                            color: '#666',
                                            padding: '5px 0'
                                        }}>
                                            <div style={{
                                                width: isMobile ? '5px' : '6px',
                                                height: isMobile ? '5px' : '6px',
                                                backgroundColor: index % 3 === 0 ? '#E37DCC' : index % 3 === 1 ? '#7DBA00' : '#57C7C2',
                                                borderRadius: '50%',
                                                flexShrink: 0
                                            }}></div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity and Add to Cart */}
                        <div style={{
                            display: 'flex',
                            gap: isMobile ? '12px' : '15px',
                            marginBottom: isMobile ? '25px' : '30px',
                            flexWrap: 'wrap',
                            padding: isMobile ? '0 5px' : '0'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid rgba(87, 199, 194, 0.3)',
                                borderRadius: '5px',
                                overflow: 'hidden',
                                flexShrink: 0
                            }}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={{
                                        padding: isMobile ? '14px 12px' : '12px 16px',
                                        backgroundColor: '#F8F8F8',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: isMobile ? '18px' : '16px',
                                        color: '#57C7C2',
                                        minWidth: isMobile ? '44px' : 'auto',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#57C7C2';
                                        e.target.style.color = '#FFFFFF';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = '#F8F8F8';
                                        e.target.style.color = '#57C7C2';
                                    }}
                                >
                                    -
                                </button>
                                <div style={{
                                    padding: isMobile ? '14px 16px' : '12px 20px',
                                    fontSize: isMobile ? '16px' : '16px',
                                    fontWeight: '500',
                                    color: '#434242',
                                    minWidth: isMobile ? '50px' : '50px',
                                    textAlign: 'center'
                                }}>
                                    {quantity}
                                </div>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{
                                        padding: isMobile ? '14px 12px' : '12px 16px',
                                        backgroundColor: '#F8F8F8',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: isMobile ? '18px' : '16px',
                                        color: '#57C7C2',
                                        minWidth: isMobile ? '44px' : 'auto',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#57C7C2';
                                        e.target.style.color = '#FFFFFF';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = '#F8F8F8';
                                        e.target.style.color = '#57C7C2';
                                    }}
                                >
                                    +
                                </button>
                            </div>

                            <button 
                                style={{
                                    flex: '1',
                                    padding: isMobile ? '16px 20px' : '15px 30px',
                                    backgroundColor: '#7DBA00',
                                    border: 'none',
                                    color: '#FFFFFF',
                                    fontSize: isMobile ? '15px' : '16px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    borderRadius: '5px',
                                    minWidth: isMobile ? '200px' : '200px'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isMobile) {
                                        e.target.style.backgroundColor = '#57C7C2';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile) {
                                        e.target.style.backgroundColor = '#7DBA00';
                                        e.target.style.transform = 'translateY(0)';
                                    }
                                }}
                                onTouchStart={(e) => {
                                    e.target.style.backgroundColor = '#57C7C2';
                                }}
                                onTouchEnd={(e) => {
                                    e.target.style.backgroundColor = '#7DBA00';
                                }}
                                onClick={addToCart}
                            >
                                Add to Cart - {formatPrice(productPrice * quantity)}
                            </button>
                        </div>

                        {/* Quick Specs */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(2, 1fr)',
                            gap: isMobile ? '12px' : '15px',
                            padding: isMobile ? '15px' : '20px',
                            backgroundColor: '#F8F8F8',
                            borderRadius: '10px',
                            border: '1px solid rgba(227, 125, 204, 0.1)'
                        }}>
                            {Object.entries(productSpecifications).slice(0, 4).map(([key, value], index) => (
                                <div key={key}>
                                    <div style={{
                                        fontSize: isMobile ? '11px' : '12px',
                                        color: index % 4 === 0 ? '#E37DCC' : index % 4 === 1 ? '#7DBA00' : index % 4 === 2 ? '#57C7C2' : '#E39963',
                                        marginBottom: isMobile ? '3px' : '5px',
                                        fontWeight: '500'
                                    }}>
                                        {key}
                                    </div>
                                    <div style={{
                                        fontSize: isMobile ? '13px' : '14px',
                                        color: '#434242',
                                        fontWeight: '500'
                                    }}>
                                        {value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div style={{ marginTop: isMobile ? '40px' : '60px' }}>
                    <div style={{
                        display: 'flex',
                        borderBottom: '1px solid rgba(87, 199, 194, 0.2)',
                        marginBottom: isMobile ? '20px' : '30px',
                        overflowX: 'auto',
                        WebkitOverflowScrolling: 'touch'
                    }}>
                        {['description', 'specifications'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: isMobile ? '12px 20px' : '15px 30px',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    fontSize: isMobile ? '14px' : '16px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'capitalize',
                                    borderBottom: activeTab === tab ? `2px solid ${tab === 'description' ? '#E37DCC' : '#7DBA00'}` : '2px solid transparent',
                                    color: activeTab === tab ? (tab === 'description' ? '#E37DCC' : '#7DBA00') : '#666',
                                    whiteSpace: 'nowrap',
                                    flexShrink: 0
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div>
                        {activeTab === 'description' && (
                            <div>
                                <p style={{
                                    fontSize: isMobile ? '15px' : '16px',
                                    lineHeight: '1.8',
                                    color: '#666',
                                    marginBottom: isMobile ? '15px' : '20px'
                                }}>
                                    {productDescription}
                                </p>
                                {productFeatures.length > 0 && (
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                                        gap: isMobile ? '12px' : '20px',
                                        marginTop: isMobile ? '20px' : '30px'
                                    }}>
                                        {productFeatures.map((feature, index) => (
                                            <div key={index} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: isMobile ? '12px' : '15px',
                                                padding: isMobile ? '12px' : '15px',
                                                backgroundColor: '#F8F8F8',
                                                borderRadius: '8px',
                                                borderLeft: `4px solid ${index % 3 === 0 ? '#E37DCC' : index % 3 === 1 ? '#7DBA00' : '#57C7C2'}`
                                            }}>
                                                <div style={{
                                                    width: isMobile ? '6px' : '8px',
                                                    height: isMobile ? '6px' : '8px',
                                                    backgroundColor: index % 3 === 0 ? '#E37DCC' : index % 3 === 1 ? '#7DBA00' : '#57C7C2',
                                                    borderRadius: '50%',
                                                    flexShrink: 0
                                                }}></div>
                                                <span style={{
                                                    fontSize: isMobile ? '13px' : '14px',
                                                    color: '#434242'
                                                }}>
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'specifications' && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                                gap: isMobile ? '15px' : '20px'
                            }}>
                                {Object.entries(productSpecifications).map(([key, value], index) => (
                                    <div key={key} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: isMobile ? '12px 0' : '15px 0',
                                        borderBottom: `1px solid ${index % 3 === 0 ? 'rgba(227, 125, 204, 0.2)' : index % 3 === 1 ? 'rgba(125, 186, 0, 0.2)' : 'rgba(87, 199, 194, 0.2)'}`
                                    }}>
                                        <span style={{
                                            fontWeight: '500',
                                            color: index % 3 === 0 ? '#E37DCC' : index % 3 === 1 ? '#7DBA00' : '#57C7C2',
                                            fontSize: isMobile ? '14px' : '16px'
                                        }}>
                                            {key}:
                                        </span>
                                        <span style={{
                                            color: '#666',
                                            fontSize: isMobile ? '14px' : '16px',
                                            textAlign: 'right'
                                        }}>
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
              {renderRelatedProducts()}
        </div>
    );
};

export default ProductOverview;