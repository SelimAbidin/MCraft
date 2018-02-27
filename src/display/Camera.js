import {mat4, vec3} from 'gl-matrix'

class Camera {

    constructor () {

        this.perspective = mat4.create()

        let proj = mat4.create()
        let fovy = Math.PI / 1.2
        fovy = 0.4
        let width = 500
        let height = 500
        let m = mat4.perspective(proj, fovy, height / width, 0.1, 1000)

        let v = vec3.create()
        vec3.set(v,0,0,-10)
        let model = mat4.create()
        mat4.fromTranslation(model, v)

        mat4.mul(this.perspective, proj,model)
    }



}

export {Camera as default}