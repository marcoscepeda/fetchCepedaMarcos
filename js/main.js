

// FETCH 

const listadoProductos = "json/productos.json";

const contenedorProductos = document.getElementById("contenedorProductos");

const carrito = [];

fetch(listadoProductos)
    .then(respuesta => respuesta.json())
    .then(datos =>{
        datos.forEach(producto => {

            const divProducto = document.createElement("div");
            divProducto.classList.add("card","col-xl-3", "col-md-6", "col-sm-12");
            divProducto.innerHTML = `
                                    <div>
                                        <img src="img/${producto.id}.jpg" class="card-img-top img-fluid py-3">
                                        <div class="card-body">
                                            <h3 class="card-title"> ${producto.nombre} </h3>
                                            <p class="card-text">Precio: ${producto.precio} </p>
                                            <button id="boton${producto.id}" class="btn btn-primary"> Añadir al Carrito </button>
                                        </div>
                                    </div>`;
            contenedorProductos.appendChild(divProducto);   // AGREGO LOS PRODUCTOS AL CONTENEDORPRODUCTOS EN CADA DIV

            //Agregar un evento al boton de agregar al carrito: 
            const boton = document.getElementById(`boton${producto.id}`); // c/producto tiene su boton 1,2,...8 de id, al presionar se agrega al carrito
            boton.addEventListener("click", () => {

                // TOASTIFY AGREGAR AL CARRITO
                Toastify({
                    text: `${producto.nombre} añadido al carrito`,
                    duration: 4000,
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                
                    
                }).showToast();
                agregarAlCarrito(producto.id);  // crea una fn agregarAlCarrito, la defino abajo
            })            

        })       

    })

    //const carrito = []; // carrito vacio

            // del localStorage lo agrego al array de carrito de compras
            if(localStorage.getItem("carrito")){
                let carrit = JSON.parse(localStorage.getItem("carrito"));
                for( let i = 0; i < carrit.length; i++){
                    carrito.push(carrit[i]);
                }   
            } 
            
            // FUINCION AGREGAR AL CARRITO
            const agregarAlCarrito = (id) =>{
                const producto = productos.find(producto => producto.id === id);
                carrito.push(producto);
            }   
            
            const contenedorCarrito = document.getElementById("contenedorCarrito");
            const verCarrito = document.getElementById("verCarrito");

            verCarrito.addEventListener("click", actualizarCarrito);

            // FUNCION ACTUALIZAR CARRITO
            function actualizarCarrito(){
                let aux = "";
                carrito.forEach(producto =>{
                    aux += `
                            <div class = "card col-xl-3 col-md-6 col-sm-12">
                                <img src="img/${producto.id}.jpg" class="card-img-top img-fluid py-3">
                                <div class="card-body">
                                    <h3 class="card-title"> ${producto.nombre} </h3>
                                    <p class="card-text">Precio: ${producto.precio} </p>                        
                                    <button onClick = "eliminarDelCarrito(${producto.id})" class="btn btn-primary"> Eliminar del carrito </button> 
                                </div>
                            </div> 
                            `
                })

                contenedorCarrito.innerHTML = aux;
                // agrego al local storage
                localStorage.setItem("carrito", JSON.stringify(carrito));
                calcularTotalCompra()

            }

            // funcion elimarDelCarrito

            const eliminarDelCarrito = (id) =>{
                const producto = carrito.find(producto => producto.id === id);
                carrito.splice(carrito.indexOf(producto),1);
                actualizarCarrito(); 
            }

            // funcion para vaciar el carrito completo vaciarCarrito()

            const vaciarCarrito = document.getElementById("vaciarCarrito");
            vaciarCarrito.addEventListener("click", ()  =>{
                carrito.splice(0, carrito.length);
                actualizarCarrito(); 
            });


            const totalCompra = document.getElementById("totalCompra");
            // funcion calcular total de la compra

            const calcularTotalCompra = () => {
                let total = 0;
                carrito.forEach(producto => {
                    total += producto.precio * producto.cantidad;
                });
                totalCompra.innerHTML = total +`$`;   

            }





