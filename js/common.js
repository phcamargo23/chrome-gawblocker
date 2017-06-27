class Translate {
    static original(obj) {
        return obj.sentences[0].orig;
    }

    static traducao(obj) {
        return obj.sentences[0].trans;
    }
}

function getPalavras(ctl) {
    chrome.storage.sync.get('historico', function (items) {
        return Object.values(items["historico"]);
    });
}