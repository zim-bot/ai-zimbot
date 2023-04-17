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



const { NeoxrCommands: Commands, Function: Func } = new(require('blennie-drips'))

global.owner = '+263776558634' // put your owner number

global.owner_name = 'Drips Memes' //owner name

global.database = 'bot' // database here

global.max_upload = 105

global.cooldown = 3 //delay for spamming

global.limit = 25 // zim-bot user limit

global.limitGame = 50 // user game limit

global.timer = 1800000 // global.time temporary

global.evaluate_chars = ['=>', '~>', '<', '>', '$'] // Symbols that are excluded when adding a prefix (Don't change it)

global.blocks = ['212'] // Country code that will be automatically blocked by the system, when sending messages in private chat

global.forwards = '263776558634@c.us'// Put target jid to forward friends story

global.Api = new (require('../zimbotApi'))(process.env.API_KEY)// Get neoxr apikey by registering at https://api.neoxr.my.id

global.min_reward = 100000 
global.max_reward = 500000 // Min & Max for game reward

global.api_user = '173030'
global.api_secret = 'zK0sxNKb6C9pA3gr'

global.timezone = 'Africa/Harare' //Time zone

global.version = '6.0.0',

global.footer = 'ᴀɪ-ᴢɪᴍʙᴏᴛ: https://youtube.com/@zim-bot\n\nsᴏᴜʀᴄᴇᴄᴏᴅᴇ: https://www.zimbot.me'

global.zimbot = Commands

global.status = Object.freeze({
   wait: Func.texted('bold', '🔏whoa wait a moment zim-bot processing...'),
   invalid: Func.texted('bold', '☹️hey zim-bot user the link you provided is Invalid okay.'),
   wrong: Func.texted('bold', 'hey bro you are using wrong format okay.'),
   getdata: Func.texted('bold', '⚒️zim bot is scrapping metadata...please wait bro...'),
   fail: Func.texted('bold', 'I Can\'t get metadata sorry'),
   error: Func.texted('bold', 'gosh an error occurred sorry user'),
   errorF: Func.texted('bold', 'hey user sorry this feature is in error.'),
   premium: Func.texted('bold', 'Com on zim-bot user this  feature only for premium users only.'),
   owner: Func.texted('bold', 'This cmd is  only for zim-bot owner.'),
   god: Func.texted('bold', 'This cmd is  only for zim-bot master'),
   group: Func.texted('bold', 'This cmd will only work in groups.'),
   botAdmin: Func.texted('bold', 'This command will work when I become an admin.'),
   admin: Func.texted('bold', 'This command only for group admin.'),
   private: Func.texted('bold', 'Use this command in private chat.'),
   gameSystem: Func.texted('bold', 'Game features have been disabled.'),
   gameInGroup: Func.texted('bold', 'Game features have not been activated for this group.'),
   gameLevel: Func.texted('bold', 'You cannot play the game because your level has reached the maximum limit.')
})