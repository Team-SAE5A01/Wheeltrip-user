import axios from 'axios';

const DOPPLER_URL = 'https://api.doppler.com/v3/configs/config/secrets?project=wheeltrip&config=prd&include_dynamic_secrets=false&include_managed_secrets=true';

export async function GET(req: Request) {
  try {
    // Faire une requête à l'API Doppler pour récupérer les secrets
    const response = await axios.get(DOPPLER_URL, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${process.env.DOPPLER_API_KEY}`, // Remplace par ta clé API depuis l'environnement
      },
    });

    // Retourner les secrets obtenus de Doppler sous forme de JSON
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    // Gérer les erreurs spécifiques et afficher un message d'erreur plus détaillé
    console.error('Erreur lors de la récupération des secrets depuis Doppler', error.response?.data || error.message);
    return new Response(JSON.stringify({ error: error.response?.data || 'Erreur serveur' }), { status: 500 });
  }
}
