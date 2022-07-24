import { useEffect, useState } from 'react'
import { InputTask } from '../InputTask/InputTask'
import styles from './style.module.css'

import clipBoardIcon from '/clip-board-icon.svg'
import trash from '/trash.svg'
import check from '/check.svg'
import noCheck from '/no-check.svg'

interface TaskProps {
  id: number;
  title: string;
  isCompleted: boolean;
}

export function Tasks() {
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [tasksConclued, setTasksConclued] = useState(0)

  useEffect(() => {
    const numberTasksConclued = tasks.filter(task => task.isCompleted).length

    setTasksConclued(numberTasksConclued)
  }, [tasks])

  console.log('tasksConclued', tasksConclued);
  

  function handleNewTask(task: string) {
    setTasks([
      ...tasks, 
      {id: Math.random(), title: task, isCompleted: false}
    ])
  }

  function handleCheckCompletedTask(id: number) {
    setTasks(
      tasks.map(task => {
        return (
          task.id === id ? {
          ...task,
          isCompleted: !task.isCompleted
          } : task
        )
      })
    )
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <>
      <InputTask handleNewTask={handleNewTask} />
      <div className={styles.container}>
        <header>
          <p className={styles['tasks-created']}>
            Tarefas criadas 
            <span>{tasks.length}</span>
          </p>
            {tasksConclued > 0 ? (
              <p className={styles['tasks-conclued']}>
                Concluídas 
                <span>{tasksConclued}</span> de <span>{tasks.length}</span>
              </p>

            ) : (
              <p className={styles['tasks-conclued']}>
                Concluídas 
                <span>0</span>
              </p>
            )}
        </header>
        <main className={`${styles.tasks} ${tasks.length ? styles['no-border'] : ''}`}>
          {!tasks.length ? (
            <div className={styles['board-empty']}> 
              <img src={clipBoardIcon} alt="Ícone de um caderno de anotações" />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          ) : (
           <>
            {tasks.map(task => {
              return (
                <div className={styles['task-item']} key={task.id}> 
                  <div className={styles.checkbox}>
                    <label htmlFor={`task-${task.id}`}>
                      <img src={`${task.isCompleted ? check : noCheck}`} alt="" />
                    </label>
                    <input id={`task-${task.id}`} type="checkbox" checked={task.isCompleted} onChange={() => handleCheckCompletedTask(task.id)} />
                  </div>
                  <p className={`${task.isCompleted ? styles['task-item-concluded'] : ''}`}>{task.title}</p>
                  <button type='button' onClick={() => handleRemoveTask(task.id)}>
                   <img src={trash} alt="Icone de lixeira" />
                  </button>
                </div>
              )
            })}
           </>
          )}
        </main>
      </div>
    </>
  )
}