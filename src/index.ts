import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';

// Prisma Client
import { connectToPrisma, disconnectFromPrisma, getPrismaClient } from './common/clients/prisma.client';

// Modules
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';

async function bootstrap() {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors({ origin: '*' }));


   const prismaClient = getPrismaClient();
   await connectToPrisma(prismaClient);

  new AuthModule(prismaClient).start(app)
  new CartModule(prismaClient).start(app)
  new ProductModule(prismaClient).start(app)
  new UserModule(prismaClient).start(app)


  app.listen(3000, () => {
    console.log(`Example app listening on port 3000`);
  });
  process.on('beforeExit', async () => {
    await disconnectFromPrisma(prismaClient);
  });

}

bootstrap();
