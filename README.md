
# Project Title

A brief d# Space Odyssey - Interactive Front-End Project

![Space Odyssey Banner](https://via.placeholder.com/1200x400.png?text=Space+Odyssey+by+AstroTech+Studio)  
*An interactive educational platform about space missions, built with HTML, CSS, and **vanilla JavaScript**.*

---

## 🚀 Project Overview

**Space Odyssey** is an educational web platform developed by **AstroTech Studio**, a company specializing in space and science learning experiences.

After launching the static version of the site using HTML/CSS, we are now enhancing it with **dynamic JavaScript features** to create a fully interactive, engaging, and modern user experience.

This project focuses on **front-end JavaScript mastery**, DOM manipulation, event handling, local storage, and CRUD operations — all without any external frameworks.

---

## 🎯 Project Goals

1. **Enhance user engagement** through dynamic interactions.
2. **Master DOM manipulation** (create, read, update, delete elements).
3. **Implement event-driven programming** and form validation.
4. **Simulate CRUD operations** entirely on the client side.
5. **Persist user data** using `localStorage`.

---

## ✨ Core Features

### 1. **Form Validation**
- Contact or mission submission form
- Required field checks
- Email format validation (`regex`)
- Real-time error messages below invalid fields
- *(Bonus)* Dynamic styling (green/red borders on valid/invalid)

### 2. **Advanced Search & Filtering**
- Search bar filtering missions by:
  - Name
  - Agency
  - Objective
  - Launch date
- Multiple filters:
  - Agency (NASA, ESA, SpaceX, etc.)
  - Year
  - Mission type (Manned, Unmanned, Satellite, etc.)
- Combined search + filters
- *(Bonus)* Instant results without page reload

### 3. **Full CRUD Operations** (on "Missions" page)
| Action | Implementation |
|-------|----------------|
| **Create** | Modal form to add new mission |
| **Read** | Display missions as responsive cards |
| **Update** | Inline or modal edit |
| **Delete** | Confirm dialog before removal |

> All data managed via JavaScript arrays + DOM updates.

### 4. **Favorites System**
- ⭐ "Add to Favorites" button on each mission card
- Dedicated **Favorites tab/section**
- Remove from favorites
- *(Bonus)* Favorites saved in `localStorage` → persist across sessions

### 5. **Event Management**
- Click handlers on cards, buttons, tabs
- Tab navigation: *All Missions*, *Favorites*, *My Missions*
- Form submit, reset, validation
- Smooth, **no-page-reload** interactions

---

## 🎨 Bonus & Premium Features

| Feature | Description |
|--------|-------------|
| **Advanced Validation** | Regex patterns + async simulation (e.g., check mission name availability) |
| **Live Search Suggestions** | Dropdown with matching results as user types |
| **Faceted Filters** | Multi-select filters with instant UI updates |
| **Card Animations** | Fade-in/out, slide transitions on filter/add/remove |

| **Share Mission Link** | Dynamic URL with pre-filled mission data |
| **Mission Rating System** | 5-star rating per mission (saved in localStorage) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|------|------------|
| **HTML5** | Semantic structure |
| **CSS3** | Flexbox, Grid, Responsive Design, Custom Properties |
| **JavaScript (ES6+)** | Vanilla JS – no frameworks |
| **LocalStorage** | Data persistence |
| **Font Awesome / SVG** | Icons 
