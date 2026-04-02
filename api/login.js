export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email ve şifre gerekli' });
  }

  // Demo: her zaman başarılı login
  return res.status(200).json({ 
    message: 'Login başarılı',
    token: 'token_' + Math.random().toString(36).substr(2, 9),
    email
  });
}
