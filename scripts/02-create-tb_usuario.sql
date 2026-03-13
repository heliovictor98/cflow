-- Cadastro de usuários do sistema (ADM, Portaria, Zeladoria/Limpeza)
-- Execute no banco cflow
-- Perfis: ADM, PORTARIA, ZELADORIA_LIMPEZA

CREATE TABLE IF NOT EXISTS tb_usuario (
  id SERIAL PRIMARY KEY,
  "nomeCompleto" VARCHAR(200) NOT NULL,
  contato VARCHAR(100),
  perfil VARCHAR(30) NOT NULL,
  login VARCHAR(50) NOT NULL UNIQUE,
  senha VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_tb_usuario_login ON tb_usuario (login);

COMMENT ON TABLE tb_usuario IS 'Usuários do sistema: Administrador, Portaria, Zeladoria/Limpeza. Login próprio; senha pode ser definida no primeiro acesso.';
