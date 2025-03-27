import React from 'react'
import styles from './styles.module.scss';
import { Card } from 'antd';

interface Props {
  children: React.ReactNode;
  title: React.ReactNode;
  childStyles?: string;
}

const CardContainer: React.FC<Props> = ({ children, title, childStyles }) => {

  return (
    <Card title={title} className={`${styles.container} ${childStyles}`}>
      {children}
    </Card>
  )
}

export default CardContainer
