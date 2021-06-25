import { Controller, Get, Query, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { gameMedals } from '../../commands/medals';
import Twitch from '../../twitch';

@Controller('medals')
export class MedalsController {
  @Get()
  async medals(@Query('channel') channel: string, @Res() res: FastifyReply) {
    const users = await Twitch.api(`users`, { login: channel.trim() })
    if (!users.data?.length) {
      res.status(401).send('User not found')
    } else {
      const response = await gameMedals('', { "user-id": users.data[0].id, "room-id": users.data[0].id }, '', false, true)
      return res.send(response)
    }
  }
}
