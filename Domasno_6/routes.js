import express from "express";
import BlogController from "./blog-controller.js";

const blogsController = new BlogController();
const blogRouter = express.Router();

blogRouter.get("/", async (req, res) => {
  const blogs = await blogsController.listBlogs();

  res.send(blogs);
});

blogRouter.post("/", async (req, res) => {
  const body = req.body;

  if (!body.title || !body.body || !body.author || !body.tags) {
    res.status(404).send({ message: "Invalid" });
    return;
  }
  await blogsController.createBlog(
    body.title,
    body.body,
    body.author,
    body.tags
  );

  res.status(201).send({ message: "Blog was created." });
});

blogRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, body, tags } = req.body;
  if (!title || !body || !tags) {
    res.status(404).send({ message: "Invalid body." });
    return;
  }
  const blogEdit = await blogsController.blogEdit(id, title, body, tags);

  if (blogEdit) {
    res.status(200).send({ message: `Blog with this id:${id} was patched` });
  } else {
    res.status(404).send({ message: `Blog with this id:${id} is not found` });
  }
});

blogRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const blogDelete = await blogsController.blogDelete(id);

  if (blogDelete) {
    res
      .status(200)
      .send({ message: `The blog with this id:${id} was deleted` });
  } else {
    res.status(404).send({ message: `Blog with this id:${id} was not found` });
  }
});

export default blogRouter;
