
// initializing view elements.
_display_fbuttons(true);
_common_system_auto_change_color();

/* JS functions specific for the toggle function */

const toggleSwitch = document.getElementById("switch");
const toggleStatus = document.getElementById("switch-status");

function onCheckboxToggle() {
  const isChecked = this.hasAttribute("checked");

  /* 1. Update toggle switch visual state. */
  this.toggleAttribute("checked");

  /* 2. Update toggle switch status text. */
  toggleStatus.innerText = isChecked ? "Regular User" : " Admin User";
}

toggleSwitch.addEventListener("change", onCheckboxToggle);
