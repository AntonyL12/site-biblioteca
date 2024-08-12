//elements.js
class LivroCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const livroCard = document.createElement('div');
    livroCard.className = 'card';
    livroCard.innerHTML = `
          <style> 
              .card{
                  display: inline-block;
                  padding: 0px;
                  margin-left: 50px;
                  justify-items: center;
                  margin-bottom: 20px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }

              .card-img-top{
                  height: 250px;
                  object-fit: cover;
              }

              .card-body {
                  text-align: center;
              }

              .btn-dark {
                  width: 100%;
              }
          </style>

          <img src="${this.getAttribute('src')}" class="card-img-top" alt="${this.getAttribute('title')}">
          <div class="card-body">
            <h5 class="card-title">${this.getAttribute('title')}</h5>
            <h5 class="card-text">${this.getAttribute('price')}</h5>
            <p class="card-text" style="font-size: small;">${this.getAttribute('discount')}</p>
            <a href="produto.html?id=${this.getAttribute('id')}">
              <button type="button" class="btn-dark">Comprar</button>
            </a>
          </div>
      `;

    this.appendChild(livroCard);
  }
}

customElements.define('livro-card', LivroCard);
// carregar produtos

async function loadProducts() {
  const response = await fetch("http://localhost:3000/products");
  const products = await response.json();
  const container = document.getElementById("products-container");

  products.forEach((product) => {
    const livroCard = document.createElement(livro-card);
    livroCard.setAttribute("id", product.id);
    livroCard.setAttribute("title", product.title);
    livroCard.setAttribute("price", product.price);
    livroCard.setAttribute("image", product.image);

    livroCard.addEventListener("click", () => {
      window.location.href = `produto.html?id=${products.id}`;
    });

    container.appendChild(LivroCard);
    
  });
}

  loadProducts();