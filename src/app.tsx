// @refresh reload
import { createSignal } from "solid-js";
import "./app.css";
import ContextMenu from "./components/contextMenu";

export default function App() {
  const [menuType, setMenuType] = createSignal("close");
  const [menuPos, setMenuPos] = createSignal([0, 0]);
  const [boxList, setBoxList] = createSignal([
    { id: 1, color: "#0000ff", posx: 100, posy: 0 },
    { id: 2, color: "#00ff00", posx: 200, posy: 200 },
  ]);
  let selectedBoxId = 0;

  return (
    <main
      onclick={() => {
        selectedBoxId = 0;
        setMenuType("close");
      }}
    >
      <div
        class="playground"
        onContextMenu={(e) => {
          e.preventDefault(); // remove default context menu
          selectedBoxId = Number(e.target.id);
          setMenuType(e.target.className);
          setMenuPos([e.clientX, e.clientY]);
        }}
      >
        {boxList().map((box) => {
          return (
            <div
              class="box"
              id={box.id.toString()}
              style={{
                "background-color": box.color,
                left: `${box.posx}px`,
                top: `${box.posy}px`,
              }}
            ></div>
          );
        })}
      </div>
      <ContextMenu menuType={menuType()} menuPos={menuPos()} />
    </main>
  );
}
