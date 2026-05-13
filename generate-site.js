const fs = require('fs');
const path = require('path');

// Placeholder Talk Data
const talksData = [
    {
        id: 'talk1',
        title: 'The Future of AI in Software Development',
        speakers: ['Dr. Anya Sharma'],
        category: ['AI', 'Software Engineering'],
        duration: 60,
        description: 'Exploring how AI is transforming the software development lifecycle, from code generation to automated testing.'
    },
    {
        id: 'talk2',
        title: 'Demystifying Blockchain: Beyond Cryptocurrencies',
        speakers: ['Ben Carter'],
        category: ['Blockchain', 'Distributed Systems'],
        duration: 60,
        description: 'An accessible introduction to blockchain technology, focusing on its applications outside of digital currencies.'
    },
    {
        id: 'talk3',
        title: 'Modern Frontend Development with Web Components',
        speakers: ['Chloe Davis', 'Ethan White'],
        category: ['Frontend', 'Web Development'],
        duration: 60,
        description: 'Building reusable and interoperable UI components using native browser technologies.'
    },
    {
        id: 'talk4',
        title: 'Cloud Native Architectures: A Deep Dive',
        speakers: ['Dr. Fiona Green'],
        category: ['Cloud', 'Architecture'],
        duration: 60,
        description: 'Understanding the principles and patterns for designing and deploying applications in the cloud.'
    },
    {
        id: 'talk5',
        title: 'Cybersecurity Essentials for Developers',
        speakers: ['Grace Hall'],
        category: ['Security', 'Best Practices'],
        duration: 60,
        description: 'Key cybersecurity practices and common vulnerabilities every developer should know.'
    },
    {
        id: 'talk6',
        title: 'Data Science with Python: Practical Applications',
        speakers: ['Henry Lee'],
        category: ['Data Science', 'Python', 'Machine Learning'],
        duration: 60,
        description: 'A hands-on session on leveraging Python libraries for data analysis and machine learning.'
    }
];

// Event Timing Configuration
const eventStartTime = new Date();
eventStartTime.setHours(10, 0, 0, 0); // Event starts at 10:00 AM

const talkDuration = 60; // minutes
const transitionDuration = 10; // minutes
const lunchDuration = 60; // minutes
const numberOfTalks = talksData.length;

// Generate Schedule
function generateSchedule(talks) {
    const schedule = [];
    let currentTime = new Date(eventStartTime);
    let talkIndex = 0;

    for (let i = 0; i < numberOfTalks; i++) {
        // Talk
        const talkEndTime = new Date(currentTime.getTime() + talkDuration * 60 * 1000);
        schedule.push({
            type: 'talk',
            title: talks[talkIndex].title,
            speakers: talks[talkIndex].speakers,
            category: talks[talkIndex].category,
            description: talks[talkIndex].description,
            startTime: new Date(currentTime),
            endTime: talkEndTime
        });
        currentTime = new Date(talkEndTime);
        talkIndex++;

        // Transition or Lunch
        if (i < numberOfTalks - 1) { // Not the last talk
            if (i === 2) { // After the 3rd talk (index 2)
                const lunchEndTime = new Date(currentTime.getTime() + lunchDuration * 60 * 1000);
                schedule.push({
                    type: 'break',
                    title: 'Lunch Break',
                    startTime: new Date(currentTime),
                    endTime: lunchEndTime
                });
                currentTime = new Date(lunchEndTime);
            } else {
                const transitionEndTime = new Date(currentTime.getTime() + transitionDuration * 60 * 1000);
                schedule.push({
                    type: 'transition',
                    title: 'Transition',
                    startTime: new Date(currentTime),
                    endTime: transitionEndTime
                });
                currentTime = new Date(transitionEndTime);
            }
        }
    }
    return schedule;
}

const schedule = generateSchedule(talksData);

// Basic HTML Structure
const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Talks Event Schedule</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 960px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        h1, h2 {
            color: #0056b3;
            text-align: center;
        }
        .talk-item, .break-item {
            background-color: #e9ecef;
            border: 1px solid #dee2e6;
            margin-bottom: 15px;
            padding: 15px;
            border-radius: 5px;
        }
        .talk-item h3 {
            margin-top: 0;
            color: #0056b3;
        }
        .talk-item .meta {
            font-size: 0.9em;
            color: #666;
            margin-bottom: 10px;
        }
        .talk-item .category-tag {
            display: inline-block;
            background-color: #007bff;
            color: white;
            padding: 4px 8px;
            border-radius: 3px;
            margin-right: 5px;
            margin-bottom: 5px;
            font-size: 0.8em;
        }
        .break-item {
            background-color: #ffc107;
            color: #333;
            text-align: center;
            font-weight: bold;
        }
        .time-slot {
            font-weight: bold;
            color: #0056b3;
            margin-right: 10px;
        }
        .search-container {
            margin-bottom: 20px;
            text-align: center;
        }
        .search-container input, .search-container button {
            padding: 8px;
            margin-right: 5px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .search-container button {
            background-color: #007bff;
            color: white;
            cursor: pointer;
        }
        .search-container button:hover {
            background-color: #0056b3;
        }
        .filter-buttons {
            margin-top: 10px;
        }
        .filter-buttons .category-filter-button {
            background-color: #6c757d;
            color: white;
            padding: 5px 10px;
            border: none;
            border-radius: 3px;
            margin: 3px;
            cursor: pointer;
            font-size: 0.85em;
        }
        .filter-buttons .category-filter-button.active {
            background-color: #007bff;
        }
        .filter-buttons .category-filter-button:hover:not(.active) {
            background-color: #5a6268;
        }
        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Tech Talks Event Schedule</h1>

        <div class="search-container">
            <input type="text" id="category-search" placeholder="Search by category...">
            <button id="search-button">Search</button>
            <button id="clear-search">Clear</button>
            <div class="filter-buttons" id="filter-buttons">
                <!-- Category buttons will be injected here by JS -->
            </div>
        </div>

        <div id="schedule">
            <!-- Schedule items will be injected here by JavaScript -->
        </div>
    </div>

    <script>
        const allTalks = ${JSON.stringify(talksData, null, 2)};
        const scheduleData = ${JSON.stringify(schedule.map(item => ({
            ...item,
            startTime: item.startTime.toISOString(),
            endTime: item.endTime.toISOString()
        })), null, 2)};

        const scheduleDiv = document.getElementById('schedule');
        const categorySearchInput = document.getElementById('category-search');
        const searchButton = document.getElementById('search-button');
        const clearSearchButton = document.getElementById('clear-search');
        const filterButtonsContainer = document.getElementById('filter-buttons');

        function formatTime(isoString) {
            const date = new Date(isoString);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        function renderSchedule(filterCategory = '') {
            scheduleDiv.innerHTML = ''; // Clear current schedule
            
            scheduleData.forEach(item => {
                const itemElement = document.createElement('div');
                let display = true;

                if (item.type === 'talk') {
                    const categories = item.category.map(cat => cat.toLowerCase());
                    const filterLower = filterCategory.toLowerCase();
                    if (filterCategory && !categories.includes(filterLower)) {
                        display = false;
                    }

                    if (display) {
                        itemElement.classList.add('talk-item');
                        itemElement.innerHTML =
                            '<span class="time-slot">' + formatTime(item.startTime) + ' - ' + formatTime(item.endTime) + '</span>' +
                            '<h3>' + item.title + '</h3>' +
                            '<div class="meta">' +
                                '<strong>Speakers:</strong> ' + item.speakers.join(', ') + '<br>' +
                                '<strong>Category:</strong> ' +
                                item.category.map(cat => '<span class="category-tag">' + cat + '</span>').join('') +
                            '</div>' +
                            '<p>' + item.description + '</p>';                    }
                } else if (item.type === 'break') {
                    if (!filterCategory) { // Breaks are always shown unless a category is actively filtered
                        itemElement.classList.add('break-item');
                        itemElement.innerHTML =
                            '<span class="time-slot">' + formatTime(item.startTime) + ' - ' + formatTime(item.endTime) + '</span>' +
                            item.title;
                    } else {
                        display = false; // Hide breaks if a category is filtered
                    }
                } else if (item.type === 'transition') {
                    display = false; // Transitions are not explicitly displayed
                }
                
                if (display) {
                    scheduleDiv.appendChild(itemElement);
                }
            });
        }

        function populateCategoryFilters() {
            const allCategories = new Set();
            allTalks.forEach(talk => {
                talk.category.forEach(cat => allCategories.add(cat));
            });

            filterButtonsContainer.innerHTML = '';
            allCategories.forEach(category => {
                const button = document.createElement('button');
                button.classList.add('category-filter-button');
                button.textContent = category;
                button.setAttribute('data-category', category);
                button.addEventListener('click', () => {
                    categorySearchInput.value = category;
                    searchButton.click();
                });
                filterButtonsContainer.appendChild(button);
            });
        }

        searchButton.addEventListener('click', () => {
            const filter = categorySearchInput.value.trim();
            renderSchedule(filter);
            // Update active state for buttons
            document.querySelectorAll('.category-filter-button').forEach(button => {
                if (button.getAttribute('data-category').toLowerCase() === filter.toLowerCase()) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
        });

        clearSearchButton.addEventListener('click', () => {
            categorySearchInput.value = '';
            renderSchedule();
            document.querySelectorAll('.category-filter-button').forEach(button => {
                button.classList.remove('active');
            });
        });

        // Initial render and populate filters
        document.addEventListener('DOMContentLoaded', () => {
            populateCategoryFilters();
            renderSchedule();
        });

    </script>
</body>
</html>
