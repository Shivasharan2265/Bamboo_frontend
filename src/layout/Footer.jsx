// Footer.jsx
import React, { useState, useEffect } from 'react';
import logo from "../assets/cbamboo.png";
import stick from "../assets/bamboostick.png";
import { Link, useNavigate } from "react-router-dom";


const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

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

  return (
    <footer style={{
      backgroundColor: '#F2EDE8',
      padding: isMobile ? '40px 20px 20px' : '80px 50px 40px',
      borderTop: '1px solid rgba(227, 125, 204, 0.1)',
      width: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Top Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: isMobile ? '40px' : '60px',
          flexWrap: 'wrap',
          gap: isMobile ? '30px' : '40px',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          {/* Brand */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            flex: isMobile ? '1' : 'none'
          }}>
            <img
              src={logo}
              alt="dooBamboo logo"
              style={{
                height: isMobile ? '35px' : '45px',
                width: 'auto',
                filter: 'brightness(0.9)'
              }}
            />
            <div>
              <h3 style={{
                fontSize: isMobile ? '1.4rem' : '1.8rem',
                fontWeight: '300',
                color: '#E39963',
                letterSpacing: isMobile ? '2px' : '3px',
                textTransform: 'uppercase',
                margin: '0 0 5px 0'
              }}>
                dooBamboo
              </h3>

            </div>
          </div>

          {/* Social Links */}
          <div style={{
            display: 'flex',
            gap: isMobile ? '20px' : '25px',
            alignItems: 'center',
            flex: isMobile ? '1' : 'none',
            justifyContent: isMobile ? 'center' : 'flex-end'
          }}>
            {[
              { name: 'Instagram', color: '#E37DCC' },
              { name: 'Twitter', color: '#57C7C2' },
              { name: 'Pinterest', color: '#7DBA00' }
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                style={{
                  color: '#434242',
                  textDecoration: 'none',
                  fontSize: isMobile ? '13px' : '14px',
                  fontWeight: '400',
                  padding: '8px 0',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = social.color;
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#434242';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '30px' : '40px',
          marginBottom: isMobile ? '40px' : '60px'
        }}>
          {/* Shop */}
          <div>
            <h4 style={{
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: '500',
              color: '#E37DCC',
              marginBottom: isMobile ? '20px' : '25px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              position: 'relative',
              paddingBottom: '10px'
            }}>
              Shop
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '30px',
                height: '2px',
                backgroundColor: '#E37DCC'
              }}></span>
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '10px' : '12px'
            }}>
              {['All Products', 'New Arrivals', 'Best Sellers', 'Collections', 'Custom Orders'].map((link) => (
                <Link
                  key={link}
                  to={
                    link === "All Products" ? "/products" :
                      link === "New Arrivals" ? "/products" :
                        link === "Best Sellers" ? "/products" :
                          link === "Collections" ? "/products" :
                            link === "Custom Orders" ? "/products" : "/"
                  }
                  style={{
                    color: '#434242',
                    textDecoration: 'none',
                    fontSize: isMobile ? '13px' : '14px',
                    transition: 'all 0.3s ease',
                    opacity: 0.8,
                    padding: '4px 0'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#E37DCC';
                    e.target.style.opacity = '1';
                    e.target.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#434242';
                    e.target.style.opacity = '0.8';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  {link}
                </Link>

              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: '500',
              color: '#7DBA00',
              marginBottom: isMobile ? '20px' : '25px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              position: 'relative',
              paddingBottom: '10px'
            }}>
              Company
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '30px',
                height: '2px',
                backgroundColor: '#7DBA00'
              }}></span>
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '10px' : '12px'
            }}>
              {['About', 'FAQs'].map((link) => (
                <Link
                  key={link}
                  to={
                    link === "About" ? "/about-us" :
                      link === "FAQs" ? "/faq" :
                        "/"
                  }
                  style={{
                    color: '#434242',
                    textDecoration: 'none',
                    fontSize: isMobile ? '13px' : '14px',
                    transition: 'all 0.3s ease',
                    opacity: 0.8,
                    padding: '4px 0'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#7DBA00';
                    e.target.style.opacity = '1';
                    e.target.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#434242';
                    e.target.style.opacity = '0.8';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 style={{
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: '500',
              color: '#57C7C2',
              marginBottom: isMobile ? '20px' : '25px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              position: 'relative',
              paddingBottom: '10px'
            }}>
              Help
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '30px',
                height: '2px',
                backgroundColor: '#57C7C2'
              }}></span>
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '10px' : '12px'
            }}>
              {['Contact', 'Shipping', 'Returns', 'Payment Policy', 'Cancellation'].map((link) => (
                <Link
                  key={link}
                  to={
                    link === "Contact" ? "/contact" :
                      link === "Shipping" ? "/shipping-policy" :
                        link === "Returns" ? "/return-refund-policy" :
                          link === "Payment Policy" ? "/return-refund-policy" :
                            link === "Cancellation" ? "/shipping-policy" : "/"
                  }
                  style={{
                    color: '#434242',
                    textDecoration: 'none',
                    fontSize: isMobile ? '13px' : '14px',
                    transition: 'all 0.3s ease',
                    opacity: 0.8,
                    padding: '4px 0'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#57C7C2';
                    e.target.style.opacity = '1';
                    e.target.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#434242';
                    e.target.style.opacity = '0.8';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: '500',
              color: '#E37DCC',
              marginBottom: isMobile ? '20px' : '25px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              position: 'relative',
              paddingBottom: '10px'
            }}>
              Stay Updated
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '30px',
                height: '2px',
                backgroundColor: '#E37DCC'
              }}></span>
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '12px' : '15px'
            }}>
              <input
                type="email"
                placeholder="Email address"
                style={{
                  padding: isMobile ? '10px 0' : '12px 0',
                  border: 'none',
                  borderBottom: '1px solid #434242',
                  fontSize: isMobile ? '13px' : '14px',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#7DBA00';
                  e.target.style.paddingLeft = '8px';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#434242';
                  e.target.style.paddingLeft = '0';
                }}
              />
              <button
                style={{
                  padding: isMobile ? '10px 0' : '12px 0',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#434242',
                  fontSize: isMobile ? '12px' : '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  textAlign: 'left',
                  position: 'relative',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#7DBA00';
                  e.target.style.paddingLeft = '8px';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#434242';
                  e.target.style.paddingLeft = '0';
                }}
              >
                Subscribe →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: isMobile ? '20px' : '30px',
          borderTop: '1px solid rgba(87, 199, 194, 0.2)',
          flexWrap: 'wrap',
          gap: isMobile ? '15px' : '20px',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <div style={{
            color: '#434242',
            fontSize: isMobile ? '12px' : '13px',
            opacity: 0.7,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-start',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            © 2024 dooBamboo.
            <span style={{
              color: '#57C7C2',
              fontWeight: '500'
            }}>
              Crafted with nature.
            </span>
          </div>
          <div style={{
            display: 'flex',
            gap: isMobile ? '20px' : '30px',
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-end'
          }}>
            {[
           
              { name: 'Terms & Conditions', color: '#7DBA00' },
           
            ].map((link) => (
             <a
  key={link.name}
  onClick={() => navigate('/terms-conditions')}
  style={{
    color: '#434242',
    textDecoration: 'none',
    fontSize: isMobile ? '12px' : '13px',
    transition: 'all 0.3s ease',
    opacity: 0.7,
    position: 'relative',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => {
    e.target.style.color = link.color;
    e.target.style.opacity = '1';
    e.target.style.transform = 'translateY(-1px)';
  }}
  onMouseLeave={(e) => {
    e.target.style.color = '#434242';
    e.target.style.opacity = '0.7';
    e.target.style.transform = 'translateY(0)';
  }}
>
  {link.name}
</a>

            ))}
          </div>
        </div>

        {/* Decorative Bamboo Element */}
        <div style={{
          textAlign: 'center',
          marginTop: isMobile ? '30px' : '40px',
          padding: isMobile ? '15px' : '20px',
          opacity: 0.6
        }}>
          <div style={{
            color: '#7DBA00',
            fontSize: isMobile ? '11px' : '12px',
            letterSpacing: isMobile ? '1px' : '2px',
            textTransform: 'uppercase',
            lineHeight: '1.4'
          }}>
            🌱 Sustainable • ♻️ Eco-Friendly • 🌍 Earth-Conscious
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;