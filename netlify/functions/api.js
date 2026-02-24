const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, push, get, remove, update } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyApJH6KoxUjKP-Mj3Xr-ZKjlAWZe31PI7Q",
  authDomain: "credit-mutuel-ag-2026.firebaseapp.com",
  databaseURL: "https://credit-mutuel-ag-2026-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "credit-mutuel-ag-2026",
  storageBucket: "credit-mutuel-ag-2026.firebasestorage.app",
  messagingSenderId: "120918886580",
  appId: "1:120918886580:web:211c59e44bb2ad8216efe1"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

// Headers pour CORS
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS',
  'Content-Type': 'application/json'
};

// Handler pour OPTIONS (CORS preflight)
async function optionsHandler(event) {
  return {
    statusCode: 204,
    headers
  };
}

// Handler GET - Récupérer tous les volontaires
async function getHandler(event) {
  try {
    console.log('[GET] Récupération des volontaires...');

    const dbRef = ref(database, 'volunteers');
    const snapshot = await get(dbRef);

    let volunteers = [];
    if (snapshot.exists()) {
      const data = snapshot.val();
      volunteers = Object.values(data);
    }

    console.log(`[GET] ${volunteers.length} volontaires récupérés`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(volunteers)
    };
  } catch (error) {
    console.error('[GET] Erreur:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erreur lors de la récupération des données' })
    };
  }
}

// Handler POST - Ajouter un volontaire
async function postHandler(event) {
  try {
    console.log('[POST] Nouvelle inscription');

    const body = JSON.parse(event.body);
    const { name, time18, time19, persons, tshirt } = body;

    // Validation
    if (!name) {
      console.log('[POST] Erreur: Nom manquant');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Nom requis' })
      };
    }

    // Les créneaux sont maintenant optionnels - on ne valide plus
    // if (!time18 && !time19) {
    //   console.log('[POST] Erreur: Aucun créneau sélectionné');
    //   return {
    //     statusCode: 400,
    //     headers,
    //     body: JSON.stringify({ error: 'Au moins un créneau requis' })
    //   };
    // }

    // Créer l'entrée dans Firebase
    const volunteersRef = ref(database, 'volunteers');
    const newVolunteerRef = push(volunteersRef);

    await set(newVolunteerRef, {
      id: newVolunteerRef.key,
      name: name.trim(),
      time18: !!time18,
      time19: !!time19,
      persons: parseInt(persons) || 1,
      tshirt: tshirt || 'OK',
      createdAt: new Date().toISOString()
    });

    console.log('[POST] Inscription réussie:', newVolunteerRef.key);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, id: newVolunteerRef.key })
    };
  } catch (error) {
    console.error('[POST] Erreur:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erreur lors de l\'inscription' })
    };
  }
}

// Handler PUT - Modifier un volontaire
async function putHandler(event) {
  try {
    console.log('[PUT] Modification d\'un volontaire');

    const body = JSON.parse(event.body);
    const { id, name, time18, time19, persons, tshirt } = body;

    // Validation
    if (!id) {
      console.log('[PUT] Erreur: ID manquant');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'ID du volontaire requis' })
      };
    }

    if (!name) {
      console.log('[PUT] Erreur: Nom manquant');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Nom requis' })
      };
    }

    // Les créneaux sont maintenant optionnels - on ne valide plus
    // if (!time18 && !time19) {
    //   console.log('[PUT] Erreur: Aucun créneau sélectionné');
    //   return {
    //     statusCode: 400,
    //     headers,
    //     body: JSON.stringify({ error: 'Au moins un créneau requis' })
    //   };
    // }

    // Mettre à jour l'entrée dans Firebase
    const volunteerRef = ref(database, `volunteers/${id}`);
    await update(volunteerRef, {
      name: name.trim(),
      time18: !!time18,
      time19: !!time19,
      persons: parseInt(persons) || 1,
      tshirt: tshirt || 'OK',
      updatedAt: new Date().toISOString()
    });

    console.log('[PUT] Modification réussie:', id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, id })
    };
  } catch (error) {
    console.error('[PUT] Erreur:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erreur lors de la modification' })
    };
  }
}

// Handler DELETE - Supprimer un volontaire
async function deleteHandler(event) {
  try {
    console.log('[DELETE] Suppression d\'un volontaire');

    const volunteerId = event.path.split('/').pop();

    if (!volunteerId) {
      console.log('[DELETE] Erreur: ID manquant');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'ID du volontaire requis' })
      };
    }

    // Supprimer l'entrée de Firebase
    const volunteerRef = ref(database, `volunteers/${volunteerId}`);
    await remove(volunteerRef);

    console.log('[DELETE] Suppression réussie:', volunteerId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, id: volunteerId })
    };
  } catch (error) {
    console.error('[DELETE] Erreur:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erreur lors de la suppression' })
    };
  }
}

// Handler principal
exports.handler = async (event, context) => {
  const method = event.httpMethod;

  if (method === 'OPTIONS') {
    return optionsHandler(event);
  } else if (method === 'GET') {
    return getHandler(event);
  } else if (method === 'POST') {
    return postHandler(event);
  } else if (method === 'PUT') {
    return putHandler(event);
  } else if (method === 'DELETE') {
    return deleteHandler(event);
  } else {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
};
