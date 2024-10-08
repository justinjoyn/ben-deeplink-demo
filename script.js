function deepLink() {
    var isMobile = /Mobi|Android/i.test(navigator.userAgent);
    var isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    var isAndroid = /Android/i.test(navigator.userAgent);

    if (isMobile) {
        var appDeeplink = 'ben://';
        var appStoreURL = 'https://apps.apple.com/us/app/thanksben/id6450548835';
        var playStoreURL = 'https://play.google.com/store/apps/details?id=com.thanksben.ben&hl=en';

        var now = Date.now();
        var timeout;

        // Function to attempt to open the app
        function openApp() {
            if (isIOS) {
                // Create an invisible iframe
                var iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = appDeeplink;
                document.body.appendChild(iframe);

                // Remove iframe after use
                setTimeout(function() {
                    document.body.removeChild(iframe);
                }, 100);
            }  else if (isAndroid) {
                // For Android, use the intent scheme
                var intentUrl = 'intent://#Intent;scheme=ben;package=com.thanksben.ben;end';
                window.location = intentUrl;
            }
        }

        // Attempt to open the app
        openApp();

        // After 1.5 seconds, redirect to App Store or Play Store if app hasn't opened
        timeout = setTimeout(function() {
            var elapsed = Date.now() - now;
            if (elapsed < 2000) {
                if (isIOS) {
                    window.location = appStoreURL;
                } else if (isAndroid) {
                    window.location = playStoreURL;
                }
            }
        }, 1500);

        // Clear timeout if app opens and browser loses focus
        var clearTimers = function() {
            clearTimeout(timeout);
        };
        window.addEventListener('blur', clearTimers);
        window.addEventListener('pagehide', clearTimers);

    } else {
        // User is on desktop or non-supported device, redirect to Google
        window.location = 'https://www.google.com';
    }
}

document.getElementById('deep-link-button').addEventListener('click', deepLink);