import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';

@Injectable(

)
export class ContatoService {

    private contatosUrl: string = 'app/contatos';
    private headers: Headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http  
    ){

    }
    
    create(contato: Contato): Promise<Contato> {
        return this.http.post(this.contatosUrl, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then((response: Response) => {
                return response.json().data as Contato;
            })
            .catch(this.handleError);
    }

    update(contato: Contato): Promise<Contato>{
        const url = `${this.contatosUrl}/${contato.id}`;

        return this.http
        .put(url, JSON.stringify(contato), {headers: this.headers})
        .toPromise()
        .then(() => contato as Contato)
        .catch(this.handleError);
    }

    delete(contato: Contato): Promise<Contato>{
        const url = `${this.contatosUrl}/${contato.id}`;

        return this.http
        .delete(url, {headers: this.headers})
        .toPromise()
        .then(() => contato as Contato)
        .catch(this.handleError);
    }

    getContatos(): Promise<Contato[]> {
        return this.http.get(this.contatosUrl)
            .toPromise()
            .then(response => response.json().data as Contato[])
            .catch(this.handleError);
        
    }

    getContato(id: number): Promise<Contato> {
        return this.getContatos()
        .then((contatos: Contato[]) => {
            return contatos.find((contato) => {
                return contato.id === id;
            });
        });
    }

    private handleError(err: any): Promise<any> {
        return Promise.reject(err.message || err);
    }

    // Chamada no servidor com latência alta.
    getContatosSlowly(): Promise<Contato[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        }).then(() => this.getContatos() );
    }
}