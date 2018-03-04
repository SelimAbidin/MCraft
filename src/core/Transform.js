import {mat4, vec3, quat} from 'gl-matrix'

export default class Transform {

    constructor () {

        this.worldMatrix = mat4.create()
        this.worldInverseTranspose = mat4.create()
        this.needsToBeUpdate = true
        this.position = vec3.create();
        this.rotation = quat.create();
        this.scale = vec3.fromValues(1,1,1);
        this.parent = null
    }

    setEuler (x,y,z) {
        quat.fromEuler(this.rotation,x,y,z)
        this.needsToBeUpdate = true
    }

    setXYZ(x,y,z) {
        vec3.set(this.position,x,y,z)
        this.needsToBeUpdate = true
    }

    setScale(scale) {
        vec3.set(this.scale, scale, scale, scale)
        this.needsToBeUpdate = true
    }

    update () {

        this.needsToBeUpdate = true
        if(this.needsToBeUpdate) {

            // mat4.identity(this.worldMatrix)
            // mat4.fromRotationTranslationScale(this.worldMatrix, this.rotation, this.position, this.scale)
            //  mat4.fromRotationTranslation(this.worldMatrix, this.rotation, this.position)

            mat4.fromQuat(this.worldMatrix, this.rotation)
            mat4.translate(this.worldMatrix, this.worldMatrix, this.position)
            mat4.scale(this.worldMatrix, this.worldMatrix, this.scale)
            

            if(this.parent) {
                mat4.mul(this.worldMatrix, this.parent.worldMatrix, this.worldMatrix)
            }

            mat4.invert(this.worldInverseTranspose, this.worldMatrix)
            mat4.transpose(this.worldInverseTranspose, this.worldInverseTranspose)
            this.needsToBeUpdate = false
        }

    }
    
}