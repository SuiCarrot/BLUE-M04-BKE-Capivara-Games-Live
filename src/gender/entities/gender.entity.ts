import { Game } from 'src/game/entities/game-entity';

export class Gender {
  id?: string;
  name: string;
  games?: Game[];
  createdAt?: Date;
  updatedAt?: Date;
}
