#  Angular/Ionic Utils

Neste repositório há alguns serviços que podem ser adicionados ao seu projeto Ionic/Angular para facilitar a sua vida ao programar.

## Módulos

Abaixo, as informações dos módulos disponíveis nesse projeto para você poder utilizar.

### Http Async

Para utilizar esse cara, basta copiar a pasta em `src/modules/http-async`, 
e com ele você pode fazer requisições HTTP com um BaseUrl, Headers e 
até o Authorization Header configurado e setado, tudo usando os `interceptors`.

#### Como usar

Para usar, importe o módulo da seguinte forma:
```typescript
imports: [
  HttpAsyncModule.withConfig({
    baseUrl: 'https://jsonplaceholder.typicode.com/todos',
    defaultHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Http-Async-Component': 'TestHttpAsyncOneComponent',
    },
    bearerTokenKey: 'AUTH_TOKEN_KEY',
  }),
],
```

E para usar os interceptors, coloque-os da seguinte forma:
```typescript
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpAsyncHeadersInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: BearerTokenInterceptor, multi: true },
],
```

E por fim, basta agora importar o serviço `HttpAsyncService` e sair fazendo suas requisições.

### Múltiplos HttpAsyncModule

Você até consegue fazer com que sua aplicação tenha duas instâncias do `HttpAsyncService`,
com cada uma apontando para um `baseUrl` diferente e até pegando credenciais diferentes.

Contudo, será necessário que as rotas nas quais você irá fazer as requisições sejam 
carregadas de forma lazy, caso contrário, não vai ser possivel configurar o baseUrl 
diferente para cada instância.

## Network

Para utilizar esse cara, basta copiar a pasta em `src/modules/network`, 
e com ele você pode verificar se está conectado a internet, e até 
setar um `Interceptor` para verificar se há internet, e se não houver,
lançar uma exceção por conta disso.

### Como usar

Para usar, importe o módulo da seguinte forma:
```typescript
imports: [
  NetworkModule,
],
```

E para usar os interceptors, coloque-os da seguinte forma:
```typescript
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: IsOfflineInterceptor, multi: true },
],
```

E pronto, basta agora sair utilizando o `NetworkService` para verificar se há
internet ou não.

## Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
