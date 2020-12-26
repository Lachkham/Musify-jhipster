import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IArtist } from 'app/shared/model/artist.model';

type EntityResponseType = HttpResponse<IArtist>;
type EntityArrayResponseType = HttpResponse<IArtist[]>;

@Injectable({ providedIn: 'root' })
export class ArtistService {
  public resourceUrl = SERVER_API_URL + 'api/artists';

  constructor(protected http: HttpClient) {}

  create(artist: IArtist): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(artist);
    return this.http
      .post<IArtist>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(artist: IArtist): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(artist);
    return this.http
      .put<IArtist>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IArtist>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IArtist[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(artist: IArtist): IArtist {
    const copy: IArtist = Object.assign({}, artist, {
      birthDate: artist.birthDate && artist.birthDate.isValid() ? artist.birthDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.birthDate = res.body.birthDate ? moment(res.body.birthDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((artist: IArtist) => {
        artist.birthDate = artist.birthDate ? moment(artist.birthDate) : undefined;
      });
    }
    return res;
  }
}
