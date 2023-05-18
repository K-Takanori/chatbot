import React, { useState, useEffect } from "react";
import "./App.css";
import { Avatar, Col, Input, Row } from 'antd';
import { Typography, Layout, Button } from 'antd';
import axios from "axios";
const { Title } = Typography;
const { Header, Content, Footer } = Layout;

function App() {
  const [chats, setChats] = useState([])
  const [res, setRes] = useState([])
  const [text, setText] = useState("")
  const [alldata, setAlldata] = useState([])

  const changeText = (e) => {
    setText(e.target.value)
  }

  const apiRequest = () =>{
    axios
    .get(process.env.REACT_APP_API_SERVER+text)             //リクエストを飛ばすpath
    .then(response => {
      const newres = [...res]
      newres.push(response.data["response"])
      setRes(newres)  
    })                               //成功した場合、postsを更新する（then）
    .catch(() => {
        console.log('通信に失敗しました');
    });
  }

  const inputData = () => {
    const newChats = [...chats]
    newChats.push(text)
    setChats(newChats)
    apiRequest()
  }

  useEffect(() => {
    const len = chats.length + res.length
    const tmpdata = []
    for (let i = 0; i < Math.round(len / 2); i++){
      tmpdata.push(chats[i])
      if(!(i * 2 > len)){
        tmpdata.push(res[i])
      }
    }
    setAlldata(tmpdata)
  },[chats,res]);

  console.log(process.env.REACT_APP_API_SERVER)
  return (
  <Layout className="App">
    <Header>
      <Title style={{color:"white"}}>Chat Bot</Title>
    </Header>
    <Content style={{padding: 24,minHeight: 800,}}>
      <Row>
        <Col flex="auto">
          <Input placeholder='聞きたいことを入力してください' onChange={(e) => changeText(e)} />
        </Col>
        <Col flex="none">
          <Button type="primary" onClick={inputData}>送信</Button>
        </Col>      
      </Row>
      {alldata.map((value, i) => i % 2 == 0 ? <Row key={i}><Col span={10} offset={14} style={{overflowWrap:"breakWord"}}>{value}</Col></Row> : <Row key={i}><Col span={10} style={{overflowWrap:"breakWord"}}>{value}</Col></Row>)}
    </Content>
  </Layout>
  );
}
export default App;