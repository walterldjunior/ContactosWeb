import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { ContatoService } from './contato.service';
import { Contato } from './contato.model';

@Component({
    moduleId: module.id,
    selector: 'contato-detalhe',
    templateUrl: 'contato-detalhe.component.html'
})
export class ContatoDetalheComponent implements OnInit {
    
    contato: Contato;
    isNew: boolean = true;

    constructor(
        private contatoService: ContatoService,
        private route: ActivatedRoute,
        private location: Location
    ){ }

    ngOnInit(): void {
        console.log('on init');

        this.contato = new Contato(0, '', '', '');

        this.route.params.forEach((params: Params) => {
            let id: number = +params['id'];

            if(id){
                this.isNew = false;
                
                this.contatoService.getContato(id)
                .then((contato: Contato) => {
                    this.contato = contato;
                    console.log(contato);
                });
            }
        });
    }

    getFormGroupClass(isValid: boolean, isPristine: boolean): {} {
        return {
            'form-group': true,
            'has-danger': !isValid && !isPristine,
            'has-success': isValid && !isPristine
        };
    }

    getFormControlClass(isValid: boolean, isPristine: boolean): {} {
        return {
            'form-control': true,
            'form-control-danger': !isValid && !isPristine,
            'form-control-success': isValid && !isPristine
        };
    }

    onSubmit(): void {
        let promise;

        if(this.isNew){
            console.log("Cadastrar novo contato!");
            promise = this.contatoService.create(this.contato);
        } else {
            console.log("Alterar contato!");
            promise = this.contatoService.update(this.contato);
        }

        promise.then(contato => this.location.back());

    }
} 