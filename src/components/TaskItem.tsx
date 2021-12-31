import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View, Text, StyleSheet, FlatListProps, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/trash/trash.png'
import { EditTaskArgs } from '../pages/Home';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({taskId, taskNewTitle}: EditTaskArgs) => void;
}

export function TaskItem({ task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
  const [editing, setEditing] = useState(false)
  const [taskEdited, setTaskEdited]= useState(task.title)
  const textInputRef = useRef<TextInput>(null)


  function handleStartEditing(){
    setEditing(true)
  }

  function handleCancelEditing(){
    setTaskEdited(task.title)
    setEditing(false)
  }

  function handleSubmitEditing(){
    editTask({taskId: task.id, taskNewTitle: taskEdited})
    setEditing(false)
  }
  

  useEffect(() => {
    if (textInputRef.current) {
      if (editing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editing])

  return (
    <View style={styles.container}>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.taskButton}
            onPress={() => toggleTaskDone(task.id)}
          >
            <View 

              style={task.done ? styles.taskMarkerDone : styles.taskMarker}
            >
              { task.done && (
                <Icon 
                  name="check"
                  size={12}
                  color="#FFF"
                />
              )}
            </View>

            {/* <Text 
              style={task.done ? styles.taskTextDone : styles.taskText}
            >
              {task.title}
            </Text> */}
            <TextInput 
              value={taskEdited} 
              onChangeText={setTaskEdited} 
              editable={editing}
              style={task.done ? styles.taskTextDone : styles.taskText}
              onSubmitEditing={handleSubmitEditing}
              ref={textInputRef}
            />
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity              style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity> */}
      <View style={ styles.iconsContainer } >
        { editing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            <Icon name="edit-3" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) }

        <View 
          style={ styles.iconsDivider }
        />

        <TouchableOpacity
          disabled={editing}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{ opacity: editing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    flex:1
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 24,
  },
  iconsDivider:{
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal:12,
  }
})