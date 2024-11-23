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

  editarCategoria(newCategoria) {
    this.categoria.forEach((categoria) => {
      if (categoria.nombreCategoria === newCategoria.nombreCategoria) {
        categoria.nombreCategoria = newCategoria.nombreCategoria;
        categoria.productos = newCategoria.productos;
        categoria.avanzarProducto = newCategoria.avanzarProducto;
      } else {
        return;
      }
    });
  }
}

export default Menu;
