import { Button, Typography } from 'antd';
import styles from './styles.module.scss';

const Header = () => {
  const { Title, Text } = Typography;
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <Title className={styles.text} level={3}>EVINCED</Title>
        <Text className={styles.text} >Production Monitoring DEV</Text>
      </div>
      <Button>Log out</Button>
    </div>
  )
};

export default Header;
