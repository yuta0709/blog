import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

export type Article = {
  title: string;
  content: string;
  date: string;
  slug: string;
};

export const getArticleBySlug = (slug: string) => {
  const articleFile = fs.readFileSync(
    join(process.cwd(), "articles", slug + ".md")
  );
  const parsedArticle = matter(articleFile);
  return {
    title: parsedArticle.data["title"],
    date: parsedArticle.data["date"],
    slug: slug,
    content: parsedArticle.content,
  };
};

export const getArticleByFileName = (name: string) => {
  const articleFile = fs.readFileSync(join(process.cwd(), "articles", name));
  const parsedArticle = matter(articleFile);
  return {
    title: parsedArticle.data["title"],
    date: parsedArticle.data["date"],
    slug: name.slice(0, name.length - 3),
    content: parsedArticle.content,
  };
};
export const getArticles = () => {
  const slugs = fs.readdirSync(join(process.cwd(), "articles"));
  return slugs
    .map((s) => getArticleByFileName(s))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
};
