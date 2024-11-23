import React, { useRef, useState } from "react";
import Menu from "./data/Menu"; // Importar la clase Menu
import Categoria from "./data/Categoria"; // Importar la clase Categoria
import Producto from "./data/Producto"; // Importar la clase Producto
import "./App.css";

function App() {
  // Variables

  // Referencias a los inputs para validaciones
  const inputNombreRestaurante = useRef(null);
  const inputCategoria = useRef(null);
  const Nameproduct = useRef(null);
  const DescriptionProduct = useRef(null);
  const PriceProduct = useRef(null);

  // Estados de la variables de la aplicacion
  const [nameCategory, setNameCategory] = useState(null);
  const [showHeading, setShowHeading] = useState(false);
  const [menuInstance, setmenuInstance] = useState(null);
  const [categoriaIntance, setcategoriaIntance] = useState(null);

  /* Estados para manejar el foco de los inputs y no generar ciclos infinitos ademas de 
  observar si el input ya fue seleccionado */

  const [
    isSelectedinputNombreRestaurante,
    setisSelectedinputNombreRestaurante,
  ] = useState(false);
  const [isSelectedinputCategoria, setisSelectedinputCategoria] =
    useState(false);
  const [isSelectedNameproduct, setisSelectedNameproduct] = useState(false);
  const [isSelectedDescriptionProduct, setisSelectedDescriptionProduct] =
    useState(false);
  const [isSelectedPriceProduct, setisSelectedPriceProduct] = useState(false);

  // Funciones para manejar el foco de los inputs y no generar ciclos infinitos

  const handleFocusNombreRestaurante = () => {
    setisSelectedinputNombreRestaurante(true); // Marca el campo como seleccionado
  };

  const handleFocusCategoria = () => {
    setisSelectedinputCategoria(true); // Marca el campo como seleccionado
  };

  const handleFocusNameproduct = () => {
    setisSelectedNameproduct(true); // Marca el campo como seleccionado
  };

  const handleFocusDescriptionProduct = () => {
    setisSelectedDescriptionProduct(true); // Marca el campo como seleccionado
  };

  const handleFocusPriceProduct = () => {
    setisSelectedPriceProduct(true); // Marca el campo como seleccionado
  };

  // Funciones para manejar las validaciones de los inputs y mostrar mensajes de error

  const handleBlur = () => {
    // se cartura el valor de los inputs
    const Nombre = inputNombreRestaurante.current;
    const Categoria = inputCategoria.current;

    // se limpian los mensajes de error
    Nombre.setCustomValidity("");
    Categoria.setCustomValidity("");

    /* Se modifica el mensaje de error si el nombre del restaurante no es valido
      Se rotorna el menasaje de error y se retornaer el input para no tener problemas con 
      la funcion reportValidity */

    if (!Nombre.validity.valid) {
      Nombre.setCustomValidity(
        "Por favor revisa el nombre de tu restaurante no tenga menos de 3 caracteres, ademas no debe contener caracteres especiales"
      );
      Nombre.reportValidity();
      return;
    }

    if (!Categoria.validity.valid) {
      Categoria.setCustomValidity(
        "Por favor revisa la categoria de tu menu no tenga menos de 5 caracteres, ademas no debe contener caracteres especiales"
      );
      Categoria.reportValidity();
      return;
    }

    // se verifican que los campos del productos ya hallan sido mostrados

    if (showHeading === true) {
      const NameProduct = Nameproduct.current;
      const Description = DescriptionProduct.current;
      const Price = PriceProduct.current;

      NameProduct.setCustomValidity("");
      Description.setCustomValidity("");
      Price.setCustomValidity("");

      if (!NameProduct.validity.valid) {
        NameProduct.setCustomValidity(
          "Por favor revisa el nombre de tu producto no tenga menos de 3 caracteres, ademas no debe contener caracteres especiales"
        );
        NameProduct.reportValidity();
        return;
      }

      if (!Description.validity.valid) {
        Description.setCustomValidity(
          "Por favor revisa la descripcion de tu producto no tenga menos de 10 caracteres, ademas no debe contener caracteres especiales"
        );
        Description.reportValidity();
        return;
      }

      if (!Price.validity.valid) {
        Price.setCustomValidity(
          "El precio no es válido. Por favor, verifique la sintaxis de los separadores de miles y asegúrese de que no haya más de dos decimales "
        );
        Price.reportValidity();
        return;
      }
    }
  };

  /* Fuencion para manejo de los estilos de los inputs , mediantes metedos 
  ilustrativos de los inputs */

  const validityInput = () => {
    const Nombre = inputNombreRestaurante.current;
    const Categoria = inputCategoria.current;

    if (isSelectedinputNombreRestaurante && !Nombre.validity.valid) {
      Nombre.style.border = "2px solid red";
    } else if (isSelectedinputNombreRestaurante) {
      Nombre.style.border = "2px solid green";
    }

    if (isSelectedinputCategoria && !Categoria.validity.valid) {
      Categoria.style.border = "2px solid red";
    } else if (isSelectedinputCategoria) {
      Categoria.style.border = "2px solid green";
    }

    if (showHeading === true) {
      const NameProduct = Nameproduct.current;
      const Description = DescriptionProduct.current;
      const Price = PriceProduct.current;

      if (isSelectedNameproduct && !NameProduct.validity.valid) {
        NameProduct.style.border = "2px solid red";
      } else if (isSelectedNameproduct) {
        NameProduct.style.border = "2px solid green";
      }

      if (isSelectedDescriptionProduct && !Description.validity.valid) {
        Description.style.border = "2px solid red";
      } else if (isSelectedDescriptionProduct) {
        Description.style.border = "2px solid green";
      }

      if (isSelectedPriceProduct && !Price.validity.valid) {
        Price.style.border = "2px solid red";
      } else if (isSelectedPriceProduct) {
        Price.style.border = "2px solid green";
      }
    }
  };

  // Fuención para creación del menu

  const CreateMenu = () => {
    if (inputNombreRestaurante.current.checkValidity() === true) {
      if (!menuInstance) {
        // Si el menú aún no ha sido creado se instancia el menú
        setmenuInstance(new Menu(inputNombreRestaurante.current.value));
      } else {
        // Si el menú ya existe, actualizar su nombre
        menuInstance.SetNombreRestaurante(inputNombreRestaurante.current.value);

        // Crear una copia del menú para que React detecte el cambio creando otro objeto
        const updatedMenu = new Menu(menuInstance.nombreDelRestaurante);
        updatedMenu.categoria = [...menuInstance.categoria]; // Copiar las categorías con el spread operator (...)

        // Actualizar el estado del menú
        setmenuInstance(updatedMenu);
      }
    }
  };

  // Función para crear una categoría

  const CreateCategory = () => {
    // Si el input de la categoría es válido
    if (inputCategoria.current.validity.valid) {
      // Si no existe una instancia de categoría, se crea una nueva
      if (!categoriaIntance) {
        setcategoriaIntance(new Categoria(inputCategoria.current.value));
      } else {
        // Si ya existe una instancia de categoría, se actualiza su nombre
        categoriaIntance.SetNombreCategoria(inputCategoria.current.value);
      }

      // Se actauliza el nombre de la vable de categoria paera mostrarlo en la pantalla
      setNameCategory(inputCategoria.current.value);
    }
  };

  /* Función para resetear los estilos de los inputs ya que cada 
  ves que se crea un producto se resetean los estilos para evitar confusiones */

  const resetStyles = () => {
    if (inputCategoria.current.value === "") {
      inputCategoria.current.style.border = "2px solid black";
    }
    Nameproduct.current.style.border = "2px solid black";
    DescriptionProduct.current.style.border = "2px solid black";
    PriceProduct.current.style.border = "2px solid black";

    setisSelectedNameproduct(false);
    setisSelectedDescriptionProduct(false);
    setisSelectedPriceProduct(false);
  };

  // Función para crear un producto

  const CreateProduct = (e) => {
    // se evita que la pagina se recargue
    e.preventDefault();

    // Se capturan los valores de los inputs de los productos
    const nombreProducto = Nameproduct.current;
    const descripcionProducto = DescriptionProduct.current;
    const precioProducto = PriceProduct.current;

    // se verifican que los campos del producto sean validos
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

      // asignamos el producto a la categoria
      categoriaIntance.agregarProducto(newProduct);

      // Hasta que el cliente no deje de crrear productos la categoria no se agregara al menu
      const userResponse = window.confirm(
        `¿ Deseas crear un nuevo producto en la categoria ${categoriaIntance.nombreCategoria} ?`
      );

      if (userResponse) {
        Nameproduct.current.value = "";
        DescriptionProduct.current.value = "";
        PriceProduct.current.value = "";
        resetStyles();
      } else {
        // se esconde el formulario de productos
        setShowHeading(false);
        menuInstance.AgregarCategoria(categoriaIntance); // se agrega la categoria al menu
        inputCategoria.current.value = ""; // se limpia el input de la categoria
        setcategoriaIntance(null);
        resetStyles();
      }
    } else {
      // En caso de que los campos no sean validos se muestra un mensaje de error
      alert("Por favor revisa los campos del producto");
    }
  };

  const CancelarProducto = () => {
    setShowHeading(false);
    menuInstance.AgregarCategoria(categoriaIntance); // se agrega la categoria al menu
    inputCategoria.current.value = ""; // se limpia el input de la categoria
    setcategoriaIntance(null);
    resetStyles();
  };

  const AvanzarProct = (product) => {
    if (product.productos.length - 1 > product.avanzarProducto) {
      product.PaginarProductoAvanazar();

      const copyProduct = Object.create(product);
      Object.assign(copyProduct, product);
      menuInstance.editarCategoria(copyProduct);

      const copyNMenu = Object.create(menuInstance);
      Object.assign(copyNMenu, menuInstance);

      setmenuInstance(copyNMenu);
    }
  };

  const RetrocederProduct = (product) => {
    if (product.avanzarProducto !== 0) {
      product.PaginarProductoRetroceder();

      const copyProduct = Object.create(product);
      Object.assign(copyProduct, product);

      menuInstance.editarCategoria(copyProduct);

      const copyNMenu = Object.create(menuInstance);
      Object.assign(copyNMenu, menuInstance);

      setmenuInstance(copyNMenu);
    }
  };

  return (
    <>
      <div className="Container">
        {/* Seccion de la izquierda de la pantalla */}

        <div className="Izquierda">
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
                validityInput();
              }}
              onFocus={handleFocusNombreRestaurante}
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
                validityInput();
              }}
              onFocus={handleFocusCategoria}
            />

            <button
              className="btn BotonCategoria"
              onClick={() => {
                // se verifica que los campos sean validos y se esconde el boton si son validos
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

            {/* Seccion de los productos */}
            {showHeading && (
              <>
                <div className="IzquierdaEscondido">
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
                      validityInput();
                    }}
                    onFocus={handleFocusNameproduct}
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
                      validityInput();
                    }}
                    onFocus={handleFocusDescriptionProduct}
                  />

                  <label>Ingresa el precio del producto</label>

                  <input
                    type="text"
                    ref={PriceProduct}
                    required
                    placeholder="Precio del producto"
                    onBlur={() => {
                      handleBlur();
                      validityInput();
                    }}
                    pattern="(\d{1,3}(\.\d{3})*(,\d{1,2})?|\d+)"
                    onFocus={handleFocusPriceProduct}
                    maxLength={15}
                  />

                  <button
                    className="btn BotonCategoria"
                    onClick={(event) => {
                      CreateProduct(event);
                    }}
                  >
                    agregar producto
                  </button>

                  <button
                    className="btn BotonCategoria"
                    onClick={() => {
                      CancelarProducto();
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
        <div className="Derecha">
          {/* Seccion de la derecha de la pantalla */}

          <h1>{menuInstance ? menuInstance.nombreDelRestaurante : ""}</h1>

          <div className="Flex_category">
            {/* 
              El método `map()` se usa para iterar sobre colecciones. Los parámetros son:
              - `elemento`: el valor actual del array.
              - `index`: la posición del elemento.
              - `coleccionOriginal`: el array original.
              Luego, puedes realizar operaciones con cada `elemento` en cada iteración.

              EJEMPLO:

              const numeros = [1, 2, 3, 4, 5];
              const numerosMultiplicados = numeros.map((numero) => numero * 2);
          */}

            {/* Si el menu no contiene ningun valor se mostrara el sinonimo de categorias
          , en caso contrario se recorrera el Array de Categorias y Productos */}

            {menuInstance
              ? menuInstance.categoria.map((elementos, categoryIndex) => (
                  <div className="Category">
                    <h2 key={categoryIndex}>{elementos.nombreCategoria}</h2>

                    {elementos.productos.map(
                      (Product, productIndex) =>
                        productIndex === elementos.avanzarProducto && (
                          <div className="Productos">
                            <p key={`Name_${productIndex}`}>
                              <ion-icon name="medkit-outline"></ion-icon>{" "}
                              {Product.nombre}
                            </p>
                            <p key={`Description_${productIndex}`}>
                              <ion-icon name="chatbubble-ellipses-outline"></ion-icon>{" "}
                              Descripcion: {Product.descripcion}
                            </p>
                            <p key={`Price_${productIndex}`}>
                              <ion-icon name="cash-outline"></ion-icon> Precio:
                              $ {Product.precio}
                            </p>
                            <div className="displayFlex">
                              <button
                                className="AvanzarYRetroceder"
                                onClick={() => AvanzarProct(elementos)}
                              >
                                avanzar
                              </button>
                              <button
                                className="AvanzarYRetroceder"
                                onClick={() => RetrocederProduct(elementos)}
                              >
                                retroceder
                              </button>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
