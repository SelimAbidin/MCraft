import {mat4, vec3} from 'gl-matrix'
import GameObject from '../core/GameObject'
class Camera extends GameObject{

    constructor () {

        super()

        this.perspective = mat4.create()
        let fovy = Math.PI / 1.2
        fovy = 0.4
        let width = 500
        let height = 500
        mat4.perspective(this.perspective, fovy, height / width, 0.1, 1000)
        mat4.multiply(this.perspective, this.perspective, this.transform.worldMatrix)
    }

}

export {Camera as default}