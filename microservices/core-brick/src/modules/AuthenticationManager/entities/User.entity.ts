import { AudibleEntity } from 'primebrick-sdk/orm';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './Role.entity';

@Entity()
export class User extends AudibleEntity {
    @Column({ unique: true })
    code: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    languageCode: string;

    @ManyToMany(() => Role, (T) => T.users, { eager: true })
    @JoinTable()
    roles: Role[];
}
