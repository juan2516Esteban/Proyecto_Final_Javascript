import React, { useRef, useState } from "react";
import "./App.css";

class Producto {
  constructor(nombre, descripcion, precio) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
  }
}

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

function App() {
  // Variables

  const inputNombreRestaurante = useRef(null);
  const inputCategoria = useRef(null);
  const Nameproduct = useRef(null);
  const [nameCategory, setNameCategory] = useState(null);
  const DescriptionProduct = useRef(null);
  const PriceProduct = useRef(null);
  const [showHeading, setShowHeading] = useState(false);
  const [menuInstance, setmenuInstance] = useState(null);
  const [categoriaIntance, setcategoriaIntance] = useState(null);

  const handleBlur = () => {
    const Nombre = inputNombreRestaurante.current;
    const Categoria = inputCategoria.current;

    Nombre.setCustomValidity("");
    Categoria.setCustomValidity("");

    if (!Nombre.checkValidity()) {
      Nombre.setCustomValidity(
        "Por favor revisa el nombre de tu restaurante no tenga menos de 3 caracteres, ademas no debe contener caracteres especiales"
      );
      Nombre.reportValidity();
      return;
    }

    if (!Categoria.checkValidity()) {
      Categoria.setCustomValidity(
        "Por favor revisa la categoria de tu menu no tenga menos de 5 caracteres, ademas no debe contener caracteres especiales"
      );
      Categoria.reportValidity();
      return;
    }

    if (showHeading === true) {
      const NameProduct = Nameproduct.current;
      const Description = DescriptionProduct.current;
      const Price = PriceProduct.current;

      NameProduct.setCustomValidity("");
      Description.setCustomValidity("");
      Price.setCustomValidity("");

      if (!NameProduct.checkValidity()) {
        NameProduct.setCustomValidity(
          "Por favor revisa el nombre de tu producto no tenga menos de 3 caracteres, ademas no debe contener caracteres especiales"
        );
        NameProduct.reportValidity();
        return;
      }

      if (!Description.checkValidity()) {
        Description.setCustomValidity(
          "Por favor revisa la descripcion de tu producto no tenga menos de 10 caracteres, ademas no debe contener caracteres especiales"
        );
        Description.reportValidity();
        return;
      }

      if (!Price.checkValidity()) {
        Price.setCustomValidity(
          "Por favor revisa el precio de tu producto no sea menor a 0 ni mayor a 1.000.000"
        );
        Price.reportValidity();
        return;
      }
    }
  };

  const CreateMenu = () => {
    if (inputNombreRestaurante.current.checkValidity() === true) {
      if (!menuInstance) {
        // Si el menú aún no ha sido creado
        setmenuInstance(new Menu(inputNombreRestaurante.current.value));
      } else {
        // Si el menú ya existe, actualizar su nombre
        menuInstance.SetNombreRestaurante(inputNombreRestaurante.current.value);
      }
    }
  };

  const CreateCategory = () => {
    if (inputCategoria.current.checkValidity() === true) {
      if (!categoriaIntance) {
        setcategoriaIntance(new Categoria(inputCategoria.current.value));
      } else {
        categoriaIntance.SetNombreCategoria(inputCategoria.current.value);
      }

      setNameCategory(inputCategoria.current.value);
    }
  };

  const CreateProduct = (e) => {
    e.preventDefault();

    const nombreProducto = Nameproduct.current;
    const descripcionProducto = DescriptionProduct.current;
    const precioProducto = PriceProduct.current;

    if (
      nombreProducto.checkValidity() === true &&
      descripcionProducto.checkValidity() === true &&
      precioProducto.checkValidity() === true
    ) {
      const newProduct = new Producto(
        nombreProducto.value,
        descripcionProducto.value,
        precioProducto.value
      );
      categoriaIntance.agregarProducto(newProduct);
    }

    const userResponse = window.confirm(
      `¿ Deseas crear un nuevo producto en la categoria ${categoriaIntance.nombreCategoria} ?`
    );

    if (userResponse) {
      Nameproduct.current.value = "";
      DescriptionProduct.current.value = "";
      PriceProduct.current.value = "";
    } else {
      setShowHeading(false);
      menuInstance.AgregarCategoria(categoriaIntance);
      inputCategoria.current.value = "";
      setcategoriaIntance(null);
    }

    console.log(menuInstance);
  };

  return (
    <>
      <h1>Menu Iterativo</h1>

      <p>
        En esta paguina web podras crear una serie de menu para tu negocio o
        establecimiento de manera iterativa, es decir, podras agregar los
        platillos que desees y se mostraran en la pantalla
      </p>

      <form>
        <h2>Paso 1</h2>

        <label>Ingresa el nombre de tu restaurante</label>

        <input
          className="NombreRestaurante"
          type="text"
          id="NombreRestaurante"
          required
          placeholder="Nombre"
          ref={inputNombreRestaurante}
          maxLength="30"
          minLength="3"
          onBlur={() => {
            handleBlur();
            CreateMenu();
          }}
          pattern="[\w\s]+"
        />

        <h2>Paso 2</h2>

        <label>Describenos tu primera categoria de productos</label>

        <input
          type="text"
          ref={inputCategoria}
          id="Categoria"
          required
          placeholder="Categoria"
          pattern="[\w\s]+"
          maxLength="20"
          minLength="5"
          onBlur={() => {
            handleBlur();
            CreateCategory();
          }}
        />

        <button
          onClick={() => {
            if (
              inputCategoria.current.checkValidity() === true &&
              inputNombreRestaurante.current.checkValidity() === true
            ) {
              setShowHeading(true);
            }
          }}
          style={{ display: showHeading ? "none" : "inline-block" }}
        >
          agregar productos a nueva categoria
        </button>
        {showHeading && (
          <>
            <h2>Productos de la categoria {nameCategory} </h2>

            <label>Ingresa el nombre del producto</label>

            <input
              type="text"
              ref={Nameproduct}
              required
              placeholder="Nombre del producto"
              pattern="[\w\s]+"
              maxLength="30"
              minLength="3"
              onBlur={() => {
                handleBlur();
              }}
            />

            <label>Ingresa la descripcion del producto</label>

            <input
              type="text"
              ref={DescriptionProduct}
              required
              placeholder="Descripcion del producto"
              pattern="[\w\s]+"
              maxLength="100"
              minLength="10"
              onBlur={() => {
                handleBlur();
              }}
            />

            <label>Ingresa el precio del producto</label>

            <input
              type="number"
              ref={PriceProduct}
              required
              placeholder="Precio del producto"
              min="0"
              max="1000000"
              onBlur={() => {
                handleBlur();
              }}
            />

            <button
              onClick={(event) => {
                CreateProduct(event);
              }}
            >
              agregar producto
            </button>
          </>
        )}
      </form>
    </>
  );
}

export default App;
