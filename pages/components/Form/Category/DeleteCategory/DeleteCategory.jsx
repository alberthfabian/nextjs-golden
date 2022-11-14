import { useState } from "react";

// Libs
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Button, Grid, Loading } from "@nextui-org/react";

// Redux
import { dataInitial } from "../../../../../redux/pagesSlice";

// Styles
import styles from "./DeleteCategory.module.css";

const DeleteCategory = ({ idCategory, setVisible }) => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleDelete = () => {
    setLoad(true);
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${idCategory}`, {
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
            toast.success("Categoría eliminada", {
              duration: 4000,
            });
            setLoad(false);
            setVisible(false);
          })
          .catch((e) => {
            console.log("e", e);
            toast.error("A ocurrido un error, por favor intente más tarde", {
              duration: 4000,
            });
            setLoad(false);
            setVisible(false);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Grid.Container gap={2} justify="center">
      <Grid>
        <Button
          bordered
          color="success"
          auto
          onPress={() => setVisible(false)}
          className={styles.hoverCancel}
        >
          Cancelar
        </Button>
      </Grid>
      <Grid>
        <Button
          bordered
          color="error"
          auto
          onPress={handleDelete}
          className={styles.hoverDelete}
        >
          {load ? <Loading color="error" /> : "Eliminar"}
        </Button>
      </Grid>
    </Grid.Container>
  );
};

export default DeleteCategory;
