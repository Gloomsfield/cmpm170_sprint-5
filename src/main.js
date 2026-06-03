import { Initialize } from "@scenes/Initialize.js";
import { LoadAssets } from "@scenes/LoadAssets.js";
import { MainMenu } from "@scenes/MainMenu.js";
import { Game } from "@scenes/Game.js";
import { End } from "@scenes/End.js";

'use strict';

const urlQueryParams = new URLSearchParams(window.location.search);

const phaserConfig = {
	type: Phaser.WEBGL,
	parent: "phaserCanvas",
	width: 1080,
	height: 650,
	scale: { autoCenter: Phaser.Scale.CENTER_BOTH, },
	backgroundColor: "#7db1c7",
	scene: [ new Initialize(urlQueryParams.get("startScene")), LoadAssets, MainMenu, Game, End, ],
};

export const game = new Phaser.Game(phaserConfig);

