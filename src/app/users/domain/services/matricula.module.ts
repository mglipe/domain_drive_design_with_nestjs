import { Module } from '@nestjs/common';
import { MatriculaService } from "./matricula-generator.service";

@Module({
  imports: [],
  providers: [
    MatriculaService,
  ],
  exports: [MatriculaService]
})
export class MatriculaModule {}