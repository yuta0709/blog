import Link from "next/link";
import { FC } from "react";
import { type Article } from "../lib/articles";

type Props = {
  article: Article;
};

const ArticlePreview: FC<Props> = ({ article }) => {
  return (
    <a href={`/${article.slug}`} className="no-underline">
      <div className="py-8">
        <div className="text-slate-900">{article.title}</div>
        <div className="text-slate-600">{article.date}</div>
      </div>
    </a>
  );
};

export default ArticlePreview;
