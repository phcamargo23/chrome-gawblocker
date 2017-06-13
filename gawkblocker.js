var regras = new Object;
let agora = moment().locale('pt-BR');
regras.finalDeSemana = (agora.day() == 6 || agora.day() == 0)
regras.expediente = (agora.hours() >= 8 && agora.hours() <= 12) || (agora.hours() >= 14 && agora.hours() <= 18)
regras.almoco = ((agora.hours() >= 12 && agora.hours() < 14))
regras.fimDeTarde = ((agora.hours() >= 18 && agora.hours() < 19))
regras.aNoite = (agora.hours() >= 19 || agora.hours() < 8)

function reiniciaTempo(){
    if(regras.expediente) tempo = 3;
    if(regras.fimDeTarde) tempo = 5;
}

reiniciaTempo;

sites = ['facebook.com', 'instagram.com', 'globoesporte.globo.com'];
bloqueado = false;

timer = setInterval(function(){
    estaNaListaNegra = false;
    console.log(tempo);

    chrome.tabs.getSelected(null,function(tab) {
        for (i = 0; i < sites.length; i++) {
            element = sites[i];
            // console.log(tab.url);
            // console.log(element)
            if(tab.url.indexOf(element) != -1){
                estaNaListaNegra = true;
                break;
            }
        }

    if(estaNaListaNegra){
        tempo--;

        if(localStorage.primeiroAcesso == undefined)
            localStorage.primeiroAcesso = agora

        if(bloqueado)
            chrome.tabs.update(tab.id, {"url" : chrome.extension.getURL("instead.html")}, function () {});
    }

    if(tempo == 0){
        bloqueado = true;
        // clearInterval(timer);
    }

    if(localStorage.primeiroAcesso.diff(agora, 'hours') > 0){
        bloqueado = false;
        reiniciaTempo();
        localStorage.primeiroAcesso = undefined;
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