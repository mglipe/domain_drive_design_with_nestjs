import { randomUUID, UUID } from "crypto";
import { Code } from "./value-object/code.vo";
import { ForbiddenException } from "@nestjs/common";

export interface CreateBookInput{
  title: string;
  author: string;
  inventory: number;
}

export interface SearchBook{
  title: string;
  author:string;
}

export interface BookProps extends CreateBookInput{
  id: string,
  code: Code,
  create_at: Date,
  update_at: Date
}


export class BookEntity{
  constructor(
    public readonly id: UUID,
    public title: string,
    public author: string,
    public inventory: number,
    public readonly create_at: Date,
    public readonly code?: Code,
    public readonly update_at?: Date,
  ){}


  public static create(input: CreateBookInput): BookEntity{
    return new BookEntity(
      randomUUID(),
      input.title,
      input.author,
      input.inventory,
      new Date(),
      Code.generator(),
    )
  }


  public static fromProps(props: BookProps): BookEntity{
    return new BookEntity(
      props.id as UUID,
      props.title,
      props.author,
      props.inventory,
      props.create_at,
      props.code,
      props.update_at
    )
  }

  public hasInInventory(): void{
    if(this.inventory < 1){
      throw new ForbiddenException('Book is not available')
    }

    this.inventory -= 1;
  }

  public backToInventory(): void{
    this.inventory += 1;
  }


}