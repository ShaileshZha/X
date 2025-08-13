import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { AdUnit } from "@/app/(components)/AdUnit";

type Params = { params: { slug: string } };

function getPost(slug: string) {
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  return { data, content } as { data: any; content: string };
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  return files.map((f) => ({ slug: f.replace(/\.md$/, "") }));
}

export default async function BlogPostPage({ params }: Params) {
  const { data, content } = getPost(params.slug);
  const processed = await remark().use(html).process(content);
  const htmlContent = processed.toString();

  return (
    <article className="prose max-w-none">
      <h1 className="text-3xl font-semibold tracking-tight">{data.title}</h1>
      <p className="text-sm text-gray-500">{new Date(data.date ?? Date.now()).toLocaleDateString()}</p>

      <div className="my-6">
        <AdUnit client="ca-pub-9965673213249465" slot="3612080903" format="fluid" layout="in-article" />
      </div>

      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />

      <div className="mt-8">
        <AdUnit client="ca-pub-9965673213249465" slot="4987390684" format="autorelaxed" />
      </div>
    </article>
  );
}

// ads handled via AdUnit client component


