import { MozillaComponent } from './pages/example-article/mozilla/mozilla.component';
import { MicrosoftComponent } from './pages/example-article/microsoft/microsoft.component';
import { DeepgramComponent } from './pages/example-article/deepgram/deepgram.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SpeechToTextComponent } from './pages/speech-to-text/speech-to-text.component';
import { GoogleComponent } from './pages/example-article/google/google.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: SpeechToTextComponent,
      },
      {
        path: 'deepgram',
        component: DeepgramComponent,
      },
      {
        path: 'google',
        component: GoogleComponent,
      },
      {
        path: 'microsoft',
        component: MicrosoftComponent,
      },
      {
        path: 'mozilla',
        component: MozillaComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
