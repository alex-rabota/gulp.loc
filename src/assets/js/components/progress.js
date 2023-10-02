const btnUp = {
    el: document.querySelector('.progress-wrap'),
    show() {
        // добавим к кнопке класс
        this.el.classList.add('active-progress');
    },
    hide() {
        // удалим у кнопки класс
        this.el.classList.remove('active-progress');
    },
    addEventListener() {
        // при прокрутке содержимого страницы
        window.addEventListener('scroll', () => {
            // определяем величину прокрутки
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            // если страница прокручена больше чем на 50px, то делаем кнопку видимой, иначе скрываем
            scrollY > 50 ? this.show() : this.hide();
        });
        // при нажатии на кнопку
        document.querySelector('.progress-wrap').onclick = () => {
            // переместим в начало страницы
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
};

btnUp.addEventListener();

let progressPath = document.querySelector('.progress-wrap path');
let pathLength = progressPath.getTotalLength();

progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
progressPath.style.strokeDashoffset = pathLength;
progressPath.getBoundingClientRect();
progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

let updateProgress = function () {
    let scroll = window.scrollY;
    let height = document.documentElement.scrollHeight - window.innerHeight;
    let progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
};

updateProgress();

window.addEventListener('scroll', () => {
    updateProgress();
});