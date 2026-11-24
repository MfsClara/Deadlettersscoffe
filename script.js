
const telaCadastro = document.getElementById('tela-cadastro');
const telaLista = document.getElementById('tela-lista');
const telaEdicao = document.getElementById('tela-edicao');
const telaExclusao = document.getElementById('tela-exclusao');

const formCadastro = document.getElementById('form-cadastro');
const cadCodigo = document.getElementById('cad-codigo');
const cadProduto = document.getElementById('cad-produto');
const cadDescricao = document.getElementById('cad-descricao');
const cadPreco = document.getElementById('cad-preco');
const cadFoto = document.getElementById('cad-foto');
const imgPreview = document.getElementById('img-preview');
const txtPreview = document.getElementById('txt-preview');
const nomeArquivoCad = document.getElementById('nome-arquivo-cad');
const btnIrLista = document.getElementById('btn-ir-lista');

const tabelaProdutos = document.getElementById('tabela-produtos');
const btnVoltarCadastro = document.getElementById('btn-voltar-cadastro');

const formEdicao = document.getElementById('form-edicao');
const editCodigoLbl = document.getElementById('edit-codigo-lbl');
const editProduto = document.getElementById('edit-produto');
const editDescricao = document.getElementById('edit-descricao');
const editPreco = document.getElementById('edit-preco');
const editFoto = document.getElementById('edit-foto');
const imgPreviewEdit = document.getElementById('img-preview-edit');
const nomeArquivoEdit = document.getElementById('nome-arquivo-edit');
const btnCancelaEdicao = document.getElementById('btn-cancela-edicao');

const excCodigo = document.getElementById('exc-codigo');
const excProduto = document.getElementById('exc-produto');
const excDescricao = document.getElementById('exc-descricao');
const excPreco = document.getElementById('exc-preco');
const imgPreviewExc = document.getElementById('img-preview-exc');
const btnConfirmaExclusao = document.getElementById('btn-confirma-exclusao');
const btnCancelaExclusao = document.getElementById('btn-cancela-exclusao');

let codigoParaExcluir = null;
let codigoParaEditar = null;
let fotoBase64Cadastro = "";
let fotoBase64Edicao = "";

function mostrarTela(tela) {
    telaCadastro.style.display = 'none';
    telaLista.style.display = 'none';
    telaEdicao.style.display = 'none';
    telaExclusao.style.display = 'none';
    tela.style.display = 'block';
}

const produtosIniciais = [
    { codigo: "C01", produto: "Café Espresso", descricao: "Café espresso curto e encorpado", preco: "6.00", foto: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=300&q=80" },
    { codigo: "C02", produto: "Café Latte", descricao: "Café espresso com leite vaporizado", preco: "9.50", foto: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=300&q=80" },
    { codigo: "C03", produto: "Cappuccino", descricao: "Café, leite vaporizado e espuma cremosa", preco: "10.00", foto: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=300&q=80" },
    { codigo: "C04", produto: "Mocha Cremoso", descricao: "Café espresso com calda de chocolate e leite", preco: "12.00", foto: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=300&q=80" },
    { codigo: "C05", produto: "Chocolate Quente", descricao: "Chocolate cremoso tradicional", preco: "11.00", foto: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=300&q=80" },
    { codigo: "C06", produto: "Chá Gelado", descricao: "Chá preto gelado com limão e hortelã", preco: "8.00", foto: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80" },
    { codigo: "C07", produto: "Frapuccino", descricao: "Café gelado batido com gelo e chantilly", preco: "14.00", foto: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=300&q=80" },
    { codigo: "C08", produto: "Água com Gás", descricao: "Garrafa de água mineral 500ml", preco: "5.00", foto: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=300&q=80" },
    
    { codigo: "S01", produto: "Pão de Queijo", descricao: "Pão de queijo artesanal mineiro", preco: "6.50", foto: "https://panutti.com.br/produtos/detalhes/pao-de-queijo-tradicional-p-25-g/" },
    { codigo: "S02", produto: "Misto Quente", descricao: "Pão, presunto e queijo na chapa", preco: "9.00", foto: "https://www.google.com/imgres?q=misto%20quente&imgurl=https%3A%2F%2Fassets.unileversolutions.com%2Frecipes-v2%2F116733.jpg&imgrefurl=https%3A%2F%2Fwww.hellmanns.com.br%2Fr%2Fmisto-quente-crocante.html%2F116733&docid=CpKK1VtUgbVbpM&tbnid=xGqeqDZR33ey5M&vet=12ahUKEwjktODai6GYAxXEpZUCHRXkKdwQnPAOegQIQBAA..i&w=350&h=250&hcb=2&ved=2ahUKEwjktODai6GYAxXEpZUCHRXkKdwQnPAOegQIQBAA" },
    { codigo: "S03", produto: "Coxinha de Frango", descricao: "Coxinha crocante com frango e catupiry", preco: "8.50", foto: "https://cozinha365.com.br/receitas/coxinha-de-frango-tradicional-com-massa-macia-e-recheio-cremoso/" },
    { codigo: "S04", produto: "Quiche de Alho-Poró", descricao: "Torta salgada fina recheada", preco: "12.50", foto: "https://www.receitasnestle.com.br/receitas/quiche-de-alho-poro" },
    { codigo: "S05", produto: "Croissant de Frango", descricao: "Croissant amanteigado com recheio", preco: "13.00", foto: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80" },
    { codigo: "S06", produto: "Empadinha de Palmito", descricao: "Massa com recheio cremoso de palmito", preco: "8.00", foto: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80" },
    
    { codigo: "D01", produto: "Bolo de Chocolate", descricao: "Fatia de bolo fofinho com cobertura", preco: "10.00", foto: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=300&q=80" },
    { codigo: "D02", produto: "Cheesecake de Frutas", descricao: "Torta de queijo com frutas vermelhas", preco: "15.00", foto: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=300&q=80" },
    { codigo: "D03", produto: "Torta de Limão", descricao: "Massa crocante com creme cítrico e suspiro", preco: "11.00", foto: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=300&q=80" },
    { codigo: "D04", produto: "Brownie de Chocolate", descricao: "Brownie denso com pedaços de nozes", preco: "9.50", foto: "https://images.unsplash.com/photo-1514517521153-1be72277b32f?auto=format&fit=crop&w=300&q=80" },
    { codigo: "D05", produto: "Donut Recheado", descricao: "Rosquinha americana com chocolate", preco: "8.00", foto: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80" },
    { codigo: "D06", produto: "Cookie com Gotas", descricao: "Cookie com chocolate meio amargo", preco: "7.00", foto: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=300&q=80" }
];

window.onload = function() {
    let produtosSalvos = JSON.parse(localStorage.getItem('produtos_cafeteria'));
     if (!produtosSalvos || produtosSalvos.length === 0) {
        localStorage.setItem('produtos_cafeteria', JSON.stringify(produtosIniciais));
    }
    atualizarTabela();
};

function processarUploadImagem(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const maxTamanho = 300;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxTamanho) {
                    height *= maxTamanho / width;
                    width = maxTamanho;
                }
            } else {
                if (height > maxTamanho) {
                    width *= maxTamanho / height;
                    height = maxTamanho;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            callback(dataUrl);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

cadFoto.addEventListener('change', (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
        nomeArquivoCad.textContent = arquivo.name;
        processarUploadImagem(arquivo, (imagemPronta) => {
            fotoBase64Cadastro = imagemPronta;
            imgPreview.src = imagemPronta;
            imgPreview.style.display = 'block';
            txtPreview.style.display = 'none';
        });
    } else {
        nomeArquivoCad.textContent = "Nenhum arquivo";
        fotoBase64Cadastro = "";
        imgPreview.style.display = 'none';
        txtPreview.style.display = 'block';
    }
});

editFoto.addEventListener('change', (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
        nomeArquivoEdit.textContent = arquivo.name;
        processarUploadImagem(arquivo, (imagemPronta) => {
            fotoBase64Edicao = imagemPronta;
            imgPreviewEdit.src = imagemPronta;
        });
    }
});

formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();

    const codigoVal = cadCodigo.value.trim();
    const produtoVal = cadProduto.value.trim();
    const descricaoVal = cadDescricao.value.trim();
    const precoVal = cadPreco.value.trim();

    if (!codigoVal || !produtoVal || !descricaoVal || !precoVal || !fotoBase64Cadastro) {
        alert('Nenhum dos campos poderá ser vazio (selecione uma foto também)!');
        return;
    }

    if (produtoVal.length < 5) {
        alert('O nome do produto não poderá ter menos de 5 caracteres!');
        return;
    }

    if (isNaN(precoVal) || precoVal === '') {
        alert('O preço aceitará apenas números!');
        return;
    }

    let produtos = JSON.parse(localStorage.getItem('produtos_cafeteria')) || [];
    
    if (produtos.some(p => p.codigo === codigoVal)) {
        alert('Já existe um produto cadastrado com este código!');
        return;
    }

    const novoProduto = {
        codigo: codigoVal,
        produto: produtoVal,
        descricao: descricaoVal,
        preco: precoVal,
        foto: fotoBase64Cadastro
    };

    produtos.push(novoProduto);
    localStorage.setItem('produtos_cafeteria', JSON.stringify(produtos));

    alert('Produto cadastrado com sucesso!');
    
    limparFormularioCadastro();
    atualizarTabela();
    mostrarTela(telaLista);
});

function limparFormularioCadastro() {
    formCadastro.reset();
    fotoBase64Cadastro = "";
    nomeArquivoCad.textContent = "Nenhum arquivo";
    imgPreview.style.display = 'none';
    txtPreview.style.display = 'block';
}

btnIrLista.addEventListener('click', () => {
    atualizarTabela();
    mostrarTela(telaLista);
});

btnVoltarCadastro.addEventListener('click', () => {
    limparFormularioCadastro();
    mostrarTela(telaCadastro);
});

function atualizarTabela() {
    tabelaProdutos.innerHTML = '';
    let produtos = JSON.parse(localStorage.getItem('produtos_cafeteria')) || [];

    produtos.forEach((item) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.codigo}</td>
            <td>${item.produto}</td>
            <td>${item.descricao}</td>
            <td>
                <button class="btn-tabela-editar" onclick="prepararEdicao('${item.codigo}')">Editar</button>
                <button class="btn-tabela-excluir" onclick="prepararExclusao('${item.codigo}')">Excluir</button>
            </td>
        `;
        tabelaProdutos.appendChild(tr);
    });
}

window.prepararEdicao = function(codigo) {
    let produtos = JSON.parse(localStorage.getItem('produtos_cafeteria')) || [];
    const prod = produtos.find(p => p.codigo === codigo);

    if (prod) {
        codigoParaEditar = prod.codigo;
        editCodigoLbl.textContent = prod.codigo;
        editProduto.value = prod.produto;
        editDescricao.value = prod.descricao;
        editPreco.value = prod.preco;
        
        editFoto.value = "";
        fotoBase64Edicao = "";
        nomeArquivoEdit.textContent = "Manter foto atual";
        imgPreviewEdit.src = prod.foto;

        mostrarTela(telaEdicao);
    }
};

formEdicao.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const prodVal = editProduto.value.trim();
    const descVal = editDescricao.value.trim();
    const precoVal = editPreco.value.trim();

    if (!prodVal || !descVal || !precoVal) {
        alert('Nenhum dos campos poderá ser vazio!');
        return;
    }

    if (prodVal.length < 5) {
        alert('O nome do produto não poderá ter menos de 5 caracteres!');
        return;
    }

    if (isNaN(precoVal)) {
        alert('O preço aceitará apenas números!');
        return;
    }

    let produtos = JSON.parse(localStorage.getItem('produtos_cafeteria')) || [];
    
    produtos = produtos.map(p => {
        if (p.codigo === codigoParaEditar) {
            return {
                codigo: p.codigo,
                produto: prodVal,
                descricao: descVal,
                preco: precoVal,
                foto: fotoBase64Edicao !== "" ? fotoBase64Edicao : p.foto
            };
        }
        return p;
    });

    localStorage.setItem('produtos_cafeteria', JSON.stringify(produtos));
    alert('Alterações salvas com sucesso!');
    atualizarTabela();
    mostrarTela(telaLista);
});

btnCancelaEdicao.addEventListener('click', () => {
    mostrarTela(telaLista);
});

window.prepararExclusao = function(codigo) {
    let produtos = JSON.parse(localStorage.getItem('produtos_cafeteria')) || [];
    const prod = produtos.find(p => p.codigo === codigo);

    if (prod) {
        codigoParaExcluir = prod.codigo;
        excCodigo.textContent = prod.codigo;
        excProduto.textContent = prod.produto;
        excDescricao.textContent = prod.descricao;
        excPreco.textContent = prod.preco;
        imgPreviewExc.src = prod.foto;

        mostrarTela(telaExclusao);
    }
};

btnConfirmaExclusao.addEventListener('click', () => {
    if (confirm("Deseja excluir o produto?")) {
        let produtos = JSON.parse(localStorage.getItem('produtos_cafeteria')) || [];
        produtos = produtos.filter(p => p.codigo !== codigoParaExcluir);
        localStorage.setItem('produtos_cafeteria', JSON.stringify(produtos));
        
        atualizarTabela();
        mostrarTela(telaLista);
    } else {
        mostrarTela(telaLista);
    }
});

btnCancelaExclusao.addEventListener('click', () => {
    mostrarTela(telaLista);
});