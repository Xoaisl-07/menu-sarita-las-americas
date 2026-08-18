const WHATSAPP_NUMBER = "18097810585";

const products = [
  {
    name: "Copa de Helado",
    category: "Helados",
    price: "RD$ 150",
    emoji: "🍨",
    description: "Dos bolas de helado con toppings a elegir."
  },
  {
    name: "Cono de Helado",
    category: "Helados",
    price: "RD$ 125",
    emoji: "🍦",
    description: "Helado servido en cono crujiente."
  },
  {
    name: "Sundae de Chocolate",
    category: "Helados",
    price: "RD$ 185",
    emoji: "🍫",
    description: "Helado, chocolate, sirope y crema."
  },
  {
    name: "Sundae de Fresa",
    category: "Helados",
    price: "RD$ 185",
    emoji: "🍓",
    description: "Helado con fresa, sirope y crema."
  },
  {
    name: "Banana Split",
    category: "Especiales",
    price: "RD$ 250",
    emoji: "🍌",
    description: "Banana, helado, toppings y crema."
  },
  {
    name: "Brownie con Helado",
    category: "Postres",
    price: "RD$ 240",
    emoji: "🍫",
    description: "Brownie tibio acompañado de helado."
  },
  {
    name: "Waffle con Helado",
    category: "Postres",
    price: "RD$ 260",
    emoji: "🧇",
    description: "Waffle dulce con helado y toppings."
  },
  {
    name: "Crepe con Helado",
    category: "Postres",
    price: "RD$ 275",
    emoji: "🥞",
    description: "Crepe relleno con helado y sirope."
  },
  {
    name: "Batida de Vainilla",
    category: "Batidas",
    price: "RD$ 195",
    emoji: "🥤",
    description: "Batida cremosa de vainilla."
  },
  {
    name: "Batida de Chocolate",
    category: "Batidas",
    price: "RD$ 210",
    emoji: "🥛",
    description: "Batida de chocolate, cremosa y fría."
  },
  {
    name: "Batida de Fresa",
    category: "Batidas",
    price: "RD$ 210",
    emoji: "🍓",
    description: "Batida de fresa con textura cremosa."
  },
  {
    name: "Batida de Oreo",
    category: "Batidas",
    price: "RD$ 225",
    emoji: "🍪",
    description: "Batida de Oreo con trozos de galleta."
  },
  {
    name: "Milkshake de Café",
    category: "Batidas",
    price: "RD$ 225",
    emoji: "☕",
    description: "Milkshake con sabor intenso a café."
  },
  {
    name: "Malteada de Caramelo",
    category: "Batidas",
    price: "RD$ 230",
    emoji: "🥤",
    description: "Malteada cremosa con caramelo."
  },
  {
    name: "Paleta de Fresa",
    category: "Helados",
    price: "RD$ 90",
    emoji: "🍓",
    description: "Paleta fría con sabor a fresa."
  },
  {
    name: "Paleta de Chocolate",
    category: "Helados",
    price: "RD$ 100",
    emoji: "🍫",
    description: "Paleta cremosa de chocolate."
  },
  {
    name: "Yogurt Helado",
    category: "Especiales",
    price: "RD$ 180",
    emoji: "🍧",
    description: "Yogurt helado con toppings a elegir."
  },
  {
    name: "Parfait de Frutas",
    category: "Postres",
    price: "RD$ 220",
    emoji: "🍓",
    description: "Capas de yogurt, frutas y granola."
  },
  {
    name: "Affogato",
    category: "Especiales",
    price: "RD$ 210",
    emoji: "☕",
    description: "Helado de vainilla con espresso."
  },
  {
    name: "Torta Helada",
    category: "Especiales",
    price: "RD$ 295",
    emoji: "🍰",
    description: "Porción de torta helada para compartir."
  }
];

const productsGrid = document.getElementById("productsGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const categoryFilters = document.getElementById("categoryFilters");
const year = document.getElementById("year");

let currentCategory = "Todos";

function buildWhatsAppUrl(productName) {
  const message = `Hola, quisiera saber si tienen disponible: ${productName}.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      currentCategory === "Todos" ||
      product.category === currentCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  productsGrid.innerHTML = "";

  filteredProducts.forEach((product) => {
    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `
      <div class="product-visual">
        <span class="product-category">${product.category}</span>
        <span aria-hidden="true">${product.emoji}</span>
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>

        <p>${product.description}</p>

        <div class="product-footer">
          <span class="product-price">${product.price}</span>

          <a
            class="product-btn"
            href="${buildWhatsAppUrl(product.name)}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar disponibilidad de ${product.name} por WhatsApp"
          >
            💬 Consultar
          </a>
        </div>
      </div>
    `;

    productsGrid.appendChild(card);
  });

  emptyState.hidden = filteredProducts.length !== 0;
}

categoryFilters.addEventListener("click", (event) => {
  const button = event.target.closest(".filter-btn");

  if (!button) return;

  categoryFilters.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  currentCategory = button.dataset.category;

  renderProducts();
});

searchInput.addEventListener("input", renderProducts);

year.textContent = new Date().getFullYear();

renderProducts();