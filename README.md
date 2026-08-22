# 🐝 EventHive

**AI-Powered College Event Management Platform**

EventHive is a collaborative platform for managing college events, connecting students, organizers, and administrators in one place.

## Tech Stack

- **Backend:** Node.js + Express.js
- **View Engine:** EJS (Embedded JavaScript Templates)
- **Styling:** Vanilla CSS with CSS Custom Properties
- **Authentication:** JWT (planned)
- **Database:** TBD (mock data in use)

## Project Structure

```
EVENTHIVE/
├── server.js                  # Express app entry point
├── package.json               # Dependencies and scripts
├── .env.example               # Environment variable template
├── .gitignore                 # Git ignore rules
├── public/                    # Static assets
│   ├── css/
│   │   └── admin.css          # Admin panel styles
│   └── js/
│       └── admin.js           # Admin client-side JS
└── src/
    ├── controllers/
    │   └── adminController.js # Admin route handlers
    ├── data/
    │   └── mockData.js        # Mock data (replace with DB)
    ├── routes/
    │   └── adminRoutes.js     # Admin route definitions
    └── views/
        ├── layouts/
        │   └── adminLayout.ejs  # Admin base layout
        └── admin/
            └── dashboard.ejs    # Admin dashboard page
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/AJAYlodhy/EventHive.git
   cd EventHive
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the template:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the admin dashboard:
   ```
   http://localhost:5000/admin/dashboard
   ```

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Start | `npm start` | Run production server |
| Dev | `npm run dev` | Run with nodemon (auto-reload) |

## Branch Structure

| Branch | Purpose |
|--------|---------|
| `main` | Stable production code |
| `feature/admin` | Admin panel development |
| `feature/student` | Student-facing features |
| `feature/organizer` | Organizer-facing features |

## Team

EventHive Team

## License

ISC
