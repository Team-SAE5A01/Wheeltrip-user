import axios from 'axios';

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
        authorization: `Bearer ${process.env.DOPPLER_API_KEY}`, // Remplace par ta clé API depuis l'environnement
      },
    });

    // Log de l'IP obtenue depuis Doppler
    console.log('IP obtenue depuis Doppler:', response.data.secrets.NEXT_PUBLIC_AWS_MICRO_IP.computed);

    return response.data.secrets.NEXT_PUBLIC_AWS_MICRO_IP.computed || null;
  } catch (error: any) {
    console.error('Erreur lors de la récupération de AWS_MICRO_IP', error.response?.data || error.message);
    return null;
  }
}

/**
 * Fonction GET pour récupérer le profil de l'utilisateur
 */
export async function GET(req: Request) {
  try {
    const { email } = await req.json(); // Récupère l'email du body de la requête (si nécessaire)

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email requis' }), { status: 400 });
    }

    const awsMicroIp = await getAwsMicroIp();
    if (!awsMicroIp) throw new Error('Impossible de récupérer l\'IP AWS');

    // Log de l'URL construite pour l'appel API
    const apiUrl = `http://${awsMicroIp}:4500/api/users/email/${encodeURIComponent(email)}`;
    console.log(`Appel de l'API GET : ${apiUrl}`);

    // Faire l'appel à l'API pour récupérer le profil de l'utilisateur
    const response = await axios.get(apiUrl, {
      headers: {
        accept: 'application/json',
      },
    });

    // Log des données retournées par l'API
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
