var sites = ['facebook.com', 'instagram.com', 'globoesporte.globo.com'];
var bloqueado = false;
var primeiroAcesso = undefined;
var regras = new Object;
localStorage.tempo = undefined;

function aplicarRegra() {
    agora = moment().locale('pt-BR');
    regras.finalDeSemana = (agora.day() == 6 || agora.day() == 0)
    regras.expediente = (agora.hours() >= 8 && agora.hours() <= 12) || (agora.hours() >= 14 && agora.hours() <= 18)
    regras.almoco = ((agora.hours() >= 12 && agora.hours() < 14))
    regras.fimDeTarde = ((agora.hours() >= 18 && agora.hours() < 19))
    regras.aNoite = (agora.hours() >= 19 || agora.hours() < 8)
}

function reiniciarTempo() {
    if (regras.expediente) localStorage.tempo = 1;
    if (regras.fimDeTarde) localStorage.tempo = 5;
    if (regras.almoco) localStorage.tempo = 5;
    if (regras.aNoite) localStorage.tempo = 2;
    if (regras.finalDeSemana) localStorage.tempo = 5;

    localStorage.tempo *= 60;
}

aplicarRegra();

if (primeiroAcesso == undefined) {
    reiniciarTempo();
    console.log('passou intervalo troxao')
}

timer = setInterval(function () {
    agora = moment().locale('pt-BR');

    passouIntervalo = agora.diff(moment(primeiroAcesso).locale('pt-BR'), 'hours') > 0;
    // passouIntervalo = agora.diff(moment(primeiroAcesso).locale('pt-BR'), 'seconds') > 10;

    estaNaListaNegra = false;
    // console.log('Primeiro acesso foi ' + agora.diff(moment(primeiroAcesso).locale('pt-BR'), 'seconds') + ' seconds.');
    // console.log('Tempo de acesso restante: ' + localStorage.tempo);

    console.log('Primeiro acesso: ' + (primeiroAcesso == undefined ? '-' : primeiroAcesso.fromNow()) + '. ' +
        'Restante: ' + moment.duration(localStorage.tempo, "minutes").format("h:mm"));

    chrome.tabs.getSelected(null, function (tab) {
        for (i = 0; i < sites.length; i++) {
            element = sites[i];
            // console.log(tab.url);
            // console.log(element)
            if (tab.url.indexOf(element) != -1) {
                estaNaListaNegra = true;
                break;
            }
        }

        if (estaNaListaNegra) {
            localStorage.tempo--;

            if (primeiroAcesso == undefined) primeiroAcesso = agora;

            if (bloqueado) chrome.tabs.update(tab.id, { "url": chrome.extension.getURL("pagina-de-bloqueio.html") }, function () { });
        }

        if (localStorage.tempo == 0) {
            bloqueado = true;
            // clearInterval(timer);
        }

        if (passouIntervalo) {
            bloqueado = false;
            reiniciarTempo();
            primeiroAcesso = undefined;
        }
    });

    var popup = chrome.extension.getViews({ type: "popup" });
    // console.log(popup);

    if (popup[0] != undefined) localStorage.tempo < 1 ? 'Tempo esgotado' : popup[0].$('#timer').html(localStorage.tempo);

    // chrome.storage.local.set({'localStorage.tempo':localStorage.tempo});
    localStorage.tempoRestante = localStorage.tempo;
    console.log(localStorage.tempo);

}, 1000);

// chrome.tabs.onUpdated.addListener(function(tabId, changedInfo, tab) {
//     if(bloqueado)
//         chrome.tabs.update(tabId, {"url" : chrome.extension.getURL("instead.html")}, function () {});
// });
// chrome.tabs.onCreated.addListener(function(tab) {
//     if(bloqueado)
//         chrome.tabs.update(tabId, {"url" : chrome.extension.getURL("instead.html")}, function () {});
// });

// chrome.windows.create({
//     tabId:     tab.id,
//     type:      "popup",
//     incognito: tab.incognito
// });
