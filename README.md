# Nepal Travel Guide

**Nepal Travel Guide** is a full-stack web application that helps travelers explore Nepal efficiently. It provides AI-driven trip estimates, safety alerts, permit management, and destination recommendations for a smooth and interactive travel experience.

---

## Features
- **Trip Estimates:** AI-driven suggestions for travel cost and duration.
- **Safety Alerts:** Real-time updates on safety conditions in different regions.
- **Permit Applications:** Apply and track travel permits online.
- **User Authentication:** Sign up and log in to manage your trips and preferences.
- **Destination Recommendations:** Explore popular destinations with images and highlights.
- **Interactive UI:** Responsive design with components like Navbar, Footer, and Messages.

---

## Tech Stack
- **Frontend:** React, Vite, React Router DOM, React Context API
- **Backend:** Django (Python)
- **Database:** SQLite (default Django database)
- **Styling:** CSS, Flexbox, Grid
- **Icons:** React-Icons
- **Version Control:** Git & GitHub

---

## Project Structure

**Frontend** (`travel-frontend/travel-frontend/`):
```
public/                 # Static files
src/
├─ assets/              # Images and icons
├─ components/          # Reusable React components (Navbar, Footer, Message)
├─ context/             # React Context for state management
├─ pages/               # Main pages (Home, Login, Signup, SafetyAlerts, TripEstimate, PermitApplications)
├─ styles/              # CSS files
├─ App.jsx              # Main app component
└─ main.jsx             # Entry point
.gitignore
package.json
vite.config.js
```

**Backend (Django):**
- Handles API requests for user authentication, permit applications, trip estimates, and safety alerts.
- Provides REST API endpoints for:
  - User Signup/Login
  - Fetching and updating safety alerts
  - Calculating trip estimates
  - Managing permit applications
- Uses Django's ORM to interact with the SQLite database.
- Runs on `localhost:8000` by default.

---

## How it Works
1. User opens the frontend React app in a browser.
2. User can sign up or log in, storing session info via Django authentication tokens.
3. User navigates through pages (Home, TripEstimate, SafetyAlerts, PermitApplications).
4. Frontend sends API requests to Django backend for data.
5. Backend processes requests, interacts with the SQLite database, and returns JSON responses.
6. Frontend displays the returned data in a user-friendly interface.
7. AI-driven logic calculates estimated travel costs and duration for trips.

---

## Installation

### Frontend
```
git clone https://github.com/subashkatwal/Nepal-Travel-Guide.git
cd Nepal-Travel-Guide/travel-frontend/travel-frontend
npm install
npm run dev
```
Access the app at [http://localhost:5173](http://localhost:5173)

### Backend (Django)
```
cd path/to/travel-backend
python -m venv venv
# Activate virtual environment
# Linux/macOS
source venv/bin/activate
# Windows
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser   # Optional for admin access
python manage.py runserver
```
Backend will run on [http://localhost:8000](http://localhost:8000)

---

## Environment Variables
Create a `.env` file to store sensitive data like Django secret key.

Example:
```
SECRET_KEY=your_secret_key
DEBUG=True
```

---

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request.

---

## License
This project is licensed under the MIT License.

---

## Author
**Subash Katwal**  
[LinkedIn](https://www.linkedin.com/in/subashkatwal/)

