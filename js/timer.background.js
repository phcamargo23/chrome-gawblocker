var sites = ['facebook.com', 'instagram.com', 'globoesporte.globo.com'];
localStorage.bloqueado = 0;
var regras = new Object;
primeiroAcesso = undefined;
localStorage.tempo = undefined; //TODO: local storage

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
    localStorage.bloqueado = 0;
}

aplicarRegra();

if (primeiroAcesso == undefined) {
    reiniciarTempo();
}

timer = setInterval(function () {
    agora = moment().locale('pt-BR');
    estaNaListaNegra = false;
    // console.log('Primeiro acesso foi ' + agora.diff(moment(primeiroAcesso).locale('pt-BR'), 'seconds') + ' seconds.');
    // console.log('Tempo de acesso restante: ' + localStorage.tempo);

    // console.log('Primeiro acesso: ' + (primeiroAcesso == undefined ? '-' : primeiroAcesso.fromNow()) + '. ' +
    //     'Restante: ' + moment.duration(localStorage.tempo, "minutes").format("h:mm"));

    chrome.tabs.getSelected(null, function (tab) {
        for (listenIcon = 0; listenIcon < sites.length; listenIcon++) {
            element = sites[listenIcon];
            // console.log(tab.url);
            // console.log(element)
            if (tab.url.indexOf(element) != -1) {
                estaNaListaNegra = true;
                break;
            }
        }

        if (estaNaListaNegra) {

            if (localStorage.bloqueado == 1) {
                chrome.tabs.update(tab.id, { "url": chrome.extension.getURL("html/excecao.html") }, function () { });
            } else {
                localStorage.tempo--;


                chrome.browserAction.setBadgeText({text:localStorage.tempo});
                if (localStorage.tempo <= 10 || localStorage.tempo % 60 == 0) {
                    chrome.notifications.create(
                        'contagem-regressiva', {
                            type: 'basic',
                            iconUrl: '../images/GB-48.png',
                            title: "Contagem regressiva",
                            message: localStorage.tempo
                        },
                        function (notificationId) { }
                    );
                }
            }

            if (primeiroAcesso == undefined) primeiroAcesso = agora;

        }
    });

    //https://stackoverflow.com/questions/28926997/how-to-have-localstorage-value-of-true
    localStorage.bloqueado = localStorage.tempo == 0 ? 1 : 0;

    //Passou o período "de castigo?"
    passouIntervaloBloqueado = agora.diff(moment(primeiroAcesso).locale('pt-BR'), 'hours') > 0;

    if (passouIntervaloBloqueado) {
        reiniciarTempo();
        primeiroAcesso = undefined;
    }

    var popup = chrome.extension.getViews({ type: "popup" });
    // console.log(popup);

    if (popup[0] != undefined) localStorage.tempo < 1 ? 'Tempo esgotado' : popup[0].$('#timer').html(localStorage.tempo);

}, 1000);
