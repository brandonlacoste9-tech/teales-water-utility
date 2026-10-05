// Teale's Water Utility Services — interactions
(function(){
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function(){
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function(e){
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  // Scroll-reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("visible"); });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach(function(item){
    var btn = item.querySelector(".faq-q");
    var ans = item.querySelector(".faq-a");
    if (!btn || !ans) return;
    btn.addEventListener("click", function(){
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function(other){
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = "0px";
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        ans.style.maxHeight = ans.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Contact form -> opens visitor's email client via mailto
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var name = form.elements["name"].value.trim();
      var phone = form.elements["phone"].value.trim();
      var topic = form.elements["topic"].value;
      var msg = form.elements["message"].value.trim();
      var subject = encodeURIComponent("Website enquiry — " + topic + " (" + name + ")");
      var body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Topic: " + topic + "\n\n" +
        "Message:\n" + msg
      );
      // Contact form recipient — tealeswus@shaw.ca (confirmed by owner 2026-10-05)
      window.location.href = "mailto:tealeswus@shaw.ca?subject=" + subject + "&body=" + body;
    });
  }

  // Current year in footer
  document.querySelectorAll("[data-year]").forEach(function(el){
    el.textContent = new Date().getFullYear();
  });
})();
