// Definición de la base de datos
const db = {
  // Métodos para interactuar con la base de datos
  methods: {
    // Busca un elemento por su id
    find: (id) => {
      return db.items.find((item) => item.id === id);
    },
    // Actualiza la cantidad de elementos en la base de datos según el carrito de compras
    remove: (items) => {
      items.forEach((item) => {
        const product = db.methods.find(item.id);
        product.qty = product.qty - item.qty;
      });

      // Imprime la base de datos actualizada
      console.log(db);
    },
  },
  // Lista de productos en la base de datos
  items: [
    {
      id: 0,
      title: "Funko Pop batman",
      price: 250,
      qty: 5,
    },
    {
      id: 1,
      title: "Funko Pop messi",
      price: 300,
      qty: 20,
    },
    {
      id: 2,
      title: "Funko Pop ronaldo",
      price: 100,
      qty: 2,
    },
    {
      id: 3,
      title: "Ipod",
      price: 1000,
      qty: 8,
    },
  ],
};

// Objeto que representa el carrito de compras
const shoppingCart = {
  // Lista de elementos en el carrito
  items: [],
  // Métodos para manipular el carrito
  methods: {
    // Añade un elemento al carrito o incrementa su cantidad si ya existe
    add: (id, qty) => {
      const cartItem = shoppingCart.methods.get(id);

      if (cartItem) {
        // Verifica si hay inventario suficiente antes de incrementar la cantidad
        if (shoppingCart.methods.hasInventory(id, qty + cartItem.qty)) {
          cartItem.qty++;
        } else {
          alert("No hay más inventario");
        }
      } else {
        // Agrega un nuevo elemento al carrito
        shoppingCart.items.push({ id, qty });
      }
    },
    // Reduce la cantidad de un elemento en el carrito o lo elimina si la cantidad llega a cero
    remove: (id, qty) => {
      const cartItem = shoppingCart.methods.get(id);

      if (cartItem.qty - qty > 0) {
        // Reduce la cantidad si queda inventario
        cartItem.qty--;
      } else {
        // Elimina el elemento del carrito si la cantidad llega a cero
        shoppingCart.items = shoppingCart.items.filter(
          (item) => item.id !== id
        );
      }
    },
    // Retorna la cantidad total de elementos en el carrito
    count: () => {
      return shoppingCart.items.reduce((acc, item) => acc + item.qty, 0);
    },
    // Obtiene un elemento específico del carrito por su id
    get: (id) => {
      const index = shoppingCart.items.findIndex((item) => item.id === id);
      return index >= 0 ? shoppingCart.items[index] : null;
    },
    // Calcula el precio total de los elementos en el carrito
    getTotal: () => {
      let total = 0;
      shoppingCart.items.forEach((item) => {
        const found = db.methods.find(item.id);
        total += found.price * item.qty;
      });
      return total;
    },
    // Verifica si hay inventario suficiente para agregar un elemento al carrito
    hasInventory: (id, qty) => {
      return db.items.find((item) => item.id === id).qty - qty >= 0;
    },
    // Realiza la compra, actualizando la base de datos y vaciando el carrito
    purchase: () => {
      db.methods.remove(shoppingCart.items);
      shoppingCart.items = [];
    },
  },
};

// Inicializa la renderización de la tienda
renderStore();

// Función para renderizar la tienda
function renderStore() {
  // Genera el HTML para los elementos de la tienda
  const html = db.items.map((item) => {
    return `
        <div class="item">
            <div class="title">${item.title}</div>
            <div class="price">${numberToCurrency(item.price)}</div>
            <div class="qty">${item.qty} units</div>
            <div class="actions"><button class="add" data-id="${
              item.id
            }">Add to the shopping cart</button></div>
        </div>`;
  });

  // Inserta el HTML generado en el contenedor de la tienda
  document.querySelector("#store-container").innerHTML = html.join("");

  // Agrega eventos click a los botones de "Add to the shopping cart"
  document.querySelectorAll(".item .actions .add").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(button.getAttribute("data-id"));
      const item = db.methods.find(id);

      // Verifica si hay inventario antes de agregar al carrito
      if (item && item.qty - 1 > 0) {
        shoppingCart.methods.add(id, 1);
        console.log(db, shoppingCart);
        renderShoppingCart();
      } else {
        alert("Ya no hay existencia de ese artículo");
      }
    });
  });
}

// Función para renderizar el carrito de compras
function renderShoppingCart() {
  // Genera el HTML para los elementos del carrito
  const html = shoppingCart.items.map((item) => {
    const dbItem = db.methods.find(item.id);
    return `
            <div class="item">
                <div class="title">${dbItem.title}</div>
                <div class="price">${numberToCurrency(dbItem.price)}</div>
                <div class="qty">${item.qty} units</div>
                <div class="subtotal">Subtotal: ${numberToCurrency(
                  item.qty * dbItem.price
                )}</div>
                <div class="actions">
                    <button class="addOne" data-id="${dbItem.id}">+</button>
                    <button class="removeOne" data-id="${dbItem.id}">-</button>
                </div>
            </div>`;
  });

  // Genera el HTML para el encabezado y los botones del carrito
  const closeButton = `<div class="cart-header"><button id="bClose">Close</button></div>`;
  const purchaseButton =
    shoppingCart.items.length > 0
      ? `<div class="cart-actions"><button id="bPurchase">Terminar compra</button></div>`
      : "";
  const total = shoppingCart.methods.getTotal();
  const totalDiv = `<div class="total">Total: ${numberToCurrency(total)}</div>`;

  // Inserta el HTML generado en el contenedor del carrito
  document.querySelector("#shopping-cart-container").innerHTML =
    closeButton + html.join("") + totalDiv + purchaseButton;

  // Muestra el contenedor del carrito y oculta la tienda
  document.querySelector("#shopping-cart-container").classList.remove("hide");
  document.querySelector("#shopping-cart-container").classList.add("show");

  // Agrega eventos click a los botones de "+" y "-" en el carrito
  document.querySelectorAll(".addOne").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(button.getAttribute("data-id"));
      shoppingCart.methods.add(id, 1);
      renderShoppingCart();
    });
  });

  document.querySelectorAll(".removeOne").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(button.getAttribute("data-id"));
      shoppingCart.methods.remove(id, 1);
      renderShoppingCart();
    });
  });

  // Agrega evento click para cerrar el carrito
  document.querySelector("#bClose").addEventListener("click", (e) => {
    document.querySelector("#shopping-cart-container").classList.remove("show");
    document.querySelector("#shopping-cart-container").classList.add("hide");
  });

  // Agrega evento click al botón de "Terminar compra"
  const bPurchase = document.querySelector("#bPurchase");
  if (bPurchase) {
    bPurchase.addEventListener("click", (e) => {
      shoppingCart.methods.purchase();
    });
  }
}

// Función para formatear un número como moneda
function numberToCurrency(n) {
  return new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 2,
    style: "currency",
    currency: "USD",
  }).format(n);
}
