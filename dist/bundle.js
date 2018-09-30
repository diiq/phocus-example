!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=5)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1);e.Action=o.Action,e.ActionContextService=o.ActionContextService;var r=n(2);e.Hotkey=r.Hotkey;var i=n(3);e.ConstrainFocusService=i.ConstrainFocusService;var c=n(6);e.startPhocus=c.startPhocus;var a=n(9);e.focusInContext=a.focusInContext},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),r=function(){function t(t,e,n,o,r){this.action=t,this.contextName=e,this.argument=n,this.element=o,this.service=r}return Object.defineProperty(t.prototype,"hasArgument",{get:function(){return!!this.argument},enumerable:!0,configurable:!0}),t.prototype.act=function(t){return this.action.actOn(this.argument,this.element,t)},t.prototype.context=function(){this.service.contexts[this.contextName]},t}();e.ActionInContext=r;var i=function(){function t(t){this.remappedKey=null,this.remappedKey=null,this.name=t.name,this.shortDocumentation=t.shortDocumentation,this.searchTerms=t.searchTerms,this.actOn=t.actOn,this.defaultKeys=t.defaultKeys,this.hidden=t.hidden||!1}return Object.defineProperty(t.prototype,"keys",{get:function(){return this.remappedKey?[this.remappedKey]:this.defaultKeys},enumerable:!0,configurable:!0}),t.prototype.label=function(){var t=this.keys[0];return t?this.name+" ("+t+")":this.name},t}();e.Action=i;var c=function(){function t(){this.contexts={},this.remappingDirty=!1,this.contextStack=[]}return t.prototype.addContext=function(t,e){this.contexts[t]&&console.warn("Replacing existing context blueprint: ",t),this.contexts[t]=e},t.prototype.clear=function(){this.contextStack=[]},t.prototype.getContextStack=function(t){if(!t)return[];var e=this.getContextStack(t.parentElement);return t.dataset.phocusContextName&&e.unshift({context:t.dataset.phocusContextName,argument:t.dataset.phocusContextArgument,element:t}),e},t.prototype.setContext=function(t){this.contextStack=this.getContextStack(t)},t.prototype.remapAction=function(t,e){t.remappedKey=e},t.prototype.unremapAction=function(t){t.remappedKey=null},t.prototype.unmapAction=function(t){t.remappedKey="None"},Object.defineProperty(t.prototype,"currentRemapping",{get:function(){var t=this,e=Object.keys(this.contexts).map(function(e){var n=t.contexts[e];if(n)return Object.keys(n.actions).map(function(t){var o=n.actions[t];if(o.remappedKey)return{action:t,context:e,mapping:o.remappedKey}})});return[].concat.apply([],e).filter(function(t){return t})},enumerable:!0,configurable:!0}),t.prototype.restoreRemapping=function(t){var e=this;t&&t.map(function(t){var n=e.contexts[t.context].actions[t.action];e.remapAction(n,t.mapping)})},Object.defineProperty(t.prototype,"availableActions",{get:function(){return this.actionsInContexts(this.contextStack)},enumerable:!0,configurable:!0}),t.prototype.actionsInContexts=function(t){for(var e=[],n=0;n<t.length;n++){var o=t[n],r=this.contextFor(o);if(!r)return void console.error("Unknown action context:",o.context);var i=this.actionsFromContext(o);if(e=e.concat(i),r.opaque)break}return e},t.prototype.actionsFromContext=function(t){var e=this,n=this.contextFor(t).actions;return Object.keys(n).map(function(o){return new r(n[o],t.context,t.argument,t.element,e)})},t.prototype.contextFor=function(t){return this.contexts[t.context]},t.prototype.actionForKeypress=function(t){var e=this.availableActions;if(e)return e.find(function(e){return e.action.keys.indexOf(t)>=0})},t.prototype.handleKeypress=function(t){var e=o.Hotkey.canonicalKeyFromEvent(t),n=this.actionForKeypress(e);n&&(t.preventDefault(),t.stopPropagation(),n.act(t))},t.prototype.actionForName=function(t){var e=this,n=this.contextStack.find(function(n){var o=e.contextFor(n);return o&&t in o.actions});if(n){var o=this.contextFor(n);return new r(o.actions[t],n.context,n.argument,n.element,this)}},t.prototype.triggerAction=function(t,e){var n=this.actionForName(t);n?n.act(e):console.error("No action found for name "+t+".",this.contextStack)},t}();e.ActionContextServiceClass=c,e.ActionContextService=new c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});for(var o={3:["Cancel","Cancel"],6:["Help","Help"],8:["Backspace","Backspace"],9:["Tab","Tab"],12:["Clear","Clear"],13:["Enter","Enter"],16:["Shift","Shift"],17:["Control","Control"],18:["Alt","Alt"],19:["Pause","Pause"],20:["CapsLock","CapsLock"],27:["Escape","Escape"],28:["Convert","Convert"],29:["NonConvert","NonConvert"],30:["Accept","Accept"],31:["ModeChange","ModeChange"],32:[" "," "],33:["PageUp","PageUp"],34:["PageDown","PageDown"],35:["End","End"],36:["Home","Home"],37:["ArrowLeft","ArrowLeft"],38:["ArrowUp","ArrowUp"],39:["ArrowRight","ArrowRight"],40:["ArrowDown","ArrowDown"],41:["Select","Select"],42:["Print","Print"],43:["Execute","Execute"],44:["PrintScreen","PrintScreen"],45:["Insert","Insert"],46:["Delete","Delete"],48:["0",")"],49:["1","!"],50:["2","@"],51:["3","#"],52:["4","$"],53:["5","%"],54:["6","^"],55:["7","&"],56:["8","*"],57:["9","("],91:["OS","OS"],93:["ContextMenu","ContextMenu"],144:["NumLock","NumLock"],145:["ScrollLock","ScrollLock"],181:["VolumeMute","VolumeMute"],182:["VolumeDown","VolumeDown"],183:["VolumeUp","VolumeUp"],186:[";",":"],187:["=","+"],188:[",","<"],189:["-","_"],190:[".",">"],191:["/","?"],192:["`","~"],219:["[","{"],220:["\\","|"],221:["]","}"],222:["'",'"'],224:["Meta","Meta"],225:["AltGraph","AltGraph"],246:["Attn","Attn"],247:["CrSel","CrSel"],248:["ExSel","ExSel"],249:["EraseEof","EraseEof"],250:["Play","Play"],251:["ZoomOut","ZoomOut"]},r="",i=65;i<91;i++)r=String.fromCharCode(i),o[i]=[r.toLowerCase(),r.toUpperCase()];var c=function(){function t(){this.displayMap={Alt:"Alt+",Meta:"⌘+",OS:"⊞+",Shift:"⇧",Control:"Ctrl+"},this.modifiers=["Control","Alt","Shift","Meta","OS"],this.isMacLike=!!navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)}return t.prototype.keyName=function(t){return{" ":"Space"}[t]||t},t.prototype.modifierKeyNameForPlatform=function(t){return this.displayMap[t]},t.prototype.displayKey=function(t){var e=this,n=t.split("+"),o=n.pop();return n.map(function(t){return e.modifierKeyNameForPlatform(t)}).join("")+o},t.prototype.canonicalKeyFromEvent=function(t){var e=o[t.keyCode][t.getModifierState("Shift")?1:0];return this.modifiers.indexOf(e)>=0?"":this.modifiers.map(function(e){return t.getModifierState(e)?e+"+":""}).join("")+this.keyName(e)},t}();e.HotkeyClass=c,e.Hotkey=new c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(){var t=this;this.stack=[],this.handler=function(e){if(!t.noConstraints()){var n=t.currentRoot();n&&e.relatedTarget&&(n.contains(e.relatedTarget)||(n.contains(e.target)?e.target.focus():n.querySelector("[tabindex='0']").focus()))}}}return t.prototype.start=function(){document.addEventListener("blur",this.handler,!0)},t.prototype.stop=function(){document.removeEventListener("blur",this.handler,!0)},t.prototype.focusable=function(t){var e=this.currentRoot();return this.noConstraints()||e&&e.contains(t)},t.prototype.currentRoot=function(){return this.stack[0]&&this.stack[0]()},t.prototype.pushConstraint=function(t){this.stack.unshift(t)},t.prototype.popConstraint=function(){this.stack.shift()},t.prototype.noConstraints=function(){return 0==this.stack.length},t}();e.ConstrainFocus=o,e.ConstrainFocusService=new o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1);function r(t){t.target instanceof HTMLElement&&t.target.dataset.phocusAction&&(t.target.disabled||(o.ActionContextService.setContext(t.target),o.ActionContextService.triggerAction(t.target.dataset.phocusAction)))}e.triggerableTags=["button","a"],e.addTrigger=function(t){if(t.dataset.phocusAction){var n=t.dataset.phocusAction;e.triggerableTags.indexOf(t.tagName.toLowerCase())<0&&(console.error(t.tagName+" (assigned to trigger "+n+") is not an accessible tag. Use a <button> or an <a>."),console.info("Setting role to 'button' to compensate."),t.setAttribute("role","button"));var i=o.ActionContextService.contextStack;try{o.ActionContextService.setContext(t);var c=o.ActionContextService.actionForName(n);if(!c)return void console.error("No action found for name "+n,o.ActionContextService.contextStack);t.title=c.action.label(),t.setAttribute("aria-label",c.action.label()),/^\s*$/.test(t.innerHTML)&&(t.innerHTML=c.action.name),t.addEventListener("click",r)}finally{o.ActionContextService.contextStack=i}}},e.removeTrigger=function(t){t.removeEventListener("click",r)}},function(t,e,n){"use strict";n.r(e);var o=n(0),r={};o.ActionContextService.addContext("todo-list",{actions:{add:new o.Action({name:"Add Todo",defaultKeys:["Control+n"],actOn:(t,e)=>{Object(o.focusInContext)("new-item-form",e)}})}}),o.ActionContextService.addContext("todo-item-form",{actions:{add:new o.Action({name:"Add Todo",defaultKeys:["Enter"],actOn:(t,e)=>{const n=document.getElementById("new-item-form");c(n.value),a(),n.value="",n.focus()}})}}),o.ActionContextService.addContext("todo-item",{actions:{start:new o.Action({name:"Start",defaultKeys:["s"],actOn:(t,e)=>{console.log(`API: Start item ${t}`),r[t].status="started",a(t)}}),finish:new o.Action({name:"Finish",defaultKeys:["f"],actOn:(t,e)=>{console.log(`API: Finish item ${t}`),r[t].status="finished",a(t)}}),delete:new o.Action({name:"Delete",defaultKeys:["Backspace"],actOn:(t,e)=>{console.log(`Delete item ${t}`);const n=u(t),i=s(t);n?Object(o.focusInContext)(`todo-item-${n.id}`,e):i?Object(o.focusInContext)(`todo-item-${i.id}`,e):Object(o.focusInContext)("new-item-form",e),delete r[t],a()}}),next:new o.Action({name:"Next",defaultKeys:["ArrowDown","j"],actOn:(t,e)=>{const n=s(t);n&&Object(o.focusInContext)(`todo-item-${n.id}`,e)}}),previous:new o.Action({name:"previous",defaultKeys:["ArrowUp","k"],actOn:(t,e)=>{const n=u(t);n&&Object(o.focusInContext)(`todo-item-${n.id}`,e)}})}}),window.addEventListener("load",()=>{a(),Object(o.startPhocus)(document.body),document.querySelector("li").focus()});var i=1;function c(t){const e={id:(++i).toString(),name:t,status:"todo"};return r[i.toString()]=e,e}function a(t){const e=document.activeElement.dataset.phocusId,n=document.getElementById("list");n.innerHTML=Object.keys(r).sort().map(t=>(function(t){return`<li\n    tabindex="0"\n    data-phocus-id="todo-item-${t.id}"\n    data-phocus-context-name="todo-item"\n    data-phocus-context-argument="${t.id}"\n    data-phocus-on-mouseover="true"\n    class="${t.status}">\n      ${t.name}\n      <div class="buttons">\n        <button data-phocus-action="start"></button>\n        <button data-phocus-action="finish"></button>\n        <button data-phocus-action="delete">&times;</button>\n      </div>\n    </li>`})(r[t])).join(""),e?Object(o.focusInContext)(e,n):t?Object(o.focusInContext)(`todo-item-${t}`,n):o.ActionContextService.setContext(n)}function s(t){const e=Object.keys(r).sort(),n=e.findIndex(e=>e===t);if(e.length>n+1)return r[e[n+1]]}function u(t){const e=Object.keys(r).sort(),n=e.findIndex(e=>e===t);if(n>0)return r[e[n-1]]}c("Make trouble"),c("Walk the lobster"),c("Sing the body electric")},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o,r=n(1),i=n(7),c=n(4),a=n(3);function s(t){!function(){var t,e=document.activeElement;(t=e instanceof HTMLElement||!e.parentElement?e:e.parentElement)&&t!=document.body&&r.ActionContextService.setContext(t)}(),r.ActionContextService.handleKeypress(t)}function u(t){t.forEach(function(t){t.addedNodes.forEach(function(t){t instanceof HTMLElement&&i.dispatch(t)}),"attributes"==t.type&&t.target instanceof HTMLElement&&(t.target.dataset.phocusAction?c.addTrigger(t.target):c.removeTrigger(t.target))})}e.startPhocus=function(t){i.dispatch(t),document.addEventListener("keydown",s),(o=new MutationObserver(u)).observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-phocus-action"]}),a.ConstrainFocusService.start(),console.debug("Phocus: Watching for changes.")},e.stopPhocus=function(t){i.undispatch(t),document.removeEventListener("keydown",s),o.disconnect(),a.ConstrainFocusService.stop(),console.debug("Phocus: Watching stopped.")}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(4),r=n(8);e.dispatch=function(t){t.dataset.phocusAction&&o.addTrigger(t),t.dataset.phocusOnMouseover&&r.makeMouseoverFocusable(t);var e=t.querySelectorAll("[data-phocus-action]:not([data-phocus-action=''])");Array.from(e).forEach(function(t){t instanceof HTMLElement&&o.addTrigger(t)}),e=t.querySelectorAll("[data-phocus-on-mouseover]:not([data-phocus-on-mouseover=''])"),Array.from(e).forEach(function(t){t instanceof HTMLElement&&r.makeMouseoverFocusable(t)})},e.undispatch=function(t){t.dataset.phocusAction&&o.removeTrigger(t),t.dataset.phocusOnMouseover&&r.removeMouseoverFocusable(t);var e=t.querySelectorAll("[data-phocus-action]:not([data-phocus-action=''])");Array.from(e).forEach(function(t){t instanceof HTMLElement&&o.removeTrigger(t)}),e=t.querySelectorAll("[data-phocus-on-mouseover]:not([data-phocus-on-mouseover=''])"),Array.from(e).forEach(function(t){t instanceof HTMLElement&&r.removeMouseoverFocusable(t)})}},function(t,e,n){"use strict";function o(t){t.target.focus()}Object.defineProperty(e,"__esModule",{value:!0}),e.makeMouseoverFocusable=function(t){void 0==t.getAttribute("tabindex")&&(t.tabIndex=0),t.addEventListener("mouseenter",o)},e.removeMouseoverFocusable=function(t){t.removeEventListener("mouseenter",o)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.focusInContext=function t(e,n){var o=function t(e){var n=e.parentElement;return n?n.dataset.phocusContextName?n:t(n):null}(n||document.activeElement);if(o){var r=o.querySelector('[data-phocus-id="'+e+'"');r?r.focus():t(e,o)}else console.error("No element found to focus with phocus-id "+e)}}]);
//# sourceMappingURL=bundle.js.map