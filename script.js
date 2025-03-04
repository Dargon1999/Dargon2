function scrollToSection() {
    document.getElementById('info').scrollIntoView({ behavior: 'smooth' });
}

function scrollToLeader() {
    document.getElementById('leader').scrollIntoView({ behavior: 'smooth' });
}

function toggleOtherSkill(select) {
    const otherSkillField = document.getElementById('otherSkillField');
    if (select.value === 'Другое') {
        otherSkillField.style.display = 'block';
        document.getElementById('otherSkillInput').required = true;
    } else {
        otherSkillField.style.display = 'none';
        document.getElementById('otherSkillInput').required = false;
        document.getElementById('otherSkillInput').value = '';
    }
}

function submitForm(event) {
    event.preventDefault();
    
    const realName = document.getElementById('realName').value;
    const ageOOC = document.getElementById('ageOOC').value;
    const location = document.getElementById('location').value;
    const timezone = document.getElementById('timezone').value;
    const averageOnline = document.getElementById('averageOnline').value;
    const moveWithFamily = document.getElementById('moveWithFamily').value;
    const bestSkill = document.getElementById('bestSkill').value;
    const otherSkillInput = document.getElementById('otherSkillInput').value;
    const preference = document.getElementById('preference').value;
    const previousOrganizations = document.getElementById('previousOrganizations').value;
    const discord = document.getElementById('discord').value;

    let bestSkillText = bestSkill;
    if (bestSkill === 'Другое' && otherSkillInput) {
        bestSkillText += `: ${otherSkillInput}`;
    }

    const discordPayload = {
        content: `Новая заявка в семью Family Dargon:\n` +
                 `**Ваше имя [OOC]:** ${realName}\n` +
                 `**Сколько вам лет? [OOC]:** ${ageOOC}\n` +
                 `**Откуда вы? [OOC]:** ${location}\n` +
                 `**Ваш часовой пояс [OOC]:** ${timezone}\n` +
                 `**Ваш средний онлайн:** ${averageOnline}\n` +
                 `**Готовы ли вы двигаться вместе с семьей?** ${moveWithFamily}\n` +
                 `**Что у вас получается больше всего?** ${bestSkillText}\n` +
                 `**Что вы предпочитаете:** ${preference}\n` +
                 `**В каких организациях ранее состояли:** ${previousOrganizations}\n` +
                 `**Ваш Discord:** ${discord}`
    };

    fetch('https://discord.com/api/webhooks/1283394800900374561/jXFQEr-ssG45oKO-z9cx0nCw0M6uVGPBY-QYGzVo0cXVzKNKsgUaUVooRC-oxsqBxBrH', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordPayload),
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('status').textContent = 'Заявка успешно отправлена в Discord!';
            document.getElementById('join-form').reset();
            document.getElementById('otherSkillField').style.display = 'none';
            document.getElementById('otherSkillInput').value = '';
        } else {
            document.getElementById('status').textContent = 'Ошибка при отправке заявки. Попробуйте позже.';
        }
    })
    .catch(error => {
        document.getElementById('status').textContent = 'Ошибка: ' + error.message;
    });
}

// Новые функции для галереи и входа
let isAdmin = false;

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('loginStatus').textContent = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const status = document.getElementById('loginStatus');

    if (username === 'admin' && password === 'admin123') {
        isAdmin = true;
        status.textContent = 'Добро пожаловать, администратор!';
        document.getElementById('adminControls').style.display = 'block';
        setTimeout(closeLoginModal, 1000);
    } else if (username === 'user' && password === 'user123') {
        isAdmin = false;
        status.textContent = 'Добро пожаловать, пользователь!';
        document.getElementById('adminControls').style.display = 'none';
        setTimeout(closeLoginModal, 1000);
    } else {
        status.textContent = 'Неверный логин или пароль!';
    }
}

function addMedia() {
    if (!isAdmin) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.onchange = function(event) {
        const file = event.target.files[0];
        const galleryGrid = document.getElementById('galleryGrid');
        
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.alt = 'Добавленное фото';
            galleryGrid.appendChild(img);
        } else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.controls = true;
            const source = document.createElement('source');
            source.src = URL.createObjectURL(file);
            source.type = file.type;
            video.appendChild(source);
            galleryGrid.appendChild(video);
        }
    };
    input.click();
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Сайт загружен!');
});