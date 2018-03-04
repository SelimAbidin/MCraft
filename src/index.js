'use strict'

// import Scene from './display/Scene.js'
import GameScene from './core/GameScene.js'
import Cube from './core/Cube'

let contentDiv = document.getElementById('root')
let canvas = document.createElement('canvas')
canvas.style.width = '500px'
canvas.style.height = '500px'

canvas.width = 500 / 1
canvas.height = 500 / 1
contentDiv.appendChild(canvas)

let gameScene = new GameScene(canvas)
let cube = new Cube()
gameScene.addChild(cube)


cube.transform.setEuler(45,45,0)
let testX = 0

window.lpx = 0
window.lpy = 0

canvas.addEventListener('mousemove',  (evt) => {
            
    let hw = (canvas.width / 2);
    let hh = (canvas.width / 2);

    window.lpx = (evt.clientX - hw) / hw;
    window.lpy = (hh - evt.clientY) / hh


});


// setInterval(() => {

//     testX +=0.01;
//     //cube.transform.setXYZ(10 * Math.sin(testX),0,0)
//     cube.transform.setEuler(90 * Math.sin(testX),0,0)

// }, 60 / 1000)


/*
let scene = new Scene(canvas)

const render = () => {
    scene.render()
    requestAnimationFrame(render)
}
*/

// setInterval(render, 10 / 1000)
// render()