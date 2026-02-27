# Deployment Guide - Mobile EHR Companion

## 🚀 Production Build

### Step 1: Build the Application

```bash
cd my-react-app
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Step 2: Preview Production Build

```bash
npm run preview
```

Test the production build locally before deployment.

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd my-react-app
vercel
```

3. **Follow prompts**
   - Link to existing project or create new
   - Set build command: `npm run build`
   - Set output directory: `dist`

4. **Production Deployment**
```bash
vercel --prod
```

**Vercel Configuration** (vercel.json):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Option 2: Netlify

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod --dir=dist
```

**Netlify Configuration** (_redirects in public/):
```
/*    /index.html   200
```

### Option 3: GitHub Pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**
```json
{
  "homepage": "https://yourusername.github.io/mobile-ehr",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Deploy**
```bash
npm run deploy
```

### Option 4: AWS S3 + CloudFront

1. **Build**
```bash
npm run build
```

2. **Upload to S3**
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

3. **Configure CloudFront**
   - Create distribution
   - Point to S3 bucket
   - Set error pages to redirect to index.html

### Option 5: Docker

**Dockerfile**:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf**:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Build and Run**:
```bash
docker build -t mobile-ehr .
docker run -p 80:80 mobile-ehr
```

## 🔧 Environment Configuration

### Create .env file

```env
VITE_API_BASE_URL=https://api.yourbackend.com
VITE_ML_API_URL=https://ml.yourbackend.com
VITE_APP_NAME=Mobile EHR Companion
```

### Update vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Change for subdirectory deployment
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
})
```

## 📱 PWA Deployment

### 1. Register Service Worker

Add to `src/main.jsx`:

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}
```

### 2. Add Icons

Create icons in `public/`:
- icon-192.png (192x192)
- icon-512.png (512x512)

### 3. Update manifest.json

Ensure correct paths and URLs in `public/manifest.json`

## 🔐 Security Checklist

Before deployment:

- [ ] Remove console.log statements
- [ ] Enable HTTPS
- [ ] Set secure headers
- [ ] Configure CORS properly
- [ ] Validate all inputs
- [ ] Sanitize user data
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Set up monitoring
- [ ] Configure error tracking

## 🌍 Backend Integration

### Update API Service

Replace mock API in `src/services/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authService = {
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  }
};

export const mlService = {
  predictRisk: async (visitData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/ml/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(visitData)
    });
    return response.json();
  }
};
```

## 📊 Monitoring & Analytics

### Add Google Analytics

```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking (Sentry)

```bash
npm install @sentry/react
```

```javascript
// src/main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

## 🧪 Pre-Deployment Testing

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Test production build
npm run preview

# Check bundle size
npm run build -- --report
```

## 📝 Deployment Checklist

- [ ] All tests passing
- [ ] Production build successful
- [ ] Environment variables configured
- [ ] API endpoints updated
- [ ] HTTPS enabled
- [ ] Domain configured
- [ ] SSL certificate installed
- [ ] Service worker registered
- [ ] PWA manifest configured
- [ ] Icons added
- [ ] Error tracking setup
- [ ] Analytics configured
- [ ] Performance optimized
- [ ] Security headers set
- [ ] CORS configured
- [ ] Backup strategy in place

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        cd my-react-app
        npm install
    
    - name: Build
      run: |
        cd my-react-app
        npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        working-directory: ./my-react-app
```

## 🎯 Post-Deployment

1. **Verify Deployment**
   - Test all features
   - Check mobile responsiveness
   - Verify PWA installation
   - Test offline functionality

2. **Monitor Performance**
   - Check load times
   - Monitor error rates
   - Track user analytics
   - Review server logs

3. **User Acceptance Testing**
   - Get feedback from ASHA workers
   - Test with real data
   - Verify workflows
   - Document issues

## 📞 Support & Maintenance

- Set up monitoring alerts
- Create backup schedule
- Plan regular updates
- Document known issues
- Maintain changelog

## 🎉 Deployment Complete!

Your Mobile EHR Companion is now live and ready to help ASHA workers!

---

**Deployment Date**: _____________

**Deployed By**: _____________

**Environment**: ⬜ Staging | ⬜ Production

**URL**: _____________________________________________
