class Translate {
    static original(obj) {
        return obj.sentences[0].orig;
    }

    static traducao(obj) {
        return obj.sentences[0].trans;
    }
}

// https://stackoverflow.com/questions/23179029/chrome-storage-sync-get-not-storing-value-in-local-variable
function getPalavras(callback) {
    chrome.storage.sync.get('historico', function (items) {
        words = Object.values(items["historico"]);
        callback(words);
    });
}