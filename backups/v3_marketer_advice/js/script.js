document.addEventListener('DOMContentLoaded', () => {
    // Wave Animation or other interactions can be added here
    console.log("Oubomaru Site Loaded");

    // Form Toggle
    const showFormBtn = document.getElementById('showFormBtn');
    const formWrapper = document.getElementById('formWrapper');

    if (showFormBtn && formWrapper) {
        showFormBtn.addEventListener('click', () => {
            formWrapper.style.display = 'block';
            showFormBtn.style.display = 'none';
            // Scroll to form smoothly
            formWrapper.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple form submission logging (demonstration only)
    const form = document.querySelector('.lead-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate form submission
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            btn.innerText = '送信中...';
            btn.disabled = true;

            setTimeout(() => {
                alert('資料のダウンロード申し込みを受け付けました。\n自動返信メールをご確認ください。');
                form.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});
