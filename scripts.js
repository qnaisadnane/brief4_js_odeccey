let missions = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// ===============================
// 1. CHARGEMENT DES DONNES
// ===============================


async function loadMissions() { 

  try {
    const response = await fetch('missions.json');
    missions = await response.json();
     
    displayMissions(missions)
    // TODO: Afficher les missions au chargement
    // Utilise la fonction displayMissions(missions)
  } catch (error) {
    console.error("Erreur lors du chargement des missions :", error);
  }
}

// ===============================
// 2. AFFICHAGE DES MISSIONS
// ===============================


function displayMissions(list) {                      
  const container = document.getElementById('missions');
  container.innerHTML = '';

  list.forEach(missions => { 
    
   const card = `
      <div class="mission-card">
        <div class="mission-image-container">
          <img src="${missions.image}" alt="${missions.name}" class="mission-image">
        </div>
        <div class="mission-info">
          <h2>${missions.name}</h2>
          <p><strong>Agence :</strong> ${missions.agency}</p>
          <p class="goal"><strong>Objectif :</strong> ${missions.objective}</p>
          <p class="date"><strong>Date de lancement :</strong> ${missions.launchDate}</p>
          <button class="icon_edit" onclick="editMission(${missions.id})">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="icon_delete" onclick="deleteMission(${missions.id})"> <i class="fa-solid fa-trash"> </i> </button>

        </div>
      </div>
    `;

    container.innerHTML += card;
    
  });
}

document.addEventListener('DOMContentLoaded', loadMissions);

// ===============================
// 3. RECHERCHE ET FILTRAGE
// ===============================
function searchMissions(){
    const searchInput = document.getElementById('search_mission');
    const searchText = searchInput.value.trim().toLowerCase();

    if(searchText === ''){
      displayMissions(missions);
      return;
    }
    const filtered = missions.filter(mission => 
 
      mission.name.toLowerCase().includes(searchText) ||
      mission.objective.toLowerCase().includes(searchText) ||
      mission.launchDate.toLowerCase().includes(searchText)
    );
  
  displayMissions(filtered);


  // TODO: Filtrer les missions selon le nom ou lâ€™objectif
  // Utilise la mÃ©thode .filter() sur le tableau missions
}

function filterByAgency(agency) {
  // TODO: Filtrer selon lâ€™agence sÃ©lectionnÃ©e dans un menu dÃ©roulant
  // Si "all" est sÃ©lectionnÃ©, afficher toutes les missions
}

// ===============================
// 4. FAVORIS (Bonus)
// ===============================
function toggleFavorite(id) {
  // TODO: Ajouter ou retirer un favori selon sâ€™il est dÃ©jÃ  dans la liste
  // Mets Ã  jour le localStorage aprÃ¨s chaque modification
  // Affiche un message ou un style visuel (Ã©toile jaune, etc.)
}

// ===============================
// 5. CRUD - AJOUT, Ã‰DITION, SUPPRESSION
// ===============================
function openAddForm() {
  document.getElementById('add-form-container').style.display = 'block';}
function closeAddForm() {
  document.getElementById('add-form-container').style.display = 'none';  
  document.getElementById('new-name').value = '';
  document.getElementById('new-agency').value = '';
  document.getElementById('new-objective').value = '';
  document.getElementById('new-date').value = '';
  document.getElementById('new-image').value = '';
  }

// --- AJOUT ---
function addMission() {
  const name = document.getElementById('new-name').value.trim();
  const agency = document.getElementById('new-agency').value.trim();
  const objective = document.getElementById('new-objective').value.trim();
  const launchDate = document.getElementById('new-date').value;
  const image = document.getElementById('new-image').value;

  if (!name || !agency || !objective || !launchDate || !image) {
    alert("erreur ");
    return;
  }

  const newMission = { name, agency, objective, launchDate, image };
  missions.push(newMission);
  displayMissions(missions);
  closeAddForm();

  localStorage.setItem('missions', JSON.stringify(missions));
  // TODO: Ajouter une nouvelle mission Ã  la liste
  // VÃ©rifie les champs avec une validation de base avant lâ€™ajout
  // Mets Ã  jour lâ€™affichage
}

// --- Ã‰DITION ---
// function editMission(id) {
//   const index = missions.findIndex(m => m.id === id);
//   if (index === -1) return;

//   const newName = prompt("Nouveau nom :", missions[index].name);
//   const newObjective = prompt("Nouvel objectif :", missions[index].objective);

//   if (newName && newObjective) {
//     missions[index].name = newName.trim();
//     missions[index].objective = newObjective.trim();
//     localStorage.setItem('missions', JSON.stringify(missions));
//     displayMissions(missions);
//   }
// }

// --- SUPPRESSION ---
function deleteMission(id) {
  if (confirm("Supprimer cette mission ?")) {
    const index = missions.findIndex(m => m.id === id);
    if (index !== -1) {
      missions.splice(index, 1);
      localStorage.setItem('missions', JSON.stringify(missions));
      displayMissions(missions);
    }
  }
}

// ===============================
// 6. VALIDATION DE FORMULAIRE
// ===============================
function validateForm(data) {
  // TODO: VÃ©rifier que tous les champs obligatoires sont remplis
  // BONUS : Utiliser Regex pour valider les emails et formats de dates
  // Retourne true ou false
}

// ===============================
// 7. INITIALISATION ET Ã‰VÃ‰NEMENTS
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Charger les missions
  loadMissions();

  // 2. Ã‰vÃ©nements :
  // - Recherche (input)
  // - Filtrage (select)
  // - Favoris (clic sur bouton)
  // - CRUD (formulaires dâ€™ajout/Ã©dition/suppression)
  
  // TODO: Ajouter les Ã©couteurs dâ€™Ã©vÃ©nements ici
  // Exemple :
  // document.getElementById('search').addEventListener('input', (e) => searchMissions(e.target.value))
});