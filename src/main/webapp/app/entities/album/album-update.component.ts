import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAlbum, Album } from 'app/shared/model/album.model';
import { AlbumService } from './album.service';
import { IArtist } from 'app/shared/model/artist.model';
import { ArtistService } from 'app/entities/artist/artist.service';

@Component({
  selector: 'jhi-album-update',
  templateUrl: './album-update.component.html',
})
export class AlbumUpdateComponent implements OnInit {
  isSaving = false;
  artists: IArtist[] = [];

  editForm = this.fb.group({
    id: [],
    label: [],
    releaseDate: [],
    lengthSeconds: [],
    genre: [],
    studio: [],
    producer: [],
    artist: [],
  });

  constructor(
    protected albumService: AlbumService,
    protected artistService: ArtistService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ album }) => {
      if (!album.id) {
        const today = moment().startOf('day');
        album.releaseDate = today;
      }

      this.updateForm(album);

      this.artistService.query().subscribe((res: HttpResponse<IArtist[]>) => (this.artists = res.body || []));
    });
  }

  updateForm(album: IAlbum): void {
    this.editForm.patchValue({
      id: album.id,
      label: album.label,
      releaseDate: album.releaseDate ? album.releaseDate.format(DATE_TIME_FORMAT) : null,
      lengthSeconds: album.lengthSeconds,
      genre: album.genre,
      studio: album.studio,
      producer: album.producer,
      artist: album.artist,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const album = this.createFromForm();
    if (album.id !== undefined) {
      this.subscribeToSaveResponse(this.albumService.update(album));
    } else {
      this.subscribeToSaveResponse(this.albumService.create(album));
    }
  }

  private createFromForm(): IAlbum {
    return {
      ...new Album(),
      id: this.editForm.get(['id'])!.value,
      label: this.editForm.get(['label'])!.value,
      releaseDate: this.editForm.get(['releaseDate'])!.value
        ? moment(this.editForm.get(['releaseDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lengthSeconds: this.editForm.get(['lengthSeconds'])!.value,
      genre: this.editForm.get(['genre'])!.value,
      studio: this.editForm.get(['studio'])!.value,
      producer: this.editForm.get(['producer'])!.value,
      artist: this.editForm.get(['artist'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlbum>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IArtist): any {
    return item.id;
  }
}
