import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
 
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    this.entradaForm = this.formBuilder.group({
      fornecedor: [null],
      tipo_insumo: ['Kg'],
      quantidade: [null],
      valor: [null]
    })
  }

  entradas:any = []
  fornecedores:any = []
  insumos:any = []

  isModalOpen = false;


  entradaForm: FormGroup

  setOpen(isOpen: boolean) {
    if(isOpen == true){
      this.getInsumo()
      this.getFornecedor()
    }
    this.isModalOpen = isOpen;
  }

  ngOnInit(): void {
    this.getEntradas()
  }


  getEntradas(){
    this.http.get(`${environment.urlApi}/entrada`).subscribe(
      (data:any) => {
        console.log(data)
        this.entradas = data
      },
      error => {
        console.error('Erro ao buscar entradas:', error);
      }
    );
  }

  getInsumo(){
    this.http.get(`${environment.urlApi}/entrada/insumos`).subscribe(
      (data:any) => {
        console.log(data)
        this.insumos = data
      },
      error => {
        console.error('Erro ao buscar entradas:', error);
      }
    );
  }

  getFornecedor(){
    this.http.get(`${environment.urlApi}/entrada/fornecedores`).subscribe(
      (data:any) => {
        console.log(data)
        this.fornecedores = data
      },
      error => {
        console.error('Erro ao buscar entradas:', error);
      }
    );
  }


  async submitForm() {
    if (this.entradaForm.valid) { 
      const formData = this.entradaForm.value; // get the form data
       this.http.post(`${environment.urlApi}/entrada/`, formData).subscribe({
        next: async (res)=>{
          this.isModalOpen = false
          this.getEntradas()
          const toast = await this.toastController.create({
            message: 'Entrada registrada com sucesso.',
            duration: 1500,
            position: 'top',
            color:'success'
          });
          await toast.present();
        },
        error: async(err)=>{
          const toast = await this.toastController.create({
            message: 'Ocorreu um erro no registro da entrada.',
            duration: 1500,
            position: 'top',
            color: 'danger'
          });
          await toast.present();
        }
       })
    }else{
      const toast = await this.toastController.create({
        message: 'Insira dados corretamente',
        duration: 1500,
        position: 'top',
        color: 'danger'
      });
      await toast.present();
    }
  }

}
