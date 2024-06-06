import React from 'react';
import TaskItem from '../TaskItem';

const TaskList = ({filteredTasks, onToggle, onDelete}) => {
  // Render TaskItems using TaskItem component
  // Filter tasks by status here
  return (
    <ul>
        {filteredTasks.map(task => (<TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete}/>))}
    </ul>
  );
};

export default TaskList;
