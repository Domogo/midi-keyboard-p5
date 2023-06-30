import p5 from "p5";

const NUM_OF_KEYS = 48;

const COLOR_CHANGE_SPEED = 2;

const KEY_PRESSED = 148;
const KEY_RELEASED = 132;

const INCREASE_SIZE = 1;
const DECREASE_SIZE = 2;

const CHANGE_COLOR_RED = 3;
const CHANGE_COLOR_GREEN = 4;
const CHANGE_COLOR_BLUE = 5;

const CHANGE_RADIUS_TOP_LEFT = 6;
const CHANGE_RADIUS_TOP_RIGHT = 7;

const sketch = (p) => {
  let size = 300;
  let newSize = 300;

  let radiusTL = 0;
  let newRadiusTL = 0;

  let radiusTR = 0;
  let newRadiusTR = 0;

  let red = 0;
  let newRed = 0;

  let green = 0;
  let newGreen = 0;

  let blue = 0;
  let newBlue = 0;

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

  const changeSize = () => {
    if (size === newSize) return;

    if (newSize >= size) {
      size += 5;
    }

    if (newSize <= size) {
      size -= 5;
    }
  };

  const changeRadiusTL = () => {
    if (newRadiusTL >= radiusTL) {
      radiusTL += 5;
    }

    if (newRadiusTL < radiusTL) {
      radiusTL -= 5;
    }
  };

  const changeRadiusTR = () => {
    if (newRadiusTR >= radiusTR) {
      radiusTR += 5;
    }

    if (newRadiusTR < radiusTR) {
      radiusTR -= 5;
    }
  };

  const changeRed = () => {
    if (newRed >= red) {
      red += COLOR_CHANGE_SPEED;
    }

    if (newRed <= red) {
      red -= COLOR_CHANGE_SPEED;
    }
  };

  const changeGreen = () => {
    if (newGreen >= green) {
      green += COLOR_CHANGE_SPEED;
    }

    if (newGreen <= green) {
      green -= COLOR_CHANGE_SPEED;
    }
  };

  const changeBlue = () => {
    if (newBlue >= blue) {
      blue += COLOR_CHANGE_SPEED;
    }

    if (newBlue <= blue) {
      blue -= COLOR_CHANGE_SPEED;
    }
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
  };

  p.draw = () => {
    p.background("#131313");
    p.noStroke();

    changeSize();
    changeRadiusTL();
    changeRadiusTR();

    changeRed();
    changeGreen();
    changeBlue();

    p.fill(red, green, blue);
    p.rectMode(p.CENTER);
    p.square(300, 300, size, radiusTL, radiusTR, 0, 0);
  };

  window.addEventListener("midi-key-pressed", (input) => {
    const { command, timestamp, note, velocity } = input.detail;
    const mappedKey = mapKey(note);
    const mappedVelocity = mapVelocity(velocity);
    const mappedCommand = mapCommand(command);

    if (mappedKey === INCREASE_SIZE && mappedCommand === "noteOn") {
      if (newSize + velocity > 500) {
        newSize = 500;
      } else {
        newSize += velocity;
      }
    }
    if (mappedKey === DECREASE_SIZE && mappedCommand === "noteOn") {
      if (newSize - velocity < 100) {
        newSize = 100;
      } else {
        newSize -= velocity;
      }
    }

    if (mappedKey === CHANGE_COLOR_RED && mappedCommand === "noteOn") {
      if (newRed + mappedVelocity > 255) {
        newRed = 255;
      } else {
        newRed += mappedVelocity;
      }
    }

    if (mappedKey === CHANGE_COLOR_RED && mappedCommand === "noteOff") {
      if (newRed - mappedVelocity < 0) {
        newRed = 0;
      } else {
        newRed -= mappedVelocity;
      }
    }

    if (mappedKey === CHANGE_COLOR_GREEN && mappedCommand === "noteOn") {
      if (newGreen + mappedVelocity > 255) {
        newGreen = 255;
      } else {
        newGreen += mappedVelocity;
      }
    }

    if (mappedKey === CHANGE_COLOR_GREEN && mappedCommand === "noteOff") {
      if (newGreen - mappedVelocity < 0) {
        newGreen = 0;
      } else {
        newGreen -= mappedVelocity;
      }
    }

    if (mappedKey === CHANGE_COLOR_BLUE && mappedCommand === "noteOn") {
      if (newBlue + mappedVelocity > 255) {
        newBlue = 255;
      } else {
        newBlue += mappedVelocity;
      }
    }

    if (mappedKey === CHANGE_COLOR_BLUE && mappedCommand === "noteOff") {
      if (newBlue - mappedVelocity < 0) {
        newBlue = 0;
      } else {
        newBlue -= mappedVelocity;
      }
    }

    if (mappedKey === CHANGE_RADIUS_TOP_LEFT && mappedCommand === "noteOn") {
      newRadiusTL += mappedVelocity;
    }

    if (mappedKey === CHANGE_RADIUS_TOP_LEFT && mappedCommand === "noteOff") {
      if (newRadiusTL - mappedVelocity < 0) {
        newRadiusTL = 0;
      } else {
        newRadiusTL -= mappedVelocity;
      }
    }

    if (mappedKey === CHANGE_RADIUS_TOP_RIGHT && mappedCommand === "noteOn") {
      newRadiusTR += mappedVelocity;
    }

    if (mappedKey === CHANGE_RADIUS_TOP_RIGHT && mappedCommand === "noteOff") {
      if (newRadiusTR - mappedVelocity < 0) {
        newRadiusTR = 0;
      } else {
        newRadiusTR -= mappedVelocity;
      }
    }
  });
};

new p5(sketch);