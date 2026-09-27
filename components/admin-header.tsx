'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Bell, Menu, LogOut, Settings, User, Check, X, Clock } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
}

export function AdminHeader({ onToggleSidebar, isMobileSidebarOpen }: { onToggleSidebar: () => void; isMobileSidebarOpen?: boolean }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    if (isProfileOpen || isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen, isNotificationOpen]);

  return (
    <header className="dashboard-header">
      <button 
        className="sidebar-menu" 
        onClick={onToggleSidebar} 
        aria-label="Toggle admin sidebar"
        aria-expanded={isMobileSidebarOpen}
        aria-controls="admin-sidebar"
      >
        <Menu aria-hidden="true" />
      </button>
      <div className="dash-header-actions">
        <div className="dash-notification-container" ref={notificationRef}>
          <button 
            className="dash-bell" 
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            aria-label="Notifications"
            aria-expanded={isNotificationOpen}
          >
            <Bell aria-hidden="true" />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>
          
          {isNotificationOpen && (
            <div className="notification-dropdown-card">
              <div className="notification-header">
                <h3>Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    className="mark-all-read-btn"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              
              <div className="notification-list">
                {notifications.length === 0 ? (
                  <div className="no-notifications">
                    <Bell className="empty-icon" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`notification-item ${!notification.read ? 'unread' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="notification-icon">
                        {notification.type === 'success' && <Check className="icon-success" />}
                        {notification.type === 'warning' && <Clock className="icon-warning" />}
                        {notification.type === 'error' && <X className="icon-error" />}
                        {notification.type === 'info' && <Bell className="icon-info" />}
                      </div>
                      <div className="notification-content">
                        <h4>{notification.title}</h4>
                        <p>{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                      <button 
                        className="delete-notification-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        aria-label="Delete notification"
                      >
                        <X aria-hidden="true" />
                      </button>
                    </div>
                  ))
                )}
              </div>
              
              {notifications.length > 0 && (
                <div className="notification-footer">
                  <button className="view-all-btn">View All Notifications</button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="dash-profile-container" ref={profileRef}>
          <button 
            className="dash-profile-btn" 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            aria-label="Profile menu"
            aria-expanded={isProfileOpen}
          >
            <Image src="/images/CEO.png" alt="Alex Kariuki Macharia" width={38} height={38} />
          </button>
          
          {isProfileOpen && (
            <div className="profile-dropdown-card">
              <div className="profile-header">
                <Image src="/images/CEO.png" alt="Alex Kariuki Macharia" width={48} height={48} />
                <div className="profile-details">
                  <strong>Alex Kariuki Macharia</strong>
                  <span>Administrator</span>
                </div>
              </div>
              <div className="profile-menu">
                <button className="profile-menu-item">
                  <User aria-hidden="true" />
                  <span>My Profile</span>
                </button>
                <button className="profile-menu-item">
                  <Settings aria-hidden="true" />
                  <span>Settings</span>
                </button>
                <button className="profile-menu-item profile-menu-item-danger">
                  <LogOut aria-hidden="true" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
