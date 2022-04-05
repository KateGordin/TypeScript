import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { Item } from "../model"; // we need to import the type

export default function TodoList() {
  // note the <Item[]> syntax!
  const [list, setList] = useState<Item[]>([
    {
      id: 0,
      text: "Make this app",
      tags: ["react", "typescript"],
      isDone: false,
    },
    {
      id: 1,
      text: "Fall in love with TypeScript",
      tags: ["romantic", "typescript"],
      isDone: false,
    },
  ]);

  const toggle = (id: number) => {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    setList(updatedList);
  };

  //buttons
  const [requiredTags, setRequiredTags] = useState<string[]>([]);

  const toggleTagRequired = (tag: string) => {
    console.log("tag", tag);
    if (requiredTags.includes(tag)) {
      setRequiredTags(requiredTags.filter((item) => item !== tag));
    } else {
      requiredTags.push(tag);
      setRequiredTags([...requiredTags]);
    }
  };

  const tags = Array.from(new Set(list.map((item) => item.tags).flat()));

  const getFilteredList = () => {
    return list.filter((item) => {
      for (let tag of requiredTags) {
        if (!item.tags.includes(tag)) {
          return false;
        }
      }
      return true;
    });
  };

  return (
    <div>
      <span style={{ fontWeight: "bold" }}>Filter by tag: </span>
      {tags.map((tag) => (
        <button onClick={() => toggleTagRequired(tag)}>
          {requiredTags.includes(tag) ? <strong>{tag}</strong> : tag}
        </button>
      ))}

      {getFilteredList().map((item) => {
        return (
          <TodoItem
            key={item.id}
            item={item}
            toggleDone={() => {
              toggle(item.id);
            }}
          />
        );
      })}
    </div>
  );
}
