 // wait for DOM content to be loaded first and then execute script
          generateUrlAndCookie("cookieName", 1);
          // generate cookie with name and expiry day, change this to your preference
          window.addEventListener("message", receiveMessage, false);
      // Anpassung der Iframe-Höhe
      function createCookie(name, value, days) {
          var expires;
          if (days) {
              var date = new Date();
              date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
              expires = "; expires=" + date.toGMTString();
          }
          else {
              expires = "";
          }
          document.cookie = name + "=" + value + expires + ";path=/;";
      }

      function getCookie(c_name) {
          if (document.cookie.length > 0) {
              c_start = document.cookie.indexOf(c_name + "=");
              if (c_start != -1) {
                  c_start = c_start + c_name.length + 1;
                  c_end = document.cookie.indexOf(";", c_start);
                  if (c_end == -1) {
                      c_end = document.cookie.length;
                  }
                  return unescape(document.cookie.substring(c_start, c_end));
              }
          }
          return "";
      }

      function createUniqueID()
      {
          var text = "";
          var char_list = "abcdefghijklmnoprstuv0123456789";
          for(var i=0; i < 20; i++ )
          {
              text += char_list.charAt(Math.floor(Math.random() * char_list.length));
          }
          return text;
      }

      function generateUrlAndCookie(cookieName, cookieActiveDays)
      {
          var sessionId = createUniqueID();
          var cookieSessionValue = getCookie(cookieName);
          if(cookieSessionValue === ""){
              createCookie(cookieName,sessionId, cookieActiveDays);
              cookieSessionValue = getCookie(cookieName);
          }

          document.getElementById("proIframe").src = 'https://expert.eva-finance.de/b2c.php?sid='+ cookieSessionValue +'&gp=xxxxx';
          // change gp and url accordingly
      }
      function receiveMessage(event)
      {
          document.getElementById('proIframeWrapper').style.paddingBottom=event.data+"px";
          // Atomatisches Scrollen zum Iframe beim Laden der Seite
          window.location.hash = 'proIframe';
          // Verhindern, dass #proIframe an die URL angehängt wird
          history.replaceState(null, null, ' ');
      }
