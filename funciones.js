const id = ['n0', 'n1', 'n2', 'n3',
    'n4', 'n5', 'n6', 'n7',
    'n8', 'n9', 'sp', 'sb',
    'ss', 'sr', 'sm', 'sd',
    'sy', 'sv', 'ssm', 'out'
]

const display = []
let resolve, nro

for (let i = 0; i < id.length; i++) {

    const elemento = document.getElementById(id[i])
    const simbolo = elemento.innerText

    elemento.addEventListener('click', () => {
        ejecutarBoton(simbolo)
    })
}

function ejecutarBoton(simbolo) {

    let ultimaPosicion, penultimaPosicion

    switch (simbolo) {
        case 'C':
            eliminar()
            break;

        case '=':
            console.log(toStringArray(display))
            resolve = resolver(display)
            document.querySelector(".NumerosEnPantalla").innerHTML = resolve
            nro = display.length
            for (let idx = 0; idx < nro; idx++) {
                display.pop()
                
            }
            display.push(resolve)
            break;

        case 'out':
            out()
            break;

        case '*':
            ultimaPosicion = display.length - 1
            penultimaPosicion = ultimaPosicion - 1

            switch (display[ultimaPosicion]) {

                case '+':
                    display.pop()
                    add('*')
                    break;
                case '-':

                    if (display[penultimaPosicion] === '/' || display[penultimaPosicion] === '*'){
                        display.pop()
                        display.pop()
                        add('*')
                    }else{
                        display.pop()
                        add('*')
                    }    

                    break;
                case '/':
                    display.pop()
                    add('*')
                    break
                case '*':
                    console.log('repetido')
                    break;
                default:
                    add('*')
                    break;
            }
            break;

        case '/':
            ultimaPosicion = display.length - 1
            penultimaPosicion = ultimaPosicion - 1
            switch (display[ultimaPosicion]) {
                case '+':
                    display.pop()
                    add('/')
                    break;
                case '-':
                    if (display[penultimaPosicion] === '/' || display[penultimaPosicion] === '*'){
                        display.pop()
                        display.pop()
                        add('/')
                    }else{
                        display.pop()
                        add('/')
                    }
                    break;
                case '*':
                    display.pop()
                    add('/')
                    break;
                case '/':
                    console.log('repetido')
                    break;
                default:
                    add('/')
                    break;
            }
            break;

        case '+':
            ultimaPosicion = display.length - 1
            penultimaPosicion = ultimaPosicion - 1
            switch (display[ultimaPosicion]) {
                case '-':
                    if (display[penultimaPosicion] === '/' || display[penultimaPosicion] === '*'){
                        display.pop()
                        display.pop()
                        add('+')
                    }else{
                        display.pop()
                        add('+')
                    }
                    break;
                case '*':
                    display.pop()
                    add('+')
                    break;
                case '/':
                    display.pop()
                    add('+')
                    break;
                case '+':
                    console.log('repetido')
                    break;
                default:
                    add('+')
                    break;
            }
            break;

        case '-':
            ultimaPosicion = display.length - 1
            penultimaPosicion = ultimaPosicion - 1
            switch (display[ultimaPosicion]) {
                case '+':
                    display.pop()
                    add('-')
                    break;
                case '/':
                    add('-')
                    break;
                case '*':
                    add('-')
                    break;
                case '-':
                    console.log('repetido')
                    break;
                default:
                    add('-')
                    break;
            }
            break;
        case '^':
            ultimaPosicion = display.length - 1
            penultimaPosicion = ultimaPosicion - 1
            switch (display[ultimaPosicion]) {
                case '+':
                    display.pop()
                    add('^')
                    break;
                case '/':
                    display.pop()
                    add('^')
                    break;
                case '*':
                    display.pop()
                    add('^')
                    break;
                case '-':
                    display.pop()
                    add('^')
                    break;
                default:
                    add('^')
                    break;
            }
            break;
        
        case 'raiz':
            console.log('holamundo')
        break;

        default:
            add(simbolo)
            break;
    }
}


function resolver(cadena) {
    let resultado, cambio
    let cadenaTexto = toStringArray(cadena)
    for (let i = 0; i < cadena.length; i++) {
        if(cadena[i] === '+'){
            resultado = separar(cadena, i, '+')
            console.log(resultado)
            return resultado
        } else if (cadena[i] === '-'){
            resultado = separar(cadena, i, '-')
            console.log(resultado)
            return resultado
        } else if (cadena[i] === '*' && cadenaTexto.indexOf('+')=== -1 && cadenaTexto.indexOf('-')=== -1){
            resultado = separar(cadena, i, '*')
            console.log(resultado)
            return resultado
        } else if(cadena[i] === '/' && cadenaTexto.indexOf('+')=== -1 && cadenaTexto.indexOf('-') === -1){
            resultado = separar(cadena, i, '/')
            console.log(resultado)
            return resultado
        } else if(cadena[i] === '^' && cadenaTexto.indexOf('+')=== -1 && cadenaTexto.indexOf('-') === -1 && cadenaTexto.indexOf('*') === -1 && cadenaTexto.indexOf('/') === -1){
            resultado = separar(cadena, i, '^')
            console.log(resultado)
            return resultado
        }
    }

    cambio = parseInt(toStringArray(cadena))

    return cambio
}


function separar(cadena, posicion, operador) {
    let primerTermino = []
    let segundoTermino = []
    let contador = 0

    for (let j = 0; j < posicion; j++) {
        primerTermino[j] = cadena[j]
    }

    for (let k = posicion + 1; k < cadena.length; k++) {
        segundoTermino[contador] = cadena[k]
        contador++
    }

    console.log(primerTermino, segundoTermino)

    resultado = calcular(primerTermino, segundoTermino, operador)
    
    return resultado
}


function calcular(primero, segundo, operador) {
    let resultado
    switch (operador) {
        case '+':
            resultado = resolver(primero) + resolver(segundo)
            break;
        case '-':
            resultado = resolver(primero) - resolver(segundo)
            break
        case '*':
            resultado = resolver(primero) * resolver(segundo)
            break
        case '/':
            resultado = resolver(primero) / resolver(segundo)
            break
        case '^':
            resultado = resolver(primero) ** resolver(segundo)
            break
        case 'raiz':
            
            break
        default:
            break;
    }
    return resultado
}

function add(simbolo) {
    display.push(simbolo)
    document.querySelector(".NumerosEnPantalla").innerHTML = toStringArray(display);
    console.log(display)
}

function eliminar() {
    display.pop();
    document.querySelector(".NumerosEnPantalla").innerHTML = toStringArray(display);
}

function out() {
    window.close();
}

function toStringArray(arreglo) {
    let tam = arreglo.length;
    let digito = "";
    if (tam != 0) {
        for (let i in arreglo) {
            digito += arreglo[i];
        }
        return digito;
    } else {
        return null
    }
}