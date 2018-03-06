import createID from '../utils/UniqueID'

export default class Material {

    constructor () {
        
        const _id = createID() 
        
        Object.defineProperty(this, 'id', {
            get () { return _id }
        } )


    }
}