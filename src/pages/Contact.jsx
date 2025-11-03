import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderOne from '../layout/Header copy';

const Contact = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeFAQ, setActiveFAQ] = useState(null);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setIsSubmitting(false);
            alert('Thank you for your message! We\'ll get back to you soon.');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        }, 2000);
    };

    const toggleFAQ = (index) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    const contactMethods = [
        {
            icon: '📧',
            title: 'Email Us',
            description: 'We\'ll respond within 24 hours',
            contact: 'hello@doobamboo.com',
            link: 'mailto:hello@doobamboo.com',
            gradient: 'linear-gradient(135deg, #57C7C2 0%, #4AB3AE 100%)'
        },
        {
            icon: '📞',
            title: 'Call Us',
            description: 'Mon-Fri from 9am to 6pm',
            contact: '+1 (555) 123-BAMBOO',
            link: 'tel:+155512322626',
            gradient: 'linear-gradient(135deg, #E37DCC 0%, #D16BB8 100%)'
        },
        {
            icon: '📍',
            title: 'Visit Our Studio',
            description: 'Come see our craftsmanship',
            contact: '123 Bamboo Lane, Eco City, EC 12345',
            link: 'https://maps.google.com',
            gradient: 'linear-gradient(135deg, #7DBA00 0%, #6AA300 100%)'
        }
    ];

    const faqs = [
        {
            question: 'How sustainable is bamboo furniture?',
            answer: 'Bamboo is one of the most sustainable materials available. It grows rapidly, requires no pesticides, and regenerates from its own root system. Our bamboo is sourced from responsibly managed forests and we use eco-friendly finishes.'
        },
        {
            question: 'What is your shipping time?',
            answer: 'Most orders ship within 5-7 business days. Custom pieces may take 2-3 weeks depending on complexity. We offer free shipping on orders over $500 and provide tracking information for all shipments.'
        },
        {
            question: 'Do you offer custom designs?',
            answer: 'Yes! We love collaborating on custom projects. Contact us with your ideas and we\'ll work together to bring your vision to life. Our design team will provide sketches and 3D renderings before starting production.'
        },
        {
            question: 'How do I care for bamboo furniture?',
            answer: 'Simply wipe with a damp cloth and mild soap. Avoid harsh chemicals and prolonged direct sunlight to maintain the natural beauty. For deeper cleaning, use a specialized bamboo cleaner and apply bamboo oil every 6-12 months.'
        },
        {
            question: 'What is your return policy?',
            answer: 'We offer a 30-day return policy for unused items in original condition. Custom pieces are final sale. If you receive damaged furniture, contact us within 48 hours for a replacement or repair.'
        },
        {
            question: 'Do you ship internationally?',
            answer: 'Yes, we ship to over 50 countries worldwide. International shipping costs and delivery times vary by location. All international orders are subject to local customs fees and import taxes.'
        }
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
            
            {/* Enhanced Hero Section */}
            <section style={{
                padding: isMobile ? '100px 20px 60px' : '140px 50px 80px',
                background: 'linear-gradient(135deg, #F8F8F8 0%, #FFFFFF 100%)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-10%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(87, 199, 194, 0.1) 0%, rgba(87, 199, 194, 0) 70%)',
                    borderRadius: '50%'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '-30%',
                    left: '-10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(125, 186, 0, 0.1) 0%, rgba(125, 186, 0, 0) 70%)',
                    borderRadius: '50%'
                }}></div>
                
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 2
                }}>
                    <div style={{
                        fontSize: isMobile ? '14px' : '15px',
                        fontWeight: '600',
                        color: '#7DBA00',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        marginBottom: '20px',
                        display: 'inline-block',
                        padding: '8px 20px',
                        backgroundColor: 'rgba(125, 186, 0, 0.1)',
                        borderRadius: '50px'
                    }}>
                        Get In Touch
                    </div>
                    <h1 style={{
                        fontSize: isMobile ? '2.75rem' : '4rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: '25px',
                        lineHeight: '1.1'
                    }}>
                        Let's Create<br />
                        <span style={{
                            background: 'linear-gradient(135deg, #7DBA00, #57C7C2)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>Something Beautiful</span>
                    </h1>
                    <p style={{
                        fontSize: isMobile ? '18px' : '20px',
                        color: '#666',
                        lineHeight: '1.7',
                        marginBottom: '40px',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Have questions about our sustainable bamboo furniture? 
                        We'd love to hear from you and help bring your vision to life.
                    </p>
                </div>
            </section>

            {/* Enhanced Contact Methods Section */}
            <section style={{
                padding: isMobile ? '80px 20px' : '120px 50px',
                backgroundColor: '#FFFFFF',
                position: 'relative'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: isMobile ? '50px' : '80px'
                    }}>
                        <h2 style={{
                            fontSize: isMobile ? '2.25rem' : '3rem',
                            fontWeight: '300',
                            color: '#434242',
                            marginBottom: '20px'
                        }}>
                            Multiple Ways to<br />
                            <span style={{ color: '#57C7C2' }}>Connect With Us</span>
                        </h2>
                        <p style={{
                            fontSize: isMobile ? '16px' : '18px',
                            color: '#666',
                            maxWidth: '600px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            Choose the method that works best for you. We're here to help with any questions about our sustainable bamboo furniture.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: isMobile ? '30px' : '40px'
                    }}>
                        {contactMethods.map((method, index) => (
                            <div 
                                key={index}
                                onClick={() => window.open(method.link, '_blank')}
                                style={{
                                    padding: isMobile ? '35px 25px' : '50px 30px',
                                    background: '#FFFFFF',
                                    borderRadius: '20px',
                                    textAlign: 'center',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(-10px)';
                                        e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.12)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)';
                                    }
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    right: '0',
                                    height: '4px',
                                    background: method.gradient
                                }}></div>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: method.gradient,
                                    borderRadius: '50%',
                                    margin: '0 auto 25px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    color: '#FFFFFF',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                                }}>
                                    {method.icon}
                                </div>
                                <h3 style={{
                                    fontSize: isMobile ? '1.4rem' : '1.5rem',
                                    fontWeight: '600',
                                    color: '#434242',
                                    marginBottom: '15px'
                                }}>
                                    {method.title}
                                </h3>
                                <p style={{
                                    fontSize: isMobile ? '15px' : '16px',
                                    color: '#666',
                                    lineHeight: '1.6',
                                    margin: '0 0 20px 0'
                                }}>
                                    {method.description}
                                </p>
                                <div style={{
                                    fontSize: isMobile ? '15px' : '16px',
                                    color: method.gradient.includes('#57C7C2') ? '#57C7C2' : 
                                           method.gradient.includes('#E37DCC') ? '#E37DCC' : '#7DBA00',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    padding: '10px 20px',
                                    border: `2px solid ${method.gradient.includes('#57C7C2') ? 'rgba(87, 199, 194, 0.2)' : 
                                            method.gradient.includes('#E37DCC') ? 'rgba(227, 125, 204, 0.2)' : 'rgba(125, 186, 0, 0.2)'}`,
                                    borderRadius: '50px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isMobile) {
                                        e.target.style.background = method.gradient.includes('#57C7C2') ? '#57C7C2' : 
                                                                   method.gradient.includes('#E37DCC') ? '#E37DCC' : '#7DBA00';
                                        e.target.style.color = '#FFFFFF';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile) {
                                        e.target.style.background = 'transparent';
                                        e.target.style.color = method.gradient.includes('#57C7C2') ? '#57C7C2' : 
                                                              method.gradient.includes('#E37DCC') ? '#E37DCC' : '#7DBA00';
                                    }
                                }}>
                                    {method.contact}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Contact Form & FAQ Section */}
            <section style={{
                padding: isMobile ? '60px 20px' : '100px 50px',
                background: 'linear-gradient(135deg, #F8F8F8 0%, #FFFFFF 100%)',
                position: 'relative'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr',
                    gap: isMobile ? '50px' : '80px',
                    alignItems: 'start'
                }}>
                    {/* Enhanced Contact Form */}
                    <div>
                        <div style={{
                            marginBottom: '40px'
                        }}>
                            <div style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#E37DCC',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                marginBottom: '15px'
                            }}>
                                Send us a Message
                            </div>
                            <h2 style={{
                                fontSize: isMobile ? '2rem' : '2.5rem',
                                fontWeight: '400',
                                color: '#434242',
                                marginBottom: '15px',
                                lineHeight: '1.3'
                            }}>
                                Let's Start a<br />Conversation
                            </h2>
                            <p style={{
                                fontSize: '16px',
                                color: '#666',
                                lineHeight: '1.6'
                            }}>
                                Fill out the form below and our team will get back to you within 24 hours.
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubmit} style={{
                            backgroundColor: '#FFFFFF',
                            padding: isMobile ? '35px 25px' : '50px',
                            borderRadius: '20px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '25px'
                            }}>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                    gap: '25px'
                                }}>
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: '#434242',
                                            marginBottom: '10px'
                                        }}>
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            style={{
                                                width:"100%",
                                               minHeight:"40px",
                                                border: '2px solid #F0F0F0',
                                                borderRadius: '12px',
                                                fontSize: '16px',
                                                transition: 'all 0.3s ease',
                                                backgroundColor: '#FFFFFF',
                                                outline: 'none'
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
                                    </div>
                                    <div style={{width:"100%"}}>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: '#434242',
                                            marginBottom: '10px'
                                        }}>
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            style={{
                                                                                             
                                                  width:"100%",
                                               minHeight:"40px",
                                                border: '2px solid #F0F0F0',
                                                borderRadius: '12px',
                                                fontSize: '16px',
                                                transition: 'all 0.3s ease',
                                                backgroundColor: '#FFFFFF',
                                                outline: 'none'
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
                                    </div>
                                </div>
                                
                                <div style={{width:"100%"}}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#434242',
                                        marginBottom: '10px'
                                    }}>
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                              width:"100%",
                                               minHeight:"40px",
                                           
                                            border: '2px solid #F0F0F0',
                                            borderRadius: '12px',
                                            fontSize: '16px',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#FFFFFF',
                                            outline: 'none'
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
                                </div>
                                
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#434242',
                                        marginBottom: '10px'
                                    }}>
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows="6"
                                        style={{
                                            width: '93%',
                                            minHeight: '40px',
                                            padding: '15px 20px',
                                            border: '2px solid #F0F0F0',
                                            borderRadius: '12px',
                                            fontSize: '16px',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#FFFFFF',
                                            resize: 'vertical',
                                            fontFamily: 'inherit',
                                            outline: 'none',
                                            lineHeight: '1.5'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#57C7C2';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(87, 199, 194, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#F0F0F0';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                        placeholder="Tell us about your project or questions..."
                                    ></textarea>
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        padding: isMobile ? '16px 30px' : '18px 40px',
                                        background: isSubmitting ? '#cccccc' : 'linear-gradient(135deg, #7DBA00 0%, #6AA300 100%)',
                                        border: 'none',
                                        color: '#FFFFFF',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s ease',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1.5px',
                                        borderRadius: '12px',
                                        width: '100%',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSubmitting && !isMobile) {
                                            e.target.style.transform = 'translateY(-2px)';
                                            e.target.style.boxShadow = '0 10px 25px rgba(125, 186, 0, 0.3)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSubmitting && !isMobile) {
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.boxShadow = 'none';
                                        }
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span style={{ opacity: 0.7 }}>Sending...</span>
                                        </>
                                    ) : (
                                        'Send Message →'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Enhanced FAQ Section */}
                    <div>
                        <div style={{
                            marginBottom: '40px'
                        }}>
                            <div style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#7DBA00',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                marginBottom: '15px'
                            }}>
                                Common Questions
                            </div>
                            <h2 style={{
                                fontSize: isMobile ? '2rem' : '2.5rem',
                                fontWeight: '400',
                                color: '#434242',
                                marginBottom: '15px',
                                lineHeight: '1.3'
                            }}>
                                Frequently Asked<br />Questions
                            </h2>
                            <p style={{
                                fontSize: '16px',
                                color: '#666',
                                lineHeight: '1.6'
                            }}>
                                Quick answers to common questions about our bamboo furniture and services.
                            </p>
                        </div>
                        
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px'
                        }}>
                            {faqs.map((faq, index) => (
                                <div 
                                    key={index}
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        padding: '25px',
                                        borderRadius: '15px',
                                        border: `1px solid ${activeFAQ === index ? '#57C7C2' : 'rgba(0,0,0,0.05)'}`,
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        boxShadow: activeFAQ === index ? '0 10px 30px rgba(87, 199, 194, 0.15)' : '0 5px 15px rgba(0,0,0,0.05)'
                                    }}
                                    onClick={() => toggleFAQ(index)}
                                    onMouseEnter={(e) => {
                                        if (!isMobile) {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isMobile && activeFAQ !== index) {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
                                        }
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        gap: '15px'
                                    }}>
                                        <h3 style={{
                                            fontSize: '1.1rem',
                                            fontWeight: '600',
                                            color: '#434242',
                                            margin: '0',
                                            lineHeight: '1.4',
                                            flex: 1
                                        }}>
                                            {faq.question}
                                        </h3>
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            background: activeFAQ === index ? '#57C7C2' : '#F0F0F0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: activeFAQ === index ? '#FFFFFF' : '#666',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            transition: 'all 0.3s ease',
                                            flexShrink: 0,
                                            transform: activeFAQ === index ? 'rotate(45deg)' : 'rotate(0)'
                                        }}>
                                            +
                                        </div>
                                    </div>
                                    {activeFAQ === index && (
                                        <p style={{
                                            fontSize: '15px',
                                            color: '#666',
                                            lineHeight: '1.6',
                                            margin: '15px 0 0 0',
                                            paddingTop: '15px',
                                            borderTop: '1px solid rgba(0,0,0,0.1)',
                                            animation: 'fadeIn 0.3s ease'
                                        }}>
                                            {faq.answer}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

         
        </div>
    );
};

export default Contact;