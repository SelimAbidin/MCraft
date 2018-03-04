import Entity from './Entity'
import Transform from './Transform'

export default class GameObject extends Entity {

    constructor() {
        super();
        this.transform = new Transform()
    }

    update () {
        this.transform.update()
    }

    render () {
        super.render()
    }
}

