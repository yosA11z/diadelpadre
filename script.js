document.addEventListener('DOMContentLoaded', () => {
    const dedicatoriasParrafos = document.querySelectorAll('.dedicatoria p');
    dedicatoriasParrafos.forEach(parrafo => {
        const fullText = parrafo.dataset.text;
        parrafo.textContent = ''; 
        let charIndex = 0;
        const typingSpeed = 50; 

        function typeWriter() {
            if (charIndex < fullText.length) {
                parrafo.textContent += fullText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        typeWriter(); 
    });

    
    const galeriaContainer = document.querySelector('.galeria-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!galeriaContainer || !prevBtn || !nextBtn) return;

    const fotos = galeriaContainer.querySelectorAll('img');
    let currentIndex = 0;

    
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
        currentIndex = Math.max(0, currentIndex - 1); 
        updateGaleria();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(fotos.length - 1, currentIndex + 1); 
        updateGaleria();
    });

    
    const revealMessageBtn = document.getElementById('revealMessageBtn');
    const secretMessage = document.getElementById('secretMessage');
    const confettiContainer = document.getElementById('confettiContainer');

    if (revealMessageBtn && secretMessage && confettiContainer) {
        revealMessageBtn.addEventListener('click', () => {
            
            revealMessageBtn.classList.add('hidden'); 
            secretMessage.classList.remove('hidden');
            secretMessage.classList.add('visible'); 

            
            for (let i = 0; i < 50; i++) { 
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
               
               
                const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = Math.random() * -20 + 'px'; 

                confettiContainer.appendChild(confetti);

                
                
                confetti.addEventListener('animationend', () => {
                    confetti.remove();
                });
            }
        });
    }
});