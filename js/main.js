// Modal Interaction Logic
function openForm() {
    const overlay = document.getElementById('formOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeForm() {
    const overlay = document.getElementById('formOverlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    // Strict Email Validation
    const email = data.get('email');
    const freeDomains = ['gmail.com', 'yahoo.co.jp', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'softbank.ne.jp', 'docomo.ne.jp', 'ezweb.ne.jp'];
    if (email) {
        const domain = email.split('@')[1];
        if (domain && freeDomains.includes(domain.toLowerCase())) {
            alert('申し訳ございません。フリーメール（Gmail, Yahooなど）はご利用いただけません。\n法人メールアドレスをご入力ください。');
            return; // Stop submission
        }
    }

    // Check if the form action is valid (simple check)
    if (!form.action.includes('script.google.com')) {
        alert('フォームの設定エラー: 送信先が正しくありません。');
        return;
    }

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // alert('お申し込みありがとうございます！\nシミュレーション資料を送付いたします。'); // Removed alert
            form.reset();
            closeForm();
            window.location.href = 'thanks.html'; // Redirect to Thank You page
        } else {
            const result = await response.json();
            if (result.errors) {
                alert('エラーが発生しました: ' + result.errors.map(error => error.message).join(', '));
            } else {
                alert('送信に失敗しました。時間をおいて再度お試しください。');
            }
        }
    } catch (error) {
        alert('送信エラーが発生しました。ネットワーク接続をご確認ください。');
    }
}

// Close modal when clicking outside
window.onclick = function (event) {
    const overlay = document.getElementById('formOverlay');
    if (event.target == overlay) {
        closeForm();
    }
}

// Add event listener to form if it exists
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.popup-form');
    forms.forEach(form => {
        form.addEventListener('submit', handleSubmit);
    });
});
