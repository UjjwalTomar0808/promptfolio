import React from 'react'
import styles from './commands.module.scss'
import { links, info, projectData } from '../config'
import ListElement from '../ListElement/ListElement'

const rawCommands = [
  {
    name: 'help',
    icon: 'fas fa-fw fa-question-circle',
    description: 'List down all available commands',
    execute({ commands }) {
      return (
        <>
          Available commands:
          {[...commands.values()].map(({ icon, name, description }, key) => (
            <ListElement
              key={key}
              icon={icon}
              name={name}
              description={description}
              help
            />
          ))}
        </>
      )
    },
  },
  {
    name: 'info',
    icon: 'fas fa-fw fa-info-circle',
    description: 'Show information about me',
    execute() {
      return (
        <div className={styles.infoWrapper}>
          <div className={styles.infoInner}>
            <img
              src="https://avatars.githubusercontent.com/u/123977834?v=4"
              className={styles.avatar}
              alt="GitHub avatar"
            />
            <div className={styles.content}>
              <div className={styles.header}>
                <strong>Ujjwal Tomar</strong>{' '}
                <span className="muted">@UjjwalTomar0808</span>
              </div>
              <em className={styles.bio}>
                "...👋 Hi, I'm Ujjwal Tomar! 🎓 B.Tech CSE student at KIET"
              </em>
              <div className={styles.info}>{info}</div>
            </div>
          </div>

          <div className={styles.icons}>
            <i className="fab fa-fw fa-react"></i>
            <i className="fab fa-fw fa-sass"></i>
            <i className="fab fa-fw fa-js-square"></i>
            <i className="fab fa-fw fa-node-js"></i>
            <i className="fab fa-fw fa-python"></i>
            <i className="fab fa-fw fa-java"></i>
          </div>
        </div>
      )
    },
  },
  {
    name: 'projects',
    icon: 'fas fa-fw fa-tools',
    description: 'Display a list of my major projects',
    execute() {
      return (
        <>
          {projectData.map(({ name, html_url, description }, key) => (
            <ListElement
              key={key}
              icon="fab fa-fw fa-github-alt"
              name={name}
              link={html_url}
              description={description}
            />
          ))}
        </>
      )
    },
  },
  {
    name: 'links',
    icon: 'fas fa-fw fa-link',
    description: 'Get all my important links and socials',
    execute() {
      return (
        <>
          {links.map(({ icon, name, link, description }, key) => (
            <ListElement
              key={key}
              icon={icon}
              name={name}
              link={link}
              description={description}
            />
          ))}
        </>
      )
    },
  },
  {
    name: 'clear',
    icon: 'fas fa-fw fa-eraser',
    description: 'Clear terminal screen',
    execute({ setRecord }) {
      setRecord([])
      return null
    },
  },
]

// Create a command map like before
const commands = new Map(rawCommands.map((cmd) => [cmd.name, cmd]))

export default commands
