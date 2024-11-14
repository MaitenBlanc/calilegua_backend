import {MigrationInterface, QueryRunner} from "typeorm";

export class relacionOperadorComprador1730497663240 implements MigrationInterface {
    name = 'relacionOperadorComprador1730497663240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "operador" ("id" SERIAL NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(50) NOT NULL, "role" character varying(50) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "compradorId" integer, CONSTRAINT "REL_9a6bd793b4f149fb11d8692ed7" UNIQUE ("compradorId"), CONSTRAINT "PK_6cd1ed38785b46d815458885dfd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comprador" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD "nombre" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comprador" DROP COLUMN "apellido"`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD "apellido" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comprador" DROP COLUMN "telefono"`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD "telefono" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "operador" ADD CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75" FOREIGN KEY ("compradorId") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operador" DROP CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75"`);
        await queryRunner.query(`ALTER TABLE "comprador" DROP COLUMN "telefono"`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD "telefono" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comprador" DROP COLUMN "apellido"`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD "apellido" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comprador" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD "nombre" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comprador" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "comprador" DROP COLUMN "createAt"`);
        await queryRunner.query(`DROP TABLE "operador"`);
    }

}
