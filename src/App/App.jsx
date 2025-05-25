import { useEffect, useRef, useState } from 'react'
import styles from './App.module.scss'
import commands from '../commands/commands'
import { github_username } from '../config'
import InputManager from '../InputManager/InputManager'

function App() {
  const [record, setRecord] = useState([])
  const [userData, setUserData] = useState(null)
  const [userDataLoaded, setUserDataLoaded] = useState(false)

  const mainRef = useRef(null)

  const handleExecute = (arg) => {
    const commandName = arg.trim()
    let output

    if (!commandName) {
      output = <></>
    } else if (!commands.has(commandName)) {
      output = <>promptfolio: command not found: {commandName}</>
    } else {
      output = commands.get(commandName)?.execute({
        setRecord,
        commands,
      })
    }

    if (output !== null) {
      setRecord((prevRecord) => [
        ...prevRecord,
        { command: commandName, output },
      ])
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch(`https://api.github.com/users/${github_username}`)
      const data = await res.json()
      setUserData(data)
      setUserDataLoaded(true)
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: mainRef.current.scrollHeight,
        left: 0,
        behavior: 'smooth',
      })
    }
  }, [record])

  return (
    <div className={styles.wrapper}>
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <div className={styles.dotHolder}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
          <div className={styles.titleHeader}>
            <i className="fa-fw fas fa-code"></i> Promptfolio
          </div>
        </div>
        <div ref={mainRef} className={styles.mainContent}>
          {record.map(({ command, output }, index) => (
            <div key={index}>
              <span className={styles.promptPrefix}>
                <span>{github_username}</span>@<span>promptfolio:</span>~${' '}
                <span
                  className={
                    commands.has(command)
                      ? styles.validCommand
                      : styles.invalidCommand
                  }
                >
                  {command}
                </span>
              </span>
              <div>{output}</div>
            </div>
          ))}
          <InputManager handleExecute={handleExecute} />
        </div>
      </div>
    </div>
  )
}

export default App
