/*
═══════════════════════════════════════════════════════════════════════════════
SOCIAL MEDIA DASHBOARD - DOM MANIPULATION JAVASCRIPT
═══════════════════════════════════════════════════════════════════════════════

This comprehensive project demonstrates all levels of DOM manipulation through
an interactive social media dashboard application.

TABLE OF CONTENTS:
═══════════════════════════════════════════════════════════════════════════════

BEGINNER CONCEPTS:
1. Element Selection (querySelector, querySelectorAll, getElementById)
2. Changing Content (textContent, innerHTML)
3. Changing Styles (style property)
4. Basic Event Listeners (click, input, submit)

INTERMEDIATE CONCEPTS:
5. Creating Elements Dynamically (createElement, appendChild)
6. Removing Elements (remove, removeChild)
7. DOM Traversal (parentElement, children, closest, nextSibling)
8. Class Manipulation (classList.add, remove, toggle, contains)
9. Form Handling (preventDefault, form values, validation)

ADVANCED CONCEPTS:
10. Dataset Attributes (data-*, dataset property)
11. Event Delegation (parent listeners handling child events)
12. Timers (setTimeout for notifications, setInterval for live clock)
13. Complex UI Updates (modals, accordions, filters, comments)
14. LocalStorage (saving/loading posts and user data)

═══════════════════════════════════════════════════════════════════════════════
*/


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 1: ELEMENT SELECTION (BEGINNER)
═══════════════════════════════════════════════════════════════════════════════

querySelector() - Selects the FIRST element that matches a CSS selector
querySelectorAll() - Selects ALL elements that match a CSS selector (returns NodeList)
getElementById() - Alternative method to select by ID

We select all the elements we need at the start for better performance
and cleaner code. This is called "caching" the DOM references.
═══════════════════════════════════════════════════════════════════════════════
*/

// Header elements
const userName = document.querySelector('#userName');
const createPostBtn = document.querySelector('#createPostBtn');
const emptyCreateBtn = document.querySelector('#emptyCreateBtn');

// Navigation buttons - querySelectorAll returns a NodeList (array-like)
const navButtons = document.querySelectorAll('.nav-btn');

// Statistics elements
const totalPostsEl = document.querySelector('#totalPosts');
const totalLikesEl = document.querySelector('#totalLikes');
const totalCommentsEl = document.querySelector('#totalComments');

// Filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');

// Accordion items
const accordionHeaders = document.querySelectorAll('.accordion-header');

// Time display element (will update with setInterval)
const currentTimeEl = document.querySelector('#currentTime');

// Posts container where we'll add posts dynamically
const postsContainer = document.querySelector('#postsContainer');
const emptyState = document.querySelector('#emptyState');

// Create Post Modal elements
const createPostModal = document.querySelector('#createPostModal');
const createPostForm = document.querySelector('#createPostForm');
const postContentInput = document.querySelector('#postContent');
const postCategorySelect = document.querySelector('#postCategory');
const closeModalBtn = document.querySelector('#closeModal');
const cancelPostBtn = document.querySelector('#cancelPost');

// Edit Post Modal elements
const editPostModal = document.querySelector('#editPostModal');
const editPostForm = document.querySelector('#editPostForm');
const editPostContent = document.querySelector('#editPostContent');
const closeEditModalBtn = document.querySelector('#closeEditModal');
const cancelEditBtn = document.querySelector('#cancelEdit');

// Toast notification elements
const toast = document.querySelector('#toast');
const toastMessage = document.querySelector('#toastMessage');


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 2: APPLICATION STATE & DATA STRUCTURES
═══════════════════════════════════════════════════════════════════════════════

We store our application data in JavaScript objects and arrays.
This makes it easy to manipulate, filter, and save to localStorage.
═══════════════════════════════════════════════════════════════════════════════
*/

// Posts array - stores all posts as objects
let posts = [];

// Current filter state
let currentFilter = 'all';

// Currently editing post ID (used for edit functionality)
let currentlyEditingPostId = null;

// User statistics
let userStats = {
    postsCreated: 0,
    totalLikes: 0,
    commentsMade: 0
};


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 3: INITIALIZATION & LOCALSTORAGE (ADVANCED)
═══════════════════════════════════════════════════════════════════════════════

localStorage allows us to save data in the browser that persists even after
the page is closed. We use JSON to convert objects to strings for storage.

JSON.stringify() - Converts JavaScript object to JSON string
JSON.parse() - Converts JSON string back to JavaScript object
localStorage.setItem() - Saves data
localStorage.getItem() - Retrieves data
═══════════════════════════════════════════════════════════════════════════════
*/

/**
 * Load posts from localStorage
 * Demonstrates: localStorage, JSON.parse, error handling with try/catch
 */
function loadPostsFromStorage() {
    try {
        // Get the stored posts string from localStorage
        const storedPosts = localStorage.getItem('socialPosts');
        
        // If posts exist, parse them from JSON string to JavaScript array
        if (storedPosts) {
            posts = JSON.parse(storedPosts);
            renderPosts();
            updateStatistics();
        }
        
        // Load user stats
        const storedStats = localStorage.getItem('userStats');
        if (storedStats) {
            userStats = JSON.parse(storedStats);
            updateStatisticsDisplay();
        }
    } catch (error) {
        // If there's an error (corrupted data), start fresh
        console.error('Error loading data:', error);
        posts = [];
        userStats = { postsCreated: 0, totalLikes: 0, commentsMade: 0 };
    }
}

/**
 * Save posts to localStorage
 * Demonstrates: localStorage, JSON.stringify
 */
function savePostsToStorage() {
    try {
        // Convert posts array to JSON string and save
        localStorage.setItem('socialPosts', JSON.stringify(posts));
        localStorage.setItem('userStats', JSON.stringify(userStats));
    } catch (error) {
        console.error('Error saving data:', error);
    }
}


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 4: BASIC EVENT LISTENERS (BEGINNER)
═══════════════════════════════════════════════════════════════════════════════

addEventListener() lets us respond to user interactions
First parameter: event type ('click', 'input', 'submit', etc.)
Second parameter: function to call when event happens

Common events:
- 'click' - when element is clicked
- 'input' - when input value changes (real-time)
- 'submit' - when form is submitted
- 'change' - when select/checkbox changes
═══════════════════════════════════════════════════════════════════════════════
*/

/**
 * Create Post Button - Opens the modal
 * Demonstrates: Basic click event listener
 */
createPostBtn.addEventListener('click', function() {
    openCreatePostModal();
});

// Empty state create button does the same thing
emptyCreateBtn.addEventListener('click', function() {
    openCreatePostModal();
});

/**
 * Close Modal Button
 * Demonstrates: Click event, calling functions
 */
closeModalBtn.addEventListener('click', function() {
    closeCreatePostModal();
});

/**
 * Cancel Button
 */
cancelPostBtn.addEventListener('click', function() {
    closeCreatePostModal();
});

/**
 * Close Edit Modal
 */
closeEditModalBtn.addEventListener('click', function() {
    closeEditPostModal();
});

cancelEditBtn.addEventListener('click', function() {
    closeEditPostModal();
});

/**
 * Click outside modal to close
 * Demonstrates: event.target checking
 */
createPostModal.addEventListener('click', function(event) {
    // event.target is the element that was actually clicked
    // If user clicked the overlay (not the modal content), close it
    if (event.target === createPostModal) {
        closeCreatePostModal();
    }
});

editPostModal.addEventListener('click', function(event) {
    if (event.target === editPostModal) {
        closeEditPostModal();
    }
});

/**
 * Form Submit Event
 * Demonstrates: Form handling, preventDefault, accessing form values
 */
createPostForm.addEventListener('submit', function(event) {
    /*
    PREVENTING DEFAULT BEHAVIOR (INTERMEDIATE)
    preventDefault() stops the form from submitting the traditional way
    (which would refresh the page). We want to handle it with JavaScript.
    */
    event.preventDefault();
    
    /*
    ACCESSING FORM VALUES (BEGINNER/INTERMEDIATE)
    .value property gets the current value from form inputs
    .trim() removes whitespace from beginning and end
    */
    const content = postContentInput.value.trim();
    const category = postCategorySelect.value;
    
    // Only create post if there's content
    if (content) {
        createPost(content, category);
        
        /*
        RESETTING FORM (INTERMEDIATE)
        Clear the form fields after submission
        */
        postContentInput.value = '';
        postCategorySelect.value = 'technology';
        
        // Close the modal
        closeCreatePostModal();
        
        // Show success notification
        showToast('Post created successfully! 🎉');
    }
});

/**
 * Edit Post Form Submit
 */
editPostForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const newContent = editPostContent.value.trim();
    
    if (newContent && currentlyEditingPostId) {
        updatePost(currentlyEditingPostId, newContent);
        closeEditPostModal();
        showToast('Post updated! ✏️');
    }
});


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 5: NAVIGATION & FILTERING
═══════════════════════════════════════════════════════════════════════════════

Demonstrates: forEach loops, classList manipulation, data attributes
═══════════════════════════════════════════════════════════════════════════════
*/

/**
 * Navigation buttons click handler
 * Demonstrates: forEach, classList, dataset attributes
 */
navButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        /*
        DATASET ATTRIBUTES (ADVANCED)
        data-view="feed" in HTML becomes dataset.view in JavaScript
        This is the best way to store custom data on elements
        */
        const view = button.dataset.view;
        
        /*
        CLASS MANIPULATION (INTERMEDIATE)
        Remove 'active' class from all buttons
        */
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        /*
        CLASS MANIPULATION (INTERMEDIATE)
        Add 'active' class to clicked button
        */
        button.classList.add('active');
        
        // Handle different views
        handleViewChange(view);
    });
});

/**
 * Filter buttons click handler
 * Demonstrates: Data attributes, filtering logic
 */
filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Get the category from data-category attribute
        const category = button.dataset.category;
        currentFilter = category;
        
        // Update active button styling
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter the posts
        filterPosts(category);
    });
});


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 6: ACCORDION FUNCTIONALITY (INTERMEDIATE/ADVANCED)
═══════════════════════════════════════════════════════════════════════════════

Demonstrates: DOM traversal, classList.toggle, finding siblings
═══════════════════════════════════════════════════════════════════════════════
*/

/**
 * Accordion click handlers
 * Demonstrates: forEach, closest, classList.toggle
 */
accordionHeaders.forEach(function(header) {
    header.addEventListener('click', function() {
        /*
        DOM TRAVERSAL (INTERMEDIATE)
        closest() finds the nearest ancestor element matching the selector
        This goes UP the DOM tree
        */
        const accordionItem = header.closest('.accordion-item');
        
        /*
        CLASS MANIPULATION (INTERMEDIATE)
        classList.toggle() adds the class if it's not there,
        removes it if it is there. Perfect for accordions!
        */
        accordionItem.classList.toggle('active');
    });
});


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 7: LIVE CLOCK WITH SETINTERVAL (ADVANCED)
═══════════════════════════════════════════════════════════════════════════════

setInterval() executes a function repeatedly at specified intervals
clearInterval() stops the interval

This creates a live updating clock that shows the current time
═══════════════════════════════════════════════════════════════════════════════
*/

/**
 * Update the current time display every second
 * Demonstrates: setInterval, Date object, textContent
 */
function startLiveClock() {
    // Function to update the time
    function updateTime() {
        // Get current date and time
        const now = new Date();
        
        // Format the time nicely
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        
        const timeString = now.toLocaleDateString('en-US', options);
        
        /*
        CHANGING CONTENT (BEGINNER)
        textContent sets the text inside an element
        */
        currentTimeEl.textContent = timeString;
    }
    
    // Update immediately
    updateTime();
    
    /*
    SETINTERVAL (ADVANCED)
    Calls updateTime every 1000 milliseconds (1 second)
    This creates the "live" updating effect
    */
    setInterval(updateTime, 1000);
}


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 8: CREATING POSTS DYNAMICALLY (INTERMEDIATE)
═══════════════════════════════════════════════════════════════════════════════

createElement() creates new HTML elements
appendChild() adds elements to the DOM
innerHTML sets HTML content inside an element

This section demonstrates building complex HTML structures with JavaScript
═══════════════════════════════════════════════════════════════════════════════
*/

/**
 * Create a new post
 * Demonstrates: Object creation, array manipulation, function calls
 */
function createPost(content, category) {
    // Create a post object with all necessary data
    const post = {
        id: Date.now().toString(), // Unique ID using timestamp
        content: content,
        category: category,
        author: userName.textContent,
        likes: 0,
        liked: false,
        saved: false,
        comments: [],
        timestamp: Date.now()
    };
    
    /*
    ARRAY MANIPULATION (INTERMEDIATE)
    unshift() adds item to the beginning of array
    (so newest posts appear first)
    */
    posts.unshift(post);
    
    // Update statistics
    userStats.postsCreated++;
    
    // Save to localStorage
    savePostsToStorage();
    
    // Re-render all posts
    renderPosts();
    
    // Update statistics display
    updateStatistics();
}

/**
 * Create a post card element
 * Demonstrates: EXTENSIVE createElement, innerHTML, dataset, classList
 */
function createPostElement(post) {
    /*
    CREATING ELEMENTS (INTERMEDIATE)
    createElement() creates a new element but doesn't add it to the page yet
    */
    const postCard = document.createElement('div');
    
    /*
    CLASS MANIPULATION (INTERMEDIATE)
    classList.add() adds one or more classes
    */
    postCard.classList.add('post-card');
    
    /*
    DATASET ATTRIBUTES (ADVANCED)
    data-* attributes store custom data on elements
    In HTML: <div data-id="123">
    In JS: element.dataset.id = "123"
    */
    postCard.dataset.id = post.id;
    postCard.dataset.category = post.category;
    
    // Calculate time ago
    const timeAgo = getTimeAgo(post.timestamp);
    
    /*
    SETTING HTML CONTENT (BEGINNER/INTERMEDIATE)
    innerHTML sets the HTML content inside an element
    We build complex nested HTML structures
    Template literals (backticks) allow multi-line strings
    */
    postCard.innerHTML = `
        <div class="post-header">
            <div class="post-author">
                <span class="author-avatar">👤</span>
                <div class="author-info">
                    <div class="author-name">${post.author}</div>
                    <div class="post-time">${timeAgo}</div>
                </div>
            </div>
            <span class="post-category">${getCategoryIcon(post.category)} ${post.category}</span>
        </div>
        
        <div class="post-content">${escapeHtml(post.content)}</div>
        
        <div class="post-actions">
            <button class="action-btn ${post.liked ? 'liked' : ''}" data-action="like">
                <span class="action-btn-icon">❤️</span>
                <span class="action-btn-text">${post.likes} Likes</span>
            </button>
            
            <button class="action-btn" data-action="comment">
                <span class="action-btn-icon">💬</span>
                <span class="action-btn-text">${post.comments.length} Comments</span>
            </button>
            
            <button class="action-btn ${post.saved ? 'saved' : ''}" data-action="save">
                <span class="action-btn-icon">🔖</span>
                <span class="action-btn-text">Save</span>
            </button>
            
            <button class="action-btn" data-action="edit">
                <span class="action-btn-icon">✏️</span>
                <span class="action-btn-text">Edit</span>
            </button>
            
            <button class="action-btn" data-action="delete">
                <span class="action-btn-icon">🗑️</span>
                <span class="action-btn-text">Delete</span>
            </button>
        </div>
        
        <div class="comments-section hidden">
            <form class="comment-form">
                <input type="text" class="comment-input" placeholder="Write a comment..." required>
                <button type="submit" class="btn-comment">Post</button>
            </form>
            <div class="comments-list">
                ${post.comments.map(comment => `
                    <div class="comment-item" data-comment-id="${comment.id}">
                        <div class="comment-header">
                            <span class="comment-author">${comment.author}</span>
                            <button class="comment-delete" data-comment-id="${comment.id}">🗑️</button>
                        </div>
                        <div class="comment-text">${escapeHtml(comment.text)}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    return postCard;
}


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 9: RENDERING POSTS (INTERMEDIATE)
═══════════════════════════════════════════════════════════════════════════════

This function clears the posts container and adds all posts
Demonstrates: Clearing content, looping, appendChild
═══════════════════════════════════════════════════════════════════════════════
*/

/**
 * Render all posts to the DOM
 * Demonstrates: innerHTML clearing, forEach, appendChild
 */
function renderPosts() {
    /*
    CLEARING CONTENT (INTERMEDIATE)
    Setting innerHTML to '' removes all child elements
    */
    postsContainer.innerHTML = '';
    
    /*
    SHOWING/HIDING ELEMENTS (INTERMEDIATE)
    classList methods to show or hide the empty state
    */
    if (posts.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        
        /*
        LOOPING THROUGH DATA (INTERMEDIATE)
        forEach() executes a function for each array element
        */
        posts.forEach(function(post) {
            const postElement = createPostElement(post);
            
            /*
            APPENDING TO DOM (INTERMEDIATE)
            appendChild() adds the created element to the page
            */
            postsContainer.appendChild(postElement);
        });
    }
}


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 10: EVENT DELEGATION (ADVANCED)
═══════════════════════════════════════════════════════════════════════════════

Instead of adding event listeners to each button individually,
we add ONE listener to the parent and check which button was clicked.

Benefits:
- Better performance (fewer listeners)
- Works on dynamically created elements
- Easier to manage

We use event.target to determine which element triggered the event
═══════════════════════════════════════════════════════════════════════════════
*/

/**
 * Event delegation for all post actions
 * Demonstrates: Event delegation, closest(), dataset, switch statements
 */
postsContainer.addEventListener('click', function(event) {
    /*
    EVENT TARGET (INTERMEDIATE)
    event.target is the element that was actually clicked
    */
    const target = event.target;
    
    /*
    DOM TRAVERSAL (INTERMEDIATE)
    Find the button that was clicked (might be the icon or text inside)
    closest() goes UP the DOM tree to find the nearest .action-btn
    */
    const actionBtn = target.closest('.action-btn');
    
    if (actionBtn) {
        /*
        DATASET ATTRIBUTES (ADVANCED)
        Read the data-action attribute to know which action to perform
        */
        const action = actionBtn.dataset.action;
        
        /*
        DOM TRAVERSAL (INTERMEDIATE)
        Go up to find the post card to get the post ID
        */
        const postCard = actionBtn.closest('.post-card');
        const postId = postCard.dataset.id;
        
        // Handle different actions
        switch (action) {
            case 'like':
                toggleLike(postId);
                break;
            case 'comment':
                toggleComments(postId);
                break;
            case 'save':
                toggleSave(postId);
                break;
            case 'edit':
                openEditPostModal(postId);
                break;
            case 'delete':
                deletePost(postId);
                break;
        }
    }
    
    // Handle comment form submission
    const commentForm = target.closest('.comment-form');
    if (commentForm && event.target.classList.contains('btn-comment')) {
        event.preventDefault();
        
        const postCard = commentForm.closest('.post-card');
        const postId = postCard.dataset.id;
        const commentInput = commentForm.querySelector('.comment-input');
        const commentText = commentInput.value.trim();
        
        if (commentText) {
            addComment(postId, commentText);
            commentInput.value = '';
        }
    }
    
    // Handle comment deletion
    const commentDelete = target.closest('.comment-delete');
    if (commentDelete) {
        const postCard = commentDelete.closest('.post-card');
        const postId = postCard.dataset.id;
        const commentId = commentDelete.dataset.commentId;
        deleteComment(postId, commentId);
    }
});


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 11: POST INTERACTIONS (INTERMEDIATE/ADVANCED)
═══════════════════════════════════════════════════════════════════════════════

Functions to handle likes, comments, saves, edits, and deletes
Demonstrates: Array methods (find, filter), object manipulation, re-rendering
═══════════════════════════════════════════════════════════════════════════════
*/

/**
 * Toggle like on a post
 * Demonstrates: Array.find(), property manipulation, conditional logic
 */
function toggleLike(postId) {
    /*
    ARRAY.FIND() (INTERMEDIATE)
    Searches array and returns the first element that matches
    */
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        // Toggle the liked state
        post.liked = !post.liked;
        
        // Update like count
        if (post.liked) {
            post.likes++;
            userStats.totalLikes++;
        } else {
            post.likes--;
            userStats.totalLikes--;
        }
        
        // Save and re-render
        savePostsToStorage();
        renderPosts();
        updateStatistics();
    }
}

/**
 * Toggle comments section visibility
 * Demonstrates: querySelector within element, classList.toggle
 */
function toggleComments(postId) {
    /*
    SELECTING WITHIN ELEMENT (INTERMEDIATE)
    querySelector can be called on any element, not just document
    This limits the search to within the post card
    */
    const postCard = document.querySelector(`[data-id="${postId}"]`);
    const commentsSection = postCard.querySelector('.comments-section');
    
    /*
    CLASS MANIPULATION (INTERMEDIATE)
    toggle() adds class if not present, removes if present
    */
    commentsSection.classList.toggle('hidden');
}

/**
 * Toggle save on a post
 */
function toggleSave(postId) {
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        post.saved = !post.saved;
        savePostsToStorage();
        renderPosts();
        
        const message = post.saved ? 'Post saved! 🔖' : 'Post unsaved';
        showToast(message);
    }
}

/**
 * Add a comment to a post
 * Demonstrates: Creating objects, array manipulation, statistics updates
 */
function addComment(postId, commentText) {
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        // Create comment object
        const comment = {
            id: Date.now().toString(),
            author: userName.textContent,
            text: commentText,
            timestamp: Date.now()
        };
        
        /*
        ARRAY MANIPULATION (INTERMEDIATE)
        push() adds item to end of array
        */
        post.comments.push(comment);
        
        // Update statistics
        userStats.commentsMade++;
        
        // Save and re-render
        savePostsToStorage();
        renderPosts();
        updateStatistics();
        
        // Re-open comments section
        toggleComments(postId);
        
        showToast('Comment added! 💬');
    }
}

/**
 * Delete a comment
 * Demonstrates: Array.filter() to remove items
 */
function deleteComment(postId, commentId) {
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        /*
        ARRAY.FILTER() (INTERMEDIATE)
        Creates new array excluding items that don't match
        This effectively "removes" the comment
        */
        post.comments = post.comments.filter(c => c.id !== commentId);
        
        // Update statistics
        userStats.commentsMade--;
        
        savePostsToStorage();
        renderPosts();
        updateStatistics();
        
        // Re-open comments
        toggleComments(postId);
    }
}

/**
 * Open edit modal with post content
 */
function openEditPostModal(postId) {
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        currentlyEditingPostId = postId;
        editPostContent.value = post.content;
        
        /*
        CLASS MANIPULATION (INTERMEDIATE)
        Add 'active' class to show modal
        */
        editPostModal.classList.add('active');
    }
}

/**
 * Update post content
 */
function updatePost(postId, newContent) {
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        post.content = newContent;
        savePostsToStorage();
        renderPosts();
    }
}

/**
 * Delete a post
 * Demonstrates: Array.filter(), removing from array
 */
function deletePost(postId) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this post?')) {
        const post = posts.find(p => p.id === postId);
        
        if (post) {
            // Update statistics
            userStats.postsCreated--;
            userStats.totalLikes -= post.likes;
            userStats.commentsMade -= post.comments.length;
        }
        
        /*
        ARRAY.FILTER() (INTERMEDIATE)
        Remove post from array
        */
        posts = posts.filter(p => p.id !== postId);
        
        savePostsToStorage();
        renderPosts();
        updateStatistics();
        
        showToast('Post deleted 🗑️');
    }
}


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 12: FILTERING POSTS (INTERMEDIATE)
═══════════════════════════════════════════════════════════════════════════════

Demonstrates: querySelectorAll, classList, dataset, filtering logic
═══════════════════════════════════════════════════════════════════════════════
*/

/**
 * Filter posts by category
 * Demonstrates: querySelectorAll, classList for show/hide
 */
function filterPosts(category) {
    /*
    SELECTING MULTIPLE ELEMENTS (BEGINNER)
    querySelectorAll gets all matching elements
    */
    const postCards = document.querySelectorAll('.post-card');
    
    /*
    LOOPING AND FILTERING (INTERMEDIATE)
    */
    postCards.forEach(function(card) {
        const postCategory = card.dataset.category;
        
        /*
        CONDITIONAL SHOWING/HIDING (INTERMEDIATE)
        */
        if (category === 'all' || postCategory === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 13: VIEW MANAGEMENT
═══════════════════════════════════════════════════════════════════════════════
*/

/**
 * Handle navigation view changes
 */
function handleViewChange(view) {
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(function(card) {
        const postId = card.dataset.id;
        const post = posts.find(p => p.id === postId);
        
        if (view === 'feed') {
            card.classList.remove('hidden');
        } else if (view === 'trending') {
            // Show posts with most likes
            if (post && post.likes >= 1) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        } else if (view === 'saved') {
            // Show only saved posts
            if (post && post.saved) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }
    });
}


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 14: MODAL MANAGEMENT (ADVANCED)
═══════════════════════════════════════════════════════════════════════════════

Demonstrates: classList manipulation for complex UI components
═══════════════════════════════════════════════════════════════════════════════
*/

/**
 * Open create post modal
 */
function openCreatePostModal() {
    createPostModal.classList.add('active');
    postContentInput.focus(); // Auto-focus the input
}

/**
 * Close create post modal
 */
function closeCreatePostModal() {
    createPostModal.classList.remove('active');
    postContentInput.value = '';
}

/**
 * Close edit post modal
 */
function closeEditPostModal() {
    editPostModal.classList.remove('active');
    editPostContent.value = '';
    currentlyEditingPostId = null;
}


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 15: STATISTICS & UPDATES (INTERMEDIATE)
═══════════════════════════════════════════════════════════════════════════════
*/

/**
 * Update statistics display
 * Demonstrates: textContent, animation classes
 */
function updateStatistics() {
    updateStatisticsDisplay();
}

function updateStatisticsDisplay() {
    /*
    CHANGING CONTENT (BEGINNER)
    */
    totalPostsEl.textContent = userStats.postsCreated;
    totalLikesEl.textContent = userStats.totalLikes;
    totalCommentsEl.textContent = userStats.commentsMade;
    
    /*
    ADDING ANIMATION CLASS (INTERMEDIATE)
    Add class temporarily for visual feedback
    */
    totalPostsEl.classList.add('updating');
    totalLikesEl.classList.add('updating');
    totalCommentsEl.classList.add('updating');
    
    /*
    SETTIMEOUT (ADVANCED)
    Remove animation class after animation completes
    */
    setTimeout(function() {
        totalPostsEl.classList.remove('updating');
        totalLikesEl.classList.remove('updating');
        totalCommentsEl.classList.remove('updating');
    }, 500);
}


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 16: TOAST NOTIFICATIONS (ADVANCED)
═══════════════════════════════════════════════════════════════════════════════

Demonstrates: setTimeout, classList for animations
═══════════════════════════════════════════════════════════════════════════════
*/

/**
 * Show toast notification
 * Demonstrates: textContent, classList, setTimeout
 */
function showToast(message) {
    /*
    CHANGING CONTENT (BEGINNER)
    */
    toastMessage.textContent = message;
    
    /*
    CLASS MANIPULATION (INTERMEDIATE)
    Add 'show' class to trigger CSS animation
    */
    toast.classList.add('show');
    
    /*
    SETTIMEOUT (ADVANCED)
    Automatically hide after 3 seconds
    setTimeout() executes code after a delay
    */
    setTimeout(function() {
        toast.classList.remove('show');
    }, 3000);
}


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 17: UTILITY FUNCTIONS
═══════════════════════════════════════════════════════════════════════════════
*/

/**
 * Get time ago string from timestamp
 */
function getTimeAgo(timestamp) {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

/**
 * Get category icon
 */
function getCategoryIcon(category) {
    const icons = {
        technology: '💻',
        food: '🍕',
        travel: '✈️',
        music: '🎵'
    };
    return icons[category] || '📝';
}

/**
 * Escape HTML to prevent XSS attacks
 * Important for security when inserting user-generated content
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


/*
═══════════════════════════════════════════════════════════════════════════════
SECTION 18: INITIALIZATION
═══════════════════════════════════════════════════════════════════════════════

Code that runs when the page loads
═══════════════════════════════════════════════════════════════════════════════
*/

// Load saved data from localStorage
loadPostsFromStorage();

// Start the live clock
startLiveClock();

// Log to console
console.log('Social Media Dashboard initialized! 🚀');
console.log('Posts loaded:', posts.length);


/*
═══════════════════════════════════════════════════════════════════════════════
KEY CONCEPTS SUMMARY
═══════════════════════════════════════════════════════════════════════════════

BEGINNER CONCEPTS DEMONSTRATED:
✓ querySelector/querySelectorAll - Selecting elements
✓ textContent - Changing text safely
✓ innerHTML - Setting HTML content
✓ .style property - Changing CSS
✓ addEventListener - Handling events
✓ .value - Getting form input values

INTERMEDIATE CONCEPTS DEMONSTRATED:
✓ createElement() - Creating new elements
✓ appendChild() - Adding to DOM
✓ remove() - Removing elements
✓ parentElement - Going up DOM tree
✓ closest() - Finding ancestors
✓ classList.add/remove/toggle/contains - Managing classes
✓ forEach() - Looping arrays
✓ Array.find() - Finding items
✓ Array.filter() - Filtering arrays
✓ preventDefault() - Stopping default behavior
✓ Form handling and validation

ADVANCED CONCEPTS DEMONSTRATED:
✓ data-* attributes (dataset) - Storing custom data
✓ Event delegation - Efficient event handling
✓ setTimeout - Delayed execution
✓ setInterval - Repeated execution
✓ localStorage - Data persistence
✓ JSON.stringify/parse - Data serialization
✓ Modal system - Complex UI component
✓ Accordion - Expandable sections
✓ Filtering system - Dynamic content filtering
✓ Live updates - Real-time statistics
✓ Complex state management - Application state
✓ Template literals - String interpolation
✓ Arrow functions - Modern syntax

REAL-WORLD PATTERNS:
✓ CRUD operations (Create, Read, Update, Delete)
✓ Form validation
✓ User feedback (toasts)
✓ Persistence (localStorage)
✓ Statistics tracking
✓ Content filtering
✓ Interactive UI components
✓ Responsive design considerations

═══════════════════════════════════════════════════════════════════════════════
*/
