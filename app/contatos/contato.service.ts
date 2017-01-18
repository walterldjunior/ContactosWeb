import { Injectable } from '@angular/core';

import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';

@Injectable(

)

export class ContatoService {

    constructor(){

    }

    getContatos(): Promise<Contato[]> {
        return Promise.resolve(CONTATOS);
    }

    // Chamada no servidor com latência alta.
    getContatosSlowly(): Promise<Contato[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        }).then(() => this.getContatos() );
    }
}