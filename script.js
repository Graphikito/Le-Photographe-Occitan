/**
 * script.js - Documentation et configuration
 *
 * Contrat succinct :
 * - Inputs : les éléments DOM suivants (classes/ids) sont utilisés :
 *     .nav-links a  -> liens de navigation
 *     .hero-image-box, .portfolio-image -> éléments cliquables/animés
 *     section[id] -> sections pour nav active
 *     .gallery-section, .gallery-wrapper -> (sur la page portfolio)
 * - Outputs : animations (CSS inline), scroll fluide, effets visuels.
 * - Erreurs possibles : si un sélecteur n'existe pas, le code ignore silencieusement
 *   l'élément (par ex. `document.querySelector` retourne null).
 *
 * Options de configuration (modifiez ici pour personnaliser):
 * - observerOptions.threshold : pour ajuster quand déclencher les animations
 * - transition durations / delays : recherchez `0.8s` ou `${index * 0.2}s`
 * - setInterval(createFloatingParticle, 2000) : changer la fréquence des particules
 *
 * Pour désactiver un effet : commentez la ligne concernée (ex: setInterval(...)).
 */

// Smooth scrolling pour les liens de navigation
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

// Animation au scroll avec effet élégant
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptions);

// Appliquer l'animation aux éléments
document.addEventListener('DOMContentLoaded', () => {
    // Animation des images hero avec effet cascade
    const heroImages = document.querySelectorAll('.hero-image-box');
    heroImages.forEach((img, index) => {
        img.style.opacity = '0';
        img.style.transform = 'translateY(50px) scale(0.95)';
        img.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`;
        observer.observe(img);
    });

    // Animation des items portfolio
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px) scale(0.95)';
        item.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`;
        observer.observe(item);
    });

    // Animation des éléments de contact
    const contactItems = document.querySelectorAll('.contact-item, .contact-photo');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px) scale(0.95)';
        item.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.25}s`;
        observer.observe(item);
    });
});

// Initialiser les galeries infinies (portfolio.html)
document.addEventListener('DOMContentLoaded', () => {
    // S'assurer que toutes les galeries sont initialisées correctement
    const galleries = ['mariage-gallery', 'sport-gallery', 'portrait-gallery'];
    galleries.forEach(galleryId => {
        const wrapper = document.getElementById(galleryId);
        if (wrapper) {
            console.log('Initialisation de la galerie:', galleryId); // Debug
            initGalleryInfinite(wrapper);
        } else {
            console.error('Galerie non trouvée:', galleryId); // Debug
        }
    });
});

// Effet parallaxe sophistiqué sur le hero
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroTitle = document.querySelector('.hero-title');
            const heroSection = document.querySelector('.hero-section');
            
            if (heroTitle && heroSection && scrolled < window.innerHeight) {
                // Parallaxe du titre
                heroTitle.style.transform = `translateY(${scrolled * 0.4}px)`;
                heroTitle.style.opacity = Math.max(0, 1 - (scrolled / 400));
                
                // Effet de zoom léger sur la section hero
                const scale = 1 + (scrolled / window.innerHeight) * 0.1;
                heroSection.style.transform = `scale(${scale})`;
            }
            
            ticking = false;
        });
        ticking = true;
    }
});

// Effet de curseur personnalisé sur les images
const createRipple = (event, element) => {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(212, 165, 116, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
};

// Style pour l'animation ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

document.querySelectorAll('.hero-image-box, .portfolio-image').forEach(img => {
    img.style.position = 'relative';
    img.style.cursor = 'pointer';
    
    img.addEventListener('click', function(e) {
        createRipple(e, this);
    });
});

// Navigation active au scroll avec transition douce
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

const updateActiveLink = () => {
    let current = '';
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 250;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.fontWeight = 'normal';
        link.style.color = '#5a5a5a';
        
        if (link.getAttribute('href').slice(1) === current) {
            link.style.fontWeight = 'bold';
            link.style.color = '#d4a574';
        }
    });
};

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// Effet de particules subtiles (optionnel)
const createFloatingParticle = () => {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.borderRadius = '50%';
    particle.style.background = 'rgba(212, 165, 116, 0.3)';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.bottom = '0';
    particle.style.pointerEvents = 'none';
    particle.style.animation = `float ${Math.random() * 3 + 4}s ease-in infinite`;
    
    heroSection.appendChild(particle);
    
    setTimeout(() => particle.remove(), 7000);
};

const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Créer des particules toutes les 2 secondes
setInterval(createFloatingParticle, 2000);

// Fonction pour faire défiler les galeries (page portfolio.html)
// Carrousel infini : implémentation par galerie
// Utilise le clonage du premier et dernier élément pour créer une boucle
const galleries = {}; // stocke l'état de chaque galerie

// Map pour stocker les états des galeries
const galleryStates = new Map();

function initGalleryInfinite(wrapper) {
    const galleryId = wrapper.id.replace('-gallery', '');
    const track = wrapper.querySelector('.gallery-track');
    if (!track) return;

    const items = Array.from(track.querySelectorAll('.gallery-item'));
    if (items.length === 0) return;

    // Dupliquer les éléments pour créer l'effet infini
    const clonedItems = items.map(item => item.cloneNode(true));
    clonedItems.forEach(item => track.appendChild(item));

    // Calculer les dimensions
    const itemWidth = items[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap || '32');
    const visibleCount = 4; // nombre d'images visibles à la fois
    
    // État initial
    const galleryState = {
        track,
        items: Array.from(track.children), // inclut les originaux + clones
        itemWidth,
        gap,
        visibleCount,
        currentIndex: 0,
        totalItems: items.length, // nombre d'items originaux
        animating: false
    };
    
    // Positionner au début
    updateGalleryPosition(galleryState, true);
    
    galleryStates.set(galleryId, galleryState);
    
    // Cloner les éléments au début et à la fin
    for (let i = 0; i < clonesCount; i++) {
        const frontClone = items[i % items.length].cloneNode(true);
        const backClone = items[items.length - 1 - (i % items.length)].cloneNode(true);
        track.appendChild(frontClone);
        track.insertBefore(backClone, track.firstChild);
    }

    // Ré-obtenir la liste d'items (avec clones)
    const allItems = Array.from(track.querySelectorAll('.gallery-item'));

    // State pour la galerie
    const state = {
        wrapper,
        track,
        allItems,
        index: clonesCount, // commence après les clones du début
        gap,
        animating: false,
        originalCount: items.length,
        clonesCount
    };

    // Fonction pour recalculer tailles et position initiale
    function recalc() {
        // width de l'item (on suppose items homogènes)
        const itemWidth = allItems[0].offsetWidth;
        state.itemWidth = itemWidth;
        // positionner le track pour afficher l'index courant
        const offset = -state.index * (itemWidth + state.gap);
        track.style.transition = 'none';
        track.style.transform = `translateX(${offset}px)`;
        // small timeout pour laisser l'application sans transition
        requestAnimationFrame(() => {
            track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }

    // Slide relative (direction: -1 left, 1 right)
    function slide(direction) {
        if (state.animating) return;
        state.animating = true;

        const itemWidth = state.itemWidth + state.gap;
        const currentOffset = parseFloat(getComputedStyle(track).transform.split(',')[4] || 0);
        const targetOffset = currentOffset - (direction * itemWidth);
        track.style.transform = `translateX(${targetOffset}px)`;

        const handleTransitionEnd = () => {
            track.removeEventListener('transitionend', handleTransitionEnd);
            
            // Après chaque transition, on vérifie s'il faut réorganiser les éléments
            const allItems = Array.from(track.children);
            if (direction > 0) { // Défilement vers la droite
                // Déplacer le premier élément à la fin
                const firstItem = allItems[0];
                track.appendChild(firstItem);
                // Réinitialiser la position du track sans transition
                track.style.transition = 'none';
                track.style.transform = `translateX(${currentOffset}px)`;
            } else { // Défilement vers la gauche
                // Déplacer le dernier élément au début
                const lastItem = allItems[allItems.length - 1];
                track.insertBefore(lastItem, allItems[0]);
                // Réinitialiser la position du track sans transition
                track.style.transition = 'none';
                track.style.transform = `translateX(${currentOffset}px)`;
            }
            
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    state.animating = false;
                });
            });
        };

        track.addEventListener('transitionend', handleTransitionEnd);
    }

    // Touch swipe handling avec support amélioré
    let touchStartX = 0;
    let touchDeltaX = 0;
    let touchStartTime = 0;

    wrapper.addEventListener('touchstart', (e) => {
        if (state.animating) return;
        touchStartX = e.touches[0].clientX;
        touchStartTime = Date.now();
        track.style.transition = 'none';
    }, {passive: true});

    wrapper.addEventListener('touchmove', (e) => {
        if (state.animating) return;
        const x = e.touches[0].clientX;
        touchDeltaX = x - touchStartX;
        
        // Ajout d'une résistance aux bords
        const resistance = 0.3;
        const offset = -state.index * (state.itemWidth + state.gap) + 
            (Math.abs(touchDeltaX) > state.itemWidth ? 
                state.itemWidth * resistance * Math.sign(touchDeltaX) : 
                touchDeltaX);
            
        track.style.transform = `translateX(${offset}px)`;
    }, {passive: true});

    wrapper.addEventListener('touchend', (e) => {
        if (state.animating) return;
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        const touchVelocity = Math.abs(touchDeltaX) / touchDuration;
        
        // Seuil de swipe dynamique basé sur la vélocité
        const threshold = Math.min(
            state.itemWidth / 3,
            Math.max(state.itemWidth / 4, touchVelocity * 100)
        );
        
        if (Math.abs(touchDeltaX) > threshold) {
            const dir = touchDeltaX > 0 ? -1 : 1;
            slide(dir);
        } else {
            // Retour à la position actuelle
            const offset = -state.index * (state.itemWidth + state.gap);
            track.style.transform = `translateX(${offset}px)`;
        }
        touchDeltaX = 0;
    });

    // Resize observer avec debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            recalc();
        }, 150);
    });

    // Initial calculation
    const initializeGallery = () => {
        if (document.readyState === 'complete') {
            recalc();
        } else {
            window.addEventListener('load', recalc);
        }
    };
    initializeGallery();

    // Expose control API
    galleries[galleryId] = { slide, state };
}

// Replace existing scrollGallery with API that uses galleries map
function updateGalleryPosition(state, instant = false) {
    const { track, currentIndex, itemWidth, gap } = state;
    const offset = -(currentIndex * (itemWidth + gap));
    
    if (instant) {
        track.classList.add('no-transition');
        track.style.transform = `translateX(${offset}px)`;
        track.offsetHeight; // force reflow
        track.classList.remove('no-transition');
    } else {
        track.style.transform = `translateX(${offset}px)`;
    }
}

function scrollGallery(galleryId, direction) {
    const state = galleryStates.get(galleryId);
    if (!state || state.animating) return;

    state.animating = true;
    
    // Calculer le nouvel index
    let newIndex = state.currentIndex + direction;
    
    // Gérer le défilement infini
    if (newIndex >= state.totalItems) {
        // On atteint la fin, on va utiliser les clones
        state.track.addEventListener('transitionend', function resetToStart() {
            state.track.removeEventListener('transitionend', resetToStart);
            state.track.classList.add('no-transition');
            state.currentIndex = 0;
            updateGalleryPosition(state, true);
            // Force le navigateur à appliquer le changement
            state.track.offsetHeight;
            state.track.classList.remove('no-transition');
            state.animating = false;
        });
        
        // Continuer l'animation vers le clone suivant
        state.currentIndex = newIndex;
        updateGalleryPosition(state);
    } else if (newIndex < 0) {
        // Même logique pour le défilement vers la gauche
        newIndex = state.totalItems - 1;
        state.track.addEventListener('transitionend', function resetToEnd() {
            state.track.removeEventListener('transitionend', resetToEnd);
            state.track.classList.add('no-transition');
            state.currentIndex = newIndex;
            updateGalleryPosition(state, true);
            state.track.offsetHeight;
            state.track.classList.remove('no-transition');
            state.animating = false;
        });
        
        state.currentIndex = -1;
        updateGalleryPosition(state);
    } else {
        // Défilement normal
        state.currentIndex = newIndex;
        updateGalleryPosition(state);
        
        const handleNormalTransition = () => {
            state.track.removeEventListener('transitionend', handleNormalTransition);
            state.animating = false;
        };
        state.track.addEventListener('transitionend', handleNormalTransition);
    }
}

// Initialisation des galeries au chargement
document.addEventListener('DOMContentLoaded', () => {
    // Animer l'apparition des galeries
    const galleries = document.querySelectorAll('.gallery-section');
    galleries.forEach((gallery, index) => {
        gallery.style.opacity = '0';
        gallery.style.transform = 'translateY(30px)';
        gallery.style.transition = `all 0.8s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            gallery.style.opacity = '1';
            gallery.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Support du swipe sur mobile pour les galeries
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.querySelectorAll('.gallery-wrapper').forEach(wrapper => {
        const galleryId = wrapper.id.replace('-gallery', '');
        
        wrapper.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        wrapper.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe(galleryId);
        }, false);
        
        function handleSwipe(id) {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                scrollGallery(id, -1);
            }
            if (touchEndX > touchStartX + swipeThreshold) {
                scrollGallery(id, 1);
            }
        }
    });
});

