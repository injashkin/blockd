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

  const onScrollOfBody = () => {
    document.body.classList.add('js-off-scroll');
  };

  const offScrollOfBody = () => {
    document.body.classList.remove('js-off-scroll');
  };

  const closeMenu = () => {
    menuToggle.checked = false;
  };

  const handle = (e) => {
    if (
      e.target.tagName !== 'SPAN' &&
      e.target !== menuToggle &&
      menuToggle.checked
    ) {
      closeMenu();
    }

    if (menuToggle.checked) {
      onScrollOfBody();
    } else {
      offScrollOfBody();
    }
  };

  window.addEventListener('scroll', stickTheMenu);
  document.addEventListener('click', handle);
};
