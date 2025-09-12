// JavaScript for Portfolio Functionality

document.addEventListener('DOMContentLoaded', () => {

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Toggle the mobile menu on button click
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    const HASHNODE_USERNAME = 'YOUR_HASHNODE_USERNAME'; // Replace with your Hashnode username
    const blogPostsContainer = document.getElementById('blog-posts-container');
    const blogPosts = []; // Local cache for blog posts

    async function fetchBlogPosts() {
        if (blogPosts.length > 0) {
            renderBlogPosts(blogPosts);
            return;
        }

        const query = `
            query {
                user(username: "${HASHNODE_USERNAME}") {
                    publication {
                        posts(page: 0) {
                            title
                            brief
                            slug
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
                body: JSON.stringify({ query }),
            });

            const result = await response.json();
            const fetchedPosts = result.data.user.publication.posts;

            if (fetchedPosts && fetchedPosts.length > 0) {
                blogPosts.push(...fetchedPosts);
                renderBlogPosts(blogPosts);
            } else {
                blogPostsContainer.innerHTML = '<tr><td colspan="3" class="text-center py-4"><p class="data-block-text">No blog posts found.</p></td></tr>';
            }
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            blogPostsContainer.innerHTML = '<tr><td colspan="3" class="text-center py-4"><p class="data-block-text">Error fetching posts. Please try again later.</p></td></tr>';
        }
    }

    function renderBlogPosts(posts) {
        if (!blogPostsContainer) return;
        blogPostsContainer.innerHTML = '';
        posts.forEach(post => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <a href="https://${HASHNODE_USERNAME}.hashnode.dev/${post.slug}" target="_blank">
                        <img src="${post.coverImage}" alt="${post.title}" class="table-image">
                    </a>
                </td>
                <td>
                    <a href="https://${HASHNODE_USERNAME}.hashnode.dev/${post.slug}" target="_blank" class="table-link">${post.title}</a>
                </td>
                <td class="data-block-text font-sans">${post.brief}</td>
            `;
            blogPostsContainer.appendChild(row);
        });
    }

    // Call function only if on the blog page
    if (document.getElementById('blog-page')) {
        fetchBlogPosts();
    }

    // YouTube Video Search and Display
    const youtubeSearchButton = document.getElementById('youtube-search-button');
    const youtubeSearchInput = document.getElementById('youtube-search-input');
    const youtubeResultsContainer = document.getElementById('youtube-results-container');
    const videoPlayerContainer = document.getElementById('video-player-container');
    const videoIframe = document.getElementById('video-iframe');
    const videoSummary = document.getElementById('video-summary');

    if (youtubeSearchButton) {
        youtubeSearchButton.addEventListener('click', async () => {
            const query = youtubeSearchInput.value.trim();
            if (query === '') return;

            youtubeResultsContainer.innerHTML = `<tr><td colspan="3" class="text-center py-4"><p class="data-block-text">Searching for videos...</p></td></tr>`;

            // API Call for video search (simulated)
            // In a real scenario, you would use a YouTube Data API key here.
            // For now, this is a placeholder response.
            const response = [
                {
                    title: 'Intro to Ethical Hacking - A Beginner\'s Guide',
                    id: 'videosim1',
                    thumbnail: 'https://placehold.co/100x75/0a0a0a/a3e635?text=Ethical+Hacking',
                    summary: 'This video provides a comprehensive overview of ethical hacking, covering key concepts, methodologies, and the tools used in penetration testing. It is perfect for beginners looking to get started in cybersecurity.',
                    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
                },
                {
                    title: 'How to Build a Homelab for Penetration Testing',
                    id: 'videosim2',
                    thumbnail: 'https://placehold.co/100x75/0a0a0a/a3e635?text=Homelab',
                    summary: 'Learn how to set up a secure virtual lab environment to practice penetration testing techniques without risking real-world systems. This video covers hypervisor installation and VM configuration.',
                    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
                }
            ];

            youtubeResultsContainer.innerHTML = '';
            response.forEach(video => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><img src="${video.thumbnail}" alt="${video.title}" class="table-image"></td>
                    <td class="data-block-text font-sans">${video.title}</td>
                    <td>
                        <button class="play-video-button terminal-button" data-video-id="${video.id}">View</button>
                    </td>
                `;
                youtubeResultsContainer.appendChild(row);
            });
            attachPlayButtonListeners(response);
        });
    }

    function attachPlayButtonListeners(videos) {
        document.querySelectorAll('.play-video-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const videoId = e.target.dataset.videoId;
                const video = videos.find(v => v.id === videoId);
                if (video) {
                    videoIframe.innerHTML = `<iframe src="${video.url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full rounded-md"></iframe>`;
                    videoSummary.textContent = video.summary;
                    videoPlayerContainer.classList.remove('hidden');
                }
            });
        });
    }

    // Certification Modal Logic
    const certCards = document.querySelectorAll('.certification-card');
    const certModal = document.getElementById('certification-modal');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalCloseButton = document.getElementById('modal-close-button');

    if (certCards.length > 0) {
        certCards.forEach(card => {
            card.addEventListener('click', () => {
                const imageSrc = card.querySelector('img').src;
                const description = card.dataset.description;

                modalImage.src = imageSrc;
                modalDescription.textContent = description;

                certModal.classList.remove('hidden');
                setTimeout(() => {
                    certModal.classList.remove('opacity-0');
                    certModal.querySelector('.data-block').classList.remove('scale-95');
                }, 10);
            });
        });
    }

    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', () => {
            certModal.classList.add('opacity-0');
            certModal.querySelector('.data-block').classList.add('scale-95');
            setTimeout(() => {
                certModal.classList.add('hidden');
            }, 300);
        });
    }
});
