-- Módulo de Notificações: categorias, subcategorias e tickets (protocolo)
-- Execute no banco cflow

-- Categorias (ex.: Barulho, Manutenção)
CREATE TABLE IF NOT EXISTS tb_categoria (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(255),
  icone VARCHAR(80) NOT NULL,
  "ordem" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE tb_categoria IS 'Categorias de notificação (ex.: Barulho, Manutenção).';

-- Subcategorias (ex.: Obra fora do horário, Música alta, Janela vazando)
CREATE TABLE IF NOT EXISTS tb_subcategoria (
  id SERIAL PRIMARY KEY,
  categoria_id INT NOT NULL REFERENCES tb_categoria(id) ON DELETE CASCADE,
  nome VARCHAR(100) NOT NULL,
  icone VARCHAR(80) NOT NULL,
  "ordem" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tb_subcategoria_categoria_id ON tb_subcategoria (categoria_id);
COMMENT ON TABLE tb_subcategoria IS 'Subcategorias de notificação vinculadas a uma categoria.';

-- Notificação (ticket) aberta pelo morador (unidade)
CREATE TABLE IF NOT EXISTS tb_notificacao (
  id SERIAL PRIMARY KEY,
  numero_protocolo VARCHAR(30) NOT NULL UNIQUE,
  unidade_id INT NOT NULL REFERENCES tb_unidade(id) ON DELETE CASCADE,
  subcategoria_id INT NOT NULL REFERENCES tb_subcategoria(id) ON DELETE RESTRICT,
  status VARCHAR(30) NOT NULL DEFAULT 'ABERTO',
  dados_complementares JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_tb_notificacao_numero_protocolo ON tb_notificacao (numero_protocolo);
CREATE INDEX IF NOT EXISTS idx_tb_notificacao_unidade_id ON tb_notificacao (unidade_id);
CREATE INDEX IF NOT EXISTS idx_tb_notificacao_subcategoria_id ON tb_notificacao (subcategoria_id);
CREATE INDEX IF NOT EXISTS idx_tb_notificacao_status ON tb_notificacao (status);

COMMENT ON TABLE tb_notificacao IS 'Tickets de notificação abertos pelo morador. Protocolo gerado no envio. dados_complementares: campos por categoria (ex. Barulho: horarioOcorrencia, descricao; Manutenção: diasProblema, detalhe).';
COMMENT ON COLUMN tb_notificacao.dados_complementares IS 'JSON com campos específicos da categoria: Barulho { horarioOcorrencia, descricao }, Manutenção { diasProblema, detalhe }.';
