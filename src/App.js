/** @jsxImportSource @emotion/react */
import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import {css} from "@emotion/react";

const kanbanCardStyles = css`
  margin-bottom: 1rem;
  padding: 0.6rem 1rem;
  border: 1px solid gray;
  border-radius: 1rem;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.4);
  text-align: left;

  &:hover {
    box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2), inset 0 1px #fff;
  }
`
const cardTitleStyles = css`
  min-height: 3rem;

  & > input[type="text"] {
    width: 80%;
  }
`
// card 组件
const KanbanCard = ({title, status}) => (
    <li css={kanbanCardStyles}>
      <div css={cardTitleStyles}>{title}</div>
      <div css={css`
        text-align: right;
        font-size: 0.8rem;
        color: #333;
      `}>{status}</div>
    </li>
)

const KanbanNewCard = ({onSubmit}) => {
  const [title, setTitle] = useState('');
  const handleChange = (event) => {
    setTitle(event.target.value);
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSubmit(title);
      setTitle('')
    }
  }
  return (
      <li css={kanbanCardStyles}>
        <h3>添加新卡片</h3>
        <div css={cardTitleStyles}>
          <input type="text" value={title} onChange={handleChange} onKeyDown={handleKeyDown}/>
        </div>
      </li>
  )
}

const KanbanBoard = ({children}) => (
    <main css={css`
      flex: 10;
      display: flex;
      flex-direction: row;
      gap: 1rem;
      margin: 0 1rem 1rem;
    `}>{children}</main>
)

const bgColorStyles = {
  todo: '#C9AF97',
  ongoing: '#FFE799',
  done: '#C0E8BA'
}
const KanbanColumn = ({children, bgColor, title}) => {
  return (
      <section css={css`
        flex: 1 1;
        border: 1px solid gray;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        background-color: ${bgColor};

        & > h2 {
          margin: 0.6rem 1rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid gray;

          & > button {
            float: right;
            margin-top: 0.2rem;
            padding: 0.2rem 0.5rem;
            border: 0;
            border-radius: 1rem;
            height: 1.8rem;
            line-height: 1rem;
            font-size: 1rem;
          }
        }

        & > ul {
          flex: 1;
          flex-basis: 0;
          margin: 1rem;
          padding: 0;
          overflow: auto;
        }
      `}>
        <h2>{title}</h2>
        <ul>{children}</ul>
      </section>

  )
}


function App() {
  const [ongoingList, setOngoingLIst] = useState([
    {
      title: '开发任务-4', status: '22-05-22 18:15'
    }, {
      title: '开发任务-6', status: '22-05-22 18:15'
    }, {
      title: '测试任务-2', status: '22-05-22 18:15'
    }
  ]);
  const [doneList, setDoneList] = useState([
    {
      title: '开发任务-2', status: '22-05-22 18:15'
    }, {
      title: '测试任务-1', status: '22-05-22 18:15'
    }
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const handleAdd = (event) => {
    setShowAdd(true);
  }
  const [todoList, setTodoList] = useState([
    {
      title: '开发任务-1', status: '22-05-22 18:15'
    }, {
      title: '开发任务-3', status: '22-05-22 18:15'
    }, {
      title: '开发任务-5', status: '22-05-22 18:15'
    }, {
      title: '测试任务-3', status: '22-05-22 18:15'
    }
  ])
  const handleSubmit = (title) => {
    // setShowAdd(false);
    setTodoList([
      {title, status: new Date().toDateString()},
      ...todoList
    ])
  }

  return (
      <div className="App">
        <header className="App-header">
          <h1>我的看板</h1>
          <img src={logo} className="App-logo" alt="logo"/>
        </header>
        <KanbanBoard>

          <KanbanColumn bgColor={bgColorStyles.todo} title={
            <>
              <span>待处理</span>
              <button onClick={handleAdd} disabled={showAdd}>⊕ 添加新卡片</button>
            </>
          }>
            {showAdd && <KanbanNewCard onSubmit={handleSubmit}/>}
            {todoList.map((props, index) => <KanbanCard {...props} key={index}/>)}
          </KanbanColumn>

          <KanbanColumn bgColor={bgColorStyles.ongoing} title='进行中'>
            {ongoingList.map((item, index) => <KanbanCard {...item} key={index}/>)}
          </KanbanColumn>

          <KanbanColumn bgColor={bgColorStyles.done} title="已完成">
            {doneList.map((item, index) => <KanbanCard {...item} key={index}/>)}
          </KanbanColumn>

        </KanbanBoard>
      </div>
  );
}

export default App;
