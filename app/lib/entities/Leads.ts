import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("leads")
export class Leads {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  fullname!: string;

  @Column({ type: "varchar", length: 100 })
  email!: string;

  @Column({ type: "text" })
  message!: string;

  @Column({ type: "boolean", default: true })
  active!: boolean;
}
