document.addEventListener('DOMContentLoaded', () => {
  const menuLi = [].slice.call(document.querySelectorAll('.menu > .menu__item'));

  if (menuLi.length === 0) return;

  menuLi.forEach(function(item) {
    if(item.childElementCount > 1) {
      item.classList.add('menu__item--sub');
    }
  });

  const menuLiSub = [].slice.call(document.querySelectorAll('.menu > .menu__item > .menu__sub-ul > .menu__item'));

  if (menuLiSub.length === 0) return;

  menuLiSub.forEach(function(item) {
    if(item.childElementCount > 1) {
      item.classList.add('menu__item--sub-left');
    }
  });
});