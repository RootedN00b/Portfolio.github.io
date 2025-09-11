// JavaScript for SPA routing, mobile menu, and Hashnode/YouTube integration.

document.addEventListener('DOMContentLoaded', () => {

    // --- Page Switching (SPA Logic) ---
    const pages = document.querySelectorAll('.page-content');
    const navLinks = document.querySelectorAll('.nav-link');

    const showPage = (pageId) => {
        pages.forEach(page => {
            if (page.dataset.page === pageId) {
                page.classList.remove('hidden');
                page.classList.add('active-page');
            } else {
                page.classList.add('hidden');
                page.classList.remove('active-page');
            }
        });

        navLinks.forEach(link => {
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // Listen for navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const pageId = event.target.dataset.page;
            showPage(pageId);
        });
    });

    // Handle initial page load
    const initialPage = window.location.hash.substring(1) || 'home';
    showPage(initialPage);

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on nav click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- Hashnode Blog Integration ---
    // Replace this with your Hashnode username
    const HASHNODE_USERNAME = 'RootedNoob';
    const blogPostsContainer = document.getElementById('blog-posts-container');
    const errorMessage = (message) => `<tr><td colspan="3" class="text-center py-4"><p class="data-block-text text-red-500">${message}</p></td></tr>`;

    const fetchBlogPosts = async () => {
        if (HASHNODE_USERNAME === 'RootedNoob') {
            blogPostsContainer.innerHTML = errorMessage("Error: Hashnode username not configured. Check the script.");
            return;
        }

        const query = `
            query GetUserArticles($username: String!) {
                user(username: $username) {
                    publication {
                        posts(page: 0) {
                            title
                            slug
                            brief
                            coverImage
                        }
                    }
                }
            }
        `;

        try {
            const response = await fetch('https://api.hashnode.com/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    variables: { username: HASHNODE_USERNAME }
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.errors) {
                throw new Error(data.errors.map(err => err.message).join(', '));
            }

            const posts = data.data.user.publication.posts;
            renderBlogPosts(posts);
        } catch (err) {
            console.error("Failed to fetch blog posts:", err);
            blogPostsContainer.innerHTML = errorMessage("Failed to load blog posts. Check your username and network.");
        }
    };

    const renderBlogPosts = (posts) => {
        if (posts.length === 0) {
            blogPostsContainer.innerHTML = '<tr><td colspan="3" class="text-center py-4"><p class="data-block-text">No blog posts found.</p></td></tr>';
            return;
        }

        blogPostsContainer.innerHTML = ''; // Clear loading message

        posts.forEach(post => {
            const postUrl = `https://hashnode.com/@${HASHNODE_USERNAME}/${post.slug}`;
            const postRow = `
                <tr>
                    <td>
                        <a href="${postUrl}" target="_blank" rel="noopener noreferrer">
                            <img src="${post.coverImage || 'https://placehold.co/100x75/0a0a0a/a3e635?text=blog'}" alt="${post.title} cover image" class="table-image">
                        </a>
                    </td>
                    <td>
                        <a href="${postUrl}" target="_blank" rel="noopener noreferrer" class="table-link">${post.title}</a>
                    </td>
                    <td><p class="data-block-text font-sans">${post.brief}</p></td>
                </tr>
            `;
            blogPostsContainer.innerHTML += postRow;
        });
    };

    fetchBlogPosts();

    // --- YouTube Video Integration ---
    const youtubeSearchInput = document.getElementById('youtube-search-input');
    const youtubeSearchButton = document.getElementById('youtube-search-button');
    const youtubeResultsContainer = document.getElementById('youtube-results-container');
    const videoPlayerContainer = document.getElementById('video-player-container');
    const videoIframe = document.getElementById('video-iframe');
    const videoSummary = document.getElementById('video-summary');

    // Initial load with a default query
    fetchYoutubeVideos('cybersecurity tutorials');

    youtubeSearchButton.addEventListener('click', () => {
        const query = youtubeSearchInput.value || 'cybersecurity tutorials';
        fetchYoutubeVideos(query);
    });

    const fetchYoutubeVideos = async (query) => {
        youtubeResultsContainer.innerHTML = '<tr><td colspan="3" class="text-center py-4"><p class="data-block-text">Searching YouTube...</p></td></tr>';

        try {
            // Using `Google Search` to find relevant videos based on popularity/relevance
            const searchResults = await new Promise(resolve => {
                // Mocking tool call as this environment cannot make API calls
                console.log(`Searching YouTube for: ${query}`);
                setTimeout(() => resolve({
                    "results": [
                        { "title": "What is Penetration Testing?", "url": "https://www.youtube.com/watch?v=R-k1wWq_K44", "channel_name": "Hak5" },
                        { "title": "Linux Server Hardening Basics", "url": "https://www.youtube.com/watch?v=F0_E98c6q7w", "channel_name": "NetworkChuck" },
                        { "title": "Python for Network Engineers", "url": "https://www.youtube.com/watch?v=d_M-fJ35h_I", "channel_name": "David Bombal" }
                    ]
                }), 1000);
            });
            renderYoutubeResults(searchResults.results);
        } catch (error) {
            console.error('Failed to fetch YouTube videos:', error);
            youtubeResultsContainer.innerHTML = errorMessage("Failed to load videos. Please try again later.");
        }
    };

    const fetchVideoSummary = async (videoUrl) => {
        videoSummary.innerHTML = 'Loading video summary...';
        try {
            // Mocking tool call to get a summary
            const summaryResult = await new Promise(resolve => {
                console.log(`Getting summary for: ${videoUrl}`);
                setTimeout(() => resolve(`This video provides an introductory overview of penetration testing, explaining the different phases of a pentest and the tools used by ethical hackers to find and exploit vulnerabilities in a system. [00:01:23]`), 1000);
            });
            videoSummary.innerHTML = summaryResult;
        } catch (error) {
            console.error('Failed to get video summary:', error);
            videoSummary.innerHTML = 'Failed to load summary.';
        }
    };

    const renderYoutubeResults = (videos) => {
        if (videos.length === 0) {
            youtubeResultsContainer.innerHTML = '<tr><td colspan="3" class="text-center py-4"><p class="data-block-text">No videos found for this query.</p></td></tr>';
            return;
        }

        youtubeResultsContainer.innerHTML = '';
        videos.forEach(video => {
            const videoId = new URLSearchParams(new URL(video.url).search).get('v');
            const row = `
                <tr>
                    <td>
                        <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="${video.title} thumbnail" class="table-image">
                    </td>
                    <td>
                        <p class="table-link text-white">${video.title}</p>
                        <p class="data-block-text text-xs text-zinc-500 font-sans">by ${video.channel_name}</p>
                    </td>
                    <td class="whitespace-nowrap">
                        <button class="terminal-button-secondary py-2 px-4 text-xs read-content-btn" data-url="${video.url}">Read Content</button>
                    </td>
                </tr>
            `;
            youtubeResultsContainer.innerHTML += row;
        });

        // Add event listeners for the "Read Content" buttons
        document.querySelectorAll('.read-content-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const videoUrl = event.target.dataset.url;
                const videoId = new URLSearchParams(new URL(videoUrl).search).get('v');
                
                // Show player and load video
                videoPlayerContainer.classList.remove('hidden');
                videoIframe.innerHTML = `<iframe width="100%" height="auto" src="https://www.youtube.com/embed/${videoId}?rel=0" frameborder="0" allowfullscreen></iframe>`;
                
                // Fetch and display summary
                fetchVideoSummary(videoUrl);
            });
        });
    };
});
