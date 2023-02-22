import { Mmap } from './map';
import { Player } from './player';

const mmap = new Mmap();
mmap.initMap(5, 5).print()

const pos = mmap.data;

const quque = [[0, 0]];
while (quque.length > 0) {
    let data = quque.shift();
    if(isArrive(data[0])) {

    }
    const newquque = [];
    
}

if(quque === 0 && newquque) {
    
}




