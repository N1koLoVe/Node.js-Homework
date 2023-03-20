import BlogModel from "./blog-model.js";

const blogsModel = new BlogModel();

class BlogController {
  async getAllBlogs() {
    const listenBlogs = await blogsModel.getAllBlogs();

    return listenBlogs;
  }

  async createBlog(title, body, author, tags) {
    await blogsModel.createBlog(title, body, author, tags);
  }

  async blogDelete(id) {
    const deleteBlog = await blogsModel.blogDelete(id);
    return deleteBlog;
  }

  async blogEdit(id, title, body, tags) {
    const editedBlog = await blogsModel.blogEdit(id, title, body, tags);

    return editedBlog;
  }
}

export default BlogController;
