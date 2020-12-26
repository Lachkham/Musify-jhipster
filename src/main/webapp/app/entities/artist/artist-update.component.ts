import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IArtist, Artist } from 'app/shared/model/artist.model';
import { ArtistService } from './artist.service';

@Component({
  selector: 'jhi-artist-update',
  templateUrl: './artist-update.component.html',
})
export class ArtistUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    birthDate: [],
    instrument: [],
  });

  constructor(protected artistService: ArtistService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ artist }) => {
      if (!artist.id) {
        const today = moment().startOf('day');
        artist.birthDate = today;
      }

      this.updateForm(artist);
    });
  }

  updateForm(artist: IArtist): void {
    this.editForm.patchValue({
      id: artist.id,
      firstName: artist.firstName,
      lastName: artist.lastName,
      birthDate: artist.birthDate ? artist.birthDate.format(DATE_TIME_FORMAT) : null,
      instrument: artist.instrument,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const artist = this.createFromForm();
    if (artist.id !== undefined) {
      this.subscribeToSaveResponse(this.artistService.update(artist));
    } else {
      this.subscribeToSaveResponse(this.artistService.create(artist));
    }
  }

  private createFromForm(): IArtist {
    return {
      ...new Artist(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      birthDate: this.editForm.get(['birthDate'])!.value ? moment(this.editForm.get(['birthDate'])!.value, DATE_TIME_FORMAT) : undefined,
      instrument: this.editForm.get(['instrument'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArtist>>): void {
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
}
