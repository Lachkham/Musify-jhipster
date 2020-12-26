import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'artist',
        loadChildren: () => import('./artist/artist.module').then(m => m.MusifyArtistModule),
      },
      {
        path: 'album',
        loadChildren: () => import('./album/album.module').then(m => m.MusifyAlbumModule),
      },
      {
        path: 'song',
        loadChildren: () => import('./song/song.module').then(m => m.MusifySongModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class MusifyEntityModule {}
