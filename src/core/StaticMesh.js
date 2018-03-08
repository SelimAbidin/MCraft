import {vec3} from 'gl-matrix'

export default class StaticMesh {

    constructor (material, vertices, normals, uvs ,indices) {

        this.vertices = vertices
        this.normals = normals
        this.uvs = uvs
        this.indices = indices
        this.material = material
        this.isStatic = true
    }

    transformVertices (matrix) {

        let temp = vec3.create()
        for (let i = 0; i < this.vertices.length; i+=3) {
            
            vec3.set(temp, this.vertices[i], this.vertices[i + 1], this.vertices[i + 2])
            vec3.transformMat4(temp, temp, matrix)
            this.vertices[i] = temp[0]
            this.vertices[i+1] = temp[1]
            this.vertices[i+2] = temp[2]
        }
    }

}