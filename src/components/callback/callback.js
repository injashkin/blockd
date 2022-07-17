import $ from 'jquery';

export const callback = function () {
  function fadeOutJS(element, duration = 500, callback = () => {}) {
    var opacity = 1;
    var timer = setInterval(function () {
      if (opacity < 0.1) {
        clearInterval(timer);
        callback();
      }
      element.style.opacity = opacity;
      opacity -= 0.1;
    }, duration / 10);
  }

  function fadeInJS(element, duration = 500, callback = () => {}) {
    var opacity = 0;
    var timer = setInterval(function () {
      if (opacity > 1.0) {
        clearInterval(timer);
        callback();
      }
      element.style.opacity = opacity;
      opacity += 0.1;
    }, duration / 10);
  }

  document.addEventListener('DOMContentLoaded', function (event) {
    const wrap = document.querySelector('.window_wrap');

    function handler(e) {
      if (e.target.classList[0] === 'telButton_background') {
        wrap.style.display = 'block';
        wrap.classList.add('hide');
        fadeInJS(wrap, 1000);
      }

      if (e.target.classList[0] === 'window_wrap') {
        wrap.style.display = 'none';
      }

      if (e.target.className === 'window_close') {
        wrap.style.display = 'none';
      }

      if (e.target.id === 'telButton') {
        handlerTelButton(e);
      }
    }

    document.addEventListener('click', handler);

    function handlerTelButton(e) {
      e.preventDefault();

      var tel = document.querySelector('#telForm').value;
      const backPhone = document.querySelector('#backPhone');

      fadeOutJS(backPhone, 500, function () {
        const windowClass = document.querySelector('.window');
        windowClass.insertAdjacentHTML('beforeend', '<p>Отправка!</p>');
        windowClass.classList.add('hide');

        fadeInJS(windowClass, 300, function () {
          let xhr = new XMLHttpRequest();
          let str = `tel=${tel}`;
          let json = JSON.stringify({
            data: str,
          });
          xhr.open('POST', 'srv.php');
          xhr.responseType = 'json';
          xhr.send(json);
          xhr.onload = function () {
            const windowP = document.querySelectorAll('.window p');
            const windowPLast = windowP[windowP.length - 1];
            if (json.error) {
              windowPLast.remove();

              fadeInJS(backPhone, 300, function () {
                alert(json.error);
              });
            } else {
              fadeOutJS(windowPLast, 300, function () {
                windowPLast.textContent = 'Заявка принята!';
                fadeInJS(windowPLast, 300, function () {
                  setTimeout(() => {
                    fadeOutJS(wrap, 300);
                  }, '1500');
                });
              });
            }
          };
        });
      });
    }

    function handlerMouseOver(e) {
      if (e.target.classList[0] === 'telButton_background') {
        var v = document.querySelector('.telButton_hover');

        if (!v.classList.contains('fHovered')) {
          /*
          v.stop()
            .css('display', 'block')
            .animate({ opacity: 1 }, 1000)
            .addClass('fHovered');
          */
          v.style.animation = 'paused';
          v.style.display = 'block';
          v.style.animation = 'opacity 1000';
          v.style.opacity = '1';
          v.classList.add('fHovered');
        }
      }
    }

    function handlerMouseOut(e) {
      if (e.target.classList[0] === 'telButton_background') {
        var v = document.querySelector('.telButton_hover');
        if (v.classList.contains('fHovered')) {
          /*  
          v.stop()
            .animate({ opacity: 0 }, 1000, function () {
              $(this).css('display', 'none');
            })
            .removeClass('fHovered');
          */

          v.style.animation = 'paused';
          v.style.animation = 'opacity 1000';
          v.style.opacity = '0';
          //v.style.display = 'none';
          v.classList.remove('fHovered');
        }
      }
    }

    window.addEventListener('mouseover', handlerMouseOver);
    window.addEventListener('mouseout', handlerMouseOut);

    const telButtonAnim = document.querySelector('.telButton.anim');

    telButtonAnim.style.position = 'absolute';
    telButtonAnim.style.top = '-100px';
    telButtonAnim.style.right = '50px';
    telButtonAnim.style.transition =
      'top 0.9s cubic-bezier(.65, 1.95, .03, .32) 0.5s';

    telButtonReturn();

    function handlerScroll() {
      telButtonReturn();
    }

    function handlerResize() {
      telButtonReturn();
    }

    function telButtonReturn() {
      var wHeight = getWindowHeight();

      var sHeight = window.scrollY;

      var result = wHeight + sHeight - 100;

      telButtonAnim.style.position = 'absolute';
      telButtonAnim.style.top = result + 'px';
      telButtonAnim.style.right = '50px';
    }

    window.addEventListener('scroll', handlerScroll);
    window.addEventListener('resize', handlerResize);

    function getWindowHeight() {
      let windowHeight;

      windowHeight = document.documentElement.clientHeight;

      return windowHeight;
    }
  });
};
