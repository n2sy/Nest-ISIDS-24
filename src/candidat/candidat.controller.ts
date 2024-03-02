import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CandidatService } from './candidat.service';

@Controller('candidat')
export class CandidatController {
  constructor(private candSer: CandidatService) {}

  @Get('all')
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

  @Get('stats')
  async statistiques(
    @Query('ageMin') ageMin,
    @Query('ageMax') ageMax,
    @Res() response: Response,
  ) {
    let result = await this.candSer.getCandidatsBetween2ages(ageMin, ageMax);
    return response.json(result);
  }
  @Post('new')
  async ajouterCandidat(@Body() newCand, @Res() response: Response) {
    try {
      let res = await this.candSer.addCandidat(newCand);
      response.json({
        message: 'candidat added',
        id: res['id'],
      });
    } catch (err) {
      throw new ConflictException();
    }
  }

  @Put('edit/:id')
  async modifierCandidat(
    @Param('id', ParseIntPipe) id,
    @Body() uCand,
    @Res() response: Response,
  ) {
    try {
      let res = await this.candSer.updateCandidat(id, uCand);
      return response.json({
        message: 'candidat updated',
        candidat: res,
      });
    } catch (err) {
      throw new ConflictException();
    }
  }

  @Delete('delete/:id')
  async supprimerCandidatParId(
    @Param('id', ParseIntPipe) id,
    @Res() response: Response,
  ) {
    let res = await this.candSer.deleteCandidat(id);
    response.json({ message: 'Candidat deleted', res });
  }

  @Delete('soft/delete/:id')
  async softSupprimerCandidatParId(
    @Param('id', ParseIntPipe) id,
    @Res() response: Response,
  ) {
    let res = await this.candSer.softDeleteCandidat(id);
    response.json({ message: 'Candidat deleted', res });
  }

  @Delete('restore/:id')
  async reactiverCandidatParId(
    @Param('id', ParseIntPipe) id,
    @Res() response: Response,
  ) {
    let res = await this.candSer.restoreCandidat(id);
    response.json({ message: 'Candidat restored', res });
  }

  @Delete('remove/:id')
  async supprimerCandidatParIdV2(
    @Param('id', ParseIntPipe) id,
    @Res() response: Response,
  ) {
    let res = await this.candSer.removeCandidat(id);
    response.json({ message: 'Candidat deleted', res });
  }
  @Delete('soft/remove/:id')
  async softSupprimerCandidatParIdV2(
    @Param('id', ParseIntPipe) id,
    @Res() response: Response,
  ) {
    let res = await this.candSer.softRemoveCandidat(id);
    return response.json({ message: 'Candidat deleted', res });
  }

  @Delete('recover/:id')
  async recoverCandidat(
    @Param('id', ParseIntPipe) id,
    @Res() response: Response,
  ) {
    let res = await this.candSer.recoverCandidat(id);
    return response.json({ message: 'Candidat recovered', res });
  }
}
