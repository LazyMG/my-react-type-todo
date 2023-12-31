import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "../atoms";
import { styled } from "styled-components";

interface IForm {
  toDo: string;
}

const Container = styled.div``;

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, category, id: Date.now() },
      ...oldToDos,
    ]);
    setValue("toDo", "");
    console.log(toDo);
  };

  return (
    <>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(handleValid)}
      >
        <input
          {...register("toDo", { required: "Please write a To Do" })}
          placeholder="Write a to do"
        />
        <span>{errors.toDo?.message}</span>
        <button>Add</button>
      </form>
    </>
  );
};

export default CreateToDo;
