// Interactive test page - JavaScript logic

// Global variables
let clickCount = 0;
let progressInterval = null;
let interactionLog = [];

// Logging utilities
function logInteraction(action, details = "") {
  const timestamp = new Date().toLocaleTimeString();
  const logEntry = `[${timestamp}] ${action}${details ? ": " + details : ""}`;
  interactionLog.push(logEntry);

  const logElement = document.getElementById("interactionLog");
  if (logElement) {
    const li = document.createElement("li");
    li.textContent = logEntry;
    logElement.appendChild(li);
    logElement.scrollTop = logElement.scrollHeight;
  }
}

// Initialize after DOM load
document.addEventListener("DOMContentLoaded", function () {
  initializeInteractions();
  logInteraction("Page fully loaded");
});

function initializeInteractions() {
  // 1. Click counter
  initClickCounter();

  // 2. Toggles
  initToggles();

  // 3. Show/hide
  initVisibilityToggle();

  // 4. Color changes (function already global)

  // 5. Form with validation
  initForm();

  // 6. Modal window
  initModal();

  // 7. Drag & Drop
  initDragDrop();

  // 8. Dynamic list
  initDynamicList();

  // 9. Slider and progress
  initSliderProgress();

  // 10. Tabs
  initTabs();

  // Test results
  initTestResults();
}

// 1. Click counter
function initClickCounter() {
  const clickButton = document.getElementById("clickCounter");
  const resetButton = document.getElementById("resetCounter");
  const countSpan = document.getElementById("clickCount");

  if (clickButton && resetButton && countSpan) {
    clickButton.addEventListener("click", function () {
      clickCount++;
      countSpan.textContent = clickCount;
      logInteraction("Counter click", `Value: ${clickCount}`);
    });

    resetButton.addEventListener("click", function () {
      clickCount = 0;
      countSpan.textContent = clickCount;
      logInteraction("Counter reset");
    });
  }
}

// 2. Toggles
function initToggles() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const radios = document.querySelectorAll('input[type="radio"]');
  const statusDisplay = document.getElementById("selectionStatus");

  function updateStatus() {
    const checkedBoxes = Array.from(checkboxes).filter((cb) => cb.checked);
    const checkedRadio = Array.from(radios).find((r) => r.checked);

    let status = "Selected: ";
    if (checkedBoxes.length > 0) {
      status += `Options: ${checkedBoxes.map((cb) => cb.id).join(", ")}`;
    }
    if (checkedRadio) {
      status += `${checkedBoxes.length > 0 ? ", " : ""}Radio: ${
        checkedRadio.value
      }`;
    }
    if (checkedBoxes.length === 0 && !checkedRadio) {
      status = "Nothing selected";
    }

    if (statusDisplay) {
      statusDisplay.textContent = `Status: ${status}`;
    }
  }

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      logInteraction(
        `Checkbox ${this.id}`,
        this.checked ? "enabled" : "disabled"
      );
      updateStatus();
    });
  });

  radios.forEach((radio) => {
    radio.addEventListener("change", function () {
      logInteraction(`Radio button`, `selected value: ${this.value}`);
      updateStatus();
    });
  });
}

// 3. Show/hide elements
function initVisibilityToggle() {
  const toggleButton = document.getElementById("toggleVisibility");
  const secretMessage = document.getElementById("secretMessage");

  if (toggleButton && secretMessage) {
    toggleButton.addEventListener("click", function () {
      const isHidden = secretMessage.style.display === "none";
      secretMessage.style.display = isHidden ? "block" : "none";
      this.textContent = isHidden
        ? "Hide Secret Message"
        : "Show Secret Message";
      logInteraction("Visibility toggle", isHidden ? "shown" : "hidden");
    });
  }
}

// 4. Color changes (global function)
function changeColor(color) {
  const colorBox = document.getElementById("colorBox");
  if (colorBox) {
    colorBox.className = "color-box";
    if (color !== "gray") {
      colorBox.classList.add(`color-${color}`);
    }
    logInteraction("Color change", color);
  }
}

// 5. Form with validation
function initForm() {
  const form = document.getElementById("testForm");
  const result = document.getElementById("formResult");

  if (form && result) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Simple validation
      let errors = [];
      if (!data.userName || data.userName.length < 2) {
        errors.push("Name must contain at least 2 characters");
      }
      if (!data.userEmail || !data.userEmail.includes("@")) {
        errors.push("Enter a valid email");
      }
      if (data.userAge && (data.userAge < 1 || data.userAge > 120)) {
        errors.push("Age must be between 1 and 120 years");
      }

      if (errors.length > 0) {
        result.innerHTML = `<div class="error">Errors:<br>${errors.join(
          "<br>"
        )}</div>`;
        logInteraction("Form validation error", errors.join("; "));
      } else {
        result.innerHTML = `<div class="success">Form successfully submitted!<br>Data: ${JSON.stringify(
          data,
          null,
          2
        )}</div>`;
        logInteraction("Form submitted successfully", JSON.stringify(data));
      }
    });

    form.addEventListener("reset", function () {
      result.innerHTML = "";
      logInteraction("Form cleared");
    });
  }
}

// 6. Modal window
function initModal() {
  const openBtn = document.getElementById("openModal");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("closeModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const actionBtn = document.getElementById("modalAction");

  if (openBtn && modal && closeBtn && closeModalBtn) {
    openBtn.addEventListener("click", function () {
      modal.style.display = "block";
      logInteraction("Modal window opened");
    });

    function closeModal() {
      modal.style.display = "none";
      logInteraction("Modal window closed");
    }

    closeBtn.addEventListener("click", closeModal);
    closeModalBtn.addEventListener("click", closeModal);

    // Close on click outside modal
    window.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    if (actionBtn) {
      actionBtn.addEventListener("click", function () {
        logInteraction("Modal action performed");
        alert("Action performed!");
      });
    }
  }
}

// 7. Drag & Drop
function initDragDrop() {
  const draggableItems = document.querySelectorAll(".draggable-item");
  const dropZone = document.getElementById("dropZone");
  const droppedItems = document.getElementById("droppedItems");
  const resetBtn = document.getElementById("resetDrag");

  draggableItems.forEach((item) => {
    item.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", this.dataset.item);
      logInteraction("Drag started", this.textContent);
    });
  });

  if (dropZone && droppedItems) {
    dropZone.addEventListener("dragover", function (e) {
      e.preventDefault();
      this.classList.add("drag-over");
    });

    dropZone.addEventListener("dragleave", function (e) {
      this.classList.remove("drag-over");
    });

    dropZone.addEventListener("drop", function (e) {
      e.preventDefault();
      this.classList.remove("drag-over");

      const itemId = e.dataTransfer.getData("text/plain");
      const originalItem = document.querySelector(`[data-item="${itemId}"]`);

      if (
        originalItem &&
        !droppedItems.querySelector(`[data-item="${itemId}"]`)
      ) {
        const clonedItem = originalItem.cloneNode(true);
        clonedItem.draggable = false;
        clonedItem.classList.add("dropped-item");
        droppedItems.appendChild(clonedItem);

        logInteraction("Item dropped", originalItem.textContent);
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      if (droppedItems) {
        droppedItems.innerHTML = "";
      }
      logInteraction("Drag & Drop reset");
    });
  }
}

// 8. Dynamic list
function initDynamicList() {
  const addBtn = document.getElementById("addItem");
  const clearBtn = document.getElementById("clearList");
  const input = document.getElementById("newItemText");
  const list = document.getElementById("dynamicList");
  const counter = document.getElementById("itemCount");

  function updateCounter() {
    if (counter && list) {
      counter.textContent = list.children.length;
    }
  }

  function addDeleteListener(deleteBtn, listItem) {
    deleteBtn.addEventListener("click", function () {
      const itemText = listItem.textContent.replace("×", "").trim();
      listItem.remove();
      updateCounter();
      logInteraction("Item removed from list", itemText);
    });
  }

  // Add handler for existing delete button
  const existingDeleteBtn = list.querySelector(".delete-btn");
  if (existingDeleteBtn) {
    addDeleteListener(existingDeleteBtn, existingDeleteBtn.parentElement);
  }

  if (addBtn && input && list) {
    addBtn.addEventListener("click", function () {
      const text = input.value.trim();
      if (text) {
        const li = document.createElement("li");
        li.innerHTML = `${text} <button class="delete-btn">×</button>`;

        const deleteBtn = li.querySelector(".delete-btn");
        addDeleteListener(deleteBtn, li);

        list.appendChild(li);
        input.value = "";
        updateCounter();
        logInteraction("Item added to list", text);
      }
    });

    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        addBtn.click();
      }
    });
  }

  if (clearBtn && list) {
    clearBtn.addEventListener("click", function () {
      const count = list.children.length;
      list.innerHTML = "";
      updateCounter();
      logInteraction("List cleared", `removed ${count} items`);
    });
  }
}

// 9. Slider and progress
function initSliderProgress() {
  const slider = document.getElementById("progressSlider");
  const valueSpan = document.getElementById("sliderValue");
  const progressFill = document.getElementById("progressFill");
  const startBtn = document.getElementById("startProgress");
  const stopBtn = document.getElementById("stopProgress");

  if (slider && valueSpan && progressFill) {
    slider.addEventListener("input", function () {
      const value = this.value;
      valueSpan.textContent = value;
      progressFill.style.width = value + "%";
      logInteraction("Slider changed", `value: ${value}%`);
    });
  }

  if (startBtn && stopBtn && slider && progressFill) {
    startBtn.addEventListener("click", function () {
      if (progressInterval) return;

      logInteraction("Auto-progress started");
      progressInterval = setInterval(function () {
        let currentValue = parseInt(slider.value);
        currentValue += 1;

        if (currentValue > 100) {
          currentValue = 0;
        }

        slider.value = currentValue;
        valueSpan.textContent = currentValue;
        progressFill.style.width = currentValue + "%";
      }, 100);
    });

    stopBtn.addEventListener("click", function () {
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
        logInteraction("Auto-progress stopped");
      }
    });
  }
}

// 10. Tabs
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.dataset.tab;

      // Remove active class from all buttons and panels
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanels.forEach((panel) => panel.classList.remove("active"));

      // Add active class to selected elements
      this.classList.add("active");
      const targetPanel = document.getElementById(targetTab);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }

      logInteraction("Tab switched", targetTab);
    });
  });
}

// Test results
function initTestResults() {
  const exportBtn = document.getElementById("exportResults");
  const clearBtn = document.getElementById("clearResults");
  const logElement = document.getElementById("interactionLog");

  if (exportBtn) {
    exportBtn.addEventListener("click", function () {
      const results = {
        timestamp: new Date().toISOString(),
        totalInteractions: interactionLog.length,
        interactions: interactionLog,
      };

      const dataStr = JSON.stringify(results, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "test-results.json";
      link.click();

      URL.revokeObjectURL(url);
      logInteraction("Results exported");
    });
  }

  if (clearBtn && logElement) {
    clearBtn.addEventListener("click", function () {
      interactionLog = [];
      logElement.innerHTML = "<li>Log cleared</li>";
      logInteraction("Log cleared");
    });
  }
}
