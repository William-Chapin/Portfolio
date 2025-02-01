function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        const ease = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startPosition + (distance * ease));

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

document.getElementById('scrollArrow').addEventListener('click', () => {
    smoothScrollTo(window.innerHeight, 800);
});

function toggleContent(contentId) {
    const content = document.getElementById(contentId);
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}

function showContent(contentId) {
    const contents = document.querySelectorAll('.button-content');
    const buttons = document.querySelectorAll('.button-container button');

    contents.forEach(content => {
        if (content.id === contentId) {
            content.classList.add('active');
            const cards = content.querySelectorAll('.card');
            cards.forEach(card => {
                card.style.animation = 'none';
                card.offsetHeight; // trigger reflow
                card.style.animation = null;
            });
        } else {
            content.classList.remove('active');
        }
    });

    buttons.forEach(button => {
        if (button.getAttribute('onclick').includes(contentId)) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', () => {
    const socials = document.getElementById('socials');
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        socials.style.opacity = '1';
    } else {
        socials.style.opacity = '0';
    }
});
