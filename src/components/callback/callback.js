import $ from 'jquery';

export const callback = function () {
  // document.addEventListener('DOMContentLoaded', function (event) {});

  $(document).ready(function () {
    const wrap = document.querySelector('.window_wrap');
    var p = $('.window_wrap');

    function handler(e) {
      if (e.target.className === 'window_wrap') {
        //if (e.target.className == this) {
        wrap.style.display = 'none';
        //}
      }

      if (e.target.className === 'window_close') {
        wrap.style.display = 'none';
      }
    }

    document.addEventListener('click', handler);

    $('.telButton').click(function () {
      p.css({ display: 'block' }).hide().fadeIn(1000);
    });

    /*
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
        var v = $('.telButton_hover');
        if (!v.hasClass('fHovered')) {
          v.stop()
            .css('display', 'block')
            .animate({ opacity: 1 }, 1000)
            .addClass('fHovered');
        }
      },
      function () {
        var v = $('.telButton_hover');
        if (v.hasClass('fHovered')) {
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

    function handlerScroll(e) {
      telButtonReturn();
    }

    /*
    $(window).scroll(function () {
      telButtonReturn();
    });
    */

    function handlerResize(e) {
      telButtonReturn();
    }

    /*
    $(window).resize(function () {
      telButtonReturn();
    });
    */

    function telButtonReturn() {
      var wHeight = getWindowHeight();

      var sHeight = $(window).scrollTop();

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
      var windowHeight;

      windowHeight = $(window).height();

      return windowHeight;
    }
  });
};
