import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTaskArgs {
  taskId: number,
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(tasks.find(task => task.title === newTaskTitle)){
      Alert.alert(
        'Não é possivel cadastrar com mesmo nome',
        '', // <- this part is optional, you can pass an empty string
        [
          {
            text: "Ok",
            style: "cancel",
          },
          
        ],
        {cancelable: true},
      )
      return
    }
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks(oldState => [...oldState, data]);

    
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
   const tasksList = tasks?.map((item: Task) => {
      if (item.id === id) {
        return ({
          ...item,
          done: !item?.done
        })
      }
    });

    setTasks(tasksList as Task[]);
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs) {
   const editTasks = tasks.map(task => ({...task}))

   const findTaskForEdit = editTasks.find(task => task.id === taskId)

   if(!findTaskForEdit){
     return
   }

   findTaskForEdit.title = taskNewTitle

   setTasks(editTasks)

  }


  function handleRemoveTask(id: number) {
      Alert.alert(
        'Remover item',
        'Tem certeza que você deseja remover esse item?', // <- this part is optional, you can pass an empty string
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {text: 'Remover', onPress: () => setTasks(oldState => oldState.filter(skill => skill.id !== id))},
        ],
        {cancelable: true},
      )
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTaks={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})