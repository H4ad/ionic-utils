/**
 * A interface que representa as configurações desse módulo
 */
export interface HttpAsyncConfig {

  /**
   * O url base usado em todas as requisições
   *
   * @note Se não fornecido, ele não irá incluir um url base e apenas realizará a requisição no url fornecido.
   */
  baseUrl?: string;

  /**
   * A chave para buscar no cache o token de autenticação que será enviado
   * no header `Authorization`.
   *
   * @note Se não fornecido, ele não irá adicionar o header `Authorization` na requisição
   */
  bearerTokenKey?: string;

  /**
   * Os `Headers` padrões, aqui você pode usar para fornecer alguns `Headers`
   * que serão incluídos em todas as requisições.
   *
   * @note Se não fornecido, ele não irá adicionar nenhum `Header` a mais na requisição.
   */
  defaultHeaders?: {
    [name: string]: string | string[];
  };

}
