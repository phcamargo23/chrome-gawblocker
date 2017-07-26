function objIsEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

class Translate {

    static getTranslation(t) {
        const TRANSLATE_URI = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&hl=pt-BR&dt=t&dt=bd&dj=1&source=bubble&q=';
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", TRANSLATE_URI + t, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        var response = JSON.parse(xhttp.responseText);

        return response;
    }


    static original(obj) {
        return obj.sentences[0].orig;
    }

    static traducao(obj) {
        return obj.sentences[0].trans;
    }

    static variacoesEmGrupos(obj) {
        var v = []

        obj.dict.forEach(function (element) {
            v.push(
                {
                    'classe': element.pos,
                    'termos': element.terms
                }
            )
        }, this);

        return v;
    }

    static variacoes(obj) {
        if (obj.dict == undefined)
            return Translate.traducao(obj).toLowerCase()

        var v = []

        obj.dict.forEach(function (e1) {
            e1.terms.forEach(function (e2) {
                v.push(e2);
            });
        }, this);

        return v;
    }


    static idiomaDeOrigem(obj) {
        return obj.src;
    }

}