import {mat4} from 'gl-matrix'
export default class Mesh {

    constructor (material, vertices, normals, uvs ,indices) {

        this._vertices = vertices
        this.vertices = vertices
        this._normals = normals
        this.normals = normals
        this._uvs = uvs
        this.uvs = uvs
        this._indices = indices
        this.indices = indices
        this._material = material
        this.material = material


        this.model = mat4.create()
    }

    bindBuffers (gl) {

        let material = this._material

        let pixelPositions = new Float32Array(this._vertices)
        let positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, pixelPositions , gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(material.posLocation);

        let uv = new Float32Array(this._uvs)
        let uvBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, uv , gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(material.uvLocation);

        
        let normalData = new Float32Array(this._normals)
        let normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, normalData , gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, true, 0, 0);
        gl.enableVertexAttribArray(material.normalLocation);


        let indices = new Int16Array(this._indices)
        let indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices , gl.STATIC_DRAW);

        this.indexBuffer = indexBuffer
        this.positionBuffer = positionBuffer
        this.normalBuffer = normalBuffer
        this.uvBuffer = uvBuffer

    }

    upload (gl) {

        if(this._material.needsToBeCompiled) {
            this._material.compile(gl)
        }

        if(!this.loaded) {
            this.bindBuffers(gl)
        }
    }

    update () {
    }

}