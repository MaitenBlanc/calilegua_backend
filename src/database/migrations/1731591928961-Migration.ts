import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731591928961 implements MigrationInterface {
    name = 'Migration1731591928961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fabricante" ADD CONSTRAINT "UQ_86a08872e8e5ca25e9a069145e2" UNIQUE ("nombre")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fabricante" DROP CONSTRAINT "UQ_86a08872e8e5ca25e9a069145e2"`);
    }

}
