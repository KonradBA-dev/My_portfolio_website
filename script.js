// Funkcja do sprawdzenia, czy sekcja jest w widoku
function isSectionInView(section, offset = 0) {
    const sectionRect = section.getBoundingClientRect();
    const sectionTop = sectionRect.top + offset;
    const sectionBottom = sectionRect.bottom;
    const windowHeight = window.innerHeight;

    // Sprawdzenie, czy sekcja jest częściowo widoczna na ekranie
    // Sprawdzamy, czy sekcja jest częściowo widoczna na ekranie
    return sectionTop <= windowHeight && sectionBottom >= 0;
}

// Funkcja, która sprawdza, która sekcja jest widoczna
function highlightActiveLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navbars');

    let currentSection = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3 && window.scrollY < sectionTop + sectionHeight - sectionHeight / 3) {
            currentSection = section.id
        }
    });
    
    // Podświetlenie aktywnego linku
    navLinks.forEach((link) => {
        link.classList.remove('active'); // Usuwamy klasę active ze wszystkich linków
        
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active') // Dodajemy klasę active do aktywnego linku
        }
    });
}

highlightActiveLink();

// Funkcja do generowania kropek w tle
document.addEventListener('DOMContentLoaded', function() {
    generateDots(50);
});

function generateDots(num) {
    const introBackground = document.querySelector('.intro-background');
    
    // Dodajemy określoną liczbę kropek
    for (let i = 0; i < num; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
  
        // Losowo generujemy pozycje dla każdej kropki
        const top = Math.random() * 100; // Pozycja w pionie (od 0% do 100%)
        const left = Math.random() * 100; // Pozycja w poziomie (od 0% do 100%)
        const delay = Math.random() * 5; // Opóźnienie animacji dla każdej kropki
  
        dot.style.top = `${top}%`;
        dot.style.left = `${left}%`;
        dot.style.animationDelay = `${delay}s`;
  
        // Dodajemy kropkę do tła
        introBackground.appendChild(dot);
    }
}

// Przełącznik motywu
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  const isDark = document.body.classList.contains('dark-mode');

  // Zmiana ikony i koloru
  themeIcon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
  themeIcon.style.color = isDark ? '#fbbf24' : '#60a5fa';

  // Aktualizacja tekstów dostępności
  themeToggle.setAttribute(
    'aria-label',
    isDark ? 'Włącz tryb dzienny' : 'Włącz tryb nocny'
  );
  themeToggle.setAttribute(
    'title',
    isDark ? 'Włącz tryb dzienny' : 'Włącz tryb nocny'
  );

  // Zapamiętanie trybu
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Przy ładowaniu strony
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme === 'dark';

  if (isDark) {
    document.body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    themeIcon.style.color = '#fbbf24';
    themeToggle.setAttribute('aria-label', 'Włącz tryb dzienny');
    themeToggle.setAttribute('title', 'Włącz tryb dzienny');
  } else {
    themeIcon.style.color = '#60a5fa';
    themeToggle.setAttribute('aria-label', 'Włącz tryb nocny');
    themeToggle.setAttribute('title', 'Włącz tryb nocny');
  }
});

// Teksty do pisania
const strings = ["Web Developer", "Frontend Developer", "Backend Developer", "Fullstack Developer"];

// Element, w którym będzie wyświetlany tekst
const typingElement = document.getElementById('typing-text');

// Ustawienia
let currentStringIndex = 0;
let currentCharIndex = 0;
let typingSpeed = 150; // Prędkość pisania (ms na znak)
let erasingSpeed = 100; // Prędkość usuwania (ms na znak)
let delayBetweenStrings = 2000; // Czas opóźnienia po zakończeniu pisania (ms)

function type() {
    // Pisanie tekstu
    if (currentCharIndex < strings[currentStringIndex].length) {
        typingElement.textContent += strings[currentStringIndex][currentCharIndex];
        currentCharIndex++;
        setTimeout(type, typingSpeed); // Wywołanie rekurencyjne
    } else {
        setTimeout(erase, delayBetweenStrings); // Po zakończeniu pisania, zaczynaj usuwanie
    }
}

function erase() {
    // Usuwanie tekstu
    if (currentCharIndex > 0) {
        typingElement.textContent = typingElement.textContent.slice(0, -1);
        currentCharIndex--;
        setTimeout(erase, erasingSpeed); // Wywołanie rekurencyjne
    } else {
        // Zmiana na następny tekst
        currentStringIndex = (currentStringIndex + 1) % strings.length;
        setTimeout(type, typingSpeed); // Zaczynaj pisać nowy tekst
    }
}

window.onload = function() {
    setTimeout(type, delayBetweenStrings);  // Rozpoczynamy efekt pisania
    handleScroll();  // Uruchomienie scrollowania
};


function handleAboutSection() {
    const aboutContainer = document.querySelector('.about-container');
    const leftSide = document.querySelector('.left-side');
    const rightSide = document.querySelector('.right-side');

    if (aboutContainer) {
        // Lewy tekst: pojawia się od początku widoczności sekcji
        if (isSectionInView(aboutContainer, 0)) {
            if (leftSide) {
                leftSide.classList.add('visible');
                leftSide.classList.remove('hidden');
            }
        } else {
            if (leftSide) {
                leftSide.classList.add('hidden');
                leftSide.classList.remove('visible');
            }
        }

        // Prawy tekst: pojawia się dopiero od połowy wysokości sekcji
        const halfHeight = aboutContainer.getBoundingClientRect().height / 2;
        if (isSectionInView(aboutContainer, halfHeight)) {
            if (rightSide) {
                rightSide.classList.add('visible');
                rightSide.classList.remove('hidden');
            }
        } else {
            if (rightSide) {
                rightSide.classList.add('hidden');
                rightSide.classList.remove('visible');
            }
        }
    }
}

// Funkcja do obsługi głównego scrolla
function handleScroll() {
    // Dodanie klasy 'visible' do sekcji w widoku
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const content = section.querySelector('.content');
        if (isSectionInView(section)) { // Sprawdzamy, czy sekcja jest w widoku
            section.classList.add('visible');
            content.classList.add('visible'); // Pokazujemy zawartość sekcji
        } else {
            section.classList.remove('visible');
            content.classList.remove('visible'); // Ukrywamy zawartość sekcji
        }
    });

    // Obsługa sekcji About
    handleAboutSection(); // Wywołanie obsługi sekcji About
}


window.addEventListener('scroll', () => {
    highlightActiveLink();
    handleScroll();
});

// Pobieramy elementy dla modalu i przycisk
const modal = document.getElementById("myModal");
const btn = document.getElementById("moreAboutMeBtn");
const span = document.getElementsByClassName("close-section-about")[0];

// Otwieramy modalne okno kiedy użytkownik kliknie w przycisk
if (btn && modal) {
    btn.onclick = function () {
        modal.style.display = "block";
    };
}

// Zamykamy modalne okno kiedy użytkownik kliknie w <span> (X)
if (span && modal) {
    span.onclick = function () {
        modal.style.display = "none";
    };
}

// Zamykamy modalne okno kiedy użytkownik kliknie poza modal-content
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Toggle navbar visibility when clicking the hamburger menu
});

// Menu icon
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');
const icon = menuIcon.querySelector('i');

menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');

  // Zmień ikonę
  if (navLinks.classList.contains('active')) {
    icon.classList.replace('fa-bars', 'fa-times');
  } else {
    icon.classList.replace('fa-times', 'fa-bars');
  }
});

// Zamykanie po kliknięciu linku
document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    icon.classList.replace('fa-times', 'fa-bars');
  });
});

// Pokazuje przycisk, gdy przewinięto stronę o 200px
window.addEventListener('scroll', () => {
    const scrollToTopButton = document.getElementById('scroll-to-top');
    if (window.scrollY > 200) { // Sprawdzamy, czy przewinięto stronę o 200px
        scrollToTopButton.classList.add('show'); // Dodajemy klasę, aby pokazać przycisk
    } else {
        scrollToTopButton.classList.remove('show'); // Usuwamy klasę, aby ukryć przycisk
    }
});

// Funkcja przewijania strony do góry
document.getElementById('scroll-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Funkcja dla animacji wejścia h1, h2, h3, p, .highlight i social-links
window.addEventListener('DOMContentLoaded', (event) => {
    let delay = 0;

    // Funkcja animująca elementy
    function animateElement(element, delay) {
        setTimeout(() => {
            element.classList.add('visible');
        }, delay);
    }

    // Pobieramy elementy
    const h1 = document.querySelector('h1');
    const h2 = document.querySelector('h2');
    const h3 = document.querySelector('h3');
    const p = document.querySelector('p');
    const span = document.querySelector('.highlight');
    const socialLinks = document.querySelector('.social-links');

    // Animacja elementów z opóźnieniem
    animateElement(h1, delay);
    delay += 1000; // Opóźnienie po każdym elemencie
    animateElement(h2, delay);
    delay += 1000;
    animateElement(h3, delay);
    delay += 1000;
    animateElement(p, delay);
    delay += 1000;
    animateElement(span, delay);
    delay += 1000;
    animateElement(socialLinks, delay);
});

// Funkcja dla animacji wejścia navlink
window.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#nav-links li'); // Pobieramy wszystkie elementy li w navbarze
    
    // Iterujemy przez linki i dodajemy klasę 'show' po określonym czasie
    navLinks.forEach((link, index) => {
        setTimeout(() => {
            link.classList.add('show'); // Dodajemy klasę, aby uruchomić animację
        }, index * 200); // Każdy link pojawia się po opóźnieniu 300ms od poprzedniego
    });
});

//
//
// PROJECT SECTION
//
//

// Funkcja rozwijania nakładki
function expandOverlay(element) {
    const overlay = element.querySelector('.overlay');
    const description = overlay.querySelector('.project-description');
    const technologies = overlay.querySelector('.technologies');

    overlay.style.height = '100%';  // Rozszerzenie nakładki
    description.style.opacity = '1';  // Pokazanie opisu
    technologies.style.opacity = '1';  // Pokazanie technologii
}

// Funkcja zwijania nakładki
function shrinkOverlay(element) {
    const overlay = element.querySelector('.overlay');
    const description = overlay.querySelector('.project-description');
    const technologies = overlay.querySelector('.technologies');

    overlay.style.height = '0';  // Zmniejszenie wysokości nakładki
    description.style.opacity = '0';  // Ukrycie opisu
    technologies.style.opacity = '0';  // Ukrycie technologii
}

// Dodajemy nasłuchiwacze zdarzeń do każdego image-box
document.querySelectorAll('.image-box').forEach(box => {
    box.addEventListener('mouseenter', () => expandOverlay(box));
    box.addEventListener('mouseleave', () => shrinkOverlay(box));
});

function openModal(title, imageSrc, description, link, technologies, fullDescription, videoURL) {
    // Ustawianie danych w modalu
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-image").src = imageSrc;
    document.getElementById("modal-description").textContent = fullDescription;
    document.getElementById("modal-link").href = link;
    document.getElementById("modal-video").src = videoURL;
  
    // Wstawianie technologii dynamicznie
    const techContainer = document.querySelector(".modal-technologies");
    techContainer.innerHTML = ""; // Czyścimy zawartość
  
    technologies.forEach(tech => {
      const span = document.createElement("span");
      span.classList.add("tech");
      span.textContent = tech;
      techContainer.appendChild(span);
    });
  
    // Wyświetlenie modala
    document.getElementById("project-modal").style.display = "block";
}
  
// Zamknięcie modala
function closeModal() {
    document.getElementById("project-modal").style.display = "none";
    document.getElementById("modal-video").src = ""; // Resetujemy video przy zamknięciu
}
  

// Zamykanie modalu po kliknięciu poza nim
window.addEventListener("click", function(event) {
    const modal = document.getElementById("project-modal");
    // Sprawdzamy, czy kliknięto poza modalem
    if (event.target === modal) {
        closeModal();
    }
});

const closeBtn = document.querySelector('.close');
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}
