const pizzas = [
  { nome: "4 Queijos", p15: 20.85, p20: 30.88, p35: 55.26, img: "4queijos.jpg" },
  { nome: "5 Queijos", p15: 23.85, p20: 32.88, p35: 59.26, img: "5queijos.jpg" },
  { nome: "5 Queijos Especial", p15: 25.00, p20: 38.63, p35: 71.06, img: "5queijosespecial.jpg" },
  { nome: "Atum", p15: 23.00, p20: 34.13, p35: 62.06, img: "atum.jpg" },
  { nome: "Bacon", p15: 20.00, p20: 29.13, p35: 52.06, img: "bacon.jpg" },
  { nome: "Bacon e Calabresa", p15: 22.25, p20: 33.63, p35: 60.50, img: "baconcalabresa.jpg" },
  { nome: "Brigadeiro", p15: 17.25, p20: 23.50, p35: 38.60, img: "brigadeiro.jpg" },
  { nome: "Calabresa", p15: 20.25, p20: 29.63, p35: 52.26, img: "calabresa.jpg" },
  { nome: "Margherita", p15: 18.10, p20: 25.38, p35: 44.26, img: "margherita.jpg" },
  { nome: "Margherita e Bacon", p15: 20.10, p20: 29.38, p35: 52.26, img: "margheritabacon.jpg" },
  { nome: "Presunto", p15: 20.00, p20: 30.13, p35: 55.06, img: "presunto.jpg" },
  { nome: "Presunto e Calabresa", p15: 20.50, p20: 34.88, p35: 64.86, img: "presuntocalabresa.jpg" }
];

const container = document.getElementById("pizzas-container");

pizzas.forEach((pizza, index) => {
  const card = document.createElement("div");
  card.className = "pizza";
  card.innerHTML = `
    <img src="${pizza.img}" alt="${pizza.nome}">
    <h3>${pizza.nome}</h3>
    <label><input type="checkbox" data-index="${index}" data-size="15" value="${pizza.nome} 15cm - R$${pizza.p15.toFixed(2)}"> 15cm - R$${pizza.p15.toFixed(2)}</label><input type="number" min="1" value="1" class="qtd" data-index="${index}" data-size="15"><br>
    <label><input type="checkbox" data-index="${index}" data-size="20" value="${pizza.nome} 20cm - R$${pizza.p20.toFixed(2)}"> 20cm - R$${pizza.p20.toFixed(2)}</label><input type="number" min="1" value="1" class="qtd" data-index="${index}" data-size="20"><br>
    <label><input type="checkbox" data-index="${index}" data-size="35" value="${pizza.nome} 35cm - R$${pizza.p35.toFixed(2)}"> 35cm - R$${pizza.p35.toFixed(2)}</label><input type="number" min="1" value="1" class="qtd" data-index="${index}" data-size="35">
  `;
  container.appendChild(card);
});

document.getElementById("pedidoBtn").addEventListener("click", () => {
  const selecionadas = document.querySelectorAll("input[type='checkbox']:checked");
  if (selecionadas.length === 0) {
    alert("Escolha pelo menos uma pizza 🍕");
    return;
  }

  let mensagem = "Olá! Gostaria de fazer o seguinte pedido:%0A%0A";
  selecionadas.forEach(item => {
    const qtd = item.parentElement.nextElementSibling.value;
    mensagem += `- ${item.value} (x${qtd})%0A`;
  });

  mensagem += "%0A🚚 Frete Grátis%0A📍 Fadel Jabur 96 - Primavera - Cornélio Procópio%0A📞 (43) 9 8423-4418";
  const url = `https://wa.me/5543984234418?text=${mensagem}`;
  window.open(url, "_blank");
});
