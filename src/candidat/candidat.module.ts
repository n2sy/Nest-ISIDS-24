import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatController } from './candidat.controller';
import { CandidatService } from './candidat.service';
import { CandidatEntity } from './entities/candidat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CandidatEntity])],
  controllers: [CandidatController],
  providers: [CandidatService],
})
export class CandidatModule {}
