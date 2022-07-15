import { paused } from 'browser-sync';
import $ from 'jquery';

export const callback = function () {
  // document.addEventListener('DOMContentLoaded', function (event) {});

  $(document).ready(function () {
    const wrap = document.querySelector('.window_wrap');
    var p = $('.window_wrap');

    function handler(e) {
      if (e.target.classList[0] === 'window_wrap') {
        //if (e.target.className == this) {
        wrap.style.display = 'none';
        //}
      }

      if (e.target.className === 'window_close') {
        wrap.style.display = 'none';
      }

      console.log(e.target.classList[0]);
      if (e.target.classList[0] === 'telButton_background') {
        // не работает плавный переход
        wrap.style.display = 'block';
        wrap.classList.remove('hide');
        wrap.classList.add('show');
      }
    }

    document.addEventListener('click', handler);

    /*
    $('.telButton').click(function () {
      p.css({ display: 'block' }).hide().fadeIn(1000);
    });
    
    
    p.click(function (event) {
      if (event.target == this) {
        $(this).css({ display: 'none' });
      }
    });

    $('.window_close').click(function () {
      p.css({ display: 'none' });
    });
    */

    $('#telButton').click(function (event) {
      event.preventDefault();

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
    });

    $('.telButton .telButton_background').hover(
      function () {
        //var v = $('.telButton_hover');
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
          v.style.opacity = '1';
          v.classList.add('fHovered');
        }
      },
      function () {
        var v2 = document.querySelector('.telButton_hover');
        var v = $('.telButton_hover');
        if (v2.classList.contains('fHovered')) {
          v.stop()
            .animate({ opacity: 0 }, 1000, function () {
              $(this).css('display', 'none');
            })
            .removeClass('fHovered');
        }
      }
    );

    const telButtonAnim = document.querySelector('.telButton.anim');

    telButtonAnim.style.position = 'absolute';
    telButtonAnim.style.top = '-100px';
    telButtonAnim.style.right = '50px';
    telButtonAnim.style.transition =
      'top 0.9s cubic-bezier(.65, 1.95, .03, .32) 0.5s';

    /*
    $('.telButton.anim').css({
      position: 'absolute',
      top: '-100px',
      right: '50px',
      transition: 'top 0.9s cubic-bezier(.65, 1.95, .03, .32) 0.5s',
    });
    */

    telButtonReturn();

    function handlerScroll() {
      telButtonReturn();
    }

    /*
    $(window).scroll(function () {
      telButtonReturn();
    });
    */

    function handlerResize() {
      telButtonReturn();
    }

    /*
    $(window).resize(function () {
      telButtonReturn();
    });
    */

    function telButtonReturn() {
      var wHeight = getWindowHeight();

      // var sHeight = $(window).scrollTop();
      var sHeight = window.scrollY;

      var result = wHeight + sHeight - 100;

      telButtonAnim.style.position = 'absolute';
      telButtonAnim.style.top = result + 'px';
      telButtonAnim.style.right = '50px';

      /*
      $('.telButton.anim').css({
        position: 'absolute',
        top: result + 'px',
        right: '50px',
      });
      */
    }

    window.addEventListener('scroll', handlerScroll);
    window.addEventListener('resize', handlerResize);

    function getWindowHeight() {
      let windowHeight;

      // windowHeight = $(window).height();
      windowHeight = document.documentElement.clientHeight;

      return windowHeight;
    }
  });
};
