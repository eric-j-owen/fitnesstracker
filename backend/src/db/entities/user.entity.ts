import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  /*
   id serial primary key,
        first_name text not null,
        last_name text,
        username text not null unique,
        password_hash text not null,
        avatar_url text,
        user_role text check (user_role in ('basic', 'trainer')) default 'basic',
        target_protein int,
        target_carbs int,
        target_fats int,
        created_at timestamptz default current_timestamp,
        updated_at timestamptz default current_timestamp
  */
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text", name: "first_name" })
  firstName!: string;

  @Column({ type: "text", name: "last_name", nullable: true })
  lastName?: string;

  @Column({
    type: "enum",
    name: "user_role",
    enum: ["basic", "trainer"],
    default: "basic",
  })
  userRole!: "basic" | "trainer";

  @Column({ type: "text", unique: true })
  username!: string;

  @Column({ type: "text", name: "password_hash" })
  passwordHash!: string;

  @Column({ type: "text", name: "avatar_url", nullable: true })
  avatarUrl?: string;

  @Column({ type: "integer", name: "target_protein", nullable: true })
  targetProtein?: number;

  @Column({ type: "integer", name: "target_carbs", nullable: true })
  targetCarbs?: number;

  @Column({ type: "integer", name: "target_fats", nullable: true })
  targetFats?: number;

  @CreateDateColumn({
    type: "timestamptz",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;
}
