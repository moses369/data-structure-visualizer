import { ReactNode } from "react";

export interface ReactChildren {
    children:ReactNode
}
export type BtnClickEvent = React.MouseEvent<HTMLButtonElement>
export type DSTypes = 'Linked List' | 'Queue'