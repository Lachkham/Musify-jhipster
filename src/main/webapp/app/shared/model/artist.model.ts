import { Moment } from 'moment';
import { IAlbum } from 'app/shared/model/album.model';

export interface IArtist {
  id?: number;
  firstName?: string;
  lastName?: string;
  birthDate?: Moment;
  instrument?: string;
  albums?: IAlbum[];
}

export class Artist implements IArtist {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public birthDate?: Moment,
    public instrument?: string,
    public albums?: IAlbum[]
  ) {}
}
