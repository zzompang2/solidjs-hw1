// @refresh reload

import { Match, Show, Switch } from "solid-js";
import { Portal } from "solid-js/web";
import { MENU_TYPE, Position } from "~/constant";

interface Props {
  menuType: MENU_TYPE;
  menuPos: Position;
  addNewBox: () => void;
  deleteBox: () => void;
  changeBoxColor: () => void;
}

export default function ContextMenu(props: Props) {
  let contextRef;

  return (
    <Show when={props.menuType !== MENU_TYPE.CLOSE}>
      {/* Portal: contextmenu 컴포넌트를 app 자식으로 이동 */}
      <Portal mount={document.getElementById("app") as Node}>
        <div
          class="contextmenu"
          style={{
            left: `${props.menuPos.x}px`,
            top: `${props.menuPos.y}px`,
          }}
          ref={contextRef}
        >
          <Switch>
            <Match when={props.menuType === MENU_TYPE.EDITOR}>
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
            <Match when={props.menuType === MENU_TYPE.BOX}>
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
      </Portal>
    </Show>
  );
}
