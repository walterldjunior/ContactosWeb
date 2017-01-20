"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var contatos = [
            { id: 1, nome: 'Napoleão Bonaparte', email: 'napo@gmail.com', telefone: '(00) 0000-0000' },
            { id: 2, nome: 'Joana Darck', email: 'darck@gmail.com', telefone: '(00) 2222-2222' },
            { id: 3, nome: 'Mahatma Gandhi', email: 'gandhi@gmail.com', telefone: '(00) 3333-3333' },
            { id: 4, nome: 'Stephen Hawking', email: 'hawking@gmail.com', telefone: '(00) 4444-4444' },
            { id: 5, nome: 'Albert Einstein', email: 'einstein@gmail.com', telefone: '(00) 5555-5555' },
            { id: 6, nome: 'Tony Stark', email: 'stark@gmail.com', telefone: '(00) 6666-6666' },
            { id: 7, nome: 'Charlie Sheen', email: 'sheen@gmail.com', telefone: '(00) 7777-7777' },
        ];
        return { contatos: contatos };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map