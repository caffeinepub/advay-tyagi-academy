# Advay Tyagi Academy

## Current State
Full rebuild required. Draft expired. Previous versions had persistent admin panel failures due to stale frontend code calling `_initializeAccessControlWithSecret` and relying on backend `isCallerAdmin()` calls that kept failing.

## Requested Changes (Diff)

### Add
- Clean backend with `grantPremium`, `revokePremium`, `hasPremium`, `getZoomMeetings`, `addZoomMeeting`, `deactivateZoomMeeting` functions
- Admin check done PURELY on frontend by comparing Principal ID string to hardcoded admin ID
- All pages and tabs from previous version

### Modify
- Admin panel: frontend-only admin check (no backend call), compare principal to hardcoded `hzsfz-kiu7s-v7ls7-t7khq-ydmaz-ycmoh-tbz6k-vydx4-7nmxd-6qcse-jae`
- Admin automatically has premium access (checked on frontend)
- E-Books locked for non-premium: show "Go to Payment" button redirecting to Payment tab
- Zoom Meetings locked for non-premium: show "Go to Payment" button redirecting to Payment tab

### Remove
- All obsolete `_initializeAccessControlWithSecret` calls
- Any `getSecretParameter` imports

## Implementation Plan

### Backend (Motoko)
- Hardcode admin Principal: `hzsfz-kiu7s-v7ls7-t7khq-ydmaz-ycmoh-tbz6k-vydx4-7nmxd-6qcse-jae`
- `grantPremium(principalId: Text): async Bool` - admin only, adds to premiumUsers HashMap
- `revokePremium(principalId: Text): async Bool` - admin only
- `hasPremium(): async Bool` - checks if caller is in premiumUsers
- `getPremiumUsers(): async [Text]` - admin only, list all premium users
- `getZoomMeetings(): async [ZoomMeeting]` - returns all meetings
- `addZoomMeeting(month: Text, title: Text, id: Text, passcode: Text, link: Text): async Bool` - admin only
- `deactivateZoomMeeting(id: Text): async Bool` - admin only

### Frontend
- Navbar: Home, Masterclasses, Geopolitics, E-Books, Zoom Meetings, Courses, Payment, FAQs, Admin (only visible to admin)
- Admin check: `principalId === 'hzsfz-kiu7s-v7ls7-t7khq-ydmaz-ycmoh-tbz6k-vydx4-7nmxd-6qcse-jae'` purely in JS
- Admin and premium users can access E-Books and Zoom Meetings
- Payment tab: billing form (name, email, phone, state, coupon), bill summary, UPI instructions, WhatsApp confirm
- Courses tab: Indian Modern History (₹699, batch 16th April) and European Modern History (₹699, batch 18th April)
- Pay Now from courses sets bill to ₹699; Enroll from masterclass sets bill to ₹500
- Coupons: GET20 (20% off), WAR25 (25% off)
- FAQs with WhatsApp feedback button (9220561379)
- E-Books: 3 tabs - Famous Personalities (Coming Soon), Wars PDF, Middle East PDF
- Zoom Meetings: April active meeting, March deactivated, grouped by month
