export const menu = function () {
  const menu = document.querySelector('.menu'),
    boxEmpty = document.createElement('div'),
    sticky = menu.offsetTop;

  const menuToggle = document.querySelector('#menu__toggle');

  const stickTheMenu = () => {
    boxEmpty.classList.add('js-empty');

    if (window.pageYOffset >= sticky) {
      menu.classList.add('js-sticky');
      menu.after(boxEmpty);
    } else {
      menu.classList.remove('js-sticky');
      boxEmpty.remove();
    }
  };

  const offScrollOfBody = () => {
    document.body.classList.toggle('js-off-scroll');
  };

  window.addEventListener('scroll', stickTheMenu);
  menuToggle.addEventListener('click', offScrollOfBody);
};
