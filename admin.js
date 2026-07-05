const STORAGE_KEY = 'remont_site_data';
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'remont2026';

// ============= ЛОГИН =============
function doLogin() {
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;
    const error = document.getElementById('loginError');
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        document.getElementById('loginOverlay').style.display = 'none';
        document.getElementById('adminPanel').classList.remove('hidden');
        loadData();
        error.style.display = 'none';
    } else {
        error.style.display = 'block';
    }
}

function doLogout() {
    document.getElementById('loginOverlay').style.display = 'flex';
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('loginPass').value = '';
    document.getElementById('loginError').style.display = 'none';
}

document.getElementById('loginUser').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
document.getElementById('loginPass').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

// ============= ДАННЫЕ ПО УМОЛЧАНИЮ =============
const defaultServices = [
    { icon: '🏠', title: 'Косметический ремонт', desc: 'Обои, покраска, стяжка пола, замена розеток — быстро и аккуратно.', image: '' },
    { icon: '🏢', title: 'Капитальный ремонт', desc: 'Полная перепланировка, электрика, сантехника, отделка под ключ.', image: '' },
    { icon: '🏗️', title: 'Офисные помещения', desc: 'Ремонт коммерческих площадей с учётом всех норм и сроков.', image: '' },
    { icon: '🎨', title: 'Дизайн-проект', desc: 'Разработаем стильный интерьер под ваш бюджет и вкус.', image: '' }
];

const defaultPrices = [
    { title: 'Косметический', cost: 'от 4 500 ₽/м²', desc: 'Обои + пол + потолок' },
    { title: 'Капитальный', cost: 'от 9 000 ₽/м²', desc: 'Под ключ с материалами' },
    { title: 'Офис', cost: 'договорная', desc: 'Зависит от объёма' }
];

function getData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
}

function setData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ============= ЗАГРУЗКА ДАННЫХ В АДМИНКУ =============
function loadData() {
    const data = getData();
    const services = data?.services || defaultServices;
    const prices = data?.prices || defaultPrices;

    document.getElementById('heroTitle').value = data?.heroTitle || 'Ремонт квартир и офисов';
    document.getElementById('heroDesc').value = data?.heroDesc || 'Профессиональный подход, прозрачная смета и гарантия качества. Работаем в Москве и области.';
    document.getElementById('heroBtn').value = data?.heroBtn || 'Получить бесплатную смету';
    document.getElementById('phone').value = data?.phone || '+7 (999) 123-45-67';
    document.getElementById('footerName').value = data?.footerName || 'Ремонт-Про';

    renderServices(services);
    renderPrices(prices);
}

// ============= ОТРИСОВКА УСЛУГ =============
function renderServices(services) {
    const container = document.getElementById('servicesContainer');
    container.innerHTML = '';
    services.forEach((s, i) => {
        const div = document.createElement('div');
        div.className = 'service-item';
        div.innerHTML = `
            <button class="btn btn-danger btn-sm remove-btn" onclick="removeService(${i})">✕</button>
            <div class="grid-2">
                <div class="field">
                    <label>Иконка (эмодзи)</label>
                    <input type="text" id="svc_icon_${i}" value="${s.icon || '🔧'}" />
                </div>
                <div class="field">
                    <label>Название</label>
                    <input type="text" id="svc_title_${i}" value="${s.title || ''}" />
                </div>
                <div class="field" style="grid-column:1/-1;">
                    <label>Описание</label>
                    <input type="text" id="svc_desc_${i}" value="${s.desc || ''}" />
                </div>
                <div class="field" style="grid-column:1/-1;">
                    <label>Изображение</label>
                    <div class="file-input-wrapper">
                        <input type="file" accept="image/*" onchange="previewImage(event, 'svc_img_${i}')" />
                        <button class="btn btn-sm btn-danger" onclick="removeImage('svc_img_${i}')">🗑️ Удалить</button>
                    </div>
                    <input type="hidden" id="svc_img_${i}" value="${s.image || ''}" />
                    <div id="svc_img_preview_${i}">${s.image ? `<img src="${s.image}" class="img-preview" />` : ''}</div>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// ============= ОТРИСОВКА ЦЕН =============
function renderPrices(prices) {
    const container = document.getElementById('pricesContainer');
    container.innerHTML = '';
    prices.forEach((p, i) => {
        const div = document.createElement('div');
        div.className = 'price-item';
        div.innerHTML = `
            <button class="btn btn-danger btn-sm remove-btn" onclick="removePrice(${i})">✕</button>
            <div class="grid-2">
                <div class="field"><label>Название</label><input type="text" id="prc_title_${i}" value="${p.title || ''}" /></div>
                <div class="field"><label>Стоимость</label><input type="text" id="prc_cost_${i}" value="${p.cost || ''}" /></div>
                <div class="field" style="grid-column:1/-1;"><label>Описание</label><input type="text" id="prc_desc_${i}" value="${p.desc || ''}" /></div>
            </div>
        `;
        container.appendChild(div);
    });
}

// ============= РАБОТА С ИЗОБРАЖЕНИЯМИ =============
function previewImage(event, hiddenId) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById(hiddenId).value = e.target.result;
        const previewId = hiddenId.replace('svc_img_', 'svc_img_preview_');
        document.getElementById(previewId).innerHTML = `<img src="${e.target.result}" class="img-preview" />`;
    };
    reader.readAsDataURL(file);
}

function removeImage(hiddenId) {
    document.getElementById(hiddenId).value = '';
    const previewId = hiddenId.replace('svc_img_', 'svc_img_preview_');
    document.getElementById(previewId).innerHTML = '';
    const container = document.getElementById(previewId).closest('.field');
    const fileInput = container.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
}

// ============= ДОБАВЛЕНИЕ / УДАЛЕНИЕ =============
function addService() {
    const data = getData() || { services: defaultServices, prices: defaultPrices };
    data.services.push({ icon: '🔧', title: 'Новая услуга', desc: 'Описание услуги', image: '' });
    setData(data);
    renderServices(data.services);
    showStatus();
}

function removeService(index) {
    const data = getData();
    if (!data) return;
    data.services.splice(index, 1);
    setData(data);
    renderServices(data.services);
    showStatus();
}

function addPrice() {
    const data = getData() || { services: defaultServices, prices: defaultPrices };
    data.prices.push({ title: 'Новая услуга', cost: '0 ₽', desc: 'Описание' });
    setData(data);
    renderPrices(data.prices);
    showStatus();
}

function removePrice(index) {
    const data = getData();
    if (!data) return;
    data.prices.splice(index, 1);
    setData(data);
    renderPrices(data.prices);
    showStatus();
}

// ============= СОХРАНЕНИЕ =============
function saveAll() {
    const data = getData() || { services: [], prices: [] };

    data.heroTitle = document.getElementById('heroTitle').value;
    data.heroDesc = document.getElementById('heroDesc').value;
    data.heroBtn = document.getElementById('heroBtn').value;
    data.phone = document.getElementById('phone').value;
    data.footerName = document.getElementById('footerName').value;

    const services = [];
    const svcItems = document.querySelectorAll('.service-item');
    svcItems.forEach((item, i) => {
        const icon = document.getElementById(`svc_icon_${i}`);
        const title = document.getElementById(`svc_title_${i}`);
        const desc = document.getElementById(`svc_desc_${i}`);
        const image = document.getElementById(`svc_img_${i}`);
        if (icon && title && desc) {
            services.push({
                icon: icon.value || '🔧',
                title: title.value || 'Услуга',
                desc: desc.value || '',
                image: image ? image.value : ''
            });
        }
    });
    data.services = services;

    const prices = [];
    const prcItems = document.querySelectorAll('.price-item');
    prcItems.forEach((item, i) => {
        const title = document.getElementById(`prc_title_${i}`);
        const cost = document.getElementById(`prc_cost_${i}`);
        const desc = document.getElementById(`prc_desc_${i}`);
        if (title && cost && desc) {
            prices.push({
                title: title.value || 'Услуга',
                cost: cost.value || '0 ₽',
                desc: desc.value || ''
            });
        }
    });
    data.prices = prices;

    setData(data);
    showStatus();
}

function showStatus() {
    const status = document.getElementById('status');
    status.classList.add('show');
    setTimeout(() => status.classList.remove('show'), 3000);
}
