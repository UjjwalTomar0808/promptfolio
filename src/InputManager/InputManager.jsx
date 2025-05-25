import { useState, useRef } from 'react'
import commands from '../commands/commands'
import { github_username } from '../config'
import styles from './InputManager.module.scss'

function InputManager({ handleExecute }) {
  const [value, setValue] = useState('')
  const [suggestedValue, setSuggestedValue] = useState('')
  const inputRef = useRef(null)

  const updateInputField = (val = '') => {
    if (inputRef.current) {
      inputRef.current.value = val
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleExecute(value)
    setValue('')
    setSuggestedValue('')
    updateInputField('')
  }

  const handleKeyDown = (event) => {
    if (
      (event.key === 'Tab' || event.key === 'ArrowRight') &&
      suggestedValue
    ) {
      event.preventDefault()
      const newValue = value + suggestedValue.trim()
      setValue(newValue)
      setSuggestedValue('')
      updateInputField(newValue)
    }
  }

  const handleInput = (event) => {
    const inputVal = event.target.value
    const trimmedVal = inputVal.trimStart().toLowerCase()

    let suggestion = ''
    if (trimmedVal) {
      for (const cmd of commands.values()) {
        if (cmd.name.startsWith(trimmedVal)) {
          suggestion =
            ' '.repeat(inputVal.length) + cmd.name.substring(trimmedVal.length)
          break
        }
      }
    }

    setValue(trimmedVal)
    setSuggestedValue(suggestion)
  }

  return (
    <div className={styles.inputWrapper}>
      <span className={styles.promptPrefix}>
        <span>{github_username}</span>@<span>promptfolio:</span>~$&nbsp;
      </span>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <span className={styles.suggested}>{suggestedValue}</span>
        <input
          className={`${styles.input} ${
            commands.has(value.trim()) ? styles.validCommand : ''
          }`}
          spellCheck={false}
          placeholder="confused? type help and hit enter to get started!"
          ref={inputRef}
          autoFocus
          onKeyDown={handleKeyDown}
          onInput={handleInput}
        />
      </form>
    </div>
  )
}

export default InputManager
