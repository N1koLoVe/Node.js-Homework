import fs from "./fs.js";
import { Blog } from "./blog-entity.js";

class BlogModel {
  async getAllBlogs() {
    const rawBlog = await fs.readFile("./blog.json");
    const blogs = JSON.parse(rawBlog);
    return blogs;
  }

  async createBlog(title, body, author, tags) {
    const rawBlog = await fs.readFile("./blog.json");
    const blogs = JSON.parse(rawBlog);

    const blog = new Blog(title, body, author, tags);

    blogs.push(blog);

    await fs.writeFile("./blog.json", JSON.stringify(blogs, null, 2));
  }

  async blogEdit(id, title, body, tags) {
    const rawBlog = await fs.readFile("./blog.json");
    const blogs = JSON.parse(rawBlog);

    const index = blogs.findIndex((blog) => blog.id === id);

    if (index !== -1) {
      blogs[index].title = title;
      blogs[index].body = body;
      blogs[index].tags = tags;

      await fs.writeFile("./blog.json", JSON.stringify(blogs, null, 2));

      return true;
    } else {
      return false;
    }
  }

  async blogDelete(id) {
    const rawBlog = await fs.readFile("./blog.json");
    const blogs = JSON.parse(rawBlog);

    const blogFilter = blogs.filter((blog) => blog.id !== id);

    if (blogFilter.length !== blogs.length) {
      await fs.writeFile("./blog.json", JSON.stringify(blogFilter, null, 2));

      return true;
    } else {
      return false;
    }
  }
}

export default BlogModel;
