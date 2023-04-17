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



const express = require('express')
const server = express()
const fetch = require('node-fetch')
const PORT = process.env.PORT || 3000
server.set('json spaces', 2)
server.get('/', async (req, res) => {
   res.json({
      online: true,
      msg: `Server running with port ${PORT}`,
      server: await (await fetch('http://ip-api.com/json')).json()
   })
})

server.listen(PORT, () => console.log(`Zim-bot server running with port ${PORT}!`))