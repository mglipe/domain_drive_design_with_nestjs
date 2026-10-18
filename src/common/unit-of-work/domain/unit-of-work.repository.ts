export interface IUnitOfWorkRepository{
    transaction<T>(work: ()=>Promise<T>):Promise<T>
}

export const unitOfWorkRepository = Symbol.for('UnitOfWork')