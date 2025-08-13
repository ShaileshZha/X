import Link from "next/link";
import Image from "next/image";
import { fetchNews } from "@/lib/news";
import { AdUnit } from "@/app/(components)/AdUnit";

export default async function Home() {
  const headlines = await fetchNews(6);
  return (
    <div className="grid gap-12">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-950 via-gray-800 to-gray-700 text-white p-10 md:p-14">
        <div className="absolute inset-0 opacity-20" aria-hidden>
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Stay informed. Read better.</h1>
          <p className="mt-4 text-white/80 text-lg">Real-time news aggregation with clean long-form writing. Built for focus across devices.</p>
          <div className="mt-8 flex items-center gap-3">
            <Link href="/news" className="rounded-md bg-white text-gray-900 px-5 py-2.5 text-sm font-medium hover:bg-white/90">Latest News</Link>
            <Link href="/blog" className="rounded-md border border-white/30 px-5 py-2.5 text-sm font-medium hover:bg-white/10">Read the Blog</Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card href="/news" title="Trending News" image="/globe.svg" subtitle="Live from top publishers via RSS" />
        <Card href="/blog" title="Latest Posts" image="/file.svg" subtitle="In-depth guides and analysis" />
        <Card href="/about" title="About NXWS" image="/window.svg" subtitle="Mission, team, and ethos" />
      </section>

      <div className="w-full">
        <AdUnit client="ca-pub-9965673213249465" slot="8407760945" format="auto" fullWidth />
      </div>

      <section className="grid gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Top Headlines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {headlines.map((h, i) => (
            <a key={i} href={h.link ?? "#"} target="_blank" className="group rounded-2xl border overflow-hidden hover:shadow-md bg-white transition-shadow">
              {h.image && (
                <div className="relative aspect-[16/9] bg-gray-100">
                  <Image src={h.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 group-hover:underline">{h.title}</h3>
                {h.contentSnippet && <p className="mt-2 text-sm text-gray-600">{h.contentSnippet}</p>}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function Card({ href, title, subtitle, image }: { href: string; title: string; subtitle: string; image: string }) {
  return (
    <Link href={href} className="group rounded-xl border p-5 hover:border-gray-400 transition-colors">
      <div className="flex items-center gap-4">
        <Image src={image} alt="" width={32} height={32} className="opacity-80 group-hover:opacity-100" />
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}
