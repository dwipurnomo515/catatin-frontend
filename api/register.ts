export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const backendResponse = await fetch('https://catatinbe.great-site.net/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await backendResponse.json();
    res.status(backendResponse.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
