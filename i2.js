document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(
    ".nav-item:not(.demo-restart-btn)",
  );
  const viewPanels = document.querySelectorAll(".view-panel");

  // १. INITIAL PANEL OPEN ANIMATION
  animateActivePanel(document.getElementById("view-dashboard"));

  // २. MANUAL SIDEBAR CLICK SWITCH
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (this.classList.contains("active")) return;
      switchTab(this.getAttribute("data-target"));
    });
  });

  function switchTab(targetName) {
    const currentPanel = document.querySelector(".view-panel.active");
    const nextPanel = document.getElementById("view-" + targetName);
    const currentNav = document.querySelector(".nav-item.active");
    const nextNav = document.getElementById("nav-" + targetName);

    if (currentNav) currentNav.classList.remove("active");
    if (nextNav) nextNav.classList.add("active");

    const tl = gsap.timeline();
    tl.to(currentPanel, {
      opacity: 0,
      y: -10,
      duration: 0.18,
      onComplete: () => {
        currentPanel.classList.remove("active");
        nextPanel.classList.add("active");
      },
    });

    tl.fromTo(
      nextPanel,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          animateActivePanel(nextPanel);
        },
      },
    );
  }

  function animateActivePanel(panel) {
    const elements = panel.querySelectorAll(".anim-el");
    if (elements.length > 0) {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.06 },
      );
    }

    panel.querySelectorAll(".counter-num").forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-val"), 10);
      gsap.fromTo(
        counter,
        { textContent: 0 },
        {
          textContent: target,
          duration: 1,
          ease: "power1.out",
          snap: { textContent: 1 },
        },
      );
    });

    panel.querySelectorAll(".p-fill, .mini-fill").forEach((fill) => {
      gsap.fromTo(
        fill,
        { width: "0%" },
        { width: fill.getAttribute("data-progress"), duration: 0.8 },
      );
    });

    panel.querySelectorAll(".c-fill").forEach((circle) => {
      gsap.fromTo(
        circle,
        { strokeDasharray: "0, 100" },
        { strokeDasharray: circle.getAttribute("data-dash"), duration: 1 },
      );
    });
  }

  // ३. REAL-TIME CHAT SEND LOGIC
  const chatInput = document.getElementById("chatInput");
  const chatSendBtn = document.getElementById("chatSendBtn");
  const chatBody = document.getElementById("chatBody");

  if (chatSendBtn && chatInput) {
    function sendMessage() {
      const msgText = chatInput.value.trim();
      if (msgText === "") return;

      const newBubble = document.createElement("div");
      newBubble.classList.add("chat-bubble", "sent");
      newBubble.style.opacity = 0;

      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      newBubble.innerHTML = `
              <p>${msgText}</p>
              <span class="chat-time">${timeString} <i class="fa-solid fa-check-double text-blue"></i></span>
          `;

      chatBody.appendChild(newBubble);
      chatInput.value = "";

      gsap.to(newBubble, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: "back.out(1.5)",
      });

      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    }

    chatSendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }

  // ४. NEW BUTTONS CLICK ROUTING LOGIC
  const profileSetupBtn = document.getElementById("profileSetupBtn");
  const taskSimulationBtn = document.getElementById("taskSimulationBtn");
  const startDemoAgainBtn = document.getElementById("startDemoAgainBtn");

  if (profileSetupBtn) {
    profileSetupBtn.addEventListener("click", () => {
      window.location.href = "profilesetup.html";
    });
  }

  if (taskSimulationBtn) {
    taskSimulationBtn.addEventListener("click", () => {
      window.location.href = "tasksimulation.html";
    });
  }

  if (startDemoAgainBtn) {
    startDemoAgainBtn.addEventListener("click", () => {
      window.location.href = "v1.html";
    });
  }

  // ५. INTERACTIVE VIRTUAL TOUR DIALOGUE DATA
  const tourSteps = [
    {
      target: "dashboard",
      title: "1. App Dashboard Overview",
      desc: "This is your main cockpit. Notice how counters and progress metrics animate dynamically as data syncs.",
    },
    {
      target: "tasks",
      title: "2. Track Onboarding Checklists",
      desc: "Under My Tasks, actionable items are prioritized by risk categories (High/Medium) alongside active workflow trackers.",
    },
    {
      target: "calendar",
      title: "3. Interactive Scheduling Engine",
      desc: "The Calendar tracks corporate orientation pipelines. Cross-reference upcoming syncs straight from this module.",
    },
    {
      target: "messages",
      title: "4. Instant Communications Layer",
      desc: "Try typing a custom message below in the chat field right now and hit send—the message framework renders instantly.",
    },
    {
      target: "documents",
      title: "5. Enterprise Document Safe",
      desc: "Upload and audit mandatory compliance verifications securely. Track status lifecycle badges seamlessly.",
    },
    {
      target: "reports",
      title: "6. Advanced Analytics & Reporting",
      desc: "SVG radial progress charts monitor performance thresholds. Refresh tabs to re-trigger smooth graph interpolations.",
    },
    {
      target: "settings",
      title: "7. Profile Architecture Config",
      desc: "Manage operational preferences, profile fields, notification thresholds, and security parameters directly.",
    },
  ];

  let currentTourIndex = 0;
  const tourCard = document.getElementById("tourCard");
  const tourStepNum = document.getElementById("tourStepNum");
  const tourTitle = document.getElementById("tourTitle");
  const tourDesc = document.getElementById("tourDesc");
  const prevTourBtn = document.getElementById("prevTourBtn");
  const nextTourBtn = document.getElementById("nextTourBtn");
  const skipTourBtn = document.getElementById("skipTourBtn");

  function updateTourCard() {
    const currentStep = tourSteps[currentTourIndex];

    tourStepNum.textContent = currentTourIndex + 1;
    tourTitle.textContent = currentStep.title;
    tourDesc.textContent = currentStep.desc;

    switchTab(currentStep.target);

    prevTourBtn.style.display = currentTourIndex === 0 ? "none" : "block";
    nextTourBtn.innerHTML =
      currentTourIndex === tourSteps.length - 1
        ? "Finish Demo <i class='fa-solid fa-check'></i>"
        : "Next Step <i class='fa-solid fa-arrow-right'></i>";

    gsap.fromTo(
      tourCard,
      { scale: 0.95 },
      { scale: 1, duration: 0.3, ease: "back.out(1.2)" },
    );
  }

  if (tourCard) {
    nextTourBtn.addEventListener("click", () => {
      if (currentTourIndex < tourSteps.length - 1) {
        currentTourIndex++;
        updateTourCard();
      } else {
        gsap.to(tourCard, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          onComplete: () => tourCard.remove(),
        });
      }
    });

    prevTourBtn.addEventListener("click", () => {
      if (currentTourIndex > 0) {
        currentTourIndex--;
        updateTourCard();
      }
    });

    skipTourBtn.addEventListener("click", () => {
      gsap.to(tourCard, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => tourCard.remove(),
      });
    });
  }
});
