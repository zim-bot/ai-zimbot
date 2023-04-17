const canvacord = require('canvacord')
const fs = require('fs')
zimbot.create(async (m, {
   client,
   body,
   isOwner,
   isAdmin,
   isBotAdmin,
   participants,
   users,
   groupSet,
   Func,
   Scraper
}) => {
   try {
      // Clear DB
      setInterval(async () => {
         let day = 86400000 * 30,
            now = new Date() * 1
         global.db.users.filter(v => now - v.lastseen > day && !v.premium && !v.banned && v.point < 1000000).map(v => {
            let user = global.db.users.find(x => x.jid == v.jid)
            if (user) Func.removeItem(global.db.users, user)
         })
         global.db.chats.filter(v => now - v.lastseen > day).map(v => {
            let chat = global.db.chats.find(x => x.jid == v.jid)
            if (chat) Func.removeItem(global.db.chats, chat)
         })
         global.db.groups.filter(v => now - v.lastseen > day).map(v => {
            let group = global.db.groups.find(x => x.jid == v.jid)
            if (group) Func.removeItem(global.db.groups, group)
         })
      }, 60_000)
      
      // Auto Level Up
     
 let levelAwal = Func.level(users.point)[0]
      if (users && body) users.point += Func.randomInt(100, 1500)
      let levelAkhir = Func.level(users.point)[0]
      try {
         pic = await client.profilePictureUrl(m.sender, 'image')
      } catch {
         pic = 'https://telegra.ph/file/8937de46430b0e4141a1c.jpg'
      }
      const point = global.db.users.sort((a, b) => b.point - a.point).map(v => v.jid)
      const rank = new canvacord.Rank()
         .setRank(point.indexOf(m.sender) + 1)
         .setLevel(Func.level(users.point)[0])
         .setAvatar(pic)
         .setCurrentXP(users.point)
         .setRequiredXP(Func.level(users.point)[1])
         .setStatus('online')
         .setProgressBar('#FFFFFF', 'COLOR')
         .setUsername(m.pushName)
         .setDiscriminator(Func.randomInt(1000, 9999))  
      if (levelAwal != levelAkhir) client.sendFile(m.chat, await rank.build(), 'level.jpg', `🥳  *ᴀᴜᴛᴏ: ʟᴇᴠᴇʟ ᴜᴘ*\n\nғʀᴏᴍ: ┋ *${levelAwal}* ┋ ᴛᴏ ┃ *${levelAkhir}* ┃\n*Congratulations!*, you have leveled up 🧸😚😚😚`, m)

      // Anti Delete Personal Chat
      if (!isOwner && !m.isGroup && m.msg && m.msg.type == 0) {
         const copy = await client.deleteObj(m, client)
         if (copy) {
            client.reply(m.chat, `📡 *zim-bot detects you deleted the message.*`, m).then(async () => {
               await client.copyNForward(m.chat, copy)
            })
         }
      }

      // Anti Delete Group         
      if (!isOwner && m.isGroup && groupSet.antidelete && m.msg && m.msg.type == 0) {
         const copy = await client.deleteObj(m, client)
         if (copy) {
            client.reply(m.chat, `📡 *zim-bot detects you deleted the message.*`, m).then(async () => {
               await client.copyNForward(m.chat, copy)
            })
         }
      }

      // Show View Once
      if (m.msg && m.msg.viewOnce && !isOwner) {
         let media = await client.downloadMediaMessage(m.msg)
         if (/image/.test(m.mtype)) {
            client.sendFile(m.chat, media, Func.filename('jpg'), body ? body : '', m)
         } else if (/video/.test(m.mtype)) {
            client.sendFile(m.chat, media, Func.filename('mp4'), body ? body : '', m)
         }
      }
      
      // AFK Detector
      let afk = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
      for (let jid of afk) {
         let is_user = global.db.users.find(v => v.jid == jid)
         if (!is_user) continue
         let afkTime = is_user.afk
         if (!afkTime || afkTime < 0) continue
         let reason = is_user.afkReason || ''
         if (!m.fromMe) {
            client.reply(m.chat, `*Away From Keyboard* : @${jid.split('@')[0]}\n• *Reason* : ${reason ? reason : '-'}\n• *During* : [ ${Func.toTime(new Date - afkTime)} ]`, m).then(async () => {
               client.reply(jid, `Someone from *${await (await client.groupMetadata(m.chat)).subject}*'s group, tagged or mention you.\n\n• *Sender* : @${m.sender.split('@')[0]}`, m).then(async () => {
                  await client.copyNForward(jid, m)
               })
            })
         }
      }

      // Email Verification
      if (body && body.match(/\d{3}-\d{3}/) && !users.verified) {
         if (users.jid == m.sender && users.code != body.trim()) return client.reply(m.chat, Func.texted('bold', '🧸 Your zim-bot verification code is wrong.'), m)
         if (new Date - users.codeExpire > 180000) return client.reply(m.chat, Func.texted('bold', '🧸 Your zim-bot verification code has expired.'), m).then(() => {
            users.codeExpire = 0
            users.code = ''
            users.email = ''
            users.attempt = 0
         })
         return client.reply(m.chat, Func.texted('bold', `🍻Your number has been successfully verified.`), m).then(() => {
            users.codeExpire = 0
            users.code = ''
            users.attempt = 0
            users.verified = true
         })
      }

      // Anti Spam
      let unban = new Date(users.banTemp + global.timer)
      if (new Date - users.banTemp > global.timer) {
         if (!users.banned && !m.fromMe) {
            users.spam += 1
            let spam = users.spam
            if (spam >= 2) setTimeout(() => {
               users.spam = 0
            }, global.cooldown * 1000)
            if (users.banTimes >= 3) return client.reply(m.chat, `🧸 You are permanently banned because you have been temporarily banned 3 times.`, m).then(() => {
               users.banned = true
               users.banTemp = 0
               users.banTimes = 0
            })
            if (m.isGroup && spam == 4) return client.reply(m.chat, `🧸 zim-bot detects you are spamming, please cooldown for *${global.cooldown} seconds*.`, m)
            if (m.isGroup && spam >= 5) return client.reply(m.chat, `🧸 You were temporarily banned for ${((global.timer / 1000) / 60)} minutes cause you over spam.`, m).then(() => {
               users.banTemp = new Date() * 1
               users.banTimes += 1
               if (!isOwner && chats) {
                  if (new Date() * 1 - chats.command > global.cooldown * 1000) {
                     chats.command = new Date() * 1
                  } else {
                     if (!m.fromMe) return
                  }
               }
            })
            if (!m.isGroup && spam == 4) return client.reply(m.chat, `🧸 zim-bot detects you are spamming, please cooldown for *${global.cooldown} seconds*.`, m)
            if (!m.isGroup && spam >= 5) return client.reply(m.chat, `🧸 You were temporarily banned for ${((global.timer / 1000) / 60)} minutes cause you over spam.`, m).then(() => {
               users.banTemp = new Date() * 1
               users.banTimes += 1
            })
         }
      } else return
      
      // Image Recognize
      if (!m.fromMe && m.isGroup && groupSet.antiporn && /image/.test(m.mtype) && !isAdmin && isBotAdmin) {
         let sync = await Func.getFile(await m.download())
         const json = await Scraper.pornDetector(fs.createReadStream(sync.file))
         if (json.status) return m.reply(Func.jsonFormat(json)).then(() => client.groupParticipantsUpdate(m.chat, [m.sender], 'remove'))
      } else if (!m.fromMe && !m.isGroup && /image/.test(m.mtype)) {
         let sync = await Func.getFile(await m.download())
         const json = await Scraper.pornDetector(fs.createReadStream(sync.file))
         if (json.status) return m.reply(Func.jsonFormat(json)).then(() => client.updateBlockStatus(m.sender, 'block'))
      }
   } catch (e) {
      console.log(e)
      return client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   error: false
}, __filename)