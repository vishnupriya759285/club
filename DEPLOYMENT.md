# Deployment Checklist

## Pre-Deployment

### Backend
- [ ] All environment variables defined in `.env.example`
- [ ] MongoDB Atlas cluster created and configured
- [ ] Database user created with appropriate permissions
- [ ] IP whitelist configured (0.0.0.0/0 for any IP)
- [ ] Connection string tested locally
- [ ] All dependencies in `package.json`
- [ ] Scripts defined: `start`, `dev`
- [ ] `.gitignore` includes `node_modules`, `.env`

### Frontend
- [ ] API URL configurable via environment variable
- [ ] All environment variables defined in `.env.example`
- [ ] Build command tested: `npm run build`
- [ ] Production build optimized
- [ ] `.gitignore` includes `node_modules`, `dist`, `.env`

## Render Deployment (Backend)

1. **Setup:**
   - [ ] Sign up at render.com
   - [ ] Connect GitHub repository
   - [ ] Create new Web Service

2. **Configuration:**
   - [ ] Name: `club-attendance-api`
   - [ ] Environment: `Node`
   - [ ] Branch: `main`
   - [ ] Root Directory: `backend` (if monorepo)
   - [ ] Build Command: `npm install`
   - [ ] Start Command: `npm start`

3. **Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your-secret-key
   JWT_EXPIRE=7d
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   ```

4. **Post-Deployment:**
   - [ ] Service deployed successfully
   - [ ] Health check endpoint accessible: `/api/health`
   - [ ] Copy service URL for frontend

## Vercel Deployment (Frontend)

1. **Setup:**
   - [ ] Sign up at vercel.com
   - [ ] Import GitHub repository
   - [ ] Select framework: Vite

2. **Configuration:**
   - [ ] Root Directory: `frontend` (if monorepo)
   - [ ] Framework Preset: `Vite`
   - [ ] Build Command: `npm run build`
   - [ ] Output Directory: `dist`
   - [ ] Install Command: `npm install`

3. **Environment Variables:**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

4. **Post-Deployment:**
   - [ ] Site deployed successfully
   - [ ] Can access login page
   - [ ] API calls working (check browser console)

## Post-Deployment Configuration

1. **Update CORS:**
   - [ ] Update backend `CORS_ORIGIN` with frontend URL
   - [ ] Redeploy backend if needed

2. **Testing:**
   - [ ] Register new user works
   - [ ] Login works
   - [ ] JWT token stored in localStorage
   - [ ] Protected routes require authentication
   - [ ] Teacher can create activities
   - [ ] Student can mark attendance
   - [ ] All API endpoints working

3. **MongoDB Atlas:**
   - [ ] Check database connections
   - [ ] Verify data is being stored
   - [ ] Monitor database size

## Monitoring

- [ ] Set up error tracking (e.g., Sentry)
- [ ] Monitor API response times
- [ ] Check MongoDB Atlas metrics
- [ ] Set up uptime monitoring

## Rollback Plan

If deployment fails:
1. Revert to previous version in Git
2. Redeploy from previous commit
3. Check error logs in Render/Vercel dashboard
4. Verify environment variables

## Production URLs

```
Backend API: https://____________.onrender.com
Frontend:    https://____________.vercel.app
MongoDB:     Atlas Cloud (managed)
```

## Security Checklist

- [ ] Strong JWT secret (32+ characters)
- [ ] Environment variables not committed
- [ ] CORS properly configured
- [ ] HTTPS enabled (automatic on Render/Vercel)
- [ ] MongoDB authentication enabled
- [ ] Input validation on all endpoints
- [ ] Password hashing with bcrypt
- [ ] No sensitive data in logs

## Performance Optimization

- [ ] Frontend build optimized (Vite minification)
- [ ] MongoDB indexes created
- [ ] API responses cached where appropriate
- [ ] Large responses paginated
- [ ] Images optimized (if using)

## Backup Strategy

- [ ] MongoDB Atlas automatic backups enabled
- [ ] Code in version control (GitHub)
- [ ] Environment variables documented
- [ ] Deployment process documented

---

**Deployment Date:** ___________  
**Deployed By:** ___________  
**Version:** v1.0.0
