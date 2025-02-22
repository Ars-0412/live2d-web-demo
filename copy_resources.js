/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

"use strict";
const fs = require('fs');
const path = require('path');

const publicResources = [
  {src: path.join(__dirname, 'Core'), dst: path.join(__dirname, 'public/Core')},
  {src: path.join(__dirname, 'Resources'), dst: path.join(__dirname, 'public/Resources')},
];

publicResources.forEach((e)=>{if (fs.existsSync(e.dst)) fs.rmSync(e.dst, { recursive: true })});
publicResources.forEach((e)=>fs.cpSync(e.src, e.dst, {recursive: true}));
