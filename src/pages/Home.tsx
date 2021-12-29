import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
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