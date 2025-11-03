// Enhanced Responsive Header Component
import React, { useState, useEffect } from "react";
import logo from "../assets/cbamboo.png";
import { useNavigate } from "react-router-dom";

const HeaderOne = () => {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(1); // Example cart count

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener('resize', checkMobile);

    // Initial check
    checkMobile();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Close mobile menu when resizing to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

const getHeaderStyles = () => {
  const active = (isScrolled || isHovered) && !isMenuOpen;

  return {
    backgroundColor: active ? "rgba(255, 255, 255, 0.98)" : "transparent",
    backdropFilter: active ? "blur(15px)" : "none",
    // borderBottom: active ? "1px solid rgba(0, 0, 0, 0.08)" : "none",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: active ? "0 4px 20px rgba(0, 0, 0, 0.08)" : "0 4px 20px rgba(0, 0, 0, 0.08)",
  };
};


  const textColor = (isScrolled || isHovered) && !isMenuOpen ? "#E39963" : "#E39963";

    const menuItems = [
    { label: "Home", href: "#" },
    { label: "Categories", href: "/categories" },
    { label: "Products", href: "/products" },

    { label: "About", href: "/about-us" },
    { label: "Contact", href: "/contact" },
    { label: "FAQs", href: "/faq" },
    
  ];

  return (
    <>
   <header
  className={isMobile && isMenuOpen ? "header-hidden" : ""}
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "clamp(60px, 8vw, 80px)",
    zIndex: 1000,
    ...getHeaderStyles(),
  }}
  onMouseEnter={() => !isMenuOpen && setIsHovered(true)}
  onMouseLeave={() => !isMenuOpen && setIsHovered(false)}
>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "clamp(0 20px, 4vw, 0 40px)",
            position: "relative",
          }}
        >
          {/* Navigation Links - Left (Hidden on mobile) */}
          <nav style={{
            display: isMobile ? 'none' : 'flex',
            alignItems: 'center',
            gap: 'clamp(20px, 3vw, 40px)'
          }}>
            {/* Add your navigation links here */}
          </nav>

          {/* Centered Logo */}
          <div
          onClick={() => navigate("/")}
            style={{
              position: isMobile ? "static" : "absolute",
              left: isMobile ? "auto" : "50%",
              top: isMobile ? "auto" : "50%",
              transform: isMobile ? "none" : "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              gap: "clamp(8px, 1.5vw, 12px)",
              marginLeft: isMobile ? "auto" : "0",
              marginRight: isMobile ? "auto" : "0",
            }}
          >
            <img
              src={logo}
              alt="dooBamboo logo"
              style={{
                height: "clamp(35px, 5vw, 45px)",
                width: "auto",
                verticalAlign: "middle",
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            />
            <h1
              style={{
                fontSize: "clamp(18px, 3vw, 24px)",
                fontWeight: "300",
                letterSpacing: "clamp(2px, 0.3vw, 3px)",
                color: textColor,
                textTransform: "uppercase",
                transition: "color 0.3s ease",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              dooBamboo
            </h1>
          </div>

          {/* Right side icons */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(15px, 3vw, 0px)",
            marginLeft: isMobile ? "auto" : "0"
          }}>
            {/* Search Icon */}
            <div
              style={{
                cursor: "pointer",
                color: textColor,
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                padding: 'clamp(6px, 1vw, 8px)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#7DBA00';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = textColor;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg
                width="clamp(18px, 3vw, 20px)"
                height="clamp(18px, 3vw, 20px)"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Cart Icon */}
            <div
            onClick={()=> navigate("/cart")}
              style={{
                cursor: "pointer",
                color: textColor,
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                padding: 'clamp(6px, 1vw, 8px)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#E37DCC';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = textColor;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg
                width="clamp(18px, 3vw, 20px)"
                height="clamp(18px, 3vw, 20px)"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.4 5.2 16.4H17M17 13V16.4M9 19C9 19.6 8.6 20 8 20C7.4 20 7 19.6 7 19C7 18.4 7.4 18 8 18C8.6 18 9 18.4 9 19ZM17 19C17 19.6 16.6 20 16 20C15.4 20 15 19.6 15 19C15 18.4 15.4 18 16 18C16.6 18 17 18.4 17 19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              
              {/* Cart Items Count Badge */}
              {cartItemsCount > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  backgroundColor: '#E37DCC',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  fontSize: '10px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1
                }}>
                  {cartItemsCount}
                </div>
              )}
            </div>

            {/* Menu Icon */}
            <div
              style={{
                cursor: "pointer",
                color: textColor,
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                padding: 'clamp(6px, 1vw, 8px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#7DBA00';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = textColor;
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                width="clamp(20px, 4vw, 24px)"
                height="clamp(20px, 4vw, 24px)"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12H21"
                  stroke="#E37DCC"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M3 6H21"
                  stroke="#7DBA00"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M3 18H21"
                  stroke="#57C7C2"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Sidebar Menu Overlay */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1000,
          display: 'flex'
        }}>
          {/* Backdrop */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(8px)'
            }}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar Panel */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 'min(380px, 90vw)',
              height: '100%',
              backgroundColor: '#FFFFFF',
              padding: '40px 0 0 0',
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideInLeft 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              overflow: 'hidden',
              borderRight: '1px solid #F2EDE8',
              zIndex: 1001,
            }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <button
              onClick={(e) => {
                console.log('Close button clicked ✅');
                e.stopPropagation();
                setIsMenuOpen(false);
              }}
              style={{
                position: 'absolute',
                top: '25px',
                right: '25px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                color: '#434242',
                cursor: 'pointer',
                padding: '8px',
                transition: 'all 0.3s ease',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1002,
              }}
            >
              ✕
            </button>

            {/* Brand Header */}
            <div style={{
              padding: '0 40px 40px',
              borderBottom: '1px solid #F2EDE8',
              marginBottom: '30px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <img
                  src={logo}
                  alt="dooBamboo logo"
                  style={{
                    height: '35px',
                    width: 'auto'
                  }}
                />
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: '300',
                  color: '#E39963',
                  margin: 0,
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}>
                  dooBamboo
                </h2>
              </div>
            </div>

            {/* Menu Items */}
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              padding: '0 20px',
              flex: 1
            }}>
              {menuItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    padding: '20px 20px',
                    color: '#434242',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '400',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    border: 'none',
                    background: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#7DBA00';
                    e.target.style.backgroundColor = '#F2EDE8';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#434242';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                  <div style={{
                    position: 'absolute',
                    right: '20px',
                    fontSize: '18px',
                    opacity: 0,
                    transition: 'all 0.3s ease',
                    transform: 'translateX(-10px)'
                  }}>
                    →
                  </div>
                </a>
              ))}
            </nav>

            {/* Contact Info */}
            <div style={{
              padding: '30px 40px',
              borderTop: '1px solid #F2EDE8',
              backgroundColor: '#F2EDE8'
            }}>
              <div style={{
                fontSize: '14px',
                color: '#434242',
                lineHeight: '1.6',
                opacity: 0.8
              }}>
                <div style={{ marginBottom: '8px' }}>hello@doobamboo.com</div>
                <div style={{ marginBottom: '8px' }}>+1 (555) 123-4567</div>
                <div>Mon-Fri: 9AM-6PM</div>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: '25px 40px',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid #F2EDE8'
            }}>
              <div style={{
                fontSize: '12px',
                color: '#434242',
                textAlign: 'left',
                lineHeight: '1.5',
                opacity: 0.6
              }}>
                © 2024 dooBamboo
                <br />
                Sustainable bamboo products
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Mobile-first responsive design */
        @media (max-width: 480px) {
          header {
            height: 60px !important;
          }
        }
      `}</style>
    </>
  );
};

export default HeaderOne;