import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderOne from "../layout/Header copy";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await axios.get("http://localhost:5055/api/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "#10b981";
      case "processing":
        return "#f59e0b";
      case "pending":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px",
        textAlign: "center",
        marginTop: isMobile ? "70px" : "100px"
      }}>
        <div style={{
          width: "40px",
          height: "40px",
          border: "4px solid #e5e7eb",
          borderTop: "4px solid #e39963",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginBottom: "20px"
        }}></div>
        <p style={{
          fontSize: "1rem",
          color: "#6b7280",
          margin: 0
        }}>Loading your orders...</p>
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
  }

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

      {/* Main Content */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: isMobile ? "20px 15px" : "40px 20px",
      }}>
        
        {/* Breadcrumbs */}
        <div style={{
          marginBottom: isMobile ? "25px" : "30px",
          padding: isMobile ? "12px 0" : "15px 0",
          borderBottom: "1px solid #f3f4f6"
        }}>
          <nav style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: isMobile ? "14px" : "15px",
            color: "#6b7280"
          }}>
            <span 
              style={{ 
                cursor: "pointer",
                color: "#e39963",
                transition: "color 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.color = "#d18a55"}
              onMouseLeave={(e) => e.target.style.color = "#e39963"}
              onClick={() => navigate('/')}
            >
              Home
            </span>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ color: "#374151", fontWeight: "500" }}>My Orders</span>
          </nav>
        </div>

        {/* Header */}
        <div style={{
          textAlign: isMobile ? "left" : "center",
          marginBottom: isMobile ? "30px" : "40px"
        }}>
          <h1 style={{
            fontSize: isMobile ? "1.8rem" : "2.5rem",
            fontWeight: "300",
            color: "#1f2937",
            marginBottom: "8px",
            marginTop: 0
          }}>
            My Orders
          </h1>
          <p style={{
            fontSize: isMobile ? "0.95rem" : "1.1rem",
            color: "#6b7280",
            margin: 0
          }}>
            Track and manage your orders
          </p>
        </div>

        {orders.length === 0 ? (
          /* Empty State */
          <div style={{
            textAlign: "center",
            padding: isMobile ? "50px 20px" : "80px 20px",
            background: "#f9fafb",
            borderRadius: isMobile ? "8px" : "12px",
            border: "2px dashed #e5e7eb",
            margin: isMobile ? "20px 0" : "0"
          }}>
            <div style={{
              fontSize: isMobile ? "3rem" : "4rem",
              marginBottom: isMobile ? "15px" : "20px"
            }}>📦</div>
            <h2 style={{
              fontSize: isMobile ? "1.3rem" : "1.5rem",
              color: "#1f2937",
              marginBottom: isMobile ? "8px" : "12px",
              marginTop: 0
            }}>
              No orders yet
            </h2>
            <p style={{
              color: "#6b7280",
              marginBottom: isMobile ? "25px" : "30px",
              maxWidth: "400px",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: isMobile ? "0.9rem" : "1rem",
              lineHeight: "1.5"
            }}>
              You haven't placed any orders. Start shopping to see your orders here.
            </p>
            <button 
              style={{
                background: "#e39963",
                color: "white",
                border: "none",
                padding: isMobile ? "14px 28px" : "12px 32px",
                borderRadius: "6px",
                fontSize: isMobile ? "0.95rem" : "1rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                width: isMobile ? "100%" : "auto",
                maxWidth: isMobile ? "280px" : "none"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#d18a55";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#e39963";
              }}
              onClick={() => navigate('/products')}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          /* Orders List */
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "20px" : "24px"
          }}>
            {orders.map((order) => (
              <div 
                key={order._id} 
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: isMobile ? "8px" : "12px",
                  padding: isMobile ? "16px" : "24px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                  }
                }}
              >
                {/* Order Header */}
                <div style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "flex-start" : "flex-start",
                  marginBottom: isMobile ? "16px" : "20px",
                  paddingBottom: isMobile ? "12px" : "16px",
                  borderBottom: "1px solid #f3f4f6",
                  gap: isMobile ? "8px" : "0"
                }}>
                  <div>
                    <h3 style={{
                      fontSize: isMobile ? "1.1rem" : "1.25rem",
                      fontWeight: "600",
                      color: "#1f2937",
                      marginBottom: isMobile ? "2px" : "4px",
                      marginTop: 0
                    }}>
                      Order #{order.invoice}
                    </h3>
                    <span style={{
                      fontSize: isMobile ? "0.8rem" : "0.875rem",
                      color: "#6b7280"
                    }}>
                      Placed on {formatDate(order.createdAt)}
                    </span>
                  </div>
                  <div style={{
                    alignSelf: isMobile ? "flex-start" : "auto"
                  }}>
                    <span 
                      style={{
                        padding: isMobile ? "4px 10px" : "6px 12px",
                        borderRadius: "20px",
                        fontSize: isMobile ? "0.7rem" : "0.75rem",
                        fontWeight: "500",
                        color: "white",
                        textTransform: "capitalize",
                        backgroundColor: getStatusColor(order.status),
                        display: "inline-block"
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div style={{ marginBottom: isMobile ? "16px" : "20px" }}>
                  {order.cart.map((item, index) => (
                    <div 
                      key={index} 
                      style={{
                        display: "flex",
                        alignItems: isMobile ? "flex-start" : "center",
                        padding: isMobile ? "10px 0" : "12px 0",
                        borderBottom: "1px solid #f9fafb",
                        gap: isMobile ? "12px" : "0"
                      }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name}
                        style={{
                          width: isMobile ? "50px" : "60px",
                          height: isMobile ? "50px" : "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginRight: isMobile ? "0" : "16px",
                          flexShrink: 0
                        }}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80x80?text=No+Image";
                        }}
                      />
                      <div style={{ 
                        flex: 1,
                        minWidth: 0 // Prevents flex item from overflowing
                      }}>
                        <h4 style={{
                          fontWeight: "500",
                          color: "#1f2937",
                          marginBottom: isMobile ? "2px" : "4px",
                          marginTop: 0,
                          fontSize: isMobile ? "0.9rem" : "1rem",
                          lineHeight: "1.3",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        }}>
                          {item.name}
                        </h4>
                        <p style={{
                          fontSize: isMobile ? "0.75rem" : "0.875rem",
                          color: "#6b7280",
                          margin: isMobile ? "2px 0" : "4px 0"
                        }}>
                          Quantity: {item.quantity}
                        </p>
                        <p style={{
                          fontSize: isMobile ? "0.8rem" : "0.875rem",
                          fontWeight: "600",
                          color: "#e39963",
                          margin: isMobile ? "2px 0" : "4px 0"
                        }}>
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div style={{
                  background: "#f9fafb",
                  padding: isMobile ? "16px" : "20px",
                  borderRadius: isMobile ? "6px" : "8px",
                  marginBottom: isMobile ? "16px" : "20px"
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: isMobile ? "6px 0" : "8px 0",
                    fontSize: isMobile ? "0.85rem" : "1rem"
                  }}>
                    <span>Subtotal:</span>
                    <span>{formatPrice(order.subTotal)}</span>
                  </div>
                  
                  {order.discount > 0 && (
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: isMobile ? "6px 0" : "8px 0",
                      color: "#10b981",
                      fontSize: isMobile ? "0.85rem" : "1rem"
                    }}>
                      <span>Discount:</span>
                      <span>-{formatPrice(order.discount)}</span>
                    </div>
                  )}
                  
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: isMobile ? "6px 0" : "8px 0",
                    fontSize: isMobile ? "0.85rem" : "1rem"
                  }}>
                    <span>Shipping:</span>
                    <span>{formatPrice(order.shippingCost)}</span>
                  </div>
                  
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: isMobile ? "8px 0" : "12px 0",
                    borderTop: "1px solid #e5e7eb",
                    marginTop: isMobile ? "6px" : "8px",
                    fontWeight: "600",
                    fontSize: isMobile ? "1rem" : "1.1rem",
                    color: "#1f2937"
                  }}>
                    <span>Total:</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                  
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: isMobile ? "6px 0" : "8px 0",
                    marginTop: isMobile ? "6px" : "8px",
                    fontSize: isMobile ? "0.85rem" : "1rem"
                  }}>
                    <span>Payment Method:</span>
                    <span style={{ 
                      textTransform: "capitalize",
                      fontSize: isMobile ? "0.8rem" : "1rem"
                    }}>
                      {order.paymentMethod === "card" ? "💳 Card" : order.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* Order Actions */}
                <div style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "8px" : "12px",
                  justifyContent: "flex-end"
                }}>
                  <button 
                    style={{
                      padding: isMobile ? "12px 16px" : "10px 20px",
                      borderRadius: "6px",
                      fontSize: isMobile ? "0.85rem" : "0.875rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      border: "1px solid #d1d5db",
                      background: "white",
                      color: "#374151",
                      width: isMobile ? "100%" : "auto"
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        e.target.style.background = "#f9fafb";
                        e.target.style.borderColor = "#9ca3af";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile) {
                        e.target.style.background = "white";
                        e.target.style.borderColor = "#d1d5db";
                      }
                    }}
                  >
                    View Details
                  </button>
                  <button 
                    style={{
                      padding: isMobile ? "12px 16px" : "10px 20px",
                      borderRadius: "6px",
                      fontSize: isMobile ? "0.85rem" : "0.875rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      border: "1px solid #e39963",
                      background: "#e39963",
                      color: "white",
                      width: isMobile ? "100%" : "auto"
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        e.target.style.background = "#d18a55";
                        e.target.style.borderColor = "#d18a55";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile) {
                        e.target.style.background = "#e39963";
                        e.target.style.borderColor = "#e39963";
                      }
                    }}
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;