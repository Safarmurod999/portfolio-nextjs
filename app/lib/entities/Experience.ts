import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("experience")
export class Experience {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  company!: string;

  @Column({ type: "date"})
  date!: string;

  @Column({ type: "text" })
  jobTitle!: string;

  @Column({ type: "boolean", default: true })
  active!: boolean;
}
