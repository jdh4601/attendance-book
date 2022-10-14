import React, { useState, useReducer } from 'react';
import Students from './Students';

const reducer = (state, action) => {
  // switch 나 if 문을 사용함 (주로 switch문이 사용됨)
  switch (action.type) {
    case 'add-student':
      const name = action.payload.name;
      const newStudent = {
        id: Math.random(),
        name,
        pretend: false,
      };
      return {
        count: state.count + 1,
        students: [...state.students, newStudent],
      };
    case 'delete-student':
      return {
        count: state.count - 1,
        students: state.students.filter(
          student => student.id !== action.payload.id
        ),
      };
    case 'mark-student':
      return {
        count: state.count,
        students: state.students.map(student => {
          if (student.id === action.payload.id) {
            return { ...student, pretend: !student.pretend };
          }
          return state;
        }),
      };
    default:
      return state;
  }
};

// complicated states => reducer(initialState)
const initialState = {
  count: 0,
  students: [],
};

function App() {
  const [name, setName] = useState('');
  const [studentsInfo, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h1>출석부</h1>
      <p>학생수: {studentsInfo.count}</p>
      <input
        type="text"
        placeholder="input name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button
        onClick={() => {
          // dispatch(action)
          dispatch({ type: 'add-student', payload: { name } });
        }}
      >
        추가하기
      </button>
      {studentsInfo.students.map(student => (
        <Students
          key={student.id}
          name={student.name}
          dispatch={dispatch}
          id={student.id}
          pretend={student.pretend}
        />
      ))}
    </div>
  );
}

export default App;
