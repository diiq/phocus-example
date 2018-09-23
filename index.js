import { Action, ActionContextService, startPhocus, ConstrainFocusService } from "phocus";

var maxId = 3;

ActionContextService.addContext("todo-list", {
  actions: {
    add: new Action({
      name: "Add Todo Item",
      defaultKeys: ["Control+n"],
      actOn: (_, elt) => {
        // Get a new event "from the API"
        const newId = ++maxId;
        // You should use a frontend framework for this sort of thing,
        // I'm simplifying so you can see just what Phocus is doing.
        elt.querySelector("ul").innerHTML +=
          `<li tabindex="0" data-phocus-context-name="todo-item" data-phocus-context-argument="1">
             Item ${newId}
             <div class="buttons">
               <button data-phocus-action="start"></button>
               <button data-phocus-action="finish"></button>
               <button data-phocus-action="delete">&times;</button>
             </div>
          </li>`;
          elt.querySelector("ul").lastChild.focus();
      }
    })
  }
});

ActionContextService.addContext("todo-item", {
  actions: {
    start: new Action({
      name: "Start",
      defaultKeys: ["s"],
      actOn: (id, elt) => {
        // Send a delete event to the API, or whatever you like
        console.log(`Start item ${id}`);
        // Update the UI
        elt.classList.add("started");
      }
    }),
    finish: new Action({
      name: "Finish",
      defaultKeys: ["f"],
      actOn: (id, elt) => {
        // Send a delete event to the API, or whatever you like
        console.log(`Finish item ${id}`);
        // Update the UI
        elt.classList.remove("started");
        elt.classList.add("finished");
      }
    }),
    delete: new Action({
      name: "Delete",
      defaultKeys: ["Backspace"],
      actOn: (id, elt) => {
        // Send a delete event to the API, or whatever you like
        console.log(`Delete item ${id}`);
        // Update the UI
        elt.remove();
      }
    }),
    next: new Action({
      name: "Next",
      defaultKeys: ["ArrowDown", "k"],
      actOn: (id, elt) => {
        elt.nextElementSibling && elt.nextElementSibling.focus();
      }
    }),
    previous: new Action({
      name: "previous",
      defaultKeys: ["ArrowUp", "j"],
      actOn: (id, elt) => {
        elt.previousElementSibling && elt.previousElementSibling.focus();
      }
    })
  }
});

window.addEventListener("load", () => {
  startPhocus(document.body);
  document.querySelector("li").focus();
});
