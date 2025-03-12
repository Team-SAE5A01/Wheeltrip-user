import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Si la méthode de la requête est POST (pour éviter la suppression avec GET)
  if (req.method === 'POST') {
    // Enlever le token d'accès du client (localStorage)
    res.setHeader('Set-Cookie', 'access_token=; Max-Age=0; Path=/'); // Réinitialisation du cookie si utilisé

    // Envoyer une réponse indiquant que la déconnexion a réussi
    res.status(200).json({ message: 'Déconnexion réussie' });
  } else {
    // Si la méthode n'est pas POST, renvoyer une erreur
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
