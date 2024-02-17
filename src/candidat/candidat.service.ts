import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CandidatEntity } from './entities/candidat.entity';

@Injectable()
export class CandidatService {
  constructor(
    @InjectRepository(CandidatEntity)
    private candRepo: Repository<CandidatEntity>,
  ) {}

  getCandidats() {
    return this.candRepo.find();
  }

  addCandidat(newCandidat) {
    return this.candRepo.save(newCandidat);
  }
}
