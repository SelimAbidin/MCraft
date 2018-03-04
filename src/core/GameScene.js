import Renderer from '../renderer/Renderer'
import Camera from '../display/Camera'
class GameScene {

    constructor (canvas) {
        
        this._canvas = canvas
        this._gl = canvas.getContext('webgl', {
            antialias : false
        })

        this._camera = new Camera()

        this.render = this.render.bind(this)
        this._children = []
        this.render() 
    }

    addChild(child) {

        let children = this._children

        if(children.indexOf(child) < 0) {
            children.push(child)    
        }
    }

    addToRender(element) {

        Renderer.render(element)
        element._children.forEach(element => {
            this.addToRender(element)
        });
        
    }
    
    render () {
        
        this._children.forEach(element => {
            element.update()
            
            this.addToRender(element)
        });

        Renderer.end(this._gl, this._camera.perspective)
        requestAnimationFrame(this.render)
    }
}

export {GameScene as default}