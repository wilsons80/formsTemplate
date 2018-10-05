import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplateFormComponent} from "./template-form.component";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    SharedModule
  ],
  declarations: [
    TemplateFormComponent
  ]
})
export class TemplateFormModule { }
