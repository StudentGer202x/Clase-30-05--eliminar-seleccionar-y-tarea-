import { getData, save, remove, getDocumento } from "./firestore.js"
//adEventListener permite llamar un evento en este caso click 
document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            const persona = {
                run: document.getElementById('run').value,
                nom: document.getElementById('nombre').value,
                ape: document.getElementById('apellido').value,
                fecha: document.getElementById('fecha').value,
                email: document.getElementById('email').value,
                fono: document.getElementById('fono').value,
                sueldo: document.getElementById('sueldo').value,
            }
            save(persona)
            limpiar()
        }
    }
})
//DOMContentLoaded es un evento que se ejecuta al recargar la página
window.addEventListener('DOMContentLoaded', () => {
    //getData retorna toda la información en la variable datos 
    getData((datos) => {
        let tabla = ''
        //se recorre la colección y se crear el item doc para mostrar los datos
        datos.forEach((doc) => {
            //data tiene los valores del documento 
            const item = doc.data()
            tabla += `<tr>
            <td>${item.run}</td>
            <td>${item.nom}</td>
            <td>${item.ape}</td>
            <td>${item.fecha}</td>
            <td>${item.email}</td>
            <td>${item.fono}</td>
            <td>${item.sueldo}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        //recorrer todos los botones
        document.querySelectorAll('.btn-danger').forEach(btn => {
            //verificar que botón se clickeo
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        //eliminar registro, invocando la función remove
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })
        //seleccionar 
        document.querySelectorAll('.btn-warning').forEach(btn =>{
            //async y await sirve para esperar a que tenga respuesta la función
            btn.addEventListener('click',async() =>{
                //se asigna el documento a la variable empleado
                const empleado = await getDocumento(btn.id)
                //se obtienen los datos del documento
                const e = empleado.data()
                //asignar los datos a los input
                document.getElementById('run').value = e.run
                document.getElementById('nombre').value = e.nom
                document.getElementById('apellido').value = e.ape
                document.getElementById('fecha').value = e.fecha
                document.getElementById('email').value = e.email
                document.getElementById('fono').value = e.fono
                document.getElementById('sueldo').value = e.sueldo
                //cambiar el valor al botón
                document.getElementById('btnGuardar').value = 'Editar'
                //dejar el run como solo lectura
                document.getElementById('run').readOnly = true
            })
        })
    })
})