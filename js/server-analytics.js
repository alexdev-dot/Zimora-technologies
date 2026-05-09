// Server-side Analytics Fallback for Cookie Consent System
// This file should be placed on your server to handle anonymous analytics

class ServerAnalytics {
    constructor() {
        this.endpoint = '/api/analytics';
        this.batchSize = 10;
        this.batchTimeout = 5000; // 5 seconds
        this.eventQueue = [];
        this.batchTimer = null;
    }

    // Initialize server-side analytics
    init() {
        // Process any queued events from localStorage
        this.processQueuedEvents();
        
        // Set up beforeunload to send remaining events
        window.addEventListener('beforeunload', () => {
            this.flushEvents(true);
        });
        
        // Set up periodic batch sending
        this.startBatchTimer();
    }

    // Track event with server-side fallback
    track(eventName, data = {}) {
        const event = {
            eventName,
            data,
            timestamp: new Date().toISOString(),
            sessionId: this.getSessionId(),
            userId: this.getUserId(),
            page: window.location.pathname,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };

        this.addToQueue(event);
    }

    // Add event to queue
    addToQueue(event) {
        this.eventQueue.push(event);
        
        if (this.eventQueue.length >= this.batchSize) {
            this.flushEvents();
        }
    }

    // Send events to server
    async flushEvents(isSync = false) {
        if (this.eventQueue.length === 0) return;

        const events = [...this.eventQueue];
        this.eventQueue = [];

        const payload = {
            events,
            timestamp: new Date().toISOString(),
            source: 'cookie-consent-system'
        };

        try {
            if (isSync && 'sendBeacon' in navigator) {
                // Use sendBeacon for synchronous requests (like page unload)
                navigator.sendBeacon(this.endpoint, JSON.stringify(payload));
            } else {
                // Use regular fetch for asynchronous requests
                await fetch(this.endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                    keepalive: true
                });
            }
        } catch (error) {
            // If sending fails, store in localStorage for retry
            this.storeEventsForRetry(events);
            console.warn('Failed to send analytics events, stored for retry:', error);
        }
    }

    // Store failed events for retry
    storeEventsForRetry(events) {
        try {
            const existingQueue = JSON.parse(localStorage.getItem('analytics_retry_queue') || '[]');
            const updatedQueue = [...existingQueue, ...events];
            localStorage.setItem('analytics_retry_queue', JSON.stringify(updatedQueue));
        } catch (error) {
            console.warn('Failed to store events for retry:', error);
        }
    }

    // Process queued events from previous failed attempts
    processQueuedEvents() {
        try {
            const retryQueue = JSON.parse(localStorage.getItem('analytics_retry_queue') || '[]');
            if (retryQueue.length > 0) {
                retryQueue.forEach(event => this.addToQueue(event));
                localStorage.removeItem('analytics_retry_queue');
            }
        } catch (error) {
            console.warn('Failed to process queued events:', error);
        }
    }

    // Start batch timer
    startBatchTimer() {
        if (this.batchTimer) {
            clearInterval(this.batchTimer);
        }
        
        this.batchTimer = setInterval(() => {
            this.flushEvents();
        }, this.batchTimeout);
    }

    // Get or create session ID
    getSessionId() {
        let sessionId = sessionStorage.getItem('analytics_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('analytics_session_id', sessionId);
        }
        return sessionId;
    }

    // Get or create user ID (anonymous)
    getUserId() {
        let userId = localStorage.getItem('analytics_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('analytics_user_id', userId);
        }
        return userId;
    }

    // Track page view
    trackPageView() {
        this.track('page_view', {
            title: document.title,
            url: window.location.href,
            loadTime: this.getLoadTime(),
            domContentLoaded: this.getDomContentLoadedTime()
        });
    }

    // Track consent events
    trackConsent(action, preferences = {}) {
        this.track('consent_event', {
            action, // 'accept_all', 'decline_all', 'custom', 'withdraw'
            preferences,
            timestamp: new Date().toISOString()
        });
    }

    // Track cookie banner interactions
    trackBannerInteraction(action) {
        this.track('banner_interaction', {
            action, // 'show', 'hide', 'settings_open', 'settings_close'
            page: window.location.pathname
        });
    }

    // Get page load time
    getLoadTime() {
        if (performance.timing) {
            return performance.timing.loadEventEnd - performance.timing.navigationStart;
        }
        return null;
    }

    // Get DOM content loaded time
    getDomContentLoadedTime() {
        if (performance.timing) {
            return performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        }
        return null;
    }

    // Track performance metrics
    trackPerformanceMetrics() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        this.track('performance_lcp', {
                            value: entry.startTime,
                            url: window.location.href
                        });
                    } else if (entry.entryType === 'first-input') {
                        this.track('performance_fid', {
                            value: entry.processingStart - entry.startTime,
                            url: window.location.href
                        });
                    } else if (entry.entryType === 'layout-shift') {
                        if (!entry.hadRecentInput) {
                            this.track('performance_cls', {
                                value: entry.value,
                                url: window.location.href
                            });
                        }
                    }
                });
            });

            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        }
    }
}

// Initialize server analytics
window.serverAnalytics = new ServerAnalytics();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.serverAnalytics.init();
        window.serverAnalytics.trackPageView();
        window.serverAnalytics.trackPerformanceMetrics();
    });
} else {
    window.serverAnalytics.init();
    window.serverAnalytics.trackPageView();
    window.serverAnalytics.trackPerformanceMetrics();
}

// Make globally accessible
window.ServerAnalytics = ServerAnalytics;
