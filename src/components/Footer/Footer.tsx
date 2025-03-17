import { Text } from "@chakra-ui/react";
import styles from "./Footer.module.css";
function Footer() {
  const { footer } = styles;
  return (
    <footer className={footer}>
      <Text fontSize={"smaller"} color={"#B4D4FF"}>
        פיתוח האתר ע"י ניצן כהן
      </Text>
    </footer>
  );
}

export default Footer;
