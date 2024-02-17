import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CandidatService } from './candidat.service';

@Controller('candidat')
export class CandidatController {
  constructor(private candSer: CandidatService) {}

  @Get('')
  async lireTousLesCandidats(@Res() response: Response) {
    // this.candSer
    //   .getCandidats()
    //   .then((res) => {
    //     return response.json({ message: 'get réussi' });
    //   })
    //   .catch((err) => {
    //     throw new NotFoundException();
    //   });

    try {
      const res = await this.candSer.getCandidats();
      response.json({ res, message: 'Get réussi' });
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Post('new')
  async ajouterCandidat(@Body() newCand, @Res() response: Response) {
    let res = await this.candSer.addCandidat(newCand);
    response.json({
      message: 'candidat added',
      id: res['id'],
    });
  }
}
