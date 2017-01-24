import { Component, OnInit } from '@angular/core';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';
import { DialogService } from './../dialog.service';



@Component({
    moduleId: module.id,
    selector: 'contatos-lista',
    templateUrl: 'contatos-lista.component.html'
})
export class ContatosListaComponent {

    contatos: Contato[];

    constructor( 
        private contatoService: ContatoService,
        private dialogService: DialogService 
        ){ }
    
    ngOnInit(): void {
        this.contatoService.getContatos()
        .then((contato: Contato[]) => {
            this.contatos = contato;
        })
        .catch(err => {
            console.log('Aconteceu um erro: ', err);
        });
    }

    onDelete(contato: Contato): void {
        this.dialogService.confirm('Desejar deletar o contato: ' + contato.nome + '?')
        .then((canDelete: boolean) => {

            if(canDelete){

                this.contatoService
                    .delete(contato)
                    .then(() => {

                        this.contatos = this.contatos.filter((c: Contato) => c.id != contato.id);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        });
    }

}