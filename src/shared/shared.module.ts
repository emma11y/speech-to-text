// Components
import { SpeechToTextGoogleComponent } from './components/speech-to-text-components/speech-to-text-google/speech-to-text-google.component';
import { SpeechToTextMozillaComponent } from './components/speech-to-text-components/speech-to-text-mozilla/speech-to-text-mozilla.component';
import { SpeechToTextMicrosoftComponent } from './components/speech-to-text-components/speech-to-text-microsoft/speech-to-text-microsoft.component';
import { SpeechToTextDeepgramComponent } from './components/speech-to-text-components/speech-to-text-deepgram/speech-to-text-deepgram.component';

// Modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const angularModules = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule];

const components = [
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
