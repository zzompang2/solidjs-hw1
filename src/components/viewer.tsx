// @refresh reload

import { For } from "solid-js";
import Box from "./box";
import { BoxInfo } from "~/constant";

interface Props {
  boxList: BoxInfo[];
}

export default function Viewer(props: Props) {
  return (
    <div
      class="viewer"
      onContextMenu={(e) => {
        e.preventDefault(); // remove default context menu
      }}
    >
      <For each={props.boxList}>
        {(box) => <Box id={box.id} color={box.color} pos={box.pos} />}
      </For>
    </div>
  );
}
