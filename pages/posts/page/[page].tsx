import Pagination from '@/components/Pagination/Pagination';
import SinglePost from '@/components/Post/SinglePost';
import { getNumbersOfPages, getPostsByPage } from '@/lib/notionAPI';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';

export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPage = await getNumbersOfPages();
  let params = [];
  for (let i = 0; i < numberOfPage; i++) {
    params.push({ params: { page: i.toString() } });
  }

  return {
    paths: params,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page;
  const postsByPage = await getPostsByPage(parseInt(currentPage.toString(), 10));
  const numberOfPage = await getNumbersOfPages();

  return {
    props: {
      postsByPage,
      numberOfPage,
    },
    revalidate: 60 * 60 * 6,
  };
};

const inter = Inter({ subsets: ['latin'] });

const BlogPageList = ({ postsByPage, numberOfPage }) => {
  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">Notion Blog🚀</h1>
        <section className="sm: grid grid-cols-2 w-5/6 gap-3 mx-auto">
          {postsByPage.map((post, index) => (
            <div key={post.id}>
              <SinglePost title={post.title} description={post.description} date={post.date} tags={post.tags} slug={post.slug} isPaginationPage={true} />
            </div>
          ))}
        </section>
        <Pagination numberOfPage={numberOfPage} />
      </main>
    </div>
  );
};

export default BlogPageList;