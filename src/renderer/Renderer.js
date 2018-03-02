import {vec3, mat4, quat} from 'gl-matrix'

class Renderer {

    constructor() {
        this._renderObjects = []
    }

    render (mesh) {
        this._renderObjects.push(mesh)
    }

    renderMesh (gl, mesh, perspective) {

        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);

        let material = mesh._material
        

        
        gl.useProgram(material._program);
        gl.uniformMatrix4fv(material._projLocation, false, perspective);  // offset it to the right half the screen
        
        if(this.lPosX === undefined) {
            this.lPosX = 0; 
        }

        this.lPosX += 0.04;
        let lX = Math.round(100 * Math.sin(this.lPosX))
        let lY = Math.round(100 * Math.cos(this.lPosX))

        // lX = 0;
        // lY = -40;
        lX = this.lpx
        lY = this.lpy

        lX = 2;
        lY = 0;
        
        var lpos = vec3.fromValues(lX, lY, 1)
        // var lpos = vec3.fromValues(0.5, 0.7, 1);
        lpos = vec3.normalize(vec3.create(),lpos)
        
        
        gl.uniform3fv(material._lightPLocation, lpos)
        // if(this._isTranslateDirty) {

        //     mat4.identity(this.model)
        //     if(this._translateMatrix === undefined)this._translateMatrix = mat4.create()

        //     mat4.fromTranslation(this._translateMatrix, [this._x, this._y, this._z])
        //     mat4.copy(this.model, this._translateMatrix)
        // }

        if(this._rotationY === undefined) this._rotationY = 0
        this._rotationY+=0.5;
        this._rotationY = 45


        //let rotation = quat.fromEuler(this._quaternian, this._rotationY, this._rotationY, 0)
        // let rotation = quat.fromEuler(this._quaternian, this._rotationY, 0, 0)
        // let rotation = quat.fromEuler(this._quaternian, 0, this._rotationY, 0)
        //mat4.fromQuat(this.model, rotation)
        
        
        gl.uniformMatrix4fv(material._modelLocation, false, mesh.model);  // offset it to the right half the screen

        let temp = mat4.create();
        mat4.invert(temp, mesh.model)
        
        let transposed = mat4.transpose(temp, temp)
        gl.uniformMatrix4fv(material._modelInverseTransposeLocation, false, transposed);  // offset it to the right half the screen

        
        
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.positionBuffer);
        gl.vertexAttribPointer(material.posLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(material.posLocation);


        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.uvBuffer);
        gl.vertexAttribPointer(material.uvLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(material.uvLocation);


        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);
        gl.vertexAttribPointer(material.normalLocation, 3, gl.FLOAT, true, 0, 0);
        gl.enableVertexAttribArray(material.normalLocation);
        
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
        
        let count = mesh._indices.length
        gl.drawElements(gl.TRIANGLES ,  count, gl.UNSIGNED_SHORT, 0)

    }

    end(gl,perspective) {
        
        this._renderObjects.forEach(gameObject => {

            let mesh = gameObject.mesh
            if(mesh.loaded === undefined) {
                
                mesh.upload(gl)
                let pixelPositions = new Float32Array(mesh._vertices)
                let positionBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, pixelPositions , gl.STATIC_DRAW);
                gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(mesh.posLocation);

                let uv = new Float32Array(mesh._uvs)
                let uvBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, uv , gl.STATIC_DRAW);
                gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(mesh.uvLocation);

                
                let normalData = new Float32Array(mesh._normals)
                let normalBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, normalData , gl.STATIC_DRAW);
                gl.vertexAttribPointer(0, 3, gl.FLOAT, true, 0, 0);
                gl.enableVertexAttribArray(mesh.normalLocation);
                
                mesh.loaded = true     
            }
            

            this.renderMesh(gl,mesh, perspective)

        });

        this._renderObjects.length = 0
    }

}

export default new Renderer()