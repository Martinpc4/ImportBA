# ReactJS - CoderHouse

[![GitHub Profile](https://img.shields.io/badge/GitHub-Profile-f1faee?logo=GitHub)](https://github.com/Martinpc4)
[![Contact Me](https://img.shields.io/badge/Email-Contact_me-a8dadc?logo=Mail.Ru)](mailto:perezcobomartin4@hotmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Follow_me-457b9d?logo=linkedin)](https://linkedin.com/in/martin-perez-cobo/)

# Informaación del proyecto

Este es mi proyecto final para el curso de ReactJS en [CoderHouse](https://www.coderhouse.com), parte de la carrera de desarrollador web full-stack.
Este proyecto consiste en un ecomerce implementado con React, React Router, React Hooks, Libreria de React-Select, Libreria de Bootstrap y Firebase como base de datos. Porfavor leer la licencia del proyecto antes interactuar con el, dicha licencia se encuentra en el archivo "license.md".

# Especificaciones

Se va a especificar entre parentesis, "()", el origen de una función o varible. Por ejemplo, la función "getTotal" (context), porque proviene del context.

# Funcionamiento y Componentes

## Flujo de Compra

La idea a traves de la cual base el flujo de compra era en que el usuario tenga la experiencia mas placentera posible de manera que no se tenga que preocupar de como fue diseñada la página, y que si se equivoca en algo, lo pueda corregir rapidamente sin tener que reciniciar el e-commerce.

Para poder comprar uno multiples items, se debe seleccionarlo desde el Home en productos destacados o desde una categoria. A partir de ahi, se debe seleccionar la cantidad y color del item, para que se habilite el boton de agregar el carrito.
Automaticamente, se va a redirigir a el carrito donde el usuario puede modificar la cantidad del o de los items en el carrito (en caso de que no haya stock se le indica mediante un SVG) y proceder a la sección del checkout en caso de que haya stock de los items selecionados. Una vez en el checkout, se le muestra el total de la compra con detalle de todo loq ue contiene la compra, el usuario completa sus datos y acepta los terminos y condiciones, lo que le habilitan el boton de proceder a pagar.
Una vez que se procede a pagar, se deberia agregar una API de pago, como lo puede ser mercado pago, que no fue agregada porque el objetivo del proyecto no era ese. En este caso, directamente se reliza la orden en caso de que haya stock de los productos, se borra los items del carrito y se le muestra un alert al usuario que le indica que la compra fue realizada correctamente y se le proporciona de un id de compra.

## Componentes

### Cart

**Importaciones**

-   Se va a utilizar el useContext Hook con el CartContext para obtener las funciones _getTotal_ y _checkCartForStock_ y el array _Cart_.
-   Se va a utilizar el useState Hook que va a indicar si se puede hacer la compra o no, para poder habilitar el boton de "proceder al pago".
-   Se va a utilizar el useHistory Hook para poder acceder al history y redireccionar al usuario.
-   Se va a utilizar el useEffect Hook para poder correr una función asyncrona la primera vez que se monte y cuando cambia el Cart Array.

**Flujo de Componente**

Haciendo uso del useEffect, la primera vez que se monta el componente y cada vez que cambia el Cart Array (traido desde context), se va a ejecutar una función asincrona en la que, si el carrito no esta vacio, va a llamar a la función "checkCartForStock" (traida desde el context) que va a verificar si todos los items en el carrito del usuario tienen stock.
Si lo tienen modifica el "estado de compra" a true y si no tiene algun item stock, entonces se pone en false.
Cuando se monte el componente, se va a renderizar el item "CartList" y utilizando la función "getTotal()"(traida desde context), si es mayor a cero entonces se renderiza el total del carrito utilizando la misma función y el boton de "checkout" si el "estado de compra" es igual a verdadero.
Cuando se renderice el boton de "checkout", cuando se haga click en el, se utiliza el useHistory hook para hacer un push de la ruta del checkout y redirigir al usuario al checkout

### CartList

**Importaciones**

-   Se va a utilizar el useContext Hook con el CartContext para obtener el array _Cart_.
-   Se va a utilizar el useState Hook para poder almacenar un array de Componentes "ItemCart" para ser renderizados mas tarde.
-   Se va a utilizar el useEffect Hook para poder correr una función de manera condicional la primera vez qeu se monta y cuando se actualiza el Cart Array (traido desde context).
-   Se va a utiliza el "Link" de react-router-dom para poder crear links en donde se redirecciona al usuario.

**Flujo de Componente**

Cuando se monte el compoente y cuando se modifique el Cart Array (traido desde context), se va a ejecutar, si el carrito no esta vacio, la función "formatProductData" que va a iterar por todos los items en el Cart Array (traido desde context) y por cada uno se va a crear un ItemCart component, pasandole el tipo de lista recibido por props, con la data de cada item y se va a agregar a un array. Dicho array se va a setear como valor del "products" state, lo que va a causar que se re-renderice el componente.
A la hora de renderizar el componente, en caso de que el carrito este vacio, se renderiza un mensaje de que "todavia no hay productos" con un Link que si haces click en el mensaje te redirecciona al home "/". En el caso de que no este vacio, se renderiza el estado de "products" que va a contener a los items ya formateados.

### CartWidget

**Importaciones**

-   Se va a utilizar el useContext Hook con el CartContext para obtener el array _Cart_ y la función _getTotal_.
-   Se va a utilizar el useState Hook para establecer el "clickedState" que indica si el usuario abrio o cerro el "cart widget".
-   Se va a utilizar el useEffect Hook para re-renderizar el componente cuando cambia el Cart Array(context).
-   Se va a utiliza el "Link" de react-router-dom para poder crear links en donde se redirecciona al usuario.

**Flujo de Componente**

Se va a renderizar un SVG, con un indicador de la cantidad de items que contiene el carrito obtenido mediante la función "getTotal"(context), en el que cuando se hace click, mediante la función "modifyClickedState" cambia el estado "clickedState" al contrario que estaba antes.
Si el "clickedState" es verdadero, entonces se va a renderizar un contenedor con un Link component que lo va a convertir en un hipervinculo al Cart Component. Dentro del contenedor se va a renderizar el componente CartList indicandole el tipo de lista.
Ademas, si el total del carrito obtenido por la función "getTotal" (context) es mayor a cero, entonces se va a renderizar el monto del total.

### Checkout

**Importaciones**

-   Se va a utilizar el useContext Hook con el CartContext para obtener el array _Cart_, las funciones _getTotal_, _getItemList_, _checkCartForStock_, _cleanCart_ y las constantes _dolar_ y _iva_.
-   Se va a utilizar el useState Hook para establecer la información ingresada por el usuario en el form ("userData").
-   Se va a utilizar el useState Hook para establecer si la cantidad de información ingreada es la necesaria ("validDataState").
-   Se va a utilizar el useState Hook para establecer el estado de la compra, si se realizo o no y alamacenar el id de la compra realizada ("purchaseState").
-   Se va a utilizar el useEffect Hook para ejecutar una logica cuando se monta el componente por primera vez o cuando se actualice alguno de todos los estados.

**Flujo de Componente**

Cuando se monte por primera vez el componente o se modifque algun estado, si el estado "userData" fue llenado correctamente, entonces se actualiza el estado "setValidDataState" con el valor booleano true y si no se lleno correctamente o esta vacio, se actualiza el estado "setValidDataState" con el valor booleano false.

Cuando se renderiza, si la variable "state" dentro del estado "purchaseState" es verdadera (el usuario realizo la compra), entonces se muestra un mensaje de confirmación de compra y se muestra la segunda propiedad del estado que es el id de la compra.
Siempre se va a renderizar un formulario en el que el usuario debe ingresar su información y por cada cambio en el formulario, se actualiza la propierdad correspondiente del estado "userData" con el valor ingresado (para despues ser validado). Ádemas, se va a mostrar el total de la compra en detalle, con lo simpuestos necesarios haciendo uso de las función "getTotal" (context) y las variable "iva" y "dolar" (context).
En caso de que el estado "validDataState" sea verdadero (la info. ingresada por el usuario es valida), entonces se habilita el boton "proceder al pago". Cuando se clickea el boton, se va a utilizar la función "checkCartForStock" de manera asincrona para validar que haya stock y si lo hay se ejecuta la función "senduserDataToDB".
Cuando se ejecute la función "senduserDataToDB", se va a dar el formato correspondiente a los items del Cart Array (context) y se los envia a Firestore junto con los datos ingresados por el usuario. Esta operación devuelve una promesa en la que se va a modificar el estado "purchaseState" con el id de la compra y el estado con un valor booleano verdadero indicando que se realizo al compra. Esto va a causar que el componente se re-renderice y muestre un alert con los datos de la compra.

### Error

**Importaciones**

-   Se utiliza el useEffect Hook para poder re-renderizar el componente cada vez que cambia el ErrorId parameter del route.
-   Se utiliza el useParams Hook para poder obtener el parametro dado por ruta, "ErrorId".

**Flujo de Componente**
Cuando se monte el componente, se va a definir una variable del tipo objeto con el id del error (params). Dependiendo de ese objeto, se va a asignar la información correspondiente al error con un condicional y en caso de que no conozca el codigo del error, muestra en un mensaje de "Codigo de error no valido.
Cuando se renderice el componente, se va a mostrar un contenedor con el titulo del error y la descripción del esrror que fueron establecidas previamente en el montado del componente.

### Footer

**Importaciones**

-   Se va a utilizar el componente Link de react-router-dom para poder redirigir al usuario a la route deseada.

**Flujo de Componente**
El contenedor va a renderizar un footer estatico con las cuentas sociales del site (sin links actualmente), un input para suscribirse al NewsLetter (no programado por el front) y links de las secciones de la página utilizando el componente Link (react-router-dom).

### Home

**Importaciones**

-   Se va a utilizar el useEffect Hook para poder correr una promesa (asincronismo) cada vez que se re-renderice.
-   Se va a utilizar el useState Hook para poder almacenar un array que contenga todos los items/productos que esten en la db.

**Flujo de Componente**
Cada vez que se monte el componente, se va a hacer una consulta a la db haciendo un query que va a devolver todos los productos establecidos en la db, se van a poner en un array y actualizar el "products" state actualizando el componente.
Cuando se monte el componente, se va a renderizar una estructura JSX que va a mostrar los ultimos productos.
Los productos se van a renderizar cuando se cambie el "products" state con los items/productos de la db. Dichos productos se van a renderizar mediante una función que recibe un id del producto que se quiere mostrar y devuelve el componente "Items" pasandole como props el producto con el mismo id que se encuentre en el array con los productos de la db

### Item

**Importaciones**

-   Se utilizará el componente "Link" de "react-router-dom" para poder redireccionar al usuario a una ruta diferente.

**Flujo de Componente**
Simplemente se recibe por props las propiedades de un item disponible en la db y se renderiza una estructura JSX para mostrar la información de dicho producto utilizando el componente "Link", previamente importado, en el nombre y imagen del producto para poder re-direccionar al usuario cuando hace click a la ruta correspondiente a la categoria del producto y su id para poder renderizar el componente "ItemDetail" mas tarde cuando se cambie la ruta.

### ItemCart

**Importaciones**

-   Se va a utilizar el useContext Hook con el "CartContext" para obtener la función _isInCart_, _removeFromCart_, _modifyProductAmount_, _getProductAmount_ y la función asincrona _checkProductForStock_.
- Se utilzará el componente "ItemCounter" para poder establecer el valor del estado "stockState" que va a manejar el stock del producto.
-   Se va a utilizar el useState Hook para poder almacenar la cantidad de producto que el usuario tiene agregado en el carrito, tomando el valor por defecto la cantidad pasada por props.
-   Se va a utilizar un segundo useState Hook para poder almacenar el estado de stock del item con valores booleanos.
-   Se va a utilizar el useEffect Hook para poder poder correr una función asincrona cuando el componente se monte por primera vez y cuando cambie el valor del "productAmount" state.

**Flujo de Componente**

El componente va a recibir dos elementos por props, el primero va a ser el "productProperties" que almacena información sobre en base a que producto desea crear el componente y el segundo va a ser "listModel", variable que puede valer los números 1 y 2 para determinar el modelo de Componente a renderizar.

La primera vez que se monte y cuando cambie el valor del "productAmount" state, se correr una función asincrona, automaticamente, que va a utilizar un condicional para determinar si el producto tiene stock en la db mediante el uso de la función importada "_checkProductForStock_". De manera de que si tiene stock, entonces utiliza la función para setear el estado del "stockState" state con el valor booleano true y si no tiene entonces con valor booleano false. Generando o no que el componente se vuelva a reiniciar si cambia el valor del "productAmount" state.

Cuando se renderice el componente, dependiendo del valor de itemList, se va a renderizar una estructura JSX o la otra. Si el valor es igual a 1, entonces se esta pidiendo un "ItemCart" component para el widget por lo que se renderiza una estructura JSX que contiene información resumida del item requerido como el nombre del producto, la imagen y el precio. Si el valor es igual a 2, entonces se esta pidiendo un "ItemCart" component para el "Cart" Component por lo que se renderiza una estructura JSX mas completa con todos lo elementos de la estructura anterior y, si el chequeando que el producto este en el carrito mediante la función _isInCart_, el "ItemCounter" Component.
El "ItemCounter" Component se le va a pasar por props la cantidad actual del producto mediante el estado "productAmount", la función para modificar dicho estado llamada "itemAmountFunction", la función para aplicar y guardar los cambios al Cart Array (Context) llamada "applyChangesToCart", la cantidad del item en el Cart Array mediante la función _getProductAmount_ (Context) y un valor booleano ("isApplyChanges") para indicarle al "ItemCounter" Component que debe renderizar el boton de confirmar cantidad.

### ItemCounter

**Importaciones**
**Flujo de Componente**

### ItemDetail

**Importaciones**
**Flujo de Componente**

### ItemList

**Importaciones**
**Flujo de Componente**

### NavBar

**Importaciones**

- Se utilizara NavLink de "react-router-dom" para poder establecer links que redireccionen al usuario y que dependiendo de la ruta en la que se encuentre, asignarle una clase especial a los elementos que esten contendios dentro del componente con el proposito de estilizar unicamente.
- Se utilizara Link de "react-router-dom" para poder establecer links que redireccionen al usuario.
- Se utilizara "CartWidget" Component para poder incluirlo en el header.

**Flujo de Componente**
Cuando se monte el componente, se va a renderizar una estructura JSX, estilizada, con todas las secciones dentro de un NavLink Component para poder redireccionar al usuario a las rutas correspondiente a cada sección y aplicar clases condicionalmente y con el logo envuelto en Link Component para poder redireccionar la persona a la sección Home. Ademas, dicha estructura contiene, al final, el "CartWidget" Component.

### Shop

**Importaciones**

- Se utilizará el useParams Hook para poder obetener el parametro "CategoryId", el codigo de identificación de la categoria, mandado por ruta.
- Se utilizara el componente ItemList para poder renderizar la lista de items en la categoria indicada.

**Flujo de Componente**
Cuando se monte, se van a obtener el valor del parametro CategoryId y se lo asignara a una constante. Se va a renderizar una estructura JSX, estilizada, con el componente "ItemList" pasandole por props el identificador de la categoria previamente almacenado en su constante correspondiente.

## Contexts

### Cart (Context)

**Importaciones**

-   Se utiliza "createContext" de react para poder definir un contexto.

**Flujo de Componente**
Simplemnte se define una constante "Cart" como contexto y se exporta.

### CustomCartProvider

**Importaciones**

-   Se utiliza useState para poder definir el "Cart" Array state que va a almacenar los items del carrito.
-   Se utiliza useEffect para poder correr un bloque de codigo cada vez que cambie el "Cart" Array state y la primera vez que se monte el componente.
-   Se importa la constante "db" de el script de Firebase que contiene el handler de la base de datos (Firestore).

**Flujo de Componente**
Cuando se monte el componente se va a tomar como valor por defecto del "Cart" Array state lo que contenga la key "Cart-Array" (convertido por JSON.parse) del localstorage del usuario si es que existe y sino, se define un array vacio.
La primera vez que el componente se monte y cuando cambie el state "Cart", se va a establecer la key "Cart-Array" con el valor del carrito utilizando JSON.stringify para converitrlo en un string y despues volver a re-convertirlo.
Cuando el componente se renderice, se van a renderizar todo lo que envuelva el componente mediante el uso de "props.children".
Se va a definir y exportar:

-   Como constante, "iva" y "dolar" como un valor general de la aplicación.
-   Como función, "cleanCart" que va a cambiar el valor del "Cart" state array a un array vacio.
-   Como función, "isInCart" que recibe las propiedades de un producto, itera por el Cart Array (Context) y devuelve un valor booleano de "true" si se encuentra y de "false" si no lo hace. Cabe aclarar que se implmentan condiciones y manejo de errores que optimizan a la función.
-   Como función, "addToCart" que recibe las propiedades de un producto y la cantidad de dicho producto para agregarlo al Cart Array (context). Cabe destacar que se utiliza un condicional en el que, utilizando la función "isInCart", si devuelve el valor booleano de "false" entonces se agrega el producto a el Cart Array (context) pero sino, se modifica la cantidad de dicho producto con la cantidad requerida utilzando la función "modifyProductAmount".
-   Como función, "modifyProductAmount" que reciber las propiedades de un producto y la cantidad de dicho producto para modificar la cantidad actual de dicho producto en el carrito a la indicada. Cabe destacar que se utiliza condiciones con el fin de hacer manejo de errores.
-   Como función, "removeFromCart" que recibe por parametros las propiedades de un producto y lo remueve del Cart Array (Context). Cabe destacar que, mediante el uso de condicionales y la función "isInCart", se realiza manejo de errores.
-   Como función, "getProductAmount" que recibe por parametros las propiedades de un determinado producto y devuelve la cantidad de dicho producto que este en el momento en el Cart Array (Context). Cabe destacar que, mediante el uso de condicionales y el uso de la función "isInCart", se realiza manejo de errores.
-   Como función, "getItemList" que simplemente devuelte un array con elementos del formato JSX correspondientes a cada uno de los items actuales en el Cart Array (Context). Es importante saber que esta función se utiliza especificamente en un solo componente pero decidi mantenerla en el "CustomCartProvider" Component para mantener el diseño del e-commerce ordenado y organizado.
-   Como función, "getTotal" que recibe por parametros una variable, llamada "options", que va a iterar por todos lo items del Cart Array (Context) para obtener el total y dependiendo de la opción va a devolver el total Neto (opción 0: sin IVA) o el total Bruto (opción 1: con IVA).
-   Como función _Asincrona_, "checkProductForStock" que recibe por parametros la propiedad con la cantidad de un determinado producto y devuelve un valor Booleano de "true" si se encuentra la cantidad necesaria para cubrir la cantidad deseada o "false" si la cantidad en la db es menor a la deseada. Cabe destacar que se utiliza condicionales para el manejo de errores producidos en la query a db.
-   Como función _Asincrona_, "checkCartForStock" que itera por el Cart Array (Context) verificando si dichos items tienen stock en la db y si lo tienen devuelve el valor booleano de "true" y sino devuelve "false". Cabe destacar que se utiliza condicionales para el manejo de errores verificando que el Cart Array (Context) no este vacio y que para verificar que cada producto tiene stock individualmente se utiliza la función _Asincrona_ "checkProductForStock".

# Libraries

## React-Select

La librería de React-Select le proporciona la elección de colores a la hora de agregar un ítem al carrito. Fue implementada por su practicidad a la hora de manejar un select tag. Podría haberse realizado solo con los vanilla html tags implementando un onChange event de React y un state con React Hooks pero como ya la conocía y quería experimentar con librerías ajenas al proyecto.

## Bootstrap

La librería de Bootstrap proporciona sus famosas clases de estilos. Elegí implementarla ya que el uso de dichas clases me ayudaron mucho a la hora de maquetar por su intuitividad y grandes estilos, además, su alta personalización me permitió modificar, por ejemplo, los colores generales de la librerías. Se podría haber reemplazado a la librería con estilos SCSS para después ser compilados a CSS pero me hubiera tomado demasiado tiempo y no era el objetivo del curso maquetar.

# Desafios Extras (Pro-Coder)

## Custom item

-   **Objetivo**: Posibilidad de agregar características seleccionables al producto (ej. talla, color, etc). La customización no debería modificar el precio. Las selecciones serán detalladas en el checkout. Por ejemplo: 1 x camisa.
-   **Notas**:
    1. La caracteristica agregada a cada item es la del color, ya que correspondia debido a que todos los productos tienen al menos dos colores como elección.

## Stock check

-   **Objetivo**: Validar stock al momento de intentar generar la order.
-   **Notas**:
    1. La manera en la que se verifica el stock es mediante el uso de un array llamado "stock" que tiene cada producto en donde el indice del elemento dentro de dicho array corresponde al indice del array de colores del mismo producto.
    1. La verificación del stock fue realizada tanto el el Cart Component como en el Checkout Component para que el usuario no pueda simplemente ingresar manualmente la ruta correspondiente en el navegador y pueda hacer la orden igualmente.
    1. Se incluyo un indicador de stock (haciendo hover explica lo que es) en el Cart Component para que el usuario sepa que no hay suficiente stock con la cantidad de producto selecionado.

## Cart persistente

-   **Objetivo**: Hacer que el cart sea persistente en alguna api de almacenamiento local en el navegador (local/session storage).
-   **Notas**:
    1. Fue implementado haciendo uso del localstorage y del useEffect Hook de React en el CustomCartProvider Component.
