import { Request, Response } from "express";
import { EntityManager } from "typeorm";

import { OrmHelper } from "../../lib/OrmHelper";
import { Post } from "../model/Post";
import { Article } from "../model/Article";

export class PostsController {

  public index(req: Request, res: Response): void {
    let ormHelper: OrmHelper = OrmHelper.getInstance();
    let entityManager: EntityManager = ormHelper.getEntityManager();

    (async() => {

      let posts: Post[] = [];
      let articles: Article[] = await entityManager.find(Article);

      for (let article of articles) {
        posts.push(article);
      }

      res.render("posts/index", {posts: posts});

    })();
  }

  public show(req: Request, res: Response): void {
    let ormHelper: OrmHelper = OrmHelper.getInstance();
    let entityManager: EntityManager = ormHelper.getEntityManager();

    let id: number = req.params.id;
    (async() => {

      let post = await entityManager.findOneById(Post, id);
      res.send(post);

    })();
  }

  public create(req: Request, res: Response): void {
    let ormHelper: OrmHelper = OrmHelper.getInstance();
    let entityManager: EntityManager = ormHelper.getEntityManager();

    let content = req.body.post.content;
    let description = req.body.post.description;
    (async() => {

      let article: Article = new Article(content, description, "Local Publisher");
      article = await entityManager.persist(article);
      res.send(article);

    })();
  }

}
