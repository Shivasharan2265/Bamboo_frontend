import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderOne from '../layout/Header copy';

const ReturnRefundPolicy = () => {
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
            icon: '⏰',
            title: 'Return Timeframe',
            content: 'You have 30 days from the delivery date to return your item for a full refund or exchange.',
            note: 'Custom and made-to-order items may have different return policies. Please check product descriptions carefully.',
            color: '#E37DCC'
        },
        {
            icon: '✅',
            title: 'Return Conditions',
            content: 'To be eligible for a return, your item must be in its original condition:',
            conditions: [
                'Unused, unassembled, and in original packaging',
                'All tags and labels attached',
                'No signs of wear or damage',
                'Original receipt or proof of purchase'
            ],
            color: '#7DBA00'
        },
        {
            icon: '🚫',
            title: 'Non-Returnable Items',
            content: 'The following items cannot be returned:',
            items: [
                'Custom or personalized furniture',
                'Assembly services',
                'Clearance or final sale items',
                'Damaged items due to misuse'
            ],
            color: '#57C7C2'
        },
        {
            icon: '🔧',
            title: 'Damaged or Defective Items',
            content: 'If your item arrives damaged or defective, we will make it right immediately.',
            process: [
                'Contact us within 48 hours of delivery',
                'Provide photos/video of the damage',
                'We will arrange pickup and replacement',
                'No return shipping costs for defective items'
            ],
            color: '#7DBA00'
        },
        {
            icon: '💸',
            title: 'Refund Process',
            content: 'Once we receive and inspect your return, we will process your refund.',
            timeline: [
                { step: 'Return Received', time: '1-2 business days' },
                { step: 'Refund Processed', time: '3-5 business days' },
                { step: 'Funds Available', time: '5-10 business days' }
            ],
            note: 'Shipping costs are non-refundable. Return shipping is the customer\'s responsibility unless item is defective.',
            color: '#E37DCC'
        },
        {
            icon: '📦',
            title: 'Return Shipping',
            content: 'How to return your item safely and efficiently:',
            instructions: [
                'Use original packaging whenever possible',
                'Include all original documentation',
                'Purchase shipping insurance for high-value items',
                'Email us the tracking number once shipped'
            ],
            warning: 'We recommend using a trackable shipping service. We cannot be responsible for lost return shipments.',
            color: '#57C7C2'
        }
    ];

    const processSteps = [
        { step: 1, icon: '📧', title: 'Contact Us', description: 'Email support with your order number and return reason' },
        { step: 2, icon: '🏷️', title: 'Get Authorization', description: 'We provide return authorization and instructions' },
        { step: 3, icon: '📦', title: 'Ship Item', description: 'Package securely and ship to our return center' },
        { step: 4, icon: '✅', title: 'Receive Refund', description: 'We process refund once item is received and inspected' }
    ];

    return (
        <div style={{
            width: '100%',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
            margin: 0,
            overflowX: 'hidden',
            backgroundColor: '#FFFFFF',
            lineHeight: '1.6'
        }}>
            <HeaderOne />
            
            {/* Hero Section */}
            <section style={{
                padding: isMobile ? '100px 20px 60px' : '140px 50px 80px',
                backgroundColor: '#FAF9F7',
                textAlign: 'center'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <h1 style={{
                        fontSize: isMobile ? '2.5rem' : '3.5rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: '20px',
                        lineHeight: '1.2'
                    }}>
                        Return & Refund Policy
                    </h1>
                    <p style={{
                        fontSize: isMobile ? '1.1rem' : '1.3rem',
                        color: '#666',
                        lineHeight: '1.6',
                        marginBottom: '40px'
                    }}>
                        We stand behind our sustainable bamboo furniture. Our hassle-free return process 
                        ensures your complete satisfaction with every purchase.
                    </p>
                </div>
            </section>

            {/* Process Steps */}
            <section style={{
                padding: isMobile ? '40px 20px' : '60px 50px',
                backgroundColor: '#FFFFFF'
            }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.8rem' : '2.2rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: '40px',
                        textAlign: 'center'
                    }}>
                        Simple 4-Step Return Process
                    </h2>
                    
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                        gap: '20px'
                    }}>
                        {processSteps.map((step, index) => (
                            <div key={index} style={{
                                textAlign: 'center',
                                padding: '30px 20px'
                            }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    margin: '0 auto 20px',
                                    backgroundColor: '#F8F8F8',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    border: `2px solid ${step.step === 1 ? '#E37DCC' : step.step === 2 ? '#7DBA00' : step.step === 3 ? '#57C7C2' : '#E37DCC'}`
                                }}>
                                    {step.icon}
                                </div>
                                <div style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    backgroundColor: step.step === 1 ? '#E37DCC' : step.step === 2 ? '#7DBA00' : step.step === 3 ? '#57C7C2' : '#E37DCC',
                                    color: '#FFFFFF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    margin: '0 auto 15px'
                                }}>
                                    {step.step}
                                </div>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '500',
                                    color: '#434242',
                                    marginBottom: '10px'
                                }}>
                                    {step.title}
                                </h3>
                                <p style={{
                                    fontSize: '14px',
                                    color: '#666',
                                    lineHeight: '1.5'
                                }}>
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Policy Details */}
            <section style={{
                padding: isMobile ? '40px 20px' : '60px 50px',
                backgroundColor: '#F8F8F8'
            }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.8rem' : '2.2rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: '40px',
                        textAlign: 'center'
                    }}>
                        Policy Details
                    </h2>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '30px'
                    }}>
                        {policySections.map((section, index) => (
                            <div key={index} style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '12px',
                                padding: '30px',
                                borderLeft: `4px solid ${section.color}`,
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '20px',
                                    marginBottom: '20px'
                                }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '12px',
                                        backgroundColor: section.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.5rem',
                                        color: '#FFFFFF',
                                        flexShrink: 0
                                    }}>
                                        {section.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{
                                            fontSize: '1.3rem',
                                            fontWeight: '500',
                                            color: '#434242',
                                            marginBottom: '10px'
                                        }}>
                                            {section.title}
                                        </h3>
                                        <p style={{
                                            fontSize: '16px',
                                            color: '#666',
                                            lineHeight: '1.6',
                                            marginBottom: '15px'
                                        }}>
                                            {section.content}
                                        </p>
                                    </div>
                                </div>

                                {section.conditions && (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px'
                                    }}>
                                        {section.conditions.map((condition, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '10px',
                                                backgroundColor: 'rgba(125, 186, 0, 0.05)',
                                                borderRadius: '6px'
                                            }}>
                                                <div style={{
                                                    color: '#7DBA00',
                                                    fontSize: '16px'
                                                }}>✓</div>
                                                <span style={{
                                                    fontSize: '14px',
                                                    color: '#666'
                                                }}>{condition}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {section.items && (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px'
                                    }}>
                                        {section.items.map((item, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '10px',
                                                backgroundColor: 'rgba(87, 199, 194, 0.05)',
                                                borderRadius: '6px'
                                            }}>
                                                <div style={{
                                                    color: '#57C7C2',
                                                    fontSize: '16px'
                                                }}>•</div>
                                                <span style={{
                                                    fontSize: '14px',
                                                    color: '#666'
                                                }}>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {section.process && (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px'
                                    }}>
                                        {section.process.map((step, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '10px',
                                                backgroundColor: 'rgba(125, 186, 0, 0.05)',
                                                borderRadius: '6px'
                                            }}>
                                                <div style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#7DBA00',
                                                    color: '#FFFFFF',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    flexShrink: 0
                                                }}>
                                                    {idx + 1}
                                                </div>
                                                <span style={{
                                                    fontSize: '14px',
                                                    color: '#666'
                                                }}>{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {section.timeline && (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                        marginTop: '15px'
                                    }}>
                                        {section.timeline.map((timeline, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '12px',
                                                backgroundColor: 'rgba(227, 125, 204, 0.05)',
                                                borderRadius: '6px'
                                            }}>
                                                <div style={{
                                                    fontWeight: '500',
                                                    color: '#434242',
                                                    fontSize: '14px'
                                                }}>
                                                    {timeline.step}
                                                </div>
                                                <div style={{
                                                    padding: '4px 12px',
                                                    backgroundColor: 'rgba(227, 125, 204, 0.1)',
                                                    borderRadius: '12px',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    color: '#E37DCC'
                                                }}>
                                                    {timeline.time}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {section.instructions && (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px',
                                        marginTop: '15px'
                                    }}>
                                        {section.instructions.map((instruction, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '10px',
                                                backgroundColor: 'rgba(87, 199, 194, 0.05)',
                                                borderRadius: '6px'
                                            }}>
                                                <div style={{
                                                    color: '#57C7C2',
                                                    fontSize: '14px'
                                                }}>•</div>
                                                <span style={{
                                                    fontSize: '14px',
                                                    color: '#666'
                                                }}>{instruction}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {section.note && (
                                    <div style={{
                                        padding: '15px',
                                        backgroundColor: 'rgba(125, 186, 0, 0.05)',
                                        borderRadius: '8px',
                                        borderLeft: '3px solid #7DBA00',
                                        marginTop: '15px'
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
                                        backgroundColor: 'rgba(227, 125, 204, 0.05)',
                                        borderRadius: '8px',
                                        borderLeft: '3px solid #E37DCC',
                                        marginTop: '15px'
                                    }}>
                                        <p style={{
                                            fontSize: '14px',
                                            color: '#666',
                                            margin: 0,
                                            fontWeight: '500'
                                        }}>
                                            {section.warning}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section style={{
                padding: isMobile ? '40px 20px' : '60px 50px',
                backgroundColor: '#FFFFFF'
            }}>
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontSize: isMobile ? '1.8rem' : '2.2rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: '15px'
                    }}>
                        Need Help with a Return?
                    </h2>
                    <p style={{
                        fontSize: isMobile ? '16px' : '18px',
                        color: '#666',
                        marginBottom: '40px'
                    }}>
                        Our support team is ready to help with returns, exchanges, or any questions.
                    </p>
                    
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <button
                            onClick={() => navigate('/contact')}
                            style={{
                                padding: '15px 30px',
                                backgroundColor: '#7DBA00',
                                border: 'none',
                                color: '#FFFFFF',
                                fontSize: '15px',
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
                            Contact Support
                        </button>
                        <button
                            onClick={() => navigate('/products')}
                            style={{
                                padding: '15px 30px',
                                backgroundColor: 'transparent',
                                border: '2px solid #57C7C2',
                                color: '#57C7C2',
                                fontSize: '15px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease'
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
                            Browse Products
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReturnRefundPolicy;