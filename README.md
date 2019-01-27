#  Ionic Utils

Neste repositório há alguns serviços que podem ser adicionados ao seu projeto Ionic/Angular para facilitar a sua vida ao programar.


# Indice


- [Como usar](#como-usar)
- [Serviços](#serviços)
    - [HTTP Async](#http-async)
    - [HTTP](#http)

# Como usar

Primeiro, faça o copie o código do serviço que deseja usar, crie uma pasta em `/app/services` chamada com o nome do serviço e depois crie um arquivo `.ts` com o mesmo nome da pasta e cole o código ali.

Após isso, abra o arquivo `app.module.ts`, e em `providers` adicione o nome do serviço, e ficará assim:

~~~~
import { HttpAsync } from '../lugar/do/serviço/http-async.ts';

...

@NgModule({
  ...

  providers: [
    ...
    HttpAsync
    ...
  ]
  ...
})
export class AppModule { }
~~~~

Para usar, adicione a referência do serviço no construtor, dessa forma:

~~~~
constructor(
  private http: HttpAsync,
) {}
~~~~

# Serviços

## HTTP Async

Use esse serviço para realizar requisições assincronas em uma API.

### Usando Factory

Para facilitar o alguns processos de realizar log e autenticação, é possivel configurar algumas validações e ações ao ocorrer um erro. Para isso, você pode usar a propriedade `useFactory` para a criação do `provider` dessa forma:

~~~~
// app.module.ts
import { HttpAsync } from '../lugar/do/serviço/http-async.ts';

export function httpAsyncFactory = (http: HttpClient) => {
    const httpAsync: HttpAsync = new HttpAsync(http);

    httpAsync.setBeforeValidations(async () => {
        // Aqui você pode realizar validações antes, como verificar se há internet.

        // Depois retorne dessa forma caso de tudo certo.
        return { error: undefined } as AsyncResult<any>;

        // Ou dessa forma, caso dê errado:
        // return { error: new HttpErrorResponse({ error: new Error("Não há internet"), status: 400 }); }
    });

    httpAsync.setLoadHeaders(async () => {
        // Aqui você pode adicionar headers, como por exemplo os que precisam de informações no cache.

        // Um exemplo, é buscar o token de autorização de uma API
        const headers = new HttpHeaders("Authorization", "TOKEN");

        // Após carregar tudo que quiser, retorne
        return headers;
    });

    httpAsync.getOnAsyncResultError().subscribe((error: HttpErrorResponse) => {
        // Aqui você pode fazer o log da forma que quiser do erro.
        console.error(error);
    });

    // No final, retorne a instância criada
    return httpAsync;
}

...

@NgModule({
  ...

  providers: [
    ...
    { provide: HttpAsync, useFactory: httpAsyncFactory, deps: [HttpClient]}
    // Todas as dependências que usar no construtor da 'Factory', coloque no array 'deps'
    ...
  ]
  ...
})
export class AppModule { }
~~~~

### Exemplos

~~~~
// o json de resposta
[
  {
    "nome: "Harry Potter, o Cálice de fogo",
    "autor": "J. K. Rowling"
  },
  {
    "nome: "Harry Potter, e o Prisioneiro de azkaban",
    "autor": "J. K. Rowling"
  },
]

// a interface livro
// Nota: Para deserializar os JSONs, eu sempre uso interfaces como modelo, fica mais limpo e organizado.
export interface Livro {

  /**
   * O nome do livro
   */
  nome: string;

  /**
   * O autor do livro
   */
  autor: string;

}


// usando o serviço para obter um json com uma lista de livros
public async obterLivros(): Promise<Livro[]> {
  const url: string = 'livros'; // O url que será combinado com o url base do HttpAsync.
  const result: AsyncResult<Livro[]> = await this.http.get<Livro[]>(url);
  // É necessário informar adicionar uma interface em <> para serializar o resultado.

  if(result.error == undefined) // Verifica se não ocorreu nenhum erro.
    return result.success; // Na propriedade success que será contido o resultado da requisição.

  console.error(result.error); // Dá um print no console o erro.
  // Trate o seu erro da forma que preferir.

  return [];
}
~~~~

## HTTP

Use esse serviço para realizar requisições sincronas em uma API.

### Exemplos

~~~~
// Usarei o mesmo método e interface que o anterior, mas desta vez, ele será sincrono
// usando o serviço para obter um json com uma lista de livros
public obterLivros(): void {
  const url: string = 'livros'; // O url que será combinado com o url base do HttpAsync.

  const onSuccess = (livros: Livro[]) => {
    // Faça o que quiser com os livros.
  };

  const onError = (error: HttpErrorResponse) => {
    console.error(error);
    // Trate o erro aqui da forma que preferir.
  };

  const onComplete = () => {
    // Independente do que aconteça, ele será executado ao terminar a requisição.
    // É util para, por exemplo, executar o loading.dissmiss(); caso esteja exibindo o Popup de Loading.
  };

  this.http.get<Livro[]>(url, onSuccess, onError, onComplete);
}
~~~~