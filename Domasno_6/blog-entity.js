import { v4 as uuid } from "uuid";

export class Blog {
  constructor(title, body, author, tags) {
    this.id = uuid();
    this.title = title;
    this.body = body;
    this.author = author;
    this.date = new Date().toLocaleString();
    this.tags = tags;
  }
}
