-- Seed inicial: categorias Barulho e Manutenção com subcategorias
-- Execute após 03-create-tb_categoria-tb_subcategoria-tb_notificacao.sql
-- Idempotente: só insere se ainda não existir pelo nome.

-- Categoria Barulho
INSERT INTO tb_categoria (nome, descricao, icone, "ordem")
SELECT 'Barulho', 'Reclamações relacionadas a barulho', 'volume_up', 1
WHERE NOT EXISTS (SELECT 1 FROM tb_categoria WHERE nome = 'Barulho');

-- Subcategorias Barulho (categoria_id = id da categoria Barulho)
INSERT INTO tb_subcategoria (categoria_id, nome, icone, "ordem")
SELECT c.id, 'Obra fora do horário', 'construction', 1 FROM tb_categoria c WHERE c.nome = 'Barulho'
AND NOT EXISTS (SELECT 1 FROM tb_subcategoria s WHERE s.categoria_id = c.id AND s.nome = 'Obra fora do horário');
INSERT INTO tb_subcategoria (categoria_id, nome, icone, "ordem")
SELECT c.id, 'Música alta', 'music_note', 2 FROM tb_categoria c WHERE c.nome = 'Barulho'
AND NOT EXISTS (SELECT 1 FROM tb_subcategoria s WHERE s.categoria_id = c.id AND s.nome = 'Música alta');
INSERT INTO tb_subcategoria (categoria_id, nome, icone, "ordem")
SELECT c.id, 'Gritos', 'record_voice_over', 3 FROM tb_categoria c WHERE c.nome = 'Barulho'
AND NOT EXISTS (SELECT 1 FROM tb_subcategoria s WHERE s.categoria_id = c.id AND s.nome = 'Gritos');

-- Categoria Manutenção
INSERT INTO tb_categoria (nome, descricao, icone, "ordem")
SELECT 'Manutenção', 'Solicitações de manutenção', 'build', 2
WHERE NOT EXISTS (SELECT 1 FROM tb_categoria WHERE nome = 'Manutenção');

-- Subcategorias Manutenção
INSERT INTO tb_subcategoria (categoria_id, nome, icone, "ordem")
SELECT c.id, 'Janela vazando', 'water_drop', 1 FROM tb_categoria c WHERE c.nome = 'Manutenção'
AND NOT EXISTS (SELECT 1 FROM tb_subcategoria s WHERE s.categoria_id = c.id AND s.nome = 'Janela vazando');
INSERT INTO tb_subcategoria (categoria_id, nome, icone, "ordem")
SELECT c.id, 'Esgoto entupido', 'plumbing', 2 FROM tb_categoria c WHERE c.nome = 'Manutenção'
AND NOT EXISTS (SELECT 1 FROM tb_subcategoria s WHERE s.categoria_id = c.id AND s.nome = 'Esgoto entupido');
INSERT INTO tb_subcategoria (categoria_id, nome, icone, "ordem")
SELECT c.id, 'Infiltração', 'filter_drama', 3 FROM tb_categoria c WHERE c.nome = 'Manutenção'
AND NOT EXISTS (SELECT 1 FROM tb_subcategoria s WHERE s.categoria_id = c.id AND s.nome = 'Infiltração');
INSERT INTO tb_subcategoria (categoria_id, nome, icone, "ordem")
SELECT c.id, 'Energia', 'bolt', 4 FROM tb_categoria c WHERE c.nome = 'Manutenção'
AND NOT EXISTS (SELECT 1 FROM tb_subcategoria s WHERE s.categoria_id = c.id AND s.nome = 'Energia');
