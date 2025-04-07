from config.config import db

class BarbeariaServicos(db.Model):
    __tablename__ = 'servicos'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(500))
    preco = db.Column(db.Float, nullable=False)
    duracao_minutos = db.Column(db.Integer, nullable=False)

    # def __init__(self):
    #     self.servicos = {}
    #     # self.proximo_id = 1

    
    # def criar_servico(self, nome, descricao, preco, duracao):
    #     """Adiciona um novo serviço à lista de serviços da barbearia"""
    #     if not nome or preco <= 0 or duracao <= 0:
    #         print("Dados inválidos. Verifique os valores informados.")
    #         return None
        
    #     servico = {
    #         'nome': nome,
    #         'descricao': descricao,
    #         'preco': preco,
    #         'duracao': duracao  # em minutos
    #     }
        
    #     self.servicos[self.proximo_id] = servico
    #     self.proximo_id += 1
    #     print(f"Serviço '{nome}' criado com sucesso! ID: {servico['id']}")
    #     return servico['id']
    
    # def editar_servico(self, id_servico, **forms):
    #     """Edita um serviço existente"""
    #     if id_servico not in self.servicos:
    #         print(f"Serviço com ID {id_servico} não encontrado.")
    #         return False
        
    #     servico = self.servicos[id_servico]
        
    #     campos_validos = ['nome', 'descricao', 'preco', 'duracao']
    #     for campo, valor in forms.items():
    #         if campo in campos_validos:
    #             if campo in ['preco', 'duracao'] and valor <= 0:
    #                 print(f"Valor inválido para {campo}. Deve ser maior que zero.")
    #                 return False
    #             servico[campo] = valor
        
    #     print(f"Serviço ID {id_servico} atualizado com sucesso!")
    #     return True
    
    # def excluir_servico(self, id_servico):
    #     if id_servico not in self.servicos:
    #         print(f"Serviço com ID {id_servico} não encontrado.")
    #         return False
        
    #     nome_servico = self.servicos[id_servico]['nome']
    #     del self.servicos[id_servico]
    #     print(f"Serviço '{nome_servico}' (ID: {id_servico}) removido com sucesso!")
    #     return True
    
    # def listar_servicos(self):
    #     """Exibe todos os serviços cadastrados!!!!!!"""
    #     if not self.servicos:
    #         print("Nenhum serviço cadastrado.")
    #         return
        
    #     print("\n--- SERVIÇOS DA BARBEARIA ---")
    #     for id_servico, servico in self.servicos.items():
    #         print(f"ID: {id_servico}")
    #         print(f"Nome: {servico['nome']}")
    #         print(f"Descrição: {servico['descricao']}")
    #         print(f"Preço: R${servico['preco']:.2f}")
    #         print(f"Duração: {servico['duracao']} minutos")
    #         print("-" * 30)

def criar_servico_db(form):
    servico = BarbeariaServicos(nome=form['nome'], descricao=form['descricao'], preco=form['preco'], duracao_minutos=form['duracao_minutos'])
    db.session.add(servico)
    db.session.commit()
    return 'Servico Cadastrado'
            