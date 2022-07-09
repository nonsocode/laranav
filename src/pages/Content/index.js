const PROSE_CLASS = 'max-w-prose';
const mainContent = document.querySelector('#main-content');
const docsSection = document.querySelector('.docs_main');
const docsScreen = document.querySelector('#docsScreen');
const aside = document.querySelector('aside');
const asideOveflowClass = 'lg:overflow-hidden';
docsSection.classList.remove(PROSE_CLASS);
mainContent.classList.add(PROSE_CLASS);
const menu = mainContent.querySelector('ul:first-of-type');

const buildStructuredMenus = (ul) => {
  return [...ul.querySelectorAll(':scope > li')].map(buildStructuredMenu);
};
const buildStructuredMenu = (li) => {
  const item = {};
  const anchor = li.querySelector(':scope > a');
  const subMenus = li.querySelector(':scope > ul');
  item.href = anchor.href;
  item.title = anchor.innerHTML;
  item.children = subMenus ? buildStructuredMenus(subMenus) : [];
  return item;
};

// -----------------------------Procedural----------------------------

const fixLayout = () => {
  document.body.setAttribute('style', 'height: 100vh!important');
  docsScreen.appendChild(document.querySelector('footer'));
  docsScreen.style.height = '100%';

  aside.classList.add('laranav__aside');
  aside
    .querySelector(`:scope > div > div.${CSS.escape(asideOveflowClass)}`)
    ?.classList.remove(asideOveflowClass);
};

const createLaraMenu = (ul) => {
  const laraMenu = ul.cloneNode(true);
  laraMenu.id = 'lara-menu';

  return laraMenu;
};

const init = () => {
  fixLayout();
  const laraMenu = createLaraMenu(menu);
  docsScreen.firstElementChild.appendChild(laraMenu);
  menu.classList.add('hidden');
};

init();
