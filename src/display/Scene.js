import Camera from './Camera'
import Cube from './Cube'
class Scene {

    constructor (canvas) {
        this._canvas = canvas
        this._gl = canvas.getContext('webgl', {
            antialias : false
        })
        this.x = 0
        this._camera = new Camera()
        this._cube = new Cube(this._gl)
    }

    render () {
        const gl = this._gl

        this.x+= 0.1
        this._cube.setX(Math.sin(this.x))
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);

        gl.clearColor(7 / 255, 120 / 255, 200 / 255, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT )

        this._cube.update(this._camera.perspective)
        // this._camera.perspective


    }
}

export {Scene as default}