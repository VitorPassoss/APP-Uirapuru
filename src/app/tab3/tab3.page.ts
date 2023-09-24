import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  produtos:any = []
  destinacoes:any = []

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastController: ToastController

  ) {
    this.saidaForm = this.formBuilder.group({
      quantidade: [null],
      destinacao: [null],
      ref: [null],
      id_ref: [null]
    })
  }

  ngOnInit(): void {
    this.getProdutoEstoque()
  }
  isModalOpen = false;
  selectedItem:any
  saidaForm: FormGroup


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  getProdutoEstoque(){
    this.http.get(`${environment.urlApi}/producao/estoque`).subscribe(
     {
      next: async (res) => {
        this.produtos = res
      }
     }
    )
  }

  getDestinacoes(){
    this.http.get(`${environment.urlApi}/saidas/destinacao`).subscribe(
      {
       next: async (res) => {
         this.destinacoes = res
       }
      }
     )
  }


  Saida(item:any){
    this.getDestinacoes()
    this.isModalOpen = true
    this.selectedItem = item
  }



 // Dentro do seu componente
submitSaida() {
  this.saidaForm.patchValue({
    ref: 'produto',
    id_ref: this.selectedItem.produto.id
  });
  console.log(this.saidaForm)
  if(this.saidaForm.valid){
    this.http.post(`${environment.urlApi}/saidas/`, this.saidaForm.value).subscribe(
      {
       next: async (res) => {
        this.getProdutoEstoque()
        this.isModalOpen = false
        const toast = await this.toastController.create({
          message: 'Saida registrada com sucesso.',
          duration: 1500,
          position: 'top',
          color:'success'
        });
        await toast.present();
       },
       error: async (res) => {
        console.log(res)
        const toast = await this.toastController.create({
          message: 'Houve algum erro no registro da saida',
          duration: 1500,
          position: 'top',
          color: 'danger'
        });
        await toast.present();
       }
      }
     )
  }
}

 



}
