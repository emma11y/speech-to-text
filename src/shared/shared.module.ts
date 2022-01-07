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
import { TtsMozillaComponent } from './components/text-to-speech/tts-mozilla/tts-mozilla.component';
import { TtsGoogleComponent } from './components/text-to-speech/tts-google/tts-google.component';
import { TtsMicrosoftComponent } from './components/text-to-speech/tts-microsoft/tts-microsoft.component';
import { TtsDeepgramComponent } from './components/text-to-speech/tts-deepgram/tts-deepgram.component';

const angularModules = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule, NgbModule, NgbToastModule];

const components = [AlertComponent, HeaderComponent, TtsMozillaComponent, TtsGoogleComponent, TtsMicrosoftComponent, TtsDeepgramComponent];

const pipes: any = [];

const directives: any = [];

@NgModule({
  imports: [angularModules],
  declarations: [components, pipes, directives],
  exports: [angularModules, components, pipes, directives],
})
export class SharedModule {}
