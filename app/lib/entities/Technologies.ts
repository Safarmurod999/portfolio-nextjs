import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("technologies")
export class Technologies {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  icon!: string;

  @Column({ type: "integer", nullable: true })
  category_id!: number;

  @Column({ type: "boolean", default: true })
  active!: boolean;
}
