// aventuras.js - Mini RPG engine e lista de aventuras
// VERSÃO CORRIGIDA E PRONTA PARA EXECUÇÃO

// ==================== MINI RPG GAME ENGINE ====================
// Estado da micro-aventura
let gameStep = 'inicio';
let gameHistory = [];

// Dados das aventuras disponíveis
const aventurasData = [
    {
        id: 1,
        titulo: "Ruínas Vermelhas",
        descricao: "Explore as antigas ruínas e descubra seus segredos sombrios.",
        dificuldade: "Iniciante",
        duracao: "30-45 min",
        imagem: "img/aventuras/ruinas.jpg"
    },
    {
        id: 2,
        titulo: "Tumba do Códice",
        descricao: "Uma tumba esquecida guarda um livro de poderes ancestrais.",
        dificuldade: "Intermediário",
        duracao: "45-60 min",
        imagem: "img/aventuras/tumba.jpg"
    },
    {
        id: 3,
        titulo: "Clã da Serpente",
        descricao: "Infiltre-se no clã dos homens-serpente e descubra sua conspiração.",
        dificuldade: "Avançado",
        duracao: "60-90 min",
        imagem: "img/aventuras/serpente.jpg"
    },
    {
        id: 4,
        titulo: "Laboratório 0x7F",
        descricao: "Um laboratório abandonado com experimentos que deram errado.",
        dificuldade: "Intermediário",
        duracao: "45 min",
        imagem: "img/aventuras/lab.jpg"
    },
    {
        id: 5,
        titulo: "Umbral",
        descricao: "Uma dimensão entre a vida e a morte, onde as almas se perdem.",
        dificuldade: "Épico",
        duracao: "90 min",
        imagem: "img/aventuras/umbral.jpg"
    }
];

// Estrutura completa da aventura "Ruínas Vermelhas" (árvore de decisões)
const rpgData = {
    inicio: {
        texto: "Você está diante das <strong>Ruínas Vermelhas</strong>. Duas entradas se abrem: uma ladeira escura à esquerda, outra coberta de runas pulsantes à direita.",
        botoes: [
            { texto: "🔴 Entrada esquerda (trevas)", choice: "esquerda", classe: "btn-outline-danger" },
            { texto: "🔴 Entrada direita (runas)", choice: "direita", classe: "btn-outline-light" }
        ]
    },
    esquerda: {
        texto: "Você desce a ladeira escura. O ar fica pesado e um frio percorre sua espinha. De repente, olhos vermelhos brilham na frente. Um <strong>espectro guardião</strong> se materializa das sombras.",
        botoes: [
            { texto: "⚔️ Lutar contra o espectro", choice: "lutar", classe: "btn-outline-light" },
            { texto: "🏃 Fugir de volta", choice: "fugir", classe: "btn-outline-danger" }
        ]
    },
    direita: {
        texto: "A entrada de runas pulsa com energia arcana. Você decifra as inscrições antigas: 'Somente quem sacrifica algo de si obtém o poder'. Há um altar de pedra negra no centro.",
        botoes: [
            { texto: "🩸 Sacrificar sangue no altar", choice: "sacrificio", classe: "btn-outline-danger" },
            { texto: "🔮 Ignorar o altar e seguir", choice: "ignorar", classe: "btn-outline-light" }
        ]
    },
    lutar: {
        texto: "Você enfrenta o espectro com coragem. Sua arma atravessa a névoa fria. Ele range em agonia e desaparece em fumaça. No chão, você encontra um <strong>fragmento de alma</strong> pulsante. Fim da aventura - por enquanto.",
        botoes: [
            { texto: "↺ Jogar novamente", choice: "reiniciar", classe: "btn-outline-secondary" }
        ]
    },
    fugir: {
        texto: "Você foge de volta à entrada principal. As ruínas continuam em silêncio, como se esperassem sua próxima tentativa. Talvez outra hora...",
        botoes: [
            { texto: "↺ Reiniciar aventura", choice: "reiniciar", classe: "btn-outline-secondary" }
        ]
    },
    sacrificio: {
        texto: "Ao pingar seu sangue nas runas do altar, uma chama negra envolve seu corpo. Você sente o poder fluir, mas também uma parte de sua vitalidade se esvair. Agora você enxerga um portal oculto atrás do altar.",
        botoes: [
            { texto: "🚪 Entrar no portal", choice: "portal", classe: "btn-outline-danger" }
        ]
    },
    ignorar: {
        texto: "Ignorar o altar parece sensato. Você segue pelo corredor iluminado por cristais e encontra uma câmara com três baús antigos. Qual deles abrir?",
        botoes: [
            { texto: "🔐 Baú de ferro enferrujado", choice: "bauferro", classe: "btn-outline-light" },
            { texto: "🔐 Baú de ébano com runas", choice: "bauebano", classe: "btn-outline-danger" },
            { texto: "🔐 Baú de prata oxidada", choice: "bauprata", classe: "btn-outline-light" }
        ]
    },
    portal: {
        texto: "O portal o transporta para uma biblioteca interdimensional. Estantes infinitas guardam conhecimentos proibidos. Você encontra o grimório do <strong>ritual Exoticlos</strong> e se torna um Mestre das Ruínas! Vitória!",
        botoes: [
            { texto: "↺ Nova aventura", choice: "reiniciar", classe: "btn-outline-secondary" }
        ]
    },
    bauferro: {
        texto: "O baú de ferro range e solta uma nuvem de gás verde. Você desmaia instantaneamente e acorda na entrada das ruínas, sem seus pertences. Nada de tesouro hoje.",
        botoes: [
            { texto: "↺ Tentar de novo", choice: "reiniciar", classe: "btn-outline-secondary" }
        ]
    },
    bauebano: {
        texto: "O baú de ébano se abre com um clique suave. Dentro, uma <strong>máscara vermelha</strong> pulsante e um pergaminho antigo. Ao colocar a máscara, você se torna o Guardião das Ruínas. Fim épico!",
        botoes: [
            { texto: "↺ Reiniciar", choice: "reiniciar", classe: "btn-outline-secondary" }
        ]
    },
    bauprata: {
        texto: "O baú de prata contém moedas antigas e uma adaga cerimonial. Mas ao tocá-las, elas viram pó. Armadilha alquímica. Você escapa, mas sem recompensa.",
        botoes: [
            { texto: "↺ Voltar ao início", choice: "reiniciar", classe: "btn-outline-secondary" }
        ]
    }
};

// Função para resetar o jogo
function resetGame() {
    gameStep = 'inicio';
    gameHistory = [];
    updateGameDisplay(rpgData.inicio);
}

// Função para atualizar a interface do jogo
function updateGameDisplay(node) {
    const gameText = document.getElementById('gameText');
    const choicesDiv = document.getElementById('gameChoices');
    
    if (!gameText || !choicesDiv) {
        console.error('Elementos do jogo não encontrados!');
        return;
    }
    
    gameText.innerHTML = node.texto;
    
    choicesDiv.innerHTML = node.botoes.map(btn => 
        `<button class="btn ${btn.classe}" data-choice="${btn.choice}">${btn.texto}</button>`
    ).join('');
}

// Processa as escolhas do jogador
function handleGameChoice(choice) {
    if (choice === 'reiniciar') {
        resetGame();
        return;
    }
    
    // Adiciona ao histórico
    gameHistory.push(choice);
    
    // Atualiza para o próximo nó baseado na escolha
    if (rpgData[choice]) {
        gameStep = choice;
        updateGameDisplay(rpgData[choice]);
    } else {
        console.error('Nó não encontrado:', choice);
        resetGame();
    }
}

// ==================== RENDERIZAR LISTA DE AVENTURAS ====================
function renderizarAventuras() {
    const container = document.getElementById('aventuras-lista');
    if (!container) {
        console.error('Container aventuras-lista não encontrado!');
        return;
    }
    
    if (aventurasData.length === 0) {
        container.innerHTML = '<div class="col-12 text-center text-secondary py-4">Nenhuma aventura disponível no momento.</div>';
        return;
    }
    
    container.innerHTML = aventurasData.map(aventura => `
        <div class="col-md-6 col-lg-4">
            <div class="card aventura-card h-100" data-aventura-id="${aventura.id}">
                <div class="card-img-top">
                    <img src="${aventura.imagem}" alt="${aventura.titulo}" class="img-fluid" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'200\' viewBox=\'0 0 400 200\'%3E%3Crect width=\'400\' height=\'200\' fill=\'%23333\'/%3E%3Ctext x=\'200\' y=\'120\' fill=\'%238b0000\' font-size=\'24\' text-anchor=\'middle\' font-family=\'Arial\'%3E${aventura.titulo}%3C/text%3E%3C/svg%3E'">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${aventura.titulo}</h3>
                    <p class="card-text">${aventura.descricao}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="badge bg-danger">${aventura.dificuldade}</span>
                        <small class="text-secondary">${aventura.duracao}</small>
                    </div>
                    <button class="btn btn-outline-red w-100 mt-3 carregar-aventura" data-id="${aventura.id}">
                        Carregar Aventura
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== CARREGAR AVENTURA NO MINI GAME ====================
function carregarAventuraNoGame(aventuraId) {
    const aventura = aventurasData.find(a => a.id === parseInt(aventuraId));
    if (!aventura) return;
    
    const gameText = document.getElementById('gameText');
    const choicesDiv = document.getElementById('gameChoices');
    
    if (gameText && choicesDiv) {
        gameText.innerHTML = `🌑 <strong>${aventura.titulo}</strong> carregada no console rápido.<br><br>
        <em>"${aventura.descricao}"</em><br><br>
        Esta é uma prévia. Na versão completa, você seria redirecionado para uma página dedicada.`;
        
        choicesDiv.innerHTML = `
            <button class="btn btn-outline-danger" onclick="window.location.href='aventura-detalhe.html?id=${aventura.id}'">📖 Ver aventura completa</button>
            <button class="btn btn-outline-secondary" onclick="resetGame()">↺ Voltar às Ruínas Vermelhas</button>
        `;
        
        gameStep = -1; // Modo de prévia
    }
}

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando aventuras...');
    
    // Verificar se os elementos existem
    const gameText = document.getElementById('gameText');
    const gameChoices = document.getElementById('gameChoices');
    const aventurasLista = document.getElementById('aventuras-lista');
    
    console.log('gameText:', gameText);
    console.log('gameChoices:', gameChoices);
    console.log('aventurasLista:', aventurasLista);
    
    // Inicializa o jogo
    if (gameText && gameChoices) {
        resetGame();
        console.log('Jogo inicializado com sucesso!');
    } else {
        console.error('Elementos do jogo não encontrados!');
    }
    
    // Renderiza a lista de aventuras
    if (aventurasLista) {
        renderizarAventuras();
        console.log('Aventuras renderizadas!');
    }
    
    // Event delegation para o container do jogo
    const gameContainer = document.getElementById('gameContainer');
    if (gameContainer) {
        gameContainer.addEventListener('click', function(e) {
            const btn = e.target.closest('button');
            if (!btn) return;
            
            const choice = btn.dataset.choice;
            if (choice) {
                e.preventDefault();
                handleGameChoice(choice);
            }
        });
        console.log('Event listener do jogo adicionado');
    }
    
    // Event delegation para os botões de carregar aventura
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.carregar-aventura');
        if (btn) {
            e.preventDefault();
            const aventuraId = btn.dataset.id;
            carregarAventuraNoGame(aventuraId);
            
            // Scroll suave até o jogo
            const gameContainer = document.getElementById('gameContainer');
            if (gameContainer) {
                gameContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }
    });
    
    // Event delegation para os cards de aventura (clique no card todo)
    document.addEventListener('click', function(e) {
        const card = e.target.closest('.aventura-card');
        if (card && !e.target.closest('button')) {
            const aventuraId = card.dataset.aventuraId;
            if (aventuraId) {
                carregarAventuraNoGame(aventuraId);
                const gameContainer = document.getElementById('gameContainer');
                if (gameContainer) {
                    gameContainer.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }
        }
    });
});

// ==================== FUNÇÕES GLOBAIS ====================
// Disponibiliza funções para o escopo global (para onclick em HTML)
window.resetGame = resetGame;
window.carregarAventuraNoGame = carregarAventuraNoGame;

console.log('aventuras.js carregado com sucesso!');