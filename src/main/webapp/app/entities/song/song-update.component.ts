import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISong, Song } from 'app/shared/model/song.model';
import { SongService } from './song.service';
import { IAlbum } from 'app/shared/model/album.model';
import { AlbumService } from 'app/entities/album/album.service';

@Component({
  selector: 'jhi-song-update',
  templateUrl: './song-update.component.html',
})
export class SongUpdateComponent implements OnInit {
  isSaving = false;
  albums: IAlbum[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    recordDate: [],
    releaseDate: [],
    lengthSeconds: [],
    lyrics: [],
    album: [],
  });

  constructor(
    protected songService: SongService,
    protected albumService: AlbumService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ song }) => {
      if (!song.id) {
        const today = moment().startOf('day');
        song.recordDate = today;
        song.releaseDate = today;
      }

      this.updateForm(song);

      this.albumService.query().subscribe((res: HttpResponse<IAlbum[]>) => (this.albums = res.body || []));
    });
  }

  updateForm(song: ISong): void {
    this.editForm.patchValue({
      id: song.id,
      title: song.title,
      recordDate: song.recordDate ? song.recordDate.format(DATE_TIME_FORMAT) : null,
      releaseDate: song.releaseDate ? song.releaseDate.format(DATE_TIME_FORMAT) : null,
      lengthSeconds: song.lengthSeconds,
      lyrics: song.lyrics,
      album: song.album,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const song = this.createFromForm();
    if (song.id !== undefined) {
      this.subscribeToSaveResponse(this.songService.update(song));
    } else {
      this.subscribeToSaveResponse(this.songService.create(song));
    }
  }

  private createFromForm(): ISong {
    return {
      ...new Song(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      recordDate: this.editForm.get(['recordDate'])!.value ? moment(this.editForm.get(['recordDate'])!.value, DATE_TIME_FORMAT) : undefined,
      releaseDate: this.editForm.get(['releaseDate'])!.value
        ? moment(this.editForm.get(['releaseDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lengthSeconds: this.editForm.get(['lengthSeconds'])!.value,
      lyrics: this.editForm.get(['lyrics'])!.value,
      album: this.editForm.get(['album'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISong>>): void {
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

  trackById(index: number, item: IAlbum): any {
    return item.id;
  }
}
