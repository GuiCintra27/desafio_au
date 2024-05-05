import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', `.env.${process.env.ENV}`],
      expandVariables: true,
      isGlobal: true,
    }),
    PrismaModule,
    CategoriesModule,
    ProductsModule,
    MenuModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
