import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(
    private http: HttpClient,
  ) {}
  produtos:any = []

  ngOnInit(): void {
    this.getProdutoEstoque()
  }
  
  getProdutoEstoque(){
    this.http.get(`${environment.urlApi}/entrada`).subscribe(
     {
      next: async (res) => {
        
      }
     }
    )
  }

}
