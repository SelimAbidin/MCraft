import Cube from '../core/Cube'


export default class Terrain {

    constructor(scene) {
        this._scene = scene
        this.createCubes()
    }

    createCubes () {

        let countX = 10
        let countY = 20
        console.log('total : ',  countX * countY);
        
        let cubeSize = 11
        let xSize = countX * cubeSize
        console.log(xSize);
        
        for (let i = 0; i < countX; i++) {
            
            for (let j = 0; j < countY; j++) {
                
                let cube = new Cube()
                cube.transform.setXYZ( (i * cubeSize) - ((xSize * 0.5)) , -20, -j * cubeSize)
                this._scene.addChild(cube)
            }
            
        }

    }
    
}