import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";
import { AdUnit } from "@/app/(components)/AdUnit";

type PostMeta = {
  title: string;
  date: string;
  excerpt?: string;
  slug: string;
};

function getPosts(): PostMeta[] {
  const postsDir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  const posts: PostMeta[] = files.map((file) => {
    const full = fs.readFileSync(path.join(postsDir, file), "utf8");
    const { data } = matter(full);
    const slug = file.replace(/\.md$/, "");
    return {
      title: data.title ?? slug,
      date: data.date ?? new Date().toISOString(),
      excerpt: data.excerpt ?? "",
      slug,
    } as PostMeta;
  });
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogPage() {
  const posts = getPosts();
  return (
    <div className="grid gap-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
        <p className="text-sm text-gray-600">Guides, tutorials, and opinions.</p>
      </header>

      <div className="w-full">
        <AdUnit client="ca-pub-9965673213249465" slot="8407760945" format="auto" fullWidth />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post.slug} className="group rounded-xl border p-5 hover:shadow-md transition-shadow bg-white">
            <h3 className="font-semibold leading-snug text-gray-900 group-hover:underline">
              <Link href={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
            </h3>
            {post.excerpt && <p className="mt-2 text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>}
            <div className="mt-3 text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</div>
          </article>
        ))}
      </section>
    </div>
  );
}

// ads handled via AdUnit client component


