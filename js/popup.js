$("document").ready(function(){
    chrome.storage.sync.get('historico', function (items) {
            console.log(items.historico);
            $('#palavras').append(items.historico + '</BR>');
    });

    $('#btnExcecao').click(function() {
        chrome.tabs.create({ url: '../html/excecao.html'});
    });

    $('#btnClear').click(function(){
        chrome.storage.sync.clear();
    });

});