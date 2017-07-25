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

    $scope.palavras = [];
    var teste = 'sfdf';

    // https://stackoverflow.com/questions/23179029/chrome-storage-sync-get-not-storing-value-in-local-variable
    function getPalavras(callback) {
        chrome.storage.sync.get('historico', function (items) {
            // words = Object.values(items.historico);
            // console.log(items.historico);
            callback(items.historico);
        });
    }

    function recuperarPalavras(words) {
        // console.log(words);
        $scope.palavras = words;
        teste = words;
        $scope.t = 'asdadf';
    }

    getPalavras(recuperarPalavras);    
    console.log($scope.palavras);
    console.log(teste);
});