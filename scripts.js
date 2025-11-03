let missions = [];
let favorites = JSON.parse(localStorage.getItem('missionFavorites')) || [];



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
  
  list.forEach(mission => { 

    const isFavorite = favorites.includes(mission.id);
    
   const card = `
      <div class="mission-card">
        <div class="mission-image-container">
          <img src="${mission.image}" alt="${mission.name}" class="mission-image">
        </div>
        <div class="mission-info">
          <h2>${mission.name}</h2>
          <p><strong>Agence :</strong> ${mission.agency}</p>
          <p class="goal"><strong>Objectif :</strong> ${mission.objective}</p>
          <p class="date"><strong>Date de lancement :</strong> ${mission.launchDate}</p>
          <button class="icon_edit" onclick="editMission(${mission.id})">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="icon_delete" onclick="deleteMission(${mission.id})"> <i class="fa-solid fa-trash"> </i> </button>
          <button class="icon_favorite" data-id="${mission.id}">
            <img src="${isFavorite ? 'assets/star1.png' : 'assets/star.png'}" 
                 alt="Favorite" class="fav-img">
          </button>
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
      mission.agency.toLowerCase().includes(searchText) ||
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

function showFavorites(){
  const favoriteMissions = missions.filter(m => favorites.includes(m.id));

  displayMissions(favoriteMissions);

}

// ===============================
// 4. FAVORIS (Bonus)
// ===============================

   function toggleFavorite(missionId, button) {
  const img = button.querySelector('.fav-img');
  const index = favorites.indexOf(missionId);
   
 if (index === -1) {

  favorites.push(missionId);
    img.src = "assets/star.png"; 
  } else {

    favorites.splice(index, 1);
    img.src = "assets/star1.png";
  }
  
  localStorage.setItem('missionFavorites', JSON.stringify(favorites));

  if (document.querySelector('.favori-mission').classList.contains('active')) {
    showFavorites();  
  } else {
    displayMissions(missions); 
  }

  }

  function showFavorites() {
  const favoriteMissions = missions.filter(m => favorites.includes(m.id));
  displayMissions(favoriteMissions);
  }

  function showAllMissions() {
  displayMissions(missions);
   }

  document.addEventListener('DOMContentLoaded', () => {
  loadMissions();

  
  document.getElementById('search_mission').addEventListener('input', searchMissions);

  
  document.querySelector('.favori-mission').addEventListener('click', showFavorites);


  document.querySelector('.all-mission').addEventListener('click', () => displayMissions(missions));

  
  document.getElementById('missions').addEventListener('click', (e) => {
    const btn = e.target.closest('.icon_favorite');
    if (!btn) return;

    const missionId = parseInt(btn.dataset.id);
    toggleFavorite(missionId, btn);
  });
});

  // TODO: Ajouter ou retirer un favori selon sâ€™il est dÃ©jÃ  dans la liste
  // Mets Ã  jour le localStorage aprÃ¨s chaque modification
  // Affiche un message ou un style visuel (Ã©toile jaune, etc.)


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
function validateForm() {
  const fields = ['first-name', 'last-name', 'email', 'phone-number', 'message'];
  fields.forEach(id => clearError(id));

  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone-number').value.trim();
  const message = document.getElementById('message').value.trim();
  const subjectChecked = document.querySelector('input[name="subject"]:checked');

  let isValid = true;
  let errorMessage = '';

  if (!firstName) {
    errorMessage += 'Le prénom est obligatoire.\n';
    highlightError('first-name');
    isValid = false;
  }
  if (!lastName) {
    errorMessage += 'Le nom est obligatoire.\n';
    highlightError('last-name');
    isValid = false;
  }
  if (!email) {
    errorMessage += 'L\'email est obligatoire.\n';
    highlightError('email');
    isValid = false;
  }
  if (!phone) {
    errorMessage += 'Le téléphone est obligatoire.\n';
    highlightError('phone-number');
    isValid = false;
  }
  if (!message) {
    errorMessage += 'Le message est obligatoire.\n';
    highlightError('message');
    isValid = false;
  }

  if (firstName && firstName.length < 3) {
    errorMessage += 'Le prénom doit contenir au moins 3 lettres.\n';
    highlightError('first-name');
    isValid = false;
  }
  if (lastName && lastName.length < 3) {
    errorMessage += 'Le nom doit contenir au moins 3 lettres.\n';
    highlightError('last-name');
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errorMessage += 'Veuillez entrer un email valide (ex: user@domaine.com).\n';
    highlightError('email');
    isValid = false;
  }

  const phoneRegex = /^\d{10}$/;
  if (phone && !phoneRegex.test(phone)) {
    errorMessage += 'Le téléphone doit contenir exactement 10 chiffres.\n';
    highlightError('phone-number');
    isValid = false;
  }

  if (!subjectChecked) {
    errorMessage += 'Veuillez sélectionner un sujet.\n';
    isValid = false;
  }

  if (!isValid) {
    alert(errorMessage.trim());
    return false; 
  }

  window.location.href = 'contact_us_success.html';
  return false; 
}


function highlightError(fieldId) {
  const el = document.getElementById(fieldId);
  if (el) {
    el.style.borderColor = 'red';
    el.classList.add('error');
  }
}

function clearError(fieldId) {
  const el = document.getElementById(fieldId);
  if (el) {
    el.style.borderColor = '';
    el.classList.remove('error');
  }
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