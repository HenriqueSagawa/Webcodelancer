# WebCodeLancer  

Bem-vindo ao repositório do site oficial da **WebCodeLancer**, uma empresa especializada em serviços de freelance para desenvolvimento web! 🚀  

Este projeto é uma aplicação web moderna, desenvolvida com tecnologias avançadas para garantir desempenho, escalabilidade e uma experiência de usuário otimizada.  

---

## 🛠 Tecnologias Utilizadas  

Este projeto utiliza o seguinte stack de desenvolvimento:  

- **[Next.js](https://nextjs.org/)**: Framework React para criação de aplicações web otimizadas e escaláveis.  
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática para maior confiabilidade no código.  
- **[Prisma ORM](https://www.prisma.io/)**: ORM moderno e eficiente para banco de dados MySQL.  
- **MySQL**: Banco de dados relacional para armazenamento de informações.  
- **[Next-UI](https://nextui.org/)**: Biblioteca de componentes estilizados para criar interfaces responsivas e elegantes.  
- **[Next-Auth](https://next-auth.js.org/)**: Biblioteca de autenticação para gerenciamento seguro de login de usuários.  
- **[EmailJS](https://www.emailjs.com/)**: Integração para envio de e-mails diretamente da aplicação sem necessidade de servidor adicional.  
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utilitário para estilização rápida e consistente.  
- **[Node.js](https://nodejs.org/)**: Plataforma para construção do backend.  

---

## ✨ Funcionalidades  

- Cadastro e autenticação de usuários (freelancers e clientes) com **Next-Auth**.  
- Sistema de envio de mensagens e notificações por e-mail com **EmailJS**.  
- Painel administrativo para gerenciamento de perfis, projetos e serviços.  
- Listagem de freelancers e projetos disponíveis.  
- Design moderno e responsivo com **Tailwind CSS** e **Next-UI**.  

---

## 📂 Estrutura do Projeto  

A estrutura de diretórios foi organizada para facilitar o desenvolvimento e a manutenção:  

```bash  
src/  
├── components/      # Componentes reutilizáveis  
├── app/             # Páginas da aplicação
├── models/          # Modelos utilitários  
├── hooks/           # Hooks personalizados  
├── services/        # Integração com serviços externos (e.g., EmailJS)
```  

---

## 🚀 Configuração e Execução  

### Pré-requisitos  
Certifique-se de ter instalado:  
- **Node.js** (versão 16 ou superior)  
- **MySQL**  
- **Yarn** ou **npm**  

### Passo a passo  

1. Clone este repositório:  

   ```bash  
   git clone https://github.com/seu-usuario/webcodelancer.git  
   cd webcodelancer  
   ```  

2. Instale as dependências:  

   ```bash  
   npm install  
   # ou  
   yarn install  
   ```  

3. Configure as variáveis de ambiente:  

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:  

   ```env  
   DATABASE_URL=""

    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=

    GITHUB_CLIENT_ID=
    GITHUB_SECRET=

    NEXTAUTH_URL=http://localhost:3000

    NEXTAUTH_SECRET=
   ```  

4. Execute as migrações do banco de dados:  

   ```bash  
   npx prisma migrate dev  
   ```  

5. Inicie o servidor de desenvolvimento:  

   ```bash  
   npm run dev  
   # ou  
   yarn dev  
   ```  

6. Acesse a aplicação em: **[http://localhost:3000](http://localhost:3000)**  

## 🤝 Contribuindo  

Contribuições são bem-vindas! Siga os passos abaixo:  

1. Faça um fork do repositório.  
2. Crie uma branch para sua funcionalidade: `git checkout -b minha-feature`.  
3. Commit suas alterações: `git commit -m "Minha nova feature"`.  
4. Envie para a branch principal: `git push origin minha-feature`.  
5. Abra um Pull Request!  

---

## 📄 Licença  

Este projeto está licenciado sob a **Licença Própria da WebCodeLancer**. Consulte o arquivo `LICENSE` para mais informações.  

---  

## 📧 Contato  

- **Site oficial**: [webcodelancer.com](#)  
- **E-mail**: webcodelancer@gmail.com 
- **Instagram**: [https://www.instagram.com/webcodelancer/](#)  

---  

**WebCodeLancer - Seu parceiro ideal para desenvolvimento web!**  
