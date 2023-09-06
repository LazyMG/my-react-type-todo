import React, { useState } from "react";
import { Categories, IToDo, customCategoryState, toDoState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";

const Container = styled.div`
  margin-top: 2rem;
  button {
    margin-right: 0.5rem;
  }
`;

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const [clicked, setClicked] = useState(false);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
    console.log("category: ", category);
    console.log("newCategory: ", newCategory);
    if (category !== newCategory) {
      setClicked((prev) => !prev);
    }
  };

  const deleteToDo = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const customCategory = useRecoilValue(customCategoryState);

  return (
    <Container>
      <li>
        <button onClick={deleteToDo}>❌</button>
        <span> {text} </span>
        {/* {category !== Categories.DOING && (
        <button onClick={() => onClick(Categories.DOING)}>Doing</button>
      )}
      {category !== Categories.TO_DO && (
        <button onClick={() => onClick(Categories.TO_DO)}>To Do</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => onClick(Categories.DONE)}>Done</button>
      )} */}
        {customCategory.map((cat, index) =>
          cat.name !== category ? (
            <button key={index} onClick={() => onClick(cat.name as Categories)}>
              {cat.text}
            </button>
          ) : null
        )}
      </li>
    </Container>
  );
};

export default ToDo;
