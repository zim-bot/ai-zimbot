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


const { exec } = require('child_process')
const syntax = require('syntax-error')
const axios = require('axios')
zimbot.create(async (m, {
   client,
   text,
   command,
   Func,
   Scraper,
   execSync,
   component,
   drive,
   axios
}) => {
   if (!text) return
   if (command == '=>') {
      try {
         evL = await eval(`(async () => { return ${text} })()`)
         m.reply(Func.jsonFormat(evL))
      } catch (e) {
         let err = await syntax(text)
         m.reply(typeof err != 'undefined' ? Func.texted('monospace', err) + '\n\n' : '' + Func.jsonFormat(e))
      }
   } else if (command == '>') {
      try {
         evL = await eval(`(async () => { ${text} })()`)
         m.reply(Func.jsonFormat(evL))
      } catch (e) {
         let err = await syntax(text)
         m.reply(typeof err != 'undefined' ? Func.texted('monospace', err) + '\n\n' : '' + Func.jsonFormat(e))
      }
   } else if (command == '$') {
      client.sendReact(m.chat, '🇿🇼', m.key)
      exec(text.trim(), (err, stdout) => {
         if (err) return m.reply(err.toString())
         if (stdout) return m.reply(stdout.toString())
      })
   }
}, {
   usage: ['=>', '>', '$'],
   owner: true
}, __filename)