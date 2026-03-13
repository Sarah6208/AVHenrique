const form = document.querySelector("#formMensagem"); // const não muda; querySelector seleciona elemento
const input = document.querySelector("#mensagem");
const lista = document.querySelector("#lista");

let editando = null; // let pode mudar

// quando apertar Enter no formulário
form.addEventListener("submit", (e) => { // addEventListener ve evento; submit envia formulário
  e.preventDefault();
  adicionar();
});

function adicionar() {
  const texto = input.value.trim(); // .trim tira espaços extras
  if (texto === "") return;

  if (editando !== null) {
    // se estiver editando, troca o texto
    lista.children[editando].querySelector("span").textContent = texto; // children pega filho, textContent troca texto
    editando = null; // sai da editação
  } else {
    // cria novo item
    const li = document.createElement("li"); // li cria item de lista

    const span = document.createElement("span"); // span cria um elemento de texto
    span.textContent = texto;
    span.style.cursor = "pointer";

    // clicar no texto para editar
    span.addEventListener("click", () => {
      input.value = span.textContent; // input.value é valor do campo
      editando = Array.from(lista.children).indexOf(li); // Array.from transforma em array; indexOf é a posição do li
    });

    // botão excluir
    const excluirBtn = document.createElement("button"); // excluirBtn botão excluir
    excluirBtn.textContent = "Excluir";
    excluirBtn.addEventListener("click", () => {
      li.remove(); // li.remove remove item da lista
      editando = null;
    });

    li.append(span, excluirBtn);
    lista.append(li);
  }

  input.value = ""; // input.value limpa caixinha de texto
}

window.adicionar = adicionar; // window.adicionar deixa função acessível globalmente
