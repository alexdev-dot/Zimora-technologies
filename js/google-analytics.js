// Google Analytics with Consent Mode v2 Integration
// This should be loaded in the <head> of your HTML pages

(function() {
    'use strict';

    // Configuration
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 Measurement ID
    const GA_TRACKING_ID = 'GA_MEASUREMENT_ID'; // For gtag.js compatibility

    // Initialize data layer
    window.dataLayer = window.dataLayer || [];

    // gtag function wrapper
    function gtag() {
        dataLayer.push(arguments);
    }

    // Initialize consent mode with default denied state
    function initializeConsentMode() {
        gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'personalization_storage': 'denied',
            'functionality_storage': 'denied',
            'security_storage': 'granted'
        });

        // Set up consent mode debugging (remove in production)
        if (window.location.hostname === 'localhost' || window.location.hostname.includes('staging')) {
            gtag('set', 'debug_mode', true);
        }
    }

    // Update consent based on user preferences
    function updateConsent(preferences) {
        const consentConfig = {
            'ad_storage': preferences.marketing ? 'granted' : 'denied',
            'ad_user_data': preferences.marketing ? 'granted' : 'denied',
            'ad_personalization': preferences.marketing ? 'granted' : 'denied',
            'analytics_storage': preferences.analytics ? 'granted' : 'denied',
            'personalization_storage': preferences.functional ? 'granted' : 'denied',
            'functionality_storage': 'granted', // Essential for site functionality
            'security_storage': 'granted' // Always granted
        };

        gtag('consent', 'update', consentConfig);

        // Track consent update event
        gtag('event', 'consent_update', {
            'consent_types': Object.keys(consentConfig).filter(key => consentConfig[key] === 'granted'),
            'custom_parameter_1': 'cookie_consent_system_v2'
        });

        // Configure GA if analytics is granted
        if (preferences.analytics) {
            configureAnalytics();
        }
    }

    // Configure Google Analytics
    function configureAnalytics() {
        gtag('config', GA_MEASUREMENT_ID, {
            'anonymize_ip': true,
            'cookie_flags': 'SameSite=Lax;Secure',
            'custom_map': {
                'custom_parameter_1': 'consent_version',
                'custom_parameter_2': 'user_consent_level'
            }
        });

        // Set custom dimensions
        gtag('set', {
            'consent_version': '2.0',
            'user_consent_level': getConsentLevel()
        });
    }

    // Get consent level description
    function getConsentLevel() {
        if (typeof window.cookieConsent !== 'undefined') {
            const prefs = window.cookieConsent.preferences;
            const grantedCount = Object.values(prefs).filter(v => v === true).length;
            const totalCount = Object.keys(prefs).length;
            
            if (grantedCount === totalCount) return 'all';
            if (grantedCount === 1) return 'essential_only';
            if (grantedCount > 1) return 'partial';
            return 'none';
        }
        return 'unknown';
    }

    // Track custom events
    function trackCustomEvent(eventName, parameters = {}) {
        gtag('event', eventName, {
            ...parameters,
            'custom_parameter_1': 'cookie_consent_system_v2',
            'event_category': 'user_interaction'
        });
    }

    // Track consent events specifically
    function trackConsentEvent(action, preferences = {}) {
        gtag('event', 'cookie_consent', {
            'action': action,
            'analytics_consent': preferences.analytics || false,
            'marketing_consent': preferences.marketing || false,
            'functional_consent': preferences.functional || false,
            'custom_parameter_1': 'cookie_consent_system_v2'
        });
    }

    // Enhanced ecommerce tracking (if needed)
    function trackEcommerceEvent(eventName, items = {}) {
        if (typeof window.cookieConsent !== 'undefined' && window.cookieConsent.preferences.analytics) {
            gtag('event', eventName, {
                ...items,
                'custom_parameter_1': 'cookie_consent_system_v2'
            });
        }
    }

    // Page view tracking with consent awareness
    function trackPageView(pageTitle, pageLocation) {
        if (typeof window.cookieConsent !== 'undefined' && window.cookieConsent.preferences.analytics) {
            gtag('config', GA_MEASUREMENT_ID, {
                page_title: pageTitle || document.title,
                page_location: pageLocation || window.location.href
            });
        }
    }

    // Initialize analytics
    function init() {
        // Initialize consent mode first
        initializeConsentMode();

        // Load gtag.js script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        
        script.onload = function() {
            // Make gtag globally available
            window.gtag = gtag;
            
            // Apply existing consent if available
            if (typeof window.cookieConsent !== 'undefined' && window.cookieConsent.consentGiven) {
                updateConsent(window.cookieConsent.preferences);
            }
        };

        // Handle script loading errors
        script.onerror = function() {
            console.warn('Google Analytics script failed to load');
        };

        // Insert script as early as possible
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
    }

    // Public API
    window.GoogleAnalytics = {
        updateConsent,
        trackCustomEvent,
        trackConsentEvent,
        trackEcommerceEvent,
        trackPageView,
        configureAnalytics
    };

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
