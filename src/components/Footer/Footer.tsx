import { Text } from "@chakra-ui/react"
import styles from "./Footer.module.css"
function Footer() {
    const {footer} = styles;
  return (
    <footer className={footer}>
        <Text>ניצן כהן</Text>
    </footer>
  )
}

export default Footer