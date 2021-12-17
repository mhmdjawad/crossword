import Point from "./Point.js";
export default class Map {
    
    constructor(w, h , l = [],values=[], intersections = 0) {
        this.w = w;
        this.h = h;
        this.l = l;
        this.values = values;
        this.intersections = intersections;
    }
    initialize() {
        this.l = [];
        for (let i = 0; i < this.h; i++) {
            for (let j = 0; j < this.w; j++) {
                this.l.push({
                    c: '',
                    p: new Point(i, j)
                });
            }
        }
    }
    getCell(point) {
        let cells = this.l.filter(o => o.p.is(point));
        if (cells && cells.length > 0)
            return cells[0];
        else
            return null;
    }
    available(word, point, dir) {
        let letters = word.split('');
        let currentPoint = point.clone();
        for (let i in letters) {
            let l = letters[i];
            let cell = this.l.find(o => o.p.is(currentPoint));
            if (!cell)
                return false;
            if (cell.c != '' && cell.c != l)
                return false;
            currentPoint.move(dir, 1);
        }
        // console.log(`can add word ${word} to map at ${point.x}-${point.y}-${dir} `);
        return true;
    }
    draw(originalwords) {
        let html = ``;
        html += `<div class="puzzle_iteration"> `;
        html += `<table class="t" >`;
        for (let i = 0; i < this.h; i++) {
            html += `<tr>`;
            for (let j = 0; j < this.w; j++) {
                let item = this.l.find(o => o.p.x == i && o.p.y == j);
                html += `<td class="${i}-${j}" > ${item ? item.c : ""} </td>`;
            }
            html += `</tr>`;
        }
        html += `</table>`;
        html += `<table class="t">`;
        let words = originalwords;
        console.log(words);
        for(let j = 0 ; j < words.length;j++){
            let values = this.values.find(x => x.w == words[j]);
            let v = values;
            html += `<tr>`;
            html += `<td>'${v.p.x}-${v.p.y}</td>`;
            for(let j = 0 ; j < v.w.length;j++){
                html += `<td>${v.w[j]}</td>`;
            }
            html += `</tr>`;
            values = [values];
        }
        html += `</table>`;
        html += `</div>`;
        return html;
    }
    addWord(word, point, dir){
        let letters = word.split('');
        let currentPoint = point.clone();
        for (let i in letters) {
            let l = letters[i];
            let index = this.l.findIndex(o => o.p.is(currentPoint));
            if(this.l[index].c == l){
                this.intersections++;
            }
            else{
                this.l[index].c = l;
            }
            currentPoint.move(dir, 1);
        }
        this.values.push({
            w : word,
            p : point,
            d : dir
        });
        // console.log(`letters of word ${word} added to map at ${point.x}-${point.y}-${dir} `);
    }
    getIntersections(){
        let list = this.values;
        let intersections = 0 ;
        for(let i = 0 ; i < list.length - 1; i++){
            for(let j = i+1; j < list.length;j++){
                let v1 = list[i];
                let v2 = list[j];
                let ps1 = this.getPointsForValue(v1);
                let ps2 = this.getPointsForValue(v2);


            }
        }
    }
    getPointsForValue(value){
        let startingp = value.p;
        let dir = value.d;
        let size = value.w.length;
        let points = [];
        for(let i = 0 ; i < size;i++){
            let p = startingp.clone();
            p.move(dir,i);
            points.push(p);
        }
    }
    getShortestWord(w1,w2){
        return w1.length < w2.length ? w1 : w2;
    }
    copy(){
        let newmap = new Map(this.w,this.h,[],[],this.intersections);
        newmap.l =[];
        this.l.forEach(x=> newmap.l.push({
            c: x.c,
            p: x.p.clone()
        }));
        newmap.values = [];
        this.values.forEach(x=> newmap.values.push({
            w : x.w,
            p : x.p,
            d : x.d
        }));
        return newmap;
    }
    generateValidMaps(word){
        let valid_maps = [];
        for(let i = 0; i < this.h;i++){
            for(let j = 0; j < this.w;j++){
                var startingpoint = new Point(i,j);
                for(let ok in Object.keys(DIRECTION)){
                    let k = Object.keys(DIRECTION)[ok];
                    if(this.available(word,startingpoint,DIRECTION[k])){
                        let newmap = this.copy();
                        newmap.addWord(word,startingpoint,DIRECTION[k]);
                        valid_maps.push(newmap);
                        // if(valid_maps.length >= 10) return valid_maps;
                    }
                }
            }
        }
        return valid_maps;
    }
    equals(o){
        if(this.w != o.w) return false;
        if(this.h != o.h) return false;
        if(this.intersections != o.intersections) return false;
        if(this.values.length != o.values.length) return false;
        for(let i = 0 ; i < this.values.length;i++){
            if(this.values[i].w != o.values[i].w) return false;
            if(this.values[i].d != o.values[i].d) return false;
        }
        return true;
    }
}
