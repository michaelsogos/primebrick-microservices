import {MigrationInterface, QueryRunner} from "typeorm";

export class coreEntities1607196206974 implements MigrationInterface {
    name = 'coreEntities1607196206974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core_meta_entity" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer NOT NULL, "deleted_on" TIMESTAMP, "deleted_by" integer, "version" integer NOT NULL, "import_id" character varying, "imported_on" TIMESTAMP, "imported_by" integer, "name" character varying NOT NULL, "brick_id" integer, CONSTRAINT "UQ_8d3816cb14bd2622788b186590b" UNIQUE ("import_id"), CONSTRAINT "UQ_b62a719be9483a0974da1579151" UNIQUE ("name"), CONSTRAINT "PK_de9ff23629af24b85a660b11f39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "core_meta_brick" ADD "module" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core_meta_entity" ADD CONSTRAINT "FK_aa245c4dc446dc0795fbc8d7e5f" FOREIGN KEY ("brick_id") REFERENCES "core_meta_brick"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core_meta_entity" DROP CONSTRAINT "FK_aa245c4dc446dc0795fbc8d7e5f"`);
        await queryRunner.query(`ALTER TABLE "core_meta_brick" DROP COLUMN "module"`);
        await queryRunner.query(`DROP TABLE "core_meta_entity"`);
    }

}
