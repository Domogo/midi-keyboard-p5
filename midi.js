if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
}

function onMIDIFailure() {
  console.log("Could not access your MIDI devices.");
}

function onMIDISuccess(midiAccess) {
  midiAccess.addEventListener("statechange", updateDevices);

  const inputs = midiAccess.inputs;

  inputs.forEach((input) => {
    input.addEventListener("midimessage", handleInput);
  });
}

function updateDevices(event) {
  console.log(`Name: ${event.port.name}`);
  console.log(`State: ${event.port.state}`);
  console.log(`Type: ${event.port.type}`);
  // console.log(event);
}

// input.data is an array of 3 numbers
// data[0] = command
// data[1] = midi number https://www.inspiredacoustics.com/en/MIDI_note_numbers_and_center_frequencies
// data[2] = velocity
function handleInput(input) {
  const command = input.data[0];
  const note = input.data[1];
  const velocity = input.data[2];
  const timestamp = input.timeStamp;
  // console.log(input);
  // console.log(command, note, velocity);

  dispatchEvent(
    new CustomEvent("midi-key-pressed", {
      detail: { command, note, velocity, timestamp },
    })
  );
}
