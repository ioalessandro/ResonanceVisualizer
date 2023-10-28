import * as dat from 'dat.gui'

let guiA = new dat.GUI();
let guiB = new dat.GUI();
const canvasSketch = require('canvas-sketch');
const { color } = require('canvas-sketch-util');


const settings = {
  dimensions: [ 2048, 2048 ],
  animate: false
};

const sketch = () => {
  return ({ context, width, height }) => {

    let waveA = {
      pos: height/2,
      freq: 0.01,
      amp: 600,
      phase: 0,
    }
    let waveB = {
      pos: height/2,
      freq: 0.02,
      amp: 600,
      phase: 0,
    }
    guiA.add(waveA, 'pos', 0, height)
    guiA.add(waveA, 'freq', -0.1, 0.1)
    guiA.add(waveA, 'amp', -800, 800)
    guiA.add(waveA, 'phase', -Math.PI, Math.PI)
    guiB.add(waveB, 'pos', 0, height)
    guiB.add(waveB, 'freq', -0.1, 0.1)
    guiB.add(waveB, 'amp', -800, 800)
    guiB.add(waveB, 'phase', -Math.PI, Math.PI)

    function animate() {
      requestAnimationFrame(animate)
      context.clearRect(0, 0, width, height);
      
      
      context.moveTo(width/2, height/2)
      context.beginPath();
      
      for(let i = 0; i < width; i++){
        let waveA_i = waveA.pos + Math.sin(i * waveA.freq + waveA.phase) * waveA.amp;
        let waveB_i = waveB.pos + Math.sin(i * waveB.freq + waveB.phase) * waveB.amp;
        context.lineTo(waveA_i, waveB_i)
      }
        context.stroke();
    }
    animate();

  };
};

canvasSketch(sketch, settings);