(function(){"use strict"
var e=[],n=[]
"serviceWorker"in navigator&&navigator.serviceWorker.register("/guitar-companion/sw.js",{scope:"/guitar-companion/"}).then(function(n){for(var r=Promise.resolve(),o=0;o<e.length;o++)(function(o){r=r.then(function(){return e[o](n)})})(o)
return r.then(function(){console.log("Service Worker registration succeeded. Scope is "+n.scope)})}).catch(function(e){for(var r=Promise.resolve(),o=0;o<n.length;o++)(function(o){r=r.then(function(){return n[o](e)})})(o)
return r.then(function(){console.log("Service Worker registration failed with "+e)})})})()
