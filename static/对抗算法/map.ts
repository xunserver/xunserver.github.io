export class Mmap {
    data: string[][]
    constructor() {}

    initMap(x: number, y: number) {
        const data = [];
        for(let i = 0; i < x; i++) {
            data[i] = [];
            for(let j = 0; j < y; j++) {
                data[i][j] = this.genCell();
            }
        }
        
        this.data = data
        return this;
    }

    genCell() {
        const itemsMap = [
            {
                value: 'O',
                ratio: 80 
            },
            {
                value: 'H',
                ratio: 20 
            }
        ]
        let index = Math.random() * 100;
        for(let { ratio, value } of itemsMap) {
            if(index < ratio) {
                return value
            }
            index -= ratio
        }

        return 'X'

    }

    print() {
        console.log(this.data)
    }
}