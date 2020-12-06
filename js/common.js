function objIsEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

class Translate {

    static getTranslation(t) {
        // const TRANSLATE_URI = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&hl=pt-BR&dt=t&dt=bd&dj=1&source=bubble&q=';
        // var xhttp = new XMLHttpRequest();
        // xhttp.open("GET", TRANSLATE_URI + t, false);
        // xhttp.setRequestHeader("Content-type", "application/json");
        // xhttp.send();
        // var response = JSON.parse(xhttp.responseText);

        // TODO: a API utilizada não funciona mais
        var response = {sentences: [{trans:"teste"}]} //mock da antiga API

        return response;
    }

    static idiomaDeOrigem(obj) {
        return obj.src;
    }

    static entrada(obj) {
        return obj.sentences[0].orig;
    }

    static traducao(obj) {
        return obj.sentences[0].trans;
    }

    static haTraducaoCompleta(obj){
        return obj.dict != undefined;
    }

    static traducaoCompleta(obj) {
        var t = new Object();
        t.principal = this.traducao(obj);
        t.secundarias = [];

        try {
            obj.dict.forEach(function (element) {
                t.secundarias.push(
                    {
                        'classe': element.pos,
                        'termos': element.terms
                    }
                )
            }, this);

        } catch (error) {
            delete v.secundarias;
        }

        return t;
    }

}