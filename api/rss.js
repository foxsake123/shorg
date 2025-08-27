export default async function handler(req, res) {
  try {
    // Set CORS and content type headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');

    // Keywords to search for
    const keywords = [
      'Epstein', 'Epstein List', 'Jeffrey Epstein',
      'Diddy', 'Sean Combs', 'P Diddy', 'Diddy lawsuit'
    ];

    // Simple RSS XML structure with hardcoded sample items for now
    // In production, you would fetch real news here
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Epstein &amp; Diddy News Feed</title>
    <link>https://shorg.vercel.app</link>
    <description>Latest news about Epstein and Diddy</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://shorg.vercel.app/api/rss" rel="self" type="application/rss+xml"/>
    
    <item>
      <title>Latest Updates on Epstein Case Documents</title>
      <link>https://news.google.com/search?q=epstein+list</link>
      <description>Recent developments in the Epstein case documentation.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>https://news.google.com/search?q=epstein+list</guid>
    </item>
    
    <item>
      <title>Diddy Legal Proceedings Update</title>
      <link>https://news.google.com/search?q=diddy+lawsuit</link>
      <description>Latest information on ongoing legal matters.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>https://news.google.com/search?q=diddy+lawsuit</guid>
    </item>
    
    <item>
      <title>Search for Epstein News</title>
      <link>https://news.google.com/search?q=jeffrey+epstein</link>
      <description>Click to search for latest Epstein news on Google News</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>https://news.google.com/search?q=jeffrey+epstein</guid>
    </item>
    
    <item>
      <title>Search for Diddy News</title>
      <link>https://news.google.com/search?q=sean+combs+diddy</link>
      <description>Click to search for latest Diddy news on Google News</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>https://news.google.com/search?q=sean+combs+diddy</guid>
    </item>
  </channel>
</rss>`;

    res.status(200).send(rssXml);
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    res.status(500).json({ 
      error: 'Error generating RSS feed',
      message: error.message 
    });
  }
}