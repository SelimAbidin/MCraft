import {mat4, quat, vec3} from 'gl-matrix'

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

const normalCalculation = (p1,p2,p3) => {

    let a = vec3.create()
    let b = vec3.create()

    vec3.sub(a, p1, p2)
    vec3.sub(b, p1, p3)

    let normal = vec3.create()
    return vec3.normalize(normal, vec3.cross(normal,a,b))
} 

class Cube {

    constructor (gl) {

        this._x = 0
        this._y = 0
        this._z = 0
        this._isTranslateDirty = true

        this._context = gl
        this.model = mat4.create()
        this._quaternian = quat.create()
        const s = 1

        this._vertices = []
        this._uvs = []
        this._normals = []

        let p1 = vec3.fromValues(-s, s, s)
        let p2 = vec3.fromValues(s, s, s)
        let p3 = vec3.fromValues(s, -s, s)
        let p4 = vec3.fromValues(-s, -s, s)
        

            
        // FRONT
        this._vertices.push(p1[0], p1[1], p1[2])
        this._vertices.push(p2[0], p2[1], p2[2])
        this._vertices.push(p3[0], p3[1], p3[2])
        this._vertices.push(p4[0], p4[1], p4[2])

        let u = 1 / 3
        this._uvs.push(0,0, u,0, u,1, 0,1)
        
        let normal = normalCalculation(p3,p2,p1)
        let xNormal = normal[0]
        let yNormal = normal[1]
        let zNormal = normal[2]

        this._normals.push(xNormal, yNormal, zNormal)
        this._normals.push(xNormal, yNormal, zNormal)
        this._normals.push(xNormal, yNormal, zNormal)
        this._normals.push(xNormal, yNormal, zNormal)

        // FRONT END

        // RIGHT
        let backMatrix = mat4.fromYRotation(mat4.create(), 90 * Math.PI / 180)

        let tempP = vec3.create()
        let temp1 = vec3.create()
        let temp2 = vec3.create()
        let temp3 = vec3.create()
        
        vec3.clone(temp1, vec3.transformMat4(tempP, p1, backMatrix )) 
        this._vertices.push(tempP[0], tempP[1], tempP[2])
        
        vec3.clone(temp2, vec3.transformMat4(tempP, p2, backMatrix ))
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.clone(temp3,vec3.transformMat4(tempP, p3, backMatrix ))
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p4, backMatrix )
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        this._uvs.push(0,0, u,0, u,1, 0,1)

        normal = normalCalculation(temp3,temp2,temp1)
        xNormal = normal[0]
        yNormal = normal[1]
        zNormal = normal[2]
        console.log(temp3,temp2,temp1);
        
        this._normals.push(xNormal, yNormal, zNormal)
        this._normals.push(xNormal, yNormal, zNormal)
        this._normals.push(xNormal, yNormal, zNormal)
        this._normals.push(xNormal, yNormal, zNormal)


       // RIGHT END
        
        // BACK
        backMatrix = mat4.fromYRotation(backMatrix, 180 * Math.PI / 180)

        vec3.transformMat4(tempP, p1, backMatrix )
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p2, backMatrix )
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p3, backMatrix )
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p4, backMatrix )
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        this._uvs.push(0,0, u,0, u,1, 0,1)

        // BACK END
        

        // LEFT
        backMatrix = mat4.fromYRotation(backMatrix, 270 * Math.PI / 180)

        vec3.transformMat4(tempP, p1, backMatrix )
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p2, backMatrix )
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p3, backMatrix )
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p4, backMatrix )
        this._vertices.push(tempP[0], tempP[1], tempP[2])
        this._uvs.push(0,0, u,0, u,1, 0,1)
        // this._uvs.push(0,0, u,0, u,1, 0,1)
        // this._uvs.push(0,0, u,0, u,1, 0,1)
        // this._uvs.push(0,0, u,0, u,1, 0,1)
        // this._uvs.push(0,0, u,0, u,1, 0,1)
        // LEFT END



        // TOP
        backMatrix = mat4.fromXRotation(backMatrix, -90 * Math.PI / 180)

        vec3.transformMat4(tempP, p1, backMatrix )
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p2, backMatrix )
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p3, backMatrix )
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p4, backMatrix )
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        u = 1
        let us = (1 / 3) * 2 + 0.02
        
        this._uvs.push(us,0, u,0, u,1, us,1)

      

        backMatrix = mat4.fromXRotation(backMatrix, 90 * Math.PI / 180)

        vec3.transformMat4(tempP, p1, backMatrix )
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p2, backMatrix )
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p3, backMatrix )
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p4, backMatrix )
        this._vertices.push(tempP[0], tempP[1], tempP[2])

        u = (1 / 3) * 2
         us = (1 / 3)
        this._uvs.push(us,0, u,0, u,1, us,1)


        this._indices = [
            2,1,0,
            0,3,2,
            
            6,5,4,
            4,7,6,

            10,9,8,
            8,11,10,

            14,13,12,
            12,15,14,

            18,17,16,
            16,19,18,

            22,21,20,
            20,23,22,
        ]
        
        let size = this._indices.length / 6



        var vertexSource  = `
        attribute vec3 a_position;
        attribute vec2 a_uv;
        uniform mat4 proj;
        uniform mat4 model;
        varying highp vec2 vTextureCoord;
        varying highp vec3 tint;
        void main() {
              vTextureCoord = a_uv;
              vec4 dlight = vec4(3,3,0,1);
              dlight = proj * dlight;

              vec4 position = (proj * model) * vec4(a_position.x, a_position.y, a_position.z, 1.0);
              float direct = dot(position.xyz , dlight.xyz);
              tint = vec3(1.0, 1.0, 1.0);
              gl_Position = position;
        }`;

        var fragmentSource = `
        precision mediump float;
        varying highp vec2 vTextureCoord;
        uniform sampler2D uSampler;
        varying highp vec3 tint;
        void main() {
              gl_FragColor = texture2D(uSampler, vTextureCoord) * vec4(tint, 1.0);
        }`;

        let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(fragmentShader, fragmentSource)
        gl.compileShader(fragmentShader)

        var fragmentStatus = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
        if(!fragmentStatus) {
             var log = gl.getShaderInfoLog(fragmentShader);
             console.log(log);
        }
  
        let vertexShader = gl.createShader(gl.VERTEX_SHADER)
        gl.shaderSource(vertexShader, vertexSource)
        gl.compileShader(vertexShader)

        var vertexStatus = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
        if(!vertexStatus) {
             var log = gl.getShaderInfoLog(vertexShader);
             console.log(log);
        }

        var shaderProgram = gl.createProgram();

        gl.bindAttribLocation(shaderProgram, 0,"a_position");
        gl.bindAttribLocation(shaderProgram, 1, "a_uv");

        gl.attachShader(shaderProgram, vertexShader); 
        gl.attachShader(shaderProgram, fragmentShader); 
        gl.linkProgram(shaderProgram);

        // this.posLocation = gl.getAttribLocation(shaderProgram,'a_position')
        this.posLocation = 0
        this.uvLocation = 1//gl.getAttribLocation(shaderProgram,'a_uv')
        // this.uvLocation = gl.getAttribLocation(shaderProgram,'a_uv')

        this._textureLocation = gl.getUniformLocation(shaderProgram, 'uSampler');

        var projLocation = gl.getUniformLocation(shaderProgram, "proj");
        var modelLocation = gl.getUniformLocation(shaderProgram, "model");

        this._projLocation = projLocation
        this._modelLocation = modelLocation
        this._program = shaderProgram

        let pixelPositions = new Float32Array(this._vertices)
        let positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, pixelPositions , gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.posLocation);

        let uv = new Float32Array(this._uvs)
        let uvBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, uv , gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.uvLocation);


        
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
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            } else {

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            }
        }

        image.src = './textures/cube_pot.png'

        let indices = new Int16Array(this._indices)
        let indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices , gl.STATIC_DRAW);

        this.indexBuffer = indexBuffer
        this.positionBuffer = positionBuffer
        this.uvBuffer = uvBuffer
        this._gl = gl
    }

    setX (x) {
        this._x = x
        this._isTranslateDirty = true
    }

    setY (y) {
        this._y = y
        this._isTranslateDirty = true
    }

    setY (z) {
        this._z = z
        this._isTranslateDirty = true
    }

    update (p) {
        
        let gl = this._gl
        
        gl.useProgram(this._program)
        gl.uniformMatrix4fv(this._projLocation, false, p);  // offset it to the right half the screen
        
        if(this._isTranslateDirty) {

            mat4.identity(this.model)
            if(this._translateMatrix === undefined)this._translateMatrix = mat4.create()

            mat4.fromTranslation(this._translateMatrix, [this._x, this._y, this._z])
            mat4.copy(this.model, this._translateMatrix)
        }

        if(this._rotationY === undefined) this._rotationY = 0
        this._rotationY++
        // this._rotationY = 45
        
        let rotation = quat.fromEuler(this._quaternian, this._rotationY, this._rotationY, 0)
        mat4.fromQuat(this.model, rotation)

        gl.uniformMatrix4fv(this._modelLocation, false, this.model);  // offset it to the right half the screen

        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.vertexAttribPointer(this.posLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.posLocation);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
        gl.vertexAttribPointer(this.uvLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.uvLocation);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        
        let count = this._indices.length
        gl.drawElements(gl.TRIANGLES ,  count, gl.UNSIGNED_SHORT, 0)


    }

}

export default Cube