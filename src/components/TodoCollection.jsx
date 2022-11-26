import TodoItem from './TodoItem';

const TodoCollection = ({
  todos,
  onToggleDone,
  onSave,
  onDelete,
  onChangeMode,
}) => {
  return (
    <div>
      TodoCollection
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleDone={(id) => {
            onToggleDone(id);
          }}
          onDelete={(id) => {
            onDelete(id);
          }}
          onChangeMode={({ id, isEdit }) => onChangeMode({ id, isEdit })}
          onSave={({ id, title }) => onSave({ id, title })}
        />
      ))}
    </div>
  );
};

export default TodoCollection;
