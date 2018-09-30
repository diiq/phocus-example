import {
  Action,
  ActionContextService,
  startPhocus,
  focusInContext
} from "phocus";

/*
You should use a frontend framework! This tiny todo app uses Phocus all by
itself so that you can see what Phocus can do; but you should NOT use Phocus by
itself. Use it with React or Angular or something, OK?

I'm logging to the console instead of interacting with a real API, but the
principle's the same -- you've got the relevant id, so you can make the relevant
request.

*/

var todoList = {};

// First, we'll set up some contexts. One for the whole list, one for the form,
// and one that represents an individual todo item.

ActionContextService.addContext("todo-list", {
  actions: {
    add: new Action({
      name: "Add Todo",
      defaultKeys: ["Control+n"],
      actOn: (_, elt) => {
        focusInContext("new-item-form", elt);
      }
    })
  }
});

ActionContextService.addContext("todo-item-form", {
  actions: {
    add: new Action({
      name: "Add Todo",
      defaultKeys: ["Enter"],
      actOn: (_, elt) => {
        // Get a new event "from the API"
        const input = document.getElementById("new-item-form");
        makeTodoItem(input.value);
        renderList();
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
        // Here's where you'd send a start event to the API, if you had an API
        console.log(`API: Start item ${id}`);
        todoList[id].status = "started";
        renderList(id);
      }
    }),
    finish: new Action({
      name: "Finish",
      defaultKeys: ["f"],
      actOn: (id, elt) => {
        // Here's where you'd send a finish event to the API, if you had an API
        console.log(`API: Finish item ${id}`);
        todoList[id].status = "finished";
        renderList(id);
      }
    }),
    delete: new Action({
      name: "Delete",
      defaultKeys: ["Backspace"],
      actOn: (id, elt) => {
        // Here's where you'd send a delete event to the API, if you had an API
        console.log(`Delete item ${id}`);

        // Update focus
        const prev = getPreviousItem(id);
        const next = getNextItem(id);
        if (prev) {
          focusInContext(`todo-item-${prev.id}`, elt);
        } else if (next) {
          focusInContext(`todo-item-${next.id}`, elt);
        } else {
          focusInContext("new-item-form", elt);
        }

        // Update UI
        delete todoList[id];
        renderList();
      }
    }),
    next: new Action({
      name: "Next",
      defaultKeys: ["ArrowDown", "j"],
      actOn: (id, elt) => {
        const next = getNextItem(id);
        if (next) focusInContext(`todo-item-${next.id}`, elt);
      }
    }),
    previous: new Action({
      name: "previous",
      defaultKeys: ["ArrowUp", "k"],
      actOn: (id, elt) => {
        const prev = getPreviousItem(id);
        if (prev) focusInContext(`todo-item-${prev.id}`, elt);
      }
    })
  }
});

window.addEventListener("load", () => {
  renderList();
  startPhocus(document.body);
  document.querySelector("li").focus();
});

// MODEL
// In a real app this'd be connected to an API, and there'd be
// multiple lists and all kinds of good stuff; this is not the best app in the
// world; this is only a tribu^H^H^H^H^H demo.

var maxId = 1;
function makeTodoItem(name) {
  maxId++;
  const it = {
    id: maxId.toString(),
    name: name,
    status: "todo"
  };
  todoList[maxId.toString()] = it;
  return it;
}

makeTodoItem("Make trouble");
makeTodoItem("Walk the lobster");
makeTodoItem("Sing the body electric");

// RENDERING
// You should use a frontend framework for this sort of thing, I'm simplifying
// so you can see what Phocus is doing without the complexity of a framework.

function renderList(fid) {
  const oldFocus = document.activeElement.dataset.phocusId;
  const list = document.getElementById("list");
  list.innerHTML = Object.keys(todoList)
    .sort()
    .map(id => renderItem(todoList[id]))
    .join("");

  // This nonsense would not be necessary if using a real frontend framework.
  // This business of 'rerender it all every change' is not particularly
  // sustainable, just simple.
  setTimeout(() => {
    if (oldFocus) {
      focusInContext(oldFocus, list);
    } else if (fid) {
      focusInContext(`todo-item-${fid}`, list);
    } else {
      ActionContextService.setContext(list);
    }
  }, 100);
}

function getNextItem(id) {
  const ids = Object.keys(todoList).sort();
  const current = ids.findIndex(i => i === id);
  if (ids.length > current + 1) return todoList[ids[current + 1]];
}

function getPreviousItem(id) {
  const ids = Object.keys(todoList).sort();
  const current = ids.findIndex(i => i === id);
  if (current > 0) return todoList[ids[current - 1]];
}

function renderItem(item) {
  return `<li
    tabindex="0"
    data-phocus-id="todo-item-${item.id}"
    data-phocus-context-name="todo-item"
    data-phocus-context-argument="${item.id}"
    data-phocus-on-mouseover="true"
    class="${item.status}">
      ${item.name}
      <div class="buttons">
        <button data-phocus-action="start"></button>
        <button data-phocus-action="finish"></button>
        <button data-phocus-action="delete">&times;</button>
      </div>
    </li>`;
}
