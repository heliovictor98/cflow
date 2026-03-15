-- Histórico do chamado: criação, comentários do admin e encerramento
-- Execute no banco cflow após 03-create-tb_categoria-tb_subcategoria-tb_notificacao.sql

CREATE TABLE IF NOT EXISTS tb_notificacao_historico (
  id SERIAL PRIMARY KEY,
  notificacao_id INT NOT NULL REFERENCES tb_notificacao(id) ON DELETE CASCADE,
  tipo VARCHAR(30) NOT NULL,
  autor_unidade_id INT NULL REFERENCES tb_unidade(id) ON DELETE SET NULL,
  autor_usuario_id INT NULL REFERENCES tb_usuario(id) ON DELETE SET NULL,
  texto TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tb_notificacao_historico_notificacao_id ON tb_notificacao_historico (notificacao_id);

COMMENT ON TABLE tb_notificacao_historico IS 'Timeline do chamado: CRIACAO (abertura pelo morador), COMENTARIO (parecer do admin), ENCERRAMENTO (encerramento pelo admin).';
COMMENT ON COLUMN tb_notificacao_historico.tipo IS 'CRIACAO | COMENTARIO | ENCERRAMENTO';
COMMENT ON COLUMN tb_notificacao_historico.autor_unidade_id IS 'Preenchido quando o autor é o morador (ex.: CRIACAO).';
COMMENT ON COLUMN tb_notificacao_historico.autor_usuario_id IS 'Preenchido quando o autor é usuário do sistema (ex.: COMENTARIO, ENCERRAMENTO).';
