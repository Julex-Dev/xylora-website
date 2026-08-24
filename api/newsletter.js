const Parser = require('rss-parser');

const FEED_URL = 'https://rss.beehiiv.com/feeds/yAHvrK9wYo.xml';

const parser = new Parser({
  customFields: {
    item: [['description', 'description']]
  }
});

// Reused across warm invocations of the same lambda instance as a light
// backstop to the CDN cache below — not relied on for correctness.
let cache = { data: null, fetchedAt: 0 };
const CACHE_TTL_MS = 3 * 60 * 60 * 1000; // 3 hours

async function getIssues() {
  if (cache.data && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.data;
  }

  const feed = await parser.parseURL(FEED_URL);
  const issues = feed.items.map((item) => ({
    title: item.title || '',
    subtitle: item.description || item.contentSnippet || '',
    thumbnailUrl: (item.enclosure && item.enclosure.url) || '',
    publishedDate: item.pubDate || item.isoDate || '',
    link: item.link || '',
    author: item.creator || item['dc:creator'] || ''
  }));

  cache = { data: issues, fetchedAt: Date.now() };
  return issues;
}

module.exports = async function handler(req, res) {
  try {
    const issues = await getIssues();

    const limitParam = req.query && req.query.limit;
    const limit = limitParam ? parseInt(limitParam, 10) : null;
    const result = Number.isFinite(limit) && limit > 0 ? issues.slice(0, limit) : issues;

    res.setHeader('Cache-Control', 's-maxage=10800, stale-while-revalidate=86400');
    res.status(200).json({ issues: result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load newsletter issues.' });
  }
};
