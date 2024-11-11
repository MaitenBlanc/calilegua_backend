import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731335989315 implements MigrationInterface {
    name = 'Migration1731335989315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categoria_products_producto" ("categoriaId" integer NOT NULL, "productoId" integer NOT NULL, CONSTRAINT "PK_5e304c40db9348b260ae2d1e3ee" PRIMARY KEY ("categoriaId", "productoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_71ee024a6dc3a05b368d201b78" ON "categoria_products_producto" ("categoriaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1be2d207f9b7a3b7803f9ecee4" ON "categoria_products_producto" ("productoId") `);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categoria_products_producto" ADD CONSTRAINT "FK_71ee024a6dc3a05b368d201b780" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "categoria_products_producto" ADD CONSTRAINT "FK_1be2d207f9b7a3b7803f9ecee43" FOREIGN KEY ("productoId") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categoria_products_producto" DROP CONSTRAINT "FK_1be2d207f9b7a3b7803f9ecee43"`);
        await queryRunner.query(`ALTER TABLE "categoria_products_producto" DROP CONSTRAINT "FK_71ee024a6dc3a05b368d201b780"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "createAt"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1be2d207f9b7a3b7803f9ecee4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71ee024a6dc3a05b368d201b78"`);
        await queryRunner.query(`DROP TABLE "categoria_products_producto"`);
    }

}
