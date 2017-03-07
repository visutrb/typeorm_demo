import { Column, DiscriminatorColumn, PrimaryGeneratedColumn, TableInheritance, Entity } from "typeorm";

@Entity()
@TableInheritance("single-table")
@DiscriminatorColumn({name: "type", type: "string"})
export abstract class Post {

  @PrimaryGeneratedColumn("number")
  private id: number;

  @Column("string")
  private content: string;

  @Column("string")
  private description: string;

  constructor(content: string, description: string) {
    this.content = content;
    this.description = description;
  }

  public getId(): number {
    return this.id;
  }

  public setContent(content: string): void {
    this.content = content;
  }

  public getContent(): string {
    return this.content;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getDescription(): string {
    return this.description;
  }

  public getType(): string {
    return this.constructor.name;
  }

}
