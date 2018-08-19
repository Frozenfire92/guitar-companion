(function(){"use strict"
function e(e,t){return!!t.find(function(t){return t.test(decodeURI(e))})}self.CACHE_BUSTER="1534699787970|0.5516037843162174",self.addEventListener("install",function(e){return self.skipWaiting()}),self.addEventListener("activate",function(e){return self.clients.claim()})
var t=["assets/guitar-companion-e93f37f494a27574da23d09e156a6c98.css","assets/guitar-companion-0872d283c976b74d61262dc4ba42f735.js","assets/vendor-571d67531622102402268bd2c623c17f.css","assets/vendor-1c4b39e3a5320670ccf0c5ac5bdc8af6.js"],n=function(e,t){return caches.keys().then(function(n){n.forEach(function(n){var s=0===n.indexOf(e),i=n!==t
s&&i&&caches.delete(n)})})},s="esw-asset-cache-1",i=t.map(function(e){return new URL(e,self.location).toString()}),c=function(){caches.open(s).then(function(e){return e.keys().then(function(t){t.forEach(function(t){-1===i.indexOf(t.url)&&e.delete(t)})})})}
self.addEventListener("install",function(e){e.waitUntil(caches.open(s).then(function(e){return Promise.all(i.map(function(t){var n=new Request(t,{mode:"cors"})
return fetch(n).then(function(n){if(n.status>=400){var s=new Error("Request for "+t+" failed with status "+n.statusText)
throw s}return e.put(t,n)}).catch(function(e){console.error("Not caching "+t+" due to "+e)})}))}))}),self.addEventListener("activate",function(e){e.waitUntil(Promise.all([n("esw-asset-cache",s),c()]))}),self.addEventListener("fetch",function(e){var t="GET"===e.request.method,n=-1!==i.indexOf(e.request.url)
t&&n&&e.respondWith(caches.match(e.request,{cacheName:s}).then(function(t){return t||fetch(e.request.url,{mode:"cors"})}))})
var r=[],a=[]
self.INDEX_FILE_HASH="9a695448bf88a45a4b10b3d3724c61b5"
var o=new URL("index.html",self.location).toString()
self.addEventListener("install",function(e){e.waitUntil(fetch(o,{credentials:"include"}).then(function(e){return caches.open("esw-index-1").then(function(t){return t.put(o,e)})}))}),self.addEventListener("activate",function(e){e.waitUntil(n("esw-index","esw-index-1"))}),self.addEventListener("fetch",function(t){var n=t.request,s=new URL(n.url),i="GET"===n.method,c=-1!==n.headers.get("accept").indexOf("text/html"),u=s.origin===location.origin,f=e(n.url,r),l=!a.length||e(n.url,a)
!("/tests"===s.pathname&&!1)&&i&&c&&u&&l&&!f&&t.respondWith(caches.match(o,{cacheName:"esw-index-1"}).then(function(e){return e||fetch(o,{credentials:"include"}).then(function(e){return caches.open("esw-index-1").then(function(t){return t.put(o,e)}),e.clone()})}))})})()
