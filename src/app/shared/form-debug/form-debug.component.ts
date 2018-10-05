import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-debug',
  templateUrl: './form-debug.component.html',
  styleUrls: ['./form-debug.component.css']
})
export class FormDebugComponent implements OnInit {

  //Como receber parâmetros de outro componente
  @Input() form;

  constructor() { }

  ngOnInit() {
  }

}
