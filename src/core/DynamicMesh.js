import {vec3} from 'gl-matrix'
import StaticMesh from './StaticMesh'
export default class DynamicMesh extends StaticMesh {

    constructor (material, vertices, normals, uvs ,indices) {
        super(material, vertices, normals, uvs ,indices)

        this.needsToBeCompiled = true
    }

    bindBuffers (gl) {

        if(this.material.needsToBeCompiled) {
            throw new Error('Material needs to be compiled before Mesh buffers bind and render')
        }
        
        let material = this.material

        let pixelPositions = new Float32Array(this.vertices)
        this.positionBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, pixelPositions , gl.STATIC_DRAW);
        gl.vertexAttribPointer(material.posLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(material.posLocation);

        let normalArray = new Float32Array(this.normals)
        this.normalBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, normalArray , gl.STATIC_DRAW);
        gl.vertexAttribPointer(material.normalLocation, 3, gl.FLOAT, true, 0, 0);
        gl.enableVertexAttribArray(material.normalLocation);
        
        let uvArray = new Float32Array(this.uvs)
        this.uvBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, uvArray , gl.STATIC_DRAW);
        gl.vertexAttribPointer(material.uvLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(material.uvLocation);

        let indicesArray = new Int16Array(this.indices)
        this.indicesBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesArray , gl.STATIC_DRAW);

        this.needsToBeCompiled = false
    }

    render (gl, camera, transform) {

        if(this.needsToBeCompiled) {
            this.bindBuffers(gl)
        }

        
        let lX = window.lpx
        let lY = window.lpy
        var lpos = vec3.fromValues(lX, lY, 1)
        lpos = vec3.normalize(vec3.create(),lpos)

        gl.useProgram(this.material._program);


        gl.uniformMatrix4fv(this.material._projLocation, false, camera.perspective);  // offset it to the right half the screen
        gl.uniformMatrix4fv(this.material._viewLocation, false, camera.transform.worldMatrix);  // offset it to the right half the screen
        gl.uniform3fv(this.material._lightPLocation, lpos)
        gl.uniformMatrix4fv(this.material._modelLocation, false, transform.worldMatrix);  // offset it to the right half the screen
        gl.uniformMatrix4fv(this.material._modelInverseTransposeLocation, false, transform.worldInverseTranspose);  // offset it to the right half the screen
        

        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
        gl.vertexAttribPointer(this.material.posLocation, 3, gl.FLOAT, false, 0,0)

        gl.bindBuffer(gl.ARRAY_BUFFER,this.normalBuffer)
        gl.vertexAttribPointer(this.material.normalLocation, 3, gl.FLOAT, true, 0,0)

        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer)
        gl.vertexAttribPointer(this.material.uvLocation, 2, gl.FLOAT, false, 0,0)
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);

        let count = this.indices.length
        gl.drawElements(gl.TRIANGLES , count, gl.UNSIGNED_SHORT, 0)
    }
}