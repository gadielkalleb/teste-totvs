## Teste prático para Totvs

Recebi esse teste prático da Totvs para produção de uma aplicação, que basicamente é um crud de posts e consumo da api da IMDb.

Este teste tem um pórem a Totvs me deu um dia, para fazer todos os requisitos(ver pdf que esta aqui no repo), atualmente já estou trabalhando e tenho as minhas demandas. E claro que não consegui atender todos os requisitos.
Senti uma falta de empatia sobre esse prazo, pois seria possivel se o candidato não tivesse trabalhando.

O meu teste não passou por alguns motivos que foram erros meus e outros pontos que não foram passados pela pessoa que avaliou.

Vou dar um overView onde pequei: 

* usei um outro projeto como base.
* não fiz alguns requisitos(ver pdf).
* escrevi um codígo redundante.
* um bug que eu criei ao usar o replace all do VScode(vou entrar em detalhes mais a baixo)

## Bug - cuidado com replaces

Dentro do meu backend na pasta de rotas eu tinha o caminho:
```
  http://localhost:3000/posts
```
Eu preferi deixar sem *'/posts'*, assim o usuario ia acessar a aplicação e seu conteúdo na barra mesmo.

Ao fazer o replace all, em *'/posts'* para *'/'* , o VScode deixo alguns *'/posts'* para traz.

Ao redirecionar para alguns pontos especificos, a aplicação bugava.

Resolvi agora com tempo e sem pressa, recriar essa aplicação com front e back separados.

## FrontEnd com react

## BackEnd em node