// @refresh reload

import { Match, Show, Switch } from "solid-js";

export default function ContextMenu(props) {
  let contextRef;

  return (
    <Show when={props.menuType !== "close"}>
      <div
        class="contextmenu"
        style={{ left: `${props.menuPos[0]}px`, top: `${props.menuPos[1]}px` }}
        ref={contextRef}
      >
        <Switch>
          <Match when={props.menuType === "playground"}>
            <div class="contextmenu-item" onclick={() => console.log("Add")}>
              Add
            </div>
          </Match>
          <Match when={props.menuType === "box"}>
            <div class="contextmenu-item" onclick={() => console.log("Delete")}>
              Delete
            </div>
            <div
              class="contextmenu-item"
              onclick={() => console.log("Change Color")}
            >
              Change Color
            </div>
          </Match>
        </Switch>
      </div>
    </Show>
  );
}
