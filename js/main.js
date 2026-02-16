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

    // Check if the form ID is still the placeholder
    if (form.action.includes('YOUR_FORM_ID')) {
        alert('【開発者用メッセージ】\nFormspreeのIDが設定されていません。\nindex.htmlの514行目付近にある "YOUR_FORM_ID" を、取得したIDに書き換えてください。');
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
