# ReactJS - CoderHouse

[![GitHub Profile](https://img.shields.io/badge/GitHub-informational?style=for-the-badge&logo=GitHub&logoColor=171515&color=23272d)](https://github.com/Martinpc4)
[![Contact Me](https://img.shields.io/badge/Email-informational?style=for-the-badge&logo=Mail.Ru&logoColor=fff&color=23272d)](mailto:perezcobomartin4@hotmail.com)
[![LinkedId](https://img.shields.io/badge/LinkedIn-informational?style=for-the-badge&logo=linkedin&logoColor=0077b5&color=23272d)](https://linkedin.com/in/martin-perez-cobo/)
[![App](https://img.shields.io/badge/Launch_App-informational?style=for-the-badge&logo=heroku&logoColor=430098&color=23272d)](https://importba-react.herokuapp.com)


# Información del proyecto

Este es mi proyecto final para el curso de ReactJS en [CoderHouse](https://www.coderhouse.com), parte de la carrera de desarrollador web full-stack.  
Este proyecto consiste en un ecommerce implementado con React, React Router, React Hooks, Librería de React-Select, Librería de Bootstrap y Firebase como base de datos. Por Favor leer la licencia del proyecto antes interactuar con él, dicha licencia se encuentra en el archivo "license.md".

[25/08/2021] Este proyecto fue calificado con una nota de 10 (diez) y se da como finalizado.

# Libraries

## React-Select

[![React Select](https://img.shields.io/badge/React_Select-informational?style=for-the-badge&logo=react&logoColor=61DAFB&color=23272d)](https://react-select.com/home)

La librería de React-Select le proporciona la selección de colores a la hora de agregar un ítem al carrito. Fue implementada por su practicidad a la hora de manejar un menú de opciones, ya que fue diseñada para React y fue optimizada para ello. Podría haberse realizado solo con los vanilla HTML tags implementando un “onChange” event de React y un state con React Hooks pero, basado en la recomendación de un amigo React Developer familiarizado con la librería, decidí implementarla para optimizar el ecommerce.

## Bootstrap

[![Bootstrap 5](https://img.shields.io/badge/Bootstrap_5-informational?style=for-the-badge&logo=bootstrap&logoColor=6f42c1&color=23272d)](https://getbootstrap.com)

La librería de Bootstrap proporciona sus famosas clases de estilos. Elegí implementarla ya que el uso de dichas clases me ayudó mucho a la hora de maquetar por su intuitividad y grandes estilos. Además, su alta personalización me permitió modificar, por ejemplo, los colores generales de la librería. Se podría haber reemplazado a la librería con estilos SCSS para después ser compilados a CSS, pero me hubiera tomado demasiado tiempo y no era el objetivo del curso maquetar. Igualmente, incluí unos estilos por SCSS que van a ser compilados para poder complementar Bootstrap.

# Documentación

## Convenciones

-   Todas las funciones van a tener el formato en Italics.
-   Para especificar el origen de una función o variable se utiliza los paréntesis, por ejemplo, la función _getTotal_ (Context), porque proviene del Contexto.
-   En este proyecto se utiliza la arquitectura del Custom Provider, por lo que da por entendido que todas las funciones importadas desde un React Context fueron explicadas en el Custom Provider y no van a ser explicadas cada vez que se importan.

## Flujo de Compra

La idea a través de la cual base el flujo de compra era en que el usuario tenga la experiencia más placentera posible de manera que no se tenga que preocupar de cómo fue diseñada la página, y que, si se equivoca en algo, lo pueda corregir rápidamente sin tener que reiniciar el ecommerce.  
Para poder comprar uno múltiples ítems, se debe seleccionarlo desde el Home en productos destacados o desde una categoría. A partir de ahí, se debe seleccionar la cantidad y color del producto, para que se habilite el botón de agregar al carrito.  
Automáticamente, se va a redirigir a el carrito donde el usuario puede modificar la cantidad del o de los ítems en el carrito (en caso de que no haya stock se le indica mediante un SVG) y proceder a la sección del checkout en caso de que haya stock de los ítems seleccionados. Una vez en el checkout, se le muestra el total de la compra con detalle de todo lo que contiene la compra, el usuario completa sus datos y acepta los términos y condiciones, lo que le habilitan el botón de proceder a pagar.  
Una vez que se procede a pagar, se debería agregar una API de pago, como lo puede ser mercado pago, que no fue agregada porque el objetivo del proyecto no era ese. En este caso, directamente se realiza la orden en caso de que haya stock de los productos, se borra los ítems del carrito y se le muestra una alerta al usuario que le indica que la compra fue realizada correctamente y se le proporciona de un id de compra.

## Componentes

### Cart

**Importaciones**

-   Se va a utilizar el useContext Hook con el CartContext para obtener las funciones _getTotal_ y _checkCartForStock_ y el array _Cart_.
-   Se va a utilizar el useState Hook que va a indicar si se puede hacer la compra o no, para poder habilitar el botón de "proceder al pago".
-   Se va a utilizar el useHistory Hook para poder acceder al history y redireccionar al usuario.
-   Se va a utilizar el useEffect Hook para poder correr una función asíncrona la primera vez que se monte y cuando cambia el Cart Array.

**Flujo de Componente**  
Haciendo uso del useEffect, la primera vez que se monta el componente y cada vez que cambia el Cart Array (Context), se va a ejecutar una función asíncrona en la que, si el carrito no está vacío, va a llamar a la función "checkCartForStock" (Context) que va a verificar si todos los ítems en el carrito del usuario tienen stock.  
Si lo tienen modifica el "estado de compra" a true y si no tiene algún ítem stock, entonces se pone en false.  
Cuando se monte el componente, se va a renderizar el ítem "CartList" y utilizando la función _getTotal_ (Context), si es mayor a cero entonces se renderiza el total del carrito utilizando la misma función y el botón de "checkout" si el "estado de compra" es igual a verdadero.  
Cuando se renderice el botón de "checkout", cuando se haga click en él, se utiliza el useHistory Hook para hacer un push de la ruta del checkout y redirigir al usuario al checkout

### CartList

**Importaciones**

-   Se va a utilizar el useContext Hook con el CartContext para obtener el array _Cart_.
-   Se va a utilizar el useState Hook para poder almacenar un array de Componentes "ItemCart" para ser renderizados más tarde.
-   Se va a utilizar el useEffect Hook para poder correr una función de manera condicional la primera vez que se monta y cuando se actualiza el Cart Array (Context).
-   Se va a utilizar el "Link" de react-router-dom para poder crear links en donde se redirecciona al usuario.

**Flujo de Componente**  
Cuando se monte el componente y cuando se modifique el Cart Array (Context), se va a ejecutar, si el carrito no está vacío, la función _formatProductData_ que va a iterar por todos los ítems en el Cart Array (Context) y por cada uno se va a crear un "ItemCart" (Component), pasándole el tipo de lista recibido por props, con la data de cada ítem y se va a agregar a un array. Dicho array se va a poner como valor del "products" State, lo que va a causar que se re-renderice el componente.  
A la hora de renderizar el componente, en caso de que el carrito está vacío, se renderiza un mensaje de que "todavía no hay productos" con un Link que si haces click en el mensaje te redirecciona al home "/". En el caso de que no este vacío, se renderiza el estado de "productos" que va a contener a los ítems ya formateados.

### CartWidget

**Importaciones**

-   Se va a utilizar el useContext Hook con el CartContext para obtener el array _Cart_ y la función _getTotal_.
-   Se va a utilizar el useState Hook para establecer el "clickedState" (State) que indica si el usuario abrió o cerró el "CartWidget" (Component).
-   Se va a utilizar el useEffect Hook para re-renderizar el componente cuando cambia el Cart Array(Context).
-   Se va a utilizar el "Link" de react-router-dom para poder crear links en donde se redirecciona al usuario.

**Flujo de Componente**
Se va a renderizar un SVG, con un indicador de la cantidad de ítems que contiene el carrito obtenido mediante la función _getTotal_ (Context), en el que cuando se hace click, mediante la función _modifyClickedState_ cambia el estado "clickedState" (State) al contrario que estaba antes.  
Si el "clickedState" (State) es verdadero, entonces se va a renderizar un contenedor con un "Link" (Component) que lo va a convertir en un hipervínculo al "Cart" (Component). Dentro del contenedor se va a renderizar el componente CartList indicando el tipo de lista.  
Además, si el total del carrito obtenido por la función _getTotal_ (Context) es mayor a cero, entonces se va a renderizar el monto del total.

### Checkout

**Importaciones**

-   Se va a utilizar el useContext Hook con el CartContext para obtener el array _Cart_, las funciones _getTotal_, _getItemList_, _checkCartForStock_, _cleanCart_ y las constantes _dolar_ y _iva_.
-   Se va a utilizar el useState Hook para establecer la información ingresada por el usuario en el form ("userData").
-   Se va a utilizar el useState Hook para establecer si la cantidad de información ingresada es la necesaria ("validDataState").
-   Se va a utilizar el useState Hook para establecer el estado de la compra, si se realizó o no y almacenar el id de la compra realizada ("purchaseState").
-   Se va a utilizar el useEffect Hook para ejecutar una lógica cuando se monta el componente por primera vez o cuando se actualice alguno de todos los estados.

**Flujo de Componente**  
Cuando se monte por primera vez el componente o se modifique algún estado, si el estado "userData" fue llenado correctamente, entonces se actualiza el estado "setValidDataState" (State) con el valor booleano true y si no se llenó correctamente o está vacío, se actualiza el estado "setValidDataState" (State) con el valor booleano false.  
Cuando se renderiza, si la propiedad "state" dentro del estado "purchaseState" (State) es verdadera (el usuario realizó la compra), entonces se muestra un mensaje de confirmación de compra y se muestra la segunda propiedad del estado que es el id de la compra.  
Siempre se va a renderizar un formulario en el que el usuario debe ingresar su información y por cada cambio en el formulario, se actualiza la propiedad correspondiente del estado "userData" con el valor ingresado (para después ser validado). Además, se va a mostrar el total de la compra en detalle, con los impuestos necesarios haciendo uso de la función _getTotal_ (Context) y las constantes "iva" y "dólar" (Context).  
En caso de que el estado "validDataState" (State) sea verdadero (la información ingresada por el usuario es válida), entonces se habilita el botón "proceder al pago". Cuando se clickea el botón, se va a utilizar la función _checkCartForStock_ de manera asíncrona para validar que haya stock y si lo hay se ejecuta la función _senduserDataToDB_.  
Cuando se ejecute la función _senduserDataToDB_, se va a dar el formato correspondiente a los ítems del Cart Array (Context) y se los envía a Firestore junto con los datos ingresados por el usuario. Esta operación devuelve una promesa en la que se va a modificar el estado "purchaseState" (State) con el id de la compra y el estado con un valor booleano verdadero indicando que se realizó la compra. Esto va a causar que el componente se re-renderice y muestra una alerta con los datos de la compra.

### Error

**Importaciones**

-   Se utiliza el useEffect Hook para poder re-renderizar el componente cada vez que cambia el parámetro “ErrorId” del route.
-   Se utiliza el useParams Hook para poder obtener el parámetro dado por ruta, "ErrorId".

**Flujo de Componente**  
Cuando se monte el componente, mediante el useEffect Hook, se va a definir una variable del tipo objeto con el id del error (Params). Dependiendo de ese objeto, se va a asignar la información correspondiente al error con un condicional y en caso de que no conozca el código del error, muestra en un mensaje de "Código de error no valido”.  
Cuando se renderice el componente, se va a mostrar un contenedor con el título del error y la descripción del error que fueron establecidas previamente en el montado del componente.

### Footer

**Importaciones**

-   Se va a utilizar el "Link" (Component) de react-router-dom para poder redirigir al usuario a la route deseada.

**Flujo de Componente**  
El contenedor va a renderizar un footer estático con las cuentas sociales del site (sin links actualmente), un input para suscribirse al NewsLetter (no programado por el Front) y links de las secciones de la página utilizando el Link (Component) de react-router-dom.

### Home

**Importaciones**

-   Se va a utilizar el useEffect Hook para poder correr una promesa (asincronismo) cada vez que se re-renderice.
-   Se va a utilizar el useState Hook para poder almacenar un array que contenga todos los ítems/productos que estén en la db.

**Flujo de Componente**  
Cada vez que se monte el componente, se va a hacer una consulta a la db haciendo un query que va a devolver todos los productos establecidos en la db, se van a poner en un array y actualizar el "products" (State) actualizando el componente.  
Cuando se monte el componente, se va a renderizar una estructura JSX que va a mostrar los últimos productos.  
Los productos se van a renderizar cuando se cambie el "products" (State) con los ítems/productos de la db. Dichos productos se van a renderizar mediante una función que recibe un id del producto que se quiere mostrar y devuelve el "Items" (Component) pasándole como props el producto con el mismo id que se encuentre en el array con los productos de la db

### Item

**Importaciones**

-   Se utilizará el componente "Link" de "react-router-dom" para poder redireccionar al usuario a una ruta diferente.

**Flujo de Componente**  
Simplemente se recibe por props las propiedades de un ítem disponible en la db y se renderiza una estructura JSX para mostrar la información de dicho producto utilizando el "Link" (Component), previamente importado, en el nombre e imagen del producto para poder redireccionar al usuario cuando hace click a la ruta correspondiente a la categoría del producto y su id para poder renderizar "ItemDetail" (Component) más tarde cuando se cambie la ruta.

### ItemCart

**Importaciones**

-   Se va a utilizar el useContext Hook con el "CartContext" para obtener la función _isInCart_, _removeFromCart_, _modifyProductAmount_, _getProductAmount_ y la función asíncrona _checkProductForStock_.
-   Se utilizará el componente "ItemCounter" para poder establecer el valor del estado "stockState" (State) que va a manejar el stock del producto.
-   Se va a utilizar el useState Hook para poder almacenar la cantidad de producto que el usuario tiene agregado en el carrito, tomando el valor por defecto la cantidad pasada por props.
-   Se va a utilizar un segundo useState Hook para poder almacenar el estado de stock del ítem con valores booleanos.
-   Se va a utilizar el useEffect Hook para poder correr una función asíncrona cuando el componente se monte por primera vez y cuando cambie el valor del "productAmount" (State).

**Flujo de Componente**  
El componente va a recibir dos elementos por props, el primero va a ser el "productProperties" que almacena información sobre en base a que producto desea crear el componente y el segundo va a ser "listModel", variable que puede valer los números 1 y 2 para determinar el modelo de Componente a renderizar.  
La primera vez que se monte y cuando cambie el valor del "productAmount" (State), mediante el useEffect Hook, se correr una función asíncrona, automáticamente, que va a utilizar un condicional para determinar si el producto tiene stock en la db mediante el uso de la función importada "_checkProductForStock_". De manera de que, si tiene stock, entonces utiliza la función para poner el estado del "stockState" (State) con el valor booleano true y si no tiene entonces con valor booleano false. Generando o no que el componente se vuelva a reiniciar si cambia el valor del "productAmount" (State).  
Cuando se monte, se va a definir la función _applyAmountChangedToCart_, en la que, de manera condicional, si el "productAmount" (State) equivale cero, entonces ejecuta la función _removeFromCart_ (Context) dándole por parámetros las propiedades del producto y sino, se ejecuta la función _modifyProductAmount_ (Context) dándole por parámetros las propiedades del producto y la cantidad correspondiente de dicho producto.  
Cuando se renderice el componente, dependiendo del valor de itemList, se va a renderizar una estructura JSX o la otra. Si el valor es igual a 1, entonces se está pidiendo un "ItemCart" (Component) para el widget por lo que se renderiza una estructura JSX que contiene información resumida del ítem requerido como el nombre del producto, la imagen y el precio. Si el valor es igual a 2, entonces se está pidiendo un "ItemCart" Component para el "Cart" (Component) por lo que se renderiza una estructura JSX más completa con todos los elementos de la estructura anterior y, si el chequeando que el producto este en el carrito mediante la función _isInCart_, el "ItemCounter" (Component).  
El "ItemCounter" (Component) se le va a pasar por props la cantidad actual del producto mediante el estado "productAmount", la función para modificar dicho estado llamada _itemAmountFunction_, la función para aplicar y guardar los cambios al Cart Array (Context) llamada _applyChangesToCart_, la cantidad del ítem en el Cart Array (Context) mediante la función _getProductAmount_ (Context) y un valor booleano ("isApplyChanges") para indicarle al "ItemCounter" (Component) que debe renderizar el botón de confirmar cantidad.

### ItemCounter

**Importaciones**

-   No se importará nada.

**Flujo de Componente**  
Se van a recibir por props la variable "itemAmount", proveniente de un estado, que contiene la cantidad actual del ítem, _itemAmountFunction_ que contiene la función para modificar el estado "itemAmount" (State) del componente padre, la función _applyChangesFunction_ que va a ejecutar una función pasada únicamente por el "ItemCart" (Component) en caso de que él sea el padre, la variable "cartItemAmount" que va a almacenar la cantidad de dicho producto en el actual Cart Array (Context) y la variable "isApplyChanges" que contiene un valor booleano.  
Cuando se monte el componente, se va a renderizar una estructura JSX que contiene información de la cantidad actual del producto que fue pasada mediante la variable "itemAmount", dos botones que siempre van a estar para poder modificar la cantidad del producto (haciendo que cuando se los clieckee, se ejecute la función pasada por props _itemAmountFunction_, mediante un evento, dándole por parámetros la cantidad actual más o menos uno, dependiendo el botón) y un tercer botón que se va a renderizar solamente si la variable "isApplyChanges" pasada por props es igual al valor booleano "true" y si la cantidad actual en el Cart Array (Context) es diferente a la almacenada en el estado "itemAmount" pasada por props. Dicho botón de confirmar va a ejecutar la función _applyChangesFunction_ cuando se lo clickee.

### ItemDetail

**Importaciones**

-   Se usará useState para poder definir el "product" (State) que contenga la información del producto en cuestión, el "productColor" (State) que contenga la información sobre la elección de color y el "amount" (State) que va a contener la cantidad deseada del producto.
-   Se usará useEffect para correr una función cuando se monte el componente o cuando cambie alguno de los parámetros obtenidos por ruta, "ItemId" o "CategoryId".
-   Se usará useContext para poder utilizar la función _addToCart_ (Contex) traída desde el contexto del componente CartContext, que también fue agregado.
-   Se usará useHistory para poder agregar una ruta al historial de rutas y de esa manera poder redirigir al usuario.
-   Se usará useParams para poder obtener los parámetros "ItemId" y "CategoryId" pasados por la ruta.
-   Se importará el "ItemCounter" (Component) para poder renderizarlo y "Select" para poder utilizar la librería de "react-select".

**Flujo de Componente**
_Aclaración_: debido a que en este componente utiliza la librería "react-select", se tiene que definir una variable fuera del componente ya que así lo especifican en la documentación.  
Cuando se monte el componente o cuando cambie alguno de los parámetros obtenidos por ruta, "ItemId" o "CategoryId", mediante el useEffect se va a ejecutar la función _fetchData_. Dicha función va a hacer un pedido a la db, mediante promesas, aplicando manejo de errores. En caso de que la información del producto solicitado no exista se redirecciona al usuario, agregando una nueva ruta mediante el método "history.push()", al "Error" (Component). Si existe entonces se ejecuta la función _formatProduct_ pasándole por parámetros la información del producto obtenida, dentro de la función se va a generar las opciones de color disponibles para "react-select", una estructura JSX que va a ser utilizada para los indicadores, mediante la función _generateCarouselIndicators_, del Bootstrap Carousel y otra estructura JSX para establecer las imágenes, mediante la función _generateCarouselImages_, del Bootstrap Carousel. Una vez que se haya generado el formato del ítem, se cambia el valor del "product" (State) con la información de dicho ítem, causando que se vuelva a montar el componente.  
Una vez que se monte el componente con la información en el "product" (State), se va a generar una estructura JSX que va a mostrar la información del producto almacenada en el "product" (State). Dentro de las no tan importantes, un carousel, el título, el precio del producto y una descripción. Dentro de las importantes, un modelo de producto que se va a actualizar mediante un condicional cuando el usuario seleccione el color, el Select (Component) de "react-select" con las opciones para que el usuario pueda seleccionar el color del producto y que cuando lo haga, mediante un evento, se modifique el valor de "productColor" (State) al valor seleccionado, y el "ItemCounter" (Component) que se le van a pasar por props la cantidad seleccionada actualmente almacenada en el "amount" (State) y la función para alterar dicho estado.  
Por último, el botón de agregar a carrito que se va a renderizar de manera condicional cuando la cantidad del producto supere la unidad pero, va a aparecer deshabilitado, mediante el uso de clases de Bootstrap, para que de manera condicional cuando se haya seleccionado un color se habilite y cuando se haga click, mediante un evento, se elimina la propiedad "colors" del "product" (State) (sin modificar el estado para evitar la re-renderización del componente), se crea la propiedad "color" con el color seleccionado, se ejecuta la función _addToCart_ dándole las propiedades actualizadas del producto y la cantidad, y se agrega una ruta al mediante "history.push()" para redireccionar al usuario al "Cart" (Component).

### ItemList

**Importaciones**

-   Se utilizará el useEffect Hook para poder correr una función asíncrona.
-   Se utilizará el useState Hook para almacenar la lista de productos obtenida de la db.
-   Se utilizará el "Item" (Component) para poder montarlo y renderizarlo dentro del componente.
-   Se utilizará el objeto "db" para poder interactuar con Firestore, servicio de Firebase.

**Flujo de Componente**  
 Cuando se monte por primera vez y cuando se modifique la variable categoryId (props), mediante el useEffect, se va a ejecutar la función asíncrona _serverRequest_. Dicha función va a hacer una query al servicio de Firestore para obtener todos los ítems, dentro de la "items" collection, que coincidan con el identificador de categoria que fue obtenido por la variable categoryId (props). Una vez obtenidos, se van a darle formato a medida que se los agrega a un array mediante la función _formatProduct_, que se le da por parámetros la información del ítem, devolviendo una estructura JSX, estilizada, que contiene un "Item" (Component), habiéndole pasado todas las propiedades por props. Una vez ya habiendo formateado todos los ítems y ya estando en un array, se va a asignar dicho array al "products" (State).  
 Cuando se renderice, va a devolver una estructura JSX, estilizada, que va a contener adentro el valor almacenado dentro de "products" (State). Dicho valor va a cambiar después de que se obtenga la información de la db y se formateen los productos para poder renderizar el array de todos ítems.

### NavBar

**Importaciones**

-   Se utilizará NavLink de "react-router-dom" para poder establecer links que redireccionen al usuario y que dependiendo de la ruta en la que se encuentre, asignarle una clase especial a los elementos que estén contendidos dentro del componente con el propósito de estilizar únicamente.
-   Se utilizará Link de "react-router-dom" para poder establecer links que redireccionen al usuario.

**Flujo de Componente**  
 Cuando se monte el componente, se va a renderizar una estructura JSX, estilizada, con todas las secciones dentro de un "NavLink" (Component) para poder redireccionar al usuario a las rutas correspondiente a cada sección y aplicar clases condicionalmente y con el logo envuelto en un "Link" (Component) para poder redireccionar la persona a la sección Home. Además, dicha estructura contiene, al final, el "CartWidget" (Component).

### Shop

**Importaciones**

-   Se utilizará el useParams Hook para poder obtener el parámetro "CategoryId", el código de identificación de la categoría, mandado por ruta.
-   Se utilizará el componente ItemList para poder renderizar la lista de ítems en la categoría indicada.

**Flujo de Componente**  
 Cuando se monte, se van a obtener el valor del parámetro “CategoryId” y se lo asignara a una constante. Se va a renderizar una estructura JSX, estilizada, con el "ItemList" (Component) pasándole por props el identificador de la categoría previamente almacenado en su constante correspondiente.

## Contexts

### Cart (Context)

**Importaciones**

-   Se utiliza "createContext" de react para poder definir un contexto.

**Flujo de Componente**  
Simplemente se define una constante "Cart" como contexto y se exporta.

### CustomCartProvider

**Importaciones**

-   Se utiliza useState para poder definir el "Cart" Array (State) que va a almacenar los ítems del carrito.
-   Se utiliza useEffect para poder correr un bloque de código cada vez que cambie el "Cart" Array (State) y la primera vez que se monte el componente.
-   Se importa la constante "db" del script de Firebase que contiene el handler de la base de datos (Firestore).

**Flujo de Componente**
Cuando se monte el componente se va a tomar como valor por defecto del "Cart" Array (State) lo que contenga la key "Cart-Array" (convertido por JSON.parse) del localstorage del usuario si es que existe y sino, se define un array vacío.  
La primera vez que el componente se monte y cuando cambie el estado del "Cart" (State), se va a establecer la key "Cart-Array" con el valor del carrito utilizando JSON.stringify para convertirlo en un string y después volver a reconvertirlo.  
Cuando el componente se renderice, se van a renderizar todo lo que envuelva el componente mediante el uso de "props.children".

**Funciones no asíncronas definidas**

-   _cleanCart_: va a cambiar el valor del "Cart" Array (State) a un array vacío.
-   _isInCart_: recibe las propiedades de un producto, itera por el Cart Array (Context) y devuelve un valor booleano de "true" si se encuentra y de "false" si no lo hace. Cabe aclarar que se implementan condiciones y manejo de errores que optimizan a la función.
-   _addToCart_: recibe las propiedades de un producto y la cantidad de dicho producto para agregarlo al Cart Array (context). Cabe destacar que se utiliza un condicional en el que, utilizando la función "isInCart", si devuelve el valor booleano de "false" entonces se agrega el producto a el Cart Array (context) pero si no, se modifica la cantidad de dicho producto con la cantidad requerida utilizando la función _modifyProductAmount_.
-   _modifyProductAmount_: recibe las propiedades de un producto y la cantidad de dicho producto para modificar la cantidad actual de dicho producto en el carrito a la indicada. Cabe destacar que se utiliza condiciones con el fin de hacer manejo de errores.
-   _removeFromCart_: recibe por parámetros las propiedades de un producto y lo remueve del Cart Array (Context). Cabe destacar que, mediante el uso de condicionales y la función _isInCart_, se realiza manejo de errores.
-   _getProductAmount_: recibe por parámetros las propiedades de un determinado producto y devuelve la cantidad de dicho producto que este en el momento en el Cart Array (Context). Cabe destacar que, mediante el uso de condicionales y el uso de la función _isInCart_, se realiza manejo de errores.
-   _getItemList_: devuelve un array con elementos del formato JSX correspondientes a cada uno de los ítems actuales en el Cart Array (Context). Es importante saber que esta función se utiliza específicamente en un solo componente, pero decidí mantenerla en el "CustomCartProvider" (Component) para mantener el diseño del ecommerce ordenado y organizado.
-   _getTotal_: recibe por parámetros una variable, llamada "options", que va a iterar por todos los ítems del Cart Array (Context) para obtener el total y dependiendo de la opción va a devolver el total Neto (opción 0: sin IVA) o el total Bruto (opción 1: con IVA).

**Funciones asíncronas definidas**

-   _checkProductForStock_: recibe por parámetros la propiedad con la cantidad de un determinado producto y devuelve un valor Booleano de "true" si se encuentra la cantidad necesaria para cubrir la cantidad deseada o "false" si la cantidad en la db es menor a la deseada. Cabe destacar que se utiliza condicionales para el manejo de errores producidos en la query a db.
-   _checkCartForStock_: itera por el Cart Array (Context) verificando si dichos ítems tienen stock en la db y si lo tienen devuelve el valor booleano de "true" y sino devuelve "false". Cabe destacar que se utiliza condicionales para el manejo de errores verificando que el Cart Array (Context) no este vacío y que para verificar que cada producto tiene stock individualmente se utiliza la función _Asincrona_ "checkProductForStock".

**Constantes Definidas**

-   "iva" y "dolar" como un valor general de la aplicación que almacenan los valores actuales correspondientes al I.V.A. y al dolar blue.

# Desafios Extras (Pro-Coder)

## Custom item

**Objetivo**

Posibilidad de agregar características seleccionables al producto (ej. talla, color, etc.). La customización no debería modificar el precio. Las selecciones serán detalladas en el checkout. Por ejemplo: 1 x camisa.

**Implementación**

La característica agregada a cada ítem es la del color, ya que correspondía debido a que todos los productos tienen al menos dos colores como elección.
Este desafío, fue posible gracias a la librería "react-select" que me brindo el componente "Select" con su fácil integración con React para poder crear un menú de opciones.

## Stock check

**Objetivo**

Validar stock al momento de intentar generar la orden.

**Implementación**

La manera en la que se verifica el stock es mediante el uso de una propiedad del tipo array llamado "stock" que tiene cada producto. En dicho Array, el índice del elemento dentro de él corresponde al stock del color del mismo índice en la propiedad "colors" del mismo producto.
La verificación del stock fue realizada tanto el "Cart" (Component) como en el "Checkout" (Component) para que el usuario no pueda simplemente ingresar manualmente la ruta correspondiente en el navegador y pueda hacer la orden igualmente.
Se incluyo un indicador de stock (haciendo hover explica lo que es) en el "Cart" (Component) para que el usuario sepa que no hay suficiente stock con la cantidad de producto seleccionado.

## Cart persistente

**Objetivo**

Hacer que el cart sea persistente en algún api de almacenamiento local en el navegador (local/session Storage).

**Implementación**

Fue implementado haciendo uso del localStorage de JavaScript Vanilla y del useEffect Hook de React en el "CustomCartProvider" (Component). La primera vez que se monte el "CustomCartProvider" (Component), se va a buscar en el localStorage del usuario el "Cart" Array (Context) en formato Sting, se lo transforma al formato objeto mediante JSON, y se lo asigna al estado "Cart" (Context). Cada vez que se actualice el "Cart" Array (Context) y la primera vez que se monte el "CustomCartProvider" (Component) (después de que se haya asignado el valor anterior al "Cart" Array (Context) almacenado en el localStorage del usuario), mediante el uso del useEffect Hook, se va a almacenar en el "Cart" Array (Context) con los productos en formato Sting en el localStorage del usuario.
