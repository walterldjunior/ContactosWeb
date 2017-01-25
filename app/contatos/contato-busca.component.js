"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var contato_service_1 = require("./contato.service");
var ContatoBuscaComponent = (function () {
    function ContatoBuscaComponent(contatoService, route) {
        this.contatoService = contatoService;
        this.route = route;
        this.termoDaBusca = new Subject_1.Subject();
    }
    ContatoBuscaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contatos = this.termoDaBusca
            .debounceTime(500) //aguarda 500ms para realizar uma nova busca (evento).
            .distinctUntilChanged() //ignore se o próximo da busca for igual ao anterior.
            .switchMap(function (term) {
            console.log('Fez a busca', term);
            return term ? _this.contatoService.search(term) : Observable_1.Observable.of([]);
        })
            .catch(function (err) {
            console.log();
            return Observable_1.Observable.of([]);
        });
        this.contatos.subscribe(function (contatos) {
            console.log('Retornou do servidor', contatos);
        });
    };
    ContatoBuscaComponent.prototype.ngOnChanges = function (changes) {
        var busca = changes['busca'];
        this.search(busca.currentValue);
    };
    ContatoBuscaComponent.prototype.search = function (termo) {
        this.termoDaBusca.next(termo);
    };
    ContatoBuscaComponent.prototype.verDetalhes = function (contato) {
        var link = ['contato/save', contato.id];
        this.router.navigate(link);
    };
    return ContatoBuscaComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ContatoBuscaComponent.prototype, "busca", void 0);
ContatoBuscaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'contato-busca',
        templateUrl: 'contato-busca.component.html'
    }),
    __metadata("design:paramtypes", [contato_service_1.ContatoService,
        router_1.Router])
], ContatoBuscaComponent);
exports.ContatoBuscaComponent = ContatoBuscaComponent;
//# sourceMappingURL=contato-busca.component.js.map