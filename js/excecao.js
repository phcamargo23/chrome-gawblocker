$("document").ready(function () {
    //     chrome.storage.sync.get('historico', function (items) {
    //         Object.values(items["historico"]).forEach(function (element) {
    //             console.log(Translate.original(element) + ' - ' + Translate.traducao(element));
    //             $('#palavras').append(Translate.traducao(element) + '</BR>');
    //         }, this);
    //     });

    //     $('#btnExcecao').click(function() {
    //         console.log('asdf');
    //         chrome.tabs.create({ url: '../html/excecao.html'});
    //     });


    function recuperarPalavras(words) {
        words.forEach(function (w) {
            // console.log(Translate.original(w) + ' - ' + Translate.traducao(w));
            $('#palavras').append(
                `<div class="row">
                    <div class="col-xs-6 text-right">${Translate.original(w)}</div>
                    <div class="col-xs-6"><input type="text" class="form-control" required="required" pattern="${Translate.traducao(w)}"></div>
                </div>`
            );
        }, this);

        // $('.container').append(
        //     `<div class="row">
        //         <div class="col-xs-12"><input type="submit" class="form-control" /></div>
        //     </div>`
        // );

    }

    getPalavras(recuperarPalavras);

});