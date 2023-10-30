import * as dat from 'dat.gui'


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

    let subwaveA = {
      pos: 0,
      freq: 0.01,
      amp: 100,
      phase: 0,
    }
    let subwaveB = {
      pos: 0,
      freq: 0.02,
      amp: 100,
      phase: 0,
    }

    // #region GUI

    let gui = new dat.GUI();
    const guiA = gui.addFolder('waveA')
    const guiB = gui.addFolder('waveB')
    const subguiA = guiA.addFolder('subwaveA')
    const subguiB = guiB.addFolder('subwaveB')
    
    guiA.add(waveA, 'pos', 0, height)
    guiA.add(waveA, 'freq', -0.1, 0.1)
    guiA.add(waveA, 'amp', -800, 800)
    guiA.add(waveA, 'phase', -Math.PI, Math.PI)
    subguiA.add(subwaveA, 'pos', 0, height)
    subguiA.add(subwaveA, 'freq', -5, 5)
    subguiA.add(subwaveA, 'amp', -800, 800)
    subguiA.add(subwaveA, 'phase', -Math.PI, Math.PI)

    guiB.add(waveB, 'pos', 0, height)
    guiB.add(waveB, 'freq', -0.1, 0.1)
    guiB.add(waveB, 'amp', -800, 800)
    guiB.add(waveB, 'phase', -Math.PI, Math.PI)
    subguiB.add(subwaveB, 'pos', 0, height)
    subguiB.add(subwaveB, 'freq', -5, 5)
    subguiB.add(subwaveB, 'amp', -800, 800)
    subguiB.add(subwaveB, 'phase', -Math.PI, Math.PI)
    // #endregion

    function animate() {
      requestAnimationFrame(animate)
      context.clearRect(0, 0, width, height);
      
      
      context.moveTo(width/2, height/2)
      context.beginPath();
      
      for(let i = 0; i < width; i=i+0.1){
        let waveA_i = waveA.pos + Math.sin(i * waveA.freq + waveA.phase) * waveA.amp;
        let waveB_i = waveB.pos + Math.sin(i * waveB.freq + waveB.phase) * waveB.amp;
        let subwaveA_i = subwaveA.pos + Math.sin(i * subwaveA.freq + subwaveA.phase) * subwaveA.amp;
        let subwaveB_i = subwaveB.pos + Math.sin(i * subwaveB.freq + subwaveB.phase) * subwaveB.amp;

        context.lineTo(waveA_i+subwaveA_i, waveB_i+subwaveB_i)
      }
        context.stroke();
    }
    animate();

  };
};

canvasSketch(sketch, settings);