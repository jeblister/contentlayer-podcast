import Head from "next/head";
import Link from "next/link";
import { format, parseISO } from "date-fns";

import { InferGetStaticPropsType } from "next";
import type { Podcast } from ".contentlayer/types";
import { supabase } from "lib/supabaseClient";

export async function getStaticProps() {
  const { data: posts, error } = await supabase.from("podcasts").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return { props: { posts } };
}

function PostCard(post: Podcast) {
  return (
    <div>
      <time dateTime={post.date}>
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
      <h2>
        <Link href={`/podcasts/${post.id}`}>
          <a>{post.title}</a>
        </Link>
      </h2>
    </div>
  );
}

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const user = supabase.auth.user();
  console.log(user);
  return (
    <div>
      <Head>
        <title> Podcast Example</title>
      </Head>

      <h1> Podcasts articles from Supabase</h1>

      {posts.map((post: Podcast, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
}
