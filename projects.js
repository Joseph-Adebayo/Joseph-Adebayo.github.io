const searchForm = document.querySelector('.project-search');
const searchInput = document.querySelector('.search-input');
const filterButtons = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.experience-entry');
const searchCount = document.querySelector('.search-count');
const noResults = document.querySelector('.no-results');
const clearButton = document.querySelector('.clear-search');

let activeFilter = 'all';

// Category names are added to the searchable text, so typing "cybersecurity" or "web dev" works too
function searchableText(project) {
    const categories = project.dataset.category.replaceAll('-', ' ');
    return (project.textContent + ' ' + categories).toLowerCase();
}

function updateProjects() {
    const words = searchInput.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let shown = 0;

    projects.forEach(project => {
        const categories = project.dataset.category.split(' ');
        const text = searchableText(project);
        const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);
        const matchesSearch = words.every(word => text.includes(word));

        project.hidden = !(matchesFilter && matchesSearch);
        if (!project.hidden) shown++;
    });

    searchCount.textContent = `Showing ${shown} of ${projects.length} projects`;
    noResults.hidden = shown > 0;
}

function setFilter(filter) {
    activeFilter = filter;
    filterButtons.forEach(button => {
        const active = button.dataset.filter === filter;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', active);
    });
    updateProjects();
}

// Show how many projects are in each category
filterButtons.forEach(button => {
    const filter = button.dataset.filter;
    const total = filter === 'all'
        ? projects.length
        : [...projects].filter(project => project.dataset.category.split(' ').includes(filter)).length;
    button.textContent += ` (${total})`;
    button.addEventListener('click', () => setFilter(filter));
});

searchInput.addEventListener('input', updateProjects);
searchForm.addEventListener('submit', event => event.preventDefault());

clearButton.addEventListener('click', () => {
    searchInput.value = '';
    setFilter('all');
    searchInput.focus();
});

// The search only works with JavaScript, so it stays hidden without it
searchForm.hidden = false;
updateProjects();
