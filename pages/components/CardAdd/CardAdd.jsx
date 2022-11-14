import { useState } from "react";

//Libs
import confetti from "canvas-confetti";
import { Image, Button, Tooltip } from "@nextui-org/react";

// Components
import ModalInfo from "../ModalInfo/ModalInfo";
import Create from "../Form/Page/Create/Create";

// Styles
import styles from "./CardAdd.module.css";

const CardAdd = ({ idCategory, title }) => {
  const [visible, setVisible] = useState(false);

  const createPage = () => {
    setVisible(true);
    var defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ["star"],
      colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  return (
    <Tooltip content={"Crear página"} color="success">
      <Button auto light className={styles.headerCard} onPress={createPage}>
        <div className={styles.containerImg}>
          <Image width={100} height={100} alt="Añadir" src="/img/add.png" />
        </div>
      </Button>
      <ModalInfo
        visible={visible}
        setVisible={setVisible}
        title={"Crear página"}
      >
        <Create
          category={title}
          idCategory={idCategory}
          setVisible={setVisible}
        />
      </ModalInfo>
    </Tooltip>
  );
};

export default CardAdd;
