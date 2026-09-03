document.addEventListener('DOMContentLoaded', () => {

  const sectionIds = ['hero', 'about', 'trajectory', 'projects', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id));
  const railButtons = document.querySelectorAll('.rail-nums button');

  railButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        railButtons.forEach(btn => {
          btn.classList.toggle('active', btn.dataset.target === id);
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(section => section && spyObserver.observe(section));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const TIMELINE_FILL_WIDTH = '82%';

  const timelineFill = document.getElementById('timelineFill');
  const timelineEl = document.getElementById('timeline');

  if (timelineFill && timelineEl) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineFill.style.width = TIMELINE_FILL_WIDTH;
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    timelineObserver.observe(timelineEl);
  }

  const tlItems = document.querySelectorAll('.tl-item:not(.future)');

  function setActiveItem(item) {
    const wasActive = item && item.classList.contains('active');

    tlItems.forEach(other => {
      other.classList.remove('active');
      const otherDot = other.querySelector('.tl-dot');
      if (otherDot) otherDot.setAttribute('aria-expanded', 'false');
    });

    if (item && !wasActive) {
      item.classList.add('active');
      const dot = item.querySelector('.tl-dot');
      if (dot) dot.setAttribute('aria-expanded', 'true');
    }

    if (timelineEl) {
      timelineEl.classList.toggle('has-active', !wasActive && !!item);
    }
  }

  tlItems.forEach(item => {
    const dot = item.querySelector('.tl-dot');
    if (!dot) return;

    dot.addEventListener('click', () => setActiveItem(item));

    dot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveItem(item);
      }
    });
  });

});
