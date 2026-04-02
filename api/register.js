export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email ve şifre gerekli' });
  }

  return res.status(201).json({ 
    message: 'Kayıt başarılı',
    userId: Math.random().toString(36).substr(2, 9),
    email
  });
}
