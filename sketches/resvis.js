import * as dat from 'dat.gui'

const canvasSketch = require('canvas-sketch');
const { color } = require('canvas-sketch-util');
const canvasHeight = 2000;
const aspectRatio = 16/9; 

const settings = {
  dimensions: [ canvasHeight, canvasHeight/aspectRatio ],
  animate: false
};

const sketch = () => {
  return ({ context, width, height }) => {

// #region GUI PROPERTIES
    let finalWaveA = {
      pos: height/2,
      freq: 0.01,
      amp: 600,
      phase: 0,
    }
    let finalWaveB = {
      pos: height/2,
      freq: 0.01,
      amp: 600,
      phase: 1,
    }
    let finalSubwaveA = {
      pos: 0,
      freq: 0.01,
      amp: 600,
      phase: 1,
    }
    let finalSubwaveB= {
      pos: 0,
      freq: 0.01,
      amp: 600,
      phase: 1,
    }

    let waveA = {
      pos: height/2,
      freq: 0.01,
      amp: 600,
      phase: 1,
    }
    let waveB = {
      pos: height/2,
      freq: 0.02,
      amp: 600,
      phase: 1,
    }

    let subwaveA = {
      pos: height/2,
      freq: 0.02,
      amp: 100,
      phase: 1,
    }
    let subwaveB = {
      pos: height/2,
      freq: 0.02,
      amp: 100,
      phase: 1,
    }

    let isHarmonic = {
      value: true
    }

    let resonance = {
      value: 1
    }
    let thickness = {
      value: 1
    }
    let density = {
      value: 1
    }
    let xRotation = {
      value: 1
    }
    let yRotation = {
      value: 1
    }


    // # regionend

 

    // #region GUI MAIN

    let gui = new dat.GUI();
    const guiFine = gui.addFolder('Fine Control')
    const guiA = guiFine.addFolder('waveA')
    const guiB = guiFine.addFolder('waveB')
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

    const guiRes = gui.addFolder('Resonance Control')
    guiRes.add(isHarmonic, 'value', true).name('Harmonic')
    guiRes.add(resonance, 'value', -1,2).name('Resonance')
    guiRes.add(thickness, 'value', -1,2).name('Thickness')
    guiRes.add(xRotation, 'value', -1,2).name('X Rotation')
    guiRes.add(yRotation, 'value', -1,2).name('Y Rotation')
2   // #endregion

       

    function animate() {

      // #region PARAMETER CALCULATION
      finalWaveA.freq = waveA.freq * resonance.value
      finalWaveA.amp = waveA.amp
      finalWaveA.phase = waveA.phase * xRotation.value
      finalSubwaveA.freq = subwaveA.freq  * resonance.value
      finalSubwaveA.amp = subwaveA.amp * thickness.value
      finalSubwaveA.phase = subwaveA.phase
      finalWaveB.freq = waveB.freq  //* resonance.value
      finalWaveB.amp = waveB.amp
      finalWaveB.phase = waveB.phase * yRotation.value
      finalSubwaveB.freq = subwaveB.freq  * resonance.value
      finalSubwaveB.amp = subwaveB.amp   * thickness.value
      finalSubwaveB.phase = subwaveB.phase
      // #endregion

      requestAnimationFrame(animate)
      context.clearRect(0, 0, width, height);
      
      
      context.moveTo(width/2, height/2)
      context.beginPath();
      
      for(let i = 0; i < width; i=i+0.1){
        let waveA_i = finalWaveA.pos + Math.sin(i * finalWaveA.freq + finalWaveA.phase) * finalWaveA.amp;
        let waveB_i = finalWaveB.pos + Math.sin(i * finalWaveB.freq + finalWaveB.phase) * finalWaveB.amp;
        let subwaveA_i = finalSubwaveA.pos + Math.sin(i * finalSubwaveA.freq + finalSubwaveA.phase) * finalSubwaveA.amp;
        let subwaveB_i = finalSubwaveB.pos + Math.sin(i * finalSubwaveB.freq + finalSubwaveB.phase) * finalSubwaveB.amp;

        context.lineTo(waveA_i+subwaveA_i, waveB_i+subwaveB_i)
      }
        context.stroke();
    }
    animate();

  };
};

canvasSketch(sketch, settings);