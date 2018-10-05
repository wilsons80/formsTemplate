import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import 'rxjs/add/operator/map';
import {Http} from "@angular/http";

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: Http) {

  }

  ngOnInit() {
    /*
    //Como criar um FormGroup sem usar FormBuilder
    this.formulario = new FormGroup({
      nome: new FormControl('Wilson'),
      email: new FormControl(null)
    });
    */

    //Como criar um FormGroup usando o FormBuilder
    this.formulario = this.formBuilder.group({
      nome: ['Wilson', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null , [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep:         [null , [Validators.required]],
        numero:      [null , []],
        complemento: [null , []],
        rua:         [null , [Validators.required]],
        bairro:      [null ,[Validators.required]],
        cidade:      [null ,[Validators.required]],
        estado:      [null , [Validators.required]]
      })
    });

  }

  resetar(){
    this.formulario.reset();
  }

  onSubmit(){
    console.log(this.formulario);

    if(this.formulario.valid){
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value) )
        .map(res => res)
        .subscribe(dados => {
          console.log(dados);

          //reset formulario
          //this.resetar();

        }, (error: any) => {alert('Erro ocorrido...')});

    }else{
       console.log('formulario invalioo');

       this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup){
    //itera pelos campos do formulário
    Object.keys(formGroup.controls).forEach(campo =>{
      console.log(campo);

      const controle = formGroup.get(campo);
      controle.markAsDirty();

      if(controle instanceof FormGroup){
        this.verificaValidacoesForm(controle);
      }
    });
  }


  verificaErroCampo(nomeCampo: string){
    return !this.formulario.get(nomeCampo).valid && (this.formulario.get(nomeCampo).touched || this.formulario.get(nomeCampo).dirty);
  }

  aplicaCassErro(campo: string){
    return {
      'has-error': this.verificaErroCampo(campo),
      'has-feedback': this.verificaErroCampo(campo)
    }
  }



  consultaCEP(){
    let cep = this.formulario.get('endereco.cep').value;

    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

        this.resetaDadosForm();

        //Consulta o webservice viacep.com.br/
        this.http.get("https://viacep.com.br/ws/"+ cep +"/json").map(dados => dados.json()).subscribe(
          dados => {
            this.populaDadosForm(dados);
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



  populaDadosForm(dados){

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

    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    //this.formulario.get('nome').setValue('Wilson de Carvalho Souza');
  }

  resetaDadosForm(){
    this.formulario.patchValue({
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
