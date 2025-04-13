require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const { logger } = require('./src/utils/logger');
const { iniciarSincronizacao } = require('./src/services/sincronizacao');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Rota de status
app.get('/status', (req, res) => {
  res.json({ status: 'online', timestamp: new Date().toISOString() });
});

// Rota para executar sincronização manual
app.post('/sincronizar', async (req, res) => {
  try {
    const resultado = await iniciarSincronizacao();
    res.json({ sucesso: true, ...resultado });
  } catch (error) {
    logger.error('Erro ao executar sincronização manual', { error: error.message });
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao executar sincronização', erro: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});

// Configurar tarefa agendada para sincronização (a cada hora)
cron.schedule('0 * * * *', async () => {
  logger.info('Iniciando sincronização agendada');
  try {
    await iniciarSincronizacao();
    logger.info('Sincronização agendada concluída com sucesso');
  } catch (error) {
    logger.error('Erro na sincronização agendada', { error: error.message });
  }
}); 