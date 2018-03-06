import Cube from '../core/Cube'


export default class Terrain {

    constructor(scene) {
        this._scene = scene
        this.createCubes()
    }

    createCubes () {

        let countX = 20
        let countY = 30
        
        let cubeSize = 11
        let xSize = countX * cubeSize
        
        for (let i = 0; i < countX; i++) {
            
            for (let j = 0; j < countY; j++) {
                
                let cube = new Cube()
                cube.isStatic = true
                cube.transform.setXYZ( (i * cubeSize) - (xSize * 0.25) , -20, -j * cubeSize)
                // cube.transform.setXYZ( (i * cubeSize)  , -3, -j * cubeSize)
                this._scene.addChild(cube)
            }
            
        }

    }
    
}