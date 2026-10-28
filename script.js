// ==================== 导航切换逻辑 ====================
const navItems = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.panel');

navItems.forEach(item => {
    item.addEventListener('click', function() {
        // 1. 移除所有导航项的 active 类
        navItems.forEach(nav => nav.classList.remove('active'));
        // 2. 给当前点击的导航项加上 active 类
        this.classList.add('active');

        // 3. 获取 data-target 属性的值（也就是对应面板的 ID）
        const targetId = this.getAttribute('data-target');

        // 4. 隐藏所有面板
        panels.forEach(panel => panel.classList.remove('active'));

        // 5. 显示目标面板
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

const musicBtn = document.getElementById('musicBtn');
const bgm = document.getElementById('bgm');

musicBtn.addEventListener('click', () => {
    if (bgm.paused) {
        bgm.play();
        musicBtn.classList.add('playing');
        bgm.volume = 0.2;  
    } else {
        bgm.pause();
        musicBtn.classList.remove('playing');
    }
});

// ==================== 轮播视频逻辑 ====================
const mediaList = [
    'call of silence.mp4',
    'listen.mp4',
    '川西风光.mp4',
    '城市生长动画（仿）.mp4'
];

const posters = [
    'call of silence.png',
    'listen.png',
    '川西风光.png',
    '屏幕截图 2026-10-28 151723.png'
    
];

let currentIndex = 0;
const mainVideo = document.getElementById('mainVideo');
const thumbs = document.querySelectorAll('.thumb');

function updateMedia(index) {
    if (!mainVideo) return;
    currentIndex = index;

    // 1. 换源
    mainVideo.src = mediaList[currentIndex];
    // 2. 换封面（可选）
    if (posters[currentIndex]) mainVideo.poster =  posters[currentIndex];
    // 3. 重新加载新源（关键）
    mainVideo.load();
    playOverlay.classList.remove('hidden');   // 切换后显示播放按钮

    // 注意：这里不再调用 play()，保持暂停，等用户点播放按钮

    // 4. 更新缩略图高亮
    thumbs.forEach((t, i) => {
        t.classList.toggle('active', i === currentIndex);
    });
}

// 点击缩略图
function changeMedia(element) {
    const index = Array.from(thumbs).indexOf(element);
    updateMedia(index);
}

// 左右切换
function prevImage() {
    let index = currentIndex - 1;
    if (index < 0) index = mediaList.length - 1;
    updateMedia(index);
}

function nextImage() {
    let index = currentIndex + 1;
    if (index >= mediaList.length) index = 0;
    updateMedia(index);
}

playOverlay.addEventListener('click', () => {
    mainVideo.play();
});
mainVideo.addEventListener('play', () => playOverlay.classList.add('hidden'));
mainVideo.addEventListener('pause', () => playOverlay.classList.remove('hidden'));
// 播放结束/暂停时重新显示按钮
mainVideo.addEventListener('pause', () => {
    playOverlay.classList.remove('hidden');
});
mainVideo.addEventListener('play', () => {
    playOverlay.classList.add('hidden');
});

// ==================== 影像相册逻辑 ====================

// 模拟你的图片数据（你可以自己增加或修改图片路径）
// 注意：这里用的是网络占位图，请替换为你本地的真实图片路径，如 'images/food1.jpg'
const galleryData = {
    food: [
       '微信图片_20261028144812_329_2.jpg',
        '微信图片_20261028144813_330_2.jpg',
        '微信图片_20261028144814_331_2.jpg',
        '微信图片_20261028144816_332_2.jpg',
        '微信图片_20261028144817_333_2.jpg',
        '微信图片_20261028144818_334_2.jpg',
        '微信图片_20261028144820_335_2.jpg',
        '微信图片_20261028144821_336_2.jpg',
        '微信图片_20261028144822_337_2.jpg',
        '1.jpg','static/2.jpg','static/3.jpg','static/4.jpg','static/5.jpg','static/6.jpg','static/7.jpg'
    ],
    travel: [
        '11.jpg','static/12.jpg','static/13.jpg','static/14.jpg','static/15.jpg','static/16.jpg','static/17.jpg'
    ],
    comic: [
        '18025458887413120.png',
        '【哲风壁纸】书呆子计划-书桌.jpg',
        '21.jpg','static/22.jpg'
    ],
    game: [
        '722.横版-1125x2436_d2ff15fe586c479c97771da7c27bb103.jpg',
        '712.横版-1125x2436_fdd74ccf967c44a7aefaa62876a79516.jpg',
        '581 2436x1125_072755c61bca4d87b64bddc437aa2ba4.jpg',
        '734.横版-1125x2436_4c5e6f2dfc524ecba7d57209f3f00ec6.jpg',
        '2qf5wwxm.png'
    ]
};

const categoryItems = document.querySelectorAll('.category-item');
const imageGrid = document.getElementById('imageGrid');

// 渲染图片的函数
function renderImages(category) {
    if (!imageGrid) return;
    
    // 清空当前内容
    imageGrid.innerHTML = '';

    const images = galleryData[category] || [];
    
    if (images.length === 0) {
        imageGrid.innerHTML = '<p style="color:#999;">暂无图片</p>';
        return;
    }

    // 循环生成图片卡片
    images.forEach(src => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = category;
        
        // 可选：点击图片放大（在新标签页打开）
        card.onclick = () => window.open(src, '_blank');

        card.appendChild(img);
        imageGrid.appendChild(card);
    });
}

// 绑定左侧点击事件
categoryItems.forEach(item => {
    item.addEventListener('click', function() {
        // 1. 移除所有 active 类
        categoryItems.forEach(i => i.classList.remove('active'));
        // 2. 给当前点击的项加 active 类
        this.classList.add('active');
        // 3. 获取分类数据并重新渲染右侧图片
        const category = this.getAttribute('data-category');
        renderImages(category);
    });
});

// 页面加载时默认渲染“美食”分类
renderImages('food');

// ==================== 留言板逻辑 ====================
document.addEventListener('DOMContentLoaded', () => {
    const postPlaceholder = document.getElementById('postPlaceholder');
    const postInputArea = document.getElementById('postInputArea');
    const nameInput = document.getElementById('nameInput');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const messageList = document.getElementById('messageList');

    // 1. 点击“留个言吧”展开输入框
    postPlaceholder.addEventListener('click', () => {
        postPlaceholder.style.display = 'none';
        postInputArea.classList.add('active');
        messageInput.focus(); // 自动聚焦光标
    });

    // 2. 点击“取消”收起输入框
    cancelBtn.addEventListener('click', () => {
        postInputArea.classList.remove('active');
        postPlaceholder.style.display = 'block';
        messageInput.value = ''; // 清空内容
        nameInput.value = ''; // 👈 新增：取消时也清空昵称
    });

    // 3. 点击“发送”发布留言
    sendBtn.addEventListener('click', () => {
        const name = nameInput.value.trim() || '匿名访客'; // 如果没填，默认叫“匿名访客”
        const text = messageInput.value.trim();
        
        if (!text) {
            alert('留言内容不能为空哦！');
            return;
        }

        // 获取当前时间
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        // 创建新的留言卡片 HTML
        const newCard = document.createElement('div');
        newCard.className = 'message-card';
        newCard.innerHTML = `
            <div class="msg-header">
                <svg class="msg-avatar" width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <!-- 头 -->
                <circle cx="50" cy="30" r="18" fill="#9e9e9e" />
                <!-- 身体 -->
                <path d="M20 90 Q20 60 50 60 Q80 60 80 90 Z" fill="#9e9e9e" />
                </svg>
                <span class="msg-name">${escapeHTML(name)}</span>
                <span class="msg-time">${timeString}</span>
            </div>
            <div class="msg-content">${escapeHTML(text)}</div>
        `;

        // 插入到留言列表的顶部（最新的在最上面）
        messageList.insertBefore(newCard, messageList.firstChild);

        // 发布成功后，收起输入框并清空
        messageInput.value = '';
        nameInput.value = ''; 
        postInputArea.classList.remove('active');
        postPlaceholder.style.display = 'block';
    });

    // 可选：支持 Ctrl + Enter 快捷发送
    messageInput.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            sendBtn.click();
        }
    });
});

// 防 XSS 攻击：转义用户输入的特殊字符，防止用户输入 <script> 等恶意代码
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag])
    );
}