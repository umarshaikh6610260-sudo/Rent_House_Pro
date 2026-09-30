
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const menuBtn = document.querySelector('.menu-btn');
  const overlay = document.querySelector('.mobile-overlay');
  if (menuBtn) menuBtn.addEventListener('click', () => sidebar?.classList.toggle('open'));
  if (overlay) overlay.addEventListener('click', () => sidebar?.classList.remove('open'));

  const themeBtn = document.querySelector('[data-theme-toggle]');
  const savedTheme = localStorage.getItem('rms-theme');
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  themeBtn?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('rms-theme', next);
    toast(`${next === 'dark' ? 'Dark' : 'Light'} mode enabled`, 'success');
  });

  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', () => document.querySelector(btn.dataset.modalOpen)?.classList.add('open'));
  });
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.modal-backdrop')?.classList.remove('open'));
  });
  document.querySelectorAll('.modal-backdrop').forEach(bg => {
    bg.addEventListener('click', e => { if (e.target === bg) bg.classList.remove('open'); });
  });

  document.querySelectorAll('[data-confirm]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm(btn.dataset.confirm)) toast('Action confirmed', 'success');
    });
  });

  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      toast(form.dataset.success || 'Changes saved successfully', 'success');
      form.closest('.modal-backdrop')?.classList.remove('open');
    });
  });

  document.querySelectorAll('[data-tabs]').forEach(group => {
    const tabs = group.querySelectorAll('.tab'), panels = group.parentElement.querySelectorAll('[data-tab-panel]');
    tabs.forEach(tab => tab.addEventListener('click', () => {
      tabs.forEach(x => x.classList.remove('active')); tab.classList.add('active');
      panels.forEach(p => p.hidden = p.dataset.tabPanel !== tab.dataset.tab);
    }));
  });

  document.querySelectorAll('[data-search-table]').forEach(input => {
    const table = document.querySelector(input.dataset.searchTable);
    if (!table) return;
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase();
      table.querySelectorAll('tbody tr').forEach(row => row.style.display = row.innerText.toLowerCase().includes(q) ? '' : 'none');
    });
  });

  document.querySelectorAll('[data-sort-table]').forEach(table => {
    table.querySelectorAll('th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const idx = [...th.parentNode.children].indexOf(th), rows = [...table.tBodies[0].rows];
        const asc = th.dataset.dir !== 'asc'; th.dataset.dir = asc ? 'asc' : 'desc';
        rows.sort((a, b) => a.cells[idx].innerText.localeCompare(b.cells[idx].innerText, undefined, { numeric: true, sensitivity: 'base' }));
        if (!asc) rows.reverse(); rows.forEach(r => table.tBodies[0].appendChild(r));
      });
    });
  });
});
function toast(message, type = 'success') {
  let wrap = document.querySelector('.toast-wrap');
  if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toast-wrap'; document.body.appendChild(wrap); }
  const el = document.createElement('div'); el.className = `toast ${type}`; el.textContent = message; wrap.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}
function openModal(id) { document.getElementById(id)?.classList.add('open') }
function closeModal(id) { document.getElementById(id)?.classList.remove('open') }
