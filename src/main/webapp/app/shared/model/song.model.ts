import { Moment } from 'moment';
import { IAlbum } from 'app/shared/model/album.model';

export interface ISong {
  id?: number;
  title?: string;
  recordDate?: Moment;
  releaseDate?: Moment;
  lengthSeconds?: number;
  lyrics?: string;
  album?: IAlbum;
}

export class Song implements ISong {
  constructor(
    public id?: number,
    public title?: string,
    public recordDate?: Moment,
    public releaseDate?: Moment,
    public lengthSeconds?: number,
    public lyrics?: string,
    public album?: IAlbum
  ) {}
}
