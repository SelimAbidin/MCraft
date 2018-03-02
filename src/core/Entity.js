

export default class Entity {
    
    constructor () {
        this._components = []
    }

    addComponent (component) {
        this._components.push(component)
    }

    removeComponent (component) {
     
        let components = this._components
        let index = components.indexOf(component)
        
        if(index < 0) return undefined 
        return components.splice(index, 1)
    }
    
    update () {

        let components = this._components
        components.forEach( (item) => {

            console.log(item);
            
        })
    }

}