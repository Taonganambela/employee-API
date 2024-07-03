import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'tito',
      database: 'employee',
      entities: [Employee],
      synchronize: true,
      logging: true
    }),
    EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
