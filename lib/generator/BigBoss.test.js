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




const Canvas = require('canvas');
const fs = require('fs');
const BigBoss = require('./BigBoss');

class BigBossTest extends BigBoss {
  constructor() {
    super({ font: 'default', color: '' });
  }

  // for experimenting purpose
  async test() {
    const path = `media/image/book.jpg`;
    const canvas = Canvas.createCanvas(1440, 1080);
    const ctx = canvas.getContext('2d');
    const img = await Canvas.loadImage(path);
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, canvas.width, canvas.height);
    const startx = 124;
    const starty = 148;

    // rotate 359 degrees or -1 degrees?
    ctx.translate(startx, starty);
    ctx.rotate(-1 * Math.PI / 180);
    ctx.translate(-startx, -starty);
    ctx.font = '24px default';
    const text = `The Quick Brown fox jump over the lazy dogs 123459`;
    const text2 = `ahslvbgo ewhisgfhb aewgb hoawehgb oawhb egh jweghb`;
    console.log(text2);
    ctx.fillText(text, startx, starty);

    // reset transform to normal
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const buffer = canvas.toBuffer();
    console.log(Buffer.byteLength(buffer));
    fs.writeFileSync(`${__dirname}/bigbosstest.png`, buffer);

  }
}


const test = new BigBossTest();
test.test();
