const CACHE_NAME = 'redioteka_cache';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll([
                    'assets/',
                    'fonts/',
                    'index.html',
                    'main.js',
                    'index.css'
                ]);
            })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method === 'GET') {
        event.respondWith(
            caches
                .match(event.request)
                .then((response) => {
                    if (!navigator.onLine && response) {
                        return response;
                    }
                    return fetch(event.request).then((res) => {
                        return caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, res.clone());
                            return res;
                        });
                    });
                })
        );
    }
});