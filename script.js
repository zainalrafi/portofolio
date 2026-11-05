/* =========================
   TYPING ANIMATION
========================= */

const typingElement = document.getElementById("typing");

const words = [
    "Network Engineer",
    "MikroTik Enthusiast",
    "Routing Specialist",
    "Network Infrastructure",
    "SIJA Student"
];

let wordIndex = 0;
let charIndex = 0;

let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1800);

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }
    }

    const speed = deleting ? 45 : 85;

    setTimeout(typeEffect, speed);
}

typeEffect();


/* =========================
   CURRENT YEAR
========================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================
   NETWORK BACKGROUND
========================= */

const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

let width;
let height;

let nodes = [];

const NODE_COUNT = 55;

function resizeCanvas() {

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", () => {

    resizeCanvas();

    createNodes();

});


/* =========================
   CREATE NODES
========================= */

function createNodes() {

    nodes = [];

    for (let i = 0; i < NODE_COUNT; i++) {

        nodes.push({

            x: Math.random() * width,

            y: Math.random() * height,

            vx: (Math.random() - 0.5) * 0.25,

            vy: (Math.random() - 0.5) * 0.25,

            radius: Math.random() * 1.5 + 1

        });

    }

}

createNodes();


/* =========================
   DRAW NETWORK
========================= */

function drawNetwork() {

    ctx.clearRect(0, 0, width, height);

    /* Move nodes */

    nodes.forEach(node => {

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) {
            node.vx *= -1;
        }

        if (node.y < 0 || node.y > height) {
            node.vy *= -1;
        }

    });


    /* Draw connections */

    for (let i = 0; i < nodes.length; i++) {

        for (let j = i + 1; j < nodes.length; j++) {

            const a = nodes[i];
            const b = nodes[j];

            const dx = a.x - b.x;
            const dy = a.y - b.y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {

                ctx.beginPath();

                ctx.moveTo(a.x, a.y);

                ctx.lineTo(b.x, b.y);

                ctx.strokeStyle =
                    `rgba(0,255,157,${0.12 * (1 - distance / 150)})`;

                ctx.lineWidth = 1;

                ctx.stroke();

            }

        }

    }


    /* Draw nodes */

    nodes.forEach(node => {

        ctx.beginPath();

        ctx.arc(
            node.x,
            node.y,
            node.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "rgba(0,255,157,0.7)";

        ctx.fill();

    });


    requestAnimationFrame(drawNetwork);

}

drawNetwork();


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".skill-card, .project-card, .about-text, .about-card"
);

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

            }

        });

    },

    {
        threshold: 0.1
    }

);


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);

});


/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(5,8,13,0.92)";

    } else {

        navbar.style.background =
            "rgba(5,8,13,0.75)";

    }

});