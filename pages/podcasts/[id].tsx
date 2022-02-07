import Head from "next/head";
import { format, parseISO } from "date-fns";

import Link from "next/link";
import { supabase } from "lib/supabaseClient";

export default function Post({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <div>
          <Link href="/podcasts">
            <a>Home</a>
          </Link>
        </div>

        <h1>{post.title}</h1>
        <time dateTime={post.date}>
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <br />
        <pre>{post.body}</pre>
      </article>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { data: post } = await supabase
    .from("podcasts")
    .select("*")
    .eq("id", params.id)
    .single();

  return { props: { post } };
}
