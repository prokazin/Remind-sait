const STORAGE_KEY = 'remont_site_data';

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

function loadSite() {
    const data = getData();
    const services = data?.services || defaultServices;
    const prices = data?.prices || defaultPrices;

    document.getElementById('heroTitle').textContent = data?.heroTitle || 'Ремонт квартир и офисов';
    document.getElementById('heroDesc').textContent = data?.heroDesc || 'Профессиональный подход, прозрачная смета и гарантия качества. Работаем в Москве и области.';
    document.getElementById('heroBtn').textContent = data?.heroBtn || 'Получить бесплатную смету';
    document.getElementById('phoneDisplay').textContent = data?.phone || '+7 (999) 123-45-67';
    document.getElementById('footerName').textContent = data?.footerName || 'Ремонт-Про';

    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = '';
    services.forEach(s => {
        const card = document.createElement('div');
        card.className = 'card';
        const imgHtml = s.image ? `<img src="${s.image}" alt="${s.title}" />` : `<div class="icon">${s.icon || '🔧'}</div>`;
        card.innerHTML = `
            ${imgHtml}
            <h3>${s.title || 'Услуга'}</h3>
            <p>${s.desc || ''}</p>
        `;
        grid.appendChild(card);
    });

    const priceGrid = document.getElementById('pricesGrid');
    priceGrid.innerHTML = '';
    prices.forEach(p => {
        const item = document.createElement('div');
        item.className = 'price-item';
        item.innerHTML = `
            <h4>${p.title || 'Услуга'}</h4>
            <p class="cost">${p.cost || '0 ₽'}</p>
            <p>${p.desc || ''}</p>
        `;
        priceGrid.appendChild(item);
    });
}

loadSite();
