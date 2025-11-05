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
    filterMissions();

}

function filterMissions() {
  const selectedAgency = document.getElementById('agency-filter').value;
  const selectedYear = document.getElementById('year-filter').value;
  const searchText = document.getElementById('search_mission').value.trim().toLowerCase();

  let filtered = missions;

  // FILTRE AGENCE
  if (selectedAgency && selectedAgency !== '') {
    filtered = filtered.filter(m => m.agency.includes(selectedAgency));
  }

  // FILTRE ANNÉE
  if (selectedYear && selectedYear !== '') {
    const yearInt = parseInt(selectedYear);
    filtered = filtered.filter(m => {
      const missionYear = new Date(m.launchDate).getFullYear();
      return missionYear === yearInt;
    });
  }

  // RECHERCHE TEXTE
  if (searchText !== '') {
    filtered = filtered.filter(m => 
      m.name.toLowerCase().includes(searchText) ||
      m.objective.toLowerCase().includes(searchText) ||
      m.agency.toLowerCase().includes(searchText) ||
      m.launchDate.includes(searchText)
    );
  }

  displayMissions(filtered);
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




// ===============================
// 5. CRUD - AJOUT, Ã‰DITION, SUPPRESSION
// ===============================
function openAddForm() {
  document.getElementById('add-form-container').style.display = 'flex';
}
function closeAddForm() {
  document.getElementById('add-form-container').style.display = 'none';
  resetModal();
  }  
  window.onclick = function(event) {
  const modal = document.getElementById('add-form-container');
  if (event.target === modal) {
    closeAddForm();
  }
};
  

// --- AJOUT ---
function addMission() {
  const name = document.getElementById('new-name').value.trim();
  const agency = document.getElementById('new-agency').value.trim();
  const objective = document.getElementById('new-objective').value.trim();
  const launchDate = document.getElementById('new-date').value;
  const image = document.getElementById('new-image').value;

  if (!name || !agency || !objective || !launchDate || !image) {
    alert("remplir tous les champs");
    return;
  }

  const newMission = { 
    id: Date.now(), 
    name, 
    agency, 
    objective, 
    launchDate, 
    image 
  };

  missions.push(newMission);
  displayMissions(missions);
  closeAddForm();

  localStorage.setItem('missions', JSON.stringify(missions));
  
}

// --- Ã‰DITION ---
function editMission(missionId) {
  
if (!missionId) {
    alert("ID de mission manquant !");
    return;
  }

const index = missions.findIndex(m => m.id === missionId);  
if (index === -1) {
    alert("Mission non trouvée.");
    return;
  }

  const mission = missions[index];

  document.getElementById('modal-title').textContent = 'Edit Mission';

  document.getElementById('new-name').value = mission.name;
  document.getElementById('new-agency').value = mission.agency;
  document.getElementById('new-objective').value = mission.objective;
  document.getElementById('new-date').value = mission.launchDate;
  document.getElementById('new-image').value = mission.image;

  document.getElementById('edit-index').value = index;

  const submitBtn = document.getElementById('submit-btn');
  submitBtn.textContent = 'Update';
  submitBtn.onclick = updateMission;

  openAddForm();

}
  
function resetModal() {
  const submitBtn = document.getElementById('submit-btn');
  submitBtn.textContent = 'Ajouter';
  submitBtn.onclick = addMission;

  document.getElementById('modal-title').textContent = 'Ajouter une Mission';
  document.getElementById('edit-index').value = '-1';

  const form = document.getElementById('add-mission-form');
  if (form) form.reset();
}

  function updateMission() {
  const index = parseInt(document.getElementById('edit-index').value);
  if (index === -1 || !missions[index]) {
    alert("Erreur : mission non trouvée.");
    return;
  }

  const name = document.getElementById('new-name').value.trim();
  const agency = document.getElementById('new-agency').value.trim();
  const objective = document.getElementById('new-objective').value.trim();
  const launchDate = document.getElementById('new-date').value;
  const image = document.getElementById('new-image').value.trim();

  if (!name || !agency || !objective || !launchDate || !image) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

missions[index] = { name, agency, objective, launchDate, image };

localStorage.setItem('missions', JSON.stringify(missions));
  displayMissions(missions);
  closeAddForm();

}

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
function validateForm(event) {
  if (event) event.preventDefault();

  clearAllErrors();

  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone-number').value.trim();
  const message = document.getElementById('message').value.trim();
  const subjectChecked = document.querySelector('input[name="subject"]:checked');

  let isValid = true;

  if (!firstName) {
    showError('first-name', 'Le prénom est obligatoire.');
    isValid = false;
  } else if (firstName.length < 3) {
    showError('first-name', 'Le prénom doit contenir au moins 3 lettres.');
    isValid = false;
  }


  if (!lastName) {
    showError('last-name', 'Le nom est obligatoire.');
    isValid = false;
  } else if (lastName.length < 3) {
    showError('last-name', 'Le nom doit contenir au moins 3 lettres.');
    isValid = false;
  }


  if (!email) {
    showError('email', 'L\'email est obligatoire.');
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('email', 'Veuillez entrer un email valide.');
    isValid = false;
  }

    if (!phone) {
    showError('phone-number', 'Le téléphone est obligatoire.');
    isValid = false;
  } else if (!/^\d{10}$/.test(phone)) {
    showError('phone-number', 'Le téléphone doit contenir 10 chiffres.');
    isValid = false;
  }

  if (!message) {
    showError('message', 'Le message est obligatoire.');
    isValid = false;
  }

  if (!subjectChecked) {
    showError('subject', 'Veuillez sélectionner un sujet.');
    isValid = false;
  }

  if (isValid) {
    window.location.href = 'contact_us_success.html';
  }

  return false;
}


function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorSpan = document.getElementById(`error-${fieldId}`);

  if (input) input.classList.add('error');
  if (errorSpan) {
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
  }
}

function clearError(fieldId) {
  const input = document.getElementById(fieldId);
  const errorSpan = document.getElementById(`error-${fieldId}`);

  if (input) input.classList.remove('error');
  if (errorSpan) {
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
  }
}

function clearAllErrors() {
  const fields = ['first-name', 'last-name', 'email', 'phone-number', 'message', 'subject'];
  fields.forEach(field => clearError(field));
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