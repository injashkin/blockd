export const menu = function () {
  const sticky = function () {
    window.onscroll = function () {
      myFunction();
    };

    let navbar = document.querySelector('.menu');
    let boxEmpty = document.createElement('div');
    boxEmpty.classList.add('js-empty');
    let sticky = navbar.offsetTop;

    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add('js-sticky');
        navbar.after(boxEmpty);
      } else {
        navbar.classList.remove('js-sticky');
        boxEmpty.remove();
      }
    }
  };

  const offScrollOfBody = () => {
    let menuToggle = document.querySelector('#menu__toggle');

    const handler = () => {
      if (menuToggle.checked === true) {
        document.body.classList.add('off-scroll');
      } else {
        document.body.classList.remove('off-scroll');
      }
    };

    menuToggle.addEventListener('click', handler);
  };

  sticky();
  offScrollOfBody();
};
