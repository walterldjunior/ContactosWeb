import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html'
})
export class ContatoBuscaComponent implements OnInit {

    constructor(
        private contatoService: ContatoService
    ) { }

    contatos: Observable<Contato[]>;
    private termoDaBusca: Subject<string> = new Subject<string>();

    ngOnInit(): void { 
        this.contatos = this.termoDaBusca
        .debounceTime(500)              //aguarda 500ms para realizar uma nova busca (evento).
        .distinctUntilChanged()         //ignore se o próximo da busca for igual ao anterior.
        .switchMap(term => {
            console.log('Fez a busca', term);
            return term ? this.contatoService.search(term) : Observable.of<Contato[]>([]);
        })
        .catch(err => {
            console.log();
            return Observable.of<Contato[]>([]);
        });

        this.contatos.subscribe((contatos: Contato[]) => {
            console.log('Retornou do servidor', contatos);
        })
    }

    search(termo: string): void {
        this.termoDaBusca.next(termo);
    }
}