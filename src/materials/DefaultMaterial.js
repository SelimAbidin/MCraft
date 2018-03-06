
import DefaultShader from './shaders/DefaultShader'
import Material from './Material'

const isPOT = (size) => {

    if(size === 0) return false
    let n = size
    while(n !== 1) {

        if(n & 2 !== 0) {
            return false
        }
        n = n / 2
    }

    return true
}


export default class DefaultMaterial extends Material {

    constructor () {
        super()
        this.needsToBeCompiled = true
        this._shader = new DefaultShader()
    }

    compile (gl) {

        
        let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(fragmentShader, this._shader.getFragmentShader())
        gl.compileShader(fragmentShader)

        var fragmentStatus = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
        if(!fragmentStatus) {
             var log = gl.getShaderInfoLog(fragmentShader);
             console.log(log);
        }


        let vertexShader = gl.createShader(gl.VERTEX_SHADER)
        gl.shaderSource(vertexShader, this._shader.getVertexShader())
        gl.compileShader(vertexShader)

        var vertexStatus = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
        if(!vertexStatus) {
             var log = gl.getShaderInfoLog(vertexShader);
             console.log(log);
        }


        var shaderProgram = gl.createProgram();
        
        
        this.posLocation = 0
        this.normalLocation = 1
        this.uvLocation = 2


        gl.bindAttribLocation(shaderProgram, 0, "a_position");
        gl.bindAttribLocation(shaderProgram, 1, "a_normal");
        gl.bindAttribLocation(shaderProgram, 2, "a_uv");

        gl.attachShader(shaderProgram, vertexShader); 
        gl.attachShader(shaderProgram, fragmentShader); 
        gl.linkProgram(shaderProgram);


        this._textureLocation = gl.getUniformLocation(shaderProgram, 'uSampler');

        
        var projLocation = gl.getUniformLocation(shaderProgram, "proj");
        var viewLocation = gl.getUniformLocation(shaderProgram, "view");
        var modelLocation = gl.getUniformLocation(shaderProgram, "model");
        this._modelInverseTransposeLocation = gl.getUniformLocation(shaderProgram, "tmodel");
        var lightPLocation = gl.getUniformLocation(shaderProgram, "lPos");
        
        
        
        this._texture = gl.createTexture()
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, this._texture);


        const pixel = new Uint8Array([255, 0, 255, 255]);  // opaque blue
        gl.texImage2D(gl.TEXTURE_2D, 0,gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel);


        let image = new Image()
        image.onload = (e) => {

            gl.bindTexture(gl.TEXTURE_2D, this._texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

            if(isPOT(image.width) && isPOT(image.height)) {
                gl.generateMipmap(gl.TEXTURE_2D);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
            } else {

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            }
        }

        image.src = './textures/cube_pot.png'

        this._projLocation = projLocation
        this._viewLocation = viewLocation
        this._modelLocation = modelLocation
        this._lightPLocation = lightPLocation
        this._program = shaderProgram

        this.needsToBeCompiled = false

    }

}