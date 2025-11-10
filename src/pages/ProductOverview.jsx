import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderOne from '../layout/Header copy';
import chair from "../assets/bamboo_chair.jpg";
import axios from 'axios';
import API from '../api';

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
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loadingRelated, setLoadingRelated] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);

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

    const isProductInCart = (productId) => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            return cart.some(item => item.productId === productId);
        } catch (error) {
            console.error("Error checking cart:", error);
            return false;
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                console.log(`🔄 Fetching product with ID: ${id}`);

                const response = await API.post(`/products/${id}`);
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
        if (product) {
            fetchRelatedProducts(product);
        }
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

            const requestParams = {
                page: 1,
                limit: 8,
                categories: categoryIds.join(','),
                exclude: currentProduct._id
            };

            const response = await API.get("/products", {
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
            setRelatedProducts([]);
        } finally {
            setLoadingRelated(false);
        }
    };

    // NEW: Add to Cart Function for ProductOverview - using localStorage
    const addToCart = (e) => {
        e.stopPropagation();
        if (!product) return;

        try {
            setAddingToCart(true);

            const cartItem = {
                productId: product._id,
                title: product.title?.en || 'Product',
                price: product.prices?.price || product.prices?.originalPrice || 0,
                image: product.image && product.image.length > 0 ? product.image[0] : chair,
                quantity: quantity,
                description: product.description?.en || 'Product description',
                name: product.title?.en || 'Product',
                category: product.category || 'general'
            };

            console.log("🛒 Adding to cart from ProductOverview:", cartItem);

            // Save directly to localStorage (same as Products component)
            saveToLocalStorage(cartItem);
            
        } catch (error) {
            console.error("❌ Add to cart error:", error);
            alert('Failed to add product to cart. Please try again.');
        } finally {
            setAddingToCart(false);
        }
    };

    // NEW: Helper function to save to localStorage
    const saveToLocalStorage = (cartItem) => {
        try {
            // Get existing cart from localStorage
            const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if product already exists in cart
            const existingItemIndex = existingCart.findIndex(item => item.productId === cartItem.productId);

            if (existingItemIndex > -1) {
                // Update quantity if item exists
                existingCart[existingItemIndex].quantity += cartItem.quantity;
            } else {
                // Add new item to cart
                existingCart.push(cartItem);
            }

            // Save updated cart back to localStorage
            localStorage.setItem('cart', JSON.stringify(existingCart));
            console.log("💾 Saved to localStorage from ProductOverview:", existingCart);

            // ✅ Notify header to refresh cart count
            window.dispatchEvent(new Event('cartUpdated'));

            alert('Product added to cart successfully!');

        } catch (error) {
            console.error("❌ Error saving to localStorage:", error);
            throw error;
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
        return chair;
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

        if (product?.tag && Array.isArray(product.tag)) {
            product.tag.forEach(tagString => {
                try {
                    const parsedTags = JSON.parse(tagString);
                    if (Array.isArray(parsedTags)) {
                        features.push(...parsedTags);
                    } else if (typeof parsedTags === 'string') {
                        features.push(parsedTags);
                    }
                } catch (error) {
                    console.log('Error parsing tag:', tagString);
                    const cleanedTags = tagString.replace(/[\[\]"]/g, '').split(',');
                    features.push(...cleanedTags.filter(tag => tag.trim() !== ''));
                }
            });
        }

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

        return Object.fromEntries(
            Object.entries(specs).filter(([_, value]) => value !== 'N/A')
        );
    };

    const formatPrice = (price) => {
        if (!price) return '$0';
        return `$${parseFloat(price).toFixed(2)}`;
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
            return null;
        }

        return (
            <div style={{
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
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <div style={{
                                        fontSize: isMobile ? '1rem' : '1rem',
                                        fontWeight: '400',
                                        color: '#E39963',
                                        letterSpacing: '0.5px',
                                        marginBottom: isMobile ? '12px' : '15px'
                                    }}>
                                        {formatPrice(getRelatedProductPrice(relatedProduct))}
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
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
                    >
                        Products
                    </span>
                    <span style={{ color: '#E37DCC' }}>›</span>
                    <span
                        style={{ cursor: 'pointer', color: '#57C7C2' }}
                        onClick={() => navigate(`/products?category=${productCategory}`)}
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
                        </div>

                        {/* Thumbnail Images */}
                        {productImages.length > 1 && (
                            <div style={{
                                display: 'flex',
                                gap: isMobile ? '10px' : '15px',
                                overflowX: 'auto',
                                paddingBottom: '10px',
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
                        }}>
                            {productName}
                        </h1>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: isMobile ? '12px' : '15px',
                            marginBottom: isMobile ? '20px' : '25px',
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
                        }}>
                            {productDescription}
                        </p>

                        {/* Features List */}
                        {productFeatures.length > 0 && (
                            <div style={{
                                marginBottom: isMobile ? '25px' : '30px',
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
                                    }}
                                >
                                    +
                                </button>
                            </div>

                            <button
                                style={{
                                    flex: '1',
                                    padding: isMobile ? '16px 20px' : '15px 30px',
                                    backgroundColor: isProductInCart(product._id) ? '#E39963' : '#7DBA00',
                                    border: 'none',
                                    color: '#FFFFFF',
                                    fontSize: isMobile ? '15px' : '16px',
                                    fontWeight: '500',
                                    cursor: addingToCart ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    borderRadius: '5px',
                                    minWidth: isMobile ? '200px' : '200px',
                                    opacity: addingToCart ? 0.7 : 1
                                }}
                                onClick={(e) => {
                                    if (isProductInCart(product._id)) {
                                        e.stopPropagation();
                                        navigate('/cart');
                                    } else {
                                        addToCart(e);
                                    }
                                }}
                                disabled={addingToCart}
                            >
                                {addingToCart ? (
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
                                ) : isProductInCart(product._id) ? (
                                    `Go to Cart - ${formatPrice(productPrice * quantity)}`
                                ) : (
                                    `Add to Cart - ${formatPrice(productPrice * quantity)}`
                                )}
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

export default ProductOverview;