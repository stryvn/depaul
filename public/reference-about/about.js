function updateTopic() {
  const topicLinks = document.querySelectorAll(".about-editorial .topic-nav a");
  for (const link of topicLinks) {
    if (link.hash === location.hash) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
window.addEventListener('hashchange', updateTopic);
updateTopic();
