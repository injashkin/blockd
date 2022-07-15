import $ from 'jquery';

export const callback = function () {
  // document.addEventListener('DOMContentLoaded', function (event) {});

  $(document).ready(function () {
    const wrap = document.querySelector('.window_wrap');

    function handler(e) {
      if (e.target.classList[0] === 'window_wrap') {
        wrap.style.display = 'none';
      }

      if (e.target.className === 'window_close') {
        wrap.style.display = 'none';
      }

      if (e.target.classList[0] === 'telButton_background') {
        // не работает плавный переход
        wrap.style.display = 'block';
        wrap.classList.remove('hide');
        wrap.classList.add('show');

        /*
        $('.telButton').click(function () {
          p.css({ display: 'block' }).hide().fadeIn(1000);
        });  
        */
      }

      if (e.target.id === 'telButton') {
        handlerTelButton(e);
      }
    }

    document.addEventListener('click', handler);

    function handlerTelButton(e) {
      e.preventDefault();

      var tel = $('#telForm').val();

      $('#backPhone').fadeOut(500, function () {
        $('<p>Отправка!</p>')
          .appendTo($('.window'))
          .hide()
          .fadeIn(300, function () {
            $.ajax({
              type: 'POST',
              url: 'srv.php',
              data: 'tel=' + tel,
              dataType: 'json',
              success: function (json) {
                if (json.error) {
                  $('.window p').last().remove();
                  $('#backPhone').fadeIn(300, function () {
                    alert(json.error);
                  });
                } else {
                  $('.window p')
                    .last()
                    .fadeOut(300, function () {
                      $(this)
                        .text('Заявка принята!')
                        .fadeIn(300, function () {
                          $('.window_wrap').delay(1500).fadeOut(300);
                        });
                    });
                }
              },
            });
          });
      });
    }

    function handlerMouseOver(e) {
      if (e.target.classList[0] === 'telButton_background') {
        var v = document.querySelector('.telButton_hover');

        if (!v.classList.contains('fHovered')) {
          console.log('!v');
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
