'use strict'

import Scene from './display/Scene.js'

let contentDiv = document.getElementById('root')
let canvas = document.createElement('canvas')
canvas.style.width = '500px'
canvas.style.height = '500px'

canvas.width = 500 / 1
canvas.height = 500 / 1
contentDiv.appendChild(canvas)

let scene = new Scene(canvas)

const render = () => {
    scene.render()
    requestAnimationFrame(render)
}

// setInterval(render, 10 / 1000)
render()