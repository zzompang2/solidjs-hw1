export type Position = {
  x: number;
  y: number;
};

export type BoxInfo = {
  id: number;
  color: string;
  pos: Position;
};

export const enum MENU_TYPE {
  CLOSE,
  EDITOR,
  BOX,
}

export function getMenuType(str: string): MENU_TYPE {
  switch (str) {
    case "editor":
      return MENU_TYPE.EDITOR;
    case "box":
      return MENU_TYPE.BOX;
    default:
      return MENU_TYPE.CLOSE;
  }
}
