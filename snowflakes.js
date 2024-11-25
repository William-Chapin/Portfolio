const canvas = document.getElementById('snowflakesCanvas');
const ctx = canvas.getContext('2d');
const snowflakes = [];
let mouseX = -1;
let mouseY = -1;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createSnowflake() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 1,
        speed: Math.random() * 1 + 0.5,
        wind: Math.random() * 2 - 1,
        changeSpeed: Math.random() * 0.02,
        opacity: Math.random() * 0.25 + 0.75
    };
}

function createSnowflakeAt(x, y) {
    return {
        x: x,
        y: y,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        wind: Math.random() * 1 - 0.5,
        changeSpeed: Math.random() * 0.05,
        opacity: Math.random() * 0.25 + 0.75
    };
}

function addSnowflakesAt(x, y) {
    for (let i = 0; i < 10; i++) {
        snowflakes.push(createSnowflakeAt(x, y));
    }
}

function updateSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snowflakes.length; i++) {
        const flake = snowflakes[i];
        flake.y += flake.speed;
        flake.x += flake.wind;

        if (Math.random() < 0.01) {
            flake.speed += flake.changeSpeed * (Math.random() < 0.5 ? -1 : 1);
            flake.speed = Math.max(0.5, Math.min(flake.speed, 2));
        }

        if (flake.y > canvas.height) {
            flake.y = 0;
            flake.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fill();
    }

    if (mouseX >= 0 && mouseY >= 0) {
        for (let i = 0; i < snowflakes.length; i++) {
            const flake = snowflakes[i];
            const distance = Math.sqrt((flake.x - mouseX) ** 2 + (flake.y - mouseY) ** 2);
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(mouseX, mouseY);
                ctx.lineTo(flake.x, flake.y);
                ctx.strokeStyle = 'rgba(192, 192, 192, 0.4)';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }
    }
}

function animateSnowflakes() {
    updateSnowflakes();
    requestAnimationFrame(animateSnowflakes);
}

function initSnowflakes() {
    resizeCanvas();
    for (let i = 0; i < 250; i++) {
        snowflakes.push(createSnowflake());
    }
    animateSnowflakes();
}

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX + 9;
    mouseY = event.clientY;
});

document.addEventListener('click', (event) => {
    addSnowflakesAt(event.clientX, event.clientY);
});

document.getElementById('scrollArrow').addEventListener('click', () => {
    smoothScrollTo(window.innerHeight, 1000);
});

window.addEventListener('resize', resizeCanvas);
window.addEventListener('scroll', resizeCanvas);
window.addEventListener('load', initSnowflakes);

function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const distanceY = targetY - startY;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        window.scrollTo(0, startY + distanceY * progress);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}