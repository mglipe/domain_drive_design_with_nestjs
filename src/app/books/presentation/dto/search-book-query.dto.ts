import { IsOptional, IsString } from "class-validator";

export class SearchBookQueryDto{
    @IsString()
    @IsOptional()
    title!: string;

    @IsString()
    @IsOptional()
    author!: string;
}