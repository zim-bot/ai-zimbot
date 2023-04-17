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





const BaseGenerator = require("./Base");
const Canvas = require('canvas');

const fontConfig = {
  default: {
    fontSize: 28,
  },
  arch: {
    fontSize: 24,
  },
  sm: {
    fontSize: 26
  }
};

class BigBossGenerator extends BaseGenerator {
  /**
   * constructor
   * @param {import("../structure/Telegraf").UserCache} userCache user cached config
   */
  constructor(userCache) {
    super(1440, 1080);
    this.fontFamily = userCache.font in fontConfig ? userCache.font : 'default';
    this.color = userCache.color || 'black';
    this.fontSize = userCache.size || 28;
  }

  /**
   * write a text in upper section of a big boss book
   * Syntax:
   * Date: "Text in Date section"
   * No: "Text in No section"
   * Header: "Text in empty upper section
   * You can use new line in header but not in others"
   * endSyntax
   * (The order is doesn't matter)
   * @param {string} text
   * @returns {string}
   */
  _writeHeader(text) {
    const headerAxes = [40, 80];
    const noAxes = [522, 70];
    const dateAxes = [534, 94];
    const noRegex = /^No:\s*['"]([\w\s\d-_'"?/\\|!@#$%^&*()=+{};[\]<>,.]+)['"]$/m;
    const dateRegex = /^Date:\s*['"]([\w\s\d-_'"?/\\|!@#$%^&*()=+{};[\]<>,.]+)['"]$/m;
    const headerRegex = /^Header:\s*['"]([\w\s\d-_'"?/\\|!@#$%^&*()=+{};[\]<>,.]+)['"]$/m;
    const no = text.match(noRegex);
    const date = text.match(dateRegex);
    const header = text.match(headerRegex);

    const ctx = this._canvas.getContext('2d');
    ctx.font = `${this.fontSize - 4}px ${this.fontFamily}`;
    ctx.fillStyle = this.color;

    if (no) ctx.fillText(no[1], ...noAxes);
    if (date) ctx.fillText(date[1], ...dateAxes);
    if (header) ctx.fillText(header[1], ...headerAxes);

    return text.replace(/^(No|Date|Header):\s*['"]([\w\s\d-_'"?/\\|!@#$%^&*()=+{};[\]<>,.]+)['"]$\n/gm, '');
  }

  /**
   * write a text in the left side box of the book
   * Syntax:
   * [text,n]text is anything and n is the index of the box
   * from top left to bottom right
   * [1A,10]if the output is more than one image, n can be 1 to 61
   * [2A, 79]or continue the index from the last page
   * endSyntax
   * @param {string} text
   * @param {import('canvas').CanvasRenderingContext2D} ctx
   * @returns {string}
   */
  _writeBoxColumn(text, ctx) {
    const leftColAxes = [72, 147];
    const rightColAxes = [762, 136];

    const leftDescent = [0.2, 27.5];
    const rightDescent = [0.17, 27.5];

    const rowSize = 31;

    ctx.font = `${this.fontSize - 4}px ${this.fontFamily}`;
    const boxSyntaxRegex = /^\[([\w\s]+),(\d+)\]/gm;

    const matchedLines = [...text.matchAll(boxSyntaxRegex)];
    for (let i = 0; i < matchedLines.length; i++) {
      const elem = matchedLines[i];
      const strToWrite = elem[1];
      const colNumber = (parseInt(elem[2]) - 1) % 62;

      if (colNumber < rowSize) {
        const coordinate = [leftColAxes[0] + leftDescent[0] * colNumber, leftColAxes[1] + leftDescent[1] * colNumber];
        ctx.fillText(strToWrite, ...coordinate);
      } else if (colNumber <= rowSize * 2) {
        const coordinate = [rightColAxes[0] + rightDescent[0] * (colNumber % rowSize), rightColAxes[1] + rightDescent[1] * (colNumber % rowSize)];
        ctx.fillText(strToWrite, ...coordinate);
      }

    }

    return text.replace(boxSyntaxRegex, '');
  }

  async write(text) {
    const updatedtext = this._writeHeader(text);
    const strList = this.toRowText(updatedtext, 571);
    const rowSize = 31;
    const leftPagePoint = [124, 148];
    const rightPagePoint = [816, 136];

    // start drawing text row by row
    let currentCoordinate = [...leftPagePoint];
    for (let i = 0; i < strList.length; i++) {
      const currentRow = i % (rowSize * 2); // zero indexed
      let currText = strList[i];
      if (i !== 0 && currentRow === 0) { // next image
        this.buffers.push(this._canvas.toBuffer());
        this._canvas = Canvas.createCanvas(1440, 1080);
        await this.loadImage();
        currentCoordinate = [...leftPagePoint]; // [x, y] value
      }
      const ctx = this._canvas.getContext('2d');
      ctx.font = `${this.fontSize}px ${this.fontFamily}`;
      ctx.fillStyle = `${this.color}`;

      currText = this._writeBoxColumn(currText, ctx);

      if (currentRow < rowSize) {// left page
        // rotate n radian (radian = degree * PI / 180)
        ctx.translate(...currentCoordinate);
        if (currentRow < rowSize / 2) {
          ctx.rotate(-0.5 * Math.PI / 180);
        } else {
          ctx.rotate(-0.18 * Math.PI / 180);
        }
        ctx.translate(-currentCoordinate[0], -currentCoordinate[1]);
        ctx.fillText(currText, ...currentCoordinate, 572);

        currentCoordinate[0] += 0.2;
        currentCoordinate[1] += 27.5;
      } else { // right page
        if (currentRow === rowSize) currentCoordinate = [...rightPagePoint];
        ctx.translate(...currentCoordinate);
        if (currentRow < rowSize / 2) ctx.rotate(0.2 * Math.PI / 180);
        ctx.rotate(0.2 * Math.PI / 180);
        ctx.translate(-currentCoordinate[0], -currentCoordinate[1]);
        ctx.fillText(currText, ...currentCoordinate, 572);

        currentCoordinate[1] += 27.5;
      }
      // reset transform to normal
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    this.buffers.push(this._canvas.toBuffer());
  }

}

module.exports = BigBossGenerator;
