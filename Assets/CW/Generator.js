import Sentence from './Sentence.js';
import Map from './Map.js';
export default class Generator{
    constructor(container,w,h){
        this.container = container;
        this.w = w;
        this.h = h;
        this.sentence = new Sentence();
    }
    generateMapsRec(maps,words,level = 0){
        let word = words.pop();
        if(word == undefined) return maps;
        // console.log(`for word ${word}`);
        if(maps == null){
            maps=[];
            // console.log(`first word in map`);
            var map = new Map(this.w,this.h);
            map.initialize();
            maps = map.generateValidMaps(word);
        }
        else{
            // console.log(`not first word in map`);
            let newmaps = [];
            for(let i in maps){
                let map = maps[i];
                newmaps.push(...map.generateValidMaps(word));
            }
            maps = newmaps;
        }
        let withintersections = maps.filter(x => x.intersections >= level);
        if(withintersections.length > 0){
            maps = withintersections;
        }
        else{
            // console.log(`no intersections after adding ${word}`);
        }
        maps = maps.splice(0,100);
        maps = this.getUniqueMaps(maps);
        return this.generateMapsRec(maps,words,level++);
    }
    getUniqueMaps(maps){
        let um = [],found = false;;
        for(let i =0 ; i < maps.length -1 ; i++){
            found = false;
            for(let j = i+1;j < maps.length; j++){
                if(maps[i].equals(maps[j])){
                    found = true;
                    break;
                }
            }
            if(!found){
                um.push(maps[i]);
            }
        }
        if(um.length ==0 && maps.length > 0) um.push(maps[0]);
        return um;
    }
    generateMaps(){
        for(let i = 0; i < 10;i++){
            for(let j = 0; j < 10;j++){
                // console.log(`start generating maps`);
                let maps = null, words;
                // words = this.sentence.getWordsOrdered(true);
                words = this.sentence.getShuffledWords();
                maps = this.generateMapsRec(maps,words);
                console.log(`end generating maps ${maps.length}`);
                this.maps = maps;
                if(maps.length > 0){
                    return;
                }
            }
            if(Math.random() > 0.5 || Math.random() > 0.5 || Math.random() > 0.5){this.w++;}
            if(Math.random() > 0.5 || Math.random() > 0.5 || Math.random() > 0.5){this.h++;}
        }
    }
    drawMaps(){
        $(`#${this.container}`).empty();
        let list = this.maps;
        list = list.filter(x => x.intersections > 0);
        list = list.splice(0,1);
        for(let i in list){
            let m = list[i];
            let html = m.draw(this.sentence.getWords());
            $(`#${this.container}`).append(html);
        }
    }
}