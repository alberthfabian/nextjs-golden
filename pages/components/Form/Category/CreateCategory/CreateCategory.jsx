import { useState } from "react";

// Libs
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Text, Modal, Loading } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

// Redux
import { dataInitial } from "../../../../../redux/pagesSlice";

// Style
import styles from "./CreateCategory.module.css";

const CreateCategory = ({ setVisible }) => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("El título es requerido"),
  });

  const formOptions = {
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(validationSchema),
  };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    setLoad(true);

    const sendData = {
      data: {
        title: data.title,
      },
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/categories`, sendData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      })
      .then((res) => {
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/categories?populate=*`)
          .then((res) => {
            dispatch(dataInitial(res?.data?.data));
            toast.success("Categoría creada", {
              duration: 4000,
            });
            setLoad(false);
            setVisible(false);
          })
          .catch((e) => {
            console.log(e);
            toast.error("A ocurrido un error, por favor intente más tarde", {
              duration: 4000,
            });
            setLoad(false);
            setVisible(false);
          });
      })
      .catch((e) => {
        console.log(e);
        toast.error("A ocurrido un error, por favor intente más tarde", {
          duration: 4000,
        });
        setLoad(false);
        setVisible(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <div className={styles.space}>
          <label>Titulo</label>
          <input
            className={styles.input}
            name="title"
            type="text"
            {...register("title")}
          />
          <Text color="error">{errors.title?.message}</Text>
        </div>
        <br />
      </div>
      <div className={styles.button}>
        <Button
          type="button"
          onPress={() => reset()}
          bordered
          color="warning"
          auto
          className={styles.hoverReset}
        >
          Resetear
        </Button>
      </div>
      <Modal.Footer className={styles.modalFooter}>
        <Button auto flat color="error" onPress={() => setVisible(false)}>
          Cancelar
        </Button>
        <Button auto type="submit">
          {load ? <Loading color="success" /> : "Crear"}
        </Button>
      </Modal.Footer>
    </form>
  );
};

export default CreateCategory;
