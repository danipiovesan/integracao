# Integração Clinicorp - Sistema de Fidelidade

Sistema de integração que verifica consultas realizadas no Clinicorp e adiciona pontos no sistema de Fidelidade.

## Funcionalidades

- Verificação automática de consultas concluídas no Clinicorp
- Adição de pontos para pacientes no sistema de Fidelidade
- Identificação de pacientes pelo CPF

## Requisitos

- Node.js 14.x ou superior
- NPM ou Yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/integracao-clinicorp-fidelidade.git
cd integracao-clinicorp-fidelidade
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Preencha as informações de acesso às APIs

```bash
cp .env.example .env
nano .env
```

## Execução

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

## Endpoints

- `GET /status` - Verifica status da aplicação
- `POST /sincronizar` - Executa sincronização manualmente

## Funcionamento

O sistema realiza as seguintes operações:

1. A cada hora, busca consultas concluídas nas últimas 24 horas no Clinicorp
2. Para cada consulta, verifica se o paciente possui CPF cadastrado
3. Busca o usuário correspondente no sistema de Fidelidade pelo CPF
4. Adiciona 100 pontos ao usuário no sistema de Fidelidade

## Logs

Os logs são armazenados no diretório `logs/`:
- `combined.log` - Todos os logs
- `error.log` - Apenas erros

## Configuração no VPS

### Usando PM2 (recomendado)

1. Instale o PM2 globalmente:
```bash
npm install -g pm2
```

2. Inicie a aplicação:
```bash
pm2 start index.js --name integracao-clinicorp
```

3. Configure o PM2 para iniciar na inicialização do sistema:
```bash
pm2 startup
pm2 save
```

4. Comandos úteis:
```bash
pm2 logs integracao-clinicorp # Ver logs
pm2 restart integracao-clinicorp # Reiniciar
pm2 stop integracao-clinicorp # Parar
```

### Usando Systemd

1. Crie um arquivo de serviço:
```bash
sudo nano /etc/systemd/system/integracao-clinicorp.service
```

2. Adicione o seguinte conteúdo (ajuste os caminhos conforme necessário):

[Unit]
Description=Integração Clinicorp-Fidelidade
After=network.target

[Service]
Type=simple
User=seu_usuario
WorkingDirectory=/caminho/para/integracao-clinicorp-fidelidade
ExecStart=/usr/bin/node /caminho/para/integracao-clinicorp-fidelidade/index.js
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target 