$("document").ready(function(){
    // $.each(chrome.extension.getBackgroundPage().GB.getBlockedSites(), function (index, value) {
    //     $("#blockedlist").append("<div class='siterow' title='"+value+"'><div class='sitename'>"+index+"</div><span class='sitedesc'> : "+value+"</span></div>");
    // });

    $(".button-collapse").sideNav();

    chrome.storage.sync.get('historico', function (items) {
        Object.values(items["historico"]).forEach(function (element) {
            console.log(Translate.original(element) + ' - ' + Translate.traducao(element));
            $('#words').append(Translate.traducao(element) + '</BR>');
        }, this);
    });

});