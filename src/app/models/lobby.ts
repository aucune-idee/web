import { GameType, Armies } from '@enums/index';

export class Lobby {
    _id:number;
    createdAt: Date;
    name:String;
    type: GameType;
  
    owner:number;
    members:Array<{
      _userId:number;
      username?:String;
      army?:string
    }>
    size:number;
}
