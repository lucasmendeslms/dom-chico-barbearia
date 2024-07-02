import { PrismaService } from 'src/database/prisma.service';

import { Injectable } from '@nestjs/common';
import { StateRepository } from '../stateRepository';
import { State } from 'src/location/entities/state.entity';

@Injectable()
export class PrismaStateRepository implements StateRepository {
  constructor(private prisma: PrismaService) {}

  async createState(stateData: State): Promise<number> {
    const { name, stateAcronym } = stateData;

    const newState: State = await this.prisma.state.create({
      data: {
        name,
        stateAcronym,
      },
    });

    return newState.id;
  }

  async countStates(): Promise<number> {
    return await this.prisma.state.count();
  }

  async getAllStates(): Promise<State[]> {
    return await this.prisma.state.findMany();
  }

  async createDefaultStates(statesList: State[]): Promise<void> {
    await this.prisma.state.createMany({
      data: statesList,
      skipDuplicates: true,
    });
  }
}
