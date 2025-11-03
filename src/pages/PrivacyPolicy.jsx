import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderOne from '../layout/Header copy';

const PrivacyPolicy = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [activeSection, setActiveSection] = useState(null);

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
            id: 'information-collected',
            icon: '📊',
            title: 'Information We Collect',
            gradient: 'linear-gradient(135deg, #7DBA00 0%, #6aa800 100%)',
            content: 'We collect information to provide better services to all our users.',
            categories: [
                {
                    title: 'Personal Information',
                    items: [
                        'Name, email address, and contact details',
                        'Shipping and billing addresses',
                        'Payment information (processed securely)',
                        'Communication preferences'
                    ]
                },
                {
                    title: 'Usage Data',
                    items: [
                        'Website interaction and browsing behavior',
                        'Device information and IP address',
                        'Cookies and tracking technologies',
                        'Purchase history and preferences'
                    ]
                },
                {
                    title: 'Third-Party Information',
                    items: [
                        'Social media profiles (when connected)',
                        'Analytics data from partners',
                        'Marketing and advertising data'
                    ]
                }
            ]
        },
        {
            id: 'data-usage',
            icon: '🔍',
            title: 'How We Use Your Data',
            gradient: 'linear-gradient(135deg, #57C7C2 0%, #4ab4af 100%)',
            content: 'Your data helps us personalize and improve your experience.',
            uses: [
                {
                    purpose: 'Order Processing & Fulfillment',
                    description: 'Process purchases, arrange shipping, and provide order updates'
                },
                {
                    purpose: 'Customer Service',
                    description: 'Respond to inquiries and provide personalized support'
                },
                {
                    purpose: 'Personalization',
                    description: 'Recommend products and customize your shopping experience'
                },
                {
                    purpose: 'Marketing Communications',
                    description: 'Send updates about new products and promotions (with consent)'
                },
                {
                    purpose: 'Website Improvement',
                    description: 'Analyze usage patterns to enhance our platform'
                },
                {
                    purpose: 'Legal Compliance',
                    description: 'Meet regulatory requirements and prevent fraud'
                }
            ]
        },
        {
            id: 'data-sharing',
            icon: '🤝',
            title: 'Data Sharing & Disclosure',
            gradient: 'linear-gradient(135deg, #E37DCC 0%, #d16bb8 100%)',
            content: 'We respect your privacy and share data only when necessary.',
            sharing: [
                {
                    party: 'Service Providers',
                    examples: 'Shipping carriers, payment processors, analytics services',
                    purpose: 'Essential for order fulfillment and website operation'
                },
                {
                    party: 'Legal Requirements',
                    examples: 'Law enforcement, government agencies',
                    purpose: 'When required by law or to protect our rights'
                },
                {
                    party: 'Business Transfers',
                    examples: 'Mergers, acquisitions, asset sales',
                    purpose: 'Data transfer as part of business changes'
                },
                {
                    party: 'Marketing Partners',
                    examples: 'Advertising networks, social media platforms',
                    purpose: 'With your explicit consent only'
                }
            ],
            note: 'We never sell your personal data to third parties.'
        },
        {
            id: 'cookies',
            icon: '🍪',
            title: 'Cookies & Tracking',
            gradient: 'linear-gradient(135deg, #7DBA00 0%, #57C7C2 100%)',
            content: 'We use cookies to enhance your browsing experience.',
            cookies: [
                {
                    type: 'Essential Cookies',
                    purpose: 'Required for website functionality and security',
                    examples: 'Session management, shopping cart, login sessions'
                },
                {
                    type: 'Analytics Cookies',
                    purpose: 'Help us understand how visitors interact with our site',
                    examples: 'Google Analytics, heatmaps, user flow tracking'
                },
                {
                    type: 'Marketing Cookies',
                    purpose: 'Used to deliver relevant advertisements',
                    examples: 'Retargeting pixels, social media integrations'
                },
                {
                    type: 'Preference Cookies',
                    purpose: 'Remember your settings and preferences',
                    examples: 'Language selection, currency, display preferences'
                }
            ],
            control: 'You can control cookie settings through your browser or our cookie preference center.'
        },
        {
            id: 'data-rights',
            icon: '🛡️',
            title: 'Your Data Rights',
            gradient: 'linear-gradient(135deg, #57C7C2 0%, #E37DCC 100%)',
            content: 'You have control over your personal information.',
            rights: [
                {
                    right: 'Access',
                    description: 'Request a copy of your personal data we hold'
                },
                {
                    right: 'Correction',
                    description: 'Update or correct inaccurate information'
                },
                {
                    right: 'Deletion',
                    description: 'Request deletion of your personal data'
                },
                {
                    right: 'Objection',
                    description: 'Object to certain data processing activities'
                },
                {
                    right: 'Portability',
                    description: 'Receive your data in a machine-readable format'
                },
                {
                    right: 'Withdraw Consent',
                    description: 'Revoke consent for marketing communications'
                }
            ],
            process: 'To exercise these rights, contact us at privacy@doobamboo.com'
        },
        {
            id: 'data-security',
            icon: '🔒',
            title: 'Data Security',
            gradient: 'linear-gradient(135deg, #E37DCC 0%, #7DBA00 100%)',
            content: 'We implement robust security measures to protect your data.',
            measures: [
                'SSL encryption for all data transmissions',
                'Secure payment processing with PCI compliance',
                'Regular security audits and vulnerability assessments',
                'Access controls and authentication protocols',
                'Data encryption at rest and in transit',
                'Employee training on data protection'
            ],
            commitment: 'While we implement industry-standard security measures, no system is 100% secure. We continuously work to enhance our security protocols.'
        },
        {
            id: 'data-retention',
            icon: '⏰',
            title: 'Data Retention',
            gradient: 'linear-gradient(135deg, #7DBA00 0%, #E37DCC 100%)',
            content: 'We retain your data only as long as necessary.',
            periods: [
                {
                    dataType: 'Account Information',
                    retention: 'As long as your account is active + 3 years'
                },
                {
                    dataType: 'Purchase History',
                    retention: '7 years for tax and legal compliance'
                },
                {
                    dataType: 'Marketing Data',
                    retention: 'Until consent is withdrawn + 1 year'
                },
                {
                    dataType: 'Customer Service Records',
                    retention: '5 years from last interaction'
                },
                {
                    dataType: 'Website Analytics',
                    retention: '26 months from last visit'
                }
            ],
            deletion: 'You can request early deletion of your data by contacting us.'
        },
        {
            id: 'international',
            icon: '🌍',
            title: 'International Data Transfers',
            gradient: 'linear-gradient(135deg, #57C7C2 0%, #7DBA00 100%)',
            content: 'Your data may be transferred and processed globally.',
            transfers: [
                'Data may be processed in countries with different privacy laws',
                'We use EU-approved standard contractual clauses',
                'We ensure adequate protection for cross-border transfers',
                'Service providers are vetted for compliance'
            ],
            safeguard: 'We implement appropriate safeguards to protect your data regardless of where it is processed.'
        }
    ];

    const quickStats = [
        { number: '256-bit', label: 'SSL Encryption', icon: '🔐' },
        { number: '7', label: 'Data Rights', icon: '📜' },
        { number: '0', label: 'Data Sold', icon: '🚫' },
        { number: '24/7', label: 'Security Monitoring', icon: '👁️' }
    ];

    const contactInfo = [
        { method: 'Privacy Team', details: 'privacy@doobamboo.com', icon: '📧', color: '#7DBA00' },
        { method: 'Data Protection Officer', details: 'dpo@doobamboo.com', icon: '👤', color: '#57C7C2' },
        { method: 'General Support', details: 'support@doobamboo.com', icon: '💬', color: '#E37DCC' }
    ];

    const toggleSection = (sectionId) => {
        setActiveSection(activeSection === sectionId ? null : sectionId);
    };

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
            
            {/* Modern Hero Section */}
            <section style={{
                padding: isMobile ? '100px 20px 80px' : '140px 50px 100px',
                background: 'linear-gradient(135deg, #F8F8F8 0%, #FFFFFF 50%, #F0F7E9 100%)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 2
                }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 20px',
                        backgroundColor: 'rgba(87, 199, 194, 0.1)',
                        borderRadius: '50px',
                        marginBottom: '30px'
                    }}>
                        <span style={{ fontSize: '18px' }}>🛡️</span>
                        <span style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#57C7C2',
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px'
                        }}>
                            Privacy Commitment
                        </span>
                    </div>
                    
                    <h1 style={{
                        fontSize: isMobile ? '2.8rem' : '4rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: '25px',
                        lineHeight: '1.1',
                        letterSpacing: '-0.5px'
                    }}>
                        Privacy <span style={{
                            background: 'linear-gradient(135deg, #57C7C2 0%, #7DBA00 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: '400'
                        }}>
                            Policy
                        </span>
                    </h1>
                    
                    <p style={{
                        fontSize: isMobile ? '18px' : '20px',
                        color: '#666',
                        lineHeight: '1.6',
                        marginBottom: '40px',
                        maxWidth: '600px',
                        margin: '0 auto',
                        fontWeight: '300'
                    }}>
                        We are committed to protecting your privacy and being transparent 
                        about how we collect, use, and protect your personal data.
                    </p>

                    <div style={{
                        fontSize: isMobile ? '14px' : '15px',
                        color: '#7DBA00',
                        fontWeight: '500'
                    }}>
                        Last Updated: December 2024
                    </div>
                </div>

                {/* Background decorative elements */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    right: '5%',
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(87, 199, 194, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '5%',
                    width: '150px',
                    height: '150px',
                    background: 'radial-gradient(circle, rgba(125, 186, 0, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%'
                }}></div>
            </section>

            {/* Quick Stats */}
            <section style={{
                padding: isMobile ? '40px 20px' : '60px 50px',
                backgroundColor: '#FFFFFF'
            }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                        gap: '20px'
                    }}>
                        {quickStats.map((stat, index) => (
                            <div key={index} style={{
                                padding: '30px 20px',
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%)',
                                borderRadius: '20px',
                                border: '1px solid rgba(0,0,0,0.05)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                if (!isMobile) {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isMobile) {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                                }
                            }}>
                                <div style={{
                                    fontSize: '2.5rem',
                                    marginBottom: '15px'
                                }}>
                                    {stat.icon}
                                </div>
                                <div style={{
                                    fontSize: isMobile ? '1.8rem' : '2.2rem',
                                    fontWeight: '300',
                                    color: '#434242',
                                    marginBottom: '5px',
                                    lineHeight: '1'
                                }}>
                                    {stat.number}
                                </div>
                                <div style={{
                                    fontSize: '14px',
                                    color: '#666',
                                    fontWeight: '500'
                                }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Policy Navigation & Content */}
            <section style={{
                padding: isMobile ? '40px 20px' : '80px 50px',
                backgroundColor: '#F8F8F8'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '60px'
                    }}>
                        <h2 style={{
                            fontSize: isMobile ? '2rem' : '2.8rem',
                            fontWeight: '300',
                            color: '#434242',
                            marginBottom: '20px'
                        }}>
                            Your <span style={{ color: '#57C7C2' }}>Privacy</span> &<br />
                            <span style={{ color: '#7DBA00' }}>Data Protection</span>
                        </h2>
                        <p style={{
                            fontSize: isMobile ? '16px' : '18px',
                            color: '#666',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            Comprehensive information about how we handle and protect your personal data.
                        </p>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: '40px'
                    }}>
                        {/* Navigation Sidebar */}
                        <div style={{
                            flex: isMobile ? '0 0 auto' : '0 0 300px',
                            position: isMobile ? 'static' : 'sticky',
                            top: '100px',
                            alignSelf: 'flex-start',
                            height: 'fit-content'
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #FFFFFF 0%, #FCFCFC 100%)',
                                borderRadius: '20px',
                                padding: '30px',
                                border: '1px solid rgba(0,0,0,0.05)',
                                boxShadow: '0 8px 40px rgba(0,0,0,0.06)'
                            }}>
                                <h3 style={{
                                    fontSize: '1.2rem',
                                    fontWeight: '600',
                                    color: '#434242',
                                    marginBottom: '20px',
                                    paddingBottom: '15px',
                                    borderBottom: '2px solid #57C7C2'
                                }}>
                                    Policy Sections
                                </h3>
                                <nav>
                                    {policySections.map((section, index) => (
                                        <button
                                            key={section.id}
                                            onClick={() => {
                                                toggleSection(section.id);
                                                if (isMobile) {
                                                    document.getElementById(section.id)?.scrollIntoView({ 
                                                        behavior: 'smooth' 
                                                    });
                                                }
                                            }}
                                            style={{
                                                width: '100%',
                                                textAlign: 'left',
                                                padding: '12px 15px',
                                                marginBottom: '8px',
                                                backgroundColor: activeSection === section.id ? 'rgba(87, 199, 194, 0.1)' : 'transparent',
                                                border: 'none',
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                color: activeSection === section.id ? '#57C7C2' : '#666',
                                                fontWeight: activeSection === section.id ? '500' : '400'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isMobile && activeSection !== section.id) {
                                                    e.target.style.backgroundColor = 'rgba(87, 199, 194, 0.05)';
                                                    e.target.style.color = '#57C7C2';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isMobile && activeSection !== section.id) {
                                                    e.target.style.backgroundColor = 'transparent';
                                                    e.target.style.color = '#666';
                                                }
                                            }}
                                        >
                                            <span style={{ fontSize: '18px' }}>{section.icon}</span>
                                            <span style={{ fontSize: '14px' }}>{section.title}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div style={{ flex: 1 }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '30px'
                            }}>
                                {policySections.map((section, index) => (
                                    <div 
                                        key={section.id}
                                        id={section.id}
                                        style={{
                                            background: 'linear-gradient(135deg, #FFFFFF 0%, #FCFCFC 100%)',
                                            borderRadius: '24px',
                                            padding: '40px 35px',
                                            border: '1px solid rgba(0,0,0,0.05)',
                                            boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            transition: 'all 0.4s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isMobile) {
                                                e.currentTarget.style.transform = 'translateY(-5px)';
                                                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isMobile) {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.06)';
                                            }
                                        }}
                                    >
                                        {/* Accent Bar */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '0',
                                            left: '0',
                                            width: '100%',
                                            height: '4px',
                                            background: section.gradient
                                        }}></div>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '20px',
                                            marginBottom: '25px'
                                        }}>
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '16px',
                                                background: section.gradient,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '24px',
                                                flexShrink: 0
                                            }}>
                                                {section.icon}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{
                                                    fontSize: '1.4rem',
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
                                                    marginBottom: '20px'
                                                }}>
                                                    {section.content}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Information Categories */}
                                        {section.categories && (
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                                                gap: '20px'
                                            }}>
                                                {section.categories.map((category, idx) => (
                                                    <div key={idx} style={{
                                                        padding: '20px',
                                                        backgroundColor: 'rgba(125, 186, 0, 0.05)',
                                                        borderRadius: '12px',
                                                        border: '1px solid rgba(125, 186, 0, 0.1)'
                                                    }}>
                                                        <h4 style={{
                                                            fontSize: '1rem',
                                                            fontWeight: '600',
                                                            color: '#434242',
                                                            marginBottom: '15px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px'
                                                        }}>
                                                            <span style={{ color: '#7DBA00' }}>•</span>
                                                            {category.title}
                                                        </h4>
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '8px'
                                                        }}>
                                                            {category.items.map((item, itemIdx) => (
                                                                <div key={itemIdx} style={{
                                                                    display: 'flex',
                                                                    alignItems: 'flex-start',
                                                                    gap: '8px',
                                                                    fontSize: '14px',
                                                                    color: '#666'
                                                                }}>
                                                                    <span style={{ 
                                                                        color: '#7DBA00',
                                                                        marginTop: '2px'
                                                                    }}>▸</span>
                                                                    <span>{item}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Data Usage */}
                                        {section.uses && (
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                                                gap: '15px'
                                            }}>
                                                {section.uses.map((use, idx) => (
                                                    <div key={idx} style={{
                                                        padding: '18px',
                                                        backgroundColor: 'rgba(87, 199, 194, 0.05)',
                                                        borderRadius: '10px',
                                                        border: '1px solid rgba(87, 199, 194, 0.2)'
                                                    }}>
                                                        <div style={{
                                                            fontWeight: '600',
                                                            color: '#434242',
                                                            marginBottom: '8px',
                                                            fontSize: '14px'
                                                        }}>
                                                            {use.purpose}
                                                        </div>
                                                        <div style={{
                                                            fontSize: '13px',
                                                            color: '#666',
                                                            lineHeight: '1.5'
                                                        }}>
                                                            {use.description}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Data Sharing */}
                                        {section.sharing && (
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '15px'
                                            }}>
                                                {section.sharing.map((share, idx) => (
                                                    <div key={idx} style={{
                                                        padding: '20px',
                                                        backgroundColor: 'rgba(227, 125, 204, 0.05)',
                                                        borderRadius: '12px',
                                                        border: '1px solid rgba(227, 125, 204, 0.2)'
                                                    }}>
                                                        <div style={{
                                                            fontWeight: '600',
                                                            color: '#434242',
                                                            marginBottom: '8px',
                                                            fontSize: '15px'
                                                        }}>
                                                            {share.party}
                                                        </div>
                                                        <div style={{
                                                            fontSize: '13px',
                                                            color: '#666',
                                                            marginBottom: '8px'
                                                        }}>
                                                            <strong>Examples:</strong> {share.examples}
                                                        </div>
                                                        <div style={{
                                                            fontSize: '13px',
                                                            color: '#666'
                                                        }}>
                                                            <strong>Purpose:</strong> {share.purpose}
                                                        </div>
                                                    </div>
                                                ))}
                                                {section.note && (
                                                    <div style={{
                                                        padding: '15px',
                                                        backgroundColor: 'rgba(125, 186, 0, 0.1)',
                                                        borderRadius: '8px',
                                                        borderLeft: '4px solid #7DBA00',
                                                        marginTop: '10px'
                                                    }}>
                                                        <p style={{
                                                            fontSize: '14px',
                                                            color: '#666',
                                                            margin: 0,
                                                            fontWeight: '500'
                                                        }}>
                                                            💎 {section.note}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Cookies */}
                                        {section.cookies && (
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '15px'
                                            }}>
                                                {section.cookies.map((cookie, idx) => (
                                                    <div key={idx} style={{
                                                        padding: '18px',
                                                        backgroundColor: 'rgba(125, 186, 0, 0.05)',
                                                        borderRadius: '10px',
                                                        border: '1px solid rgba(125, 186, 0, 0.2)'
                                                    }}>
                                                        <div style={{
                                                            fontWeight: '600',
                                                            color: '#434242',
                                                            marginBottom: '8px',
                                                            fontSize: '14px'
                                                        }}>
                                                            {cookie.type}
                                                        </div>
                                                        <div style={{
                                                            fontSize: '13px',
                                                            color: '#666',
                                                            marginBottom: '8px'
                                                        }}>
                                                            <strong>Purpose:</strong> {cookie.purpose}
                                                        </div>
                                                        <div style={{
                                                            fontSize: '13px',
                                                            color: '#666'
                                                        }}>
                                                            <strong>Examples:</strong> {cookie.examples}
                                                        </div>
                                                    </div>
                                                ))}
                                                {section.control && (
                                                    <div style={{
                                                        padding: '15px',
                                                        backgroundColor: 'rgba(87, 199, 194, 0.1)',
                                                        borderRadius: '8px',
                                                        borderLeft: '4px solid #57C7C2',
                                                        marginTop: '10px'
                                                    }}>
                                                        <p style={{
                                                            fontSize: '14px',
                                                            color: '#666',
                                                            margin: 0,
                                                            fontWeight: '500'
                                                        }}>
                                                            🎛️ {section.control}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Data Rights */}
                                        {section.rights && (
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                                                gap: '15px'
                                            }}>
                                                {section.rights.map((right, idx) => (
                                                    <div key={idx} style={{
                                                        padding: '20px',
                                                        backgroundColor: 'rgba(87, 199, 194, 0.05)',
                                                        borderRadius: '12px',
                                                        border: '1px solid rgba(87, 199, 194, 0.2)',
                                                        textAlign: 'center'
                                                    }}>
                                                        <div style={{
                                                            fontSize: '2rem',
                                                            marginBottom: '10px'
                                                        }}>
                                                            {idx === 0 && '📋'}
                                                            {idx === 1 && '✏️'}
                                                            {idx === 2 && '🗑️'}
                                                            {idx === 3 && '🚫'}
                                                            {idx === 4 && '📤'}
                                                            {idx === 5 && '↩️'}
                                                        </div>
                                                        <div style={{
                                                            fontWeight: '600',
                                                            color: '#434242',
                                                            marginBottom: '8px',
                                                            fontSize: '14px'
                                                        }}>
                                                            {right.right}
                                                        </div>
                                                        <div style={{
                                                            fontSize: '13px',
                                                            color: '#666',
                                                            lineHeight: '1.4'
                                                        }}>
                                                            {right.description}
                                                        </div>
                                                    </div>
                                                ))}
                                                {section.process && (
                                                    <div style={{
                                                        gridColumn: isMobile ? '1' : '1 / -1',
                                                        padding: '20px',
                                                        backgroundColor: 'rgba(227, 125, 204, 0.1)',
                                                        borderRadius: '12px',
                                                        borderLeft: '4px solid #E37DCC',
                                                        textAlign: 'center'
                                                    }}>
                                                        <p style={{
                                                            fontSize: '14px',
                                                            color: '#666',
                                                            margin: 0,
                                                            fontWeight: '500'
                                                        }}>
                                                            📝 {section.process}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Security Measures */}
                                        {section.measures && (
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                                                gap: '12px'
                                            }}>
                                                {section.measures.map((measure, idx) => (
                                                    <div key={idx} style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '10px',
                                                        padding: '15px',
                                                        backgroundColor: 'rgba(227, 125, 204, 0.05)',
                                                        borderRadius: '8px',
                                                        border: '1px solid rgba(227, 125, 204, 0.1)'
                                                    }}>
                                                        <div style={{
                                                            color: '#E37DCC',
                                                            fontSize: '16px'
                                                        }}>🛡️</div>
                                                        <span style={{
                                                            fontSize: '14px',
                                                            color: '#666'
                                                        }}>{measure}</span>
                                                    </div>
                                                ))}
                                                {section.commitment && (
                                                    <div style={{
                                                        gridColumn: isMobile ? '1' : '1 / -1',
                                                        padding: '20px',
                                                        backgroundColor: 'rgba(125, 186, 0, 0.1)',
                                                        borderRadius: '12px',
                                                        borderLeft: '4px solid #7DBA00',
                                                        marginTop: '10px'
                                                    }}>
                                                        <p style={{
                                                            fontSize: '14px',
                                                            color: '#666',
                                                            margin: 0,
                                                            fontStyle: 'italic'
                                                        }}>
                                                            💪 {section.commitment}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Data Retention */}
                                        {section.periods && (
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '12px'
                                            }}>
                                                {section.periods.map((period, idx) => (
                                                    <div key={idx} style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '1fr auto',
                                                        gap: '15px',
                                                        padding: '15px',
                                                        backgroundColor: 'rgba(87, 199, 194, 0.05)',
                                                        borderRadius: '8px',
                                                        border: '1px solid rgba(87, 199, 194, 0.2)',
                                                        alignItems: 'center'
                                                    }}>
                                                        <div style={{
                                                            fontWeight: '500',
                                                            color: '#434242',
                                                            fontSize: '14px'
                                                        }}>
                                                            {period.dataType}
                                                        </div>
                                                        <div style={{
                                                            padding: '6px 12px',
                                                            background: 'rgba(87, 199, 194, 0.1)',
                                                            borderRadius: '20px',
                                                            fontSize: '12px',
                                                            fontWeight: '600',
                                                            color: '#57C7C2'
                                                        }}>
                                                            {period.retention}
                                                        </div>
                                                    </div>
                                                ))}
                                                {section.deletion && (
                                                    <div style={{
                                                        padding: '15px',
                                                        backgroundColor: 'rgba(227, 125, 204, 0.1)',
                                                        borderRadius: '8px',
                                                        borderLeft: '4px solid #E37DCC',
                                                        marginTop: '10px'
                                                    }}>
                                                        <p style={{
                                                            fontSize: '14px',
                                                            color: '#666',
                                                            margin: 0,
                                                            fontWeight: '500'
                                                        }}>
                                                            🔄 {section.deletion}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* International Transfers */}
                                        {section.transfers && (
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '12px'
                                            }}>
                                                {section.transfers.map((transfer, idx) => (
                                                    <div key={idx} style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        gap: '10px',
                                                        padding: '15px',
                                                        backgroundColor: 'rgba(125, 186, 0, 0.05)',
                                                        borderRadius: '8px',
                                                        border: '1px solid rgba(125, 186, 0, 0.1)'
                                                    }}>
                                                        <div style={{
                                                            color: '#7DBA00',
                                                            fontSize: '16px',
                                                            marginTop: '2px'
                                                        }}>✓</div>
                                                        <span style={{
                                                            fontSize: '14px',
                                                            color: '#666'
                                                        }}>{transfer}</span>
                                                    </div>
                                                ))}
                                                {section.safeguard && (
                                                    <div style={{
                                                        padding: '15px',
                                                        backgroundColor: 'rgba(87, 199, 194, 0.1)',
                                                        borderRadius: '8px',
                                                        borderLeft: '4px solid #57C7C2',
                                                        marginTop: '10px'
                                                    }}>
                                                        <p style={{
                                                            fontSize: '14px',
                                                            color: '#666',
                                                            margin: 0,
                                                            fontWeight: '500'
                                                        }}>
                                                            🌐 {section.safeguard}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact & Updates Section */}
            <section style={{
                padding: isMobile ? '60px 20px' : '80px 50px',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%)'
            }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontSize: isMobile ? '2rem' : '2.5rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: '15px'
                    }}>
                        Privacy <span style={{ color: '#E37DCC' }}>Questions</span> &<br />
                        <span style={{ color: '#57C7C2' }}>Updates</span>
                    </h2>
                    <p style={{
                        fontSize: isMobile ? '16px' : '18px',
                        color: '#666',
                        marginBottom: '50px',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}>
                        Contact our privacy team with any questions or concerns about your data.
                    </p>
                    
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: '25px',
                        marginBottom: '50px'
                    }}>
                        {contactInfo.map((contact, index) => (
                            <div key={index} style={{
                                padding: '35px 25px',
                                background: 'linear-gradient(135deg, #FFFFFF 0%, #FCFCFC 100%)',
                                borderRadius: '20px',
                                border: `1px solid ${contact.color}20`,
                                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                if (!isMobile) {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.borderColor = `${contact.color}40`;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isMobile) {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = `${contact.color}20`;
                                }
                            }}>
                                <div style={{ 
                                    fontSize: '2.5rem', 
                                    marginBottom: '20px' 
                                }}>
                                    {contact.icon}
                                </div>
                                <div style={{
                                    fontWeight: '600',
                                    color: '#434242',
                                    marginBottom: '8px',
                                    fontSize: '1.1rem'
                                }}>
                                    {contact.method}
                                </div>
                                <div style={{
                                    fontSize: '15px',
                                    color: contact.color,
                                    fontWeight: '500'
                                }}>
                                    {contact.details}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Policy Updates */}
                    <div style={{
                        background: 'linear-gradient(135deg, #7DBA00 0%, #57C7C2 100%)',
                        borderRadius: '20px',
                        padding: '40px',
                        color: '#FFFFFF',
                        textAlign: 'left'
                    }}>
                        <h3 style={{
                            fontSize: '1.3rem',
                            fontWeight: '500',
                            marginBottom: '20px'
                        }}>
                            🔄 Policy Updates
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                            gap: '15px',
                            fontSize: '14px'
                        }}>
                            <div>• We may update this policy periodically</div>
                            <div>• Significant changes will be notified via email</div>
                            <div>• Continued use constitutes acceptance of changes</div>
                            <div>• Review this page regularly for updates</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modern CTA Section */}
            <section style={{
                padding: isMobile ? '60px 20px' : '80px 50px',
                background: 'linear-gradient(135deg, #F8F8F8 0%, #FFFFFF 100%)',
                textAlign: 'center'
            }}>
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    <h2 style={{
                        fontSize: isMobile ? '2rem' : '2.5rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: '20px'
                    }}>
                        Your <span style={{ 
                            background: 'linear-gradient(135deg, #57C7C2 0%, #E37DCC 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>Privacy</span> Matters
                    </h2>
                    <p style={{
                        fontSize: isMobile ? '16px' : '18px',
                        color: '#666',
                        lineHeight: '1.6',
                        marginBottom: '40px'
                    }}>
                        We are committed to protecting your data and being transparent about our practices.
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
                                padding: isMobile ? '16px 35px' : '18px 45px',
                                background: 'linear-gradient(135deg, #57C7C2 0%, #4ab4af 100%)',
                                border: 'none',
                                color: '#FFFFFF',
                                fontSize: isMobile ? '15px' : '16px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                borderRadius: '12px',
                                boxShadow: '0 8px 25px rgba(87, 199, 194, 0.3)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-3px)';
                                e.target.style.boxShadow = '0 12px 35px rgba(87, 199, 194, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 8px 25px rgba(87, 199, 194, 0.3)';
                            }}
                        >
                            Contact Privacy Team
                        </button>
                        <button
                            onClick={() => navigate('/products')}
                            style={{
                                padding: isMobile ? '16px 35px' : '18px 45px',
                                backgroundColor: 'transparent',
                                border: '2px solid #7DBA00',
                                color: '#7DBA00',
                                fontSize: isMobile ? '15px' : '16px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                borderRadius: '12px'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#7DBA00';
                                e.target.style.color = '#FFFFFF';
                                e.target.style.transform = 'translateY(-3px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#7DBA00';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            Shop With Confidence
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;