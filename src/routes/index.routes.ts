import User from "../entities/User";
import { Request, Response, Router } from "express";
import { getRepository, Repository } from "typeorm";

const routes = Router();

/**
 * Rota de cadastro de Usuário
 */
routes.post("/users", async (request: Request, response: Response) => {
  const data = request.body;

  let ormRepository: Repository<User>; // váriavel do tipo repositório de User

  ormRepository = getRepository(User); // conecta com a tabela users do banco de dados

  const user = ormRepository.create(data); // Cria uma instancia de User

  await ormRepository.save(user); // Salva o novo user no banco de dados

  return response.json(user); // retorna o usuário cadastrado
});

/**
 * Rota de listagem de Usuários
 */
routes.get("/users", async (request: Request, response: Response) => {
  let ormRepository: Repository<User>; // váriavel do tipo repositório de User

  ormRepository = getRepository(User); // conecta com a tabela users do banco de dados

  const users = await ormRepository.find(); // busca todos os usuários

  return response.json(users); // retorna os usuários no formato JSON
});

routes.get("/users/:id", async (request: Request, response: Response) => {
  let ormRepository: Repository<User>; // váriavel do tipo repositório de User

  ormRepository = getRepository(User); // conecta com a tabela users do banco de dados

  const user = await ormRepository.findOne({
    where: { id: request.params.id },
  }); // busca usuário pelo id

  return response.json(user); // retorna o usuário no formato JSON
});

routes.delete("/users/:id", async (request: Request, response: Response) => {
  let ormRepository: Repository<User>; // váriavel do tipo repositório de User

  ormRepository = getRepository(User); // conecta com a tabela users do banco de dados

  let id = parseInt(request.params.id, 10);
  const user = await ormRepository.delete(id); // deleta usuário pelo id

  return response
    .status(200)
    .send("User deleted with ID: " + request.params.id); // retorna que o usuário foi deletado
});

routes.patch("/users/:id", async (request: Request, response: Response) => {
  let ormRepository: Repository<User>; // váriavel do tipo repositório de User

  ormRepository = getRepository(User); // conecta com a tabela users do banco de dados

  const user = await ormRepository.save(request.body); // atualiza o usuário pelo id *mandar id no JSON*

  return response.json(user); // retorna o usuário no formato JSON
});

export default routes;
