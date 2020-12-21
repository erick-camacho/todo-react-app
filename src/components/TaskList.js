import React from 'react';
import { List, Text } from '@chakra-ui/react'
import TaskItem from './TaskItem';

const TaskList = ({ tasks, getTasks, startEdit }) => {
  return (
    <List boxShadow="lg">
      {tasks ? tasks.map(task => {
        return <TaskItem task={task} getTasks={getTasks} startEdit={startEdit} key={task.id} />
      }) : <Text>No pending tasks</Text>}
    </List>
  )
}

export default TaskList;
