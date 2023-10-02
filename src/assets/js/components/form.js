// Agree
document.addEventListener('DOMContentLoaded', () => {
    const agree = [].slice.call(document.querySelectorAll('.check-box'));

    if (agree.length === 0) return;

    agree.forEach(function (item) {
        item.addEventListener('click', function () {
            const btn = item.closest('.form').querySelector('.btn');
            btn.classList.toggle('display-none');
        });
    });
});