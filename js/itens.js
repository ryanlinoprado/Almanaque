// itens.js - Dados e renderização dos itens mágicos

const itensData = [
    {
        id: 1,
        nome: "Lâmina Vermelha",
        descricao: "Espada que brilha com uma luz rubra quando inimigos estão próximos. Causa +1d6 de dano de fogo.",
        raridade: "Raro",
        tipo: "Arma (Espada)",
        propriedades: ["Sangrenta  ", "Chama  ", "Consciência"],
        imagem: "img/itens/lamina_vermelha.jpg"
    },
    {
        id: 2,
        nome: "Amuleto dos Ecos",
        descricao: "Pêndulo que permite ouvir ecos do passado. Concede vantagem em testes de investigação e percepção.",
        raridade: "Incomum",
        tipo: "Amuleto",
        propriedades: ["Investigação  ", "Passado  ", "Concentração"],
        imagem: "img/classes1/vermelho.png"
    },
    {
        id: 3,
        nome: "Capa das Sombras",
        descricao: "Tecido com fios da dimensão das trevas. Permite esconder-se mesmo em luz plena 1x por dia.",
        raridade: "Épico",
        tipo: "Armadura (Capa)",
        propriedades: ["Furtividade  ", "Sombrio  ", "Camuflagem"],
        imagem: "img/classes1/vermelho.png"
    },
    {
        id: 4,
        nome: "Orbe do Tempo Parado",
        descricao: "Esfera cristalina que pode congelar um alvo por 1 rodada. 3 cargas, recarrega ao amanhecer.",
        raridade: "Lendário",
        tipo: "Item Maravilhoso",
        propriedades: ["Tempo  ", "Controle  ", "Recarga"],
        imagem: "img/classes1/vermelho.png"
    },
    {
        id: 5,
        nome: "Anel do Sangue Frio",
        descricao: "Anel de prata negra que absorve calor. Concede resistência a frio e permite congelar água com um toque.",
        raridade: "Raro",
        tipo: "Anel",
        propriedades: ["Gelo  ", "Resistência  ", "Utilidade"],
        imagem: "img/classes1/vermelho.png"
    },
    {
        id: 6,
        nome: "Botas da Velocidade",
        descricao: "Botas leves como penas que aumentam a velocidade do usuário em +3m e permitem uma ação bônus adicional 1x por dia.",
        raridade: "Épico",
        tipo: "Botas",
        propriedades: ["Movimento ", "Agilidade ", "Velocidade"],
        imagem: "img/itens/bota.png"
        

    }
];

// Mapeamento de cores para raridades
const raridadeCores = {
    "Incomum": "#2ecc71", // Verde
    "Raro": "#3498db",     // Azul
    "Épico": "#9b59b6",    // Roxo
    "Lendário": "#f1c40f"  // Dourado
};

function renderizarItens() {
    const container = document.getElementById('itens-container');
    if (!container) return;
    
    container.innerHTML = itensData.map(item => {
        const corRaridade = raridadeCores[item.raridade] || "#8b0000";
        
        return `
        <div class="col-md-6 col-lg-4">
            <div class="card item-card h-100" data-item-id="${item.id}">
                <div class="card-img-top-itens position-relative">
                    <img src="${item.imagem}" alt="${item.nome}" class="img-fluid" onerror="this.src='img/placeholder.jpg'">
                    <span class="raridade-badge" style="background-color: ${corRaridade}">${item.raridade}</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${item.nome}</h3>
                    <p class="card-text item-tipo"><small class="text-secondary">${item.tipo}</small></p>
                    <p class="card-text">${item.descricao}</p>
                    
                    <div class="propriedades mt-3">
                        ${item.propriedades.map(prop => 
                            `<span class="propriedade-tag">${prop}</span>`
                        ).join('')}
                    </div>
                    
                    <button class="btn btn-outline-red ver-detalhes w-100 mt-3" data-id="${item.id}">
                        Ver Detalhes
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
    
    // Adicionar event listeners para os botões de detalhes
    adicionarEventListeners();
}

function adicionarEventListeners() {
    // Botões "Ver Detalhes"
    document.querySelectorAll('.ver-detalhes').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const itemId = this.dataset.id;
            mostrarDetalhesItem(itemId);
        });
    });
    
    // Clique no card inteiro (opcional)
    document.querySelectorAll('.item-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Não abrir se clicou no botão (já tem evento próprio)
            if (e.target.closest('button')) return;
            
            const itemId = this.dataset.itemId;
            mostrarDetalhesItem(itemId);
        });
    });
}

function mostrarDetalhesItem(itemId) {
    const item = itensData.find(i => i.id === parseInt(itemId));
    if (!item) return;
    
    const corRaridade = raridadeCores[item.raridade] || "#8b0000";
    
    // Criar modal de detalhes
    const modalHTML = `
        <div class="modal fade" id="itemModal${item.id}" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title">${item.nome}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center mb-4">
                            <img src="${item.imagem}" alt="${item.nome}" class="img-fluid rounded" style="max-height: 200px;" onerror="this.src='img/placeholder.jpg'">
                        </div>
                        
                        <p><strong>Tipo:</strong> ${item.tipo}</p>
                        <p><strong>Raridade:</strong> <span style="color: ${corRaridade}">${item.raridade}</span></p>
                        <p><strong>Descrição:</strong> ${item.descricao}</p>
                        
                        <div class="mt-3">
                            <strong>Propriedades:</strong>
                            <div class="propriedades mt-2">
                                ${item.propriedades.map(prop => 
                                    `<span class="propriedade-tag">${prop}</span>`
                                ).join('')}
                            </div>
                        </div>
                        
                        <hr class="border-secondary">
                        
                        <h6>Informações Adicionais:</h6>
                        <ul class="text-secondary">
                            <li>Item #${item.id}</li>
                            <li>Pode ser usado por: Qualquer classe</li>
                            <li>Peso: 1 kg</li>
                        </ul>
                    </div>
                    <div class="modal-footer border-secondary">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-outline-red" onclick="alert('Funcionalidade em desenvolvimento')">Adicionar à Ficha</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal antigo se existir
    const modalAntigo = document.getElementById(`itemModal${item.id}`);
    if (modalAntigo) {
        modalAntigo.remove();
    }
    
    // Adicionar modal ao DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById(`itemModal${item.id}`));
    modal.show();
    
    // Remover modal do DOM quando fechado
    document.getElementById(`itemModal${item.id}`).addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Função para filtrar itens por raridade
function filtrarItens(raridade) {
    const container = document.getElementById('itens-container');
    if (!container) return;
    
    const itensFiltrados = raridade === 'todos' 
        ? itensData 
        : itensData.filter(item => item.raridade.toLowerCase() === raridade.toLowerCase());
    
    container.innerHTML = itensFiltrados.map(item => {
        const corRaridade = raridadeCores[item.raridade] || "#8b0000";
        
        return `
        <div class="col-md-6 col-lg-4">
            <div class="card item-card h-100">
                <div class="card-img-top position-relative">
                    <img src="${item.imagem}" alt="${item.nome}" class="img-fluid" onerror="this.src='img/placeholder.jpg'">
                    <span class="raridade-badge" style="background-color: ${corRaridade}">${item.raridade}</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${item.nome}</h3>
                    <p class="card-text item-tipo"><small class="text-secondary">${item.tipo}</small></p>
                    <p class="card-text">${item.descricao.substring(0, 80)}...</p>
                    
                    <button class="btn btn-outline-red ver-detalhes w-100 mt-3" data-id="${item.id}">
                        Ver Detalhes
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
    
    adicionarEventListeners();
}

// Função para buscar itens
function buscarItens(termo) {
    if (!termo || termo.length < 2) {
        renderizarItens();
        return;
    }
    
    const termoLower = termo.toLowerCase();
    const itensFiltrados = itensData.filter(item => 
        item.nome.toLowerCase().includes(termoLower) ||
        item.descricao.toLowerCase().includes(termoLower) ||
        item.tipo.toLowerCase().includes(termoLower) ||
        item.propriedades.some(prop => prop.toLowerCase().includes(termoLower))
    );
    
    const container = document.getElementById('itens-container');
    if (!container) return;
    
    if (itensFiltrados.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-secondary">Nenhum item encontrado para "${termo}"</p>
                <button class="btn btn-outline-red mt-3" onclick="renderizarItens()">Limpar busca</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = itensFiltrados.map(item => {
        const corRaridade = raridadeCores[item.raridade] || "#8b0000";
        
        return `
        <div class="col-md-6 col-lg-4">
            <div class="card item-card h-100">
                <div class="card-img-top position-relative">
                    <img src="${item.imagem}" alt="${item.nome}" class="img-fluid" onerror="this.src='img/placeholder.jpg'">
                    <span class="raridade-badge" style="background-color: ${corRaridade}">${item.raridade}</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${item.nome}</h3>
                    <p class="card-text item-tipo"><small class="text-secondary">${item.tipo}</small></p>
                    <p class="card-text">${item.descricao}</p>
                    
                    <button class="btn btn-outline-red ver-detalhes w-100 mt-3" data-id="${item.id}">
                        Ver Detalhes
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
    
    adicionarEventListeners();
}

// Inicializar a página
document.addEventListener('DOMContentLoaded', function() {
    renderizarItens();
    
    // Adicionar filtros na página (opcional)
    const filtrosBar = document.createElement('div');
    filtrosBar.className = 'filtros-bar mb-4 d-flex flex-wrap gap-2 align-items-center';
    filtrosBar.innerHTML = `
        <span class="text-secondary me-2">Filtrar por:</span>
        <button class="btn btn-sm btn-outline-secondary filtro-ativo" data-filtro="todos">Todos</button>
        <button class="btn btn-sm btn-outline-secondary" data-filtro="incomum">Incomum</button>
        <button class="btn btn-sm btn-outline-secondary" data-filtro="raro">Raro</button>
        <button class="btn btn-sm btn-outline-secondary" data-filtro="épico">Épico</button>
        <button class="btn btn-sm btn-outline-secondary" data-filtro="lendário">Lendário</button>
        
        <div class="ms-auto search-box">
            <input type="text" class="form-control form-control-sm" id="buscaItens" placeholder="Buscar itens..." style="background:#222; border-color:#444; color:#fff;">
        </div>
    `;
    
    const titulo = document.querySelector('.page-title');
    if (titulo) {
        titulo.insertAdjacentElement('afterend', filtrosBar);
    }
    
    // Event listeners para filtros
    document.querySelectorAll('[data-filtro]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('[data-filtro]').forEach(b => b.classList.remove('filtro-ativo'));
            this.classList.add('filtro-ativo');
            
            const filtro = this.dataset.filtro;
            filtrarItens(filtro);
        });
    });
    
    // Event listener para busca
    const buscaInput = document.getElementById('buscaItens');
    if (buscaInput) {
        let timeoutId;
        buscaInput.addEventListener('input', function() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                buscarItens(this.value);
            }, 300);
        });
    }
});

// Tornar funções globais acessíveis
window.filtrarItens = filtrarItens;
window.buscarItens = buscarItens;
window.mostrarDetalhesItem = mostrarDetalhesItem;