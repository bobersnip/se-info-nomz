(function(window){
    /**
     * Main settings of the extension
     */  
      var settings = {
          //min height of the textarea (when it's empty)
          minHeight : 38,
          //maximum height of the textarea
          maxHeight : 300,
          //default placeholder of the textarea
          placeholder : "~Enter url here~"
      };
      
      /**
       * When the document DOM is ready
       */
      document.addEventListener('DOMContentLoaded', function () {
          var textarea = document.getElementById('textarea'),
          search = document.getElementById('search'),
          overflowEvent = new CustomEvent("isOverflow");
  
          
          /**
           * As soon as saving text is possible we enable the textarea
           */
          textarea.removeAttribute('readonly');
          
          /**
           * Events the search trigger listens to
           */
          search.addEventListener('click', function(){
              textarea.value = '';
              textarea.focus();

              var queryResult = queryAllSides();
              textarea.setAttribute('placeholder', queryResult);              
          });
          
          /**
           * Events the textarea listens to
           */
          textarea.addEventListener('isEmpty', function(e){
              //when the popup is empty we set it to its minimum height
              setHeight(settings.minHeight);
          });
          
          textarea.addEventListener('isOverflow', function(e){
              //when the text overflows the popup, we make the popup expand with its content
              setHeight();
          });
      
          textarea.addEventListener('input', function(e){
              //whenever content is added to the textarea via the user interface
              if(textarea.value.trim() == ''){
                  textarea.dispatchEvent(searchEvent);
              }
              if(textarea.scrollHeight > textarea.offsetHeight){
                  textarea.dispatchEvent(overflowEvent);
              }
              
              //Since window.onblur is not triggered when popup is closed/out-of-focus https://code.google.com/p/chromium/issues/detail?id=225917
              //We save everytime there is an input
              saveTextarea();
          });
          
          /**
           * Query all sides based on url in textarea
           */
          function queryAllSides(){
            return('This is a test return');
          }
          
          /**
           * Adjusts the height of the textarea
           */
          function setHeight(value){
              var val = value || Math.min(textarea.scrollHeight, settings.maxHeight);
              textarea.style.height = val + 'px';
          }
          
          /**
           * What we do at page load
           */
          function init(){
              textarea.setAttribute('placeholder', settings.placeholder);
              fillTextarea();
              textarea.focus();
              setHeight();
          }
          
          /**
           * Start
           */
          init();
  
      });
      /**
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-39772841-1']);
        _gaq.push(['_trackPageview']);
    
        (function() {
            var ga = document.createElement('script');
            ga.type = 'text/javascript';
            ga.async = true;
            ga.src = 'https://ssl.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s);
        })();
       */
      
      
  })(this);