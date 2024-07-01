import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PricingModule } from './pricing/pricing.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PricingModule,
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME,
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
