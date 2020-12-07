import {MigrationInterface, QueryRunner} from "typeorm";

export class erpBaseEntities1603619857857 implements MigrationInterface {
    name = 'erpBaseEntities1603619857857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "erp_base_business_unit_type" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer NOT NULL, "deleted_on" TIMESTAMP, "deleted_by" integer, "version" integer NOT NULL, "import_id" character varying, "imported_on" TIMESTAMP, "imported_by" integer, "name" character varying NOT NULL, "value" character varying NOT NULL, CONSTRAINT "UQ_52ecde66df4d72df1e76199a89e" UNIQUE ("import_id"), CONSTRAINT "UQ_57807d82830f9f51a5b25cf6073" UNIQUE ("name", "value"), CONSTRAINT "PK_7200484c70491e5813f989f4d10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "erp_base_company" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer NOT NULL, "deleted_on" TIMESTAMP, "deleted_by" integer, "version" integer NOT NULL, "import_id" character varying, "imported_on" TIMESTAMP, "imported_by" integer, "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_e11ec40c59e136d75ff0a57c458" UNIQUE ("import_id"), CONSTRAINT "UQ_5c0cfd50a661afbb7efa0e3ab0f" UNIQUE ("code"), CONSTRAINT "PK_f82456b994c702208878b0a1396" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "erp_base_business_unit" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer NOT NULL, "deleted_on" TIMESTAMP, "deleted_by" integer, "version" integer NOT NULL, "import_id" character varying, "imported_on" TIMESTAMP, "imported_by" integer, "code" character varying NOT NULL, "name" character varying NOT NULL, "business_unit_type_id" integer, "company_id" integer, CONSTRAINT "UQ_abe900a6a7dfa6b15699dc2625a" UNIQUE ("import_id"), CONSTRAINT "UQ_b7ee57e576c3e24c6c187661e48" UNIQUE ("code"), CONSTRAINT "PK_5631a6ec4521380943b2c33c33f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "erp_base_business_unit" ADD CONSTRAINT "FK_f7e814bc500c47ba31a1191d806" FOREIGN KEY ("business_unit_type_id") REFERENCES "erp_base_business_unit_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "erp_base_business_unit" ADD CONSTRAINT "FK_d8a95dc68a6973dbe8ea68d570d" FOREIGN KEY ("company_id") REFERENCES "erp_base_company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "erp_base_business_unit" DROP CONSTRAINT "FK_d8a95dc68a6973dbe8ea68d570d"`);
        await queryRunner.query(`ALTER TABLE "erp_base_business_unit" DROP CONSTRAINT "FK_f7e814bc500c47ba31a1191d806"`);
        await queryRunner.query(`DROP TABLE "erp_base_business_unit"`);
        await queryRunner.query(`DROP TABLE "erp_base_company"`);
        await queryRunner.query(`DROP TABLE "erp_base_business_unit_type"`);
    }

}
