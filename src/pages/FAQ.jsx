import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderOne from '../layout/Header copy';

const FAQ = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [openItems, setOpenItems] = useState(new Set());

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

    const faqCategories = [
        { id: 'all', name: 'All Questions', color: '#7DBA00' },
        { id: 'products', name: 'Products', color: '#E37DCC' },
        { id: 'shipping', name: 'Shipping', color: '#57C7C2' },
        { id: 'returns', name: 'Returns', color: '#7DBA00' },
        { id: 'materials', name: 'Materials', color: '#E37DCC' },
        { id: 'orders', name: 'Orders', color: '#57C7C2' }
    ];

    const faqItems = [
        {
            id: 1,
            question: 'What makes bamboo a sustainable material?',
            answer: 'Bamboo is one of the most sustainable materials available because it grows incredibly fast (up to 3 feet per day), requires no pesticides or fertilizers, self-regenerates from its roots, and produces 35% more oxygen than equivalent trees. Our bamboo is sourced from responsibly managed forests with FSC certification.',
            category: 'materials',
            featured: true
        },
        {
            id: 2,
            question: 'How long does shipping take?',
            answer: 'Standard shipping takes 7-14 business days. Express shipping (2-5 business days) is available for an additional fee. We offer free standard shipping on all orders over $500. You\'ll receive tracking information as soon as your order ships.',
            category: 'shipping',
            featured: true
        },
        {
            id: 3,
            question: 'Do you offer international shipping?',
            answer: 'Yes, we ship to most countries worldwide. International shipping typically takes 14-21 business days and shipping costs vary by destination. Customs fees and import duties are the responsibility of the customer.',
            category: 'shipping'
        },
        {
            id: 4,
            question: 'What is your return policy?',
            answer: 'We offer a 30-day return policy for unused items in original condition. Custom-made furniture cannot be returned unless damaged or defective. Return shipping is free for defective items. Please contact our customer service team to initiate a return.',
            category: 'returns',
            featured: true
        },
        {
            id: 5,
            question: 'How do I care for bamboo furniture?',
            answer: 'Bamboo requires minimal maintenance. Clean with a damp cloth and mild soap, then dry immediately. Avoid prolonged exposure to direct sunlight or extreme moisture. Use coasters under glasses and hot items. Apply bamboo oil every 6-12 months to maintain luster.',
            category: 'materials'
        },
        {
            id: 6,
            question: 'Can bamboo furniture be used outdoors?',
            answer: 'While bamboo is naturally water-resistant, we recommend our outdoor-specific collection for exterior use. Our indoor furniture is treated for indoor conditions only. Outdoor bamboo furniture has additional weatherproofing treatments.',
            category: 'products'
        },
        {
            id: 7,
            question: 'Do you offer custom sizes or designs?',
            answer: 'Absolutely! We specialize in custom bamboo furniture. Contact us with your requirements, dimensions, and design preferences. Custom orders typically take 4-6 weeks for production and may require a 50% deposit.',
            category: 'products',
            featured: true
        },
        {
            id: 8,
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. We also offer financing options through Affirm for orders over $500.',
            category: 'orders'
        }
    ];

    const toggleItem = (id) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(id)) {
            newOpenItems.delete(id);
        } else {
            newOpenItems.add(id);
        }
        setOpenItems(newOpenItems);
    };

    const filteredFaqs = faqItems.filter(item => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = searchTerm === '' || 
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredFaqs = faqItems.filter(item => item.featured);

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
            
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #FAF9F7 0%, #FFFFFF 100%)',
                padding: isMobile ? '60px 20px' : '100px 40px',
                textAlign: 'center'
            }}>
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    <h1 style={{
                        fontSize: isMobile ? '2.5rem' : '3.5rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: '20px',
                        lineHeight: '1.2'
                    }}>
                        Help Center
                    </h1>
                    <p style={{
                        fontSize: isMobile ? '1.1rem' : '1.3rem',
                        color: '#666',
                        lineHeight: '1.6',
                        marginBottom: '40px'
                    }}>
                        Find answers to common questions about our bamboo products and services.
                    </p>

                    {/* Search Bar */}
                    <div style={{
                        maxWidth: '500px',
                        margin: '0 auto',
                        position: 'relative'
                    }}>
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '18px 50px 18px 25px',
                                border: '2px solid #F0F0F0',
                                borderRadius: '12px',
                                fontSize: '16px',
                                backgroundColor: '#FFFFFF',
                                transition: 'all 0.3s ease',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#57C7C2';
                                e.target.style.boxShadow = '0 0 0 3px rgba(87, 199, 194, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#F0F0F0';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            right: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#57C7C2',
                            fontSize: '20px'
                        }}>
                            🔍
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                padding: isMobile ? '40px 20px' : '80px 40px'
            }}>

                {/* Featured FAQs */}
                {searchTerm === '' && activeCategory === 'all' && (
                    <div style={{
                        marginBottom: '60px'
                    }}>
                        <h2 style={{
                            fontSize: isMobile ? '1.5rem' : '2rem',
                            fontWeight: '400',
                            color: '#434242',
                            marginBottom: '30px',
                            textAlign: 'center'
                        }}>
                            Popular Questions
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(1, 1fr)',
                            gap: '20px'
                        }}>
                            {featuredFaqs.map((faq) => (
                                <div key={faq.id} style={{
                                    backgroundColor: '#FFFFFF',
                                    border: '2px solid #F8F8F8',
                                    borderRadius: '12px',
                                    padding: '25px',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onClick={() => toggleItem(faq.id)} 
                                onMouseEnter={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.borderColor = '#57C7C2';
                                        e.currentStyle.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.borderColor = '#F8F8F8';
                                        e.currentStyle.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        gap: '15px'
                                    }}>
                                        <h3 style={{
                                            fontSize: '1.1rem',
                                            fontWeight: '500',
                                            color: '#434242',
                                            margin: '0 0 15px 0',
                                            lineHeight: '1.4',
                                            flex: 1
                                        }}>
                                            {faq.question}
                                        </h3>
                                        <div style={{
                                            fontSize: '18px',
                                            color: '#57C7C2',
                                            flexShrink: 0,
                                            transition: 'transform 0.3s ease',
                                            transform: openItems.has(faq.id) ? 'rotate(180deg)' : 'rotate(0)'
                                        }}>
                                            ▼
                                        </div>
                                    </div>
                                    {openItems.has(faq.id) && (
                                        <div style={{
                                            paddingTop: '15px',
                                            borderTop: '1px solid #F0F0F0'
                                        }}>
                                            <p style={{
                                                fontSize: '15px',
                                                color: '#666',
                                                lineHeight: '1.6',
                                                margin: 0
                                            }}>
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Category Filters */}
                <div style={{
                    marginBottom: '40px',
                    textAlign: 'center'
                }}>
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        {faqCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                style={{
                                    padding: '12px 24px',
                                    backgroundColor: activeCategory === category.id ? category.color : '#F8F8F8',
                                    border: 'none',
                                    color: activeCategory === category.id ? '#FFFFFF' : '#666',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    borderRadius: '8px'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isMobile && activeCategory !== category.id) {
                                        e.target.style.backgroundColor = '#F0F0F0';
                                        e.target.style.color = '#434242';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile && activeCategory !== category.id) {
                                        e.target.style.backgroundColor = '#F8F8F8';
                                        e.target.style.color = '#666';
                                    }
                                }}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ List */}
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    {filteredFaqs.length > 0 ? (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px'
                        }}>
                            {filteredFaqs.map((faq) => {
                                const categoryColor = faqCategories.find(cat => cat.id === faq.category)?.color || '#57C7C2';
                                return (
                                    <div key={faq.id} style={{
                                        backgroundColor: '#FFFFFF',
                                        border: '2px solid #F8F8F8',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isMobile) {
                                            e.currentTarget.style.borderColor = categoryColor;
                                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isMobile) {
                                            e.currentTarget.style.borderColor = '#F8F8F8';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }
                                    }}>
                                        <div
                                            style={{
                                                padding: '25px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                gap: '20px'
                                            }}
                                            onClick={() => toggleItem(faq.id)} 
                                        >
                                            <div style={{ flex: 1 }}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                    marginBottom: '8px'
                                                }}>
                                                    <span style={{
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        color: categoryColor,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px'
                                                    }}>
                                                        {faq.category}
                                                    </span>
                                                </div>
                                                <h3 style={{
                                                    fontSize: '1.1rem',
                                                    fontWeight: '500',
                                                    color: '#434242',
                                                    margin: 0,
                                                    lineHeight: '1.4'
                                                }}>
                                                    {faq.question}
                                                </h3>
                                            </div>
                                            <div style={{
                                                fontSize: '18px',
                                                color: categoryColor,
                                                flexShrink: 0,
                                                transition: 'transform 0.3s ease',
                                                transform: openItems.has(faq.id) ? 'rotate(180deg)' : 'rotate(0)'
                                            }}>
                                                ▼
                                            </div>
                                        </div>
                                        {openItems.has(faq.id) && ( 
                                            <div style={{
                                                padding: '0 25px 25px 25px',
                                                borderTop: '1px solid #F0F0F0',
                                                marginTop: '15px'
                                            }}>
                                                <p style={{
                                                    fontSize: '15px',
                                                    color: '#666',
                                                    lineHeight: '1.6',
                                                    margin: 0
                                                }}>
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        /* No Results */
                        <div style={{
                            textAlign: 'center',
                            padding: '60px 20px',
                            color: '#666'
                        }}>
                            <div style={{
                                fontSize: '4rem',
                                marginBottom: '20px',
                                opacity: 0.3
                            }}>
                                ❓
                            </div>
                            <h3 style={{
                                fontSize: '1.3rem',
                                fontWeight: '400',
                                color: '#434242',
                                marginBottom: '15px'
                            }}>
                                No questions found
                            </h3>
                            <p style={{
                                fontSize: '16px',
                                marginBottom: '25px'
                            }}>
                                {searchTerm ? 
                                    `No results found for "${searchTerm}". Try different keywords.` :
                                    'No questions available in this category.'
                                }
                            </p>
                            {(searchTerm || activeCategory !== 'all') && (
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setActiveCategory('all');
                                    }}
                                    style={{
                                        padding: '12px 24px',
                                        backgroundColor: '#7DBA00',
                                        border: 'none',
                                        color: '#FFFFFF',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        borderRadius: '8px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#6aa800';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = '#7DBA00';
                                    }}
                                >
                                    Show All Questions
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Contact CTA */}
                <div style={{
                    textAlign: 'center',
                    marginTop: '80px',
                    padding: '50px',
                    backgroundColor: '#FAF9F7',
                    borderRadius: '16px'
                }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.5rem' : '2rem',
                        fontWeight: '400',
                        color: '#434242',
                        marginBottom: '15px'
                    }}>
                        Still need help?
                    </h2>
                    <p style={{
                        fontSize: isMobile ? '16px' : '18px',
                        color: '#666',
                        marginBottom: '30px'
                    }}>
                        Our support team is here to assist you.
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <button
                            onClick={() => navigate('/contact')}
                            style={{
                                padding: '16px 32px',
                                backgroundColor: '#7DBA00',
                                border: 'none',
                                color: '#FFFFFF',
                                fontSize: '15px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                borderRadius: '8px'
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
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;