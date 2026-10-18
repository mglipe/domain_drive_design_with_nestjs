import { AppModule } from "@/app/app.module";
import { DatabaseModule } from "@/libs/infra/database/database.module";
import { Type } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";


export interface TestApplicationSetupOptions{
    imports?: Type<unknown>[]
}

export async function creatingTestApp(option:TestApplicationSetupOptions = {}){
    
    const additionalImports: Type<unknown>[] = option.imports ?? [];
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports:[
            AppModule,
         ...additionalImports],
         
    }).compile()
    
    const app = moduleFixture.createNestApplication();
    await app.init();
    return app;
} 