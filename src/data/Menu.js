class Menu {
  constructor(nombreDelRestaurante) {
    this.categoria = [];
    this.nombreDelRestaurante = nombreDelRestaurante;
  }

  AgregarCategoria(Categoria) {
    this.categoria.push(Categoria);
  }

  SetNombreRestaurante(newName) {
    this.nombreDelRestaurante = newName;
  }
}

export default Menu;
