import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        TodosController
    ],
    providers: [
        TodosService
    ]
})
export class TodosModule {}
