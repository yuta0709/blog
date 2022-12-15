import type { InferGetStaticPropsType, NextPage } from "next";
import { getArticles } from "../lib/articles";
import ArticlePreview from "../components/ArticlePreview";

export const getStaticProps = async () => {
  const articles = getArticles();
  return {
    props: {
      articles,
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  articles,
}) => {
  return (
    <div className="container mx-auto">
      {articles.map((article) => {
        return (
          <div key={article.slug}>
            <ArticlePreview article={article}></ArticlePreview>
            <hr className="border-0 bg-gray-400 h-px" />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
