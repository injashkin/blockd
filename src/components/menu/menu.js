export const menu = function () {
  const menu = document.querySelector('.menu'),
    boxEmpty = document.createElement('div'),
    menuOffset = menu.offsetTop,
    menuToggle = document.querySelector('#menu__toggle');

  const stickTheMenu = () => {
    boxEmpty.classList.add('js-empty');

    if (window.pageYOffset >= menuOffset) {
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

  const closeMenu = () => {
    if (menuToggle.checked) {
      menuToggle.checked = false;
      offScrollOfBody();
    }
  };

  window.addEventListener('scroll', stickTheMenu);
  menuToggle.addEventListener('click', offScrollOfBody);
  document.addEventListener('mouseup', closeMenu);
};
