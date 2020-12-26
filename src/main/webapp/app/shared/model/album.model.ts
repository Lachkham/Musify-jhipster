import { Moment } from 'moment';
import { IArtist } from 'app/shared/model/artist.model';
import { ISong } from 'app/shared/model/song.model';

export interface IAlbum {
  id?: number;
  label?: string;
  releaseDate?: Moment;
  lengthSeconds?: number;
  genre?: string;
  studio?: string;
  producer?: string;
  artist?: IArtist;
  songs?: ISong[];
}

export class Album implements IAlbum {
  constructor(
    public id?: number,
    public label?: string,
    public releaseDate?: Moment,
    public lengthSeconds?: number,
    public genre?: string,
    public studio?: string,
    public producer?: string,
    public artist?: IArtist,
    public songs?: ISong[]
  ) {}
}
