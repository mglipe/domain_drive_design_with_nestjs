import { TransactionContext } from "@/common/unit-of-work/unit-of-work.context"
import { IUnitOfWorkRepository } from "@/common/unit-of-work/domain/unit-of-work.repository"
import { InjectDataSource } from "@nestjs/typeorm"
import { DataSource } from "typeorm"

export class TypeormUnitOfWorkRepository implements IUnitOfWorkRepository{
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource
    ){}

    async transaction<T>(work: () => Promise<T>){
        return this.dataSource.transaction((manager)=>{
            return TransactionContext.run(manager, work)
        })
    }
}
