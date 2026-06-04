// Elements reference
const openPopupBtn = document.getElementById("openPopupBtn");
const popupOverlay = document.getElementById("popupOverlay");
const onboardingVideo = document.getElementById("onboardingVideo");
const dashboardRedirectBtn = document.getElementById("dashboardRedirectBtn");

// व्हिडिओ ३४ सेकंदाला आल्यावर पॉज करणे आणि बटन दाखवणे
onboardingVideo.addEventListener("timeupdate", () => {
  if (onboardingVideo.currentTime >= 34) {
    onboardingVideo.pause();
    openPopupBtn.style.display = "block";
  }
});

// १. पहिला पॉपअप ट्रिगर करणे
openPopupBtn.addEventListener("click", () => {
  gsap.to(popupOverlay, { autoAlpha: 1, duration: 0.3 });

  const tl = gsap.timeline();
  tl.fromTo(
    "#popup1",
    { y: "100vh", opacity: 1 },
    { y: "0vh", duration: 0.8, ease: "power4.out" },
  );
  tl.fromTo(
    ".anim-element-1",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
    "-=0.3",
  );
});

// २. डायनॅमिक 'Next' बटन ट्रान्झिशन्स (Step 1 ते Step 6 पर्यंत)
document.querySelectorAll(".next-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    const currentPopup = e.target.closest(".popup-container");
    const nextStepId = e.target.getAttribute("data-next");
    const nextPopup = document.getElementById(`popup${nextStepId}`);

    const tl = gsap.timeline();

    // चालू पॉपअप डावीकडे सरकवून लपवणे
    tl.to(currentPopup, {
      x: "-100vw",
      opacity: 0,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        currentPopup.style.display = "none";
        nextPopup.style.display = nextStepId === "6" ? "block" : "flex";
      },
    });

    // नवीन पॉपअप उजवीकडून आत येणे
    tl.fromTo(
      nextPopup,
      { x: "100vw", opacity: 1 },
      { x: "0vw", duration: 0.7, ease: "power3.out" },
    );

    // नवीन पॉपअपच्या आतील एलिमेंट्स (डावा भाग आणि उजवीकडील इमेज) ॲनिमेट करणे
    tl.fromTo(
      `.anim-element-${nextStepId}`,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.2",
    );
  });
});

// ३. शेवटच्या स्क्रीनवरून 'dashboard.html' वर जाणे
dashboardRedirectBtn.addEventListener("click", () => {
  gsap.to(popupOverlay, {
    autoAlpha: 0,
    duration: 0.4,
    onComplete: () => {
      window.location.href = "dashboard.html";
    },
  });
});
