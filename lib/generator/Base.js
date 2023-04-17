// ⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈⧈
//▮ZIM BOT INC 2023 ®️ALL RIGHTS RESERVED
//▮
//▮FORK AND DON'T FORGET TO GIVE A STAR
//▮
//▮THIS SOFTWARE IS UNDER ZIMBOT COPYRIGHT
//▮
//▮REPORT ABUSE OF THIS SOFTWARE EMAIL US
//▮EMAIL: reinhardtuna@gmail.com / support@zimbot.me
//▮WHATSAPP US : +263 77 655 8634
//▮YOUTUBE CHANNELL: https://youtube.com/@zim-bot
//▮
//╰▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
//
//┏━━━━━━━━━━━━━━━━━━━━━━━━━
//┃THIS SOFTWARE INCLUDES 
//┃ENCRYPTED FILES
//┃
//┃THANKS FOR CHOOSING ZIMBOT
//┃Ooh Dad It's me
//┗━━━━━━━━━━━━━━━━━━━━━━━━━
//
/*
#    Licensed under the Apache License, Version 2.0 (the "License"); you may
#    not use this file except in compliance with the License. You may obtain
#    a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
#    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
#    License for the specific language governing permissions and limitations
#    under the License.
*/



const Canvas = require('canvas')
const staticFolder = 'media/fonts'
Canvas.registerFont(`${staticFolder}/qetonyflores.ttf`, { family: 'default' })
Canvas.registerFont(`${staticFolder}/ArchitectsDaughter.ttf`, { family: 'arch' })
Canvas.registerFont(`${staticFolder}/SmallMemory.ttf`, { family: 'sm' })

// abstract class
class BaseGenerator {

  constructor(w, h) {
    // base canvas
    this._canvas = Canvas.createCanvas(w, h);

    /**
     * @type {Buffer[]} Buffer
     */
    this.buffers = [];

    // paper image path
    this._imagePath = null;
  }

  async loadImage() {
    const canvas = this._canvas;
    const ctx = canvas.getContext('2d');
    const img = await Canvas.loadImage(this.image);
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, canvas.width, canvas.height);
  }

  set image(val) {
    if (val.startsWith('.')) { // relative path
      this._imagePath = val;
    } else if (val.match(/^(\/|[a-zA-Z]:)/)) { // absolute path
      this._imagePath = val;
    } else { // default path
      this._imagePath = `media/image/${val}.jpg`;
    }
  }

  get image() {
    return this._imagePath;
  }

  /**
   * Convert text to array that limited to n pixel
   * @param {String} text text to convert to list row text
   * @param {Number} maxTextWidth maximum text width in pixel
   * @returns {String[]}
   */
  toRowText(text, maxTextWidth) {
    let textPointer = 0;
    let charLen = 40;
    const strList = [];
    let enough = false;

    // split and limit text to row length which is maxTextWidth pixel
    while (textPointer <= text.length) {
      const ctx = this._canvas.getContext('2d');
      ctx.font = `${this.fontSize} ${this.fontFamily}`;
      const subText = text.substring(textPointer, textPointer + charLen);
      const measurement = ctx.measureText(subText);
      if (measurement.width < maxTextWidth && textPointer + charLen <= text.length && !enough) {
        const nextSpace = text.indexOf(' ', textPointer + charLen + 1);
        const relativeToCharLen = nextSpace - textPointer - charLen + 1; // add 1 so the space is in the end of text instead of start
        if (nextSpace === -1) {
          charLen += 2;
          continue;
        } else if (ctx.measureText(text.substring(textPointer, textPointer + charLen + relativeToCharLen)).width > maxTextWidth) {
          enough = true;
          continue;
        }
        charLen += relativeToCharLen;
        continue;
      }
      strList.push(subText);
      textPointer += charLen;
      charLen = 40;
      enough = false;
    }
    const splittedNewLine = [];
    for (const str of strList) {
      splittedNewLine.push(...str.split('\n'));
    }
    return splittedNewLine;
  }

}

module.exports = BaseGenerator;
