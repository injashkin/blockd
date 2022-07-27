export const callback = function () {
  function fadeOut(element, duration = 500, callback = () => {}) {
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

  function fadeIn(element, duration = 500, callback = () => {}) {
    var opacity = 0;
    var timer = setInterval(function () {
      if (opacity > 0.9) {
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
        fadeIn(wrap, 500);
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

      fadeOut(backPhone, 500, function () {
        backPhone.style.display = 'none';
        const windowClass = document.querySelector('.window');
        windowClass.insertAdjacentHTML('beforeend', '<p>Отправка!</p>');
        windowClass.classList.add('hide');

        fadeIn(windowClass, 300, function () {
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

              fadeIn(backPhone, 300, function () {
                alert(json.error);
              });
            } else {
              fadeOut(windowPLast, 300, function () {
                windowPLast.textContent = 'Заявка принята!';
                fadeIn(windowPLast, 300, function () {
                  setTimeout(() => {
                    fadeOut(wrap, 300);
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
        var v = document.querySelector('.js-telButton_hover');

        if (!v.classList.contains('js-fHovered')) {
          v.style.display = 'block';
          fadeIn(v, 300);
          v.classList.add('js-fHovered');
        }
      }
    }

    function handlerMouseOut(e) {
      if (e.target.classList[0] === 'telButton_background') {
        var v = document.querySelector('.js-telButton_hover');
        if (v.classList.contains('js-fHovered')) {
          fadeOut(v, 300, function () {
            v.style.display = 'none';
          });
          v.classList.remove('js-fHovered');
        }
      }
    }

    window.addEventListener('mouseover', handlerMouseOver);
    window.addEventListener('mouseout', handlerMouseOut);

    const telButtonAnim = document.querySelector('.telButton');
    telButtonAnim.classList.add('js-anim');

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

      telButtonAnim.style.top = result + 'px';
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
