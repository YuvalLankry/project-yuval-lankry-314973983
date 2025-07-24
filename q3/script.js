document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("spellForm");
  const messages = document.getElementById("messages");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      messages.innerHTML = "";

      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const spellType = document.getElementById("spellType").value;
      const knowledge = parseInt(document.getElementById("knowledge").value);
      const wand = document.getElementById("wand").value;
      const attempts = parseInt(document.getElementById("attempts").value);

      const errors = [];

      if (!fullName) {
        errors.push("שדה שם מלא הוא חובה");
      }

      if (!email || !validateEmail(email)) {
        errors.push("כתובת דוא\"ל אינה תקינה");
      }

      if (!spellType) {
        errors.push("יש לבחור סוג לחש");
      }

      if (isNaN(knowledge) || knowledge < 1 || knowledge > 10) {
        errors.push("רמת ידע צריכה להיות בין 1 ל-10");
      }

      if (!wand) {
        errors.push("יש לציין האם יש שרביט");
      }

      if (isNaN(attempts) || attempts < 0 || attempts > 20) {
        errors.push("מספר ניסיונות חייב להיות בין 0 ל-20");
      }

      if (errors.length > 0) {
        for (let i = 0; i < errors.length; i++) {
          const p = document.createElement("p");
          p.className = "error";
          p.textContent = errors[i];
          messages.appendChild(p);
        }
      } else {
        const success = document.createElement("p");
        success.className = "success";
        success.textContent = "הטופס נשלח בהצלחה!";
        messages.appendChild(success);

        const spellRequest = {
          id: Date.now(),
          fullName,
          email,
          spellType,
          knowledge,
          wand,
          attempts,
          status: "ממתינה"
        };

        saveItem(spellRequest);
        form.reset();
      }
    });
  }

  function validateEmail(email) {
    return /^[\w\.-]+@[\w\.-]+\.\w+$/.test(email);
  }

  function saveItem(item) {
    let allItems = JSON.parse(localStorage.getItem("spellRequests")) || [];
    allItems.push(item);
    localStorage.setItem("spellRequests", JSON.stringify(allItems));
  }
});
