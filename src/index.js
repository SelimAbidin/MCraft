'use strict'

import GameScene from './core/GameScene.js'
import Terrain from './display/Terrain'
import Cube from './core/Cube'











setTimeout( function () {
    
    
let testX = 0
window.lpx = 1
window.lpy = 1



let contentDiv = document.getElementById('root')
let canvas = document.createElement('canvas')
canvas.style.width = '500px'
canvas.style.height = '500px'

canvas.width = 500 / 1
canvas.height = 500 / 1
contentDiv.appendChild(canvas)

let gameScene = new GameScene(canvas)

new Terrain(gameScene)


setInterval( () => {
    testX += 0.01
    let z = Math.sin(testX) * 100
    gameScene.camera.transform.setXYZ(0, 0, z)
    gameScene.camera.transform.setEuler(10,0,0)
    gameScene.camera.transform.name = "camera"

}, 1000 / 30)



}, 100)



// canvas.addEventListener('mousemove',  (evt) => {
//     let hw = (canvas.width / 2);
//     let hh = (canvas.width / 2);
//     window.lpx = (evt.clientX - hw) / hw;
//     window.lpy = (hh - evt.clientY) / hh
//     console.log(lpy);
//     window.lpx = 1
//     window.lpy = 1
// });


// setInterval(() => {
//     testX +=0.001;
//     cube.transform.setEuler(180 * Math.sin(testX),180 * Math.cos(testX),0)
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