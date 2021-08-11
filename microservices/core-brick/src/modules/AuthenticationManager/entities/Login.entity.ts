import { AudibleEntity } from 'primebrick-sdk/orm';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Login extends AudibleEntity {
    @Column({ unique: true })
    username: string;

    @Column()
    password: string; //TODO: @mso-> save hashed password

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
