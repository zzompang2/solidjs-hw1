// @refresh reload
import { For, createSignal } from "solid-js";
import "./app.css";
import ContextMenu from "./components/contextMenu";
import Box from "./components/box";
import { createStore } from "solid-js/store";

export default function App() {
  const [menuType, setMenuType] = createSignal("close");
  const [menuPos, setMenuPos] = createSignal([0, 0]);
  const [boxList, setBoxList] = createStore(Array(0));
  let selectedBoxId = 0;
  let boxId = 1;

  const createRandomColor = () =>
    `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
      Math.random() * 255
    )}, ${Math.ceil(Math.random() * 255)})`;

  const addNewBox = () => {
    setBoxList([
      ...boxList,
      {
        id: ++boxId,
        color: createRandomColor(),
        pos: menuPos(),
      },
    ]);
  };

  const deleteBox = () => {
    setBoxList(boxList.filter((box) => box.id !== selectedBoxId));
  };

  const changeBoxColor = () => {
    // Store 사용함으로써 불필요한 렌더링 줄이기
    setBoxList((box) => box.id === selectedBoxId, "color", createRandomColor());
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
        <For each={boxList}>
          {(box, i) => <Box id={box.id} color={box.color} pos={box.pos} />}
        </For>
      </div>
      <div class="playground-copied">
        <For each={boxList}>
          {(box, i) => <Box id={box.id} color={box.color} pos={box.pos} />}
        </For>
      </div>
      <ContextMenu
        menuType={menuType()}
        menuPos={menuPos()}
        addNewBox={addNewBox}
        deleteBox={deleteBox}
        changeBoxColor={changeBoxColor}
      />
    </main>
  );
}
