(function() {
  var currentTask = 0;

  injectStyles();
  // Add embed class
  if (window.location.search.indexOf('embed') > 0) {
    createEmbedMode();
  }



  // Functions

  function changeTask($btnNext, $btnPrev, mod) {
    var newTask = currentTask + mod;

    var $sections = $$('section');
    $sections[currentTask].classList.remove('active');
    $sections[newTask].classList.add('active');

    var method = (newTask >= $sections.length - 1) ? 'add' : 'remove';
    $btnNext.classList[method]('hidden');
    method = (newTask <= 0) ? 'add' : 'remove';
    $btnPrev.classList[method]('hidden');

    currentTask = newTask;
  }

  function createEmbedMode() {
    $('html').classList.add('embed');
    // Add navigation
    createEmbedNavigation();
  }

  function createEmbedNavigation() {
    var $btnNext = $el('button.btn.btn-default.btn-xs.nav-next');
    var $btnPrev = $el('button.btn.btn-link.btn-xs.nav-prev');
    var $firstChild = $('.container > *:first-child');
    var $container = $('.container');
    $container.insertBefore($btnPrev, $firstChild);
    $container.insertBefore($btnNext, $firstChild);

    $btnNext.innerHTML = 'Next Task &rarr;';
    $btnPrev.innerHTML = '&larr;';

    $btnNext.addEventListener('click', changeTask.bind(null, $btnNext, $btnPrev, +1));
    $btnPrev.addEventListener('click', changeTask.bind(null, $btnNext, $btnPrev, -1));

    // activate first section
    changeTask($btnNext, $btnPrev, 0);

  }

  function injectStyles() {
    var styles = $el('link');
    styles.rel = 'stylesheet';
    styles.href = 'styles.css';
    $('head').appendChild(styles);
  }


  // Utils
  function $(sel) {
    return document.querySelector(sel);
  }

  function $$(sel) {
    return document.querySelectorAll(sel);
  }

  function $text(text) {
    return document.createTextNode(text);
  }
  function $el(name) {
    var parts = name.split('.');
    var tagName = parts[0];
    var el = document.createElement(tagName);
    el.className = parts.slice(1).join(' ');
    return el;
  }
}());
