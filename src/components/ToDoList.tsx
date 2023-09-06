import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, customCategoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import CreateCategory from "./CreateCategory";
import { styled } from "styled-components";

const HighContainer = styled.div`
  padding: 0px 2rem;
  max-width: 30rem;
  margin: 0px auto;
  input {
    font-size: 1rem;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 4rem;
  margin-top: 3rem;
`;

const CategoryContainer = styled.div`
  margin: 2rem 0;
  select {
    font-size: 1rem;
    margin-bottom: 5px;
  }
`;

const ToDoContainer = styled.div`
  margin: 2rem 0;
`;

const ToDoList = () => {
  //const toDos = useRecoilValue(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const customCategory = useRecoilValue(customCategoryState);
  // const categoryArr = [
  //   { name: Categories.TO_DO, text: "To do" },
  //   { name: Categories.DOING, text: "Doing" },
  //   { name: Categories.DONE, text: "Done" },
  // ];

  return (
    <HighContainer>
      <Title>
        <div>To Dos</div>
      </Title>
      <CategoryContainer>
        <select value={category} onInput={onInput}>
          {/* <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option> */}
          {customCategory.map((cat, index) => (
            <option key={index} value={cat.name}>
              {cat.text}
            </option>
          ))}
        </select>
        <CreateCategory />
      </CategoryContainer>
      <hr />
      <ToDoContainer>
        <CreateToDo />
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ToDoContainer>
    </HighContainer>
  );
};

// interface IForm {
//   email: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   password: string;
//   password1: string;
//   extraError?: string;
// }

// const ToDoList = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<IForm>({
//     defaultValues: {
//       email: "@naver.com",
//     },
//   });

//   const onValid = (data: IForm) => {
//     if (data.password !== data.password1) {
//       setError(
//         "password1",
//         { message: "Password are not the same" },
//         { shouldFocus: true }
//       );
//     }
//     //setError("extraError", { message: "Server offline" });
//   };
//   console.log(errors);
//   return (
//     <div>
//       <form
//         style={{ display: "flex", flexDirection: "column" }}
//         onSubmit={handleSubmit(onValid)}
//       >
//         {/* <input {...register("toDo")} placeholder="Write a to do" /> */}
//         <input
//           {...register("email", {
//             required: "Email is required",
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//               message: "Only naver.com emails allowed",
//             },
//           })}
//           placeholder="Write a Email"
//         />
//         <span>{errors.email?.message as string}</span>
//         <input
//           {...register("firstName", {
//             required: "First Name is required",
//             validate: {
//               noMaga: (value) =>
//                 value.includes("maga") ? "no maga allowed" : true,
//               noMark: (value) =>
//                 value.includes("mark") ? "no mark allowed" : true,
//             },
//           })}
//           placeholder="Write a First Name"
//         />
//         <span>{errors.firstName?.message as string}</span>
//         <input
//           {...register("lastName", { required: "Last Name is required" })}
//           placeholder="Write a Last Name"
//         />
//         <span>{errors.lastName?.message as string}</span>
//         <input
//           {...register("username", {
//             required: "Username is required",
//             minLength: 10,
//           })}
//           placeholder="Write a Username"
//         />
//         <span>{errors.username?.message as string}</span>
//         <input
//           {...register("password", {
//             required: "Password is required",
//             minLength: 5,
//           })}
//           placeholder="Write a Password"
//         />
//         <span>{errors.password?.message as string}</span>
//         <input
//           {...register("password1", {
//             required: "Password is required",
//             minLength: 5,
//           })}
//           placeholder="Write a Password Confirmation"
//         />
//         <span>{errors.password1?.message as string}</span>
//         <button>Add</button>
//         <span>{errors.extraError?.message}</span>
//       </form>
//     </div>
//   );
// };

export default ToDoList;
