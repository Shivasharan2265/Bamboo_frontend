import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderOne from '../layout/Header copy';

const TermsConditions = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [activeSection, setActiveSection] = useState('introduction');

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

    const sections = [
        {
            id: 'introduction',
            title: 'Introduction',
            content: 'Welcome to DooBamboo. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms.',
            color: '#E37DCC'
        },
        {
            id: 'definitions',
            title: 'Definitions',
            content: 'Key terms used in this agreement:',
            items: [
                { term: 'Website', definition: 'Refers to doobamboo.com and all associated subdomains' },
                { term: 'Services', definition: 'All products, features, and services offered through our website' },
                { term: 'User', definition: 'Any person or entity accessing or using our website' },
                { term: 'Content', definition: 'All text, images, graphics, and materials on our website' }
            ],
            color: '#7DBA00'
        },
        {
            id: 'account',
            title: 'User Accounts',
            content: 'Requirements and responsibilities for user accounts:',
            points: [
                'You must be at least 18 years old to create an account',
                'You are responsible for maintaining account security',
                'You must provide accurate and complete information',
                'We reserve the right to suspend accounts violating these terms'
            ],
            color: '#57C7C2'
        },
        {
            id: 'orders',
            title: 'Orders & Payments',
            content: 'Terms related to product orders and payments:',
            points: [
                'All orders are subject to acceptance and product availability',
                'Prices are in USD and subject to change without notice',
                'We accept major credit cards and digital payment methods',
                'Custom orders may require a deposit and have specific cancellation terms'
            ],
            color: '#E37DCC'
        },
        {
            id: 'shipping',
            title: 'Shipping & Delivery',
            content: 'Shipping terms and conditions:',
            points: [
                'Shipping times are estimates and not guarantees',
                'Risk of loss passes to you upon delivery',
                'You are responsible for providing accurate shipping address',
                'Additional shipping charges may apply for remote locations'
            ],
            color: '#7DBA00'
        },
        {
            id: 'returns',
            title: 'Returns & Refunds',
            content: 'Our return and refund policy:',
            points: [
                'Returns must be initiated within 30 days of delivery',
                'Items must be in original condition with all packaging',
                'Custom and personalized items cannot be returned',
                'Refunds are processed to the original payment method'
            ],
            color: '#57C7C2'
        },
        {
            id: 'intellectual',
            title: 'Intellectual Property',
            content: 'Ownership and usage rights:',
            points: [
                'All website content is owned by DooBamboo',
                'You may not reproduce or distribute our content without permission',
                'Product designs and branding are protected by copyright',
                'You retain rights to content you submit (reviews, photos)'
            ],
            color: '#E37DCC'
        },
        {
            id: 'conduct',
            title: 'User Conduct',
            content: 'Expected behavior when using our website:',
            points: [
                'Do not attempt to interfere with website functionality',
                'No fraudulent, abusive, or illegal activities',
                'Respect other users and their privacy',
                'No unauthorized commercial use of the website'
            ],
            color: '#7DBA00'
        },
        {
            id: 'liability',
            title: 'Limitation of Liability',
            content: 'Limitations on our responsibility:',
            points: [
                'We are not liable for indirect or consequential damages',
                'Maximum liability is limited to the purchase price',
                'We are not responsible for third-party actions',
                'Some jurisdictions may not allow certain limitations'
            ],
            color: '#57C7C2'
        },
        {
            id: 'privacy',
            title: 'Privacy',
            content: 'How we handle your personal information:',
            points: [
                'Your privacy is important to us',
                'We collect and use data as described in our Privacy Policy',
                'We implement security measures to protect your information',
                'We do not sell your personal data to third parties'
            ],
            color: '#E37DCC'
        },
        {
            id: 'changes',
            title: 'Changes to Terms',
            content: 'How we update these terms:',
            points: [
                'We may update these terms at any time',
                'Continued use after changes constitutes acceptance',
                'We will notify users of significant changes',
                'Previous versions remain archived for reference'
            ],
            color: '#7DBA00'
        },
        {
            id: 'governing',
            title: 'Governing Law',
            content: 'Legal jurisdiction and dispute resolution:',
            points: [
                'These terms are governed by United States law',
                'Disputes will be resolved in courts of competent jurisdiction',
                'We prefer to resolve issues through direct communication',
                'Arbitration may be required for certain disputes'
            ],
            color: '#57C7C2'
        }
    ];

    const quickLinks = [
        { id: 'introduction', title: 'Introduction' },
        { id: 'account', title: 'User Accounts' },
        { id: 'orders', title: 'Orders & Payments' },
        { id: 'shipping', title: 'Shipping' },
        { id: 'returns', title: 'Returns' },
        { id: 'intellectual', title: 'Intellectual Property' },
        { id: 'conduct', title: 'User Conduct' },
        { id: 'liability', title: 'Liability' },
        { id: 'privacy', title: 'Privacy' },
        { id: 'changes', title: 'Changes' },
        { id: 'governing', title: 'Governing Law' }
    ];

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
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
                        Terms & Conditions
                    </h1>
                    <p style={{
                        fontSize: isMobile ? '1.1rem' : '1.3rem',
                        color: '#666',
                        lineHeight: '1.6',
                        marginBottom: '40px'
                    }}>
                        Please read these terms carefully before using our website. 
                        By accessing or using DooBamboo, you agree to be bound by these terms.
                    </p>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 20px',
                        backgroundColor: 'rgba(87, 199, 194, 0.1)',
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#57C7C2',
                        fontWeight: '500'
                    }}>
                        📝 Last Updated: {new Date().toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div style={{
                display: isMobile ? 'block' : 'flex',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: isMobile ? '20px' : '40px'
            }}>
                {/* Sidebar Navigation */}
                {!isMobile && (
                    <div style={{
                        flex: '0 0 300px',
                        padding: '20px',
                        position: 'sticky',
                        top: '120px',
                        height: 'fit-content',
                        alignSelf: 'flex-start'
                    }}>
                        <h3 style={{
                            fontSize: '1.1rem',
                            fontWeight: '500',
                            color: '#434242',
                            marginBottom: '20px',
                            paddingBottom: '10px',
                            borderBottom: '2px solid #F0F0F0'
                        }}>
                            Quick Navigation
                        </h3>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}>
                            {quickLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    style={{
                                        padding: '12px 16px',
                                        backgroundColor: activeSection === link.id ? '#F8F8F8' : 'transparent',
                                        border: 'none',
                                        color: activeSection === link.id ? '#434242' : '#666',
                                        fontSize: '14px',
                                        fontWeight: activeSection === link.id ? '500' : '400',
                                        cursor: 'pointer',
                                        borderRadius: '6px',
                                        textAlign: 'left',
                                        transition: 'all 0.3s ease',
                                        borderLeft: activeSection === link.id ? '3px solid #57C7C2' : '3px solid transparent'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (activeSection !== link.id) {
                                            e.target.style.backgroundColor = '#F8F8F8';
                                            e.target.style.color = '#434242';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (activeSection !== link.id) {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.color = '#666';
                                        }
                                    }}
                                >
                                    {link.title}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Content */}
                <div style={{
                    flex: 1,
                    padding: isMobile ? '20px 0' : '0 40px'
                }}>
                    {/* Introduction */}
                    <div id="introduction" style={{
                        marginBottom: '50px'
                    }}>
                        <h2 style={{
                            fontSize: '1.8rem',
                            fontWeight: '400',
                            color: '#434242',
                            marginBottom: '20px',
                            paddingBottom: '10px',
                            borderBottom: '2px solid #F0F0F0'
                        }}>
                            Introduction
                        </h2>
                        <p style={{
                            fontSize: '16px',
                            color: '#666',
                            lineHeight: '1.7',
                            marginBottom: '20px'
                        }}>
                            Welcome to DooBamboo. These Terms and Conditions govern your use of our website 
                            and services. By accessing or using our website, you agree to be bound by these terms.
                        </p>
                        <p style={{
                            fontSize: '16px',
                            color: '#666',
                            lineHeight: '1.7'
                        }}>
                            If you disagree with any part of these terms, please do not use our website. 
                            We reserve the right to modify these terms at any time, and your continued 
                            use constitutes acceptance of those changes.
                        </p>
                    </div>

                    {/* Terms Sections */}
                    {sections.slice(1).map((section, index) => (
                        <div key={section.id} id={section.id} style={{
                            marginBottom: '50px',
                            padding: '30px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '12px',
                            borderLeft: `4px solid ${section.color}`,
                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                        }}>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: '500',
                                color: '#434242',
                                marginBottom: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <div style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '8px',
                                    backgroundColor: section.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px',
                                    color: '#FFFFFF',
                                    fontWeight: '600'
                                }}>
                                    {index + 1}
                                </div>
                                {section.title}
                            </h2>
                            
                            <p style={{
                                fontSize: '16px',
                                color: '#666',
                                lineHeight: '1.7',
                                marginBottom: section.items || section.points ? '20px' : '0'
                            }}>
                                {section.content}
                            </p>

                            {section.items && (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '15px',
                                    marginTop: '20px'
                                }}>
                                    {section.items.map((item, idx) => (
                                        <div key={idx} style={{
                                            padding: '15px',
                                            backgroundColor: 'rgba(125, 186, 0, 0.05)',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(125, 186, 0, 0.1)'
                                        }}>
                                            <div style={{
                                                fontWeight: '600',
                                                color: '#434242',
                                                marginBottom: '5px',
                                                fontSize: '15px'
                                            }}>
                                                {item.term}
                                            </div>
                                            <div style={{
                                                fontSize: '14px',
                                                color: '#666',
                                                lineHeight: '1.5'
                                            }}>
                                                {item.definition}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {section.points && (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    marginTop: '20px'
                                }}>
                                    {section.points.map((point, idx) => (
                                        <div key={idx} style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '12px',
                                            padding: '12px 15px',
                                            backgroundColor: 'rgba(87, 199, 194, 0.05)',
                                            borderRadius: '6px'
                                        }}>
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                backgroundColor: section.color,
                                                color: '#FFFFFF',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                flexShrink: 0,
                                                marginTop: '2px'
                                            }}>
                                                {idx + 1}
                                            </div>
                                            <span style={{
                                                fontSize: '15px',
                                                color: '#666',
                                                lineHeight: '1.5'
                                            }}>
                                                {point}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Acceptance Section */}
                    <div style={{
                        padding: '40px',
                        backgroundColor: '#F8F8F8',
                        borderRadius: '12px',
                        textAlign: 'center',
                        marginTop: '40px'
                    }}>
                        <h3 style={{
                            fontSize: '1.3rem',
                            fontWeight: '500',
                            color: '#434242',
                            marginBottom: '15px'
                        }}>
                            Acceptance of Terms
                        </h3>
                        <p style={{
                            fontSize: '16px',
                            color: '#666',
                            lineHeight: '1.7',
                            marginBottom: '25px'
                        }}>
                            By using our website, you acknowledge that you have read, understood, 
                            and agree to be bound by these Terms and Conditions.
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
                                    padding: '12px 24px',
                                    backgroundColor: '#7DBA00',
                                    border: 'none',
                                    color: '#FFFFFF',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    borderRadius: '6px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#6aa800';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#7DBA00';
                                }}
                            >
                                Contact for Questions
                            </button>
                            <button
                                onClick={() => navigate('/privacy')}
                                style={{
                                    padding: '12px 24px',
                                    backgroundColor: 'transparent',
                                    border: '2px solid #57C7C2',
                                    color: '#57C7C2',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    borderRadius: '6px',
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
                                View Privacy Policy
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Quick Links */}
            {isMobile && (
                <div style={{
                    padding: '20px',
                    backgroundColor: '#F8F8F8',
                    borderTop: '1px solid #F0F0F0'
                }}>
                    <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        color: '#434242',
                        marginBottom: '15px',
                        textAlign: 'center'
                    }}>
                        Jump to Section
                    </h3>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        justifyContent: 'center'
                    }}>
                        {quickLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: activeSection === link.id ? '#57C7C2' : '#FFFFFF',
                                    border: '1px solid #E0E0E0',
                                    color: activeSection === link.id ? '#FFFFFF' : '#666',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    borderRadius: '20px',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {link.title}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TermsConditions;