import { MigrationInterface, QueryRunner } from 'typeorm';

export class coreEntities1603532993872 implements MigrationInterface {
    name = 'coreEntities1603532993872';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "core_meta_brick" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer NOT NULL, "deleted_on" TIMESTAMP, "deleted_by" integer, "version" integer NOT NULL, "import_id" character varying, "imported_on" TIMESTAMP, "imported_by" integer, "code" character varying NOT NULL, "description" character varying NOT NULL, "brick_version" character varying NOT NULL, "auto_install" boolean NOT NULL, CONSTRAINT "UQ_6ed73a2cf2f6ba88d2288f9e0cc" UNIQUE ("import_id"), CONSTRAINT "UQ_c7e58180cf694acc471c217af12" UNIQUE ("code"), CONSTRAINT "PK_03147f1fe1d08936bf814659617" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "core_meta_view" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer NOT NULL, "deleted_on" TIMESTAMP, "deleted_by" integer, "version" integer NOT NULL, "name" character varying NOT NULL, "definition" json NOT NULL, CONSTRAINT "PK_1abe2adc07876041d1ec72dad3d" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`ALTER TABLE "core_meta_view" ADD "import_id" character varying`);
        await queryRunner.query(`ALTER TABLE "core_meta_view" ADD CONSTRAINT "UQ_d9c791bc00c31b86ded99e82794" UNIQUE ("import_id")`);
        await queryRunner.query(`ALTER TABLE "core_meta_view" ADD "imported_on" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "core_meta_view" ADD "imported_by" integer`);
        await queryRunner.query(`ALTER TABLE "core_meta_view" ADD CONSTRAINT "UQ_ab963a64be999f260b0c2e57821" UNIQUE ("name")`);  }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core_meta_view" DROP CONSTRAINT "UQ_ab963a64be999f260b0c2e57821"`);
        await queryRunner.query(`ALTER TABLE "core_meta_view" DROP COLUMN "imported_by"`);
        await queryRunner.query(`ALTER TABLE "core_meta_view" DROP COLUMN "imported_on"`);
        await queryRunner.query(`ALTER TABLE "core_meta_view" DROP CONSTRAINT "UQ_d9c791bc00c31b86ded99e82794"`);
        await queryRunner.query(`ALTER TABLE "core_meta_view" DROP COLUMN "import_id"`);
        await queryRunner.query(`DROP TABLE "core_meta_view"`);
        await queryRunner.query(`DROP TABLE "core_meta_brick"`);
    }
}
