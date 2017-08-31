const balaoId = '_balaoDeTraducao'
var ctrlIsPressed = false;

function tipoDeTraducao_1() {
    //Palavra: dblcilck, Frase: pressionar CTRL
    
    $(document).bind('dblclick', function (e) {
        evitarDuplicacaoDeBalao();

        var selObj = getSelectedText();
        var entrada = selObj.toString().trim().trim();
        var traducao = Translate.getTranslation(entrada);

        if (!ehTraducaoValida(entrada, traducao, e.target)) return;

        var balloon = createBalloon(selObj);
        balloon.setText(Translate.traducao(traducao));

        adicionarAoHistorico(entrada, traducao);

        if (existeBalao()) return;

        setTimeout(function () {
            balloon.close();
        }, 1000);

    });

    $(document).bind('click', function (e) {
        if (e.target.id != balaoId && ctrlIsPressed) {
            evitarDuplicacaoDeBalao();

            var selObj = getSelectedText();
            var entrada = selObj.toString().trim().trim();
            var traducao = Translate.getTranslation(entrada);

            if (!ehTraducaoValida(entrada, traducao, e.target)) return;

            var balloon = createBalloon(selObj);
            balloon.setText(Translate.traducao(traducao));

            adicionarAoHistorico(entrada, traducao);
        }
    });

    $(document).bind('keydown', function (e) {
        ctrlIsPressed = e.ctrlKey;
    });

    $(document).bind('keyup', function () {
        ctrlIsPressed = false;
    });

}

//Não utilizado
function getIndiceDasPontuacoes(str) {
    var regexp = /[.!?]/g;
    var match, matches = [];

    while ((match = regexp.exec(str)) != null) {
        matches.push(match.index);
    }

    return matches;
}


function getSelectedText() {
    var txt = '';
    if (window.getSelection) {
        txt = window.getSelection();
    } else if (document.getSelection) {
        txt = document.getSelection();
    } else if (document.selection) {
        txt = document.selection.createRange().text;
    }

    // console.log(txt.toString());
    return txt;
}

function createBalloon(selection) {
    var rect = selection.getRangeAt(0).getBoundingClientRect();
    var span = document.createElement("span");
    var tail = document.createElement("span");
    var loading = document.createElement("img");
    var content = document.createElement("span");

    //Estilo do balão
    {
        /* Balloon Span */
        span.style.backgroundAttachment = "scroll";
        span.style.backgroundClip = "border-box";
        span.style.backgroundImage = "none";
        span.style.backgroundOrigin = "padding-box";
        span.style.boxShadow = "7px 7px 7px rgba(0, 0, 0, 0.3)";
        span.style.border = "2px solid #bd1e2c";
        span.style.borderTopColor = "rgb(1, 153, 241)";
        span.style.borderBottomColor = "rgb(120, 191, 35)";
        span.style.borderRightColor = "rgb(235, 147, 22)";
        span.style.borderLeftColor = "rgb(229, 35, 80)";
        span.style.borderRadius = "0px";
        span.style.cursor = "auto";
        span.style.display = "block";
        span.style.margin = "0px";
        span.style.padding = "10px";
        span.style.zIndex = "100000";
        span.style.background = "white";
        span.style.position = "absolute";
        span.style.height = "auto";
        span.style.width = "175px";
        span.style.right = "3px";
        span.style.whiteSpace = "pre-wrap";
        span.style.textAlign = "left";
        span.style.color = "black";
        span.style.font = "italic normal 12px Verdana, sans-serif;";
        span.style.left = (rect.left - 15) + "px";
        span.style.top = (rect.top + rect.height + window.pageYOffset + 11) + "px";

        /* Loading Image */
        // loading.src = chrome.extension.getURL("preloader.gif");
        loading.style.backgroundAttachment = "scroll";
        loading.style.backgroundClip = "border-box";
        loading.style.backgroundColor = "transparent";
        loading.style.backgroundImage = "none";
        loading.style.backgroundOrigin = "padding-box";
        loading.style.bordeStyle = "none";
        loading.style.border = "none";
        loading.style.color = "white";
        loading.style.cursor = "auto";
        loading.style.display = "block";
        loading.style.left = "auto";
        loading.style.lineHeight = "normal";
        loading.style.margin = "0px auto";
        loading.style.padding = "0px";
        loading.style.width = "12px";
        loading.style.height = "12px";
        loading.style.position = "static";
        loading.style.zIndex = "auto";

        /* Tail Image */
        tail.style.backgroundAttachment = "scroll";
        tail.style.backgroundClip = "border-box";
        tail.style.backgroundColor = "transparent";
        tail.style.backgroundImage = "none";
        tail.style.backgroundOrigin = "padding-box";
        tail.style.border = "none";
        tail.style.width = "0px";
        tail.style.height = "0px";
        tail.style.borderBottom = "10px solid rgb(1, 153, 241)";
        tail.style.borderLeft = "10px solid transparent";
        tail.style.borderRight = "10px solid transparent";
        tail.style.color = "white";
        tail.style.cursor = "auto";
        tail.style.display = "block";
        tail.style.fontFamily = "sans-serif";
        tail.style.fontSize = "12px";
        tail.style.fontStyle = "normal";
        tail.style.fontVariant = "normal";
        tail.style.fontWeight = "normal";
        tail.style.left = "-22px";
        tail.style.lineHeight = "normal";
        tail.style.margin = "0px";
        tail.style.outlineColor = "white";
        tail.style.outlineStyle = "none";
        tail.style.outlineWidth = "0px";
        tail.style.padding = "0";
        tail.style.position = "absolute";
        tail.style.right = "auto";
        tail.style.textAlign = "left";
        tail.style.left = "15px";
        tail.style.top = "-12px";
        tail.style.verticalAlign = "baseline";
        tail.style.zIndex = "auto";

        span.appendChild(content);
        span.appendChild(loading);
        span.appendChild(tail);
        document.body.appendChild(span);

    }

    var balloon = {
        setText: function (text) {
            span.removeChild(loading);
            content.innerHTML = text;
        },
        close: function () {
            span.parentNode.removeChild(span);
        }
    };

    span.id = balaoId;

    span.addEventListener("click", function () {
        balloon.close();
    }, false);


    return balloon;
}

function ehTraducaoValida(entrada, traducao, element) {
    if (element.tagName == 'INPUT') {
        // console.log('Elemento input');
        return false;
    }

    if (Translate.idiomaDeOrigem(traducao) != 'en') {
        // console.log('Entrada não aceita: ' + JSON.stringify(traducao));
        return false;
    }

    return true;
}

function existeBalao() {
    return $('#' + balaoId) != null;
}

function evitarDuplicacaoDeBalao() {
    if (existeBalao) {
        $('#' + balaoId).click();
    }
}

function adicionarAoHistorico(entrada, traducao) {
    if (entrada.toLowerCase() == Translate.traducao(traducao).toLowerCase()) {
        // console.log('Tradução invariante: ' + entrada);
        return;
    }

    chrome.storage.sync.get(function (items) {
        if (objIsEmpty(items)) {
            chrome.storage.sync.set({ 'historico': [Translate.original(traducao)] }, function () {
                // console.log('Storage inicializado');
            });
        } else {
            items.historico.push(Translate.original(traducao));
            chrome.storage.sync.set(items, function (items2) {
                // console.log('Novo registro armazenado')
            });
        }
    });
}

$(document).bind('click', function (e) {
    // console.log(e.target.textContent.toString());

    // if(e.target.firstElementChild != null){
    //     console.log('Elemento não aceito!');
    //     return;
    // }

    // var text = e.target.textContent.toString();
    // var match = /\r|\n/.exec(text);
    // if (match) {
    //     console.log('Elemento não aceito!');
    //     return;
    // }

    if (e.target.id != balaoId) {
        evitarDuplicacaoDeBalao();

        var selObj = getSelectedText();
        var apenasClicou = selObj.anchorOffset == selObj.focusOffset;

        //Se apenas clicou numa palavra e não selecionou um texto
        if (apenasClicou) {
            var text = e.target.textContent.toString();
            var match = /\r|\n/.exec(text);
            if (match) {
                console.log('Elemento não aceito!');
                return;
            }

            selObj.modify("move", "backward", "word");
            var startOffset = selObj.anchorOffset;
            selObj.modify("move", "forward", "word");
            var endOffset = selObj.anchorOffset;
            var entrada = selObj.anchorNode.substringData(startOffset, endOffset - startOffset).trim().trim();
        } else {
            var startOffset = selObj.anchorOffset;
            var endOffset = selObj.anchorOffset;
            var entrada = selObj.toString().trim().trim();
        }

        var traducao = Translate.getTranslation(entrada);

        if (!ehTraducaoValida(entrada, traducao, e.target)) return;

        var balloon = createBalloon(selObj);
        // balloon.setText(Translate.traducao(traducao));
        // console.log(Translate.variacoesEmGrupos(traducao));
        balloon.setText(Translate.variacoesEmGrupos(traducao));

        // if (apenasClicou)
        //     var time = 1000;
        // else
        //     var time = 100 * Translate.traducao(traducao).length;

        // setTimeout(function () {
        //     balloon.close();
        // }, time);

    }
});