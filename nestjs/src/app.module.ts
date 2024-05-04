import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', `.env.${process.env.ENV}`],
      expandVariables: true,
      isGlobal: true,
    }),
    PrismaModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
