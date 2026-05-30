import { Initialize } from "@scenes/Initialize.js";
import { LoadAssets } from "@scenes/LoadAssets.js";
import { MainMenu } from "@scenes/MainMenu.js";

'use strict';

const urlQueryParams = new URLSearchParams(window.location.search);

const phaserConfig = {
	type: Phaser.WEBGL,
	parent: "phaserCanvas",
	width: 512,
	height: 384,
	scale: { autoCenter: Phaser.Scale.CENTER_BOTH, },
	backgroundColor: "#7db1c7",
	scene: [ new Initialize(urlQueryParams.get("startScene")), LoadAssets, MainMenu ],
};

export const game = new Phaser.Game(phaserConfig);

