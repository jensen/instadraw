import { installGlobals } from "@remix-run/node";
import React from "react";
import PIXI from "pixi.js-legacy";

installGlobals();

global.React = React;
global.PIXI = PIXI;
