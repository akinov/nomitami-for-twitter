
(function() {
  'use strict';

  var targetNode = document.querySelector('#stream-items-id');

  var nomitamiTexts = [
    '酒',
    '🍶',
    '飲み',
    'のみたい',
    'のみたみ',
    'ビール',
    '🍺',
    '🍻',
    '\u1F37A',
    '\u1F37B'
  ];

  var callback = function (mutationsList) {
    for (var mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (var node of mutation.addedNodes) {
          var $node = $(node);
          var text = $('.js-tweet-text', $node).text();
          var nomitami = false;
          for (var nomitamiText of nomitamiTexts) {
            if (text.match(nomitamiText)) {
              nomitami = true;
              break;
            }
          }

          if (nomitami) {
            $node.addClass('nomitami');
          }
        }
      }
    }
  };

  var config = { childList: true };

  var observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);


  // styleを直書き
  $(function(){
    var document = window.document;
    var css = document.createElement('style');
    var cssRule = `
            #stream-items-id .nomitami{overflow: hidden;}
            #stream-items-id .nomitami .tweet{z-index: 1}
            #stream-items-id .nomitami::before, #stream-items-id .nomitami::after{
content: '🍻';
  line-height: 1;
  position: absolute;
  top: 0;
  font-size: 130px;
  animation: rotation 2s ease 0s infinite;
}
#stream-items-id .nomitami::before{left: 0;}
#stream-items-id .nomitami::after{right:0;}

@keyframes rotation {
  0% {
    top: 0;
  }

  50% {
    top: 100%;
  transform: translateY(-100%);
  }

  100% {
    top: 0;
  }
}
        `;
    var rule = document.createTextNode(cssRule);
    css.media = 'screen';
    css.type = 'text/css';
    css.appendChild(rule);
    document.getElementsByTagName('head')[0].appendChild(css);
  });
})();
