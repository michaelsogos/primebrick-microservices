import { MigrationInterface, QueryRunner } from 'typeorm';

export class coreEntities1603532993872 implements MigrationInterface {
    name = 'coreEntities1603532993872';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "core_meta_menu_item" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer NOT NULL, "deleted_on" TIMESTAMP, "deleted_by" integer, "version" integer NOT NULL, "label_key" character varying NOT NULL, "icon" character varying, "color" character varying, "view_name" character varying, "order_priority" integer NOT NULL, "parent_id" integer, CONSTRAINT "PK_f3293f9322aacd48027b3051395" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "core_role" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer NOT NULL, "deleted_on" TIMESTAMP, "deleted_by" integer, "version" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_189932a974fc76be320b6d16bf6" UNIQUE ("name"), CONSTRAINT "PK_c78d7574f0884b12420a7053b29" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "core_user" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer NOT NULL, "deleted_on" TIMESTAMP, "deleted_by" integer, "version" integer NOT NULL, "code" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_f66dd983ac0989f4a629f9473f2" UNIQUE ("code"), CONSTRAINT "PK_3b382517105438c9eccd2d59f8e" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "core_login" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer NOT NULL, "deleted_on" TIMESTAMP, "deleted_by" integer, "version" integer NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "user_id" integer, CONSTRAINT "UQ_29b9683a20a755373655fa1a895" UNIQUE ("username"), CONSTRAINT "REL_d7e476da5fde0741eee605449f" UNIQUE ("user_id"), CONSTRAINT "PK_b76b2037f43fc63755abd7113a3" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "core_meta_translation" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer NOT NULL, "deleted_on" TIMESTAMP, "deleted_by" integer, "version" integer NOT NULL, "key" character varying NOT NULL, "language_code" character varying NOT NULL, "value" character varying NOT NULL, "is_template" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_dc068cb5530e625db28f2a53af1" UNIQUE ("key", "language_code"), CONSTRAINT "PK_21aba069a503d5cfb41833f0bc6" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "core_role_meta_menu_item" ("role_id" integer NOT NULL, "meta_menu_item_id" integer NOT NULL, CONSTRAINT "PK_364d666ab82c4f89567891e2563" PRIMARY KEY ("role_id", "meta_menu_item_id"))`,
        );
        await queryRunner.query(`CREATE INDEX "IDX_c87415cb488a258d04ef3c0eec" ON "core_role_meta_menu_item" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_001511862c0263624c4084be1a" ON "core_role_meta_menu_item" ("meta_menu_item_id") `);
        await queryRunner.query(
            `CREATE TABLE "core_user_role" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_8a4fa0dfed8248793e839f69e39" PRIMARY KEY ("user_id", "role_id"))`,
        );
        await queryRunner.query(`CREATE INDEX "IDX_46a84908e7c7164772b9d0d328" ON "core_user_role" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_065055b5b8cd8eb8da318fb334" ON "core_user_role" ("role_id") `);
        await queryRunner.query(
            `CREATE TABLE "core_meta_menu_item_closure" ("id_ancestor" integer NOT NULL, "id_descendant" integer NOT NULL, CONSTRAINT "PK_70c7e9c092171aa092668be8b6f" PRIMARY KEY ("id_ancestor", "id_descendant"))`,
        );
        await queryRunner.query(`CREATE INDEX "IDX_4966e18119bf29edc170fa1c98" ON "core_meta_menu_item_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_e50509265ad369eb0f6004ed4a" ON "core_meta_menu_item_closure" ("id_descendant") `);
        await queryRunner.query(
            `ALTER TABLE "core_meta_menu_item" ADD CONSTRAINT "FK_fc688ef05b8d17b045ca6ca1601" FOREIGN KEY ("parent_id") REFERENCES "core_meta_menu_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "core_login" ADD CONSTRAINT "FK_d7e476da5fde0741eee605449f4" FOREIGN KEY ("user_id") REFERENCES "core_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "core_role_meta_menu_item" ADD CONSTRAINT "FK_c87415cb488a258d04ef3c0eec5" FOREIGN KEY ("role_id") REFERENCES "core_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "core_role_meta_menu_item" ADD CONSTRAINT "FK_001511862c0263624c4084be1a8" FOREIGN KEY ("meta_menu_item_id") REFERENCES "core_meta_menu_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "core_user_role" ADD CONSTRAINT "FK_46a84908e7c7164772b9d0d328c" FOREIGN KEY ("user_id") REFERENCES "core_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "core_user_role" ADD CONSTRAINT "FK_065055b5b8cd8eb8da318fb3346" FOREIGN KEY ("role_id") REFERENCES "core_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "core_meta_menu_item_closure" ADD CONSTRAINT "FK_4966e18119bf29edc170fa1c98e" FOREIGN KEY ("id_ancestor") REFERENCES "core_meta_menu_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "core_meta_menu_item_closure" ADD CONSTRAINT "FK_e50509265ad369eb0f6004ed4ab" FOREIGN KEY ("id_descendant") REFERENCES "core_meta_menu_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
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
        await queryRunner.query(`ALTER TABLE "core_meta_view" ADD CONSTRAINT "UQ_ab963a64be999f260b0c2e57821" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "core_meta_translation" ADD "group" character varying`);
        await queryRunner.query(`ALTER TABLE "core_user" ADD "language_code" character varying`);
        await queryRunner.query(`ALTER TABLE "core_user" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core_meta_menu_item" ADD "import_id" character varying`);
        await queryRunner.query(`ALTER TABLE "core_meta_menu_item" ADD CONSTRAINT "UQ_5e1104688c48e8e3a7fb327daec" UNIQUE ("import_id")`);
        await queryRunner.query(`ALTER TABLE "core_meta_menu_item" ADD "imported_on" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "core_meta_menu_item" ADD "imported_by" integer`);
        await queryRunner.query(`ALTER TABLE "core_role" ADD "import_id" character varying`);
        await queryRunner.query(`ALTER TABLE "core_role" ADD CONSTRAINT "UQ_0307577fceccfecb0925323b9e5" UNIQUE ("import_id")`);
        await queryRunner.query(`ALTER TABLE "core_role" ADD "imported_on" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "core_role" ADD "imported_by" integer`);
        await queryRunner.query(`ALTER TABLE "core_user" ADD "import_id" character varying`);
        await queryRunner.query(`ALTER TABLE "core_user" ADD CONSTRAINT "UQ_8690812297bb785912483940f27" UNIQUE ("import_id")`);
        await queryRunner.query(`ALTER TABLE "core_user" ADD "imported_on" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "core_user" ADD "imported_by" integer`);
        await queryRunner.query(`ALTER TABLE "core_login" ADD "import_id" character varying`);
        await queryRunner.query(`ALTER TABLE "core_login" ADD CONSTRAINT "UQ_7acb5dfaf6d451ebdd31178e7ba" UNIQUE ("import_id")`);
        await queryRunner.query(`ALTER TABLE "core_login" ADD "imported_on" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "core_login" ADD "imported_by" integer`);
        await queryRunner.query(`ALTER TABLE "core_meta_translation" ADD "import_id" character varying`);
        await queryRunner.query(`ALTER TABLE "core_meta_translation" ADD CONSTRAINT "UQ_5e307c6bb56351d2f9c33a94b28" UNIQUE ("import_id")`);
        await queryRunner.query(`ALTER TABLE "core_meta_translation" ADD "imported_on" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "core_meta_translation" ADD "imported_by" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core_meta_translation" DROP COLUMN "imported_by"`);
        await queryRunner.query(`ALTER TABLE "core_meta_translation" DROP COLUMN "imported_on"`);
        await queryRunner.query(`ALTER TABLE "core_meta_translation" DROP CONSTRAINT "UQ_5e307c6bb56351d2f9c33a94b28"`);
        await queryRunner.query(`ALTER TABLE "core_meta_translation" DROP COLUMN "import_id"`);
        await queryRunner.query(`ALTER TABLE "core_login" DROP COLUMN "imported_by"`);
        await queryRunner.query(`ALTER TABLE "core_login" DROP COLUMN "imported_on"`);
        await queryRunner.query(`ALTER TABLE "core_login" DROP CONSTRAINT "UQ_7acb5dfaf6d451ebdd31178e7ba"`);
        await queryRunner.query(`ALTER TABLE "core_login" DROP COLUMN "import_id"`);
        await queryRunner.query(`ALTER TABLE "core_user" DROP COLUMN "imported_by"`);
        await queryRunner.query(`ALTER TABLE "core_user" DROP COLUMN "imported_on"`);
        await queryRunner.query(`ALTER TABLE "core_user" DROP CONSTRAINT "UQ_8690812297bb785912483940f27"`);
        await queryRunner.query(`ALTER TABLE "core_user" DROP COLUMN "import_id"`);
        await queryRunner.query(`ALTER TABLE "core_role" DROP COLUMN "imported_by"`);
        await queryRunner.query(`ALTER TABLE "core_role" DROP COLUMN "imported_on"`);
        await queryRunner.query(`ALTER TABLE "core_role" DROP CONSTRAINT "UQ_0307577fceccfecb0925323b9e5"`);
        await queryRunner.query(`ALTER TABLE "core_role" DROP COLUMN "import_id"`);
        await queryRunner.query(`ALTER TABLE "core_meta_menu_item" DROP COLUMN "imported_by"`);
        await queryRunner.query(`ALTER TABLE "core_meta_menu_item" DROP COLUMN "imported_on"`);
        await queryRunner.query(`ALTER TABLE "core_meta_menu_item" DROP CONSTRAINT "UQ_5e1104688c48e8e3a7fb327daec"`);
        await queryRunner.query(`ALTER TABLE "core_meta_menu_item" DROP COLUMN "import_id"`);
        await queryRunner.query(`ALTER TABLE "core_user" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core_user" DROP COLUMN "language_code"`);
        await queryRunner.query(`ALTER TABLE "core_meta_translation" DROP COLUMN "group"`);
        await queryRunner.query(`ALTER TABLE "core_meta_view" DROP CONSTRAINT "UQ_ab963a64be999f260b0c2e57821"`);
        await queryRunner.query(`ALTER TABLE "core_meta_view" DROP COLUMN "imported_by"`);
        await queryRunner.query(`ALTER TABLE "core_meta_view" DROP COLUMN "imported_on"`);
        await queryRunner.query(`ALTER TABLE "core_meta_view" DROP CONSTRAINT "UQ_d9c791bc00c31b86ded99e82794"`);
        await queryRunner.query(`ALTER TABLE "core_meta_view" DROP COLUMN "import_id"`);
        await queryRunner.query(`DROP TABLE "core_meta_view"`);
        await queryRunner.query(`DROP TABLE "core_meta_brick"`);
        await queryRunner.query(`ALTER TABLE "core_meta_menu_item_closure" DROP CONSTRAINT "FK_e50509265ad369eb0f6004ed4ab"`);
        await queryRunner.query(`ALTER TABLE "core_meta_menu_item_closure" DROP CONSTRAINT "FK_4966e18119bf29edc170fa1c98e"`);
        await queryRunner.query(`ALTER TABLE "core_user_role" DROP CONSTRAINT "FK_065055b5b8cd8eb8da318fb3346"`);
        await queryRunner.query(`ALTER TABLE "core_user_role" DROP CONSTRAINT "FK_46a84908e7c7164772b9d0d328c"`);
        await queryRunner.query(`ALTER TABLE "core_role_meta_menu_item" DROP CONSTRAINT "FK_001511862c0263624c4084be1a8"`);
        await queryRunner.query(`ALTER TABLE "core_role_meta_menu_item" DROP CONSTRAINT "FK_c87415cb488a258d04ef3c0eec5"`);
        await queryRunner.query(`ALTER TABLE "core_login" DROP CONSTRAINT "FK_d7e476da5fde0741eee605449f4"`);
        await queryRunner.query(`ALTER TABLE "core_meta_menu_item" DROP CONSTRAINT "FK_fc688ef05b8d17b045ca6ca1601"`);
        await queryRunner.query(`DROP INDEX "IDX_e50509265ad369eb0f6004ed4a"`);
        await queryRunner.query(`DROP INDEX "IDX_4966e18119bf29edc170fa1c98"`);
        await queryRunner.query(`DROP TABLE "core_meta_menu_item_closure"`);
        await queryRunner.query(`DROP INDEX "IDX_065055b5b8cd8eb8da318fb334"`);
        await queryRunner.query(`DROP INDEX "IDX_46a84908e7c7164772b9d0d328"`);
        await queryRunner.query(`DROP TABLE "core_user_role"`);
        await queryRunner.query(`DROP INDEX "IDX_001511862c0263624c4084be1a"`);
        await queryRunner.query(`DROP INDEX "IDX_c87415cb488a258d04ef3c0eec"`);
        await queryRunner.query(`DROP TABLE "core_role_meta_menu_item"`);
        await queryRunner.query(`DROP TABLE "core_meta_translation"`);
        await queryRunner.query(`DROP TABLE "core_login"`);
        await queryRunner.query(`DROP TABLE "core_user"`);
        await queryRunner.query(`DROP TABLE "core_role"`);
        await queryRunner.query(`DROP TABLE "core_meta_menu_item"`);
    }
}
