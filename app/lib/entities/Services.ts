import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categories } from "./Categories";

@Entity("services")
export class Services {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @ManyToOne(() => Categories, (category) => category.id)
  @JoinColumn({ name: "category_id" })
  category!: Categories;

  @Column({ type: "boolean", default: true })
  active!: boolean;
}
