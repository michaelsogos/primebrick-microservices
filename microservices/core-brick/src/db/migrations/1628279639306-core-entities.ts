import { MigrationInterface, QueryRunner } from 'typeorm';

export class coreEntities1628279639306 implements MigrationInterface {
    name = 'coreEntities1628279639306';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core_role_meta_menu_item" DROP CONSTRAINT "FK_c87415cb488a258d04ef3c0eec5"`);
        await queryRunner.query(`ALTER TABLE "core_role_meta_menu_item" DROP CONSTRAINT "FK_001511862c0263624c4084be1a8"`);
        await queryRunner.query(`ALTER TABLE "core_user_role" DROP CONSTRAINT "FK_46a84908e7c7164772b9d0d328c"`);
        await queryRunner.query(`ALTER TABLE "core_user_role" DROP CONSTRAINT "FK_065055b5b8cd8eb8da318fb3346"`);
        await queryRunner.query(`ALTER TABLE "core_meta_menu_item_closure" DROP CONSTRAINT "FK_4966e18119bf29edc170fa1c98e"`);
        await queryRunner.query(`ALTER TABLE "core_meta_menu_item_closure" DROP CONSTRAINT "FK_e50509265ad369eb0f6004ed4ab"`);
        await queryRunner.query(
            `ALTER TABLE "core_role_meta_menu_item" ADD CONSTRAINT "FK_c87415cb488a258d04ef3c0eec5" FOREIGN KEY ("role_id") REFERENCES "core_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "core_role_meta_menu_item" ADD CONSTRAINT "FK_001511862c0263624c4084be1a8" FOREIGN KEY ("meta_menu_item_id") REFERENCES "core_meta_menu_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "core_user_role" ADD CONSTRAINT "FK_46a84908e7c7164772b9d0d328c" FOREIGN KEY ("user_id") REFERENCES "core_user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "core_user_role" ADD CONSTRAINT "FK_065055b5b8cd8eb8da318fb3346" FOREIGN KEY ("role_id") REFERENCES "core_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "core_meta_menu_item_closure" ADD CONSTRAINT "FK_4966e18119bf29edc170fa1c98e" FOREIGN KEY ("id_ancestor") REFERENCES "core_meta_menu_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "core_meta_menu_item_closure" ADD CONSTRAINT "FK_e50509265ad369eb0f6004ed4ab" FOREIGN KEY ("id_descendant") REFERENCES "core_meta_menu_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(`CREATE VIEW "core_meta_translation_group" AS SELECT DISTINCT "group" FROM core_meta_translation`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`, [
            'VIEW',
            'public',
            'core_meta_translation_group',
            'SELECT DISTINCT "group" FROM core_meta_translation',
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "schema" = $2 AND "name" = $3`, [
            'VIEW',
            'public',
            'core_meta_translation_group',
        ]);
        await queryRunner.query(`DROP VIEW "core_meta_translation_group"`);
        await queryRunner.query(`ALTER TABLE "core_meta_menu_item_closure" DROP CONSTRAINT "FK_e50509265ad369eb0f6004ed4ab"`);
        await queryRunner.query(`ALTER TABLE "core_meta_menu_item_closure" DROP CONSTRAINT "FK_4966e18119bf29edc170fa1c98e"`);
        await queryRunner.query(`ALTER TABLE "core_user_role" DROP CONSTRAINT "FK_065055b5b8cd8eb8da318fb3346"`);
        await queryRunner.query(`ALTER TABLE "core_user_role" DROP CONSTRAINT "FK_46a84908e7c7164772b9d0d328c"`);
        await queryRunner.query(`ALTER TABLE "core_role_meta_menu_item" DROP CONSTRAINT "FK_001511862c0263624c4084be1a8"`);
        await queryRunner.query(`ALTER TABLE "core_role_meta_menu_item" DROP CONSTRAINT "FK_c87415cb488a258d04ef3c0eec5"`);
        await queryRunner.query(
            `ALTER TABLE "core_meta_menu_item_closure" ADD CONSTRAINT "FK_e50509265ad369eb0f6004ed4ab" FOREIGN KEY ("id_descendant") REFERENCES "core_meta_menu_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "core_meta_menu_item_closure" ADD CONSTRAINT "FK_4966e18119bf29edc170fa1c98e" FOREIGN KEY ("id_ancestor") REFERENCES "core_meta_menu_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "core_user_role" ADD CONSTRAINT "FK_065055b5b8cd8eb8da318fb3346" FOREIGN KEY ("role_id") REFERENCES "core_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "core_user_role" ADD CONSTRAINT "FK_46a84908e7c7164772b9d0d328c" FOREIGN KEY ("user_id") REFERENCES "core_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "core_role_meta_menu_item" ADD CONSTRAINT "FK_001511862c0263624c4084be1a8" FOREIGN KEY ("meta_menu_item_id") REFERENCES "core_meta_menu_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "core_role_meta_menu_item" ADD CONSTRAINT "FK_c87415cb488a258d04ef3c0eec5" FOREIGN KEY ("role_id") REFERENCES "core_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }
}
