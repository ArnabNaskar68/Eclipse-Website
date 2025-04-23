document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .fade-in-bottom').forEach(el => {
        observer.observe(el);
    });

    // Animate market stats when in view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElements = entry.target.querySelectorAll('.stat-number');
                statElements.forEach(stat => {
                    const targetNumber = parseInt(stat.textContent);
                    animateNumber(stat, targetNumber);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.market-grid').forEach(el => {
        statsObserver.observe(el);
    });
});

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 40);
}