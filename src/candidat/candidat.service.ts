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
    return this.candRepo.find({
      // withDeleted: true,
    });
  }

  addCandidat(newCandidat) {
    return this.candRepo.save(newCandidat);
  }

  async updateCandidat(id, uCandidat) {
    console.log(typeof id);

    let cand = await this.candRepo.preload({
      // id : id
      id,
      ...uCandidat,
    });
    console.log(cand);

    return this.candRepo.save(cand);
  }

  deleteCandidat(id) {
    return this.candRepo.delete({ id });
  }

  softDeleteCandidat(id) {
    return this.candRepo.softDelete({ id });
  }

  restoreCandidat(id) {
    return this.candRepo.restore({ id }); //this.candRepo.recover
  }

  async removeCandidat(id) {
    console.log(id);

    let cand = await this.candRepo.findOne({
      where: {
        id: id,
      },
    });
    console.log(cand);

    return this.candRepo.remove(cand);
  }

  async softRemoveCandidat(id) {
    console.log(id);

    let cand = await this.candRepo.findOne({
      where: {
        id: id,
      },
    });
    console.log(cand);

    return this.candRepo.softRemove(cand);
  }

  async recoverCandidat(id) {
    let cand = await this.candRepo.find({
      withDeleted: true,
      where: {
        id: id,
      },
    });
    return this.candRepo.recover(cand);
  }

  getCandidatsBetween2ages(age1, age2) {
    const qb = this.candRepo.createQueryBuilder('etudiant');
    return (
      qb
        .select('etudiant.age, count(etudiant.id) as nbreDeCandidats')
        .where('etudiant.age >= :a1 AND etudiant.Age <= :a2')
        .setParameters({ a1: age1, a2: age2 })
        .groupBy('etudiant.age ')
        //.getSql()
        .getRawMany()
    );
  }
}
