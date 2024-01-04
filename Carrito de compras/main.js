const db = {
  methods: {
    find: (id) => {},
    remove: (item) => {},
  },
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
      id: 0,
      title: "Funko Pop ronaldo",
      price: 100,
      qty: 2,
    },
  ],
};

const shoppingCart = {
  items: [],
  methods: {
    add: (id, qty) => {},
    remove: (id, qty) => {},
    count: () => {},
    get: (id) => {},
    getTotal: () => {},
    hasInventory: (id, qty) => {},
    purchase: () => {},
  },
};
