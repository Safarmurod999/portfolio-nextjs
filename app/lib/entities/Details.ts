import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Services } from "./Services";

@Entity("service_details")
export class ServiceDetails {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @ManyToOne(() => Services, (service) => service.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "service_id" })
  service!: Services;

  @Column({ type: "boolean", default: true })
  active!: boolean;
}
