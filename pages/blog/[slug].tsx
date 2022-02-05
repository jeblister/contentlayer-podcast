import Head from 'next/head';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { format, parseISO } from 'date-fns'
import components from '/components/MDXComponents';
import { allPosts } from '.contentlayer/data';
import type { Post } from '.contentlayer/types';
import Link from 'next/link';

export default function Post({ post }: { post: Post }) {
const Component = useMDXComponent(post.body.code);
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
        <div >
          <h1 >{post.title}</h1>
          <time dateTime={post.date}>
             {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
        </div>
             <Component
        components={
          {
            ...components
          } as any
        }
      />
      </article>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: allPosts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = allPosts.find((post) => post.slug === params.slug);

  return { props: { post} };
}
