/**
 * ==========================================================================
 * ThinkNEXT Training — Premium EdTech & Technology Company Core Script
 * Pure Vanilla JavaScript (No jQuery / No External Frameworks)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initStickyHeader();
  initMobileNavigation();
  initMegaMenu();
  initAwardsSlider();
  initTestimonialsSlider();
  initMediaSlider();
  initCounters();
  initScrollReveal();
  initBackToTop();
  initCourseSearchAndFilter();
  initTabsSystem();
  initFaqAccordion();
  initFormScrollParallax();
  initKeyBindings();
});

/* ==================== HERO IMAGE SLIDER ENGINE ==================== */
let currentHeroIndex = 0;
let heroSlideTimer = null;

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('heroSliderDots');
  if (!slides.length) return;

  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `h-2 rounded-full transition-all ${idx === 0 ? 'bg-amber-400 w-8' : 'bg-white/60 w-2 hover:bg-white'}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.onclick = () => goToHeroSlide(idx);
      dotsContainer.appendChild(dot);
    });
  }

  showHeroSlide(0);
  startHeroAutoPlay();

  const sliderSection = document.getElementById('heroSliderSection');
  if (sliderSection) {
    sliderSection.addEventListener('mouseenter', stopHeroAutoPlay);
    sliderSection.addEventListener('mouseleave', startHeroAutoPlay);
  }
}

function showHeroSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('#heroSliderDots button');
  if (!slides.length) return;

  if (index >= slides.length) currentHeroIndex = 0;
  else if (index < 0) currentHeroIndex = slides.length - 1;
  else currentHeroIndex = index;

  slides.forEach((slide, idx) => {
    if (idx === currentHeroIndex) {
      slide.classList.add('active');
      slide.classList.remove('opacity-0', 'invisible');
      slide.classList.add('opacity-100', 'visible');
    } else {
      slide.classList.remove('active');
      slide.classList.remove('opacity-100', 'visible');
      slide.classList.add('opacity-0', 'invisible');
    }
  });

  dots.forEach((dot, idx) => {
    if (idx === currentHeroIndex) {
      dot.className = 'h-2 rounded-full bg-amber-400 w-8 transition-all';
    } else {
      dot.className = 'h-2 rounded-full bg-white/60 w-2 hover:bg-white transition-all';
    }
  });
}

function nextHeroSlide() { showHeroSlide(currentHeroIndex + 1); }
function prevHeroSlide() { showHeroSlide(currentHeroIndex - 1); }
function goToHeroSlide(idx) {
  showHeroSlide(idx);
  stopHeroAutoPlay();
  startHeroAutoPlay();
}
function startHeroAutoPlay() {
  stopHeroAutoPlay();
  heroSlideTimer = setInterval(nextHeroSlide, 4500);
}
function stopHeroAutoPlay() {
  if (heroSlideTimer) clearInterval(heroSlideTimer);
}


/* ==================== 1. STICKY HEADER & SCROLL BEHAVIOR ==================== */
function initStickyHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-lg', 'bg-white/95', 'backdrop-blur-md', 'py-1');
      header.classList.remove('bg-white', 'py-2');
    } else {
      header.classList.remove('shadow-lg', 'bg-white/95', 'backdrop-blur-md', 'py-1');
      header.classList.add('bg-white', 'py-2');
    }
  }, { passive: true });
}

/* ==================== 2. MOBILE NAVIGATION DRAWER ==================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const closeBtn = document.getElementById('closeMobileNav');
  const overlay = document.getElementById('mobileNavOverlay');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.remove('-translate-x-full');
    if (overlay) {
      overlay.classList.remove('hidden');
      setTimeout(() => overlay.classList.add('opacity-100'), 10);
    }
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.add('-translate-x-full');
    if (overlay) {
      overlay.classList.remove('opacity-100');
      setTimeout(() => overlay.classList.add('hidden'), 200);
    }
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // Close when clicking mobile anchor links
  drawer.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==================== 3. MEGA MENU HOVER & KEYBOARD ACCESSIBILITY ==================== */
function initMegaMenu() {
  const megaMenuBtn = document.getElementById('megaMenuTrigger');
  const megaMenuDropdown = document.getElementById('megaMenuDropdown');
  if (!megaMenuBtn || !megaMenuDropdown) return;

  let timeout;

  const showMenu = () => {
    clearTimeout(timeout);
    megaMenuDropdown.classList.remove('opacity-0', 'pointer-events-none', 'invisible', 'translate-y-2');
    megaMenuDropdown.classList.add('opacity-100', 'pointer-events-auto', 'visible', 'translate-y-0');
    megaMenuBtn.setAttribute('aria-expanded', 'true');
  };

  const hideMenu = () => {
    timeout = setTimeout(() => {
      megaMenuDropdown.classList.remove('opacity-100', 'pointer-events-auto', 'visible', 'translate-y-0');
      megaMenuDropdown.classList.add('opacity-0', 'pointer-events-none', 'invisible', 'translate-y-2');
      megaMenuBtn.setAttribute('aria-expanded', 'false');
    }, 150);
  };

  megaMenuBtn.addEventListener('mouseenter', showMenu);
  megaMenuBtn.addEventListener('mouseleave', hideMenu);
  megaMenuDropdown.addEventListener('mouseenter', showMenu);
  megaMenuDropdown.addEventListener('mouseleave', hideMenu);

  megaMenuBtn.addEventListener('focus', showMenu);
  megaMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (megaMenuDropdown.classList.contains('opacity-100')) hideMenu();
    else showMenu();
  });
}

/* ==================== 4. 8-TIMES NATIONAL AWARDS SLIDER ==================== */
let currentAwardSlide = 0;
let awardInterval = null;

function initAwardsSlider() {
  const slides = document.querySelectorAll('.award-slide');
  const dotsContainer = document.getElementById('awardsSliderDots');
  if (!slides.length) return;

  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `h-2 rounded-full transition-all ${idx === 0 ? 'bg-[#F4A62A] w-8' : 'bg-slate-300 w-2 hover:bg-slate-400'}`;
      dot.setAttribute('aria-label', `Go to award slide ${idx + 1}`);
      dot.onclick = () => goToAwardSlide(idx);
      dotsContainer.appendChild(dot);
    });
  }

  showAwardSlide(0);
  startAwardAutoPlay();

  const container = document.getElementById('awardsCarouselContainer');
  if (container) {
    container.addEventListener('mouseenter', stopAwardAutoPlay);
    container.addEventListener('mouseleave', startAwardAutoPlay);
  }
}

function showAwardSlide(idx) {
  const slides = document.querySelectorAll('.award-slide');
  const dots = document.querySelectorAll('#awardsSliderDots button');
  if (!slides.length) return;

  if (idx >= slides.length) currentAwardSlide = 0;
  else if (idx < 0) currentAwardSlide = slides.length - 1;
  else currentAwardSlide = idx;

  slides.forEach((slide, i) => {
    if (i === currentAwardSlide) {
      slide.classList.remove('hidden', 'opacity-0');
      slide.classList.add('block', 'opacity-100');
    } else {
      slide.classList.add('hidden', 'opacity-0');
      slide.classList.remove('block', 'opacity-100');
    }
  });

  dots.forEach((dot, i) => {
    if (i === currentAwardSlide) {
      dot.className = 'h-2 rounded-full bg-[#F4A62A] w-8 transition-all';
    } else {
      dot.className = 'h-2 rounded-full bg-slate-300 w-2 hover:bg-slate-400 transition-all';
    }
  });
}

function nextAwardSlide() { showAwardSlide(currentAwardSlide + 1); }
function prevAwardSlide() { showAwardSlide(currentAwardSlide - 1); }
function goToAwardSlide(idx) {
  showAwardSlide(idx);
  stopAwardAutoPlay();
  startAwardAutoPlay();
}
function startAwardAutoPlay() {
  stopAwardAutoPlay();
  awardInterval = setInterval(nextAwardSlide, 4500);
}
function stopAwardAutoPlay() {
  if (awardInterval) clearInterval(awardInterval);
}

/* ==================== 5. TESTIMONIALS SLIDER (5s Auto-play) ==================== */
let currentTestimonial = 0;
let testimonialInterval = null;

function initTestimonialsSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.getElementById('testimonialDots');
  if (!slides.length) return;

  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `h-2 rounded-full transition-all ${idx === 0 ? 'bg-[#F4A62A] w-8' : 'bg-slate-400 w-2 hover:bg-slate-300'}`;
      dot.setAttribute('aria-label', `Testimonial slide ${idx + 1}`);
      dot.onclick = () => goToTestimonial(idx);
      dotsContainer.appendChild(dot);
    });
  }

  showTestimonial(0);
  startTestimonialAutoPlay();

  const container = document.getElementById('testimonialsContainer');
  if (container) {
    container.addEventListener('mouseenter', stopTestimonialAutoPlay);
    container.addEventListener('mouseleave', startTestimonialAutoPlay);
  }
}

function showTestimonial(idx) {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('#testimonialDots button');
  if (!slides.length) return;

  if (idx >= slides.length) currentTestimonial = 0;
  else if (idx < 0) currentTestimonial = slides.length - 1;
  else currentTestimonial = idx;

  slides.forEach((slide, i) => {
    if (i === currentTestimonial) {
      slide.classList.remove('hidden', 'opacity-0');
      slide.classList.add('block', 'opacity-100');
    } else {
      slide.classList.add('hidden', 'opacity-0');
      slide.classList.remove('block', 'opacity-100');
    }
  });

  dots.forEach((dot, i) => {
    if (i === currentTestimonial) {
      dot.className = 'h-2 rounded-full bg-[#F4A62A] w-8 transition-all';
    } else {
      dot.className = 'h-2 rounded-full bg-slate-400 w-2 hover:bg-slate-300 transition-all';
    }
  });
}

function nextTestimonial() { showTestimonial(currentTestimonial + 1); }
function prevTestimonial() { showTestimonial(currentTestimonial - 1); }
function goToTestimonial(idx) {
  showTestimonial(idx);
  stopTestimonialAutoPlay();
  startTestimonialAutoPlay();
}
function startTestimonialAutoPlay() {
  stopTestimonialAutoPlay();
  testimonialInterval = setInterval(nextTestimonial, 5000);
}
function stopTestimonialAutoPlay() {
  if (testimonialInterval) clearInterval(testimonialInterval);
}

/* ==================== 6. MEDIA SLIDER ==================== */
let currentMediaSlide = 0;
function initMediaSlider() {
  const slides = document.querySelectorAll('.media-slide');
  if (!slides.length) return;
  showMediaSlide(0);
}
function showMediaSlide(idx) {
  const slides = document.querySelectorAll('.media-slide');
  if (!slides.length) return;
  if (idx >= slides.length) currentMediaSlide = 0;
  else if (idx < 0) currentMediaSlide = slides.length - 1;
  else currentMediaSlide = idx;

  slides.forEach((s, i) => {
    if (i === currentMediaSlide) {
      s.classList.remove('hidden');
      s.classList.add('block');
    } else {
      s.classList.add('hidden');
      s.classList.remove('block');
    }
  });
}
function nextMediaSlide() { showMediaSlide(currentMediaSlide + 1); }
function prevMediaSlide() { showMediaSlide(currentMediaSlide - 1); }

/* ==================== 7. ANIMATED NUMBER COUNTERS (IntersectionObserver) ==================== */
function initCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseFloat(el.getAttribute('data-counter'));
        const isDecimal = el.getAttribute('data-decimal') === 'true';
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        
        let start = 0;
        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const currentVal = start + (targetVal - start) * easeOutQuad(progress);
          
          el.textContent = `${prefix}${isDecimal ? currentVal.toFixed(2) : Math.floor(currentVal)}${suffix}`;
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = `${prefix}${isDecimal ? targetVal.toFixed(2) : targetVal}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counterElements.forEach(el => observer.observe(el));
}

function easeOutQuad(t) {
  return t * (2 - t);
}

/* ==================== 8. SCROLL REVEAL ANIMATION ENGINE ==================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

/* ==================== 9. BACK TO TOP BUTTON ==================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
      btn.classList.add('opacity-100', 'visible', 'translate-y-0');
    } else {
      btn.classList.remove('opacity-100', 'visible', 'translate-y-0');
      btn.classList.add('opacity-0', 'invisible', 'translate-y-4');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==================== 10. COURSE SEARCH & FILTER ENGINE ==================== */
let activeCourseCategory = 'all';

function initCourseSearchAndFilter() {
  const searchInput = document.getElementById('courseSearchInput');
  const filterTabs = document.querySelectorAll('#courseFilterTabs button');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      applyCourseFilterAndSearch();
    });
  }

  filterTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      filterTabs.forEach(b => {
        b.classList.remove('bg-[#0B1F3A]', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });
      btn.classList.add('bg-[#0B1F3A]', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

      activeCourseCategory = btn.getAttribute('data-filter') || 'all';
      applyCourseFilterAndSearch();
    });
  });
}

function applyCourseFilterAndSearch() {
  const searchInput = document.getElementById('courseSearchInput');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const cards = document.querySelectorAll('.course-item-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
    const cardName = (card.getAttribute('data-name') || '').toLowerCase();
    const cardTitle = (card.querySelector('h3') ? card.querySelector('h3').textContent : '').toLowerCase();
    const cardDesc = (card.querySelector('p') ? card.querySelector('p').textContent : '').toLowerCase();

    const matchesCategory = activeCourseCategory === 'all' || cardCat.includes(activeCourseCategory);
    const matchesSearch = query === '' || cardName.includes(query) || cardTitle.includes(query) || cardDesc.includes(query);

    if (matchesCategory && matchesSearch) {
      card.classList.remove('hidden');
      card.classList.add('flex');
      visibleCount++;
    } else {
      card.classList.add('hidden');
      card.classList.remove('flex');
    }
  });

  const noResults = document.getElementById('noCoursesFound');
  if (noResults) {
    if (visibleCount === 0) noResults.classList.remove('hidden');
    else noResults.classList.add('hidden');
  }
}

function resetCourseFilters() {
  const searchInput = document.getElementById('courseSearchInput');
  if (searchInput) searchInput.value = '';
  const firstTab = document.querySelector('#courseFilterTabs button[data-filter="all"]');
  if (firstTab) firstTab.click();
}

/* ==================== 11. GENERAL TAB SYSTEM (Projects, Audience, Streams) ==================== */
function initTabsSystem() {
  // Live Project Tabs
  const projectTabs = document.querySelectorAll('#projectTabs button');
  projectTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      projectTabs.forEach(b => {
        b.classList.remove('bg-[#0B1F3A]', 'text-white');
        b.classList.add('bg-slate-100', 'text-slate-700');
      });
      btn.classList.add('bg-[#0B1F3A]', 'text-white');
      btn.classList.remove('bg-slate-100', 'text-slate-700');

      document.querySelectorAll('.project-tab-pane').forEach(pane => {
        pane.classList.add('hidden');
      });
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.remove('hidden');
    });
  });

  // Audience Category Tabs
  const audienceTabs = document.querySelectorAll('#audienceTabs button');
  audienceTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-audience');
      audienceTabs.forEach(b => {
        b.classList.remove('border-[#F4A62A]', 'text-[#0B1F3A]', 'bg-amber-50/50', 'font-extrabold');
        b.classList.add('border-transparent', 'text-slate-600', 'font-semibold');
      });
      btn.classList.add('border-[#F4A62A]', 'text-[#0B1F3A]', 'bg-amber-50/50', 'font-extrabold');
      btn.classList.remove('border-transparent', 'text-slate-600', 'font-semibold');

      document.querySelectorAll('.audience-pane').forEach(p => p.classList.add('hidden'));
      const activePane = document.getElementById(targetId);
      if (activePane) activePane.classList.remove('hidden');
    });
  });
}

function switchStreamTab(tabKey, btnElement) {
  document.querySelectorAll('.stream-content-pane').forEach(el => el.classList.add('hidden'));
  const target = document.getElementById(`stream_pane_${tabKey}`);
  if (target) target.classList.remove('hidden');

  const buttons = document.querySelectorAll('#streamTabNav button');
  buttons.forEach(btn => {
    btn.classList.remove('bg-[#0B1F3A]', 'text-white', 'shadow-md');
    btn.classList.add('bg-white', 'text-slate-700');
  });

  if (btnElement) {
    btnElement.classList.remove('bg-white', 'text-slate-700');
    btnElement.classList.add('bg-[#0B1F3A]', 'text-white', 'shadow-md');
  }
}

/* ==================== 12. FAQ ACCORDION ==================== */
function initFaqAccordion() {
  document.querySelectorAll('.faq-accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      const body = parent.querySelector('.faq-body');
      const icon = btn.querySelector('.faq-icon');
      const isOpen = !body.classList.contains('hidden');

      // Close all other accordions
      document.querySelectorAll('.faq-item .faq-body').forEach(b => b.classList.add('hidden'));
      document.querySelectorAll('.faq-item .faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

      if (!isOpen) {
        body.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ==================== 13. MODAL ENGINE ==================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  if (modalId === 'videoModal') {
    const iframe = document.getElementById('videoModalIframe');
    if (iframe) iframe.src = '';
  }
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

function openVideoModal(videoSrc, title) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoModalIframe');
  const titleEl = document.getElementById('videoModalTitle');
  if (!modal || !iframe) return;
  
  let src = videoSrc || '';
  if (!src.includes('autoplay=')) {
    src += (src.includes('?') ? '&' : '?') + 'autoplay=1&rel=0';
  }
  iframe.src = src;
  if (titleEl && title) {
    titleEl.textContent = title;
  }
  
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  closeModal('videoModal');
}

/* ==================== 13B. IMAGE LIGHTBOX ENGINE ==================== */
function openImageLightbox(src, title) {
  const modal = document.getElementById('imageLightboxModal');
  const img = document.getElementById('imageLightboxImg');
  const titleEl = document.getElementById('imageLightboxTitle');
  
  if (!modal || !img) return;

  img.src = src;
  if (titleEl && title) {
    titleEl.textContent = title;
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeImageLightbox() {
  closeModal('imageLightboxModal');
}

/* ==================== 13C. AWARDS & CAMPUS GALLERY FILTER ==================== */
function filterAwardsGallery(category) {
  const items = document.querySelectorAll('#awardsGalleryGrid .gallery-item');
  const buttons = document.querySelectorAll('.gallery-filter-btn');

  // Update button active state
  buttons.forEach(btn => {
    if (btn.getAttribute('data-filter') === category) {
      btn.classList.add('bg-primary', 'text-white', 'shadow-md', 'active');
      btn.classList.remove('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
    } else {
      btn.classList.remove('bg-primary', 'text-white', 'shadow-md', 'active');
      btn.classList.add('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
    }
  });

  // Filter items
  items.forEach(item => {
    const itemCat = item.getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      item.style.display = '';
      item.classList.remove('hidden');
    } else {
      item.style.display = 'none';
      item.classList.add('hidden');
    }
  });
}

function initKeyBindings() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const videoIframe = document.getElementById('videoModalIframe');
      if (videoIframe) videoIframe.src = '';
      
      document.querySelectorAll('.modal-backdrop:not(.hidden)').forEach(modal => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      });
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      const videoIframe = document.getElementById('videoModalIframe');
      if (videoIframe) videoIframe.src = '';

      e.target.classList.add('hidden');
      e.target.classList.remove('flex');
      document.body.style.overflow = '';
    }
  });
}

function openEnrollModal(courseName) {
  const select = document.getElementById('modalDemoCourse');
  if (select) {
    let matched = false;
    for (let opt of select.options) {
      if (opt.value.toLowerCase().includes(courseName.toLowerCase()) || courseName.toLowerCase().includes(opt.value.toLowerCase())) {
        opt.selected = true;
        matched = true;
        break;
      }
    }
    if (!matched) {
      const newOpt = new Option(courseName, courseName, true, true);
      select.add(newOpt);
    }
  }
  openModal('demoModal');
}

function openCourseDetailsModal(title, description, duration, prerequisites) {
  const titleEl = document.getElementById('courseDetailTitle');
  const descEl = document.getElementById('courseDetailDesc');
  const durEl = document.getElementById('courseDetailDuration');
  const reqEl = document.getElementById('courseDetailPrereq');

  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = description;
  if (durEl) durEl.textContent = duration || '6 Months / 3 Months / 6 Weeks';
  if (reqEl) reqEl.textContent = prerequisites || 'Basic Computer Knowledge / Stream Background';

  openModal('courseDetailModal');
}

/* ==================== 14. FORM VALIDATION & SUBMISSION ENGINE ==================== */
function handleFormSubmit(event, formType) {
  event.preventDefault();
  const form = event.target;

  // Validate mobile number (Exact 10 Indian digits)
  const phoneInput = form.querySelector('input[type="tel"]');
  if (phoneInput) {
    const phoneVal = phoneInput.value.replace(/\D/g, '');
    if (phoneVal.length !== 10) {
      showToast('Please enter a valid 10-digit mobile number.', 'error');
      phoneInput.focus();
      phoneInput.setAttribute('aria-invalid', 'true');
      return false;
    } else {
      phoneInput.setAttribute('aria-invalid', 'false');
    }
  }

  // Validate email
  const emailInput = form.querySelector('input[type="email"]');
  if (emailInput && emailInput.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showToast('Please enter a valid email address.', 'error');
      emailInput.focus();
      emailInput.setAttribute('aria-invalid', 'true');
      return false;
    } else {
      emailInput.setAttribute('aria-invalid', 'false');
    }
  }

  // Show customized confirmation
  if (formType === 'Syllabus Download') {
    showToast('Thank you! Complete course syllabus PDF link has been sent to your email & WhatsApp.', 'success');
  } else if (formType === 'Free Demo') {
    showToast('Demo Class Booked! Our senior advisor will call you within 15 minutes to confirm slot.', 'success');
  } else if (formType === 'Scholarship Application') {
    showToast('Scholarship Registration Received! Test schedule & discount details sent to your phone.', 'success');
  } else {
    showToast(`Thank you! Your request for "${formType}" has been successfully submitted.`, 'success');
  }

  form.reset();

  // Close parent modal if inside one
  const parentModal = form.closest('.modal-backdrop');
  if (parentModal) {
    setTimeout(() => {
      parentModal.classList.add('hidden');
      parentModal.classList.remove('flex');
      document.body.style.overflow = '';
    }, 400);
  }

  return false;
}

/* ==================== 15. TOAST NOTIFICATION ENGINE ==================== */
function showToast(message, type = 'success') {
  const container = document.getElementById('toastNotificationContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-in flex items-center gap-3 p-4 max-w-md rounded-2xl shadow-2xl border text-xs font-semibold pointer-events-auto bg-white text-slate-800 ${
    type === 'success' 
      ? 'border-emerald-300 ring-2 ring-emerald-500/20' 
      : 'border-red-300 ring-2 ring-red-500/20'
  }`;

  const iconColor = type === 'success' ? 'text-emerald-600' : 'text-red-600';
  const iconClass = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation';

  toast.innerHTML = `
    <i class="${iconClass} ${iconColor} text-lg flex-shrink-0"></i>
    <div class="flex-1 leading-snug text-slate-800 font-medium">${message}</div>
    <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-slate-700 pl-2 focus:outline-none">
      <i class="fa-solid fa-xmark text-sm"></i>
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('toast-in');
    toast.classList.add('toast-out');
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 300);
  }, 5000);
}

/* ==================== 16. SMOOTH SCROLL PARALLAX FLOATING FORM ==================== */
function initFormScrollParallax() {
  const regForm = document.getElementById('regform');
  const overviewSection = document.getElementById('overview');
  if (!regForm || !overviewSection) return;

  let ticking = false;

  function updateParallax() {
    // Only apply dynamic parallax on desktop / laptop screens
    if (window.innerWidth >= 1024) {
      const rect = overviewSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const sectionHeight = rect.height;
        const visibleScrolled = windowHeight - rect.top;
        const progress = Math.min(Math.max(visibleScrolled / (windowHeight + sectionHeight), 0), 1);
        
        // Smoothly glides down as you scroll down, and up as you scroll up
        const translateY = (progress - 0.35) * 85;
        regForm.style.transform = `translate3d(0, ${translateY}px, 0)`;
        regForm.style.transition = 'transform 0.15s ease-out';
      }
    } else {
      regForm.style.transform = 'none';
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateParallax, { passive: true });
  updateParallax();
}

