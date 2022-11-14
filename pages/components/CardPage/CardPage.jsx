import { useState } from "react";

//Libs
import { Card, Grid, Text, Button, Row } from "@nextui-org/react";

// Components
import Edit from "../Form/Page/Edit/Edit";
import ModalInfo from "../ModalInfo/ModalInfo";
import DeletePage from "./DeletePage/DeletePage";

// Styles
import styles from "./CardPage.module.css";

const CardPage = ({ idPage, title, value, url, document, idCategory }) => {
  const pesoLocale = Intl.NumberFormat("en-CO");
  const [visible, setVisible] = useState(false);
  const [deletePage, setDeletePage] = useState(false);

  return (
    <Grid.Container gap={2}>
      <Grid>
        <Card>
          <Card.Header>
            <Text h5>{title}</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ py: "$10" }}>
            <Text h6 weight="bold">
              <a target="_blank" href={url} rel="noopener noreferrer">
                <Button bordered color="gradient" auto>
                  Visitar página
                </Button>
              </a>

              {document !== "" && document !== null ? (
                <>
                  <br />
                  <a target="_blank" href={document} rel="noopener noreferrer">
                    <Button bordered color="primary" auto>
                      Ver documento
                    </Button>
                  </a>
                </>
              ) : (
                <>
                  <br />
                  <Button bordered color="primary" auto disabled>
                    No hay documento
                  </Button>
                </>
              )}
            </Text>
            <div className={styles.value}>
              <Text weight="bold">
                <span className={styles.valueTitle}>Value:</span>
              </Text>
              <Text color="error">{pesoLocale.format(value)}</Text>
            </div>
          </Card.Body>
          <Card.Divider />
          <Card.Footer>
            <Row justify="flex-end">
              <div className={styles.btnDelete}>
                <Button
                  bordered
                  color="error"
                  auto
                  onPress={() => setDeletePage(true)}
                  className={styles.hoverDelete}
                >
                  Eliminar
                </Button>
              </div>
              <Button
                bordered
                color="success"
                auto
                onPress={() => setVisible(true)}
                className={styles.hoverEdit}
              >
                Editar
              </Button>
            </Row>
          </Card.Footer>
        </Card>
      </Grid>
      <ModalInfo
        visible={visible}
        setVisible={setVisible}
        title={"Editar la página"}
      >
        <Edit
          idPage={idPage}
          url={url}
          title={title}
          value={value}
          document={document}
          idCategory={idCategory}
          setVisible={setVisible}
        />
      </ModalInfo>
      <ModalInfo
        visible={deletePage}
        setVisible={setDeletePage}
        title={"¿Desea eliminarla?"}
      >
        <DeletePage idPage={idPage} setVisible={setDeletePage} />
      </ModalInfo>
    </Grid.Container>
  );
};

export default CardPage;
