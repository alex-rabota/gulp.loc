document.addEventListener('DOMContentLoaded', () => {
    const bnt = [].slice.call(document.querySelectorAll('.btn-modal'));
    const modalHidden = [].slice.call(document.querySelectorAll('.modal-window-bg '));
    const modalWindowClose = [].slice.call(document.querySelectorAll('.modal-window-close'));

    if (bnt.length === 0) return;

    bnt.forEach(function(item) {
        item.addEventListener('click', function(event) {
            const attr = this.getAttribute('data-modal-id');
            const form = document.querySelector(`#${attr}`);

            form.classList.add("modal-visible");

            // Заполняем тему письма
            if(attr !== 'modal-window-portfolio') {
                if (this.closest('[class*="__item"]')) {
                    const elemWrap = this.closest('[class*="__item"]').querySelector('.theme-form');
                    if (elemWrap) {
                        form.querySelector('.modalform-theme').value = elemWrap.innerHTML;
                    } else {
                        form.querySelector('.modalform-theme').value = this.innerHTML;
                    }
                } else {
                    form.querySelector('.modalform-theme').value = this.innerHTML;
                }
            }

            if(attr === 'modal-window-portfolio') {
                const img = this.getAttribute('href');
                form.querySelector('.portfolio-big-img').innerHTML = `<img src='${img}' alt="" />`;
            }

            event.preventDefault();
        });
    });

    function modalClose(modal) {
        if(modal) {
            modal.classList.remove("modal-visible");
        }
    }

    modalHidden.forEach(function(item) {
        item.addEventListener('click', function() {
            modalClose(this.parentElement);
        });
    });

    modalWindowClose.forEach(function(item) {
        item.addEventListener('click', function() {
            modalClose(this.closest('.modal-window'));
        });
    });
});