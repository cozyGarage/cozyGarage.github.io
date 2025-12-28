# Portfolio Admin Panel

A separate admin interface for managing your portfolio content. The admin server runs on a different port (default: 3001) from your main portfolio site.

## 🚀 Quick Start

```bash
# Start just the admin server
bun run admin

# Start admin server with hot reload
bun run admin:dev

# Start both portfolio dev server and admin server
bun run dev:all
```

Then open [http://localhost:3001](http://localhost:3001) to access the admin panel.

## 📋 Features

### Personal Information
- Edit your name, title, bio
- Update contact information (email, location)
- Manage social links (GitHub, LinkedIn)

### Projects Management
- Create, edit, and delete projects
- Upload project images
- Set project categories (Web, Game, ML/AI, Other)
- Mark projects as featured
- Add technologies/skills used
- Set demo and GitHub URLs

### Skills Management
- Add and organize skills by category
- Set proficiency levels (1-5)
- Categories: Frontend, Backend, ML/AI, Tools, Other

### Experience Management
- Add work experience entries
- Include job descriptions as bullet points
- List technologies used at each position

## 🔄 Data Sync

The admin panel maintains two data stores:

1. **`admin/data.json`** - JSON backup of all portfolio data
2. **`src/data/portfolio.ts`** - TypeScript source file used by the portfolio

When you make changes in the admin panel:
- Changes are saved to `data.json` automatically
- Click **"Sync to Portfolio"** to update `portfolio.ts`
- Rebuild your portfolio to see changes on the live site

## 📁 File Structure

```
admin/
├── server.ts      # Bun server with API endpoints
├── index.html     # Admin dashboard HTML
├── styles.css     # Dashboard styles
├── app.js         # Frontend JavaScript
└── data.json      # JSON data store (created on first run)
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/data` | Get all portfolio data |
| GET/PUT | `/api/personal-info` | Manage personal info |
| GET/POST | `/api/projects` | List/create projects |
| GET/PUT/DELETE | `/api/projects/:id` | Manage single project |
| GET/POST | `/api/skills` | List/create skills |
| PUT/DELETE | `/api/skills/:name` | Manage single skill |
| GET/POST | `/api/experience` | List/create experience |
| POST | `/api/upload` | Upload project images |
| POST | `/api/sync` | Sync data to portfolio.ts |

## 🖼️ Image Upload

Upload project images directly from the admin panel:
1. Click "Add Project" or edit an existing project
2. Click "Choose File" in the image upload section
3. Select your image
4. The image is automatically uploaded to `public/projects/`
5. The image path is set automatically

Supported formats: PNG, JPG, JPEG, GIF, WebP

## ⚠️ Security Notice

**This admin panel is for development only!**

For production use, you should:
1. Add authentication (e.g., basic auth, OAuth)
2. Use HTTPS
3. Restrict CORS to specific origins
4. Consider using environment variables for sensitive data
5. Add rate limiting

## 🔧 Configuration

### Change Admin Port

Set the `ADMIN_PORT` environment variable:

```bash
ADMIN_PORT=4000 bun run admin
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `ADMIN_PORT` | `3001` | Port for admin server |

## 📝 Workflow

1. **Development**:
   ```bash
   bun run dev:all  # Runs both servers
   ```

2. **Make changes** in admin panel at `localhost:3001`

3. **Click "Sync to Portfolio"** to update source files

4. **Preview changes** at `localhost:5173` (Vite dev server)

5. **Deploy**:
   ```bash
   bun run deploy
   ```

## 🎨 Customization

### Styling
Edit `admin/styles.css` to customize the admin panel appearance. The panel uses CSS variables for easy theming.

### Adding Fields
1. Update types in `admin/server.ts`
2. Add form fields in `admin/index.html`
3. Update render/save functions in `admin/app.js`
4. Update `generatePortfolioTS()` in server if needed

## 🐛 Troubleshooting

### "Failed to load data"
- Ensure the admin server is running
- Check browser console for errors
- Verify the port isn't blocked

### Changes not appearing on site
1. Click "Sync to Portfolio" in admin
2. Ensure dev server is running
3. Hard refresh the browser (Ctrl+Shift+R)

### Image upload fails
- Check file permissions on `public/projects/`
- Ensure file size isn't too large
- Try a different image format
