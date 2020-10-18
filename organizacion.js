class Color{
    constructor(color_str){
        let values = color_str.split('').slice(1).map(x => parseInt(x,16));
        this.red = 16* values[0] + values[1]
        this.green = 16* values[2] + values[3]
        this.blue = 16* values[4] + values[5]
    }

    static distancia(color1, color2){
        return Math.sqrt(
            Math.pow(color1.red - color2.red, 2) +
            Math.pow(color1.green - color2.green, 2) +
            Math.pow(color1.blue - color2.blue, 2)
        )
    }
}

class Paleta{
    constructor(lista_str){
        if (lista_str){
            this.elementos = lista_str.map(str => new Color(str));
        } else {
            this.elementos = [];
        }
        this.organizado = this.elementos.slice()
    }

    distanciaTotal(){
        let dist = 0;
        for (let i = 0; i < this.organizado.length -1; i++) {
            dist += Color.distancia(this.organizado[i], this.organizado[i+1]);
        }
        return dist;
    }

    organizar(){
        let list = this.elementos.slice();

        if (list.length <= 3) return list; //SOLO EXISTE ESA POSIBILIDAD
        else{
            let new_list = [];
            let elem = list.shift();
            new_list = new_list.concat(elem);
            console.log("Lista");
            console.log(list);
            list = list.filter(value => value.red !== elem.red || value.green !== elem.green || value.blue !== elem.blue);
            console.log(list);
            while(list.length > 0){
                elem = list.reduce((acc,el) => {
                    if (!acc) return el;
                    if (Color.distancia(elem, acc) > Color.distancia(elem, el)) return el;
                    return acc;
                },null);
                new_list = new_list.concat(elem);
                list = list.filter(value => value.red !== elem.red || value.green !== elem.green || value.blue !== elem.blue);
            }
            return this.organizado = new_list;
        }
    }
}

function* newId(index) {
    while (index < 100) {
      yield index;
      index++;
    }
  }
  
  const iterator = newId(0);
  

//Funciones para HTML

let hijos_list = [];

function crearHijo(){
    let new_id = iterator.next().value.toString()
    let box_element = document.createElement('div');
    box_element.setAttribute("class","color_box");
    box_element.setAttribute("id",new_id)

    let inp_element = document.createElement('input');
    inp_element.setAttribute("type", "color");

    let button_element = document.createElement('button');
    button_element.setAttribute("class", "round-button");
    button_element.setAttribute("onclick", "document.getElementById('inputs').removeChild(document.getElementById('" + new_id + "'))");
    button_element.textContent = "X";
    box_element.appendChild(inp_element);
    box_element.appendChild(document.createElement('br'));
    box_element.appendChild(button_element);

    hijos_list.concat(box_element);

    document.getElementById("inputs").appendChild(box_element);
}


//Lote de datos

let pal = new Paleta(["#0000ff","#eeeeee","#1111dd","#ddddcc","#2222bb","#ccccaa","#333399","#bbbb88","#444477","#aaaa66","#555555","#999944","#666633","#888822","#777711","#ffffff"])

let pal2 = new Paleta(["#fafafa","#bbbbbb", "#ffeeff","#34fb2b","#ee9922","#000000","#ffffff","#00ff00"])

function solve(){
    let inputs = document.getElementById("inputs").children;
    let inputs_filtered = Array.from(inputs).filter(input => input.id !== "colorstart");
    let colors = inputs_filtered.map(input => input.children[0].value);

    console.log(colors);
    let pal = new Paleta(colors);
    let colores_organizados = pal.organizar();
    console.log(colores_organizados);

    let cuadrados_box = document.getElementById("squares_box");
    cuadrados_box.innerHTML = "";
    for (const color of colores_organizados) {
        let new_square = document.createElement('div');
        new_square.setAttribute('class','square');
        new_square.setAttribute('style',`background-color: rgb(${color.red},${color.green},${color.blue})`);
        cuadrados_box.appendChild(new_square);
        console.log(cuadrados_box);
    }


}
