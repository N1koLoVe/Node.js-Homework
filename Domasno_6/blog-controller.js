import BlogModel from "./blog-model.js";

const blogsModel = new BlogModel();

class BlogController {
  async listBlogs() {
    const listenBlogs = await blogsModel.getAllBlogs();

    return listenBlogs;
  }

  async createBlog(title, body, author, tags) {
    await blogsModel.createBlog(title, body, author, tags);
  }
}

export default BlogController;
