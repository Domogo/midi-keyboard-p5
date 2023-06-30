import p5 from "p5";

const NUM_OF_KEYS = 48;
const NUM_ROWS = 8;

const KEY_PRESSED = 148;
const KEY_RELEASED = 132;

const sketch = (p) => {
  // keyPressed[note] = {
  //   command,
  //   timestamp,
  //   note,
  //   velocity,
  //   mapping,
  //   note
  // }
  const keyPressed = {};
  const ellipses = [];

  const mapKey = (key) => {
    const mapping = p.map(key, 36, 84, 1, NUM_OF_KEYS);
    return Math.round(mapping);
  };

  const mapVelocity = (velocity) => {
    const mapping = p.map(velocity, 0, 127, 0, 255);
    return Math.round(mapping);
  };

  const mapCommand = (command) => {
    switch (command) {
      case KEY_PRESSED:
        return "noteOn";
      case KEY_RELEASED:
        return "noteOff";
      default:
        return "unknown";
    }
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);

    let id = 1;
    for (let i = 1; i <= NUM_ROWS; i++) {
      for (let j = 1; j <= NUM_OF_KEYS / NUM_ROWS; j++) {
        ellipses.push({
          id: id++,
          x: i * 110,
          y: j * 110,
          width: 100,
          height: 100,
          fill: 255,
        });
      }
    }
  };

  p.draw = () => {
    p.background("#131313");

    p.noStroke();

    for (let i = 0; i < ellipses.length; i++) {
      p.colorMode(p.HSB);
      p.fill(ellipses[i].fill, ellipses[i].fill, 100);
      p.ellipse(
        ellipses[i].y,
        ellipses[i].x,
        ellipses[i].width,
        ellipses[i].height
      );

      if (keyPressed[ellipses[i].id]) {
        const { mappedVelocity, mappedCommand } = keyPressed[ellipses[i].id];
        console.log(ellipses[i].id);
        console.log(mappedVelocity);
        ellipses[i].fill = mappedVelocity;
      }
    }
  };

  window.addEventListener("midi-key-pressed", (input) => {
    const { command, timestamp, note, velocity } = input.detail;
    const ellipseId = mapKey(note);
    const mappedVelocity = mapVelocity(velocity);
    const mappedCommand = mapCommand(command);

    console.log(ellipseId);
    keyPressed[ellipseId] = {
      command,
      timestamp,
      note,
      velocity,
      ellipseId,
      mappedVelocity,
      mappedCommand,
    };
  });
};

new p5(sketch);
