const pizzas = [
  { nome: "4 Queijos", img: "pizzas/4queijos.jpg", p15: 20.85, p20: 30.88, p35: 55.26 },
  { nome: "5 Queijos", img: "pizzas/5queijos.jpg", p15: 23.85, p20: 32.88, p35: 59.26 },
  { nome: "5 Queijos Especial", img: "pizzas/5queijos-especial.jpg", p15: 25.00, p20: 38.63, p35: 71.06 },
  { nome: "Atum", img: "pizzas/atum.jpg", p15: 23.00, p20: 34.13, p35: 62.06 },
  { nome: "Bacon", img: "pizzas/bacon.jpg", p15: 20.00, p20: 29.13, p35: 52.06 },
  { nome: "Bacon e Calabresa", img: "pizzas/bacon-calabresa.jpg", p15: 22.25, p20: 33.63, p35: 60.50 },
  { nome: "Brigadeiro", img: "pizzas/brigadeiro.jpg", p15: 17.25, p20: 23.50, p35: 38.60 },
  { nome: "Calabresa", img: "pizzas/calabresa.jpg", p15: 20.25, p20: 29.63, p35: 52.26 },
  { nome: "Margherita", img: "pizzas/margherita.jpg", p15: 18.10, p20: 25.38, p35: 44.26 },
  { nome: "Margherita e Bacon", img: "pizzas/margherita-e-bacon.png", p15: 20.10, p20: 29.38, p35: 52.26 },
  { nome: "Presunto", img: "pizzas/presunto.jpg", p15: 20.00, p20: 30.13, p35: 55.06 },
  { nome: "Presunto e Calabresa", img: "pizzas/presunto-calabresa.jpg", p15: 20.50, p20: 34.88, p35: 64.86 }
];

const container = document.getElementById("pizzas-container");

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
        <input type="checkbox" data-index="${index}" data-size="35" value="${pizza.nome} 35cm"> 35cm - R$${pizza.p35.toFixed(2)}
        <input type="number" min="1" value="1" class="qtd">
      </label>
    </div>
  `;
  container.appendChild(card);
});

document.getElementById("pedidoBtn").addEventListener("click", () => {
  const selecionadas = document.querySelectorAll("input[type='checkbox']:checked");
  const endereco = document.getElementById("endereco").value.trim();
  const pagamento = document.getElementById("pagamento").value;

  if (selecionadas.length === 0) {
    alert("Escolha pelo menos uma pizza 🍕");
    return;
  }

  if (!endereco) {
    alert("Digite seu endereço de entrega 🏠");
    return;
  }

  let mensagem = "🍕 *Pedido Big’s Pitzzinhas* %0A%0A";
  selecionadas.forEach(item => {
    const qtd = item.parentElement.querySelector(".qtd").value;
    mensagem += `• ${qtd}x ${item.value}%0A`;
  });

  mensagem += `%0A🏠 *Endereço:* ${endereco}`;
  mensagem += `%0A💳 *Pagamento:* ${pagamento}`;
  mensagem += `%0A%0A🚚 *Frete grátis!*%0A📍 Fadel Jabur, 96 - Primavera - Cornélio Procópio%0A📞 (43) 9 8423-4418`;

  const url = `https://wa.me/5543984234418?text=${mensagem}`;
  window.open(url, "_blank");
});
