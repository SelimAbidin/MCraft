import Renderer from '../renderer/Renderer'
import GameObject from './GameObject'
import Transform from './Transform'
import Mesh from './Mesh'
import DefaultMaterial from '../materials/DefaultMaterial'
import {vec3, mat4, quat} from 'gl-matrix'


const normalCalculation = (p1,p2,p3) => {

    let a = vec3.create()
    let b = vec3.create()
    vec3.sub(a, p1, p2)
    vec3.sub(b, p1, p3)
    let normal = vec3.create()
    return vec3.normalize(normal, vec3.cross(normal,a,b))
} 



class Cube extends GameObject {

    constructor () {
        super()

        const data = this.createGeomtry()
        let mesh = new Mesh(new DefaultMaterial(), data.vertices, data.normals, data.uvs, data.indices)
        this.mesh = mesh

        
    }

    onRender (gl) {

        this._components.forEach( i => i.onRender(gl))
        this._renderer.render(this)
    }

    //#region CreateGeometry
    createGeomtry () {

        let vertices = []
        let normals = []
        let uvs = []
        const s = 1
        
        let p1 = vec3.fromValues(-s, s, s)
        let p2 = vec3.fromValues(s, s, s)
        let p3 = vec3.fromValues(s, -s, s)
        let p4 = vec3.fromValues(-s, -s, s)
        
            
        // FRONT
        vertices.push(p1[0], p1[1], p1[2])
        vertices.push(p2[0], p2[1], p2[2])
        vertices.push(p3[0], p3[1], p3[2])
        vertices.push(p4[0], p4[1], p4[2])

        let u = 1 / 3
        uvs.push(0,0, u,0, u,1, 0,1)
        
        let normal = normalCalculation(p3,p2,p1)

        
        let xNormal = normal[0]
        let yNormal = normal[1]
        let zNormal = normal[2]

        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)

        // FRONT END

        // RIGHT
        let backMatrix = mat4.fromYRotation(mat4.create(), 90 * Math.PI / 180)

        let tempP = vec3.create()
        let temp1
        let temp2
        let temp3
        
        temp1 = vec3.clone(vec3.transformMat4(tempP, p1, backMatrix )) 
        vertices.push(tempP[0], tempP[1], tempP[2])
        
        temp2 = vec3.clone(vec3.transformMat4(tempP, p2, backMatrix ))
        vertices.push(tempP[0], tempP[1], tempP[2])

        temp3 = vec3.clone(vec3.transformMat4(tempP, p3, backMatrix ))
        vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p4, backMatrix )
        vertices.push(tempP[0], tempP[1], tempP[2])

        uvs.push(0,0, u,0, u,1, 0,1)

        normal = normalCalculation(temp3,temp2,temp1)
        xNormal = normal[0]
        yNormal = normal[1]
        zNormal = normal[2]

        
        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)


       // RIGHT END
        
        // BACK
        backMatrix = mat4.fromYRotation(backMatrix, 180 * Math.PI / 180)

        temp1 = vec3.clone(vec3.transformMat4(tempP, p1, backMatrix )) 
        vertices.push(tempP[0], tempP[1], tempP[2])
        
        temp2 = vec3.clone(vec3.transformMat4(tempP, p2, backMatrix ))
        vertices.push(tempP[0], tempP[1], tempP[2])

        temp3 = vec3.clone(vec3.transformMat4(tempP, p3, backMatrix ))
        vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p4, backMatrix )
        vertices.push(tempP[0], tempP[1], tempP[2])

        uvs.push(0,0, u,0, u,1, 0,1)

        normal = normalCalculation(temp3,temp2,temp1)
        xNormal = normal[0]
        yNormal = normal[1]
        zNormal = normal[2]

        
        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)

        // BACK END
        

        // LEFT
        backMatrix = mat4.fromYRotation(backMatrix, 270 * Math.PI / 180)

        temp1 = vec3.clone(vec3.transformMat4(tempP, p1, backMatrix )) 
        vertices.push(tempP[0], tempP[1], tempP[2])
        
        temp2 = vec3.clone(vec3.transformMat4(tempP, p2, backMatrix ))
        vertices.push(tempP[0], tempP[1], tempP[2])

        temp3 = vec3.clone(vec3.transformMat4(tempP, p3, backMatrix ))
        vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p4, backMatrix )
        vertices.push(tempP[0], tempP[1], tempP[2])

        uvs.push(0,0, u,0, u,1, 0,1)

        normal = normalCalculation(temp3,temp2,temp1)
        xNormal = normal[0]
        yNormal = normal[1]
        zNormal = normal[2]

        
        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)
        // LEFT END

       
        

        // TOP
        backMatrix = mat4.fromXRotation(backMatrix, -90 * Math.PI / 180)

       
        temp1 = vec3.clone(vec3.transformMat4(tempP, p1, backMatrix )) 
        vertices.push(tempP[0], tempP[1], tempP[2])
        
        temp2 = vec3.clone(vec3.transformMat4(tempP, p2, backMatrix ))
        vertices.push(tempP[0], tempP[1], tempP[2])

        temp3 = vec3.clone(vec3.transformMat4(tempP, p3, backMatrix ))
        vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p4, backMatrix )
        vertices.push(tempP[0], tempP[1], tempP[2])

        u = 1
        let us = (1 / 3) * 2 + 0.02
        
        uvs.push(us,0, u,0, u,1, us,1)

        
        normal = normalCalculation(temp3,temp2,temp1)
        xNormal = normal[0]
        yNormal = normal[1]
        zNormal = normal[2]

        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)

        backMatrix = mat4.fromXRotation(backMatrix, 90 * Math.PI / 180)

        temp1 = vec3.clone(vec3.transformMat4(tempP, p1, backMatrix ))
        vertices.push(tempP[0], tempP[1], tempP[2])

        temp2 = vec3.clone(vec3.transformMat4(tempP, p2, backMatrix ))
        vertices.push(tempP[0], tempP[1], tempP[2])

        temp3 = vec3.clone(vec3.transformMat4(tempP, p3, backMatrix ))
        vertices.push(tempP[0], tempP[1], tempP[2])

        vec3.transformMat4(tempP, p4, backMatrix )
        vertices.push(tempP[0], tempP[1], tempP[2])

        u = (1 / 3) * 2
        us = (1 / 3)
        uvs.push(us,0, u,0, u,1, us,1)


        normal = normalCalculation(temp3,temp2,temp1)
        xNormal = normal[0]
        yNormal = normal[1]
        zNormal = normal[2]


        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)
        normals.push(xNormal, yNormal, zNormal)


        let indices = [
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
        

        return {
            vertices,
            normals,
            uvs,
            indices
        }
    }
    //#endregion

}

export default Cube