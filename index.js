import { Action, ActionContextService, startPhocus } from "phocus";

/*
You should use a frontend framework! This tiny todo app uses Phocus all by
itself so that you can see what Phocus can do; but you should NOT use Phocus by
itself. Use it with React or Angular or something, OK?

I'm logging to the console instead of interacting with a real API, but the
principle's the same -- you've got the relevant id, so you can make the relevant
request.

*/

// First, we'll set up some contexts. One for the whole list, one for the form,
// and one that represents an individual todo item.

ActionContextService.addContext("todo-list", {
  actions: {
    add: new Action({
      name: "Add Todo",
      defaultKeys: ["Control+n"],
      actOn: () => {
        document.getElementById("form").focus();
      }
    })
  }
});

// Standing in for "the API" today is "the number 3":
var maxId = 3;

ActionContextService.addContext("todo-item-form", {
  actions: {
    add: new Action({
      name: "Add Todo",
      defaultKeys: ["Enter"],
      actOn: (_, elt) => {
        // Get a new event "from the API"
        const newId = ++maxId;

        // You should use a frontend framework for this sort of thing,
        // I'm simplifying so you can see just what Phocus is doing.
        const input = document.getElementById("form");
        const list = document.querySelector(".list ul");
        list.innerHTML += `<li tabindex="0" data-phocus-context-name="todo-item" data-phocus-context-argument="${newId}" id="todo-item-${newId}"}>
            ${input.value}
            <div class="buttons">
              <button data-phocus-action="start"></button>
              <button data-phocus-action="finish"></button>
              <button data-phocus-action="delete">&times;</button>
            </div>
          </li>`;
        input.value = "";
        input.focus();
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
        const current = document.getElementById(`todo-item-${id}`);
        const previous = current.previousElementSibling;
        const next = current.nextElementSibling;
        if (previous) {
          previous.focus();
        } else if (next) {
          next.focus();
        } else {
          ActionContextService.triggerAction("add");
        }
        //
        elt.remove();
      }
    }),
    next: new Action({
      name: "Next",
      defaultKeys: ["ArrowDown", "j"],
      actOn: (id, elt) => {
        elt.nextElementSibling && elt.nextElementSibling.focus();
      }
    }),
    previous: new Action({
      name: "previous",
      defaultKeys: ["ArrowUp", "k"],
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
