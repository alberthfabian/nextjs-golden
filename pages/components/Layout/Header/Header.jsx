import { Navbar, Button, Link, Text, Image } from "@nextui-org/react";

// Style
import styles from "./Header.module.css";

const Header = () => {
  const collapseItems = [
    "Features",
    "Customers",
    "Pricing",
    "Company",
    "Legal",
    "Team",
    "Help & Feedback",
    "Login",
    "Sign Up",
  ];
  return (
    <Navbar isBordered variant={"sticky"}>
      <Navbar.Brand>
        <Image
          width={30}
          height={30}
          alt="Golden"
          src="/img/golden.png"
          className={styles.logo}
        />
        <Text b color="inherit" hideIn="xs">
          Papeleria Golden
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Link color="inherit" href="#">
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat as={Link} href="#">
            Sign Up
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};

export default Header;
