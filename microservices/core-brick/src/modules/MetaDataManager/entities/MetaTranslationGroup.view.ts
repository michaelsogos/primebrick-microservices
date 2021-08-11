import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    expression: `SELECT DISTINCT "group" FROM core_meta_translation`,
})
export class MetaTranslationGroup {
    @ViewColumn()
    group: string;
}
