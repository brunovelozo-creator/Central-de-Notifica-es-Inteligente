// Dados das notificações
const notificacoes = {
    cadastro: {
        titulo: "Cadastro realizado",
        mensagem: "O usuário foi cadastrado com sucesso.",
        icone: "bi-person-check-fill",
        classe: "text-primary",
        historico: "Cadastro realizado com sucesso."
    },

    acesso: {
        titulo: "Atenção à segurança",
        mensagem: "Verifique suas credenciais de acesso.",
        icone: "bi-shield-exclamation",
        classe: "text-warning",
        historico: "Verificação de segurança executada."
    },

    sistema: {
        titulo: "Sistema atualizado",
        mensagem: "Nenhuma atualização pendente foi encontrada.",
        icone: "bi-check-circle-fill",
        classe: "text-success",
        historico: "Consulta de atualizações realizada."
    }
};

// Elementos do Toast
const toastElemento = document.getElementById("notificacaoToast");
const toastTitulo = document.getElementById("toastTitulo");
const toastMensagem = document.getElementById("toastMensagem");
const toastIcon = document.getElementById("toastIcon");

// Elementos do histórico
const listaHistorico = document.getElementById("listaHistorico");
const contador = document.getElementById("contador");
const historicoVazio = document.getElementById("historicoVazio");

let quantidadeAcoes = 0;

// Cria uma única instância do Toast
const toast = bootstrap.Toast.getOrCreateInstance(toastElemento, {
    autohide: true,
    delay: 5000
});

// Mostra o Toast e registra a ação
function mostrarNotificacao(tipo) {
    const notificacao = notificacoes[tipo];

    toastTitulo.textContent = notificacao.titulo;
    toastMensagem.textContent = notificacao.mensagem;

    toastIcon.className = `bi ${notificacao.icone} me-2 ${notificacao.classe}`;

    toast.show();

    adicionarHistorico(notificacao.historico);
}

// Adiciona uma nova linha ao histórico
function adicionarHistorico(texto) {
    if (historicoVazio) {
        historicoVazio.remove();
    }

    const item = document.createElement("li");
    item.className = "list-group-item d-flex align-items-center gap-2";

    const icone = document.createElement("i");
    icone.className = "bi bi-check-circle-fill text-success";

    const mensagem = document.createElement("span");
    mensagem.textContent = texto;

    item.appendChild(icone);
    item.appendChild(mensagem);

    listaHistorico.appendChild(item);

    quantidadeAcoes++;
    contador.textContent = quantidadeAcoes;
}

// Limpa o histórico diretamente
function limparHistorico() {
    listaHistorico.innerHTML = "";

    const itemVazio = document.createElement("li");
    itemVazio.className = "list-group-item text-secondary text-center";
    itemVazio.id = "historicoVazio";
    itemVazio.textContent = "Nenhuma ação realizada ainda.";

    listaHistorico.appendChild(itemVazio);

    quantidadeAcoes = 0;
    contador.textContent = quantidadeAcoes;
}

// Botões dos Cards
document.getElementById("btnCadastro").addEventListener("click", function () {
    mostrarNotificacao("cadastro");
});

document.getElementById("btnAcesso").addEventListener("click", function () {
    mostrarNotificacao("acesso");
});

document.getElementById("btnSistema").addEventListener("click", function () {
    mostrarNotificacao("sistema");
});

// Botão Limpar histórico
document.getElementById("btnLimparHistorico").addEventListener("click", function () {
    limparHistorico();
});

// Botão de confirmação do Modal "Limpar tudo"
document.getElementById("btnConfirmarLimpeza").addEventListener("click", function () {
    limparHistorico();

    const modalElemento = document.getElementById("limparModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElemento);
    modal.hide();
});
