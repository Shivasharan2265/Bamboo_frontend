import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderOne from '../layout/Header copy';
import chair from "../assets/bamboo_chair.jpg";
import table from "../assets/bamboo_table.jpg";
import thread from "../assets/bamboo_thead.jpg";
import spoon from "../assets/bamboo_spoon.jpeg";

const ProductOverview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState('description');

    // Complete products data matching Products.jsx
    const allProducts = [
        {
            id: 1,
            name: 'Bamboo Lounge Chair',
            price: '$299',
            originalPrice: '$399',
            images: [chair, chair, chair],
            description: 'Experience unparalleled comfort with our Bamboo Lounge Chair, meticulously crafted from sustainable bamboo. This elegant piece combines modern design with natural beauty, featuring ergonomic curves that provide optimal support for relaxation.',
            category: 'chairs',
            material: 'bamboo',
            featured: true,
            dimensions: 'H 32" x W 28" x D 30"',
            weight: '15 lbs',
            features: [
                '100% Sustainable Bamboo',
                'Ergonomic Design',
                'Easy Assembly',
                'Weight Capacity: 300 lbs',
                'Natural Finish'
            ],
            specifications: {
                Material: 'Solid Bamboo',
                Finish: 'Natural Oil',
                Assembly: 'Required (tools included)',
                Care: 'Wipe with damp cloth',
                Warranty: '5 Years'
            },
            reviews: [
                { name: 'Sarah M.', rating: 5, comment: 'Absolutely love this chair! So comfortable and eco-friendly.', date: '2024-01-15' },
                { name: 'James K.', rating: 4, comment: 'Beautiful craftsmanship. Took about 20 minutes to assemble.', date: '2024-01-10' },
                { name: 'Emma L.', rating: 5, comment: 'Perfect for my reading nook. Very sturdy and stylish.', date: '2024-01-05' }
            ]
        },
        {
            id: 2,
            name: 'Bamboo Dining Table',
            price: '$599',
            originalPrice: '$699',
            images: [table, table, table],
            description: 'Our Bamboo Dining Table is the perfect centerpiece for family gatherings and dinner parties. Crafted from premium bamboo, this table offers exceptional durability while maintaining a lightweight design.',
            category: 'tables',
            material: 'bamboo',
            featured: true,
            dimensions: 'H 30" x W 60" x D 36"',
            weight: '45 lbs',
            features: [
                'Expandable Design',
                'Scratch-Resistant Surface',
                'Waterproof Coating',
                'Seats 6-8 People',
                'Modern Minimalist Style'
            ],
            specifications: {
                Material: 'Engineered Bamboo',
                Finish: 'Matte Protective Coating',
                Assembly: 'Required (30-45 minutes)',
                Care: 'Use coasters, avoid direct sunlight',
                Warranty: '10 Years'
            },
            reviews: [
                { name: 'Michael T.', rating: 5, comment: 'Stunning table that gets compliments from every guest!', date: '2024-01-12' },
                { name: 'Lisa R.', rating: 4, comment: 'Great quality and eco-friendly. Assembly was straightforward.', date: '2024-01-08' }
            ]
        },
        {
            id: 3,
            name: 'Bamboo Thread Set',
            price: '$89',
            image: thread,
            description: 'Our Bamboo Dining Table is the perfect centerpiece for family gatherings and dinner parties. Crafted from premium bamboo, this table offers exceptional durability while maintaining a lightweight design.',

            category: 'accessories',
            material: 'bamboo',
            featured: false,
            dimensions: 'H 30" x W 60" x D 36"',
            weight: '45 lbs',
            features: [
                'Expandable Design',
                'Scratch-Resistant Surface',
                'Waterproof Coating',
                'Seats 6-8 People',
                'Modern Minimalist Style'
            ],
            specifications: {
                Material: 'Engineered Bamboo',
                Finish: 'Matte Protective Coating',
                Assembly: 'Required (30-45 minutes)',
                Care: 'Use coasters, avoid direct sunlight',
                Warranty: '10 Years'
            },
            reviews: [
                { name: 'Michael T.', rating: 5, comment: 'Stunning table that gets compliments from every guest!', date: '2024-01-12' },
                { name: 'Lisa R.', rating: 4, comment: 'Great quality and eco-friendly. Assembly was straightforward.', date: '2024-01-08' }
            ]
        },
        {
            id: 4,
            name: 'Bamboo Utensil Set',
            price: '$49',
            image: spoon,
            description: 'Our Bamboo Dining Table is the perfect centerpiece for family gatherings and dinner parties. Crafted from premium bamboo, this table offers exceptional durability while maintaining a lightweight design.',
            category: 'accessories',
            material: 'bamboo',
            featured: false,
            dimensions: 'H 30" x W 60" x D 36"',
            weight: '45 lbs',
            features: [
                'Expandable Design',
                'Scratch-Resistant Surface',
                'Waterproof Coating',
                'Seats 6-8 People',
                'Modern Minimalist Style'
            ],
            specifications: {
                Material: 'Engineered Bamboo',
                Finish: 'Matte Protective Coating',
                Assembly: 'Required (30-45 minutes)',
                Care: 'Use coasters, avoid direct sunlight',
                Warranty: '10 Years'
            },
            reviews: [
                { name: 'Michael T.', rating: 5, comment: 'Stunning table that gets compliments from every guest!', date: '2024-01-12' },
                { name: 'Lisa R.', rating: 4, comment: 'Great quality and eco-friendly. Assembly was straightforward.', date: '2024-01-08' }
            ]
        },
        {
            id: 5,
            name: 'Bamboo Side Table',
            price: '$199',
            image: table,
            description: 'Our Bamboo Dining Table is the perfect centerpiece for family gatherings and dinner parties. Crafted from premium bamboo, this table offers exceptional durability while maintaining a lightweight design.',
            category: 'tables',
            material: 'bamboo',
            featured: false,
            dimensions: 'H 30" x W 60" x D 36"',
            weight: '45 lbs',
            features: [
                'Expandable Design',
                'Scratch-Resistant Surface',
                'Waterproof Coating',
                'Seats 6-8 People',
                'Modern Minimalist Style'
            ],
            specifications: {
                Material: 'Engineered Bamboo',
                Finish: 'Matte Protective Coating',
                Assembly: 'Required (30-45 minutes)',
                Care: 'Use coasters, avoid direct sunlight',
                Warranty: '10 Years'
            },
            reviews: [
                { name: 'Michael T.', rating: 5, comment: 'Stunning table that gets compliments from every guest!', date: '2024-01-12' },
                { name: 'Lisa R.', rating: 4, comment: 'Great quality and eco-friendly. Assembly was straightforward.', date: '2024-01-08' }
            ]
        },
        {
            id: 6,
            name: 'Bamboo Rocking Chair',
            price: '$399',
            image: chair,
            description: 'Our Bamboo Dining Table is the perfect centerpiece for family gatherings and dinner parties. Crafted from premium bamboo, this table offers exceptional durability while maintaining a lightweight design.',
            category: 'chairs',
            material: 'bamboo',
            featured: true,
            dimensions: 'H 30" x W 60" x D 36"',
            weight: '45 lbs',
            features: [
                'Expandable Design',
                'Scratch-Resistant Surface',
                'Waterproof Coating',
                'Seats 6-8 People',
                'Modern Minimalist Style'
            ],
            specifications: {
                Material: 'Engineered Bamboo',
                Finish: 'Matte Protective Coating',
                Assembly: 'Required (30-45 minutes)',
                Care: 'Use coasters, avoid direct sunlight',
                Warranty: '10 Years'
            },
            reviews: [
                { name: 'Michael T.', rating: 5, comment: 'Stunning table that gets compliments from every guest!', date: '2024-01-12' },
                { name: 'Lisa R.', rating: 4, comment: 'Great quality and eco-friendly. Assembly was straightforward.', date: '2024-01-08' }
            ]
        },
        {
            id: 7,
            name: 'Bamboo Cutlery Set',
            price: '$39',
            image: spoon,
            description: 'Our Bamboo Dining Table is the perfect centerpiece for family gatherings and dinner parties. Crafted from premium bamboo, this table offers exceptional durability while maintaining a lightweight design.',
            category: 'accessories',
            material: 'bamboo',
            featured: false,
            dimensions: 'H 30" x W 60" x D 36"',
            weight: '45 lbs',
            features: [
                'Expandable Design',
                'Scratch-Resistant Surface',
                'Waterproof Coating',
                'Seats 6-8 People',
                'Modern Minimalist Style'
            ],
            specifications: {
                Material: 'Engineered Bamboo',
                Finish: 'Matte Protective Coating',
                Assembly: 'Required (30-45 minutes)',
                Care: 'Use coasters, avoid direct sunlight',
                Warranty: '10 Years'
            },
            reviews: [
                { name: 'Michael T.', rating: 5, comment: 'Stunning table that gets compliments from every guest!', date: '2024-01-12' },
                { name: 'Lisa R.', rating: 4, comment: 'Great quality and eco-friendly. Assembly was straightforward.', date: '2024-01-08' }
            ]
        },
        {
            id: 8,
            name: 'Bamboo Coffee Table',
            price: '$349',
            image: table,
            description: 'Our Bamboo Dining Table is the perfect centerpiece for family gatherings and dinner parties. Crafted from premium bamboo, this table offers exceptional durability while maintaining a lightweight design.',
            category: 'tables',
            material: 'bamboo',
            featured: true,
            dimensions: 'H 30" x W 60" x D 36"',
            weight: '45 lbs',
            features: [
                'Expandable Design',
                'Scratch-Resistant Surface',
                'Waterproof Coating',
                'Seats 6-8 People',
                'Modern Minimalist Style'
            ],
            specifications: {
                Material: 'Engineered Bamboo',
                Finish: 'Matte Protective Coating',
                Assembly: 'Required (30-45 minutes)',
                Care: 'Use coasters, avoid direct sunlight',
                Warranty: '10 Years'
            },
            reviews: [
                { name: 'Michael T.', rating: 5, comment: 'Stunning table that gets compliments from every guest!', date: '2024-01-12' },
                { name: 'Lisa R.', rating: 4, comment: 'Great quality and eco-friendly. Assembly was straightforward.', date: '2024-01-08' }
            ]
        }
    ];

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const foundProduct = allProducts.find(p => p.id === parseInt(id));
        setProduct(foundProduct);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, [id]);

    // Get similar products (same category, excluding current product)
    const similarProducts = allProducts
        .filter(p => p.category === product?.category && p.id !== product?.id)
        .slice(0, 4); // Show max 4 similar products

    // Get featured products for fallback
    const featuredProducts = allProducts
        .filter(p => p.featured && p.id !== product?.id)
        .slice(0, 4);

    const productsToShow = similarProducts.length > 0 ? similarProducts : featuredProducts;

    if (!product) {
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
                    color: '#434242',
                    marginBottom: '20px'
                }}>
                    Product not found
                </h2>
                <button
                    onClick={() => navigate('/products')}
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
                        marginTop: '20px',
                        borderRadius: '5px'
                    }}
                >
                    Back to Products
                </button>
            </div>
        );
    }

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
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate('/products')}
                    >
                        Products
                    </span>
                    <span>›</span>
                    <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/products?category=${product.category}`)}
                    >
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </span>
                    <span>›</span>
                    <span style={{
                        color: '#E39963',
                        fontSize: isMobile ? '12px' : '14px'
                    }}>
                        {product.name}
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
                            backgroundColor: '#FAF9F7'
                        }}>
                            <img
                                src={product.images ? product.images[selectedImage] : product.image}
                                alt={product.name}
                                style={{
                                    width: '100%',
                                    height: isMobile ? '280px' : '500px',
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease'
                                }}
                            />
                            {product.featured && (
                                <div style={{
                                    position: 'absolute',
                                    top: isMobile ? '12px' : '20px',
                                    right: isMobile ? '12px' : '20px',
                                    backgroundColor: '#E39963',
                                    color: '#FFFFFF',
                                    padding: isMobile ? '6px 12px' : '8px 16px',
                                    fontSize: isMobile ? '10px' : '12px',
                                    fontWeight: '500',
                                    letterSpacing: '0.5px',
                                    borderRadius: '20px'
                                }}>
                                    Featured
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Images */}
                        {product.images && (
                            <div style={{
                                display: 'flex',
                                gap: isMobile ? '10px' : '15px',
                                overflowX: 'auto',
                                paddingBottom: '10px',
                                WebkitOverflowScrolling: 'touch'
                            }}>
                                {product.images.map((image, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            flex: '0 0 auto',
                                            width: isMobile ? '60px' : '80px',
                                            height: isMobile ? '60px' : '80px',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            border: selectedImage === index ? '2px solid #E39963' : '1px solid #F2EDE8',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} view ${index + 1}`}
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
                            {product.name}
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
                                color: '#E39963'
                            }}>
                                {product.price}
                            </div>
                            {product.originalPrice && (
                                <div style={{
                                    fontSize: isMobile ? '1rem' : '1.2rem',
                                    color: '#999',
                                    textDecoration: 'line-through'
                                }}>
                                    {product.originalPrice}
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
                            {product.description}
                        </p>

                        {/* Features List */}
                        {product.features && (
                            <div style={{
                                marginBottom: isMobile ? '25px' : '30px',
                                padding: isMobile ? '0 5px' : '0'
                            }}>
                                <h3 style={{
                                    fontSize: isMobile ? '1rem' : '1.1rem',
                                    fontWeight: '500',
                                    color: '#434242',
                                    marginBottom: isMobile ? '12px' : '15px'
                                }}>
                                    Key Features
                                </h3>
                                <div style={{
                                    display: 'grid',
                                    gap: isMobile ? '6px' : '8px'
                                }}>
                                    {product.features.map((feature, index) => (
                                        <div key={index} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: isMobile ? '8px' : '10px',
                                            fontSize: isMobile ? '13px' : '14px',
                                            color: '#666'
                                        }}>
                                            <div style={{
                                                width: isMobile ? '5px' : '6px',
                                                height: isMobile ? '5px' : '6px',
                                                backgroundColor: '#7DBA00',
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
                                border: '1px solid #F2EDE8',
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
                                        color: '#434242',
                                        minWidth: isMobile ? '44px' : 'auto'
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
                                        color: '#434242',
                                        minWidth: isMobile ? '44px' : 'auto'
                                    }}
                                >
                                    +
                                </button>
                            </div>

                            <button style={{
                                flex: '1',
                                padding: isMobile ? '16px 20px' : '15px 30px',
                                backgroundColor: '#434242',
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
                                        e.target.style.backgroundColor = '#E39963';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile) {
                                        e.target.style.backgroundColor = '#434242';
                                    }
                                }}
                                onTouchStart={(e) => {
                                    e.target.style.backgroundColor = '#E39963';
                                }}
                                onTouchEnd={(e) => {
                                    e.target.style.backgroundColor = '#434242';
                                }}
                            >
                                Add to Cart - {product.price}
                            </button>
                        </div>

                        {/* Quick Specs */}
                        {product.specifications && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(2, 1fr)',
                                gap: isMobile ? '12px' : '15px',
                                padding: isMobile ? '15px' : '20px',
                                backgroundColor: '#FAF9F7',
                                borderRadius: '10px'
                            }}>
                                <div>
                                    <div style={{
                                        fontSize: isMobile ? '11px' : '12px',
                                        color: '#999',
                                        marginBottom: isMobile ? '3px' : '5px'
                                    }}>
                                        Material
                                    </div>
                                    <div style={{
                                        fontSize: isMobile ? '13px' : '14px',
                                        color: '#434242',
                                        fontWeight: '500'
                                    }}>
                                        {product.specifications.Material || product.material}
                                    </div>
                                </div>
                                <div>
                                    <div style={{
                                        fontSize: isMobile ? '11px' : '12px',
                                        color: '#999',
                                        marginBottom: isMobile ? '3px' : '5px'
                                    }}>
                                        Dimensions
                                    </div>
                                    <div style={{
                                        fontSize: isMobile ? '13px' : '14px',
                                        color: '#434242',
                                        fontWeight: '500'
                                    }}>
                                        {product.dimensions || 'Various sizes'}
                                    </div>
                                </div>
                                <div>
                                    <div style={{
                                        fontSize: isMobile ? '11px' : '12px',
                                        color: '#999',
                                        marginBottom: isMobile ? '3px' : '5px'
                                    }}>
                                        Weight
                                    </div>
                                    <div style={{
                                        fontSize: isMobile ? '13px' : '14px',
                                        color: '#434242',
                                        fontWeight: '500'
                                    }}>
                                        {product.weight || 'Lightweight'}
                                    </div>
                                </div>
                                <div>
                                    <div style={{
                                        fontSize: isMobile ? '11px' : '12px',
                                        color: '#999',
                                        marginBottom: isMobile ? '3px' : '5px'
                                    }}>
                                        Warranty
                                    </div>
                                    <div style={{
                                        fontSize: isMobile ? '13px' : '14px',
                                        color: '#434242',
                                        fontWeight: '500'
                                    }}>
                                        {product.specifications.Warranty || '2 Years'}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div style={{ marginTop: isMobile ? '40px' : '60px' }}>
                    <div style={{
                        display: 'flex',
                        borderBottom: '1px solid #F2EDE8',
                        marginBottom: isMobile ? '20px' : '30px',
                        overflowX: 'auto',
                        WebkitOverflowScrolling: 'touch'
                    }}>
                        {['description', 'specifications', 'reviews'].map((tab) => (
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
                                    borderBottom: activeTab === tab ? '2px solid #E39963' : '2px solid transparent',
                                    color: activeTab === tab ? '#E39963' : '#666',
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
                                    {product.description}
                                </p>
                                {product.features && (
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                                        gap: isMobile ? '12px' : '20px',
                                        marginTop: isMobile ? '20px' : '30px'
                                    }}>
                                        {product.features.map((feature, index) => (
                                            <div key={index} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: isMobile ? '12px' : '15px',
                                                padding: isMobile ? '12px' : '15px',
                                                backgroundColor: '#FAF9F7',
                                                borderRadius: '8px'
                                            }}>
                                                <div style={{
                                                    width: isMobile ? '6px' : '8px',
                                                    height: isMobile ? '6px' : '8px',
                                                    backgroundColor: '#7DBA00',
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

                        {activeTab === 'specifications' && product.specifications && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                                gap: isMobile ? '15px' : '20px'
                            }}>
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: isMobile ? '12px 0' : '15px 0',
                                        borderBottom: '1px solid #F2EDE8'
                                    }}>
                                        <span style={{
                                            fontWeight: '500',
                                            color: '#434242',
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

                        {activeTab === 'reviews' && product.reviews && (
                            <div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: isMobile ? '12px' : '15px',
                                    marginBottom: isMobile ? '20px' : '30px'
                                }}>
                                    <div style={{
                                        fontSize: isMobile ? '1.8rem' : '2rem',
                                        fontWeight: '300',
                                        color: '#E39963'
                                    }}>
                                        4.8
                                    </div>
                                    <div>
                                        <div style={{
                                            fontSize: isMobile ? '13px' : '14px',
                                            color: '#666'
                                        }}>
                                            Based on {product.reviews.length} reviews
                                        </div>
                                        <div style={{
                                            fontSize: isMobile ? '11px' : '12px',
                                            color: '#999'
                                        }}>
                                            ★★★★★
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: isMobile ? '15px' : '20px'
                                }}>
                                    {product.reviews.map((review, index) => (
                                        <div key={index} style={{
                                            padding: isMobile ? '15px' : '20px',
                                            backgroundColor: '#FAF9F7',
                                            borderRadius: '10px'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'start',
                                                marginBottom: isMobile ? '8px' : '10px',
                                                flexDirection: isMobile ? 'column' : 'row',
                                                gap: isMobile ? '5px' : '0'
                                            }}>
                                                <div>
                                                    <div style={{
                                                        fontWeight: '500',
                                                        color: '#434242',
                                                        fontSize: isMobile ? '14px' : '16px'
                                                    }}>
                                                        {review.name}
                                                    </div>
                                                    <div style={{
                                                        fontSize: isMobile ? '11px' : '12px',
                                                        color: '#999'
                                                    }}>
                                                        {review.date}
                                                    </div>
                                                </div>
                                                <div style={{
                                                    fontSize: isMobile ? '13px' : '14px',
                                                    color: '#E39963'
                                                }}>
                                                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                                </div>
                                            </div>
                                            <p style={{
                                                fontSize: isMobile ? '13px' : '14px',
                                                lineHeight: '1.6',
                                                color: '#666',
                                                margin: 0
                                            }}>
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Similar Products Section */}
                <div style={{ marginTop: isMobile ? '60px' : '100px' }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.8rem' : '2.2rem',
                        fontWeight: '300',
                        color: '#434242',
                        textAlign: 'center',
                        marginBottom: isMobile ? '30px' : '50px',
                        letterSpacing: '1px'
                    }}>
                        {similarProducts.length > 0 ? 'Similar Products' : 'You Might Also Like'}
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: isMobile ? '25px' : '40px',
                        padding: isMobile ? '10px 0' : '0',
                        justifyItems: 'center'
                    }}>
                        {productsToShow.map(similarProduct => (
                            <div
                                key={similarProduct.id}
                                style={{
                                    position: 'relative',
                                    cursor: 'pointer',
                                    border: isMobile ? '1px solid #F2EDE8' : 'none',
                                    borderRadius: isMobile ? '10px' : '0',
                                    padding: isMobile ? '15px' : '0',
                                    backgroundColor: isMobile ? '#FFFFFF' : 'transparent',
                                    boxShadow: isMobile ? '0 2px 10px rgba(0,0,0,0.05)' : 'none',
                                    transition: 'all 0.3s ease',
                                    width: '100%',
                                    maxWidth: '380px'
                                }}
                                onClick={() => navigate(`/product/${similarProduct.id}`)}
                                onMouseEnter={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = isMobile ? '0 2px 10px rgba(0,0,0,0.05)' : 'none';
                                    }
                                }}
                            >
                                {/* Product Image */}
                                <div style={{
                                    position: 'relative',
                                    height: isMobile ? '250px' : '300px',
                                    overflow: 'hidden',
                                    marginBottom: isMobile ? '15px' : '20px',
                                    borderRadius: isMobile ? '8px' : '0'
                                }}>
                                    <img
                                        src={similarProduct.images ? similarProduct.images[0] : similarProduct.image}
                                        alt={similarProduct.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.4s ease'
                                        }}
                                    />

                                    {/* Featured Badge */}
                                    {similarProduct.featured && (
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
                                        {similarProduct.name}
                                    </h3>
                                    <p style={{
                                        fontSize: isMobile ? '0.85rem' : '0.9rem',
                                        color: '#434242',
                                        margin: '0 0 12px 0',
                                        opacity: 0.7,
                                        lineHeight: '1.4',
                                        minHeight: isMobile ? 'auto' : '40px'
                                    }}>
                                        {similarProduct.description}
                                    </p>
                                    <div style={{
                                        fontSize: isMobile ? '1rem' : '1rem',
                                        fontWeight: '400',
                                        color: '#E39963',
                                        letterSpacing: '0.5px',
                                        marginBottom: isMobile ? '12px' : '15px'
                                    }}>
                                        {similarProduct.price}
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
                                        width: '100%',
                                        borderRadius: isMobile ? '5px' : '0'
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
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductOverview;