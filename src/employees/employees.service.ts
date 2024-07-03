import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {

    constructor(
        @InjectRepository(Employee)
        private employeesRepository: Repository<Employee>
    ) {}

    getEmployees(): Promise<Employee[]>{
        return this.employeesRepository.find();
    }


    addEmployee(payload: CreateEmployeeDto): Promise<Employee> {

        const newEmp = this.employeesRepository.create(payload);
        const createdEmp = this.employeesRepository.save(newEmp);

        return createdEmp;
    }


    async deleteEmployee(employeeId: number) {
        const employee = await this.employeesRepository.findOne({
            where: {
                id: employeeId
            }
        });        

        if(!employee){
            throw new BadRequestException(`Employee by id ${employeeId} does not exist.`)
        }

        this.employeesRepository.delete({
            id: employeeId
        });

        return 'Employee has been deleted.'
    }

    async findOne(id: number): Promise<Employee>{
        return this.employeesRepository.findOne({where:{id}});
    }

     async update(id:number ,employee:Partial<Employee>): Promise<Employee>{
         await this.employeesRepository.update(id, employee);
         return this.employeesRepository.findOne({where:{id}})
    }

    async updateEmployee(name:string ,employee): Promise<Employee>{
        await this.employeesRepository.update(name,employee);
        return this.employeesRepository.findOne({where:{name}})
    }

}
