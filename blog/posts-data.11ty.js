/**
 * Generates /blog/posts.json automatically on every Eleventy build.
 *
 * Merges:
 *   1. legacyPosts  — _data/legacyPosts.json  (existing articles 01–10)
 *   2. collections.blogPost — blog/posts/*.md  (new CMS-created articles)
 *
 * The blog/index.html fetches this file to render the card grid.
 * Adding a new article via Decap CMS automatically updates this file on build.
 */
class PostsJson {
  data() {
    return {
      permalink: "blog/posts.json",
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const legacy = data.legacyPosts || [];

    const cms = (data.collections.blogPost || []).map((post) => {
      const d = post.data.date;
      const isoDate =
        d instanceof Date
          ? d.toISOString().split("T")[0]
          : String(d || "").split("T")[0];
      return {
        slug: post.data.slug,
        num: post.data.num,
        emoji: post.data.emoji || "🎬",
        tag_es: post.data.tag_es,
        tag_en: post.data.tag_en,
        title_es: post.data.title_es,
        title_en: post.data.title_en,
        desc_es: post.data.desc_es,
        desc_en: post.data.desc_en,
        date: isoDate,
        read_es: post.data.read_es || "5 min lectura",
        read_en: post.data.read_en || "5 min read",
      };
    });

    // Merge: CMS posts first (newest), then legacy in ascending num order
    const legacySorted = [...legacy].sort(
      (a, b) => parseInt(a.num || 0) - parseInt(b.num || 0)
    );
    const cmsSorted = [...cms].sort(
      (a, b) => parseInt(a.num || 0) - parseInt(b.num || 0)
    );
    const all = [...legacySorted, ...cmsSorted];

    return JSON.stringify(all, null, 2);
  }
}

module.exports = PostsJson;
