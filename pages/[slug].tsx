import type { InferGetStaticPropsType, NextPage } from "next";
import { getArticleBySlug, getArticles } from "../lib/articles";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

type Params = {
  params: {
    slug: string;
  };
};

const Article: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  article,
}) => {
  return (
    <article className="container mx-auto">
      <div className="text-center py-8">
        <div className="text-2xl md:text-4xl lg:text-6xl font-bold text-slate-900">
          {article.title}
        </div>
        <div className="text-slate-600 font-thin">{article.date}</div>
        <hr className="border-0 h-px bg-neutral-400" />
      </div>

      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        className={`mx-auto prose prose-smlg:prose-xl prose-slate
          prose-a:text-blue-400 
          prose-headings:text-blue-900
          prose-hr:border-0 prose-hr:bg-gray-400 prose-hr:h-px
          
          `}
      >
        {article.content}
      </ReactMarkdown>
    </article>
  );
};

export const getStaticProps = async ({ params }: Params) => {
  const article = getArticleBySlug(params.slug);
  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths = () => {
  const articles = getArticles();
  return {
    paths: articles.map((article) => {
      return { params: { slug: article.slug } };
    }),
    fallback: false,
  };
};

export default Article;
