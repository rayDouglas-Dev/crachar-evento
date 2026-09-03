let participantes = []; // coleção (array) de objetos

function gerarCodigo() {
  const ano = new Date().getFullYear();
  const aleatorio = Math.floor(Math.random() * 9000 + 1000);
  return `EVT${ano}-${aleatorio}`;
}

// Função "fábrica" que retorna um objeto literal — é aqui que
// nome, idade, ocupação, formação e código viram propriedades.
function criarParticipante(nome, idade, ocupacao, formacao) {
  return {
    codigo: gerarCodigo(),
    nome,
    idade,
    ocupacao,
    formacao,
    // método: uma propriedade cujo valor é uma função.
    // "this" dentro do método se refere ao próprio objeto.
    mostrarCracha() {
      return `${this.nome} (${this.idade}) · ${this.ocupacao} · crachá ${this.codigo}`;
    }
  };
}

function log(msg) {
  const box = document.getElementById('console-box');
  const p = document.createElement('div');
  p.className = 'linha';
  p.textContent = msg;
  box.appendChild(p);
  box.scrollTop = box.scrollHeight;
}

function renderLista() {
  const lista = document.getElementById('lista');
  document.getElementById('contador').textContent = participantes.length;
  lista.innerHTML = '';

  if (participantes.length === 0) {
    lista.innerHTML = '<p class="vazio">Nenhum participante cadastrado ainda.</p>';
    return;
  }

  participantes.forEach(p => {
    // Object.entries(p) devolve pares [chave, valor] — 
    // que "enumeramos" as propriedades de um objeto 
    const linhas = Object.entries(p)
      .filter(([chave, valor]) => typeof valor !== 'function')
      .map(([chave, valor]) => `${chave}: ${valor}`)
      .join(' · ');

    const div = document.createElement('div');
    div.className = 'cracha';
    div.innerHTML = `
      <div class="furo"></div>
      <div class="nome">${p.nome}</div>
      <div class="meta">${p.idade} anos · ${p.ocupacao} · ${p.formacao}</div>
      <span class="codigo">${p.codigo}</span>
      <div class="acoes">
        <button class="ghost" data-codigo="${p.codigo}" data-acao="mostrar">chamar .mostrarCracha()</button>
        <button class="ghost" data-codigo="${p.codigo}" data-acao="remover">remover</button>
        <button class="ghost" data-codigo="${p.codigo}" data-acao="pdf">gerar PDF</button>
      </div>
    `;
    lista.appendChild(div);
  });
}

document.getElementById('btn-cadastrar').addEventListener('click', () => {
  const nome = document.getElementById('in-nome').value.trim();
  const idade = document.getElementById('in-idade').value;
  const ocupacao = document.getElementById('in-ocupacao').value.trim();
  const formacao = document.getElementById('in-formacao').value.trim();
  const erroEl = document.getElementById('erro');

  if (!nome || !idade || !ocupacao || !formacao) {
    erroEl.textContent = 'Preencha todos os campos antes de cadastrar.';
    return;
  }
  erroEl.textContent = '';

  const novo = criarParticipante(nome, Number(idade), ocupacao, formacao);
  participantes.push(novo);
  log(`criarParticipante() → novo objeto com código ${novo.codigo}`);
  renderLista();

  ['in-nome','in-idade','in-ocupacao','in-formacao'].forEach(id => document.getElementById(id).value = '');
});

document.getElementById('lista').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const codigo = btn.dataset.codigo;

  if (btn.dataset.acao === 'mostrar') {
    // acesso via notação de colchetes usando uma condição dinâmica
    const alvo = participantes.find(p => p['codigo'] === codigo);
    log(alvo.mostrarCracha());
  }

  if (btn.dataset.acao === 'remover') {
    participantes = participantes.filter(p => p.codigo !== codigo);
    log(`participante ${codigo} removido da lista`);
    renderLista();
  }

  if (btn.dataset.acao === 'pdf') {
    const alvo = participantes.find(p => p['codigo'] === codigo);
    gerarCrachaPDF(alvo);
  }
});

renderLista();

function gerarCrachaPDF(participante) {
  if (!participante) {
    log('Não foi possível gerar o PDF: participante não encontrado.');
    return;
  }

  if (!window.jspdf || !window.jspdf.jsPDF) {
    log('A biblioteca de PDF não carregou corretamente. Verifique sua conexão e recarregue a página.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  doc.setFillColor(237, 231, 217);
  doc.rect(0, 0, width, height, 'F');

  doc.setDrawColor(32, 40, 31);
  doc.setLineWidth(1.2);
  doc.roundedRect(30, 28, 150, 230, 7, 7, 'S');

  doc.setFillColor(32, 40, 31);
  doc.roundedRect(30, 28, 150, 26, 7, 7, 'F');

  doc.setTextColor(237, 231, 217);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('CHECK-IN DO EVENTO', width / 2, 44, { align: 'center' });

  doc.setTextColor(32, 40, 31);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text(participante.nome.toUpperCase(), width / 2, 98, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(`${participante.idade} anos · ${participante.ocupacao}`, width / 2, 115, { align: 'center' });
  doc.text(participante.formacao, width / 2, 124, { align: 'center' });

  doc.setDrawColor(196, 131, 46);
  doc.setLineWidth(0.8);
  doc.line(50, 138, 160, 138);

  doc.setFont('courier', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(156, 100, 32);
  doc.text(`CÓDIGO: ${participante.codigo}`, width / 2, 157, { align: 'center' });

  doc.setTextColor(32, 40, 31);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('OBJETOS EM JS NA PRÁTICA', width / 2, 182, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Evento de programação e tecnologia', width / 2, 192, { align: 'center' });

  const dataEmissao = new Date().toLocaleDateString('pt-BR');
  doc.text(`Emitido em ${dataEmissao}`, width / 2, 218, { align: 'center' });

  doc.setDrawColor(32, 40, 31);
  doc.setLineWidth(0.8);
  doc.roundedRect(48, 225, 114, 18, 4, 4, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(32, 40, 31);
  doc.text('ACESSO CONFIRMADO', width / 2, 237, { align: 'center' });

  doc.save(`cracha-${participante.codigo}.pdf`);
  log(`PDF gerado com sucesso para ${participante.nome} (${participante.codigo})`);
}