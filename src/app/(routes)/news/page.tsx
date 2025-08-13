import Link from "next/link";
import Image from "next/image";
import { AdUnit } from "@/app/(components)/AdUnit";
import { fetchNews } from "@/lib/news";

export const revalidate = 900; // 15 minutes ISR

export default async function NewsPage() {
  const items = await fetchNews(30);
  return (
    <div className="grid gap-8">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Latest News</h1>
          <p className="text-sm text-gray-600">Updated every 15 minutes from multiple publishers.</p>
        </div>
      </header>

      <div className="w-full">
        <AdUnit client="ca-pub-9965673213249465" slot="6216711873" format="fluid" layoutKey="-6t+ed+2i-1n-4w" />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, idx) => (
          <article key={`${item.link}-${idx}`} className="group rounded-2xl border overflow-hidden bg-white hover:shadow-md transition-shadow">
            {item.image ? (
              <div className="relative aspect-[16/9] bg-gray-100">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="p-5">
              <h3 className="text-lg font-semibold leading-snug text-gray-900">
                <Link href={item.link ?? "#"} target="_blank" className="hover:underline">
                  {item.title}
                </Link>
              </h3>
              {item.contentSnippet && (
                <p className="mt-2 text-sm text-gray-600">{item.contentSnippet}</p>
              )}
              <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
                <span>{item.isoDate ? new Date(item.isoDate).toLocaleString() : null}</span>
                {/* @ts-ignore */}
                <span className="text-gray-400">{(item as any).source}</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="w-full">
        <AdUnit client="ca-pub-9965673213249465" slot="3612080903" format="fluid" layout="in-article" />
      </div>
    </div>
  );
}

// ads handled via AdUnit client component


