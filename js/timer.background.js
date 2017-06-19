sites = ['facebook.com', 'instagram.com', 'globoesporte.globo.com'];
bloqueado = false;
primeiroAcesso = undefined;

timer = setInterval(function () {
    var regras = new Object;
    var agora = moment().locale('pt-BR');
    regras.finalDeSemana = (agora.day() == 6 || agora.day() == 0)
    regras.expediente = (agora.hours() >= 8 && agora.hours() <= 12) || (agora.hours() >= 14 && agora.hours() <= 18)
    regras.almoco = ((agora.hours() >= 12 && agora.hours() < 14))
    regras.fimDeTarde = ((agora.hours() >= 18 && agora.hours() < 19))
    regras.aNoite = (agora.hours() >= 19 || agora.hours() < 8)

    function reiniciaTempo() {
        if (regras.expediente) tempo = 1;
        if (regras.fimDeTarde) tempo = 5;
        if (regras.almoco) tempo = 5;
        if (regras.aNoite) tempo = 2;
        if (regras.finalDeSemana) tempo = 5;

        tempo *= 60;
    }

    passouIntervalo = agora.diff(moment(primeiroAcesso).locale('pt-BR'), 'hours') > 0;
    // passouIntervalo = agora.diff(moment(primeiroAcesso).locale('pt-BR'), 'seconds') > 10;

    if (primeiroAcesso == undefined) reiniciaTempo();

    estaNaListaNegra = false;
    // console.log('Primeiro acesso foi ' + agora.diff(moment(primeiroAcesso).locale('pt-BR'), 'seconds') + ' seconds.');
    // console.log('Tempo de acesso restante: ' + tempo);

    console.log('Primeiro acesso: ' + (primeiroAcesso == undefined ? '-':primeiroAcesso.fromNow()) + '. ' +
    'Acessado: ' + moment.duration(tempo, "minutes").format("h:mm"));

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
            tempo--;

            if (primeiroAcesso == undefined) primeiroAcesso = agora;

            if (bloqueado) chrome.tabs.update(tab.id, { "url": chrome.extension.getURL("pagina-de-bloqueio.html") }, function () { });
        }

        if (tempo == 0) {
            bloqueado = true;
            // clearInterval(timer);
        }

        if (passouIntervalo) {
            bloqueado = false;
            reiniciaTempo();
            primeiroAcesso = undefined;
        }
    });

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
