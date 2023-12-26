// @refresh reload

import { For, Setter, batch, createSignal } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import Box from "./box";
import ContextMenu from "./contextMenu";
import { BoxInfo, MENU_TYPE, getMenuType } from "~/constant";

interface Props {
  menuType: MENU_TYPE;
  setMenuType: Setter<MENU_TYPE>;
  boxList: BoxInfo[];
  setBoxList: SetStoreFunction<BoxInfo[]>;
}

export default function Editor(props: Props) {
  const [menuPos, setMenuPos] = createSignal({ x: 0, y: 0 });
  const [selectedBoxId, selectBox] = createSignal(0);
  let boxId = 1;

  const addNewBox = () => {
    props.setBoxList([
      ...props.boxList,
      {
        id: ++boxId,
        color: createRandomColor(),
        pos: menuPos(),
      },
    ]);
  };

  const deleteBox = () => {
    props.setBoxList(props.boxList.filter((box) => box.id !== selectedBoxId()));
  };

  const createRandomColor = () =>
    `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
      Math.random() * 255
    )}, ${Math.ceil(Math.random() * 255)})`;

  const changeBoxColor = () => {
    // Store 사용함으로써 불필요한 렌더링 줄이기
    props.setBoxList(
      (box) => box.id === selectedBoxId(),
      "color",
      createRandomColor()
    );
  };

  return (
    <div
      class="editor"
      onContextMenu={(e) => {
        e.preventDefault(); // remove default context menu
        batch(() => {
          props.setMenuType(getMenuType(e.target.className));
          selectBox(Number(e.target.id));
          setMenuPos({ x: e.clientX, y: e.clientY });
        });
      }}
    >
      <For each={props.boxList}>
        {(box) => <Box id={box.id} color={box.color} pos={box.pos} />}
      </For>
      <ContextMenu
        menuType={props.menuType}
        menuPos={menuPos()}
        addNewBox={addNewBox}
        deleteBox={deleteBox}
        changeBoxColor={changeBoxColor}
      />
    </div>
  );
}
