// src/lib/expand.ts
import https from 'https';
import http from 'http';

export async function expandRedirect(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const handler = (res: http.IncomingMessage) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(res.headers.location);
      } else {
        resolve(url);
      }
    };

    const client = url.startsWith('https') ? https : http;
    const req = client.request(url, { method: 'HEAD' }, handler);
    req.on('error', reject);
    req.end();
  });
}
