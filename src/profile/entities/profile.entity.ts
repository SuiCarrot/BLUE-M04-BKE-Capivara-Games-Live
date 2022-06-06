import { Game } from "@prisma/client";

export class Profile {
  id?: String;
  title: string;
  imageUrl: string;
  userId: string;
  games?: Game[]
}
