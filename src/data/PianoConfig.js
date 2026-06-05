// piano layout configuration
export const PianoConfig = {

    keyCount: 24,

    keyWidth: 40,
    keyHeight: 60,

    pianoX: 100,
    pianoY: 600,

	dinoUpperYOffset: 100,

    pianoWidth: 905,
    pianoHeight: -140,

    pianoScale: 0.7,

	get leftmostDinoX() { return PianoConfig.pianoX / PianoConfig.pianoScale; },
	get rightmostDinoX() { return PianoConfig.pianoWidth - PianoConfig.pianoX / PianoConfig.pianoScale; },
	highestDinoY: -100,

    pressThreshold: 30
};

/*
should:
-store key positions
-store note names
-store sound mapping
-allow pianomanager to build
*/
