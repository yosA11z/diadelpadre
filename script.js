document.addEventListener('DOMContentLoaded', () => {
    // --- Efecto de máquina de escribir en las dedicatorias ---
    const dedicatoriasParrafos = document.querySelectorAll('.dedicatoria p');
    dedicatoriasParrafos.forEach(parrafo => {
        const fullText = parrafo.dataset.text;
        parrafo.textContent = ''; // Limpiar el texto inicial
        let charIndex = 0;
        const typingSpeed = 50; // Velocidad en milisegundos por caracter

        function typeWriter() {
            if (charIndex < fullText.length) {
                parrafo.textContent += fullText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        typeWriter(); // Iniciar el efecto
    });

    // --- Funcionalidad de la galería de fotos ---
    const galeriaContainer = document.querySelector('.galeria-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    // Si no hay contenedor de galería o botones, salir
    if (!galeriaContainer || !prevBtn || !nextBtn) return;

    const fotos = galeriaContainer.querySelectorAll('img');
    let currentIndex = 0;

    // Ajusta la posición del scroll para mostrar la foto actual
    function updateGaleria() {
        if (fotos.length > 0) {
            const scrollAmount = fotos[currentIndex].offsetLeft;
            galeriaContainer.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1); // No ir más allá de la primera foto
        updateGaleria();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(fotos.length - 1, currentIndex + 1); // No ir más allá de la última foto
        updateGaleria();
    });

    // --- Mensaje Sorpresa y Confeti ---
    const revealMessageBtn = document.getElementById('revealMessageBtn');
    const secretMessage = document.getElementById('secretMessage');
    const confettiContainer = document.getElementById('confettiContainer');

    if (revealMessageBtn && secretMessage && confettiContainer) {
        revealMessageBtn.addEventListener('click', () => {
            // Ocultar el botón y mostrar el mensaje
            revealMessageBtn.classList.add('hidden'); // Usa 'hidden' para display: none
            secretMessage.classList.remove('hidden');
            secretMessage.classList.add('visible'); // Usa 'visible' para opacity y display: block

            // Efecto de confeti
            for (let i = 0; i < 50; i++) { // Crea 50 trozos de confeti
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                // Colores aleatorios para el confeti
                const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                // Posición inicial aleatoria
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = Math.random() * -20 + 'px'; // Empieza un poco arriba

                confettiContainer.appendChild(confetti);

                // Eliminar el confeti después de su animación para no sobrecargar el DOM
                confetti.addEventListener('animationend', () => {
                    confetti.remove();
                });
            }
        });
    }
});