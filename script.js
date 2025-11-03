const pizzas = [
  { nome: "4 Queijos", img: "pizzas/bp.png", p15: 21.00, p20: 31.00, p35: 55.00 },
  { nome: "5 Queijos", img: "pizzas/bp.png", p15: 24.00, p20: 33.00, p35: 60.00 },
  //{ nome: "5 Queijos Especial", img: "pizzas/bp.png", p15: 25.00, p20: 39.00, p35: 72.00 },
  { nome: "Atum", img: "pizzas/bp.png", p15: 23.00, p20: 35.00, p35: 62.00 },
  { nome: "Bacon", img: "pizzas/bp.png", p15: 20.00, p20: 30.00, p35: 52.00 },
  { nome: "Bacon e Calabresa", img: "pizzas/bp.png", p15: 22.25, p20: 34.00, p35: 60.00 },
  { nome: "Brigadeiro", img: "pizzas/bp.png", p15: 17.25, p20: 23.50, p35: 40.00 },
  { nome: "Calabresa", img: "pizzas/calabresa.png", p15: 20.25, p20: 30.00, p35: 52.00 },
  { nome: "Margherita", img: "pizzas/bp.png", p15: 18.00, p20: 25.00, p35: 44.00 },
  { nome: "Margherita e Bacon", img: "pizzas/margherita-e-bacon.png", p15: 20.00, p20: 29.38, p35: 52.00 },
  //{ nome: "Presunto", img: "pizzas/bp.png", p15: 20.00, p20: 30.00, p35: 54.00 },
  //{ nome: "Presunto e Calabresa", img: "pizzas/bp.png", p15: 20.50, p20: 35.00, p35: 62.00 }
];

const container = document.getElementById("pizzas-container");

// cria os cards
pizzas.forEach((pizza, index) => {
  const card = document.createElement("div");
  card.className = "pizza";
  card.innerHTML = `
    <img src="${pizza.img}" alt="${pizza.nome}">
    <h3>${pizza.nome}</h3>
    <div class="pizza-opcoes">
      <label>
        <input type="checkbox" data-index="${index}" data-size="15" value="${pizza.nome} 15cm"> 15cm - R$${pizza.p15.toFixed(2)}
        <input type="number" min="1" value="1" class="qtd">
      </label>
      <label>
        <input type="checkbox" data-index="${index}" data-size="20" value="${pizza.nome} 20cm"> 20cm - R$${pizza.p20.toFixed(2)}
        <input type="number" min="1" value="1" class="qtd">
      </label>
      <label>
        <input type="checkbox" class="pizza35" data-index="${index}" data-size="35" value="${pizza.nome} 35cm"> 35cm - R$${pizza.p35.toFixed(2)}
        <input type="number" min="1" value="1" class="qtd">
      </label>
      <div class="meia-opcao" style="display:none;">
        🍕 Escolha o tipo:
        <select class="tipo35">
          <option value="Inteira">Inteira</option>
          <option value="Meia">Meia a Meia</option>
        </select>
        <div class="sabor2" style="display:none;">
          <label>Escolha o segundo sabor:</label>
          <select class="saborExtra"></select>
        </div>
      </div>
    </div>
  `;
  container.appendChild(card);
});

// adiciona comportamento para pizzas 35cm
document.querySelectorAll(".pizza35").forEach(input => {
  input.addEventListener("change", (e) => {
    const meiaDiv = e.target.closest(".pizza-opcoes").querySelector(".meia-opcao");
    meiaDiv.style.display = e.target.checked ? "block" : "none";
  });
});

// exibe seletor de segundo sabor se "Meia a Meia"
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("tipo35")) {
    const container = e.target.closest(".meia-opcao");
    const saborDiv = container.querySelector(".sabor2");
    const selectSabor = saborDiv.querySelector(".saborExtra");

    if (e.target.value === "Meia") {
      saborDiv.style.display = "block";
      selectSabor.innerHTML = pizzas.map(p => `<option value="${p.nome}">${p.nome}</option>`).join("");
    } else {
      saborDiv.style.display = "none";
      selectSabor.innerHTML = "";
    }
  }
});

// WhatsApp
document.getElementById("pedidoBtn").addEventListener("click", () => {
  const selecionadas = document.querySelectorAll("input[type='checkbox']:checked");
  const endereco = document.getElementById("endereco").value.trim();
  const pagamento = document.getElementById("pagamento").value;
  const dataHora = document.getElementById("dataHora").value;

  if (selecionadas.length === 0) {
    alert("Escolha pelo menos uma pizza");
    return;
  }

  if (!endereco) {
    alert("Digite seu endereço de entrega");
    return;
  }

  if (!dataHora) {
    alert("Informe o dia e hora desejados para entrega");
    return;
  }

  let mensagem = "Novo Pedido Big's Pitzzinhas %0A%0A";

  for (let item of selecionadas) {
    const tamanho = item.dataset.size;
    const qtd = item.parentElement.querySelector(".qtd").value;
    let descricao = `${qtd}x ${item.value}`;

    // tratamento especial para 35cm
    if (tamanho === "35") {
      const meiaDiv = item.closest(".pizza-opcoes").querySelector(".meia-opcao");
      const tipo = meiaDiv.querySelector(".tipo35").value;
      if (tipo === "Meia") {
        const sabor2 = meiaDiv.querySelector(".saborExtra").value;
        descricao = `${qtd}x 35cm — metade ${item.value.replace(" 35cm","")} / metade ${sabor2}`;
      } else {
        descricao = `${qtd}x 35cm — inteira de ${item.value.replace(" 35cm","")}`;
      }
    }

    mensagem += `• ${descricao}%0A`;
  }

  const data = new Date(dataHora);
  const dataFormatada = data.toLocaleDateString('pt-BR');
  const horaFormatada = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  mensagem += `%0A| Endereço: ${endereco}`;
  mensagem += `%0A| Pagamento: ${pagamento}`;
  mensagem += `%0A| Entrega: ${dataFormatada} às ${horaFormatada}`;
  mensagem += `%0A%0A| Obrigado por pedir com a Big's Pitzzinhas!`;

  const url = `https://wa.me/5543984234418?text=${mensagem}`;
  window.open(url, "_blank");
});