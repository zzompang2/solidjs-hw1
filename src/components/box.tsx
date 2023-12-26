// @refresh reload

import { BoxInfo } from "~/constant";

export default function Box(props: BoxInfo) {
  return (
    <div
      class="box"
      id={props.id.toString()}
      style={{
        "background-color": props.color,
        left: `${props.pos.x}px`,
        top: `${props.pos.y}px`,
      }}
    ></div>
  );
}
