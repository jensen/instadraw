import { installGlobals } from "@remix-run/node";
import React from "react";

installGlobals();

global.React = React;
