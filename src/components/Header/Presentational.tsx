import { Button, Text, Heading, Box } from '@chakra-ui/react';
import styles from './styles.module.scss'

const Header = () => {
  return (
    <nav aria-label="Main navigation">
      <Box className={styles.container}>
        <Box className={styles.textContainer}>
          <Heading className={styles.text} as="h3" size="lg">EVINCED</Heading>
          <Text className={styles.text}>Production Monitoring DEV</Text>
        </Box>
        <Button colorPalette="gray" variant="surface" aria-label="Log out" onClick={() => console.log("Logged out")}>Log out</Button>
      </Box>
    </nav>
  );
};

export default Header;
