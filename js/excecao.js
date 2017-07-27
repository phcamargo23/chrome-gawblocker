var app = angular.module("paginaDeExcecao", []);

app.controller("ctrl", function ($scope) {
    function checkSimilarity() {
        var str1 = document.getElementById("lhsInput").value;
        var str2 = document.getElementById("rhsInput").value;
        document.getElementById("output").innerHTML = similarity(str1, str2);
    }

    function similarity(s1, s2) {
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength == 0) {
            return 1.0;
        }
        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    function editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        var costs = new Array();
        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        var newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }

    function getPalavras() {
        // https://stackoverflow.com/questions/24687036/variable-wont-update-using-chrome-storage-api-in-a-chrome-app
        chrome.storage.sync.get('historico', function (result) {
            $scope.$apply(function () {
                $scope.palavras = result.historico;
            });
        });
        // console.log($scope.palavras); // não funciona
    }

    $scope.remove = function (i) {
        chrome.storage.sync.get('historico', function (result) {
            result.historico.splice(i, 1);
            chrome.storage.sync.set(result);
            getPalavras();
        });
    }

    $scope.validate = function (p, e) {
        var p1 = e.target.value;
        var p2 = Translate.getTranslation(p);

        if (p1 == '') return;

        p2 = Translate.variacoes(p2);

        // console.log(p1);
        // console.log(p2);

        if (p2.indexOf(p1) != -1) {
            $scope.acertos++;
            e.target.disabled = true

            // var otherWindows = chrome.extension.getBackgroundPage();
            // console.log(otherWindows.tempo);            
            // otherWindows.tempo += 60;
            // // otherWindows.tempo = 999;
            // otherWindows.atualizarView();
            // console.log(otherWindows.tempo);
            // // chrome.extension.getBackgroundPage(function (bgpage) {
            // //     bgpage.tempo = 999;
            // // })

            // chrome.storage.local.get(function(itens){
            //     itens.tempo = itens.tempo + 60;
            //     chrome.storage.local.set({'tempo':itens.tempo + 60}, function(){
            //         console.log(itens.tempo);
            //     });
            // });

            localStorage.tempo = Number(localStorage.tempo) + 60;
            // console.log(localStorage.tempoRestante);
            //  localStorage.tempo = Numb 60;

        }


        // chrome.storage.local.get(function(itens){
        //     console.log(itens);
        // });

    }

    $scope.acertos = 0;
    getPalavras();

});