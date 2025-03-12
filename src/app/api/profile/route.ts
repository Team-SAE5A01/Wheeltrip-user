import axios from 'axios';
import jwt from 'jsonwebtoken'; // Pour décoder le token JWT

const DOPPLER_URL =
  'https://api.doppler.com/v3/configs/config/secrets?project=wheeltrip&config=prd&include_dynamic_secrets=false&include_managed_secrets=true';

/**
 * Récupère l'adresse IP du microservice depuis Doppler
 */
async function getAwsMicroIp(): Promise<string | null> {
  try {
    const response = await axios.get(DOPPLER_URL, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${process.env.DOPPLER_API_KEY}`,
      },
    });

    return response.data.secrets.NEXT_PUBLIC_AWS_MICRO_IP.computed || null;
  } catch (error: any) {
    console.error('Erreur lors de la récupération de AWS_MICRO_IP', error.response?.data || error.message);
    return null;
  }
}

/**
 * Fonction GET pour récupérer le profil de l'utilisateur via le token
 */
export async function GET(req: Request) {
  try {
    // Vérification du token d'authentification
    const token = req.headers.get('Authorization')?.split(' ')[1]; // Récupère le token sans "Bearer "
    if (!token) {
      return new Response(JSON.stringify({ error: 'Token d\'authentification requis' }), { status: 401 });
    }

    // Décoder le token pour récupérer l'ID utilisateur
    const decodedToken: any = jwt.decode(token);
    if (!decodedToken || !decodedToken.id) {
      return new Response(JSON.stringify({ error: 'Token invalide' }), { status: 403 });
    }

    const userId = decodedToken.id; // ID extrait du token JWT

    const awsMicroIp = await getAwsMicroIp();
    if (!awsMicroIp) throw new Error("Impossible de récupérer l'IP AWS");

    // Appel API pour récupérer les infos de l'utilisateur avec son ID
    const apiUrl = `http://${awsMicroIp}:4500/api/users/id/${userId}`;
    console.log(`Appel de l'API GET : ${apiUrl}`);

    // Requête au microservice utilisateur
    const response = await axios.get(apiUrl, {
      headers: {
        accept: 'application/json',
      },
    });

    console.log('Données récupérées du profil utilisateur:', response.data);

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Erreur lors de la récupération des données du profil', error.response?.data || error.message);
    return new Response(JSON.stringify({ error: error.response?.data || 'Erreur serveur' }), { status: 500 });
  }
}
