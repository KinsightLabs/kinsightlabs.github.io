// Filter and Sort functionality for blog posts and projects
(function() {
  'use strict';

  // Dropdown menu functionality
  function initDropdownMenu() {
    const dropdown = document.querySelector('.nav-dropdown');
    if (!dropdown) return;

    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');

    if (dropdownToggle) {
      dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('active');
      });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });

    // Close dropdown when clicking on a menu item
    if (dropdownMenu) {
      const menuLinks = dropdownMenu.querySelectorAll('a');
      menuLinks.forEach(link => {
        link.addEventListener('click', function() {
          dropdown.classList.remove('active');
        });
      });
    }
  }

  // Blog post filtering and sorting
  function initBlogFilters() {
    const postGrid = document.querySelector('.post-grid');
    if (!postGrid) return;

    const postCards = postGrid.querySelectorAll('.post-card');
    const categoryPills = document.querySelectorAll('.category-pill');

    // Category pill click handlers
    categoryPills.forEach(pill => {
      pill.addEventListener('click', function() {
        // Remove active class from all pills
        categoryPills.forEach(p => p.classList.remove('active'));
        // Add active class to clicked pill
        this.classList.add('active');
        // Filter posts
        filterByCategory(postCards, this.dataset.category);
      });
    });
  }

  function filterByCategory(cards, category) {
    cards.forEach(card => {
      const cardCategory = card.dataset.category;

      if (category === 'all') {
        card.style.display = '';
      } else if (cardCategory === category) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Project filtering and sorting
  function initProjectFilters() {
    const projectGrid = document.querySelector('.project-grid');
    if (!projectGrid) return;

    const projects = Array.from(projectGrid.querySelectorAll('.project-card'));
    const sortSelect = document.getElementById('project-sort');
    const techFilter = document.getElementById('tech-filter');

    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        sortProjects(projects, this.value);
      });
    }

    if (techFilter) {
      techFilter.addEventListener('change', function() {
        filterProjects(projects, this.value);
      });
    }
  }

  function sortProjects(projects, sortBy) {
    const projectGrid = document.querySelector('.project-grid');
    const sortedProjects = [...projects].sort((a, b) => {
      if (sortBy === 'title-asc') {
        return a.dataset.title.localeCompare(b.dataset.title);
      } else if (sortBy === 'title-desc') {
        return b.dataset.title.localeCompare(a.dataset.title);
      }
      return 0;
    });

    projectGrid.innerHTML = '';
    sortedProjects.forEach(project => projectGrid.appendChild(project));
  }

  function filterProjects(projects, tech) {
    projects.forEach(project => {
      if (tech === 'all' || project.dataset.tech.includes(tech)) {
        project.style.display = '';
      } else {
        project.style.display = 'none';
      }
    });
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initDropdownMenu();
      initBlogFilters();
      initProjectFilters();
      highlightActiveNav();
    });
  } else {
    initDropdownMenu();
    initBlogFilters();
    initProjectFilters();
    highlightActiveNav();
  }

  // Highlight active navigation link
  function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-list a');

    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;

      // Remove active class from all
      link.classList.remove('active');

      // Add active class to matching link
      if (currentPath === linkPath ||
          (currentPath.includes(linkPath) && linkPath !== '/')) {
        link.classList.add('active');
      }

      // Handle home page
      if (currentPath === '/' && linkPath === '/') {
        link.classList.add('active');
      }
    });
  }
})();
