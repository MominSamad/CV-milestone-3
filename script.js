const form = document.getElementById("cvForm");
const generateCVBtn = document.getElementById("generateCV");
const addSkillBtn = document.getElementById("addSkillBtn");
const skillInput = document.getElementById("skillInput");
const skillsList = document.getElementById("skillsList");
const outputDiv = document.getElementById("output");
const downloadCVBtn = document.getElementById("downloadCV");
const shareCVBtn = document.getElementById("shareCV");

let skills = [];

// Add skill functionality
addSkillBtn.addEventListener("click", () => {
  const skill = skillInput.value.trim();
  if (skill) {
    skills.push(skill);

    // Add skill to list
    const skillItem = document.createElement("li");
    skillItem.textContent = skill;
    skillsList.appendChild(skillItem);

    skillInput.value = ""; // Clear input
  } else {
    alert("Please enter a skill.");
  }
});

// Generate CV
generateCVBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const experience = document.getElementById("experience").value.trim();
  const education = document.getElementById("education").value.trim();

  if (!name || !email || !phone || !experience || !education) {
    alert("Please fill out all fields.");
    return;
  }

  const skillsHTML = skills.length
    ? `<h4>Skills:</h4><ul>${skills.map(skill => `<li>${skill}</li>`).join("")}</ul>`
    : "";

  outputDiv.innerHTML = `
    <h3 contenteditable="true">${name}</h3>
    <p contenteditable="true"><strong>Email:</strong> ${email}</p>
    <p contenteditable="true"><strong>Phone:</strong> ${phone}</p>
    <h4 contenteditable="true">Experience:</h4>
    <p contenteditable="true">${experience}</p>
    <h4 contenteditable="true">Education:</h4>
    <p contenteditable="true">${education}</p>
    ${skillsHTML}
  `;
});

// Download CV as PDF
downloadCVBtn.addEventListener("click", () => {
  const element = document.getElementById("output");
  const options = {
    margin: 1,
    filename: "CV.pdf",
    html2canvas: { scale: 2 },
    jsPDF: { format: "a4", orientation: "portrait" },
  };

  html2pdf().set(options).from(element).save();
});

// Share CV (Generates a link with CV content)
shareCVBtn.addEventListener("click", () => {
  const cvContent = encodeURIComponent(outputDiv.innerHTML);
  const shareLink = `${window.location.origin}?cv=${cvContent}`;

  navigator.clipboard
    .writeText(shareLink)
    .then(() => alert("Shareable link copied to clipboard!"))
    .catch(() => alert("Failed to copy link."));
});

// Prepopulate CV from share link
const urlParams = new URLSearchParams(window.location.search);
const sharedCV = urlParams.get("cv");
if (sharedCV) {
  outputDiv.innerHTML = decodeURIComponent(sharedCV);
}
