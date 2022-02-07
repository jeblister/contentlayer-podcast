import Link from "next/link";

export default function Nav() {
  return (
    <nav className="container-fluid">
      <ul>
        <Link href="/" passHref>
          <strong className="contrast">Brand</strong>
        </Link>
      </ul>
      <ul>
        <Link href="/blog" passHref>
          <a className="contrast" role="button" data-theme-switcher="auto">
            Blog
          </a>
        </Link>
        /
        <Link href="/podcasts" passHref>
          <a className="contrast" role="button" data-theme-switcher="auto">
            Podcasts
          </a>
        </Link>
      </ul>
    </nav>
  );
}
