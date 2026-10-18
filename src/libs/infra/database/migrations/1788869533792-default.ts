import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1788869533792 implements MigrationInterface {
    name = 'Default1788869533792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" character varying NOT NULL, "firstname" text NOT NULL, "email" text NOT NULL, "cpf" text NOT NULL, "matricula" text NOT NULL, "create_at" TIMESTAMP NOT NULL, "update_at" TIMESTAMP, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Book" ("id" character varying NOT NULL, "title" text NOT NULL, "author" text NOT NULL, "code" text NOT NULL, "inventory" integer NOT NULL, "create_at" TIMESTAMP NOT NULL, "update_at" TIMESTAMP, CONSTRAINT "PK_1cd110bae01e3fa29a83eeedba8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Borrow" ("id" character varying NOT NULL, "borrowed_at" TIMESTAMP NOT NULL, "dueDate" TIMESTAMP NOT NULL, "returned_at" TIMESTAMP, "status" text NOT NULL, "user_id" character varying NOT NULL, "book_id" character varying NOT NULL, CONSTRAINT "PK_6f2948a9b40cc15079e496cb349" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_982959988606c1f416d54b2626" ON "Borrow"  ("dueDate", "status") `);
        await queryRunner.query(`ALTER TABLE "Borrow" ADD CONSTRAINT "FK_a8b5466a606ae7c2e4bb3ac774c" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Borrow" ADD CONSTRAINT "FK_bab3ee5cceb79ec7d0b1b05d896" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Borrow" DROP CONSTRAINT "FK_bab3ee5cceb79ec7d0b1b05d896"`);
        await queryRunner.query(`ALTER TABLE "Borrow" DROP CONSTRAINT "FK_a8b5466a606ae7c2e4bb3ac774c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_982959988606c1f416d54b2626"`);
        await queryRunner.query(`DROP TABLE "Borrow"`);
        await queryRunner.query(`DROP TABLE "Book"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
