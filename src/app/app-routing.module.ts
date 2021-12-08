import { TtsComponent } from './pages/tts/tts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navigation } from '@shared/models/navigation/navigation';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    /* data: {
      navigation: new Navigation('', null, [

      ]),
      breadcrumb: 'Accueil',
    },*/
    children: [
      {
        path: '',
        component: TtsComponent,
        //loadChildren: () => import('./public/public.module').then((m) => m.PublicModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
