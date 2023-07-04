// entry-interaction.js
document.addEventListener('DOMContentLoaded', function() {
  const entries = document.querySelectorAll('.entry');

  entries.forEach(function(entry) {
    entry.addEventListener('mouseenter', function() {
      this.querySelector('.entry-buttons').style.display = 'block';
    });

    entry.addEventListener('mouseleave', function() {
      this.querySelector('.entry-buttons').style.display = 'none';
    });
  });
});

<script src="/public/js/entry-interaction.js"></script>