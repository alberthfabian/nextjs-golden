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
import styles from "./Create.module.css";

const Edit = ({ category, setVisible, idCategory }) => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const validationSchema = Yup.object().shape({
    category: Yup.object()
      .shape({
        label: Yup.number().required("Required"),
        value: Yup.string().required("Required"),
      })
      .nullable(),
    title: Yup.string().required("El título es requerido"),
    url: Yup.string().required("La página es requerida"),
    value: Yup.number()
      .transform((cv, ov) => {
        return ov === "" ? undefined : cv;
      })
      .nullable()
      .required("El valor es requerido")
      .integer()
      .positive(),
    document: Yup.string(),
  });

  const formOptions = {
    defaultValues: {
      category,
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
        url: data.url,
        value: data.value,
        document: data?.document,
        category: {
          id: idCategory,
        },
      },
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/pages`, sendData, {
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
            toast.success("Página creada", {
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
        {/* <div className={styles.space}>
          <label>Categoría</label>
          <select
            name="category"
            {...register("category")}
            className={styles.input}
          >
            <option value={idCategory} selected>
              {category}
            </option>
          </select>
          <Text color="error">{errors.category?.message}</Text>
        </div> */}
        <div className={styles.space}>
          <label>Categoría</label>
          <input
            className={styles.input}
            name="category"
            type="text"
            {...register("category")}
            disabled
          />
          <Text color="error">{errors.category?.message}</Text>
        </div>
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
        <div className={styles.space}>
          <label>Página</label>
          <input
            name="url"
            type="text"
            {...register("url")}
            className={styles.input}
          />
          <Text color="error">{errors.url?.message}</Text>
        </div>
        <div className={styles.space}>
          <label>Valor</label>
          <input
            name="value"
            type="number"
            {...register("value")}
            className={styles.input}
          />
          <Text color="error">{errors.value?.message}</Text>
        </div>
        <div className={styles.space}>
          <label>Documento</label>
          <input
            name="document"
            type="text"
            {...register("document")}
            className={styles.input}
          />
          <Text color="error">{errors.document?.message}</Text>
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
        <Button auto flat color="error" onClick={() => setVisible(false)}>
          Cancelar
        </Button>
        <Button auto type="submit">
          {load ? <Loading color="success" /> : "Crear"}
        </Button>
      </Modal.Footer>
    </form>
  );
};

export default Edit;
