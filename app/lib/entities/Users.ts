import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  username!: string;

  @Column({ type: "varchar", length: 100 })
  password!: string;

  @Column({ type: "boolean", default: true })
  active!: boolean;
}
