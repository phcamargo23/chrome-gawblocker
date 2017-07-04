$("document").ready(function(){
    chrome.storage.sync.get('historico', function (items) {
        Object.values(items["historico"]).forEach(function (element) {
            console.log(Translate.original(element) + ' - ' + Translate.traducao(element));
            $('#palavras').append(Translate.traducao(element) + '</BR>');
        }, this);
    });

    $('#btnExcecao').click(function() {
        console.log('asdf');
        chrome.tabs.create({ url: '../html/excecao.html'});
    });

});