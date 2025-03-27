// Funkcja do sprawdzenia, czy sekcja jest w widoku
function isSectionInView(section, offset = 0) {
    const sectionRect = section.getBoundingClientRect(); // Przechowujemy wynik obliczeń w zmiennej, by uniknąć zbędnych wywołań
    const sectionTop = sectionRect.top + offset;
    const sectionBottom = sectionRect.bottom;
    const windowHeight = window.innerHeight;

    // Sprawdzenie, czy sekcja jest częściowo widoczna na ekranie
    return sectionTop <= windowHeight && sectionBottom >= 0;
}

// Funkcja obsługująca widoczność sekcji About
function handleAboutSection() {
    const aboutContainer = document.querySelector('.about-container');
    const leftSide = document.querySelector('.left-side');
    const rightSide = document.querySelector('.right-side');

    if (aboutContainer) {
        // Lewy tekst: pojawia się od początku widoczności sekcji
        if (isSectionInView(aboutContainer)) {
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
        const halfHeight = aboutContainer.getBoundingClientRect().height / 2; // Obliczamy połowę wysokości sekcji
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
        if (isSectionInView(section)) { // Sprawdzamy, czy sekcja jest w widoku
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });

    // Parallax efekt dla obrazu tła
    const parallaxImage = document.querySelector('.intro-image');
    if (parallaxImage) {
        const scrollPosition = window.scrollY; // Pobieramy aktualną pozycję przewinięcia strony
        parallaxImage.style.transform = `translateY(${scrollPosition * 0.3}px)`; // Przesuwamy obrazek w tle
    }

    // Obsługa sekcji About
    handleAboutSection(); // Wywołanie obsługi sekcji About
}

// Funkcja do efektu pisania dla tekstu
async function typeText(element, text, delay) {
    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i]; // Dodajemy kolejny znak do tekstu
        await new Promise(resolve => setTimeout(resolve, delay)); // Czekamy określony czas przed dodaniem kolejnego znaku
    }
}

// Funkcja do uruchomienia efektu pisania
async function runTypingEffect() {
    const nameElement = document.querySelector('.intro-name');
    const positionElement = document.querySelector('.intro-position');

    if (nameElement && positionElement) {
        await typeText(nameElement, 'Konrad Bączek', 150); // Uruchamiamy efekt pisania dla imienia
        await typeText(positionElement, 'Frontend Developer / Backend Developer', 100); // Uruchamiamy efekt pisania dla stanowiska
    }
}

// Zmiana klasy navbar na "scrolled" po przewinięciu strony
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled'); // Dodajemy klasę, jeśli przewinięto więcej niż 50px
    } else {
        navbar.classList.remove('scrolled'); // Usuwamy klasę, jeśli przewinięto mniej niż 50px
    }
});

// Nasłuchujemy na zdarzenie scrollowania (tylko jeden nasłuchiwacz)
window.addEventListener('scroll', handleScroll); // Zamiast dwóch oddzielnych nasłuchiwaczy, używamy tylko jednego

// Uruchomienie funkcji przy ładowaniu strony, aby sekcje mogły być widoczne, jeśli już znajdują się w widoku
window.addEventListener('load', () => {
    handleScroll(); // Wywołanie funkcji obsługującej scrollowanie przy załadowaniu strony
    runTypingEffect(); // Uruchamiamy efekt pisania
});

// Funkcja otwierająca modal
function openModal(title, imageSrc, description, link) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalTechnologies = document.getElementById('modal-technologies');

    // Aktualizacja zawartości modalnego okna
    modalTitle.textContent = title; // Ustawiamy tytuł modalu
    modalImage.src = imageSrc; // Ustawiamy źródło obrazu
    modalDescription.textContent = description; // Ustawiamy opis

    // Dynamicznie dodawane technologie (dla przykładu)
    const technologies = {
        "ExoraGYM": ["HTML", "CSS", "JavaScript"],
        "Cyber Security": ["Python", "Cryptography", "Networking"],
        "Drapacz Chmur": ["HTML", "CSS", "Vue.js"],
        "Social Media": ["React", "Firebase", "Node.js"],
        "Portale Społecznościowe": ["HTML", "CSS", "Bootstrap"]
    };

    const techList = technologies[title] || []; // Pobieramy listę technologii na podstawie tytułu projektu
    modalTechnologies.innerHTML = `Technologies used: ${techList.map(tech => `<span class="tech">${tech}</span>`).join(' ')}`; // Wyświetlamy technologie w modalnym oknie

    // Wyświetlanie modalnego okna
    modal.style.display = "block"; // Ustawiamy widoczność modalu

    // Animacja obrazu w modalnym oknie
    modalImage.classList.remove('fade-in'); // Usuwamy klasę animacji
    void modalImage.offsetWidth; // Wymuszamy reflow, aby animacja się zrestartowała
    modalImage.classList.add('fade-in'); // Dodajemy klasę animacji

    // Przewijanie strony do modalnego okna
    modal.scrollIntoView({ behavior: 'smooth' }); // Płynne przewinięcie do modalu
}

// Funkcja zamykająca modal
function closeModal() {
    document.getElementById('project-modal').style.display = "none"; // Ukrywamy modal
}

const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');

// Toggle navbar visibility when clicking the hamburger menu
menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Przełączamy widoczność menu na mobilnym ekranie
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