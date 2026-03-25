// main.js - Página inicial

document.addEventListener('DOMContentLoaded', function() {
    // Animação de entrada para o hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            hero.style.transition = 'all 0.8s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Animação para os cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
});

//decidind quem fica com a barrinha vermelha

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link");

    // Pega o nome da página atual (ex: "index.html")
    let currentPage = window.location.pathname.split("/").pop();

    // Caso esteja vazio (quando abre direto)
    if (currentPage === "") {
        currentPage = "index.html";
    }

    links.forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });
});