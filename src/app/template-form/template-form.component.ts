import { Component, OnInit } from '@angular/core';
import {Usuario} from "../vo/usuario";

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: Usuario = new Usuario('Wilson', 'wilson@gmail.com');
  //usuario:any = {nome:null, email:null}

  constructor() { }

  ngOnInit() {
    console.log(this.usuario);
  }

  onSubmit(form){
    console.log(form);
  }

}
