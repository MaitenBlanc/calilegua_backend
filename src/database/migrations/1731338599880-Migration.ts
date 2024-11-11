import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731338599880 implements MigrationInterface {
    name = 'Migration1731338599880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "producto_categories_categoria" ("productoId" integer NOT NULL, "categoriaId" integer NOT NULL, CONSTRAINT "PK_1f541ba7a724f791cc28e77bc8b" PRIMARY KEY ("productoId", "categoriaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_378e9254d1c752ff8ee27fe42a" ON "producto_categories_categoria" ("productoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c2fad05df2ff5f47ec39ce9abc" ON "producto_categories_categoria" ("categoriaId") `);
        await queryRunner.query(`ALTER TABLE "producto_categories_categoria" ADD CONSTRAINT "FK_378e9254d1c752ff8ee27fe42a4" FOREIGN KEY ("productoId") REFERENCES "producto"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "producto_categories_categoria" ADD CONSTRAINT "FK_c2fad05df2ff5f47ec39ce9abc3" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto_categories_categoria" DROP CONSTRAINT "FK_c2fad05df2ff5f47ec39ce9abc3"`);
        await queryRunner.query(`ALTER TABLE "producto_categories_categoria" DROP CONSTRAINT "FK_378e9254d1c752ff8ee27fe42a4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c2fad05df2ff5f47ec39ce9abc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_378e9254d1c752ff8ee27fe42a"`);
        await queryRunner.query(`DROP TABLE "producto_categories_categoria"`);
    }

}
