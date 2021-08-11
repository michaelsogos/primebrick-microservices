import { MigrationInterface, QueryRunner } from 'typeorm';

//@mso -> Manually generated because of an issue on typeorm when create patch for the first time for a view
export class coreEntities1628279639305 implements MigrationInterface {
    name = 'coreEntities1628279639305';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "typeorm_metadata" ("type" varchar(255) NOT NULL, "database" varchar(255) DEFAULT NULL, "schema" varchar(255) DEFAULT NULL, "table" varchar(255) DEFAULT NULL, "name" varchar(255) DEFAULT NULL, "value" text)`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "typeorm_metadata"`);
    }
}
