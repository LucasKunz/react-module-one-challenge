import styles from './style.module.css'
import plus from '/plus.svg'
import { ChangeEvent, useState } from 'react'

interface InputProps {
  handleNewTask: (task: string) => void;
}

export function InputTask ({ handleNewTask }: InputProps) {
  const [task, setTask] = useState('')

  function handleTextTask(event: ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value)
  }

  function handleCreateTask() {
    handleNewTask(task)

    setTask('')
  }

  return (
    <div className={styles.container}>
      <input 
        type="text" 
        className={styles['input-task']} 
        placeholder="Adicione uma nova tarefa"
        onChange={handleTextTask}
        value={task}
      />
      <button 
        type="button" 
        className={styles['button-create']}
        onClick={handleCreateTask}  
      >
        Criar
        <img src={plus} alt="Ícone com sinal de mais" />
      </button>
    </div>
  )
}