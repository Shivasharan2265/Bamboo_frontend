import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderOne from '../layout/Header copy';

const DeliveryPolicy = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

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

    const policySections = [
        {
            icon: '📦',
            title: 'Order Processing',
            content: 'All orders are processed within 1-2 business days after receiving your order confirmation email. Orders are not processed or shipped on weekends or holidays.',
            note: 'If we are experiencing high order volume, processing may be delayed by a few days. We will contact you if there are significant delays.'
        },
        {
            icon: '🌍',
            title: 'Shipping Destinations',
            content: 'We currently ship to the United States, Canada, United Kingdom, Australia, and European Union countries.',
            note: 'For international orders, any customs, import duties, or taxes are the responsibility of the buyer. We are not responsible for delays due to customs.'
        },
        {
            icon: '🚚',
            title: 'Shipping Methods & Costs',
            content: 'We offer multiple shipping options to meet your needs:',
            methods: [
                { type: 'Standard Shipping', time: '5-10 business days', cost: '$4.99 or Free on orders over $50' },
                { type: 'Expedited Shipping', time: '3-5 business days', cost: '$9.99' },
                { type: 'Overnight Shipping', time: '1-2 business days', cost: '$19.99' }
            ]
        },
        {
            icon: '📱',
            title: 'Order Tracking',
            content: 'Once your order has shipped, you will receive a shipping confirmation email with your tracking number. You can track your package directly through our website or the carrier\'s tracking system.'
        },
        {
            icon: '🏠',
            title: 'Delivery Address',
            content: 'Please ensure your shipping address is correct at checkout. We can only change the shipping address if the order is still in "processing" status.',
            warning: 'We are not responsible for orders shipped to incorrect addresses provided by the customer.'
        },
        {
            icon: '⚠️',
            title: 'Delivery Issues',
            issues: [
                {
                    type: 'Lost/Missing Packages',
                    action: 'If tracking shows delivered but you haven\'t received your package, contact your local post office first. Then email us within 7 days of the marked delivery date.'
                },
                {
                    type: 'Damaged Items',
                    action: 'Contact us immediately within 48 hours of delivery. Include photos of the damaged product and packaging for faster resolution.'
                }
            ]
        }
    ];

    const contactInfo = [
        { method: 'Email', details: 'support@doobamboo.com', icon: '✉️' },
        { method: 'Phone', details: '+1 (555) 123-4567', icon: '📞' },
        { method: 'Business Hours', details: '9:00 AM - 5:00 PM EST, Monday-Friday', icon: '🕒' }
    ];

    return (
        <div style={{
            width: '100%',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
            margin: 0,
            overflowX: 'hidden',
            backgroundColor: '#FFFFFF'
        }}>
            <HeaderOne />
            
            {/* Hero Section */}
            <section style={{
                padding: isMobile ? '80px 20px 60px' : '120px 50px 80px',
                backgroundColor: '#F8F8F8',
                textAlign: 'center',
                position: 'relative'
            }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    <h1 style={{
                        fontSize: isMobile ? '2.5rem' : '3.5rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: '20px',
                        lineHeight: '1.2'
                    }}>
                        Shipping & Delivery
                    </h1>
                    <p style={{
                        fontSize: isMobile ? '18px' : '20px',
                        color: '#666',
                        lineHeight: '1.6',
                        marginBottom: '40px',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Clear, transparent delivery information for your dooBamboo furniture. 
                        We're committed to getting your sustainable pieces to you safely and efficiently.
                    </p>
                   
                </div>
            </section>

            {/* Policy Overview */}
            <section style={{
                padding: isMobile ? '40px 20px' : '60px 50px',
                backgroundColor: '#FFFFFF'
            }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: '20px',
                        marginBottom: '40px'
                    }}>
                        <div style={{
                            padding: '25px',
                            backgroundColor: '#F8F8F8',
                            borderRadius: '10px',
                            borderLeft: '4px solid #7DBA00'
                        }}>
                            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📦</div>
                            <div style={{ fontWeight: '600', color: '#434242', marginBottom: '5px' }}>1-2 Days Processing</div>
                        </div>
                        <div style={{
                            padding: '25px',
                            backgroundColor: '#F8F8F8',
                            borderRadius: '10px',
                            borderLeft: '4px solid #57C7C2'
                        }}>
                            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🚚</div>
                            <div style={{ fontWeight: '600', color: '#434242', marginBottom: '5px' }}>Global Shipping</div>
                        </div>
                        <div style={{
                            padding: '25px',
                            backgroundColor: '#F8F8F8',
                            borderRadius: '10px',
                            borderLeft: '4px solid #E37DCC'
                        }}>
                            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📱</div>
                            <div style={{ fontWeight: '600', color: '#434242', marginBottom: '5px' }}>Real-time Tracking</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Policy Content */}
            <section style={{
                padding: isMobile ? '20px 20px 60px' : '40px 50px 80px',
                backgroundColor: '#FFFFFF'
            }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '40px'
                    }}>
                        {policySections.map((section, index) => (
                            <div key={index} style={{
                                padding: isMobile ? '25px' : '35px',
                                backgroundColor: '#F8F8F8',
                                borderRadius: '15px',
                                border: `1px solid ${index % 3 === 0 ? 'rgba(125, 186, 0, 0.1)' : index % 3 === 1 ? 'rgba(87, 199, 194, 0.1)' : 'rgba(227, 125, 204, 0.1)'}`
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '20px',
                                    marginBottom: '20px'
                                }}>
                                  
                                    <div style={{ flex: 1 }}>
                                        <h2 style={{
                                            fontSize: isMobile ? '1.4rem' : '1.6rem',
                                            fontWeight: '500',
                                            color: '#434242',
                                            marginBottom: '10px'
                                        }}>
                                            {section.title}
                                        </h2>
                                        <p style={{
                                            fontSize: isMobile ? '15px' : '16px',
                                            color: '#666',
                                            lineHeight: '1.6',
                                            marginBottom: section.note ? '15px' : '0'
                                        }}>
                                            {section.content}
                                        </p>
                                        
                                        {section.note && (
                                            <div style={{
                                                padding: '15px',
                                                backgroundColor: '#FFFFFF',
                                                borderRadius: '8px',
                                                borderLeft: '3px solid #57C7C2'
                                            }}>
                                                <p style={{
                                                    fontSize: '14px',
                                                    color: '#666',
                                                    margin: 0,
                                                    fontStyle: 'italic'
                                                }}>
                                                    {section.note}
                                                </p>
                                            </div>
                                        )}

                                        {section.warning && (
                                            <div style={{
                                                padding: '15px',
                                                backgroundColor: '#FFF5F5',
                                                borderRadius: '8px',
                                                borderLeft: '3px solid #E37DCC'
                                            }}>
                                                <p style={{
                                                    fontSize: '14px',
                                                    color: '#666',
                                                    margin: 0,
                                                    fontWeight: '500'
                                                }}>
                                                    ⚠️ {section.warning}
                                                </p>
                                            </div>
                                        )}

                                        {section.methods && (
                                            <div style={{
                                                marginTop: '20px'
                                            }}>
                                                {section.methods.map((method, idx) => (
                                                    <div key={idx} style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        padding: '12px 0',
                                                        borderBottom: idx < section.methods.length - 1 ? '1px solid #eee' : 'none'
                                                    }}>
                                                        <div>
                                                            <div style={{ fontWeight: '500', color: '#434242' }}>
                                                                {method.type}
                                                            </div>
                                                            <div style={{ fontSize: '14px', color: '#7DBA00' }}>
                                                                {method.time}
                                                            </div>
                                                        </div>
                                                        <div style={{ fontWeight: '500', color: '#434242' }}>
                                                            {method.cost}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {section.issues && (
                                            <div style={{
                                                marginTop: '20px'
                                            }}>
                                                {section.issues.map((issue, idx) => (
                                                    <div key={idx} style={{
                                                        marginBottom: '15px',
                                                        padding: '15px',
                                                        backgroundColor: '#FFFFFF',
                                                        borderRadius: '8px'
                                                    }}>
                                                        <div style={{
                                                            fontWeight: '600',
                                                            color: '#434242',
                                                            marginBottom: '8px',
                                                            fontSize: '15px'
                                                        }}>
                                                            {issue.type}
                                                        </div>
                                                        <div style={{
                                                            fontSize: '14px',
                                                            color: '#666',
                                                            lineHeight: '1.5'
                                                        }}>
                                                            {issue.action}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section style={{
                padding: isMobile ? '40px 20px' : '60px 50px',
                backgroundColor: '#F8F8F8'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.8rem' : '2.2rem',
                        fontWeight: '400',
                        color: '#434242',
                        marginBottom: '40px'
                    }}>
                        Need Help With Your Order?
                    </h2>
                    
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: '20px',
                        marginBottom: '40px'
                    }}>
                        {contactInfo.map((contact, index) => (
                            <div key={index} style={{
                                padding: '25px',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '10px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '15px' }}>
                                    {contact.icon}
                                </div>
                                <div style={{
                                    fontWeight: '600',
                                    color: '#434242',
                                    marginBottom: '8px'
                                }}>
                                    {contact.method}
                                </div>
                                <div style={{
                                    fontSize: '14px',
                                    color: '#666'
                                }}>
                                    {contact.details}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        padding: '25px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '10px',
                        textAlign: 'left'
                    }}>
                        <h3 style={{
                            fontSize: '1.2rem',
                            fontWeight: '500',
                            color: '#434242',
                            marginBottom: '15px'
                        }}>
                            Important Notes:
                        </h3>
                        <ul style={{
                            color: '#666',
                            lineHeight: '1.6',
                            paddingLeft: '20px',
                            margin: 0
                        }}>
                            <li>Delivery times are estimates and not guaranteed</li>
                            <li>Weekends and holidays are not counted as business days</li>
                            <li>Signature may be required for high-value items</li>
                            <li>Please inspect your delivery upon arrival</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: isMobile ? '40px 20px' : '60px 50px',
                backgroundColor: '#FFFFFF',
                textAlign: 'center'
            }}>
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.8rem' : '2.2rem',
                        fontWeight: '400',
                        color: '#434242',
                        marginBottom: '20px'
                    }}>
                        Ready to Transform Your Space?
                    </h2>
                    <p style={{
                        fontSize: isMobile ? '16px' : '17px',
                        color: '#666',
                        lineHeight: '1.6',
                        marginBottom: '30px'
                    }}>
                        Browse our sustainable bamboo furniture collection with confidence, 
                        knowing exactly when and how your pieces will arrive.
                    </p>
                    <button
                        onClick={() => navigate('/products')}
                        style={{
                            padding: isMobile ? '14px 30px' : '15px 40px',
                            backgroundColor: '#7DBA00',
                            border: 'none',
                            color: '#FFFFFF',
                            fontSize: isMobile ? '15px' : '16px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
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
                        Shop Now
                    </button>
                </div>
            </section>
        </div>
    );
};

export default DeliveryPolicy;