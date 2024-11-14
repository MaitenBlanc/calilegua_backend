import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731586953645 implements MigrationInterface {
    name = 'Migration1731586953645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_460198c94e3236de9fae95451e4"`);
        await queryRunner.query(`ALTER TABLE "operador" DROP CONSTRAINT "FK_58bd4b710f38bcd7d9af37e0355"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c3bdec19983950497f2ff61589"`);
        await queryRunner.query(`ALTER TABLE "producto" RENAME COLUMN "fabricante_id" TO "fabricanteId"`);
        await queryRunner.query(`ALTER TABLE "operador" RENAME COLUMN "customer_id" TO "compradorId"`);
        await queryRunner.query(`ALTER TABLE "fabricante" ADD CONSTRAINT "UQ_86a08872e8e5ca25e9a069145e2" UNIQUE ("nombre")`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5" FOREIGN KEY ("fabricanteId") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operador" ADD CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75" FOREIGN KEY ("compradorId") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operador" DROP CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5"`);
        await queryRunner.query(`ALTER TABLE "fabricante" DROP CONSTRAINT "UQ_86a08872e8e5ca25e9a069145e2"`);
        await queryRunner.query(`ALTER TABLE "operador" RENAME COLUMN "compradorId" TO "customer_id"`);
        await queryRunner.query(`ALTER TABLE "producto" RENAME COLUMN "fabricanteId" TO "fabricante_id"`);
        await queryRunner.query(`CREATE INDEX "IDX_c3bdec19983950497f2ff61589" ON "producto" ("precio") `);
        await queryRunner.query(`ALTER TABLE "operador" ADD CONSTRAINT "FK_58bd4b710f38bcd7d9af37e0355" FOREIGN KEY ("customer_id") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_460198c94e3236de9fae95451e4" FOREIGN KEY ("fabricante_id") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
