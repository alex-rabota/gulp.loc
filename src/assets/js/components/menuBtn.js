document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');

    if (mobileBtn === null) return;

    mobileBtn.addEventListener('click', function () {
        mobileBtn.classList.toggle('active');
        nav.classList.toggle('active');

        if (document.querySelector('.menu-mobile-bg')) {
            document.querySelector('.menu-mobile-bg').remove();
        } else {
            const divBg = document.createElement('div');
            divBg.className = 'menu-mobile-bg';
            document.body.append(divBg);

            const menuMobileBg = document.querySelector('.menu-mobile-bg');
            menuMobileBg.addEventListener('click', function (){
                mobileBtn.classList.toggle('active');
                nav.classList.toggle('active');
                divBg.remove();
            });
        }
    });

    if(window.innerWidth <= 1170) {
        // Попытка создания выпадающего меню
        const elSubMenu = [].slice.call(document.querySelectorAll('.menu__item--sub'));

        elSubMenu.forEach(function (item) {
            const div = document.createElement('div');
            div.className = 'angle-btn';
            item.append(div);
            div.addEventListener('click', function (event) {
                item.classList.toggle('active');
                event.stopPropagation();
            });
        });

        // Открываем родителский элемент меню, если выбран пункт из вложенного списка
        const activeMenu = [].slice.call(document.querySelectorAll('.menu__item.active'));

        if (activeMenu.length === 0) return;

        if (activeMenu[0].closest('.menu__item--sub')) {
            activeMenu[0].closest('.menu__item--sub').classList.add('active');
        }
    }
});