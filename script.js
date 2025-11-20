document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efecto de Máquina de Escribir (Typewriter Effect) en el subtítulo
    const subtitleElement = document.querySelector('.hero-content .subtitle');
    
    // Solo ejecuta la animación si el elemento existe
    if (subtitleElement) {
        const originalText = subtitleElement.textContent;
        subtitleElement.textContent = ''; // Limpiamos el texto inicial
        
        let i = 0;
        const typingSpeed = 70; // Velocidad en milisegundos

        function typeWriter() {
            if (i < originalText.length) {
                subtitleElement.textContent += originalText.charAt(i); 
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        setTimeout(typeWriter, 1200); 
    }


    // 2. Desplazamiento Suave y cierre de menú - CLAVE PARA LOS BOTONES
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Hace scroll al elemento con el ID correspondiente al href
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // Cerrar menú hamburguesa después de hacer clic
            const navLinks = document.getElementById('navLinks');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // 3. Menú de Navegación Hamburguesa
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 4. Efecto de aparición de secciones al hacer scroll (Intersection Observer)
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2 // Cuando el 20% de la sección es visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});