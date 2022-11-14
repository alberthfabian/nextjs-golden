// Libs
import { Text } from "@nextui-org/react";

// Style
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Text b color="inherit" hideIn="xs">
        &copy; Papeleria Golden
      </Text>
    </div>
  );
};

export default Footer;
