Login:
POST /login - Sucesso: Testa o login com credenciais válidas e verifica se a resposta contém a mensagem esperada.
POST /login - E-mail inválido: Testa o login com um e-mail inválido e verifica se a resposta contém a mensagem de erro esperada.
POST /login - Senha inválida: Testa o login com uma senha inválida e verifica se a resposta contém a mensagem de erro esperada.
POST /login - Campos vazios: Testa o login com campos de e-mail e senha vazios e verifica se a resposta contém a mensagem de erro esperada.

Produto:
GET /produtos: Testa a listagem de produtos.
POST /produtos - Sucesso: Testa a criação de um produto com sucesso.
POST /produtos - Nome já existente: Testa a criação de um produto com um nome já existente.
POST /produtos - Token inválido: Testa a criação de um produto com um token inválido.
POST /produtos - Não administrador: Testa a criação de um produto por um usuário que não é administrador.
GET /produtos/{_id}: Testa a busca de um produto por ID.
PUT /produtos/{_id}: Testa a atualização de um produto.
DELETE /produtos/{_id}: Testa a exclusão de um produto.
