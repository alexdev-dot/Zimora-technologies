// Cookie Consent Management
class CookieConsent {
    constructor() {
        this.consentGiven = false;
        this.preferences = {
            necessary: true,  // Always enabled
            analytics: false,
            marketing: false,
            functional: false
        };
        this.version = '1.0'; // Cookie versioning for migrations
        this.useLocalStorage = false; // Fallback flag
        this.init();
    }

    init() {
        this.initializeConsentMode();
        this.checkExistingConsent();
        if (!this.consentGiven) {
            this.lazyLoadBanner();
        }
        this.bindEvents();
    }

    checkExistingConsent() {
        try {
            const consent = this.getCookie('zimora_cookie_consent');
            if (consent) {
                const consentData = JSON.parse(consent);
                // Check version compatibility
                if (consentData.version !== this.version) {
                    this.migrateConsent(consentData);
                } else {
                    this.consentGiven = true;
                    this.preferences = consentData.preferences || consentData;
                }
                this.applyConsent();
            }
        } catch (error) {
            console.warn('Error checking existing consent:', error);
            // Try localStorage fallback
            this.checkLocalStorageConsent();
        }
    }

    // Google Consent Mode v2 Implementation
    initializeConsentMode() {
        // Initialize consent mode with default denied state
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'personalization_storage': 'denied',
                'functionality_storage': 'denied',
                'security_storage': 'granted' // Always granted for security
            });
        }
        
        // Initialize server-side analytics
        if (typeof window.serverAnalytics !== 'undefined') {
            window.serverAnalytics.init();
        }
    }

    updateConsentMode() {
        if (typeof gtag === 'undefined') return;

        const consentConfig = {
            'ad_storage': this.preferences.marketing ? 'granted' : 'denied',
            'ad_user_data': this.preferences.marketing ? 'granted' : 'denied',
            'ad_personalization': this.preferences.marketing ? 'granted' : 'denied',
            'analytics_storage': this.preferences.analytics ? 'granted' : 'denied',
            'personalization_storage': this.preferences.functional ? 'granted' : 'denied',
            'functionality_storage': 'granted', // Essential for site functionality
            'security_storage': 'granted' // Always granted
        };

        gtag('consent', 'update', consentConfig);
        
        // Send consent update event
        gtag('event', 'consent_update', {
            'consent_types': Object.keys(consentConfig).filter(key => consentConfig[key] === 'granted')
        });
    }

    // Lazy load cookie banner to improve Core Web Vitals
    lazyLoadBanner() {
        // Check if user is idle before showing banner
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.showConsentBanner();
            }, { timeout: 2000 });
        } else {
            // Fallback for older browsers
            setTimeout(() => {
                this.showConsentBanner();
            }, 1500);
        }
    }

    // Server-side analytics fallback
    trackServerSide(event, data = {}) {
        // Send anonymous data to server-side endpoint
        const payload = {
            event,
            data,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
            page: window.location.pathname,
            referrer: document.referrer,
            session_id: this.getSessionId()
        };

        // Use navigator.sendBeacon for reliable delivery
        if ('sendBeacon' in navigator) {
            navigator.sendBeacon('/api/analytics', JSON.stringify(payload));
        } else {
            // Fallback method
            fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                keepalive: true
            }).catch(() => {
                // Silent fail for analytics
            });
        }
    }

    getSessionId() {
        let sessionId = this.getStorage('zimora_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            this.setStorage('zimora_session_id', sessionId, 1); // 1 day expiry
        }
        return sessionId;
    }

    // Anonymous page view tracking
    trackPageView() {
        const pageData = {
            title: document.title,
            url: window.location.href,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            performance: {
                load_time: performance.timing ? performance.timing.loadEventEnd - performance.timing.navigationStart : null,
                dom_content_loaded: performance.timing ? performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart : null
            }
        };

        if (!this.preferences.analytics) {
            // Track anonymously when analytics cookies are declined
            this.trackServerSide('page_view_anonymous', pageData);
        } else {
            // Track with Google Analytics when consent is given
            if (typeof gtag !== 'undefined') {
                gtag('config', 'GA_MEASUREMENT_ID', {
                    page_title: document.title,
                    page_location: window.location.href
                });
            }
        }
    }

    showConsentBanner() {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            // Optimize for Core Web Vitals - minimize layout shift
            banner.style.position = 'fixed';
            banner.style.bottom = '0';
            banner.style.left = '0';
            banner.style.right = '0';
            banner.style.zIndex = '10000';
            banner.style.transform = 'translateY(100%)';
            banner.style.transition = 'transform 0.3s ease-in-out';
            
            // Show after a short delay to prevent layout shift
            requestAnimationFrame(() => {
                setTimeout(() => {
                    banner.classList.add('show');
                    banner.style.transform = 'translateY(0)';
                    
                    // Track banner impression for analytics
                    this.trackServerSide('cookie_banner_shown', {
                        page: window.location.pathname,
                        timestamp: new Date().toISOString()
                    });
                }, 100);
            });
        }
    }

    acceptAllCookies() {
        this.preferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true
        };
        this.saveConsent();
        this.hideConsentBanner();
        this.applyConsent();
        this.showNotification('Cookie preferences saved!', 'success');
        
        // Track consent acceptance
        this.trackServerSide('consent_accepted_all', {
            method: 'accept_all_button',
            page: window.location.pathname
        });
        
        // Track with Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cookie_consent', {
                'action': 'accept_all',
                'method': 'accept_all_button',
                'custom_parameter_1': 'cookie_consent_system_v2'
            });
        }
        
        // Track with server analytics
        if (typeof window.serverAnalytics !== 'undefined') {
            window.serverAnalytics.trackConsent('accept_all', this.preferences);
        }
    }

    declineAllCookies() {
        this.preferences = {
            necessary: true,  // Always enabled for essential functionality
            analytics: false,
            marketing: false,
            functional: false
        };
        this.saveConsent();
        this.hideConsentBanner();
        this.applyConsent();
        this.showNotification('Only essential cookies will be used.', 'info');
        
        // Track consent decline
        this.trackServerSide('consent_declined_all', {
            method: 'decline_all_button',
            page: window.location.pathname
        });
        
        // Track with Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cookie_consent', {
                'action': 'decline_all',
                'method': 'decline_all_button',
                'custom_parameter_1': 'cookie_consent_system_v2'
            });
        }
        
        // Track with server analytics
        if (typeof window.serverAnalytics !== 'undefined') {
            window.serverAnalytics.trackConsent('decline_all', this.preferences);
        }
    }

    saveCustomPreferences() {
        this.preferences.necessary = true; // Always enabled
        
        // Get toggle states
        const analyticsToggle = document.getElementById('analytics-toggle');
        const marketingToggle = document.getElementById('marketing-toggle');
        const functionalToggle = document.getElementById('functional-toggle');
        
        this.preferences.analytics = analyticsToggle ? analyticsToggle.classList.contains('active') : false;
        this.preferences.marketing = marketingToggle ? marketingToggle.classList.contains('active') : false;
        this.preferences.functional = functionalToggle ? functionalToggle.classList.contains('active') : false;
        
        this.saveConsent();
        this.hideSettingsModal();
        this.hideConsentBanner();
        this.applyConsent();
        this.showNotification('Cookie preferences saved!', 'success');
    }

    saveConsent() {
        this.consentGiven = true;
        const consentData = {
            version: this.version,
            preferences: this.preferences,
            timestamp: new Date().toISOString()
        };
        
        try {
            this.setCookie('zimora_cookie_consent', JSON.stringify(consentData), 365);
            this.setCookie('zimora_consent_timestamp', consentData.timestamp, 365);
        } catch (error) {
            console.warn('Failed to save cookies, using localStorage fallback:', error);
            this.saveToLocalStorage(consentData);
        }
    }

    applyConsent() {
        // Update Google Consent Mode
        this.updateConsentMode();
        
        // Apply consent settings
        if (this.preferences.analytics) {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }
        
        if (this.preferences.marketing) {
            this.enableMarketing();
        } else {
            this.disableMarketing();
        }
        
        if (this.preferences.functional) {
            this.enableFunctional();
        } else {
            this.disableFunctional();
        }
        
        // Track consent decision
        this.trackServerSide('consent_decision', {
            preferences: this.preferences,
            consent_given: this.consentGiven,
            method: 'existing_consent'
        });
        
        // Initialize page view tracking
        this.trackPageView();
    }

    enableAnalytics() {
        // Enable Google Analytics or other analytics
        console.log('Analytics cookies enabled');
        
        // Enable analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=Lax;Secure'
            });
        }
        
        // Track analytics enablement
        this.trackServerSide('analytics_enabled', {
            method: 'user_consent'
        });
    }

    disableAnalytics() {
        // Disable analytics
        console.log('Analytics cookies disabled');
        
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
        
        // Continue anonymous tracking
        this.trackPageView();
    }

    enableMarketing() {
        // Enable marketing cookies
        console.log('Marketing cookies enabled');
        
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
        }
        
        // Track marketing enablement
        this.trackServerSide('marketing_enabled', {
            method: 'user_consent'
        });
    }

    disableMarketing() {
        // Disable marketing cookies
        console.log('Marketing cookies disabled');
        
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });
        }
    }

    enableFunctional() {
        // Enable functional cookies
        console.log('Functional cookies enabled');
    }

    disableFunctional() {
        // Disable functional cookies
        console.log('Functional cookies disabled');
    }

    showSettingsModal() {
        const modal = document.getElementById('cookieSettingsModal');
        if (modal) {
            modal.classList.add('show');
            this.updateToggleStates();
        }
    }

    hideSettingsModal() {
        const modal = document.getElementById('cookieSettingsModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    updateToggleStates() {
        // Update toggle switches based on current preferences
        const toggles = {
            'analytics-toggle': this.preferences.analytics,
            'marketing-toggle': this.preferences.marketing,
            'functional-toggle': this.preferences.functional
        };
        
        Object.entries(toggles).forEach(([id, active]) => {
            const toggle = document.getElementById(id);
            if (toggle) {
                if (active) {
                    toggle.classList.add('active');
                } else {
                    toggle.classList.remove('active');
                }
            }
        });
    }

    toggleCookieCategory(categoryId) {
        const toggle = document.getElementById(categoryId);
        if (toggle && categoryId !== 'necessary-toggle') {
            toggle.classList.toggle('active');
        }
    }

    showNotification(message, type = 'info') {
        // Create a simple notification (you can enhance this)
        const notification = document.createElement('div');
        notification.className = `cookie-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 10002;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            font-size: 14px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    bindEvents() {
        // Accept all button
        const acceptBtn = document.getElementById('cookieAccept');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.acceptAllCookies());
            acceptBtn.addEventListener('keydown', (e) => this.handleKeyNavigation(e, 'accept'));
        }

        // Decline all button
        const declineBtn = document.getElementById('cookieDecline');
        if (declineBtn) {
            declineBtn.addEventListener('click', () => this.declineAllCookies());
            declineBtn.addEventListener('keydown', (e) => this.handleKeyNavigation(e, 'decline'));
        }

        // Settings button
        const settingsBtn = document.getElementById('cookieSettings');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.showSettingsModal());
            settingsBtn.addEventListener('keydown', (e) => this.handleKeyNavigation(e, 'settings'));
        }

        // Close settings modal
        const closeSettingsBtn = document.getElementById('cookieSettingsClose');
        if (closeSettingsBtn) {
            closeSettingsBtn.addEventListener('click', () => this.hideSettingsModal());
            closeSettingsBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.hideSettingsModal();
                }
            });
        }

        // Cancel settings button
        const cancelSettingsBtn = document.getElementById('cookieCancelSettings');
        if (cancelSettingsBtn) {
            cancelSettingsBtn.addEventListener('click', () => this.hideSettingsModal());
            cancelSettingsBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.hideSettingsModal();
                }
            });
        }

        // Save custom preferences
        const savePreferencesBtn = document.getElementById('cookieSavePreferences');
        if (savePreferencesBtn) {
            savePreferencesBtn.addEventListener('click', () => this.saveCustomPreferences());
            savePreferencesBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.saveCustomPreferences();
                }
            });
        }

        // Toggle switches
        const toggles = document.querySelectorAll('.toggle-switch');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                this.toggleCookieCategory(toggle.id);
            });
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleCookieCategory(toggle.id);
                }
            });
            // Make toggle switches focusable
            toggle.setAttribute('tabindex', '0');
            toggle.setAttribute('role', 'switch');
            toggle.setAttribute('aria-checked', 'false');
        });

        // Close modal on backdrop click
        const modal = document.getElementById('cookieSettingsModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideSettingsModal();
                }
            });
            
            // Keyboard navigation for modal
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.hideSettingsModal();
                }
            });
        }

        // Add aria labels for screen readers
        this.addAccessibilityAttributes();
    }

    // Cookie utility functions with error handling
    setCookie(name, value, days) {
        try {
            const expires = new Date();
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            
            // Enhanced security settings
            const isSecure = window.location.protocol === 'https:';
            const cookieString = name + '=' + encodeURIComponent(value) + 
                ';expires=' + expires.toUTCString() + 
                ';path=/' + 
                ';SameSite=Lax' + 
                (isSecure ? ';Secure' : '') +
                ';HttpOnly';
            
            document.cookie = cookieString;
            
            // Verify cookie was set
            if (!this.getCookie(name)) {
                throw new Error('Cookie was not set successfully');
            }
        } catch (error) {
            console.error('Error setting cookie:', error);
            throw error;
        }
    }

    getCookie(name) {
        try {
            const nameEQ = name + '=';
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                let c = cookie.trim();
                if (c.indexOf(nameEQ) === 0) {
                    return decodeURIComponent(c.substring(nameEQ.length));
                }
            }
            return null;
        } catch (error) {
            console.error('Error getting cookie:', error);
            return null;
        }
    }

    deleteCookie(name) {
        try {
            const isSecure = window.location.protocol === 'https:';
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax' + (isSecure ? ';Secure' : '') + ';HttpOnly';
        } catch (error) {
            console.error('Error deleting cookie:', error);
        }
    }

    // Public method to reset consent
    resetConsent() {
        try {
            this.deleteCookie('zimora_cookie_consent');
            this.deleteCookie('zimora_consent_timestamp');
            localStorage.removeItem('zimora_cookie_consent');
            localStorage.removeItem('zimora_consent_timestamp');
        } catch (error) {
            console.error('Error resetting consent:', error);
        }
        
        this.consentGiven = false;
        this.preferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false
        };
        this.showConsentBanner();
    }

    // New methods for enhanced functionality
    migrateConsent(oldConsentData) {
        console.log('Migrating cookie consent from version:', oldConsentData.version || 'unknown');
        // Migration logic for future versions
        this.consentGiven = true;
        this.preferences = oldConsentData.preferences || oldConsentData;
        this.saveConsent(); // Save with new version
    }

    checkLocalStorageConsent() {
        try {
            const consent = localStorage.getItem('zimora_cookie_consent');
            if (consent) {
                const consentData = JSON.parse(consent);
                this.consentGiven = true;
                this.preferences = consentData.preferences || consentData;
                this.useLocalStorage = true;
                this.applyConsent();
            }
        } catch (error) {
            console.warn('Error checking localStorage consent:', error);
        }
    }

    saveToLocalStorage(consentData) {
        try {
            localStorage.setItem('zimora_cookie_consent', JSON.stringify(consentData));
            localStorage.setItem('zimora_consent_timestamp', consentData.timestamp);
            this.useLocalStorage = true;
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
            this.showNotification('Unable to save cookie preferences. Please check your browser settings.', 'error');
        }
    }

    withdrawConsent() {
        this.resetConsent();
        this.showNotification('Your consent has been withdrawn. All non-essential cookies have been removed.', 'info');
    }

    // Enhanced storage method that tries cookies first, then localStorage
    setStorage(key, value, days = 365) {
        try {
            this.setCookie(key, value, days);
        } catch (error) {
            console.warn('Cookie storage failed, using localStorage:', error);
            localStorage.setItem(key, value);
            this.useLocalStorage = true;
        }
    }

    getStorage(key) {
        if (!this.useLocalStorage) {
            return this.getCookie(key);
        }
        return localStorage.getItem(key);
    }

    removeStorage(key) {
        try {
            this.deleteCookie(key);
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from storage:', error);
        }
    }

    // Accessibility helper methods
    handleKeyNavigation(event, action) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            switch (action) {
                case 'accept':
                    this.acceptAllCookies();
                    break;
                case 'decline':
                    this.declineAllCookies();
                    break;
                case 'settings':
                    this.showSettingsModal();
                    break;
            }
        }
    }

    addAccessibilityAttributes() {
        // Add ARIA attributes to cookie banner
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            banner.setAttribute('role', 'dialog');
            banner.setAttribute('aria-label', 'Cookie Consent Banner');
            banner.setAttribute('aria-describedby', 'cookie-consent-description');
        }

        // Add ARIA attributes to modal
        const modal = document.getElementById('cookieSettingsModal');
        if (modal) {
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-label', 'Cookie Settings');
        }

        // Add ARIA attributes to buttons
        const acceptBtn = document.getElementById('cookieAccept');
        if (acceptBtn) {
            acceptBtn.setAttribute('aria-label', 'Accept all cookies');
        }

        const declineBtn = document.getElementById('cookieDecline');
        if (declineBtn) {
            declineBtn.setAttribute('aria-label', 'Decline all non-essential cookies');
        }

        const settingsBtn = document.getElementById('cookieSettings');
        if (settingsBtn) {
            settingsBtn.setAttribute('aria-label', 'Customize cookie settings');
        }

        // Add ARIA attributes to toggle switches
        this.updateToggleAccessibility();
    }

    updateToggleAccessibility() {
        const toggles = document.querySelectorAll('.toggle-switch');
        toggles.forEach(toggle => {
            const isActive = toggle.classList.contains('active');
            toggle.setAttribute('aria-checked', isActive.toString());
            
            // Add descriptive labels based on toggle ID
            switch (toggle.id) {
                case 'analytics-toggle':
                    toggle.setAttribute('aria-label', `Analytics cookies ${isActive ? 'enabled' : 'disabled'}`);
                    break;
                case 'marketing-toggle':
                    toggle.setAttribute('aria-label', `Marketing cookies ${isActive ? 'enabled' : 'disabled'}`);
                    break;
                case 'functional-toggle':
                    toggle.setAttribute('aria-label', `Functional cookies ${isActive ? 'enabled' : 'disabled'}`);
                    break;
            }
        });
    }

    // Override toggleCookieCategory to update accessibility
    toggleCookieCategory(categoryId) {
        const toggle = document.getElementById(categoryId);
        if (toggle && categoryId !== 'necessary-toggle') {
            toggle.classList.toggle('active');
            this.updateToggleAccessibility();
        }
    }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent = new CookieConsent();
});

// Make it globally accessible
window.CookieConsent = CookieConsent;
