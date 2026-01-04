let schemes = [];
let schemesLoaded = false;

async function fetchSchemes() {
  if (schemesLoaded) {
    return schemes;
  }

  try {
    const response = await fetch("./schemes.json");
    const data = await response.json();
    schemes = data;
    schemesLoaded = true;
    console.log("Schemes loaded:", schemes.length);
  } catch (error) {
    console.error("Error loading schemes:", error);
    alert("Failed to load schemes. Please refresh the page.");
  }
}

function checkEligibility(scheme, userData) {
  const criteria = scheme.criteria;
  let eligible = true;
  const reasons = [];

  if (criteria.age) {
    if (criteria.age.min && userData.age < criteria.age.min) {
      eligible = false;
      reasons.push(`Minimum age: ${criteria.age.min} years`);
    }
    if (criteria.age.max && userData.age > criteria.age.max) {
      eligible = false;
      reasons.push(`Maximum age: ${criteria.age.max} years`);
    }
  }

  if (criteria.income) {
    if (criteria.income.max && userData.income > criteria.income.max) {
      eligible = false;
      reasons.push(`Income should be less than ₹${criteria.income.max}`);
    }
  }

  if (criteria.gender && userData.gender !== criteria.gender) {
    eligible = false;
    reasons.push(`Only for ${criteria.gender}`);
  }

  if (criteria.category) {
    const categories = Array.isArray(criteria.category)
      ? criteria.category
      : [criteria.category];
    if (!categories.includes(userData.category)) {
      eligible = false;
      reasons.push(`Only for ${categories.join(", ")}`);
    }
  }

  if (criteria.location) {
    const locations = Array.isArray(criteria.location)
      ? criteria.location
      : [criteria.location];
    if (!locations.includes(userData.location)) {
      eligible = false;
      reasons.push(`Only for ${locations.join(", ")} areas`);
    }
  }

  if (criteria.farmer && !userData.farmer) {
    eligible = false;
    reasons.push("Requires farmer status");
  }

  if (criteria.disabled && !userData.disabled) {
    eligible = false;
    reasons.push("Requires disability status");
  }

  if (criteria.widow && !userData.widow) {
    eligible = false;
    reasons.push("Requires widow/widower status");
  }

  return { eligible, reasons };
}

function getEligibleSchemes(userData) {
  const results = schemes.map((scheme) => {
    const eligibility = checkEligibility(scheme, userData);
    return {
      ...scheme,
      eligible: eligibility.eligible,
      reasons: eligibility.reasons,
    };
  });

  const eligible = results.filter((r) => r.eligible);
  const notEligible = results.filter((r) => !r.eligible);

  return {
    eligible: eligible,
    notEligible: notEligible,
    total: results.length,
  };
}

function displayResults(results) {
  const container = document.getElementById("resultsContainer");
  const resultsSection = document.getElementById("resultsSection");

  let html = `<div class="stats-container">
    <div class="stat-card">
      <h2>${results.eligible.length}</h2>
      <p>Eligible</p>
    </div>
    <div class="stat-card" style="background-color: #FF9800;">
      <h2>${results.notEligible.length}</h2>
      <p>Not Eligible</p>
    </div>
    <div class="stat-card" style="background-color: #e91e63;">
      <h2>${results.total}</h2>
      <p>Total</p>
    </div>
  </div>`;

  if (results.eligible.length > 0) {
    html += `<h4 class="mb-4">Eligible Schemes (${results.eligible.length})</h4>`;
    results.eligible.forEach((scheme) => {
      html += `
        <div class="scheme-card">
          <div class="eligibility-badge eligible">ELIGIBLE</div>
          <div class="scheme-title">${scheme.name}</div>
          <div class="scheme-description">${scheme.description}</div>
          <div class="scheme-benefits">
            <h6>Benefits:</h6>
            <ul>
              ${scheme.benefits
                .map((benefit) => `<li>${benefit}</li>`)
                .join("")}
            </ul>
          </div>
        </div>
      `;
    });
  }

  if (results.notEligible.length > 0) {
    html += `<h4 class="mb-4 mt-4">Not Eligible Schemes (${results.notEligible.length})</h4>`;
    results.notEligible.forEach((scheme) => {
      html += `
        <div class="scheme-card not-eligible">
          <div class="eligibility-badge not-eligible">NOT ELIGIBLE</div>
          <div class="scheme-title">${scheme.name}</div>
          <div class="scheme-description">${scheme.description}</div>
          <div class="mt-2">
            <strong>Reasons:</strong>
            <ul class="mt-2">
              ${scheme.reasons.map((reason) => `<li>${reason}</li>`).join("")}
            </ul>
          </div>
        </div>
      `;
    });
  }

  container.innerHTML = html;
  resultsSection.style.display = "block";
  resultsSection.scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", async function () {
  await fetchSchemes();

  const form = document.getElementById("eligibilityForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const userData = {
        age: parseInt(document.getElementById("age").value),
        gender: document.getElementById("gender").value,
        income: parseInt(document.getElementById("income").value),
        category: document.getElementById("category").value,
        location: document.getElementById("location").value,
        education: document.getElementById("education").value,
        disabled: document.getElementById("disabled").checked,
        widow: document.getElementById("widow").checked,
        farmer: document.getElementById("farmer").checked,
        unemployed: document.getElementById("unemployed").checked,
      };

      const container = document.getElementById("resultsContainer");
      container.innerHTML = "<p>Checking eligibility...</p>";
      document.getElementById("resultsSection").style.display = "block";

      const results = getEligibleSchemes(userData);
      displayResults(results);
    });
  }

  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      document.getElementById("resultsSection").style.display = "none";
    });
  }
});
