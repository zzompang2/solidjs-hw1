// @refresh reload

import { Match, Show, Switch } from "solid-js";

interface Props {
  menuType: string; // "close" | "playground" | "box";
  menuPos: number[];
  addNewBox: () => void;
  deleteBox: () => void;
  changeBoxColor: () => void;
}

export default function ContextMenu(props: Props) {
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
            <div
              class="contextmenu-item"
              onclick={() => {
                console.log("Add");
                props.addNewBox();
              }}
            >
              Add
            </div>
          </Match>
          <Match when={props.menuType === "box"}>
            <div class="contextmenu-item" onclick={() => props.deleteBox()}>
              Delete
            </div>
            <div
              class="contextmenu-item"
              onclick={() => props.changeBoxColor()}
            >
              Change Color
            </div>
          </Match>
        </Switch>
      </div>
    </Show>
  );
}
