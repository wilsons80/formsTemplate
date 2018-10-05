import { Component, OnInit } from '@angular/core';
import {Usuario} from "../vo/usuario";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: Usuario = new Usuario('Wilson', 'wilson@gmail.com');
  //usuario:any = {nome:null, email:null}

  constructor(private http: Http) { }

  ngOnInit() {
    console.log(this.usuario);
  }

  onSubmit(form){
    console.log(form);

    this.http.post('https://httpbin.org/post', JSON.stringify(form.value) )
      .map(res => res)
      .subscribe(dados => console.log(dados));
  }

  verificaErroCampo(campo){
    return !campo.valid && campo.touched;
  }

  aplicaCassErro(campo){
    return {
      'has-error': this.verificaErroCampo(campo),
      'has-feedback': this.verificaErroCampo(campo)
    }
  }



  consultaCEP(cep, form){
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

        this.resetaDadosForm(form);

        //Consulta o webservice viacep.com.br/
        this.http.get("https://viacep.com.br/ws/"+ cep +"/json").map(dados => dados.json()).subscribe(
          dados => {
            this.populaDadosForm(dados, form);
          }
        );

      } //end if.
      else {
        //cep é inválido.
        //this.limpa_formulário_cep();
        alert("Formato de CEP inválido.");
      }
    } //end if.
    else {
      //cep sem valor, limpa formulário.
      //this.limpa_formulário_cep();
    }
  }

  populaDadosForm(dados, formulario){

    /*
    formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
                  rua: dados.logradouro,
                  cep: dados.cep,
                  numero: '',
                  complemento: dados.complemento,
                  bairro: dados.bairro,
                  cidade: dados.localidade,
                  estado: dados.uf
        });
    */

    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
    }
  });
  }

  resetaDadosForm(formulario){
    //Limpa todo o formulario
    //formulario.form.reset();

    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });

  }
}
