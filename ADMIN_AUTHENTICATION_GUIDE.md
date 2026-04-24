# Admin Authentication & Data Management Guide

## Overview
The portfolio now features a complete admin system with password protection, data persistence, and media management capabilities.

## 🔐 Admin Access

### How to Access Admin Panel

**URL:** Navigate to `/admin` (e.g., `http://localhost:5173/admin`)

**Default Credentials:**
- Password: `admin123`

**Important:** Change the default password immediately after first login!

### Login Features
- Password-protected access
- Show/hide password toggle
- Session persistence (stays logged in)
- Secure logout
- Error handling
- Loading states

## 📊 Data Management System

### LocalStorage Persistence
All data is automatically saved to browser localStorage:
- **Projects:** `portfolio_projects`
- **Profile Data:** `portfolio_profile`
- **Authentication:** `admin_authenticated`

### Data Context
The application uses React Context API for global state management:
```typescript
- projects: Project[]
- profileData: ProfileData
- isAuthenticated: boolean
- setProjects()
- setProfileData()
- login()
- logout()
```

## 🎨 Features Implemented

### 1. Password Protection
- ✅ Login required to access admin panel
- ✅ Session management with localStorage
- ✅ Secure logout functionality
- ✅ No admin button visible on public site

### 2. Profile Picture Upload
**Location:** Admin → Settings → Profile Information

**Features:**
- Upload custom profile photo
- Preview before saving
- Remove photo option
- Supports JPG, PNG, GIF
- Max file size: 5MB
- Displays on public portfolio sidebar

**How to Use:**
1. Go to Settings
2. Click "Upload Photo"
3. Select image file
4. Click "Save Profile"

### 3. Project Media Management
**Location:** Admin → Projects → Add/Edit Project

**Features:**
- Upload multiple images per project
- Upload videos
- Upload project logos
- Drag & drop support
- Preview uploaded media
- Remove individual files
- File type detection (image/video/logo)

**Supported Formats:**
- Images: JPG, PNG, GIF, SVG
- Videos: MP4, WebM

**Display on Frontend:**
- First media item shown as project thumbnail
- Video projects show play button overlay
- "+X more" badge for multiple media
- Fallback gradient if no media uploaded

### 4. Working Project Links
**Location:** Admin → Projects → Add/Edit Project

**Fields:**
- **Live URL:** Link to live deployed project
- **Case Study URL:** Link to detailed case study
- Both fields are optional
- Links open in new tab on frontend
- Only shows buttons if URLs are provided

### 5. Profile Data Integration
**Location:** Admin → Settings

**Editable Fields:**
- Full Name
- Professional Title
- Location
- Email
- Phone
- Bio
- Profile Photo (NEW!)
- GitHub URL
- LinkedIn URL
- Twitter URL
- Website URL

**Frontend Integration:**
- Profile photo displays in sidebar
- Social links connect to actual profiles
- Email link opens mail client

## 🚀 How It Works

### Authentication Flow

```
1. User navigates to /admin
   ↓
2. Check if authenticated (localStorage)
   ↓
3a. NOT Authenticated → Show Login Page
    ↓
    Enter Password → Validate
    ↓
    Success → Set auth flag → Show Admin Panel
    
3b. IS Authenticated → Show Admin Panel directly
```

### Data Flow

```
Admin Updates Data
   ↓
Update Context State
   ↓
Context useEffect triggers
   ↓
Save to localStorage
   ↓
Frontend reads from Context
   ↓
Display updated data
```

### Logout Flow

```
User clicks Logout
   ↓
Clear auth flag from localStorage
   ↓
Update context state
   ↓
Redirect to home (/)
   ↓
Show public portfolio
```

## 🔧 Changing Admin Password

### Current Method (Code Change Required)
**File:** `src/app/contexts/DataContext.tsx`
**Line:** ~52

```typescript
// Find this line:
const ADMIN_PASSWORD = "admin123";

// Change to your password:
const ADMIN_PASSWORD = "your_secure_password_here";
```

### Future Enhancement
A password change feature will be added to Settings where you can:
1. Enter current password
2. Enter new password
3. Confirm new password
4. Save changes securely

## 📁 File Structure

```
src/app/
├── contexts/
│   └── DataContext.tsx          # Global state & localStorage
├── components/
│   ├── admin/
│   │   ├── AdminLogin.tsx       # Password login page
│   │   ├── AdminPage.tsx        # Main admin dashboard
│   │   ├── AdminLayout.tsx      # Admin sidebar & layout
│   │   ├── ProjectsManager.tsx  # Project CRUD (uses Context)
│   │   ├── Settings.tsx         # Profile settings (with photo upload)
│   │   ├── MediaUploader.tsx    # Reusable media upload component
│   │   └── ...
│   └── modern/
│       ├── Sidebar.tsx          # Shows profile photo
│       ├── ModernProjects.tsx   # Shows uploaded media
│       └── ...
└── App.tsx                      # Routing & authentication logic
```

## 💾 Data Storage Details

### Projects Storage
```json
{
  "id": "timestamp",
  "title": "Project Name",
  "category": "Category",
  "description": "Description",
  "features": ["feature1", "feature2"],
  "tech": ["tech1", "tech2"],
  "liveUrl": "https://...",
  "caseStudyUrl": "https://...",
  "media": [
    {
      "id": "unique-id",
      "type": "image|video|logo",
      "url": "data:image/png;base64,...",
      "name": "filename.png",
      "size": "1.2 MB"
    }
  ],
  "logo": "url or data URI"
}
```

### Profile Data Storage
```json
{
  "fullName": "Name",
  "title": "Job Title",
  "location": "City, Country",
  "email": "email@example.com",
  "phone": "+234...",
  "bio": "Professional bio",
  "profilePhoto": "data:image/png;base64,...",
  "github": "https://github.com/...",
  "linkedin": "https://linkedin.com/in/...",
  "twitter": "https://twitter.com/...",
  "website": "https://..."
}
```

## 🎯 Usage Examples

### Adding a New Project with Media
1. Navigate to `/admin` and login
2. Click "Projects" in sidebar
3. Click "Add Project" button
4. Fill in project details:
   - Title: "My Awesome App"
   - Category: "Web Application"
   - Description: "A cool app that does X"
   - Live URL: "https://myapp.com"
5. Scroll to Media section
6. Drag & drop screenshots/videos
7. Review uploaded files
8. Click "Save Project"
9. Visit portfolio to see it live!

### Updating Profile Picture
1. Login to admin panel
2. Click "Settings" in sidebar
3. Find "Profile Photo" section
4. Click "Upload Photo"
5. Select your photo
6. Preview appears
7. Click "Save Profile"
8. Check public portfolio sidebar - photo appears!

### Editing Project Links
1. Go to Projects in admin
2. Click edit icon on any project
3. Update "Live URL" field
4. Update "Case Study URL" field
5. Click "Save"
6. Frontend buttons now work with new links

## 🔒 Security Considerations

### Current Implementation
- ✅ Password protection
- ✅ Session persistence
- ✅ Client-side authentication
- ✅ No admin UI on public site

### Limitations
- ⚠️ Password stored in code (not ideal for production)
- ⚠️ Client-side auth only (no backend verification)
- ⚠️ LocalStorage can be cleared by user

### Production Recommendations
For a production deployment, consider:
1. **Backend Authentication:** Use JWT tokens with backend API
2. **Password Hashing:** Never store passwords in plain text
3. **HTTPS Only:** Force HTTPS for admin panel
4. **Rate Limiting:** Prevent brute force attacks
5. **Session Timeout:** Auto-logout after inactivity
6. **2FA:** Add two-factor authentication
7. **Audit Logs:** Track all admin actions
8. **Database:** Move from localStorage to database

## 🐛 Troubleshooting

### "Invalid Password" Error
- Verify you're using: `admin123`
- Check for typos
- Password is case-sensitive

### Data Not Persisting
- Check browser localStorage is enabled
- Clear cache and try again
- Check browser console for errors

### Profile Photo Not Showing
- Ensure file is under 5MB
- Use supported format (JPG, PNG, GIF)
- Click "Save Profile" after upload
- Refresh the page

### Project Links Not Working
- Ensure URLs include `https://`
- Check URLs are valid
- Save project after editing
- Hard refresh browser (Ctrl+F5)

### Admin Panel Not Loading
- Clear localStorage: `localStorage.clear()`
- Try incognito/private mode
- Check browser console for errors

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Verify localStorage data
3. Try logout and login again
4. Clear browser cache
5. Review this documentation

## 🎉 Success Checklist

- [ ] Can login to `/admin` with password
- [ ] Profile photo uploads and displays
- [ ] Projects show uploaded images/videos
- [ ] Project links work on frontend
- [ ] Data persists after page reload
- [ ] No admin button visible to visitors
- [ ] Logout works correctly
- [ ] Social links connect properly

## 🚀 Future Enhancements

Planned improvements:
- Password change in Settings UI
- Multi-user support with roles
- Image compression before upload
- Cloud storage integration (AWS S3, Cloudinary)
- Bulk project import/export
- Backup and restore functionality
- Activity logs and version history
- Email notifications for contact form
- Real-time preview of changes
- Mobile-responsive admin panel
