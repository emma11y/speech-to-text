import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppInitializerService } from '@core/services/app-initializer.service';
import { SharedModule } from 'src/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { DeepgramComponent } from './pages/example-article/deepgram/deepgram.component';
import { SpeechToTextComponent } from './pages/speech-to-text/speech-to-text.component';
import { GoogleComponent } from './pages/example-article/google/google.component';
import { MicrosoftComponent } from './pages/example-article/microsoft/microsoft.component';
import { MozillaComponent } from './pages/example-article/mozilla/mozilla.component';
import { WhisperComponent } from './pages/example-article/whisper/whisper.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SpeechToTextComponent,
    DeepgramComponent,
    GoogleComponent,
    MicrosoftComponent,
    MozillaComponent,
    WhisperComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializer: AppInitializerService) => appInitializer.init(),
      deps: [AppInitializerService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
