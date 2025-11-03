import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import natural from "../assets/naturalbamboo.jpg";
import craftsmanship from "../assets/generated-image.png";
import team from "../assets/bambootable.jpg";
import sustainability from "../assets/bamboo_chair.jpg";
import HeaderOne from '../layout/Header copy';

const AboutUs = () => {
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

    const teamMembers = [
        {
            name: 'Sarah Chen',
            role: 'Founder & CEO',
            bio: 'Passionate about sustainable design and bamboo craftsmanship',
            expertise: 'Product Design, Sustainability'
        },
        {
            name: 'Marcus Rodriguez',
            role: 'Head Artisan',
            bio: 'Master craftsman with 15 years of bamboo furniture experience',
            expertise: 'Traditional Craftsmanship, Quality Control'
        },
        {
            name: 'Elena Park',
            role: 'Design Director',
            bio: 'Blending modern aesthetics with traditional techniques',
            expertise: 'Modern Design, Material Innovation'
        },
        {
            name: 'David Thompson',
            role: 'Sustainability Manager',
            bio: 'Ensuring our practices meet the highest environmental standards',
            expertise: 'Environmental Science, Supply Chain'
        }
    ];

    const values = [
        {
            icon: '🌱',
            title: 'Sustainability First',
            description: 'We prioritize eco-friendly materials and processes in everything we create.'
        },
        {
            icon: '🎨',
            title: 'Artisan Quality',
            description: 'Each piece is handcrafted with attention to detail and traditional techniques.'
        },
        {
            icon: '💚',
            title: 'Ethical Sourcing',
            description: 'Our bamboo comes from responsibly managed forests and local communities.'
        },
        {
            icon: '🚀',
            title: 'Innovation',
            description: 'We continuously explore new ways to enhance bamboo furniture design.'
        }
    ];

    const milestones = [
        { year: '2020', event: 'dooBamboo Founded', description: 'Started with a vision for sustainable furniture' },
        { year: '2021', event: 'First Collection', description: 'Launched our inaugural bamboo furniture line' },
        { year: '2022', event: 'Artisan Partnership', description: 'Established partnerships with master craftsmen' },
        { year: '2023', event: 'International Reach', description: 'Expanded to serve customers worldwide' },
        { year: '2024', event: 'Innovation Lab', description: 'Opened research center for bamboo technology' }
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
                        Crafting Sustainable<br />Elegance
                    </h1>
                    <p style={{
                        fontSize: isMobile ? '18px' : '20px',
                        color: '#666',
                        lineHeight: '1.6',
                        marginBottom: '40px',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        We transform sustainable bamboo into beautiful, functional furniture 
                        that brings nature's harmony into your home.
                    </p>
               
                </div>
            </section>

            {/* Story Section */}
            <section style={{
                padding: isMobile ? '60px 20px' : '100px 50px',
                backgroundColor: '#FFFFFF'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: isMobile ? '40px' : '60px',
                    alignItems: 'center'
                }}>
                    <div>
                        <div style={{
                            fontSize: isMobile ? '13px' : '14px',
                            fontWeight: '600',
                            color: '#E37DCC',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            marginBottom: '15px'
                        }}>
                            Our Story
                        </div>
                        <h2 style={{
                            fontSize: isMobile ? '2rem' : '2.5rem',
                            fontWeight: '400',
                            color: '#434242',
                            marginBottom: '25px',
                            lineHeight: '1.3'
                        }}>
                            From Forest to<br />Forever Home
                        </h2>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            <p style={{
                                fontSize: isMobile ? '16px' : '17px',
                                color: '#666',
                                lineHeight: '1.7',
                                margin: 0
                            }}>
                                Founded in 2020, dooBamboo began with a simple belief: beautiful furniture 
                                shouldn't cost the Earth. Our journey started in the bamboo forests of Southeast Asia, 
                                where we discovered the incredible potential of this renewable resource.
                            </p>
                            <p style={{
                                fontSize: isMobile ? '16px' : '17px',
                                color: '#666',
                                lineHeight: '1.7',
                                margin: 0
                            }}>
                                Today, we partner with skilled artisans who share our commitment to quality 
                                and sustainability, creating pieces that tell a story of respect for nature 
                                and dedication to craftsmanship.
                            </p>
                        </div>
                    </div>
                    
                    <div style={{
                        position: 'relative'
                    }}>
                        <img
                            src={natural}
                            alt="Bamboo forest"
                            style={{
                                width: '100%',
                                height: isMobile ? '300px' : '400px',
                                objectFit: 'cover',
                                borderRadius: '15px',
                                boxShadow: '0 20px 40px rgba(87, 199, 194, 0.1)'
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section style={{
                padding: isMobile ? '60px 20px' : '80px 50px',
                backgroundColor: '#F8F8F8'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: isMobile ? '13px' : '14px',
                        fontWeight: '600',
                        color: '#7DBA00',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        marginBottom: '15px'
                    }}>
                        Our Values
                    </div>
                    <h2 style={{
                        fontSize: isMobile ? '2rem' : '2.5rem',
                        fontWeight: '400',
                        color: '#434242',
                        marginBottom: isMobile ? '40px' : '60px'
                    }}>
                        What Guides Our Craft
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                        gap: isMobile ? '25px' : '40px'
                    }}>
                        {values.map((value, index) => (
                            <div key={index} style={{
                                padding: isMobile ? '30px 25px' : '40px 30px',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '15px',
                                textAlign: 'center',
                                border: `2px solid ${index === 0 ? 'rgba(125, 186, 0, 0.1)' : index === 1 ? 'rgba(227, 125, 204, 0.1)' : index === 2 ? 'rgba(87, 199, 194, 0.1)' : 'rgba(125, 186, 0, 0.1)'}`,
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                if (!isMobile) {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isMobile) {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }
                            }}>
                                <div style={{
                                    fontSize: '3rem',
                                    marginBottom: '20px'
                                }}>
                                    {value.icon}
                                </div>
                                <h3 style={{
                                    fontSize: isMobile ? '1.3rem' : '1.4rem',
                                    fontWeight: '500',
                                    color: '#434242',
                                    marginBottom: '15px'
                                }}>
                                    {value.title}
                                </h3>
                                <p style={{
                                    fontSize: isMobile ? '15px' : '16px',
                                    color: '#666',
                                    lineHeight: '1.6',
                                    margin: 0
                                }}>
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Craftsmanship Section */}
            <section style={{
                padding: isMobile ? '60px 20px' : '100px 50px',
                backgroundColor: '#FFFFFF'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: isMobile ? '40px' : '60px',
                    alignItems: 'center'
                }}>
                    <div style={{
                        order: isMobile ? 2 : 1
                    }}>
                        <img
                            src={craftsmanship}
                            alt="Artisan craftsmanship"
                            style={{
                                width: '100%',
                                height: isMobile ? '300px' : '400px',
                                objectFit: 'cover',
                                borderRadius: '15px',
                                boxShadow: '0 20px 40px rgba(227, 125, 204, 0.1)'
                            }}
                        />
                    </div>
                    
                    <div style={{
                        order: isMobile ? 1 : 2
                    }}>
                        <div style={{
                            fontSize: isMobile ? '13px' : '14px',
                            fontWeight: '600',
                            color: '#57C7C2',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            marginBottom: '15px'
                        }}>
                            Our Craft
                        </div>
                        <h2 style={{
                            fontSize: isMobile ? '2rem' : '2.5rem',
                            fontWeight: '400',
                            color: '#434242',
                            marginBottom: '25px',
                            lineHeight: '1.3'
                        }}>
                            Masterful Artisan<br />Techniques
                        </h2>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            <p style={{
                                fontSize: isMobile ? '16px' : '17px',
                                color: '#666',
                                lineHeight: '1.7',
                                margin: 0
                            }}>
                                Each dooBamboo piece begins with carefully selected bamboo, harvested 
                                at peak maturity. Our artisans employ traditional techniques passed 
                                down through generations, combined with modern precision.
                            </p>
                            <p style={{
                                fontSize: isMobile ? '16px' : '17px',
                                color: '#666',
                                lineHeight: '1.7',
                                margin: 0
                            }}>
                                From steam bending to hand-finishing, every step is performed with 
                                meticulous attention to detail, ensuring furniture that's not only 
                                beautiful but built to last for generations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section style={{
                padding: isMobile ? '60px 20px' : '80px 50px',
                backgroundColor: '#F8F8F8'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: isMobile ? '13px' : '14px',
                        fontWeight: '600',
                        color: '#E37DCC',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        marginBottom: '15px'
                    }}>
                        Our Team
                    </div>
                    <h2 style={{
                        fontSize: isMobile ? '2rem' : '2.5rem',
                        fontWeight: '400',
                        color: '#434242',
                        marginBottom: isMobile ? '40px' : '60px'
                    }}>
                        Meet The Craftsmen
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                        gap: isMobile ? '25px' : '40px'
                    }}>
                        {teamMembers.map((member, index) => (
                            <div key={index} style={{
                                padding: isMobile ? '25px' : '30px',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '15px',
                                textAlign: 'center',
                                border: `1px solid ${index % 3 === 0 ? 'rgba(227, 125, 204, 0.1)' : index % 3 === 1 ? 'rgba(125, 186, 0, 0.1)' : 'rgba(87, 199, 194, 0.1)'}`,
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                if (!isMobile) {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isMobile) {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }
                            }}>
                                <div style={{
                                    width: isMobile ? '80px' : '100px',
                                    height: isMobile ? '80px' : '100px',
                                    backgroundColor: index % 3 === 0 ? '#E37DCC' : index % 3 === 1 ? '#7DBA00' : '#57C7C2',
                                    borderRadius: '50%',
                                    margin: '0 auto 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#FFFFFF',
                                    fontSize: isMobile ? '1.5rem' : '2rem',
                                    fontWeight: '600'
                                }}>
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3 style={{
                                    fontSize: isMobile ? '1.2rem' : '1.3rem',
                                    fontWeight: '500',
                                    color: '#434242',
                                    marginBottom: '8px'
                                }}>
                                    {member.name}
                                </h3>
                                <div style={{
                                    fontSize: isMobile ? '14px' : '15px',
                                    color: index % 3 === 0 ? '#E37DCC' : index % 3 === 1 ? '#7DBA00' : '#57C7C2',
                                    fontWeight: '500',
                                    marginBottom: '12px'
                                }}>
                                    {member.role}
                                </div>
                                <p style={{
                                    fontSize: isMobile ? '14px' : '15px',
                                    color: '#666',
                                    lineHeight: '1.5',
                                    margin: '0 0 15px 0'
                                }}>
                                    {member.bio}
                                </p>
                                <div style={{
                                    fontSize: isMobile ? '12px' : '13px',
                                    color: '#999',
                                    fontWeight: '500'
                                }}>
                                    {member.expertise}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section style={{
                padding: isMobile ? '60px 20px' : '80px 50px',
                backgroundColor: '#FFFFFF'
            }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: isMobile ? '13px' : '14px',
                        fontWeight: '600',
                        color: '#7DBA00',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        marginBottom: '15px'
                    }}>
                        Our Journey
                    </div>
                    <h2 style={{
                        fontSize: isMobile ? '2rem' : '2.5rem',
                        fontWeight: '400',
                        color: '#434242',
                        marginBottom: isMobile ? '40px' : '60px'
                    }}>
                        Milestones & Growth
                    </h2>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '30px',
                        position: 'relative'
                    }}>
                        {/* Timeline line */}
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: '0',
                            bottom: '0',
                            width: '2px',
                            backgroundColor: '#7DBA00',
                            transform: 'translateX(-50%)',
                            display: isMobile ? 'none' : 'block'
                        }}></div>

                        {milestones.map((milestone, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: isMobile ? 'flex-start' : (index % 2 === 0 ? 'flex-start' : 'flex-end'),
                                position: 'relative',
                                textAlign: isMobile ? 'left' : (index % 2 === 0 ? 'left' : 'right'),
                                flexDirection: isMobile ? 'row' : (index % 2 === 0 ? 'row' : 'row-reverse'),
                                gap: isMobile ? '20px' : '40px'
                            }}>
                                {/* Timeline dot */}
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: '#7DBA00',
                                    borderRadius: '50%',
                                    border: '4px solid #FFFFFF',
                                    boxShadow: '0 0 0 2px #7DBA00',
                                    flexShrink: 0,
                                    position: isMobile ? 'static' : 'absolute',
                                    left: isMobile ? '0' : '50%',
                                    transform: isMobile ? 'none' : 'translateX(-50%)',
                                    zIndex: 2
                                }}></div>

                                <div style={{
                                    flex: 1,
                                    padding: isMobile ? '0' : (index % 2 === 0 ? '0 60px 0 0' : '0 0 0 60px')
                                }}>
                                    <div style={{
                                        fontSize: isMobile ? '2rem' : '2.5rem',
                                        fontWeight: '300',
                                        color: '#E37DCC',
                                        marginBottom: '10px'
                                    }}>
                                        {milestone.year}
                                    </div>
                                    <h3 style={{
                                        fontSize: isMobile ? '1.2rem' : '1.4rem',
                                        fontWeight: '500',
                                        color: '#434242',
                                        marginBottom: '8px'
                                    }}>
                                        {milestone.event}
                                    </h3>
                                    <p style={{
                                        fontSize: isMobile ? '15px' : '16px',
                                        color: '#666',
                                        lineHeight: '1.5',
                                        margin: 0
                                    }}>
                                        {milestone.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: isMobile ? '60px 20px' : '80px 50px',
                backgroundColor: '#F8F8F8',
                textAlign: 'center'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <h2 style={{
                        fontSize: isMobile ? '2rem' : '2.5rem',
                        fontWeight: '400',
                        color: '#434242',
                        marginBottom: '20px'
                    }}>
                        Join Our Sustainable Journey
                    </h2>
                    <p style={{
                        fontSize: isMobile ? '16px' : '18px',
                        color: '#666',
                        lineHeight: '1.6',
                        marginBottom: '40px'
                    }}>
                        Discover furniture that's beautiful, sustainable, and built to last. 
                        Transform your space with pieces that tell a story of craftsmanship and care for our planet.
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
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
                            Shop Collection
                        </button>
                        <button
                            onClick={() => navigate('/contact')}
                            style={{
                                padding: isMobile ? '14px 30px' : '15px 40px',
                                backgroundColor: 'transparent',
                                border: '2px solid #57C7C2',
                                color: '#57C7C2',
                                fontSize: isMobile ? '15px' : '16px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                borderRadius: '8px'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#57C7C2';
                                e.target.style.color = '#FFFFFF';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#57C7C2';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            Get In Touch
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;