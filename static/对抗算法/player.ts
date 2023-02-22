import { Mmap } from './map'

interface Action {
    map: Mmap;
    players?: Player[]
}

function mapIndex(data: string[][], fn) {
    for(let i = 0; i < data.length; i++) {
        data[i] = [];
        for(let j = 0; j < data[i].length; j++) {
            let result = fn(data[i][j])
            if(result) return result;
        }
    }
}

export class Player {
    state: false;
    map: Mmap;
    basket: [number, number]
    index: [number, number]
    
    constructor() {}
    parseMap(map: Mmap) {
        this.map = map;
        this.basket = mapIndex(this.map.data, (item) => item === 'X');
    }

    getBasket() {
        return 
    }

    action({ map, players }: Action) {
        this.parseMap(map);
        return this.move();
    }

    setIndex(index) {
        this.index = index;
    }

    move() {
        
    }

}

