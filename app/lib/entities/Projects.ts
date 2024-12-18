import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  title!: string;

  @Column({ type: "varchar", length: 100 })
  description!: string;

  @Column({ type: "varchar", length: 100 })
  link!: string;

  @Column({ type: "varchar", length: 100 })
  image!: string;

  @Column({ type: "integer", nullable: false })
  category_id!: number;

  @Column({ type: "varchar", nullable: false })
  technologies!: [number];
}
