'use strict';
const filter = document.getElementById('fight-filter');
const rows = [...document.querySelectorAll('tr[data-fight]')];
const sections = [...document.querySelectorAll('.audit-section')];
const selected = new URLSearchParams(location.search).get('fight');
if (selected && [...filter.options].some(option => option.value === selected)) filter.value = selected;
function applyFilter() {
  for (const row of rows) row.hidden = Boolean(filter.value && row.dataset.fight !== filter.value);
  for (const section of sections) {
    const tables = [...section.querySelectorAll('.scroll-table')];
    for (const table of tables) table.hidden = !table.querySelector('tr[data-fight]:not([hidden])');
    let empty = section.querySelector('.empty-fight');
    if (!empty) {
      empty = document.createElement('p');
      empty.className = 'empty-fight';
      empty.textContent = '这一把在本模块没有列出专项记录。';
      section.append(empty);
    }
    empty.hidden = tables.some(table => !table.hidden);
  }
  document.getElementById('filter-state').textContent = filter.value ? '正在查看 F' + filter.value : '正在查看 F15–F23';
}
filter.addEventListener('change', applyFilter);
document.getElementById('reset').addEventListener('click', () => { filter.value = ''; applyFilter(); });
applyFilter();
