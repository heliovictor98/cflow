-- Criação da tabela tb_unidade (CFlow)
-- Execute no banco cflow (ex.: psql -U cflow -d cflow -f scripts/01-create-tb_unidade.sql)

CREATE TABLE IF NOT EXISTS tb_unidade (
  id SERIAL PRIMARY KEY,
  bloco VARCHAR(20) NOT NULL,
  apartamento VARCHAR(20) NOT NULL,
  contato VARCHAR(100),
  "nomeMoradorResponsavel" VARCHAR(200) NOT NULL,
  login VARCHAR(50) NOT NULL UNIQUE,
  senha VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para busca por login (usado no auth)
CREATE UNIQUE INDEX IF NOT EXISTS idx_tb_unidade_login ON tb_unidade (login);

-- Comentários
COMMENT ON TABLE tb_unidade IS 'Cadastro de unidades (bloco/apartamento). Login gerado automaticamente (bloco+apartamento). Senha em hash, nullable até primeiro acesso.';
