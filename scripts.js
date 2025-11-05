let missions = [];
let favorites = JSON.parse(localStorage.getItem('missionFavorites')) || [];
localStorage.removeItem('missionFavorites');


async function loadMissions() {
  try {
    const response = await fetch('missions.json');
    missions = await response.json();
    displayMissions(missions);
    updateFavoriteCount();
  } catch (error) {
    console.error("Erreur lors du chargement des missions :", error);
  }
}

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
            <div class="icons-btns">
          <button class="icon_edit" onclick="editMission(${mission.id})">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="icon_delete" onclick="deleteMission(${mission.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
          <button class="icon_favorite" data-id="${mission.id}">
            <img src="${isFavorite ? 'assets/star1.png' : 'assets/star.png'}" 
                 alt="Favorite" class="fav-img">
          </button>
          </div>
        </div>
      </div>
    `;

    container.innerHTML += card;
  });
}

function updateFavoriteCount() {
  const count = favorites.length;
  document.getElementById('favBtn-num').textContent = count;

  const favContainer = document.querySelector('.fav-mis');
  favContainer.innerHTML = '';

  if (count === 0) {
    favContainer.innerHTML = '<p style="text-align:center; color:#aaa;">No favorite mission</p>';
    return;
  }

  const favoriteMissions = missions.filter(m => favorites.includes(m.id));
  favoriteMissions.forEach(mission => {
    const favItem = `
      <div class="fav-mission-item">
        <img src="${mission.image}" alt="${mission.name}">
        <div>
          <h4>${mission.name}</h4>
          <p>${mission.objective}</p>
          <p>${mission.agency}</p>
          <h4>${mission.launchDate}</h4>
        </div>
      </div>
    `;
    favContainer.innerHTML += favItem;
  });
}

function openFavoritesPopup() {
  const popup = document.querySelector('.favorit_missions_card');
  popup.style.display = 'block';
  updateFavoriteCount();
}

function closeFavoritesPopup() {
  document.querySelector('.favorit_missions_card').style.display = 'none';
}

function toggleFavorite(missionId, button) {
  const img = button.querySelector('.fav-img');
  const index = favorites.indexOf(missionId);

  if (index === -1) {
    favorites.push(missionId);
    img.src = "assets/star1.png";
  } else {
    favorites.splice(index, 1);
    img.src = "assets/star.png";
  }

  localStorage.setItem('missionFavorites', JSON.stringify(favorites));
  updateFavoriteCount();

  if (document.querySelector('.favori-mission').classList.contains('active')) {
    showFavorites();
  }
}

function searchMissions() {
  filterMissions();
}

function filterMissions() {
  const selectedAgency = document.getElementById('agency-filter').value;
  const selectedYear = document.getElementById('year-filter').value;
  const searchText = document.getElementById('search_mission').value.trim().toLowerCase();

  let filtered = missions;

  if (selectedAgency) {
    filtered = filtered.filter(m => m.agency.includes(selectedAgency));
  }

  if (selectedYear) {
    const yearInt = parseInt(selectedYear);
    filtered = filtered.filter(m => new Date(m.launchDate).getFullYear() === yearInt);
  }

  if (searchText) {
    filtered = filtered.filter(m =>
      m.name.toLowerCase().includes(searchText) ||
      m.objective.toLowerCase().includes(searchText) ||
      m.agency.toLowerCase().includes(searchText) ||
      m.launchDate.includes(searchText)
    );
  }

  displayMissions(filtered);
}

function showFavorites() {
  const favoriteMissions = missions.filter(m => favorites.includes(m.id));
  displayMissions(favoriteMissions);

  document.querySelectorAll('.filter-mission button').forEach(btn => btn.classList.remove('active'));
  document.querySelector('.favori-mission').classList.add('active');
}

function showAllMissions() {
  displayMissions(missions);
  document.querySelectorAll('.filter-mission button').forEach(btn => btn.classList.remove('active'));
  document.querySelector('.all-mission').classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  loadMissions();

  document.querySelector('.navbar_favorit_btn').addEventListener('click', openFavoritesPopup);

  document.querySelector('.fav-bt').addEventListener('click', closeFavoritesPopup);

  document.querySelector('.favorit_missions_card').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-fav')) {
      const id = parseInt(e.target.dataset.id);
      const index = favorites.indexOf(id);
      if (index > -1) {
        favorites.splice(index, 1);
        localStorage.setItem('missionFavorites', JSON.stringify(favorites));
        updateFavoriteCount();
        if (document.querySelector('.favori-mission').classList.contains('active')) {
          showFavorites();
        }
      }
    }
  });

  document.getElementById('missions').addEventListener('click', (e) => {
    const btn = e.target.closest('.icon_favorite');
    if (!btn) return;
    const missionId = parseInt(btn.dataset.id);
    toggleFavorite(missionId, btn);
  });

  document.querySelector('.favori-mission').addEventListener('click', showFavorites);
  document.querySelector('.all-mission').addEventListener('click', showAllMissions);
  document.querySelector('.add-mission').addEventListener('click', openAddForm);

  document.getElementById('search_mission').addEventListener('input', searchMissions);
  document.getElementById('agency-filter').addEventListener('change', filterMissions);
  document.getElementById('year-filter').addEventListener('change', filterMissions);
});

function openAddForm() {
  document.getElementById('add-form-container').style.display = 'flex';
}

function closeAddForm() {
  document.getElementById('add-form-container').style.display = 'none';
  resetModal();
}

window.onclick = function(event) {
  const modal = document.getElementById('add-form-container');
  if (event.target === modal) closeAddForm();
};

document.getElementById('submit-btn').onclick = addMission;

function addMission() {
  const name = document.getElementById('new-name').value.trim();
  const agency = document.getElementById('new-agency').value.trim();
  const objective = document.getElementById('new-objective').value.trim();
  const launchDate = document.getElementById('new-date').value;
  const image = document.getElementById('new-image').value.trim();

  if (!name || !agency || !objective || !launchDate || !image) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  const newMission = { id: Date.now(), name, agency, objective, launchDate, image };
  missions.push(newMission);
  localStorage.setItem('missions', JSON.stringify(missions));
  displayMissions(missions);
  closeAddForm();
}

function editMission(missionId) {
  const index = missions.findIndex(m => m.id === missionId);
  if (index === -1) return;

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

function updateMission() {
  const index = parseInt(document.getElementById('edit-index').value);
  if (index === -1) return;

  const name = document.getElementById('new-name').value.trim();
  const agency = document.getElementById('new-agency').value.trim();
  const objective = document.getElementById('new-objective').value.trim();
  const launchDate = document.getElementById('new-date').value;
  const image = document.getElementById('new-image').value.trim();

  if (!name || !agency || !objective || !launchDate || !image) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  missions[index] = { ...missions[index], name, agency, objective, launchDate, image };
  localStorage.setItem('missions', JSON.stringify(missions));
  displayMissions(missions);
  closeAddForm();
  resetModal();
}

function resetModal() {
  document.getElementById('modal-title').textContent = 'Add Mission';
  document.getElementById('edit-index').value = '-1';
  document.getElementById('add-mission-form').reset();
  document.getElementById('submit-btn').textContent = 'Add';
  document.getElementById('submit-btn').onclick = addMission;
}

function deleteMission(id) {
  if (confirm("Supprimer cette mission ?")) {
    missions = missions.filter(m => m.id !== id);
    favorites = favorites.filter(favId => favId !== id);
    localStorage.setItem('missions', JSON.stringify(missions));
    localStorage.setItem('missionFavorites', JSON.stringify(favorites));
    displayMissions(missions);
    updateFavoriteCount();
  }
}

function validateForm(event) {
  event.preventDefault();

  let isValid = true;

  document.querySelectorAll('.error-message').forEach(span => {
    span.textContent = '';
    span.style.display = 'none';
  });
  document.querySelectorAll('.form-input, textarea').forEach(input => {
    input.style.borderBottom = '1px solid #ccc';
  });

  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone-number').value.trim();
  const message = document.getElementById('message').value.trim();
  const subjectSelected = document.querySelector('input[name="subject"]:checked');

  if (!firstName) {
    showError('error-first-name', 'First name is required');
    highlightInput('first-name');
    isValid = false;
  }

  if (!lastName) {
    showError('error-last-name', 'Last name is required');
    highlightInput('last-name');
    isValid = false;
  }

  if (!email) {
    showError('error-email', 'Email is required');
    highlightInput('email');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError('error-email', 'Please enter a valid email');
    highlightInput('email');
    isValid = false;
  }

  if (!phone) {
    showError('error-phone-number', 'Phone number is required');
    highlightInput('phone-number');
    isValid = false;
  }

  if (!subjectSelected) {
    showError('error-subject', 'Please select a subject');
    isValid = false;
  }

  if (!message) {
    showError('error-message', 'Message is required');
    highlightTextarea('message');
    isValid = false;
  }

  if (isValid) {
    alert('Form submitted successfully!'); 
    document.getElementById('contact-form').reset();
  }

  return isValid;
}

function showError(spanId, message) {
  const errorSpan = document.getElementById(spanId);
  errorSpan.textContent = message;
  errorSpan.style.display = 'block';
  errorSpan.style.color = '#e63946';
  errorSpan.style.fontSize = '14px';
  errorSpan.style.marginTop = '6px';
}

function highlightInput(inputId) {
  const input = document.getElementById(inputId);
  input.style.borderBottom = '2px solid #e63946';
}

function highlightTextarea(textareaId) {
  const textarea = document.getElementById(textareaId);
  textarea.style.borderBottom = '2px solid #e63946';
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateAndSubmit(event) {
  event.preventDefault();

  let isValid = true;

  document.querySelectorAll('.error-message').forEach(span => {
    span.textContent = '';
    span.style.display = 'none';
  });
  document.querySelectorAll('.form-input, textarea').forEach(el => {
    el.style.borderBottom = '1px solid #ccc';
    el.classList.remove('error');
  });

  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone-number').value.trim();
  const message = document.getElementById('message').value.trim();
  const subjectSelected = document.querySelector('input[name="subject"]:checked');

  if (!firstName) {
    showError('error-first-name', 'First name is required');
    highlightInput('first-name');
    isValid = false;
  } else if (firstName.length < 3) {
    showError('error-first-name', 'First name must be at least 3 letters');
    highlightInput('first-name');
    isValid = false;
  }

  if (!lastName) {
    showError('error-last-name', 'Last name is required');
    highlightInput('last-name');
    isValid = false;
  } else if (lastName.length < 3) {
    showError('error-last-name', 'Last name must be at least 3 letters');
    highlightInput('last-name');
    isValid = false;
  }

  if (!email) {
    showError('error-email', 'Email is required');
    highlightInput('email');
    isValid = false;
  } else if (!email.includes('@') || !email.includes('.')) {
    showError('error-email', 'email must contain @ and .');
    highlightInput('email');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError('error-email', 'Please enter a valid email');
    highlightInput('email');
    isValid = false;
  }

  const phoneDigits = phone.replace(/\D/g, ''); 
  if (!phone) {
    showError('error-phone-number', 'Phone number is required');
    highlightInput('phone-number');
    isValid = false;
  } else if (phoneDigits.length !== 10) {
    showError('error-phone-number', 'Phone must be exactly 10 nbrs');
    highlightInput('phone-number');
    isValid = false;
  }

  if (!subjectSelected) {
    showError('error-subject', 'Please select a subject');
    isValid = false;
  }

  if (!message) {
    showError('error-message', 'Message is required');
    highlightTextarea('message');
    isValid = false;
  }

  if (isValid) {
    window.location.href = 'contact_us_success.html';
  }

  return isValid;
}

function showError(spanId, message) {
  const span = document.getElementById(spanId);
  span.textContent = message;
  span.style.display = 'block';
}

function highlightInput(id) {
  const input = document.getElementById(id);
  input.style.borderBottom = '2px solid #e63946';
  input.classList.add('error');
}

function highlightTextarea(id) {
  const textarea = document.getElementById(id);
  textarea.style.borderBottom = '2px solid #e63946';
  textarea.classList.add('error');
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
