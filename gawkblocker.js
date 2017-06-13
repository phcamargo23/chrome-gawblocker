// var SM = (function () {

//     var my = {};

//     my.get = function (key) {
//         return localStorage.getItem(key);
//     }
//     my.put = function (key, value) {
//         return localStorage.setItem(key, value);
//     }
//     my.delete = function (key) {
//         return localStorage.removeItem(key);
//     }
    
//     return my;

// }());

// var GB = (function (SM) {
//     var my = {};

//     my.blockTheseSites = {
//         "gawker.com"        : "Gawker Media",
//         "io9.com"           : "SciFi Blog",
//         "gizmodo.com"       : "Gadget Blog",
//         "kotaku.com"        : "Video Game Blog",
//         "jalopnik.com"      : "Car Blog",
//         "lifehacker.com"    : "Productivity Blog",
//         "deadspin.com"      : "Sports Blog",
//         "jezebel.com"       : "Celebrity Blog",
//         "fleshbot.com"      : "Porn Blog",
//         "gawker.tv"         : "Gawker.TV",
//         "cityfile.com"      : "Notable People Blog"
//     }
    
//     if (!SM.get("blocklist")) {
//         SM.put("blocklist", JSON.stringify(my.blockTheseSites));
//     }
    
//     my.getBlockedSites = function () {
//         return JSON.parse(SM.get("blocklist"));
//     }
    
//     my.setWatchThisInstead = function (value) {
//         var prot = /^http|chrome-extension/i;
//         if (value.match(prot)) {
//             SM.put("instead", value);
//         } else {
//             SM.put("instead", "http://" + value);
//         }
//         return SM.get("instead");
//     }

//     my.getWatchThisInstead = function () {
//         return SM.get("instead");        
//     }
    
//     my.addBlockedSite = function (site) {
//         my.blockedSites = JSON.parse(SM.get("blocklist"));
//         my.blockedSites[site] = "Custom Add";
//         SM.put("blocklist", JSON.stringify(my.blockedSites));
//     }

//     my.removeBlockedSite = function (site) {
//         my.blockedSites = JSON.parse(SM.get("blocklist"));
//         delete my.blockedSites[site];
//         SM.put("blocklist", JSON.stringify(my.blockedSites));
//     }
    
//     return my;
// }(SM));


//Background.html
// if (!GB.getWatchThisInstead()) {
//     GB.setWatchThisInstead(chrome.extension.getURL("instead.html"));
// }
// chrome.tabs.onUpdated.addListener(function(tabId, changedInfo, tab) {
//     console.log(GB);
//     for (site in GB.getBlockedSites()) {
//         if (tab.url.match(site)) {
//             chrome.tabs.update(tabId, {"url" : GB.getWatchThisInstead()}, function () {});
//         }
//     }
// });
// chrome.tabs.onCreated.addListener(function(tab) {
//     console.log('GB');
//     for (site in GB.getBlockedSites()) {
//         if (tab.url.match(site)) {
//             chrome.tabs.update(tab.id, {"url" : GB.getWatchThisInstead()}, function () {});
//         }
//     }
// });


// Storage.prototype.setObject = function(key, value) {
//     this.setItenow(key, JSON.stringify(value));
// }

// Storage.prototype.getObject = function(key) {
//     var value = this.getItenow(key);
//     return value && JSON.parse(value);
// }

// function aplicarFiltro(){
//     var now = moment().locale('pt-BR');
//     var regras = new Object

//     regras.finalDeSemana = (now.day() == 6 || now.day() == 0)
//     regras.maisRestrito = ((now.hour() >= 8 && now.hour() <= 12) || (now.hour() >= 14 && now.hour() <= 18) || (now.hour() >= 19 || now.hour() < 8))
//     regras.almoco = ((now.hour() >= 12 && now.hour() < 14))
//     regras.fimDeTarde = ((now.hour() >= 18 && now.hour() < 19))


//     // Final de senowana
//     if(regras.finalDeSemana){
//         console.log('fds')
//     }else{
//         if(regras.maisRestrito){
//             console.log('restrito');

//             if(localStorage.maisRestrito == undefined){
//                 localStorage.maisRestrito = now;
//                 localStorage.tempoRestante = 60000;
//             }else{
//                 ultimoAcesso = moment(localStorage.maisRestrito).locale('pt-BR');
                
//                 if(ultimoAcesso.diff(now, 'hours') > 0){
//                     console.log('não autorizado');
//                     return false;
//                 }
//             }

//             chrome.alarms.create("myAlarm", {when: now + localStorage.tempoRestante} );
//             // chrome.alarms.create("myAlarm", {delayInMinutes: 0.1, periodInMinutes: 0.2} );

//         }else{
//             if(now.diff(localStorage.menosRestrito, 'hours') > 0){
//                 console.log('autorizado');
//             }else
//                 console.log('não autorizado');
//         }
//     }
// }

// // chrome.tabs.onUpdated.addListener(function(tabId, changedInfo, tab) {
// //     // alert('mudou de aba')
// //     console.log('mudou de aba')
// // });
// // chrome.tabs.onCreated.addListener(function(tab) {
// //     console.log('abriu aba')
// // });

// chrome.tabs.onActivated.addListener(function(tab){
//     console.log('get current')
//     aplicarFiltro();
// });

// chrome.alarms.onAlarm.addListener(function(alarm) {
//   alert("karaiii");
// });

// chrome.tabs.onUpdated.addListener(function(tabId, changedInfo, tab) {
//     // alert('mudou de aba')
//     console.log('mudou de aba')
// });
// chrome.tabs.onCreated.addListener(function(tab) {
//     console.log('abriu aba')
// });




// chrome.tabs.onActivated.addListener(function(tab){
//     console.log(tab)
// });

// var now = moment().locale('pt-BR');
// var totalTime = 5000;

// chrome.tabs.onUpdated.addListener(function(tabId, changedInfo, tab) {
//     // console.log(tab);
//     // if(tab.url.match('facebook.com')) {
//     //     if(chrome.alarms.get("myAlarm", (alarm) => alarm) == undefined)
//     //         chrome.alarms.create("myAlarm", {when: now + countdown} );
//     //     else
//     //         chrome.alarms.get("myAlarm", {when: now + countdown} );
//     // }

//     // console.log(chrome.alarms.get("myAlarm", (alarm) => {
//     //     alarm
//     // }));

//     chrome.alarms.get("myAlarm", (alarm) => {
//         if(alarm == undefined)
//             chrome.alarms.create("myAlarm", {when: now + totalTime } );
        
//         // setTimeout(function() {
//         //     totalTime--;
//         //     console.log(totalTime);
//         // }, 10000);

//         console.log(alarm);

//     });
    

// });
// chrome.tabs.onCreated.addListener(function(tab) {
//     // console.log(tab);
//     if(tab.url.match('facebook.com')) {
//         chrome.alarms.create("myAlarm", {when: now + countdown} );
//     }
// });

// chrome.alarms.onAlarm.addListener(function(alarm) {
//   alert("karaiii");
// });







var teste = moment().locale('pt-BR').set('hour', 10);
var now = moment().locale('pt-BR');
var totalTime = 5000;

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        console.log(minutes + ":" + seconds);

        if (--timer < 0) {
            clearInterval(interval);
        }
    }, 1000);
}

    var fiveMinutes = 10 //* 5
        // display = $('#time');
    startTimer(fiveMinutes, undefined);