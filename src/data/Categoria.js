class Categoria {
  constructor(nombreCategoria) {
    this.nombreCategoria = nombreCategoria;
    this.productos = [];
    this.avanzarProducto = 0;
  }

  agregarProducto(Producto) {
    this.productos.push(Producto);
  }

  SetNombreCategoria(newName) {
    this.nombreCategoria = newName;
  }

  PaginarProductoAvanazar() {
    this.avanzarProducto += 1;
  }

  PaginarProductoRetroceder() {
    this.avanzarProducto -= 1;
  }
}

export default Categoria;
