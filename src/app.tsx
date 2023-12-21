// @refresh reload
import { For, createSignal } from "solid-js";
import "./app.css";
import ContextMenu from "./components/contextMenu";

export default function App() {
  const [menuType, setMenuType] = createSignal("close");
  const [menuPos, setMenuPos] = createSignal([0, 0]);
  const [boxList, setBoxList] = createSignal([
    { id: 1, color: "#0000ff", pos: [100, 0] },
    { id: 2, color: "#00ff00", pos: [200, 200] },
  ]);
  let selectedBoxId = 0;
  let boxId = 2;

  const addNewBox = () => {
    setBoxList([
      ...boxList(),
      {
        id: ++boxId,
        color: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
          Math.random() * 255
        )}, ${Math.ceil(Math.random() * 255)})`,
        pos: menuPos(),
      },
    ]);
  };

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
        <For each={boxList()}>
          {(box, i) => (
            <div
              class="box"
              id={box.id.toString()}
              style={{
                "background-color": box.color,
                left: `${box.pos[0]}px`,
                top: `${box.pos[1]}px`,
              }}
            ></div>
          )}
        </For>
      </div>
      <ContextMenu
        menuType={menuType()}
        menuPos={menuPos()}
        addNewBox={addNewBox}
      />
    </main>
  );
}
