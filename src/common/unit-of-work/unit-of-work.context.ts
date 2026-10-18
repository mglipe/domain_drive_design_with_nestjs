import { AsyncLocalStorage } from "node:async_hooks";
import { EntityManager } from "typeorm";

export class TransactionContext{
    private static storage = new AsyncLocalStorage<EntityManager>()
    
    public static run<T>(manager: EntityManager, fn:()=> Promise<T>):Promise<T>{
        return this.storage.run(manager, fn);
    }

    public static getManager(): EntityManager | undefined{
        return this.storage.getStore();
    }
}
