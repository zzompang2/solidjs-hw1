// @refresh reload
import { For, createSignal } from "solid-js";
import "./app.css";
import ContextMenu from "./components/contextMenu";
import Box from "./components/box";

export default function App() {
  const [menuType, setMenuType] = createSignal("close");
  const [menuPos, setMenuPos] = createSignal([0, 0]);
  const [boxList, setBoxList] = createSignal([]);
  let selectedBoxId = 0;
  let boxId = 1;

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

  const deleteBox = () => {
    setBoxList(boxList().filter((box) => box.id !== selectedBoxId));
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
          {(box, i) => <Box id={box.id} color={box.color} pos={box.pos} />}
        </For>
      </div>
      <ContextMenu
        menuType={menuType()}
        menuPos={menuPos()}
        addNewBox={addNewBox}
        deleteBox={deleteBox}
      />
    </main>
  );
}
