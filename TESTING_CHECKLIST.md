# TinyLink Testing Checklist

Comprehensive testing checklist for the TinyLink URL shortener application.

## 🧪 Backend API Testing

### Health Check Endpoint
- [ ] **GET /healthz**
  - [ ] Returns status 200
  - [ ] Response body: `{"ok": true, "version": "1.0"}`
  - [ ] Response time < 500ms

### Create Link Endpoint
- [ ] **POST /api/links** - Valid URL
  - [ ] Accepts valid HTTP URLs
  - [ ] Accepts valid HTTPS URLs
  - [ ] Auto-adds https:// to URLs without protocol
  - [ ] Returns 201 status code
  - [ ] Response includes: code, targetUrl, shortUrl, clicks (0), createdAt
  - [ ] Generated code is 8 characters long
  - [ ] Generated code contains only alphanumeric characters

- [ ] **POST /api/links** - Custom Code
  - [ ] Accepts valid custom codes (letters, numbers, hyphens, underscores)
  - [ ] Returns 409 for duplicate custom codes
  - [ ] Rejects invalid characters in custom codes
  - [ ] Case-sensitive custom codes

- [ ] **POST /api/links** - Validation
  - [ ] Returns 400 for missing targetUrl
  - [ ] Returns 400 for invalid URL format
  - [ ] Returns 400 for empty targetUrl
  - [ ] Handles very long URLs (>2000 characters)

### Get All Links Endpoint
- [ ] **GET /api/links**
  - [ ] Returns status 200
  - [ ] Returns array of links
  - [ ] Links sorted by createdAt (newest first)
  - [ ] Each link includes: code, targetUrl, shortUrl, clicks, lastClicked, createdAt
  - [ ] Returns empty array when no links exist
  - [ ] Handles large number of links (>1000)

### Get Single Link Endpoint
- [ ] **GET /api/links/:code**
  - [ ] Returns 200 for existing links
  - [ ] Returns 404 for non-existent codes
  - [ ] Response includes all link properties
  - [ ] Case-sensitive code matching

### Delete Link Endpoint
- [ ] **DELETE /api/links/:code**
  - [ ] Returns 200 for successful deletion
  - [ ] Returns 404 for non-existent codes
  - [ ] Link is actually removed from database
  - [ ] Response: `{"message": "Link deleted successfully"}`

### Redirect Endpoint
- [ ] **GET /:code**
  - [ ] Returns 302 redirect for existing links
  - [ ] Redirects to correct target URL
  - [ ] Increments click count by 1
  - [ ] Updates lastClicked timestamp
  - [ ] Returns 404 for non-existent codes
  - [ ] Handles multiple rapid clicks correctly

### Error Handling
- [ ] **Database Connection**
  - [ ] Graceful handling of database disconnection
  - [ ] Proper error messages for connection issues
  - [ ] Application doesn't crash on DB errors

- [ ] **Invalid Routes**
  - [ ] Returns 404 for non-existent API endpoints
  - [ ] Proper error format for all error responses

## 🎨 Frontend Testing

### Dashboard Page (/)
- [ ] **Page Load**
  - [ ] Page loads without JavaScript errors
  - [ ] Header displays correctly
  - [ ] Create link form is visible
  - [ ] Loading state shows while fetching links

- [ ] **Create Link Form**
  - [ ] URL input accepts valid URLs
  - [ ] Custom code input accepts valid characters
  - [ ] Form validation shows appropriate errors
  - [ ] Success message displays after creation
  - [ ] Form resets after successful submission
  - [ ] Loading state during submission
  - [ ] Disabled state prevents double submission

- [ ] **Links Table**
  - [ ] Displays all links correctly
  - [ ] Shows proper empty state when no links
  - [ ] Click counts display correctly
  - [ ] Dates format properly
  - [ ] Copy button works for short URLs
  - [ ] Copy feedback shows "Copied!" message
  - [ ] Delete button shows confirmation dialog
  - [ ] Delete removes link from table immediately

- [ ] **Search Functionality**
  - [ ] Search input filters by code
  - [ ] Search input filters by target URL
  - [ ] Case-insensitive search
  - [ ] Real-time filtering as user types
  - [ ] Shows "No links found" when no matches

### Link Stats Page (/code/:code)
- [ ] **Page Load**
  - [ ] Loads correctly for existing links
  - [ ] Shows 404 error for non-existent links
  - [ ] Breadcrumb navigation works
  - [ ] Loading state displays properly

- [ ] **Link Information**
  - [ ] Displays correct short code
  - [ ] Shows full short URL
  - [ ] Displays target URL as clickable link
  - [ ] Copy button works for short URL
  - [ ] Copy feedback shows correctly

- [ ] **Statistics**
  - [ ] Click count displays prominently
  - [ ] Created date formats correctly
  - [ ] Last clicked date shows correctly or "Never"
  - [ ] Statistics update after link access

- [ ] **Actions**
  - [ ] Test link opens in new tab
  - [ ] Copy URL button works
  - [ ] Back to dashboard navigation works
  - [ ] Delete button shows confirmation
  - [ ] Delete redirects to dashboard

### Responsive Design
- [ ] **Mobile (320px - 768px)**
  - [ ] Header collapses appropriately
  - [ ] Forms are usable on small screens
  - [ ] Tables scroll horizontally if needed
  - [ ] Buttons are touch-friendly (44px minimum)
  - [ ] Text remains readable

- [ ] **Tablet (768px - 1024px)**
  - [ ] Layout adapts properly
  - [ ] All functionality remains accessible
  - [ ] Good use of available space

- [ ] **Desktop (1024px+)**
  - [ ] Full layout displays correctly
  - [ ] Optimal use of screen real estate
  - [ ] Hover states work properly

### Browser Compatibility
- [ ] **Chrome** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest)
- [ ] **Edge** (latest)
- [ ] **Mobile Safari** (iOS)
- [ ] **Chrome Mobile** (Android)

## 🔗 Integration Testing

### End-to-End Workflows
- [ ] **Create and Access Link**
  1. [ ] Create link through frontend
  2. [ ] Copy short URL
  3. [ ] Access short URL in new tab
  4. [ ] Verify redirect works
  5. [ ] Check click count incremented
  6. [ ] Verify lastClicked updated

- [ ] **Custom Code Workflow**
  1. [ ] Create link with custom code
  2. [ ] Verify custom code is used
  3. [ ] Test duplicate custom code rejection
  4. [ ] Access link with custom code

- [ ] **Link Management**
  1. [ ] Create multiple links
  2. [ ] Search for specific link
  3. [ ] View link statistics
  4. [ ] Delete link
  5. [ ] Verify link no longer accessible

### API Integration
- [ ] **Frontend-Backend Communication**
  - [ ] All API calls use correct endpoints
  - [ ] Error responses handled gracefully
  - [ ] Loading states work correctly
  - [ ] Success responses update UI immediately

- [ ] **Database Operations**
  - [ ] Links persist after creation
  - [ ] Click counts update correctly
  - [ ] Timestamps are accurate
  - [ ] Deletions are permanent

## 🚀 Performance Testing

### Backend Performance
- [ ] **Response Times**
  - [ ] Health check: < 100ms
  - [ ] Create link: < 500ms
  - [ ] Get all links: < 1000ms (for 1000+ links)
  - [ ] Redirect: < 200ms

- [ ] **Concurrent Users**
  - [ ] Handles 100 simultaneous requests
  - [ ] No race conditions in click counting
  - [ ] Database connections managed properly

### Frontend Performance
- [ ] **Load Times**
  - [ ] Initial page load: < 3 seconds
  - [ ] Subsequent navigation: < 1 second
  - [ ] API responses: < 2 seconds

- [ ] **Bundle Size**
  - [ ] JavaScript bundle < 1MB
  - [ ] CSS bundle < 100KB
  - [ ] Images optimized

## 🔒 Security Testing

### Input Validation
- [ ] **SQL Injection Prevention**
  - [ ] MongoDB injection attempts blocked
  - [ ] Special characters handled safely

- [ ] **XSS Prevention**
  - [ ] User input sanitized
  - [ ] URLs validated properly
  - [ ] No script execution in user content

- [ ] **CSRF Protection**
  - [ ] CORS configured correctly
  - [ ] Only allowed origins accepted

### URL Security
- [ ] **Malicious URLs**
  - [ ] Blocks javascript: URLs
  - [ ] Blocks data: URLs with scripts
  - [ ] Validates URL format strictly

## 📱 Accessibility Testing

### WCAG Compliance
- [ ] **Keyboard Navigation**
  - [ ] All interactive elements focusable
  - [ ] Tab order is logical
  - [ ] Focus indicators visible

- [ ] **Screen Reader Support**
  - [ ] Proper heading hierarchy
  - [ ] Form labels associated correctly
  - [ ] Alt text for images/icons

- [ ] **Color Contrast**
  - [ ] Text meets WCAG AA standards
  - [ ] Interactive elements clearly distinguishable
  - [ ] Error states clearly visible

## 🌐 Cross-Platform Testing

### Operating Systems
- [ ] **Windows 10/11**
- [ ] **macOS** (latest)
- [ ] **Linux** (Ubuntu/similar)
- [ ] **iOS** (latest)
- [ ] **Android** (latest)

### Network Conditions
- [ ] **Fast Connection** (WiFi)
- [ ] **Slow Connection** (3G)
- [ ] **Intermittent Connection**
- [ ] **Offline Behavior** (graceful degradation)

## 🔧 Error Handling Testing

### Network Errors
- [ ] **Backend Unavailable**
  - [ ] Frontend shows appropriate error message
  - [ ] Retry functionality works
  - [ ] No JavaScript errors in console

- [ ] **Timeout Scenarios**
  - [ ] Long-running requests timeout gracefully
  - [ ] User receives feedback about timeout
  - [ ] Application remains functional

### Data Validation Errors
- [ ] **Invalid Input**
  - [ ] Clear error messages displayed
  - [ ] Form validation prevents submission
  - [ ] Error states are accessible

## 📊 Analytics Testing

### Click Tracking
- [ ] **Accurate Counting**
  - [ ] Each redirect increments count by 1
  - [ ] Multiple rapid clicks counted correctly
  - [ ] Bot traffic handled appropriately

- [ ] **Timestamp Accuracy**
  - [ ] lastClicked updates on each access
  - [ ] Timezone handling correct
  - [ ] Date formatting consistent

## ✅ Deployment Testing

### Production Environment
- [ ] **Environment Variables**
  - [ ] All required variables set
  - [ ] Database connection works
  - [ ] CORS configured for production domain

- [ ] **SSL/HTTPS**
  - [ ] All connections use HTTPS
  - [ ] Mixed content warnings resolved
  - [ ] Certificates valid

### Monitoring
- [ ] **Health Checks**
  - [ ] Uptime monitoring configured
  - [ ] Error tracking enabled
  - [ ] Performance monitoring active

## 🎯 User Acceptance Testing

### User Scenarios
- [ ] **New User**
  1. [ ] Understands purpose immediately
  2. [ ] Can create first link easily
  3. [ ] Finds copy functionality intuitive
  4. [ ] Successfully shares short link

- [ ] **Power User**
  1. [ ] Can create multiple links quickly
  2. [ ] Uses search to find specific links
  3. [ ] Manages links effectively
  4. [ ] Understands analytics data

- [ ] **Mobile User**
  1. [ ] Can use app on phone effectively
  2. [ ] Copy/paste works smoothly
  3. [ ] Touch targets are appropriate
  4. [ ] Text is readable without zooming

## 📝 Test Execution Notes

### Test Environment Setup
```bash
# Backend testing
cd backend
npm test  # If test suite exists
npm run dev

# Frontend testing
cd frontend
npm test  # React testing library
npm start

# Manual testing URLs
Backend: http://localhost:5000
Frontend: http://localhost:3000
Health: http://localhost:5000/healthz
```

### Test Data
```javascript
// Sample test URLs
const testUrls = [
  'https://google.com',
  'https://github.com/user/repo',
  'https://very-long-domain-name.example.com/path/to/resource',
  'http://example.com',  // Should auto-convert to https
];

// Sample custom codes
const testCodes = [
  'test123',
  'my-link',
  'custom_code',
  'ABC-123',
];
```

### Bug Report Template
```markdown
**Bug Title**: Brief description
**Severity**: Critical/High/Medium/Low
**Steps to Reproduce**:
1. Step one
2. Step two
3. Step three

**Expected Result**: What should happen
**Actual Result**: What actually happened
**Environment**: Browser, OS, Device
**Screenshots**: If applicable
```

## 🏆 Success Criteria

Testing is complete when:
- [ ] All critical functionality works correctly
- [ ] No security vulnerabilities identified
- [ ] Performance meets requirements
- [ ] Accessibility standards met
- [ ] Cross-browser compatibility confirmed
- [ ] Mobile experience is excellent
- [ ] Error handling is robust
- [ ] User experience is intuitive

## 📞 Testing Support

For testing questions or issues:
- Review API documentation in README.md
- Check deployment guide in DEPLOYMENT.md
- Create GitHub issues for bugs
- Document all test results