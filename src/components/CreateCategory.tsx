import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { customCategoryState } from "../atoms";
import { useForm } from "react-hook-form";

interface ICustom {
  myCategory: string;
}

const CreateCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ICustom>();
  const setCustomCategory = useSetRecoilState(customCategoryState);
  const customCategory = useRecoilValue(customCategoryState);

  const handleCustom = ({ myCategory }: ICustom) => {
    console.log(
      customCategory.findIndex((customcat) => customcat.name === myCategory)
    );
    if (
      customCategory.findIndex((customcat) => customcat.name === myCategory) !==
      -1
    ) {
      alert("이미 존재하는 카테고리입니다.");
      setValue("myCategory", "");
      return;
    }

    setCustomCategory((prev) => [
      ...prev,
      { name: myCategory, text: myCategory },
    ]);
    setValue("myCategory", "");
  };

  return (
    <form onSubmit={handleSubmit(handleCustom)}>
      <input {...register("myCategory")} placeholder="Write custom category" />
      <button>생성</button>
    </form>
  );
};

export default CreateCategory;
