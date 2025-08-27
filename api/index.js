module.exports = (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>RSS News Feed - Epstein & Diddy</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
          padding: 20px; 
          max-width: 800px; 
          margin: 0 auto;
          background: #f5f5f5;
        }
        .container {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { 
          color: #333; 
          margin-bottom: 10px;
        }
        .subtitle {
          color: #666;
          margin-bottom: 30px;
        }
        a { 
          color: #0066cc; 
          text-decoration: none; 
        }
        a:hover { 
          text-decoration: underline; 
        }
        .info { 
          background: #f8f9fa; 
          padding: 20px; 
          border-radius: 8px; 
          margin: 20px 0;
          border-left: 4px solid #0066cc;
        }
        .feed-url {
          background: #333;
          color: #fff;
          padding: 10px 15px;
          border-radius: 5px;
          display: inline-block;
          font-family: monospace;
          margin: 10px 0;
        }
        .keywords {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
        }
        .keyword-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 10px;
        }
        .keyword {
          background: #e3f2fd;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 14px;
          color: #1976d2;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Epstein & Diddy News RSS Feed</h1>
        <p class="subtitle">Real-time news aggregation from multiple sources</p>
        
        <div class="info">
          <h3>RSS Feed URL</h3>
          <p>Add this URL to your RSS reader to stay updated:</p>
          <div class="feed-url">https://shorg.vercel.app/api/rss</div>
          <p style="margin-top: 15px;">
            <a href="/api/rss">View RSS Feed</a> | 
            <a href="https://validator.w3.org/feed/check.cgi?url=https%3A%2F%2Fshorg.vercel.app%2Fapi%2Frss" target="_blank">Validate RSS</a>
          </p>
        </div>

        <div class="keywords">
          <h3>Tracked Keywords</h3>
          <p>This feed monitors news containing these terms:</p>
          <div class="keyword-list">
            <span class="keyword">Epstein</span>
            <span class="keyword">Epstein List</span>
            <span class="keyword">Jeffrey Epstein</span>
            <span class="keyword">#EpsteinList</span>
            <span class="keyword">Diddy</span>
            <span class="keyword">Diddy List</span>
            <span class="keyword">Sean Combs</span>
            <span class="keyword">P Diddy</span>
            <span class="keyword">#DiddyList</span>
            <span class="keyword">Diddy lawsuit</span>
            <span class="keyword">Diddy allegations</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
};