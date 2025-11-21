# TOC Auto-Scroll Implementation

## Overview
Added automatic scrolling to the "On this page" sidebar to keep the active section visible, especially important for long pages like Performance (43 TOC items) and Architecture.

## Problem
On pages with many sections, the TOC sidebar can be very long. When users scroll through the document:
- The active TOC item might be outside the visible area
- Users can't see which section they're currently reading
- Manual scrolling of the TOC is tedious

## Solution
Implemented automatic scrolling of the TOC sidebar to keep the active item visible and centered.

## Features

### 1. **Auto-Scroll on Active Change**
When the active section changes as the user scrolls:
- TOC automatically scrolls to bring active item into view
- Active item is centered in the sidebar
- Smooth scroll animation for better UX

### 2. **Smart Visibility Detection**
```javascript
const isAboveView = linkRect.top < sidebarRect.top;
const isBelowView = linkRect.bottom > sidebarRect.bottom;

if (isAboveView || isBelowView) {
  // Scroll to center the active item
}
```
Only scrolls when the active item is outside the visible area.

### 3. **Centered Positioning**
Active items are centered in the sidebar (not at top/bottom):
```javascript
const scrollTo = linkOffsetInSidebar - (sidebarHeight / 2) + (linkHeight / 2);
```

### 4. **Click Handler Integration**
When user clicks a TOC item:
- Page scrolls to that section
- TOC scrolls to show the clicked item
- Immediate visual feedback

### 5. **Initial Load Positioning**
On page load, the TOC scrolls to show the first active item.

## Technical Implementation

### HTML Changes

#### Added ID to TOC Sidebar
```html
<aside id="toc-sidebar" class="... scroll-smooth">
```
- `id="toc-sidebar"` - JavaScript target
- `scroll-smooth` - Native smooth scrolling

### JavaScript Functions

#### `scrollTocToActiveItem(activeLink)`
Core auto-scroll function:

**Parameters:**
- `activeLink` - The DOM element of the active TOC link

**Logic:**
1. Get bounding rectangles of sidebar and link
2. Check if link is outside visible area
3. Calculate scroll position to center the link
4. Scroll with smooth behavior

**Code:**
```javascript
function scrollTocToActiveItem(activeLink) {
  if (!tocSidebar || !activeLink) return;
  
  const sidebarRect = tocSidebar.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();
  
  // Check if link is outside visible area
  const isAboveView = linkRect.top < sidebarRect.top;
  const isBelowView = linkRect.bottom > sidebarRect.bottom;
  
  if (isAboveView || isBelowView) {
    // Calculate position to center the active item
    const linkOffsetInSidebar = activeLink.offsetTop;
    const sidebarHeight = tocSidebar.clientHeight;
    const linkHeight = activeLink.offsetHeight;
    
    // Scroll to center (with protection against negative scroll)
    const scrollTo = linkOffsetInSidebar - (sidebarHeight / 2) + (linkHeight / 2);
    
    tocSidebar.scrollTo({
      top: Math.max(0, scrollTo),
      behavior: 'smooth'
    });
  }
}
```

### Integration Points

#### 1. In `updateActiveTocLink()`
```javascript
let activeLinkElement = null;

tocLinks.forEach(link => {
  if (isActive) {
    activeLinkElement = link;
    // ... styling ...
  }
});

// Auto-scroll TOC to show active item
if (activeLinkElement) {
  scrollTocToActiveItem(activeLinkElement);
}
```

#### 2. In Click Handler
```javascript
link.addEventListener('click', (e) => {
  // ... scroll page ...
  
  // Scroll TOC to show clicked item
  scrollTocToActiveItem(link);
  
  // ... update ...
});
```

#### 3. On Initial Load
```javascript
// Scroll to show first active item on load
setTimeout(() => {
  const firstActiveLink = document.querySelector('.toc-link.text-primary');
  if (firstActiveLink) {
    scrollTocToActiveItem(firstActiveLink);
  }
}, 100);
```

## Performance Considerations

### Efficient Detection
- Only scrolls when item is outside view
- Uses `getBoundingClientRect()` for accurate positioning
- No unnecessary scrolling when item is already visible

### Smooth Behavior
- Uses native `scroll-smooth` CSS
- Uses `scrollTo({ behavior: 'smooth' })`
- Smooth animations don't block UI

### No Performance Impact
- Function only runs when active section changes
- Already throttled by existing scroll listener
- Uses `requestAnimationFrame` for optimal performance

## User Experience Benefits

### For Long Pages (e.g., Performance with 43 items)
✅ Always see which section you're reading  
✅ No need to manually scroll TOC  
✅ Smooth, automatic updates  
✅ Active item always visible  

### For Short Pages
✅ No unnecessary scrolling  
✅ Everything visible by default  
✅ No performance overhead  

### Visual Feedback
- Smooth scroll animations
- Centered active item (easy to spot)
- Purple/pink highlighting remains visible
- Intuitive and predictable behavior

## Example Scenarios

### Scenario 1: User Scrolls Down Long Page
```
User at section 1  →  TOC shows section 1 at top
User scrolls down  →  Active changes to section 15
TOC auto-scrolls   →  Section 15 centered in view
```

### Scenario 2: User Clicks TOC Item
```
User clicks section 30  →  Page scrolls to section
TOC scrolls            →  Section 30 centered
Active highlight       →  Purple line on section 30
```

### Scenario 3: Page Load
```
Page loads            →  First section active by default
TOC auto-scrolls      →  First item visible (top of list)
User ready to read    →  Clear starting point
```

## Pages Benefiting Most

Based on TOC item counts:

**High Item Count (>20):**
- Performance: 43 items ⭐
- Architecture pages: Multiple sections
- Language-specific guides

**Medium Item Count (10-20):**
- Introduction: ~8 items
- Getting Started: ~10 items

**Low Item Count (<10):**
- Most other pages

## Files Modified

### `/Users/baasilali/workspace/elide-docs/build-static.mjs`

**Changes:**
1. Added `id="toc-sidebar"` to TOC aside
2. Added `scroll-smooth` class to TOC aside
3. Created `scrollTocToActiveItem()` function
4. Integrated auto-scroll in `updateActiveTocLink()`
5. Added auto-scroll to click handler
6. Added initial scroll on page load

**Lines Added:** ~40 lines of JavaScript

## Testing Recommendations

### Pages to Test
1. `/docs/performance.html` - 43 items (stress test)
2. `/docs/introduction.html` - ~8 items (normal)
3. `/docs/architecture/security.html` - Long page

### Test Cases
✅ Scroll down page - TOC follows  
✅ Scroll up page - TOC follows  
✅ Click TOC item - Both scroll correctly  
✅ Page load - First item visible  
✅ Fast scrolling - No lag or stutter  
✅ Short pages - No unnecessary scrolling  

---

**Status:** ✅ Complete and ready for testing  
**Date:** 2025-11-21  
**Performance Impact:** Negligible (only scrolls when needed)  
**Browser Compatibility:** Modern browsers with `scrollTo()` support

