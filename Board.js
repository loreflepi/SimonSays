const empezar = document.getElementById('btnEmpezar');
const azul = document.getElementById('azul');
const verde = document.getElementById('verde');
const rojo = document.getElementById('rojo');
const naranja = document.getElementById('naranja');
const NIVEL_MAXIMO = 5;

class Juego{
    constructor(){
        this.nivel = 1;
        this.subNivel = 1;
        this.colores = [];
        this.inicializar();
        this.generarSecuencia();
        this.numeroAColor();
        this.iluminarColores();
    }

    inicializar(){
        this.elegirColor= this.elegirColor.bind(this);
        this.iluminarColores= this.iluminarColores.bind(this);
        empezar.classList.add('hide');
    }

    generarSecuencia(){
        this.secuencia = new Array(NIVEL_MAXIMO).fill(0).map(numero => Math.floor(Math.random() * 4)); 
    }

    numeroAColor(){
        this.colores = this.secuencia.map(color => { 
            if (color == 0){
                return azul;
            }
            if (color == 1){
                return verde;
            } 
            if (color == 2){
                return rojo;
            }
            if (color == 3){
                return naranja;
            }
        });
    }

    iluminarColores(){
        this.colores.map(color => {
            color.classList.remove('apuntador');
        });
        for (let i = 0; i< this.nivel; i++){
            let divColor = this.colores[i];
            setTimeout(() => {
                divColor.classList.add('iluminar');
                setTimeout(() => {
                    divColor.classList.remove('iluminar');
                }, 350);
            }, 1000 * i);
        }
        setTimeout(() => {
            this.agregarEventoClick();
        }, 1000 * this.nivel);
    }

    agregarEventoClick(){
        this.colores.forEach(element => {
            element.addEventListener('click',this.elegirColor);
            element.classList.add('apuntador');
        });
        
    }

    elegirColor(ev){
        if(this.colores[this.subNivel - 1].dataset.color === ev.target.dataset.color){
                ev.target.classList.add('iluminar');
                setTimeout(() => {
                    ev.target.classList.remove('iluminar');
                }, 200);
            
            this.subNivel ++;
            if (this.nivel < this.subNivel){
                this.subNivel = 1;
                this.nivel ++;
                if (this.nivel === NIVEL_MAXIMO){
                    swal ( "Wow" ,  "Ganaste el juego!" ,  "success" ).then(()=> window.location.reload(true));
                    
                }
                else{
                    setTimeout(
                        this.iluminarColores
                    , 1000);
                    
                }
            }
        }
        else{
            swal ( "Oops" ,  "Perdiste el juego!" ,  "error" ).then(()=> window.location.reload(true));
            //empezar.classList.toggle('hide');
        }
        
    }
}

function empezarJuego(){
    juego = new Juego();
}
