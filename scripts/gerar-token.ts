import jwt from 'jsonwebtoken';

const payload = {
  id: 1,
  name: "Luis",
  accountId: "0001",
  isAdmin: true, // Defina como true para simular um usuário administrador
};

const secretKey = process.env.JWT_SECRET ?? 'secret'; // use .env em produção

const token = jwt.sign(payload, secretKey, { expiresIn: '1y' });

console.log("Token gerado:");
console.log(token);