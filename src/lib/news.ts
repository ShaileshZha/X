import Parser from "rss-parser";

export type FeedItem = {
  title?: string;
  link?: string;
  isoDate?: string;
  contentSnippet?: string;
  image?: string | null;
  source?: string;
};

const FEEDS = [
  "https://feeds.bbci.co.uk/news/rss.xml",
  "https://www.aljazeera.com/xml/rss/all.xml",
  "https://www.theguardian.com/world/rss",
  "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
  "https://www.espn.com/espn/rss/news",
];

const parser = new Parser({
  headers: { "user-agent": "NXWS/1.0 (+https://example.com)" },
  customFields: {
    item: [
      ["media:content", "mediaContent", { keepArray: true }],
      ["media:thumbnail", "mediaThumbnail", { keepArray: true }],
      ["content:encoded", "contentEncoded"],
    ],
  },
});

export async function fetchNews(limit = 40): Promise<FeedItem[]> {
  const results = await Promise.allSettled(FEEDS.map((url) => parser.parseURL(url)));
  const items: FeedItem[] = [];
  const seen = new Set<string>();
  for (const r of results) {
    if (r.status === "fulfilled") {
      const sourceTitle = r.value.title ?? "";
      for (const it of r.value.items) {
        const title = it.title ?? "";
        const link = it.link ?? "#";
        const key = `${title}|${link}`;
        if (seen.has(key)) continue;
        seen.add(key);
        items.push({
          title,
          link,
          isoDate: it.isoDate,
          contentSnippet: (it as any).contentSnippet ?? "",
          image: extractImage(it as any) ?? null,
          source: sourceTitle,
        });
      }
    }
  }
  items.sort((a, b) => (new Date(b.isoDate ?? 0).getTime() - new Date(a.isoDate ?? 0).getTime()));
  return items.slice(0, limit);
}

function extractImage(item: any): string | null {
  // Common RSS image locations
  if (item.enclosure?.url) return item.enclosure.url as string;

  const mediaContent = item.mediaContent as any[] | undefined;
  if (Array.isArray(mediaContent) && mediaContent.length > 0) {
    const m = mediaContent[0];
    // rss-parser may put attributes under $ or directly as url
    if (m?.url) return m.url as string;
    if (m?.$?.url) return m.$.url as string;
  }

  const mediaThumb = item.mediaThumbnail as any[] | undefined;
  if (Array.isArray(mediaThumb) && mediaThumb.length > 0) {
    const t = mediaThumb[0];
    if (t?.url) return t.url as string;
    if (t?.$?.url) return t.$.url as string;
    if (t?.$?.href) return t.$.href as string;
  }

  // Try to parse first <img src=".."> from content or content:encoded
  const html = (item.content || item.contentEncoded) as string | undefined;
  if (html) {
    const match = html.match(/<img[^>]+src=["']([^"'>]+)["']/i);
    if (match && match[1]) return match[1];
  }
  return null;
}


