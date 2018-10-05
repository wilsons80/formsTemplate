import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TemplateFormComponent} from "./template-form/template-form.component";
import {DataFormComponent} from "./data-form/data-form.component";


//Carregamento lazyLoading
//1-passo: tirar toda declaração de import de CursoModule na aplicação
//2-passo: apontar o path completo do module
//3-limpar o path principal que está no routing

const rotas: Routes = [
  {path: 'templateForm', component: TemplateFormComponent},

  {path: 'dataForm', component: DataFormComponent},

  {path: '', pathMatch:'full', redirectTo:'dataForm'}

];

@NgModule({
  imports:[
    RouterModule.forRoot(rotas, {useHash:true})
  ],
  exports:[RouterModule]
})
export class AppRoutingModule {


}
