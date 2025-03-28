import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("categories")
export class Categories {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "boolean", default: true })
  active!: boolean;
}
