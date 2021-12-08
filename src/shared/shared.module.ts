// Components
import { AlertComponent } from './components/alert/alert.component';

// Modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';

const angularModules = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  NgbToastModule,
];

const components = [AlertComponent];

const pipes: any = [];

const directives: any = [];

@NgModule({
  imports: [angularModules],
  declarations: [components, pipes, directives, HeaderComponent],
  exports: [angularModules, components, pipes, directives],
})
export class SharedModule {}
