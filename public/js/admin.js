/**
 * EventHive Admin Panel — Client-Side JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
  // --- Sidebar Toggle (Mobile) ---
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  if (sidebarToggle && sidebar && sidebarOverlay) {
    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      sidebarOverlay.classList.toggle('active');
    });

    sidebarOverlay.addEventListener('click', function () {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  }

  // --- Active Nav Link Highlight ---
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath.startsWith(href) && href !== '/admin/dashboard')) {
      link.classList.add('active');
    }
  });

  // --- Auto-dismiss alert banner after 5 seconds ---
  const alertBanner = document.getElementById('alertBanner');
  if (alertBanner) {
    setTimeout(function () {
      alertBanner.style.opacity = '0';
      alertBanner.style.transition = 'opacity 0.5s ease';
      setTimeout(function () {
        if (alertBanner.parentNode) alertBanner.remove();
      }, 500);
    }, 5000);
  }
});
