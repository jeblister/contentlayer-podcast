import Head from 'next/head'
import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts } from '.contentlayer/data'
import { pick } from "@contentlayer/client";


export function getStaticProps() {
  const posts =  allPosts
    .map((post) => pick(post, ['slug', 'title', 'summary', 'date']))
    .sort(
      (a, b) =>
        Number(new Date(b.date)) - Number(new Date(a.date))
    );

  return { props: { posts } };
}


function PostCard(post) {
  return (
    <div className="mb-6">
      <time dateTime={post.date} className="block text-sm text-gray-600">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <h2 className="text-lg">
        <Link href={`/blog/${post.slug}`}>
          <a className="text-blue-700 hover:text-blue-900">{post.title}</a>
        </Link>
      </h2>
    </div>
  )
}

export default function Home({ posts }) {
  return (
    <div className="max-w-2xl mx-auto py-16 text-center">
      <Head>
        <title>Contentlayer Blog Example</title>
      </Head>

      <h1 className="text-3xl font-bold mb-8">Contentlayer Blog Example</h1>

      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}