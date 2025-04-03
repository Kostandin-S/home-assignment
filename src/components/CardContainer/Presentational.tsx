import React from 'react'
import styles from './styles.module.scss';
import { Card } from "@chakra-ui/react"

interface Props {
  children: React.ReactNode;
  title: React.ReactNode;
  childStyles?: string;
}

const CardContainer: React.FC<Props> = ({ children, title, childStyles }) => {

  return (
    <Card.Root className={`${styles.container} ${childStyles}`}>
      <Card.Title ml="7" mt="2">{title}</Card.Title>
      <Card.Body>
        {children}
      </Card.Body>
    </Card.Root>
  )
}

export default CardContainer
