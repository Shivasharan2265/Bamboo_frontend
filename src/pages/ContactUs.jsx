import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderOne from '../layout/Header copy';

const ContactUs = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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

    const contactMethods = [
        {
            icon: '📧',
            title: 'Email Us',
            details: 'hello@doobamboo.com',
            description: 'Send us an email anytime',
            color: '#E37DCC'
        },
        {
            icon: '📞',
            title: 'Call Us',
            details: '+1 (555) 123-4567',
            description: 'Mon-Fri from 9am to 6pm',
            color: '#7DBA00'
        },
        {
            icon: '📍',
            title: 'Visit Us',
            details: '123 Bamboo Street, Eco City',
            description: 'Showroom open by appointment',
            color: '#57C7C2'
        }
    ];

    const faqs = [
        {
            question: 'Do you offer custom bamboo furniture?',
            answer: 'Yes! We specialize in custom bamboo furniture. Contact us with your requirements and we\'ll create a unique piece for your space.'
        },
        {
            question: 'What is your shipping policy?',
            answer: 'We offer free shipping on orders over $500. Standard delivery takes 7-14 business days. Express shipping is available.'
        },
        {
            question: 'How do I care for bamboo products?',
            answer: 'Bamboo requires minimal maintenance. Simply wipe with a damp cloth and avoid prolonged exposure to direct sunlight or moisture.'
        },
        {
            question: 'Are your products sustainably sourced?',
            answer: 'Absolutely! All our bamboo comes from FSC-certified sustainable forests and we use eco-friendly production methods.'
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Here you would typically send the form data to your backend
            console.log('Form submitted:', formData);
            
            // Show success message
            setIsSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            
        } catch (error) {
            setErrors({ submit: 'Failed to send message. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
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
            
            {/* Breadcrumb */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: isMobile ? '20px 20px 10px' : '40px 40px 20px',
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
                        onClick={() => navigate('/')}
                        onMouseEnter={(e) => {
                            e.target.style.color = '#7DBA00';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '#57C7C2';
                        }}
                    >
                        Home
                    </span>
                    <span style={{ color: '#E37DCC' }}>›</span>
                    <span style={{
                        color: '#7DBA00',
                        fontSize: isMobile ? '12px' : '14px',
                        fontWeight: '500'
                    }}>
                        Contact Us
                    </span>
                </div>
            </div>

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: isMobile ? '0 20px 40px' : '0 40px 80px',
            }}>
                {/* Header Section */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: isMobile ? '40px' : '60px'
                }}>
                    <h1 style={{
                        fontSize: isMobile ? '2.5rem' : '3.5rem',
                        fontWeight: '300',
                        color: '#434242',
                        marginBottom: isMobile ? '15px' : '20px',
                        lineHeight: '1.2'
                    }}>
                        Get In Touch
                    </h1>
                    <p style={{
                        fontSize: isMobile ? '16px' : '18px',
                        color: '#666',
                        lineHeight: '1.6',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Have questions about our bamboo products? We'd love to hear from you. 
                        Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                {/* Contact Methods */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: isMobile ? '20px' : '30px',
                    marginBottom: isMobile ? '40px' : '60px'
                }}>
                    {contactMethods.map((method, index) => (
                        <div key={index} style={{
                            backgroundColor: '#F8F8F8',
                            borderRadius: '12px',
                            padding: isMobile ? '25px 20px' : '30px 25px',
                            textAlign: 'center',
                            border: `1px solid ${method.color}20`,
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            if (!isMobile) {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = `0 10px 30px ${method.color}20`;
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isMobile) {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }
                        }}>
                            <div style={{
                                fontSize: isMobile ? '2.5rem' : '3rem',
                                marginBottom: '15px'
                            }}>
                                {method.icon}
                            </div>
                            <h3 style={{
                                fontSize: isMobile ? '1.2rem' : '1.3rem',
                                fontWeight: '500',
                                color: '#434242',
                                marginBottom: '10px'
                            }}>
                                {method.title}
                            </h3>
                            <p style={{
                                fontSize: '16px',
                                color: method.color,
                                fontWeight: '600',
                                marginBottom: '8px'
                            }}>
                                {method.details}
                            </p>
                            <p style={{
                                fontSize: '14px',
                                color: '#666',
                                margin: 0
                            }}>
                                {method.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: isMobile ? '40px' : '60px',
                    marginBottom: isMobile ? '40px' : '60px'
                }}>
                    {/* Contact Form */}
                    <div>
                        <h2 style={{
                            fontSize: isMobile ? '1.5rem' : '2rem',
                            fontWeight: '400',
                            color: '#434242',
                            marginBottom: isMobile ? '20px' : '30px'
                        }}>
                            Send us a Message
                        </h2>

                        {isSubmitted ? (
                            <div style={{
                                backgroundColor: 'rgba(125, 186, 0, 0.1)',
                                border: '1px solid rgba(125, 186, 0, 0.3)',
                                borderRadius: '12px',
                                padding: '30px',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    fontSize: '3rem',
                                    marginBottom: '20px'
                                }}>
                                    ✅
                                </div>
                                <h3 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: '500',
                                    color: '#7DBA00',
                                    marginBottom: '15px'
                                }}>
                                    Message Sent Successfully!
                                </h3>
                                <p style={{
                                    fontSize: '16px',
                                    color: '#666',
                                    lineHeight: '1.6',
                                    marginBottom: '25px'
                                }}>
                                    Thank you for reaching out. We'll get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
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
                                        if (!isMobile) {
                                            e.target.style.backgroundColor = '#6aa800';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isMobile) {
                                            e.target.style.backgroundColor = '#7DBA00';
                                        }
                                    }}
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{
                                backgroundColor: '#F8F8F8',
                                borderRadius: '12px',
                                padding: isMobile ? '25px 20px' : '30px',
                                border: '1px solid rgba(87, 199, 194, 0.2)'
                            }}>
                                {/* Name Field */}
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#434242',
                                        marginBottom: '8px'
                                    }}>
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                        style={{
                                            width: '100%',
                                            padding: '14px 16px',
                                            border: `1px solid ${errors.name ? '#E37DCC' : 'rgba(87, 199, 194, 0.3)'}`,
                                            borderRadius: '8px',
                                            fontSize: '15px',
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
                                            e.target.style.borderColor = errors.name ? '#E37DCC' : 'rgba(87, 199, 194, 0.3)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    {errors.name && (
                                        <div style={{
                                            color: '#E37DCC',
                                            fontSize: '13px',
                                            marginTop: '6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            ⚠️ {errors.name}
                                        </div>
                                    )}
                                </div>

                                {/* Email and Phone Row */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                    gap: '15px',
                                    marginBottom: '20px'
                                }}>
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#434242',
                                            marginBottom: '8px'
                                        }}>
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="your@email.com"
                                            style={{
                                                width: '100%',
                                                padding: '14px 16px',
                                                border: `1px solid ${errors.email ? '#E37DCC' : 'rgba(87, 199, 194, 0.3)'}`,
                                                borderRadius: '8px',
                                                fontSize: '15px',
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
                                                e.target.style.borderColor = errors.email ? '#E37DCC' : 'rgba(87, 199, 194, 0.3)';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                        {errors.email && (
                                            <div style={{
                                                color: '#E37DCC',
                                                fontSize: '13px',
                                                marginTop: '6px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                ⚠️ {errors.email}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#434242',
                                            marginBottom: '8px'
                                        }}>
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+1 (555) 123-4567"
                                            style={{
                                                width: '100%',
                                                padding: '14px 16px',
                                                border: '1px solid rgba(87, 199, 194, 0.3)',
                                                borderRadius: '8px',
                                                fontSize: '15px',
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
                                                e.target.style.borderColor = 'rgba(87, 199, 194, 0.3)';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Subject Field */}
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#434242',
                                        marginBottom: '8px'
                                    }}>
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        placeholder="What is this regarding?"
                                        style={{
                                            width: '100%',
                                            padding: '14px 16px',
                                            border: `1px solid ${errors.subject ? '#E37DCC' : 'rgba(87, 199, 194, 0.3)'}`,
                                            borderRadius: '8px',
                                            fontSize: '15px',
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
                                            e.target.style.borderColor = errors.subject ? '#E37DCC' : 'rgba(87, 199, 194, 0.3)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    {errors.subject && (
                                        <div style={{
                                            color: '#E37DCC',
                                            fontSize: '13px',
                                            marginTop: '6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            ⚠️ {errors.subject}
                                        </div>
                                    )}
                                </div>

                                {/* Message Field */}
                                <div style={{ marginBottom: '25px' }}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#434242',
                                        marginBottom: '8px'
                                    }}>
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Tell us about your project or inquiry..."
                                        rows="6"
                                        style={{
                                            width: '100%',
                                            padding: '14px 16px',
                                            border: `1px solid ${errors.message ? '#E37DCC' : 'rgba(87, 199, 194, 0.3)'}`,
                                            borderRadius: '8px',
                                            fontSize: '15px',
                                            backgroundColor: '#FFFFFF',
                                            transition: 'all 0.3s ease',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            fontFamily: 'inherit'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#57C7C2';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(87, 199, 194, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = errors.message ? '#E37DCC' : 'rgba(87, 199, 194, 0.3)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    {errors.message && (
                                        <div style={{
                                            color: '#E37DCC',
                                            fontSize: '13px',
                                            marginTop: '6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            ⚠️ {errors.message}
                                        </div>
                                    )}
                                </div>

                                {/* Submit Error */}
                                {errors.submit && (
                                    <div style={{
                                        backgroundColor: 'rgba(227, 125, 204, 0.1)',
                                        border: '1px solid rgba(227, 125, 204, 0.3)',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        marginBottom: '20px',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{
                                            color: '#E37DCC',
                                            fontSize: '14px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '6px'
                                        }}>
                                            ⚠️ {errors.submit}
                                        </div>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        backgroundColor: isSubmitting ? '#cccccc' : '#7DBA00',
                                        border: 'none',
                                        color: '#FFFFFF',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s ease',
                                        borderRadius: '8px',
                                        opacity: isSubmitting ? 0.7 : 1
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSubmitting && !isMobile) {
                                            e.target.style.backgroundColor = '#6aa800';
                                            e.target.style.transform = 'translateY(-2px)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSubmitting && !isMobile) {
                                            e.target.style.backgroundColor = '#7DBA00';
                                            e.target.style.transform = 'translateY(0)';
                                        }
                                    }}
                                >
                                    {isSubmitting ? (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                            <div style={{
                                                width: '16px',
                                                height: '16px',
                                                border: '2px solid transparent',
                                                borderTop: '2px solid #FFFFFF',
                                                borderRadius: '50%',
                                                animation: 'spin 1s linear infinite'
                                            }}></div>
                                            Sending Message...
                                        </div>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Map and Additional Info */}
                    <div>
                        <h2 style={{
                            fontSize: isMobile ? '1.5rem' : '2rem',
                            fontWeight: '400',
                            color: '#434242',
                            marginBottom: isMobile ? '20px' : '30px'
                        }}>
                            Visit Our Showroom
                        </h2>

                        {/* Map Placeholder */}
                        <div style={{
                            backgroundColor: '#F8F8F8',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            marginBottom: '30px',
                            border: '1px solid rgba(87, 199, 194, 0.2)',
                            height: isMobile ? '250px' : '300px',
                            position: 'relative'
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#E8F4F3',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                color: '#57C7C2'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🗺️</div>
                                <div style={{ fontSize: '16px', fontWeight: '500' }}>Interactive Map</div>
                                <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                                    123 Bamboo Street, Eco City
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div style={{
                            backgroundColor: '#F8F8F8',
                            borderRadius: '12px',
                            padding: '25px',
                            border: '1px solid rgba(87, 199, 194, 0.2)',
                            marginBottom: '30px'
                        }}>
                            <h3 style={{
                                fontSize: '1.2rem',
                                fontWeight: '500',
                                color: '#434242',
                                marginBottom: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <span>🕒</span>
                                Business Hours
                            </h3>
                            <div style={{
                                display: 'grid',
                                gap: '12px'
                            }}>
                                {[
                                    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                                    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                                    { day: 'Sunday', hours: 'Closed' }
                                ].map((schedule, index) => (
                                    <div key={index} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingBottom: '12px',
                                        borderBottom: index < 2 ? '1px solid rgba(87, 199, 194, 0.2)' : 'none'
                                    }}>
                                        <span style={{
                                            fontSize: '14px',
                                            color: '#434242',
                                            fontWeight: '500'
                                        }}>
                                            {schedule.day}
                                        </span>
                                        <span style={{
                                            fontSize: '14px',
                                            color: '#7DBA00',
                                            fontWeight: '500'
                                        }}>
                                            {schedule.hours}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div>
                            <h3 style={{
                                fontSize: '1.2rem',
                                fontWeight: '500',
                                color: '#434242',
                                marginBottom: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <span>❓</span>
                                Frequently Asked Questions
                            </h3>
                            <div style={{
                                display: 'grid',
                                gap: '15px'
                            }}>
                                {faqs.map((faq, index) => (
                                    <div key={index} style={{
                                        backgroundColor: '#FFFFFF',
                                        border: '1px solid rgba(87, 199, 194, 0.2)',
                                        borderRadius: '8px',
                                        padding: '15px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isMobile) {
                                            e.currentTarget.style.borderColor = '#57C7C2';
                                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(87, 199, 194, 0.1)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isMobile) {
                                            e.currentTarget.style.borderColor = 'rgba(87, 199, 194, 0.2)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }
                                    }}>
                                        <h4 style={{
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: '#434242',
                                            marginBottom: '8px'
                                        }}>
                                            {faq.question}
                                        </h4>
                                        <p style={{
                                            fontSize: '13px',
                                            color: '#666',
                                            lineHeight: '1.5',
                                            margin: 0
                                        }}>
                                            {faq.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div style={{
                    textAlign: 'center',
                    padding: isMobile ? '30px 20px' : '40px',
                    backgroundColor: '#F8F8F8',
                    borderRadius: '12px',
                    border: '1px solid rgba(87, 199, 194, 0.2)'
                }}>
                    <h3 style={{
                        fontSize: isMobile ? '1.2rem' : '1.5rem',
                        fontWeight: '400',
                        color: '#434242',
                        marginBottom: '25px'
                    }}>
                        Why Choose DooBamboo?
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                        gap: isMobile ? '20px' : '30px',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        {[
                            { icon: '🌿', text: 'Sustainable' },
                            { icon: '⭐', text: '5-Star Quality' },
                            { icon: '🚚', text: 'Free Shipping' },
                            { icon: '💚', text: 'Eco-Friendly' }
                        ].map((badge, index) => (
                            <div key={index} style={{
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    fontSize: '2rem',
                                    marginBottom: '10px'
                                }}>
                                    {badge.icon}
                                </div>
                                <div style={{
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#434242'
                                }}>
                                    {badge.text}
                                </div>
                            </div>
                        ))}
                    </div>
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

export default ContactUs;