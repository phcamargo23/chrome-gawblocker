// background page
chrome.runtime.onMessage.addListener(function(request) {
    chrome.tts.speak(request.toSay, 
                    {
                        'lang': 'en-US', 
                        rate: 0.7, 
                        // onEvent: function(event) {}
                        onEvent: function(event) {
                            console.log('Event ' + event.type + ' at position ' + event.charIndex);
                            if (event.type == 'error') {
                              console.log('Error: ' + event.errorMessage);
                            }
                          }
                    },    
                    function() {});
                    // {'lang': 'en-US', 'rate': 2.0}
  });