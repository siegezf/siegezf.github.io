/* Success Glow Ventures - shared site script (vanilla JS, no dependencies) */
(() => {
'use strict';
const WA = 'https://wa.me/2347067019699';
const FB = 'https://www.facebook.com/profile.php?id=61556378224722';
const MAIL = 'mailto:lillysuccess469@gmail.com';
const KEY = 'sgv-order';
const MAXQ = 9999;
const PATHS = {
  care: '<path d="M9 3h6v3H9zM8 6h8l1 4v10a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V10z"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4-4"/>',
  clean: '<path d="M7 21V12l3-3V6h5v3M7 12h7v9zM15 8h4M15 11h3"/>',
  home: '<path d="M8 11h8l-1 10H9zM12 11 10 3M12 11l2-8M12 11l5-5"/>',
  fashion: '<path d="M8 3 3 6l2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0z"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1 1 8.2 19z"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>'
};
const ic = (n, s = 20) => `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[n] || ''}</svg>`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = (s, r = document) => r.querySelector(s);

let data = { categories: [], products: [] };
let order = {};
const loadOrder = () => { try { const o = JSON.parse(localStorage.getItem(KEY)); order = (o && typeof o === 'object' && !Array.isArray(o)) ? o : {}; } catch (e) { order = {}; } };
loadOrder();
const clean = () => Object.keys(order).forEach(id => { if (!find(id) || !(order[id] > 0)) delete order[id]; else order[id] = Math.min(MAXQ, Math.floor(order[id])); });
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(order)); } catch (e) { /* storage unavailable */ } };
const find = id => data.products.find(p => p.id === id);
const catName = id => (data.categories.find(c => c.id === id) || {}).name || '';
const clampQ = v => Math.max(1, Math.min(MAXQ, parseInt(v, 10) || 1));
const items = () => Object.entries(order).map(([id, q]) => [find(id), q]).filter(([p]) => p);
const total = () => items().reduce((a, [, q]) => a + q, 0);

/* ---- WhatsApp message ---- */
const message = list => [
  'Hello Success Glow Ventures, I would like to enquire about the following products:', '',
  ...list.map(([p, q], i) => `${i + 1}. ${p.name} - Quantity: ${q}`), '',
  'Please confirm pricing, minimum order quantities, availability and delivery or collection arrangements.',
  'I understand that sending this enquiry does not confirm a price, reserve stock or complete a purchase.'
].join('\n');
const waUrl = list => `${WA}?text=${encodeURIComponent(message(list))}`;

/* ---- Shared layout ---- */
function header() {
  const page = document.body.dataset.page;
  const links = [['index', 'Home'], ['shop', 'Shop'], ['about', 'About'], ['contact', 'Contact']];
  $('#site-header').innerHTML = `<div class="wrap bar"><a class="brand" href="index.html" aria-label="Success Glow Ventures, home"><img src="logo-mark.png" alt="" width="47" height="34"><span class="wm"><b>SUCCESS GLOW</b><i>VENTURES</i></span></a>
<nav id="nav" class="nav" aria-label="Main">${links.map(([k, t]) => `<a href="${k}.html"${k === page ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</nav>
<div class="tools"><a class="tool" id="order-link" href="contact.html#order" aria-label="Order list, 0 products">${ic('list', 22)}<span class="tl">Order list</span><span class="badge" id="badge" hidden>0</span></a>
<button type="button" class="tool menu-btn" id="menu-btn" aria-expanded="false" aria-controls="nav" aria-label="Open menu">${ic('menu', 22)}<span class="tl">Menu</span></button></div></div>`;
  const nav = $('#nav'), btn = $('#menu-btn');
  const set = o => { nav.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); btn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); };
  btn.addEventListener('click', () => set(!nav.classList.contains('open')));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { set(false); btn.focus(); } });
  document.addEventListener('click', e => { if (nav.classList.contains('open') && !e.target.closest('.site-header')) set(false); });
  nav.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  matchMedia('(min-width:760px)').addEventListener('change', () => set(false));
}
function footer() {
  $('#site-footer').innerHTML = `<div class="wrap foot"><div><img src="logo-full.png" alt="Success Glow Ventures. Quality for everyday living." width="170" height="107"></div>
<ul class="plain"><li><a href="shop.html">Shop</a></li><li><a href="about.html">About</a></li><li><a href="contact.html">Contact and bulk orders</a></li></ul>
<ul class="plain"><li><a href="${WA}" target="_blank" rel="noopener" data-ic="wa">WhatsApp</a></li><li><a href="${FB}" target="_blank" rel="noopener" data-ic="fb">Facebook</a></li><li><a href="${MAIL}" data-ic="mail">Email</a></li></ul></div>
<div class="wrap legal"><p>&copy; ${new Date().getFullYear()} Success Glow Ventures</p></div>`;
}
function badge() {
  const b = $('#badge'); if (!b) return;
  const n = Object.keys(order).length;
  b.textContent = n > 99 ? '99+' : n; b.hidden = n === 0;
  $('#order-link').setAttribute('aria-label', `Order list, ${n} ${n === 1 ? 'product' : 'products'}`);
}
let toastTimer;
function toast(t) {
  const el = $('#toast'); el.textContent = t; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---- Product pieces ---- */
const priceText = p => (typeof p.price === 'number' && p.price > 0) ? `${esc(p.currency || '')} ${p.price.toLocaleString()}`.trim() : 'Request a quote';
const placeholder = p => `<div class="ph-art" role="img" aria-label="Temporary placeholder for ${esc(p.name)}. Not a photograph of the product.">${ic(p.category, 40)}</div>`;
const media = p => p.image ? `<img src="${esc(p.image)}" alt="${esc(p.alt || p.name)}" loading="lazy" data-id="${esc(p.id)}">` : placeholder(p);
const buy = p => `<div class="buy" data-id="${esc(p.id)}"><div class="qty"><button type="button" data-act="dec" aria-label="Decrease quantity of ${esc(p.name)}">-</button><input type="number" min="1" max="${MAXQ}" value="1" inputmode="numeric" aria-label="Quantity of ${esc(p.name)}"><button type="button" data-act="inc" aria-label="Increase quantity of ${esc(p.name)}">+</button></div><button type="button" class="btn btn-dark btn-sm" data-act="add">Add to order</button></div>`;
const card = p => `<article class="card"><a class="ph" href="product.html?id=${encodeURIComponent(p.id)}" tabindex="-1" aria-hidden="true">${media(p)}</a><div class="cbody"><p class="cat">${esc(catName(p.category))}</p><h3><a href="product.html?id=${encodeURIComponent(p.id)}">${esc(p.name)}</a></h3><p class="quote">${priceText(p)}</p>${buy(p)}</div></article>`;
document.addEventListener('error', e => {
  if (e.target.tagName !== 'IMG' || !e.target.dataset.id) return;
  const p = find(e.target.dataset.id); if (p) e.target.outerHTML = placeholder(p);
}, true);

/* ---- Pages ---- */
function home() {
  $('#category-grid').innerHTML = data.categories.map(c => {
    const n = data.products.filter(p => p.category === c.id).length;
    return `<a class="cat-card" href="shop.html?cat=${encodeURIComponent(c.id)}">${ic(c.id, 32)}<h3>${esc(c.name)}</h3><p>${n} product types</p></a>`;
  }).join('');
}
function shop() {
  const params = new URLSearchParams(location.search);
  let cat = data.categories.some(c => c.id === params.get('cat')) ? params.get('cat') : 'all';
  const q = $('#q'), chips = $('#chips');
  const draw = () => {
    chips.innerHTML = [{ id: 'all', name: 'All' }, ...data.categories].map(c => `<button type="button" class="chip" data-cat="${esc(c.id)}" aria-pressed="${c.id === cat}">${esc(c.short || c.name)}</button>`).join('');
    const term = q.value.trim().toLowerCase();
    const list = data.products.filter(p => (cat === 'all' || p.category === cat) && (!term || (p.name + ' ' + catName(p.category)).toLowerCase().includes(term)));
    $('#count').textContent = `${list.length} of ${data.products.length} product types`;
    $('#ph-note').hidden = !list.some(p => !p.image);
    $('#grid').innerHTML = list.length ? list.map(card).join('') : '<p class="empty">No products match your search. Clear the search or choose another category.</p>';
  };
  chips.addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { cat = b.dataset.cat; draw(); } });
  q.addEventListener('input', draw);
  draw();
}
function product() {
  const id = new URLSearchParams(location.search).get('id'), p = find(id), box = $('#product');
  if (!p) { box.innerHTML = '<h1>Product not found</h1><p>This product is not in the catalogue. <a href="shop.html">Return to the shop</a>.</p>'; return; }
  document.title = `${p.name} | Success Glow Ventures`;
  box.innerHTML = `<p class="crumb"><a href="shop.html">Shop</a> / ${esc(catName(p.category))}</p><div class="pd"><div><div class="ph big">${media(p)}</div>${p.image ? '' : '<p class="note">Temporary placeholder image. A product photo will replace it.</p>'}</div><div><p class="cat">${esc(catName(p.category))}</p><h1>${esc(p.name)}</h1><p class="quote">${priceText(p)}</p>${p.description ? `<p>${esc(p.description)}</p>` : ''}<p class="muted">Sizes, scents and other options are not listed yet. Ask us on WhatsApp what is available.</p>${buy(p)}<p><button type="button" class="btn btn-ghost" data-act="wa1">Request a quote on WhatsApp</button></p><p class="note">Sending an enquiry does not confirm a price, reserve stock or complete a purchase. <a href="contact.html#order">View your order list</a>.</p></div></div>`;
}
function renderOrder() {
  const box = $('#order-box'); if (!box) return;
  const list = items();
  box.innerHTML = list.length
    ? `<ul class="rows">${list.map(([p, q]) => `<li class="row" data-row="${esc(p.id)}"><span class="rname">${esc(p.name)}</span><div class="qty"><button type="button" data-act="rdec" aria-label="Decrease quantity of ${esc(p.name)}">-</button><span class="qn" aria-label="Quantity of ${esc(p.name)}">${q}</span><button type="button" data-act="rinc" aria-label="Increase quantity of ${esc(p.name)}">+</button></div><button type="button" class="link" data-act="rm" aria-label="Remove ${esc(p.name)}">Remove</button></li>`).join('')}</ul><div class="actions"><button type="button" class="btn btn-dark" data-act="send">${ic('wa')}Send enquiry on WhatsApp</button><button type="button" class="btn btn-ghost" data-act="clear">Clear list</button></div><p class="note">This opens WhatsApp with your list written out. It does not confirm a price, reserve stock or complete a purchase.</p>`
    : `<p>Your order list is empty. Add products from the catalogue, or message us directly on WhatsApp.</p><div class="actions"><a class="btn btn-dark" href="shop.html">Browse the catalogue</a><a class="btn btn-ghost" href="${WA}" target="_blank" rel="noopener">${ic('wa')}Chat on WhatsApp</a></div>`;
}

/* ---- Actions ---- */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const act = b.dataset.act, byBuy = b.closest('.buy'), row = b.closest('[data-row]');
  if (byBuy) {
    const inp = $('input', byBuy), v = clampQ(inp.value);
    if (act === 'inc') inp.value = Math.min(MAXQ, v + 1);
    if (act === 'dec') inp.value = Math.max(1, v - 1);
    if (act === 'add') { order[byBuy.dataset.id] = Math.min(MAXQ, (order[byBuy.dataset.id] || 0) + v); inp.value = 1; save(); badge(); toast('Added to order list'); }
  }
  if (row) {
    const id = row.dataset.row, q = order[id] || 1;
    if (act === 'rinc') order[id] = Math.min(MAXQ, q + 1);
    if (act === 'rdec') order[id] = Math.max(1, q - 1);
    if (act === 'rm') delete order[id];
    save(); badge(); renderOrder();
  }
  if (act === 'clear') { order = {}; save(); badge(); renderOrder(); }
  if (act === 'send') { const l = items(); if (l.length) window.open(waUrl(l), '_blank', 'noopener'); }
  if (act === 'wa1') {
    const p = find(new URLSearchParams(location.search).get('id')), inp = $('#product .buy input');
    if (p) window.open(waUrl([[p, clampQ(inp && inp.value)]]), '_blank', 'noopener');
  }
});

document.addEventListener('change', e => { if (e.target.matches('.qty input')) e.target.value = clampQ(e.target.value); });
const resync = () => { loadOrder(); clean(); badge(); renderOrder(); };
window.addEventListener('pageshow', e => { if (e.persisted) resync(); });
window.addEventListener('storage', e => { if (e.key === KEY) resync(); });

/* ---- Start ---- */
async function init() {
  header(); footer();
  document.body.insertAdjacentHTML('beforeend', '<div id="toast" class="toast" role="status" aria-live="polite"></div>');
  document.querySelectorAll('[data-ic]').forEach(el => el.insertAdjacentHTML('afterbegin', ic(el.dataset.ic)));
  try {
    const r = await fetch('products.json'); if (!r.ok) throw new Error('load');
    const d = await r.json();
    if (!Array.isArray(d.products) || !Array.isArray(d.categories)) throw new Error('shape');
    data = { categories: d.categories, products: d.products.filter(p => p && p.id && p.name && p.category) };
  } catch (err) {
    $('#main').insertAdjacentHTML('afterbegin', `<div class="wrap section"><p class="empty">The catalogue could not be loaded. Refresh the page, or message us on <a href="${WA}">WhatsApp</a>.</p></div>`);
  }
  clean(); save(); badge();
  const run = { index: home, shop, product, contact: renderOrder }[document.body.dataset.page];
  if (run && data.products.length) run();
}
init();
})();
