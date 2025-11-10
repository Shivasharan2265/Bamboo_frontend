import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderOne from '../layout/Header copy';
import API from '../api';

const Notifications = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUnread, setTotalUnread] = useState(0);
    const [selectedNotifications, setSelectedNotifications] = useState(new Set());
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchNotifications();
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [currentPage]);

    const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('authToken');
            if (!token) {
                navigate('/login');
                return;
            }

            console.log("🔄 Fetching notifications for page:", currentPage);

            const response = await API.get(`/notification?page=${currentPage}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log("✅ Notifications API Response:", response.data);
            
            setNotifications(response.data.notifications || []);
            setTotalPages(Math.ceil((response.data.totalDoc || 0) / 5));
            setTotalUnread(response.data.totalUnreadDoc || 0);
            setSelectedNotifications(new Set());

        } catch (error) {
            console.error("❌ Notifications API Error:", error);
            setError(error.response?.data?.message || "Failed to fetch notifications");
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (notificationId) => {
        try {
            setActionLoading(true);
            const token = localStorage.getItem('token');

            await API.put(
                `/notification/${notificationId}`,
                { status: 'read' },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Update local state
            setNotifications(prev => 
                prev.map(notif => 
                    notif._id === notificationId 
                        ? { ...notif, status: 'read' }
                        : notif
                )
            );
            setTotalUnread(prev => Math.max(0, prev - 1));

        } catch (error) {
            console.error("❌ Mark as read error:", error);
            setError("Failed to mark notification as read");
        } finally {
            setActionLoading(false);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            setActionLoading(true);
            const token = localStorage.getItem('token');
            const unreadIds = notifications
                .filter(notif => notif.status === 'unread')
                .map(notif => notif._id);

            if (unreadIds.length === 0) return;

            await API.put(
                `/notification/many`,
                { 
                    ids: unreadIds,
                    status: 'read'
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Update local state
            setNotifications(prev => 
                prev.map(notif => 
                    notif.status === 'unread' 
                        ? { ...notif, status: 'read' }
                        : notif
                )
            );
            setTotalUnread(0);

        } catch (error) {
            console.error("❌ Mark all as read error:", error);
            setError("Failed to mark all notifications as read");
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteNotification = async (notificationId) => {
        try {
            setActionLoading(true);
            const token = localStorage.getItem('token');

            await API.delete(
                `/notification/${notificationId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                    }
                }
            );

            // Remove from local state
            setNotifications(prev => prev.filter(notif => notif._id !== notificationId));
            
            // Update unread count if needed
            const deletedNotif = notifications.find(notif => notif._id === notificationId);
            if (deletedNotif && deletedNotif.status === 'unread') {
                setTotalUnread(prev => Math.max(0, prev - 1));
            }

        } catch (error) {
            console.error("❌ Delete notification error:", error);
            setError("Failed to delete notification");
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedNotifications.size === 0) return;

        try {
            setActionLoading(true);
            const token = localStorage.getItem('token');
            const selectedIds = Array.from(selectedNotifications);

            await API.delete(
                `/notification/many`,
                {
                    data: { ids: selectedIds },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Remove selected from local state
            setNotifications(prev => 
                prev.filter(notif => !selectedNotifications.has(notif._id))
            );

            // Update unread count
            const deletedUnreadCount = notifications.filter(
                notif => selectedNotifications.has(notif._id) && notif.status === 'unread'
            ).length;
            setTotalUnread(prev => Math.max(0, prev - deletedUnreadCount));

            setSelectedNotifications(new Set());

        } catch (error) {
            console.error("❌ Delete selected error:", error);
            setError("Failed to delete selected notifications");
        } finally {
            setActionLoading(false);
        }
    };

    const handleSelectNotification = (notificationId) => {
        setSelectedNotifications(prev => {
            const newSet = new Set(prev);
            if (newSet.has(notificationId)) {
                newSet.delete(notificationId);
            } else {
                newSet.add(notificationId);
            }
            return newSet;
        });
    };

    const handleSelectAll = () => {
        if (selectedNotifications.size === notifications.length) {
            setSelectedNotifications(new Set());
        } else {
            setSelectedNotifications(new Set(notifications.map(notif => notif._id)));
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'order':
                return '🛒';
            case 'promotion':
                return '🎉';
            case 'system':
                return '⚙️';
            case 'alert':
                return '⚠️';
            default:
                return '📢';
        }
    };

    if (loading) {
        return (
            <div style={{
                width: '100%',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
                marginTop: isMobile ? '70px' : '100px',
                padding: '50px 20px',
                textAlign: 'center',
                backgroundColor: '#FFFFFF',
                minHeight: '100vh'
            }}>
                <HeaderOne />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50vh'
                }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '3px solid #F2EDE8',
                        borderTop: '3px solid #E39963',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginBottom: '20px'
                    }}></div>
                    <h3 style={{
                        fontSize: isMobile ? '1.2rem' : '1.5rem',
                        fontWeight: '300',
                        color: '#434242',
                        margin: 0
                    }}>
                        Loading notifications...
                    </h3>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            width: '100%',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
            marginTop: isMobile ? '70px' : '100px',
            backgroundColor: '#FFFFFF',
            minHeight: '100vh',
            overflowX: 'hidden'
        }}>
            <HeaderOne />
            
            {/* Main Content */}
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                padding: isMobile ? '20px 15px' : '40px 20px'
            }}>
                {/* Header Section */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '30px',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '20px' : '0'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: isMobile ? '1.8rem' : '2.5rem',
                            fontWeight: '300',
                            color: '#434242',
                            margin: '0 0 8px 0',
                            letterSpacing: '-0.5px'
                        }}>
                            Notifications
                        </h1>
                        <p style={{
                            color: '#434242',
                            opacity: 0.7,
                            margin: 0,
                            fontSize: isMobile ? '0.9rem' : '1.1rem'
                        }}>
                            {totalUnread > 0 
                                ? `${totalUnread} unread notification${totalUnread !== 1 ? 's' : ''}`
                                : 'All caught up!'
                            }
                        </p>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        flexWrap: 'wrap'
                    }}>
                        {totalUnread > 0 && (
                            <button
                                onClick={handleMarkAllAsRead}
                                disabled={actionLoading}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#E39963',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: actionLoading ? 'not-allowed' : 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease',
                                    opacity: actionLoading ? 0.7 : 1
                                }}
                            >
                                {actionLoading ? 'Processing...' : 'Mark All as Read'}
                            </button>
                        )}
                        {selectedNotifications.size > 0 && (
                            <button
                                onClick={handleDeleteSelected}
                                disabled={actionLoading}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#FF6B6B',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: actionLoading ? 'not-allowed' : 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease',
                                    opacity: actionLoading ? 0.7 : 1
                                }}
                            >
                                {actionLoading ? 'Deleting...' : `Delete (${selectedNotifications.size})`}
                            </button>
                        )}
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        backgroundColor: '#FFEBEE',
                        border: '1px solid #FFCDD2',
                        color: '#C62828',
                        padding: '15px 20px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        ⚠️ {error}
                        <button 
                            onClick={() => setError(null)}
                            style={{
                                marginLeft: 'auto',
                                background: 'none',
                                border: 'none',
                                color: '#C62828',
                                cursor: 'pointer',
                                fontSize: '18px'
                            }}
                        >
                            ×
                        </button>
                    </div>
                )}

                {/* Notifications List */}
                <div style={{
                    backgroundColor: '#F8F8F8',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                    {/* Select All Header */}
                    {notifications.length > 0 && (
                        <div style={{
                            padding: '15px 20px',
                            backgroundColor: '#FFFFFF',
                            borderBottom: '1px solid #F2EDE8',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px'
                        }}>
                            <input
                                type="checkbox"
                                checked={selectedNotifications.size === notifications.length && notifications.length > 0}
                                onChange={handleSelectAll}
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    accentColor: '#E39963'
                                }}
                            />
                            <span style={{
                                fontSize: '14px',
                                color: '#434242',
                                opacity: 0.7
                            }}>
                                Select all
                            </span>
                        </div>
                    )}

                    {notifications.length === 0 ? (
                        <div style={{
                            padding: '60px 20px',
                            textAlign: 'center',
                            color: '#434242'
                        }}>
                            <div style={{
                                fontSize: '4rem',
                                marginBottom: '20px',
                                opacity: 0.5
                            }}>
                                🔔
                            </div>
                            <h3 style={{
                                fontSize: '1.3rem',
                                fontWeight: '400',
                                margin: '0 0 10px 0'
                            }}>
                                No notifications yet
                            </h3>
                            <p style={{
                                opacity: 0.7,
                                margin: 0
                            }}>
                                You're all caught up! Check back later for new updates.
                            </p>
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification._id}
                                style={{
                                    padding: '20px',
                                    backgroundColor: notification.status === 'unread' ? '#F0F7FF' : '#FFFFFF',
                                    borderBottom: '1px solid #F2EDE8',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '15px',
                                    transition: 'all 0.3s ease',
                                    position: 'relative'
                                }}
                            >
                                {/* Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={selectedNotifications.has(notification._id)}
                                    onChange={() => handleSelectNotification(notification._id)}
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                        accentColor: '#E39963',
                                        marginTop: '2px'
                                    }}
                                />

                                {/* Notification Icon */}
                                <div style={{
                                    fontSize: '1.5rem',
                                    width: '40px',
                                    textAlign: 'center'
                                }}>
                                    {getNotificationIcon(notification.type)}
                                </div>

                                {/* Notification Content */}
                                <div style={{
                                    flex: 1,
                                    minWidth: 0
                                }}>
                                    <h4 style={{
                                        fontSize: '1rem',
                                        fontWeight: '500',
                                        color: '#434242',
                                        margin: '0 0 8px 0',
                                        lineHeight: '1.4'
                                    }}>
                                        {notification.title || 'Notification'}
                                    </h4>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: '#434242',
                                        margin: '0 0 8px 0',
                                        lineHeight: '1.5',
                                        opacity: 0.8
                                    }}>
                                        {notification.message || 'No message content'}
                                    </p>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '15px',
                                        flexWrap: 'wrap'
                                    }}>
                                        <span style={{
                                            fontSize: '0.8rem',
                                            color: '#434242',
                                            opacity: 0.6
                                        }}>
                                            {formatDate(notification.createdAt)}
                                        </span>
                                        {notification.status === 'unread' && (
                                            <span style={{
                                                fontSize: '0.7rem',
                                                backgroundColor: '#E39963',
                                                color: '#FFFFFF',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                fontWeight: '500'
                                            }}>
                                                New
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div style={{
                                    display: 'flex',
                                    gap: '8px',
                                    flexDirection: isMobile ? 'column' : 'row'
                                }}>
                                    {notification.status === 'unread' && (
                                        <button
                                            onClick={() => handleMarkAsRead(notification._id)}
                                            disabled={actionLoading}
                                            style={{
                                                padding: '6px 12px',
                                                backgroundColor: 'transparent',
                                                border: '1px solid #E39963',
                                                color: '#E39963',
                                                borderRadius: '6px',
                                                cursor: actionLoading ? 'not-allowed' : 'pointer',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                transition: 'all 0.3s ease',
                                                opacity: actionLoading ? 0.7 : 1
                                            }}
                                        >
                                            Mark Read
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDeleteNotification(notification._id)}
                                        disabled={actionLoading}
                                        style={{
                                            padding: '6px 12px',
                                            backgroundColor: 'transparent',
                                            border: '1px solid #FF6B6B',
                                            color: '#FF6B6B',
                                            borderRadius: '6px',
                                            cursor: actionLoading ? 'not-allowed' : 'pointer',
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            transition: 'all 0.3s ease',
                                            opacity: actionLoading ? 0.7 : 1
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        marginTop: '30px',
                        flexWrap: 'wrap'
                    }}>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: currentPage === 1 ? '#F2EDE8' : '#E39963',
                                color: currentPage === 1 ? '#434242' : '#FFFFFF',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                opacity: currentPage === 1 ? 0.5 : 1
                            }}
                        >
                            Previous
                        </button>
                        
                        <span style={{
                            color: '#434242',
                            fontSize: '14px'
                        }}>
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: currentPage === totalPages ? '#F2EDE8' : '#E39963',
                                color: currentPage === totalPages ? '#434242' : '#FFFFFF',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                opacity: currentPage === totalPages ? 0.5 : 1
                            }}
                        >
                            Next
                        </button>
                    </div>
                )}
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

export default Notifications;