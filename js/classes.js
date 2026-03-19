// classes.js - Dados e renderização das classes

const classesData = [
    {
        id: 1,
        nome: "Espectro das Sombras",
        descricao: "Manipulador das trevas que pode se mover entre as sombras e drenar a vitalidade dos inimigos.",
        nivel: "Nível 1-20",
        imagem: "img/classes1/vermelho.png"
    },
    {
        id: 2,
        nome: "Cronomante",
        descricao: "Mestre do tempo capaz de acelerar aliados ou prender inimigos em loops temporais.",
        nivel: "Nível 3-20",
        imagem: "img/classes1/vermelho.png"
    },
    {
        id: 3,
        nome: "Forjado em Runa",
        descricao: "Guerreiro cujo corpo foi gravado com runas ancestrais, concedendo poderes imbuídos.",
        nivel: "Nível 1-20",
        imagem: "img/classes1/vermelho.png"
    },
    {
        id: 4,
        nome: "Caçador de Realidades",
        descricao: "Viajante entre planos que caça criaturas que rompem as barreiras da realidade.",
        nivel: "Nível 5-20",
        imagem: "img/classes1/vermelho.png"
    }
];

function renderizarClasses() {
    const container = document.getElementById('classes-container');
    if (!container) return;
    
    container.innerHTML = classesData.map(classe => `
        <div class="col-md-6 col-lg-3">
            <div class="card h-100">
                <div class="card-img-top-class">
                    <img src="${classe.imagem}" alt="${classe.nome}" class="img-fluid" onerror="this.src='img/placeholder.jpg'">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${classe.nome}</h3>
                    <p class="card-text">${classe.descricao}</p>
                    <span class="badge bg-danger">${classe.nivel}</span>
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderizarClasses);