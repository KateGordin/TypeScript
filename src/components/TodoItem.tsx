import React from "react";
import { Item } from "../model";

type Props = {
  // we should receive a todo item object
  item: Item;

  // and a function that we don't have to give
  //  anything, and doesn't return anything either
  //  (it "just does" something)
  toggleDone: () => void;

  // ..and maybe we'll add some more stuff later,
  //  this will be enough for now
};

export default function TodoItem(props: Props) {
  const content = (
    <>
      {props.item.text} (
      {props.item.tags.map((tag, index) =>
        index === props.item.tags.length - 1 ? tag : `${tag}, `
      )}
      )
    </>
  );

  return (
    <div>
      <label>
        <input
          checked={props.item.isDone}
          onChange={props.toggleDone}
          type="checkbox"
        />
      </label>

      {props.item.isDone ? <del>{content}</del> : content}
    </div>
  );
}
