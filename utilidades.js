const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    //classList tiene dos propiedades add y remove, add añade un estilo y remove quita estilos
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        //innerHTML permite añadir etiquetas html a la web
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }
    else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        if (id == 'sueldo') {
            if (input.value < 500000) {
                input.classList.add('is-invalid')
                div.innerHTML =
                    '<span class="badge bg-danger">No pagamos menos de $500.000</span>'
            }
        }
        if (id == 'fecha') {
            const dia = validarFecha(input.value)
            if (dia < 1) {
                input.classList.add('is-invalid')
                div.innerHTML =
                    '<span class="badge bg-danger">La fecha tope de contratación es hoy </span>'
            }
        }
        if (id == 'run') {
            const run = input.value.trim()
            // ! indica que debe ser false
            if (!validarRun(run) /*|| run.length < 9*/) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El run ingresado no es válido </span>'
            }
        }
        if (id == 'email') {
            if (!validarEmail(input.value.trim())) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El email no tiene el formato correcto </span>'
            }
        }
    }
}
const limpiar = () => {
    document.querySelector('form').reset()
    //querySelectorAll permite traer todos los elementos según un filtro (estilos)
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    //dejar normal el run y botón
    document.getElementById('run').readOnly = false
    document.getElementById('btnGuardar').value = 'Guardar'
}

const soloNumeros = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true
    return false
}
const validarFecha = (fecha) => {
    //capturar la fecha de hoy
    const hoy = new Date()
    //pasar el parametro de ingreso a formato fecha
    fecha = new Date(fecha)
    //como ambas tienen el mismo formato podemos restar, el resultado está en milisegundos
    const resta = hoy - fecha
    const dia = resta / (1000 * 60 * 60 * 24)
    //toFixed sirve para la cantidad de decimales
    return dia.toFixed(0)
}
//valdiar correo 
const validarEmail = (email) => {
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (!formato.test(email))
        return false
    return true
}
const validarRun = (run) => {
    const Fn = {
        // Valida el rut con su cadena completa "XXXXXXXX-X" 21388484-0
        validaRut: function (rutCompleto) {
            rutCompleto = rutCompleto.replace("‐", "-")
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false
            const tmp = rutCompleto.split('-')//split separa en 2 el run
            const digv = tmp[1] //dígito verificador (despues del guión)
            const rut = tmp[0] //parte númerica
            if (digv == 'K') digv = 'k'

            return (Fn.dv(rut) == digv)
        },
        dv: function (T) {
            let M = 0, S = 1
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11
            return S ? S - 1 : 'k'
        }
    }
    return Fn.validaRut(run)
}