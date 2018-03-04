import Entity from './Entity'
import Transform from './Transform'

export default class GameObject extends Entity {

    constructor() {
        super();
        this._children = []
        this.transform = new Transform()
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

        this.transform.update()
        
        this.transform.name = this.name
        this._children.forEach(child => {
            child.update()
        });
    }

    render () {
        super.render()
    }
}

