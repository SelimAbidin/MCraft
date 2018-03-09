import Cube from '../core/Cube'


export default class Terrain {

    constructor(scene) {
        this._scene = scene
        this.createCubes()
    }

    createCubes () {

        let countX = 5
        let countY = 5
        
        let cubeSize = 11
        let xSize = countX * cubeSize
        
        for (let i = 0; i < countX; i++) {
            
            for (let j = 0; j < countY; j++) {
                
                let isStatic = (i % 2) === 1
                let cube = new Cube(isStatic)
                
                cube.transform.setXYZ( (i * cubeSize) - (xSize * 0.25) , -4, -j * cubeSize)
                // cube.transform.setXYZ( (i * cubeSize)  , -3, -j * cubeSize)
                this._scene.addChild(cube)
            }
            
        }

    }
    
}