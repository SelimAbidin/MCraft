import {vec3, mat4, quat} from 'gl-matrix'

class Renderer {

    constructor() {
        this._renderObjects = []
    }

    reset () {
        this._renderObjects.length = 0
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

    getBufferData (gl, material) {

        if(this._bufferData === undefined) {
            this._bufferData = {}


            let size = 50000
            let pixelPositions = new Float32Array(size * 3)
            let positionBuffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, pixelPositions , gl.STREAM_DRAW);
            gl.vertexAttribPointer(material.posLocation, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(material.posLocation);


            let normalArray = new Float32Array(size * 3)
            let normalBuffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, normalArray , gl.STREAM_DRAW);
            gl.vertexAttribPointer(material.normalLocation, 3, gl.FLOAT, true, 0, 0);
            gl.enableVertexAttribArray(material.normalLocation);
            

            let uvArray = new Float32Array(size * 2)
            let uvBuffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, uvArray , gl.STREAM_DRAW);
            gl.vertexAttribPointer(material.uvLocation, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(material.uvLocation);


            let indicesArray = new Int16Array(size * 10)
            let indicesBuffer = gl.createBuffer();

            let bufferObject = {}


            bufferObject.indicesBuffer = indicesBuffer
            bufferObject.indicesArray = indicesArray
            
            bufferObject.normalBuffer = normalBuffer
            bufferObject.normalArray = normalArray

            bufferObject.positionBuffer = positionBuffer
            bufferObject.positionArray = pixelPositions

            bufferObject.uvBuffer = uvBuffer
            bufferObject.uvArray = uvArray
            
            this._bufferData['t'] = bufferObject
        }



        return this._bufferData['t']
    }

    renderMaterial (gl, camera) {

        for (const key in this._materials) {
            
            const materialData = this._materials[key] 
            let material = materialData.material
            let gameObjects = materialData.gameObjects

            if(material.needsToBeCompiled) {
                material.compile(gl)
            }

            let bufferData = this.getBufferData(gl, material)

            let offsetPosition = 0
            let offsetUV = 0
            let indicesOffset = 0
            let lastGameObject
            let size = gameObjects.length

            for (let i = 0; i < size; i++) {
                const gameObject = gameObjects[i];
                const mesh = gameObject.mesh
                
                if(lastGameObject === undefined) {
                    lastGameObject = gameObject
                }
                
                for (let j = 0; j < mesh.vertices.length; j++) {
                    bufferData.positionArray[offsetPosition + j] = mesh.vertices[j]
                }
                
                for (let j = 0; j < mesh.normals.length; j++) {
                    bufferData.normalArray[offsetPosition + j] = mesh.normals[j]
                }

                for (let j = 0; j < mesh.uvs.length; j++) {
                    bufferData.uvArray[offsetUV + j] = mesh.uvs[j]
                }

                for (let j = 0; j < mesh.indices.length; j++) {
                    bufferData.indicesArray[indicesOffset + j] = mesh.indices[j] + (i * 24)
                }

                indicesOffset += mesh.indices.length
                offsetPosition += mesh.vertices.length
                offsetUV += mesh.uvs.length
            }
            
            
            let lX = window.lpx
            let lY = window.lpy
            var lpos = vec3.fromValues(lX, lY, 1)
            lpos = vec3.normalize(vec3.create(),lpos)
           
            gl.useProgram(material._program);

            gl.uniformMatrix4fv(material._projLocation, false, camera.perspective);  // offset it to the right half the screen
            gl.uniformMatrix4fv(material._viewLocation, false, camera.transform.worldMatrix);  // offset it to the right half the screen
            gl.uniform3fv(material._lightPLocation, lpos)

            gl.uniformMatrix4fv(material._modelLocation, false, lastGameObject.transform.worldMatrix);  // offset it to the right half the screen
            gl.uniformMatrix4fv(material._modelInverseTransposeLocation, false, lastGameObject.transform.worldInverseTranspose);  // offset it to the right half the screen
            
            
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferData.positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, bufferData.positionArray , gl.STREAM_DRAW);
            gl.vertexAttribPointer(material.posLocation, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(material.posLocation);

            gl.bindBuffer(gl.ARRAY_BUFFER, bufferData.normalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, bufferData.normalArray , gl.STREAM_DRAW);
            gl.vertexAttribPointer(material.normalLocation, 3, gl.FLOAT, true, 0, 0);
            gl.enableVertexAttribArray(material.normalLocation);

            gl.bindBuffer(gl.ARRAY_BUFFER, bufferData.uvBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, bufferData.uvArray , gl.STREAM_DRAW);
            gl.vertexAttribPointer(material.uvLocation, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(material.uvLocation);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferData.indicesBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, bufferData.indicesArray , gl.STREAM_DRAW);

            let count = bufferData.indicesArray.length
            // console.log(bufferData);
            // debugger
            count = size * (36 * 5)
            gl.drawElements(gl.TRIANGLES , count, gl.UNSIGNED_SHORT, 0)
            
        }


    }

    end(gl,camera) {
        

        gl.clearColor(7 / 255, 120 / 255, 200 / 255, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT )

        
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);

        this._materials = {}
        this._renderObjects.forEach( gameObject => {

            let mesh = gameObject.mesh
            let material = mesh.material

            if(this._materials[material.id] === undefined) {
               
                this._materials[material.id] = {
                    material : material,
                    gameObjects : []
                }
                
            }
            this._materials[material.id].gameObjects.push(gameObject)
        })
        

        this.renderMaterial(gl, camera)

        return        
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