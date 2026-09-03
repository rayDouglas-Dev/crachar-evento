# 🎫 Check-in do Evento (crachar-evento)

Sistema web para cadastro de participantes, gerenciamento de credenciais e geração de crachás personalizados em PDF para eventos.

---

## 📌 Sobre o Projeto

O **Check-in do Evento** é uma aplicação interativa desenvolvida com foco em conceitos práticos de JavaScript (como *Factory Functions*, métodos em objetos, manipulação da DOM e manipulação de coleções/arrays), aliada a uma interface visual estilizada e à geração de crachás prontos para impressão utilizando a biblioteca **jsPDF**.

---

## ✨ Funcionalidades

- **Cadastro de Participantes**: Registro de nome, idade, ocupação e formação profissional com validação de campos.
- **Identificador Único**: Geração automática de código de credencial único para cada participante (formato: `EVT<ANO>-<NUMERO>`).
- **Cards de Crachá Interativos**: Exibição da lista de participantes estilizada no formato visual de crachá com furo de fita.
- **Contador em Tempo Real**: Atualização instantânea da quantidade de participantes cadastrados.
- **Execução de Métodos de Objeto**: Demonstração do método `.mostrarCracha()` em tempo de execução.
- **Console Integrado na Interface**: Registro em tempo real (*logs*) de ações do sistema (criação de objetos, chamadas de métodos, exclusões e emissão de PDFs).
- **Emissão de Crachá em PDF**: Geração de documento PDF (formato A4) customizado, com bordas, tipografia, dados do participante, código e carimbo de "Acesso Confirmado".
- **Remoção de Participantes**: Possibilidade de excluir cadastros com atualização dinâmica da listagem.

---

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estruturação semântica da aplicação.
- **CSS3**:
  - Variáveis CSS (*Custom Properties*)
  - Layouts responsivos com **Flexbox** e **CSS Grid**
  - Fontes customizadas via Google Fonts (*Fraunces*, *Inter*, *JetBrains Mono*)
- **JavaScript (ES6+)**:
  - *Factory Functions* para instanciação de objetos
  - Manipulação de métodos e do ponteiro `this`
  - Métodos de iteração e transformação de arrays (`push`, `filter`, `find`, `map`, `forEach`)
  - Manipulação dinâmica da DOM e eventos delegados
- **[jsPDF](https://github.com/parallax/jsPDF)** (v2.5.1 via CDN): Criação e download de arquivos PDF diretamente no navegador (*client-side*).

---

## 📁 Estrutura de Arquivos

```bash
crachar-evento/
├── css/
│   └── style.css       # Estilos visuais, variáveis, layout e tipografia
├── js/
│   └── script.js       # Lógica da aplicação, manipulação de objetos e geração de PDF
├── index.html          # Estrutura principal da página
└── README.md           # Documentação do projeto
```

---

## 💻 Como Executar o Projeto

Como o projeto foi construído utilizando apenas tecnologias web nativas (*vanilla*), não é necessário instalar dependências ou configurar servidores complexos.

### Pré-requisitos
- Um navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, etc.).
- Conexão com a internet (para carregar as fontes do Google Fonts e o script do jsPDF via CDN).

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/crachar-evento.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd crachar-evento
   ```

3. **Abra o projeto:**
   - Dê um duplo clique no arquivo `index.html` para abrir diretamente no navegador; **ou**
   - Utilize uma extensão como o **Live Server** no VS Code; **ou**
   - Inicie um servidor local simples via terminal:
     ```bash
     # Usando Python 3
     python3 -m http.server 8000
     
     # Usando Node.js (npx)
     npx serve .
     ```

---

## 🛠️ Como Utilizar

1. Preencha os campos **Nome**, **Idade**, **Ocupação** e **Formação** no formulário.
2. Clique no botão **"Cadastrar e gerar crachá"**.
3. Na seção **Participantes**, utilize as opções disponíveis em cada crachá:
   - **`chamar .mostrarCracha()`**: Exibe as informações do participante no console embutido da tela.
   - **`remover`**: Remove o participante da lista.
   - **`gerar PDF`**: Faz o download instantâneo do crachá do participante em formato PDF pronto para impressão.

---

## 📄 Licença

Este projeto é disponibilizado para fins de estudo, demonstração e prática de desenvolvimento web. Sinta-se livre para utilizar, modificar e aprimorar.