import { Controller, Get, Query, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { getNotablePlayers } from '../../commands/notablePlayers';
import Twitch from '../../twitch';

@Controller('notableplayers')
export class NotableplayersController {
  @Get()
  async getNotablePlayers(@Query('channel') channel: string, @Res() res: FastifyReply) {
    const users = await Twitch.api(`users`, { login: channel.trim() })
    if (!users.data?.length) {
      res.status(401).send('User not found')
    } else {
      return res.send(await getNotablePlayers({ "user-id": users.data[0].id, "room-id": users.data[0].id }, false, true))
    }
  }
}
