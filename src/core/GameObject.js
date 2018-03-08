import Entity from './Entity'
import Transform from './Transform'

export default class GameObject extends Entity {

    constructor() {
        super();
        this._children = []
        this.transform = new Transform()
        this.isStatic = false
        this.mesh = null
    }

    addChild(child) {
        if(this._children.indexOf(child) === -1){
            this._children.push(child)
            child.transform.parent = this.transform 
        }
    }

    removeChild(child) {
        const index = this._children.indexOf(child)
        if(index !== -1) {
            this._children.splice(index, 1)
        }
    }

    update () {

        let willBeUpdated = this.transform.needsToBeUpdate
        this.transform.update()

        if(willBeUpdated) {
            
            if(this.isStatic) {
                this.mesh.transformVertices(this.transform.worldMatrix)
            }
        }

        this.transform.name = this.name
        this._children.forEach(child => {
            child.transform.willBeUpdated = willBeUpdated
            child.update()
        });
    }

    render (gl, camera) {
        this.mesh.render(gl, camera, this.transform)
    }
}

