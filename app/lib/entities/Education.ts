import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Education {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "date"})
  date!: string;

  @Column({ type: "text" })
  place!: string;

  @Column({ type: "boolean", default: true })
  active!: boolean;
}
