import React from 'react'
import styles from './ListElement.module.scss'

const ListElement = ({ icon, name, link, description, help }) => {
  return (
    <div className={styles.listElement}>
      <i className={icon}></i>{' '}
      <strong className={help ? styles.alt : ''}>
        {link ? (
          <a href={link} target="_blank" rel="noreferrer">
            {name}
          </a>
        ) : (
          <>{name}</>
        )}
      </strong>{' '}
      <em>{description}</em>
    </div>
  )
}

export default ListElement
