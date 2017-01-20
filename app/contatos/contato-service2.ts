import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';

@Injectable(

)
export class ContatoService {

    private contatosUrl: string = 'app/contatos';

    constructor(
        private http: Http
    ){}

    getContatos(): Promise<Contato[]> {
        return this.http.get(this.contatosUrl)
        .toPromise()
        .then(response => response.json().data as Contato[]);
        //return Promise.resolve(CONTATOS);
    }

    getContato(id: number): Promise<Contato> {
        return this.getContatos()
        .then((contatos: Contato[]) => {
            return contatos.find((contato) => {
                return contato.id === id;
            });
        });
    }

    // Chamada no servidor com latência alta.
    getContatosSlowly(): Promise<Contato[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        }).then(() => this.getContatos() );
    }
}