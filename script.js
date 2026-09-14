// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Наблюдаем за всеми элементами с анимацией
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-scale');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Интерактивность карты - подсветка городов
    const cityDots = document.querySelectorAll('.city-dot');
    cityDots.forEach(dot => {
        dot.addEventListener('mouseenter', function() {
            const cityName = this.getAttribute('data-city');
            this.setAttribute('r', '6');

            // Создаём всплывающую подсказку
            const tooltip = document.createElement('div');
            tooltip.className = 'city-tooltip';
            tooltip.textContent = cityName;
            tooltip.style.cssText = `
                position: fixed;
                background: var(--accent-gold);
                color: white;
                padding: 8px 15px;
                border-radius: 8px;
                font-size: 0.9rem;
                font-weight: 600;
                pointer-events: none;
                z-index: 1000;
                box-shadow: 0 5px 15px rgba(212, 165, 116, 0.4);
            `;
            document.body.appendChild(tooltip);

            this.addEventListener('mousemove', (e) => {
                tooltip.style.left = (e.clientX + 15) + 'px';
                tooltip.style.top = (e.clientY + 15) + 'px';
            });
        });

        dot.addEventListener('mouseleave', function() {
            this.setAttribute('r', '4');
            const tooltip = document.querySelector('.city-tooltip');
            if (tooltip) tooltip.remove();
        });
    });

    // Анимация бейджей квалификации
    const badges = document.querySelectorAll('.badge');
    badges.forEach((badge, index) => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'scale(1.1) translateY(-5px)';
        });
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = '';
        });
    });

    // Дополнительная анимация для глобуса при наведении
    const globe = document.querySelector('.globe');
    if (globe) {
        globe.addEventListener('mouseenter', () => {
            globe.style.animationDuration = '10s';
            globe.style.transform = 'scale(1.1)';
        });
        globe.addEventListener('mouseleave', () => {
            globe.style.animationDuration = '20s';
            globe.style.transform = '';
        });
    }

    // Интерактивность флагов стран
    const countryTags = document.querySelectorAll('.country-tag');
    countryTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.15)';
            tag.style.boxShadow = '0 5px 15px var(--shadow-soft)';
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = '';
            tag.style.boxShadow = '';
        });
    });

    // Запускаем анимацию карточек с задержкой
    const staggerElements = document.querySelectorAll('.stagger-fade');
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    staggerElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        staggerObserver.observe(element);
    });

    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Параллакс-эффект для фона
    const parallaxBg = document.getElementById('parallaxBg');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;

                // Параллакс для основного фона
                if (parallaxBg) {
                    parallaxBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                }

                // Параллакс для секционных фонов
                const sectionBgs = document.querySelectorAll('.section-bg');
                sectionBgs.forEach((bg, index) => {
                    const speed = 0.3 + (index * 0.1);
                    const yPos = -(scrolled * speed);
                    bg.style.transform = `translateY(${yPos}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    });

    // Эффект наведения с курсором для карточек
    const cards = document.querySelectorAll('.service-card, .team-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Анимация счётчика для номера телефона
    const phoneNumber = document.querySelector('.phone-number');
    if (phoneNumber) {
        phoneNumber.addEventListener('mouseenter', () => {
            phoneNumber.style.animation = 'none';
            setTimeout(() => {
                phoneNumber.style.animation = 'phoneGlow 1s ease-in-out';
            }, 10);
        });
    }

    // Добавляем динамическое свечение при скролле
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        lastScrollTop = scrollTop;

        // Изменяем интенсивность фона в зависимости от прокрутки
        if (parallaxBg) {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / maxScroll;
            const opacity = 0.08 - (scrollPercent * 0.03);
            parallaxBg.style.opacity = Math.max(0.05, opacity);
        }
    }, { passive: true });

    // Предзагрузка изображений
    const preloadImages = [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80',
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
        'foto.jpeg'
    ];

    preloadImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Добавляем анимацию загрузки для фото
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.addEventListener('load', () => {
            profilePhoto.style.animation = 'photoFloat 6s ease-in-out infinite';
        });
    }

    // Эффект мерцания для логотипа компании
    const logoText = document.querySelector('.logo-text');
    if (logoText) {
        setInterval(() => {
            logoText.style.animation = 'none';
            setTimeout(() => {
                logoText.style.animation = 'logoGlow 3s ease-in-out infinite';
            }, 10);
        }, 10000);
    }

    // Добавляем интерактивность к кнопкам
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transition = 'all 0.3s ease';
        });
    });
});

// Lazy loading для фоновых изображений
if ('IntersectionObserver' in window) {
    const bgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bg = entry.target;
                if (bg.dataset.bg) {
                    bg.style.backgroundImage = `url(${bg.dataset.bg})`;
                }
                bgObserver.unobserve(bg);
            }
        });
    });

    document.querySelectorAll('.section-bg').forEach(bg => {
        bgObserver.observe(bg);
    });
}

// Обработка видимости элементов при ресайзе
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Пересчитываем позиции при изменении размера окна
        const allCards = document.querySelectorAll('.service-card, .team-card');
        allCards.forEach(card => {
            card.style.transform = '';
        });
    }, 250);
});
