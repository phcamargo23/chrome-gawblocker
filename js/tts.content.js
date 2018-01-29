var listenIcon = document.createElement('img');
listenIcon.src = 'http://www.pvhc.net/img183/qnouphcgtzoacecnvznl.png';
listenIcon.height = 10;
listenIcon.style = 'position: absolute;';
// listenIcon.addEventListener('click', (e) => console.log(e.target.parentNode.textContent));
listenIcon.addEventListener('click', (e) => chrome.runtime.sendMessage({toSay: e.target.parentNode.textContent}, function() {}));

// var s;

document.body.addEventListener('mouseover', function(e){
    if(e.target.isSameNode(listenIcon)) return;
    e.target.append(listenIcon);
    // listenIcon.addEventListener('click', (f) => console.log(f.target));
    
    // s = e;
});

// console.log(s);

// content script
// chrome.runtime.sendMessage({toSay: "hello Vikram"}, function() {});
