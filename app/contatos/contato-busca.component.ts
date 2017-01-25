import { Component, OnInit, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html'
})
export class ContatoBuscaComponent implements OnInit, OnChanges {

    @Input() busca: string;
    contatos: Observable<Contato[]>;
    private termoDaBusca: Subject<string> = new Subject<string>();

    constructor(
        private contatoService: ContatoService,
        private route: Router
    ) { }

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

    ngOnChanges(changes: SimpleChanges): void {
        let busca: SimpleChange = changes['busca'];
        this.search(busca.currentValue);
    }

    search(termo: string): void {
        this.termoDaBusca.next(termo);
    }

    verDetalhes(contato: Contato): void {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
    }
}