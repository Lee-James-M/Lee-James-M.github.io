'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "d4fd703306d0cfbf6f3fa67a90818b10",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/images/chc/chcGlobalS.jpg": "11fcf21424a1d378793928a9fceb0bf0",
"assets/images/eclipse/dcController.jpg": "62b30d3b7e603cbe44493588093f310c",
"assets/images/eclipse/futureproof_score.jpg": "1769c393d2685c01095d2058787b99df",
"assets/images/eclipse/globalS.jpg": "11fcf21424a1d378793928a9fceb0bf0",
"assets/images/eclipse/hexagonSmallLogo.bmp": "8c78dcc6b1876626bedc60c2f8c1a26c",
"assets/images/eclipse/logo.bmp": "32c9e5ea8247a0238b71197087968eda",
"assets/images/eclipse/newOfferingNames/flexibility.png": "e2edc2a63eab7ea0aa8b717ae56e404c",
"assets/images/eclipse/newOfferingNames/optical.png": "c914cc339df2767e1cc7f99fae026013",
"assets/images/eclipse/newOfferingNames/precision.png": "51e1e243d7a89bad2b7acc1e61db4953",
"assets/images/eclipse/newOfferingNames/scan.png": "f3730d3629f021c0606a712d8a11dad0",
"assets/images/eclipse/newOfferingNames/speed.png": "acaa0eacb2fc9d16ee721f1d4bcd23bb",
"assets/images/eclipse/newOfferingNames/touch.png": "dc901d65a072aad5ba16fdcd2a4f12f6",
"assets/images/eclipse/pcdmislogo.jfif": "ae80c082046b6b0cfe7c05f123bc1ed0",
"assets/images/eclipse/pcdmislogo.jpg": "57b03ccff172760788b949fd4d934457",
"assets/images/eclipse/rc1Controller.jpg": "9fb12cb77e84c53ccf7b5219d0b8fe67",
"assets/images/eclipse/score.jpg": "dcb382d6a9715a835f1b9ac285f659e1",
"assets/images/eclipse/service/beltDebris.jpg": "57a939fd22878116b81816c30a5ef10a",
"assets/images/eclipse/service/brokenEarthCable.jpg": "da8b62c167bd8efadb6ab80e585f0d14",
"assets/images/eclipse/service/clean_fan.jpg": "d1c8287627db18d7465fd3e0e0479d9a",
"assets/images/eclipse/service/clean_x.jpg": "63f60467e8736e4c2288e419f5762a20",
"assets/images/eclipse/service/dirtyCounterBalanceTop.jpg": "8149ecc995c30c501d9cd2d0f134f70e",
"assets/images/eclipse/service/dirty_fan.jpg": "acb511cdceb34ee351a2e598382f4c9d",
"assets/images/eclipse/service/dirty_x.jpg": "a76c99ce7ecba1c9b66ecdf3f0406e46",
"assets/images/eclipse/service/half_and_half_x.jpg": "034a509a0bbcf3103ff6b0090fac26ae",
"assets/images/eclipse/sharpe32.jpeg": "762a2d9323f87cf40d3e40d1fffaa343",
"assets/images/eclipse_icon.png": "6d6ad3d8195135b42397ca36a8aa6eaa",
"assets/images/hexIcon.ico": "655939ab1eace23d182a155162804ba5",
"assets/images/splash_logo.bmp": "32c9e5ea8247a0238b71197087968eda",
"assets/NOTICES": "04fb27da5812402a59b04b8cd86c7fc0",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/README.md": "53c06a4d052e32b30c912c28fb5fad5b",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "21e0d26054c04e4ca285e9c61258aadc",
"/": "21e0d26054c04e4ca285e9c61258aadc",
"main.dart.js": "9600ce2a3dc5e109de2e65ca793e20b1",
"manifest.json": "fbce7805c6f4bd72ed6f01f77511a5cb",
"version.json": "f40b6bce32bbadea9a51e76b40c9fbc4"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
