import { Component, OnInit } from '@angular/core';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';



@Component({
    moduleId: module.id,
    selector: 'contatos-lista',
    templateUrl: 'contatos-lista.component.html'
})
export class ContatosListaComponent {

    contatos: Contato[];

    constructor( private contatoService: ContatoService ){ }
    
    ngOnInit(): void {
        this.contatoService.getContatos()
        .then((contato: Contato[]) => {
            this.contatos = contato;
        })
        .catch(err => {
            console.log('Aconteceu um erro: ', err);
        });
    }

}