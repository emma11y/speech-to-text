// Components
import { AlertComponent } from './components/alert/alert.component';

// Modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { SpeechToTextGoogleComponent } from './components/speech-to-text-components/speech-to-text-google/speech-to-text-google.component';
import { SpeechToTextMozillaComponent } from './components/speech-to-text-components/speech-to-text-mozilla/speech-to-text-mozilla.component';
import { SpeechToTextMicrosoftComponent } from './components/speech-to-text-components/speech-to-text-microsoft/speech-to-text-microsoft.component';
import { SpeechToTextDeepgramComponent } from './components/speech-to-text-components/speech-to-text-deepgram/speech-to-text-deepgram.component';

const angularModules = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule, NgbModule, NgbToastModule];

const components = [
  AlertComponent,
  HeaderComponent,
  SpeechToTextMozillaComponent,
  SpeechToTextGoogleComponent,
  SpeechToTextMicrosoftComponent,
  SpeechToTextDeepgramComponent,
];

const pipes: any = [];

const directives: any = [];

@NgModule({
  imports: [angularModules],
  declarations: [components, pipes, directives],
  exports: [angularModules, components, pipes, directives],
})
export class SharedModule {}
