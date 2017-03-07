import {Post} from "./Post";
import {SingleEntityChild, Column, Entity} from "typeorm";

@SingleEntityChild()
export class Article extends Post {

  @Column("string")
  private publisher: string;

  constructor(content: string, description: string, publisher: string) {
    super(content, description);
    this.publisher = publisher;
  }

  public setPublisher(publisher: string): void {
    this.publisher = publisher;
  }

  public getPublisher(): string {
    return this.publisher;
  }

}
