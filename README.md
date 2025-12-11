WANDERINFO – Explore Destination Before You Go
WanderInfo is a travel information web application that helps users explore different countries and places before they plan their trip.
The platform provides country-wise destinations, descriptions, and useful travel insights in a simple and user-friendly interface.



Features:
1)Browse countries
2)Explore tourist places for each country
3)Search destinations easily
4)View images and descriptions of each place
5)Full-stack web application using React, Node.js, Express, and SQLite



Tech Stack:
Frontend
React.js
HTML5, CSS3
Axios

Backend
Node.js
Express.js
SQLite / SQL Database


Tools Used:
VS Code
Postman


Project Structure:
WanderInfo/
│
├── backend/
│   ├── server.js
│   ├── database.db
│   ├── routes/
│   └── controllers/
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── pages/
│
└── README.md
Database Structure:
1. Countries Table
2. Places Table


How to Run the Project:
Backend
cd backend
npm install
node server.js
Frontend
cd frontend
npm install
npm start



API Endpoints:
Countries
GET /countries – Get list of all countries
Places
GET /places/:country_id – Get all places for a specific country
POST /places – Add a new place (optional for admin)


Purpose of the Project:
WanderInfo is designed to help travelers access information about destinations before visiting them.
It works as a simple virtual guide, improving travel planning and providing essential place details.

Conclusion:
“WanderInfo – Explore Destination Before You Go” is a simple and effective travel guide system that demonstrates real-time usage of React, Express, Node.js, and SQL.
It is an ideal academic project showcasing both frontend and backend development.
