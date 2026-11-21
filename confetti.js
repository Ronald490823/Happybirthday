// Simple confetti — no internet needed.
(function () {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    const colors = ["#0b5d1e", "#1e8c3a", "#4caf50", "#7ed957", "#b9f6ca", "#f4c430", "#ffffff"];
    let pieces = [];
    let running = false;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    function burst(count) {
        for (let i = 0; i < count; i++) {
            pieces.push({
                x: Math.random() * canvas.width,
                y: -20 - Math.random() * canvas.height * 0.5,
                w: 6 + Math.random() * 8,
                h: 8 + Math.random() * 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedY: 2 + Math.random() * 3,
                speedX: -1.5 + Math.random() * 3,
                rotation: Math.random() * 360,
                spin: -6 + Math.random() * 12,
                sway: Math.random() * Math.PI * 2
            });
        }
        if (!running) {
            running = true;
            requestAnimationFrame(draw);
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            p.sway += 0.05;
            p.x += p.speedX + Math.sin(p.sway);
            p.y += p.speedY;
            p.rotation += p.spin;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });
        pieces = pieces.filter(p => p.y < canvas.height + 30);
        if (pieces.length) {
            requestAnimationFrame(draw);
        } else {
            running = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    // Confetti as soon as the page opens, plus a second wave.
    window.addEventListener("load", () => {
        burst(250);
        setTimeout(() => burst(150), 1500);
    });

    document.getElementById("again").addEventListener("click", () => burst(200));
})();
