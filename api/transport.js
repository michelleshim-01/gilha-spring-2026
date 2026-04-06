export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fields } = req.body;
  if (!fields || !fields['이름']) {
    return res.status(400).json({ error: '이름은 필수입니더' });
  }

  try {
    const response = await fetch(
      'https://api.airtable.com/v0/appv2vcJQilElIR2P/tbl5ka0tZ5OIit2Zr',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fields })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json({ ok: true, id: data.id });
  } catch (error) {
    return res.status(500).json({ error: '서버 오류가 났습니더' });
  }
}
