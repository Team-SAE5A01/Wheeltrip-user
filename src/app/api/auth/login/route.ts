import axios from 'axios';

const DOPPLER_URL = 'https://api.doppler.com/v3/configs/config/secrets?project=wheeltrip&config=prd&include_dynamic_secrets=false&include_managed_secrets=true';

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
 * Envoie une requête POST pour authentifier un utilisateur
 */
async function loginUser(email: string, motDePasse: string) {
  try {
    const awsMicroIp = await getAwsMicroIp();
    if (!awsMicroIp) throw new Error('Impossible de récupérer l\'IP AWS');

    const apiUrl = `http://${awsMicroIp}:4500/api/login`;
    console.log(`Appel de l'API LOGIN : ${apiUrl}`);

    const response = await axios.post(apiUrl, { email, mot_de_passe: motDePasse });

    console.log('Réponse de l\'API login :', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Erreur lors de la connexion', error.response?.data || error.message);
    return null;
  }
}

/**
 * Route POST : Connexion de l'utilisateur
 */
export async function POST(req: Request) {
  try {
    const { email, mot_de_passe } = await req.json();

    if (!email || !mot_de_passe) {
      return new Response(JSON.stringify({ error: 'Email et mot de passe requis' }), { status: 400 });
    }

    const loginData = await loginUser(email, mot_de_passe);
    if (!loginData) {
      return new Response(JSON.stringify({ error: 'Échec de la connexion' }), { status: 401 });
    }

    return new Response(JSON.stringify(loginData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 });
  }
}
