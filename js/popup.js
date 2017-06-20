$(document).ready(function () {
    // $.each(chrome.extension.getBackgroundPage().GB.getBlockedSites(), function (index, value) {
    //     $("#blockedlist").append("<div class='siterow' title='"+value+"'><div class='sitename'>"+index+"</div><span class='sitedesc'> : "+value+"</span></div>");
    // });

    // Read it using the storage API

    function dump(obj) {
        var out = '';
        for (var i in obj) {
            out += i + ": " + obj[i] + "\n";
        }

        // alert(out);

        // or, if you wanted to avoid alerts...

        var pre = document.createElement('pre');
        pre.innerHTML = out;
        $("#words").appendChild(pre)
    }


    chrome.storage.sync.get('historico', function (items) {
        dump(items['historico']);
    });

});