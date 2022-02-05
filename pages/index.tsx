import Head from 'next/head'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { allPodcasts } from '.contentlayer/data'
import { pick } from "@contentlayer/client"
import { InferGetStaticPropsType } from 'next'
import type { Podcast } from '.contentlayer/types';


export function getStaticProps() {
  const posts =  allPodcasts
    .map((post:Podcast) => pick(post, ['slug', 'title', 'summary', 'date']))
    .sort(
      (a:Podcast, b:Podcast) =>
        Number(new Date(b.date)) - Number(new Date(a.date))
    );

  return { props: { posts } };
}


function PostCard(post:Podcast) {
  return (
    <div>
      <time dateTime={post.date} >
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <h2>
        <Link href={`/blog/${post.slug}`}>
          <a>{post.title}</a>
        </Link>
      </h2>
    </div>
  )
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title> Podcast Example</title>
      </Head>

      <h1>Contentlayer Podcast Example</h1>

      {posts.map((post:Podcast, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}