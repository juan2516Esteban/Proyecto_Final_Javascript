class Categoria {
  constructor(nombreCategoria) {
    this.nombreCategoria = nombreCategoria;
    this.productos = [];
  }

  agregarProducto(Producto) {
    this.productos.push(Producto);
  }

  SetNombreCategoria(newName) {
    this.nombreCategoria = newName;
  }
}

export default Categoria;
