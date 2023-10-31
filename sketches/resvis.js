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
      pos: 0,
      freq: 0.01,
      amp: 600,
      phase: 0,
    }
    let finalWaveB = {
      pos: 0,
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
      pos: width/2,
      freq: 0.01,
      amp: 400,
      phase: 1,
    }

    let waveB = {
      pos: height/2,
      freq: 0.02,
      amp: 400,
      phase: 1,
    }

    let subwaveA = {
      pos: 0,
      freq: 0.1,
      amp: 100,
      phase: 1,
    }
    let subwaveB = {
      pos: 0,
      freq: 0.1,
      amp: 100,
      phase: 1,
    }

    let isHarmonic = {
      value: true
    }

    let length = {
      value: 1
    }
    let thickness = {
      value: 1
    }
    let density = {
      value: 0
    }
    let xRotation = {
      value: 1
    }
    let yRotation = {
      value: 1
    }
    let tubeRotation = {
      value: 1
    }
    let xPosition = {
      value: 1
    }
    let yPosition = {
      value: 1
    }
    let scale = {
      value: 1
    }

    let lineColor = {
      value: "#E75932"
    }

    let bgColor = {
      value: "#242525"
    }
    

    let lineWidth = {
     value: 4
    }
    // #endregion

 

    // #region GUI MAIN
    let gui = new dat.GUI();
    const guiFine = gui.addFolder('Kleinteilig')
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

    const guiRes = gui.addFolder('Resonance')
    guiRes.add(isHarmonic, 'value', true).name('Harmonic')
    guiRes.add(length, 'value', -1,2).name('Length')
    guiRes.add(thickness, 'value', 0,2).name('Thickness')
    guiRes.add(density, 'value', 0,32).name('Density')

    guiRes.add(tubeRotation, 'value', -1,2).name('Tube Rotation')

    const guiPos = gui.addFolder('Position & Scale')
    guiPos.add(xPosition, 'value', -1,2).name('X Position')
    guiPos.add(yPosition, 'value', -1,2).name('Y Position')
    guiPos.add(xRotation, 'value', -1,2).name('X Rotation')
    guiPos.add(yRotation, 'value', -1,2).name('Y Rotation')
    guiPos.add(scale, 'value', -5,5).name('Scale')

    const guiStyle = gui.addFolder('Style')
    guiStyle.add(lineWidth, 'value', 1, 200).name('Linewidth')
    guiStyle.add(lineColor, 'value').name('Line Color')
    guiStyle.add(bgColor, 'value').name('BG Color')
2   // #endregion

       

    function animate() {

      // #region PARAMETER CALCULATION
      finalWaveA.pos = waveA.pos * xPosition.value
      finalWaveA.freq = waveA.freq * length.value
      finalWaveA.amp = waveA.amp * scale.value
      finalWaveA.phase = waveA.phase * xRotation.value
      finalSubwaveA.freq = subwaveA.freq * density.value
      finalSubwaveA.amp = subwaveA.amp * thickness.value
      finalSubwaveA.phase = subwaveA.phase *tubeRotation.value

      finalWaveB.pos = waveB.pos * yPosition.value
      finalWaveB.freq = waveB.freq * length.value
      finalWaveB.amp = waveB.amp * scale.value
      finalWaveB.phase = waveB.phase * yRotation.value
      finalSubwaveB.freq = subwaveB.freq * density.value
      finalSubwaveB.amp = subwaveB.amp * thickness.value
      finalSubwaveB.phase = subwaveB.phase

      requestAnimationFrame(animate)
      context.clearRect(0, 0, width, height);
      
      context.fillStyle = bgColor.value;
      context.fillRect(0, 0, width, height);
      context.strokeStyle = lineColor.value;
      context.lineWidth = lineWidth.value;


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