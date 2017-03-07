import {Request, Response} from "express";

export class SiteController {

  public index(req: Request, res: Response): void {
    res.render("index", {title: "Express"});
  }

}
