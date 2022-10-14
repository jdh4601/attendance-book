import React from 'react';

const Students = ({ name, dispatch, id, pretend }) => {
  return (
    <div>
      <span
        style={{
          textDecoration: pretend ? 'line-through' : 'none',
          color: pretend ? 'gray' : 'black',
          cursor: 'pointer',
        }}
        onClick={() => {
          dispatch({ type: 'mark-student', payload: { id } });
        }}
      >
        이름: {name}
      </span>
      <button
        onClick={dispatch({
          type: 'delete-student',
          payload: { id },
          pretend: { pretend },
        })}
      >
        삭제하기
      </button>
    </div>
  );
};

export default Students;
