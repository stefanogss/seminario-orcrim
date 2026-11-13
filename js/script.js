(function () {
  'use strict';

  /* ---------- Menu mobile ---------- */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Abas da programação ---------- */
  var tabButtons = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');
  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');
      tabButtons.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      tabPanels.forEach(function (panel) {
        panel.classList.toggle('is-active', panel.id === 'tab-' + target);
      });
    });
  });

  /* ---------- Contagem regressiva ---------- */
  var cd = document.getElementById('countdown');
  var start = new Date(cd.getAttribute('data-target'));
  var end = new Date(cd.getAttribute('data-end'));
  var el = {
    d: document.getElementById('cdDays'),
    dl: document.getElementById('cdDaysLabel'),
    h: document.getElementById('cdHours'),
    m: document.getElementById('cdMinutes'),
    s: document.getElementById('cdSeconds'),
    status: document.getElementById('cdStatus')
  };
  function pad(n) { return String(n).padStart(2, '0'); }

  // Dias de calendário restantes (no fuso de Florianópolis, UTC-3)
  function calendarDaysLeft(now) {
    var brNow = new Date(now.getTime() - 3 * 3600 * 1000);
    var todayUTC = Date.UTC(brNow.getUTCFullYear(), brNow.getUTCMonth(), brNow.getUTCDate());
    return Math.round((Date.UTC(2026, 11, 4) - todayUTC) / 86400000);
  }

  function tick() {
    var now = new Date();
    var diff = start - now;
    if (diff > 0) {
      var sec = Math.floor(diff / 1000);
      var days = Math.floor(sec / 86400);
      el.d.textContent = days;
      el.dl.textContent = days === 1 ? 'dia' : 'dias';
      el.h.textContent = pad(Math.floor(sec % 86400 / 3600));
      el.m.textContent = pad(Math.floor(sec % 3600 / 60));
      el.s.textContent = pad(sec % 60);
      var cal = calendarDaysLeft(now);
      el.status.innerHTML = cal === 0
        ? '<strong>É hoje!</strong> O credenciamento começa às 8h.'
        : cal === 1
          ? '<strong>É amanhã!</strong> Garanta sua inscrição.'
          : 'Contagem até <strong>04/12/2026, às 8h</strong> (horário de Brasília).';
    } else {
      el.d.textContent = '0'; el.h.textContent = '00'; el.m.textContent = '00'; el.s.textContent = '00';
      el.status.innerHTML = now < end
        ? '<strong>O seminário está acontecendo agora!</strong>'
        : 'O seminário foi realizado em 04/12/2026. Obrigado pela participação!';
      if (now >= end) { clearInterval(timer); }
    }
  }
  var timer = setInterval(tick, 1000);
  tick();

  /* ---------- Calendário: do mês atual até dezembro/2026 ---------- */
  var calEl = document.getElementById('calendar');
  var MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  var dows = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  var EVENT_KEY = 20261204;
  var nowBR = new Date(Date.now() - 3 * 3600 * 1000);
  var todayKey = nowBR.getUTCFullYear() * 10000 + (nowBR.getUTCMonth() + 1) * 100 + nowBR.getUTCDate();

  // Mostra no máximo os dois últimos meses (ex.: novembro e dezembro)
  var y = nowBR.getUTCFullYear(), m = nowBR.getUTCMonth();
  if (y * 12 + m > 2026 * 12 + 11 || y * 12 + m < 2026 * 12 + 10) { y = 2026; m = 10; }
  if (todayKey > EVENT_KEY) { y = 2026; m = 11; }

  var out = '';
  while (y * 12 + m <= 2026 * 12 + 11) {
    var html = '<div class="calendar-month-block"><div class="calendar-head"><span class="calendar-month">' + MONTHS[m] + '</span><span class="calendar-year">' + y + '</span></div>';
    html += '<div class="calendar" role="grid" aria-label="Calendário de ' + MONTHS[m].toLowerCase() + ' de ' + y + '">';
    html += dows.map(function (d) { return '<span class="cal-dow" role="columnheader">' + d + '</span>'; }).join('');
    var first = new Date(y, m, 1).getDay();
    var total = new Date(y, m + 1, 0).getDate();
    for (var i = 0; i < first; i++) html += '<span></span>';
    for (var d = 1; d <= total; d++) {
      var key = y * 10000 + (m + 1) * 100 + d;
      var cls = ['cal-day'];
      var label = d + ' de ' + MONTHS[m].toLowerCase();
      if (key === EVENT_KEY) { cls.push('is-event'); label += ' — dia do seminário'; }
      if (key === todayKey) { cls.push('is-today'); label += ' — hoje'; }
      else if (key < todayKey) cls.push('is-past');
      else if (key < EVENT_KEY) cls.push('is-countdown');
      html += '<span class="' + cls.join(' ') + '" role="gridcell" aria-label="' + label + '">' + d + '</span>';
    }
    out += html + '</div></div>';
    m++; if (m > 11) { m = 0; y++; }
  }
  calEl.innerHTML = out;

  /* ---------- Arquivo .ics (Outlook / Apple) ---------- */
  document.getElementById('icsBtn').addEventListener('click', function () {
    var ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//MPSC//Seminario Orcrim//PT', 'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'UID:seminario-orcrim-2026@mpsc',
      'DTSTAMP:20261111T000000Z',
      'DTSTART:20261204T110000Z',
      'DTEND:20261204T203000Z',
      'SUMMARY:II Seminário de Enfrentamento às Organizações Criminosas',
      'LOCATION:Auditório - Edifício Sede do MPSC\\, Rua Bocaiúva\\, 1792\\, Centro\\, Florianópolis/SC',
      'DESCRIPTION:Integração e ação contra o crime organizado.\\nInscrições: https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=VIlUl1z9EUSwfE3ERXWcmonFNWncPJJNrz2nE5bO99xUM09IWEE4SVYzSzY1NDdDNVhDMzJTVkpLRC4u',
      'URL:https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=VIlUl1z9EUSwfE3ERXWcmonFNWncPJJNrz2nE5bO99xUM09IWEE4SVYzSzY1NDdDNVhDMzJTVkpLRC4u',
      'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', 'DESCRIPTION:Amanhã: II Seminário de Enfrentamento às Organizações Criminosas', 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'seminario-organizacoes-criminosas.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
})();
