import {vec3, mat4, quat} from 'gl-matrix'

class Renderer {

    constructor() {
        this._renderObjects = []
    }

    render (gameObject) {

        gameObject.update()
        if(gameObject.mesh) {
            this._renderObjects.push(gameObject)
        }
    }

    renderMesh (gl, gameObject, camera) {

        let mesh = gameObject.mesh
        let transform = gameObject.transform
        let material = mesh._material
        
        
        gl.useProgram(material._program);
        gl.uniformMatrix4fv(material._projLocation, false, camera.perspective);  // offset it to the right half the screen
        gl.uniformMatrix4fv(material._viewLocation, false, camera.transform.worldMatrix);  // offset it to the right half the screen
        
        

        if(this.lPosX === undefined) {
            this.lPosX = 0; 
        }

        this.lPosX += 0.04;
        let lX = Math.round(100 * Math.sin(this.lPosX))
        let lY = Math.round(100 * Math.cos(this.lPosX))


        lX = window.lpx
        lY = window.lpy
        
        var lpos = vec3.fromValues(lX, lY, 1)
        lpos = vec3.normalize(vec3.create(),lpos)
        
        
        gl.uniform3fv(material._lightPLocation, lpos)
        
        gl.uniformMatrix4fv(material._modelLocation, false, transform.worldMatrix);  // offset it to the right half the screen
        gl.uniformMatrix4fv(material._modelInverseTransposeLocation, false, transform.worldInverseTranspose);  // offset it to the right half the screen

        
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

    end(gl,camera) {
        

        gl.clearColor(7 / 255, 120 / 255, 200 / 255, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT )

        
        
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);

        
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
            

            this.renderMesh(gl,gameObject, camera)

        });

        this._renderObjects.length = 0
    }

}

export default new Renderer()