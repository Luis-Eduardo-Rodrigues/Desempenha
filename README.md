# Desempenha

Aplicativo de gestão escolar para professores criarem avaliações, acompanharem notas e analisarem o desempenho de alunos.

Cada professor cadastra seus alunos, cria provas objetivas e compartilha formulários online de forma semelhante ao Google Forms.

Os alunos podem acessar a prova utilizando sua matrícula escolar, responder ao formulário e receber automaticamente a nota após o envio.

O objetivo do sistema é auxiliar professores e escolas na análise de desempenho acadêmico, permitindo identificar:

- questões mais difíceis
- questões mais fáceis
- índice de erros
- desempenho individual dos alunos
- resultados gerais das provas

## Funcionalidades do MVP

- Cadastro, login e edição da conta do professor.
- CRUD de alunos, incluindo matrícula única por professor.
- CRUD de provas de múltipla escolha, com quatro alternativas por questão.
- Link público de prova; o aluno responde usando a matrícula cadastrada para aquele professor.
- Uma tentativa por aluno em cada prova, com nota automática de 0 a 10.
- Painel de respostas, média da turma e índices de acerto/erro por questão.

Este projeto está sendo desenvolvido com foco em estudo e aprofundamento nos conceitos de:

- desenvolvimento full stack
- modelagem de banco de dados
- apis REST
- arquitetura de software

## Tecnologias

### backend

- node.js
- express
- typeScript
- prisma orm
- postgresql
- zod
- jwt

Arquitetura utilizada:

- controller
- service
- repository

### frontend

- react
- tailwindcss
- react router dom
- axios
- lucide icons
