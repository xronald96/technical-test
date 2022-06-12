import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Body = styled.div`
  position:absolute;
  width:100%;
  height:100%;
  display:flex;
  flex-direction: column;
`;
const Headers = styled.div`
  margin: 12px 12px 0px 12px;
  display: flex;
  border: 1px solid black;
  border-right: 0px;
  height: 5%;
`;
const Header = styled.div`
  width: 47%;
  align-items: center;
  padding: 12px;
  display: flex;
  font-weight:bold;
  border-right: 1px solid black;
`;
const Button = styled.button`
  margin: 12px 12px 0px 12px;
  display: flex;
  height: 30px;
  width: 50px;
  justify-content: center;
  align-items: center;
`;
const AddItem = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  *{
    margin-right: 12px;
  }
`;

const Input = styled.input`
  margin: 12px 12px 0px 12px;
  height: 40px;
`;
const Row = styled.div`
  margin: 0px 12px 0px 12px;
  display: flex;
  border: 1px solid black;
  border-top: 0px !important;

  border-right: 0px !important;
  
`;
const TableCell = styled.div`
  width: 47%;
  align-items: center;
  padding: 12px;
  display: flex;
  border-right: 1px solid black;
`;

const url = 'http://localhost:4000'
function App() {
  const [ mode, setMode ] = useState<any>({
    name:'',
    index:-1,
    newValue:''
  })
  const [ data , setData ] = useState<Array<{code:string, name:string}>>([])
  const [ newItem , setNewItem] = useState<{name:string, code:string}>({code:'', name:''})
  const [ error, setError ] = useState<string>('');
  useEffect(()=>{
    getData()
  }, [])
  const getData = async (text:string = '') => {
    let fullUrl = `${url}${text ? "?" + new URLSearchParams({name:text}) : ''}`;
    const result: any = await fetch(fullUrl).then(response =>response.json())
    if(result.status==="ok")
      setData(result.result)
  }
  const handleInput = (e: any) => {
    const {name, value} = e.target
    setNewItem({...newItem, [name]:value})
  }

  const updateItem = async() => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: data[mode.index].code, name: mode.newValue})
    };
    const result = await fetch(url, requestOptions)
    
    .then(response => response.json())
    if(result.status==="ok"){
      setError('')
      const updateData = [...data];
      updateData[mode.index] = result.result;
      setData(updateData)
      setMode(
        {
          name:'',
          index:-1,
          newValue:''
        }
      )
    }
    else
      setError(result.message)
  }

  const addItem = async() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    };
    const result = await fetch(url, requestOptions)
    .then(response => response.json())
    if(result.status==="ok"){
      setError('')
      const updateData = [...data];
      updateData.unshift(result.result);
      setNewItem({name:'', code:''})
      setData(updateData)
    }
    else
      setError(result.message)
  }

  const deleteItem = async(code:string) => {
    const result = await fetch(`${url}/${code}`, {method:'DELETE'}).then(response => response.json())
    if(result.status==="ok"){
      setError('')
      const resultFilter = data.filter(it=>it.code!==code);
      setData(resultFilter);
    }
    else
      setError(result.message)
    
  }
  return (
    <Body>
      <AddItem>
        <Input value={newItem.code} placeholder='Code' name="code" onChange={handleInput}/>
        <Input value={newItem.name} placeholder='Name' name="name" onChange={handleInput}/>
        <Button onClick={addItem} disabled={!newItem.code || !newItem.name}>Add</Button>
        {error && <div style={{display:'flex', alignItems:'center', color:'red'}}>{error}</div>}
        <Input onChange={e => getData(e.target.value)} placeholder='search' style={{position:"absolute", right:0}}/>
      </AddItem>
      
      <Headers>
        <Header>
          Code
        </Header>
        <Header>
          Name
        </Header>
        <Header style={{width:"10%"}}>
          Actions
        </Header>
      </Headers>
      
        {data && data.map((it, i)=>{
          return <>
          <Row key={it.code+i}>
            <TableCell>{it.code}</TableCell>
            { mode !== "edit" && i!==mode.index ? <TableCell>{it.name}</TableCell> : 
            <TableCell>
              <Input onChange={(e)=>setMode({...mode, newValue:e.target.value})} value={mode.newValue}/>
              </TableCell>
            }
            <TableCell style={{width:"10%"}}>
            {
              mode !== "edit" && i!==mode.index ? 
                <Button onClick={()=>setMode({name:'edit', index:i, newValue:it.name})}>Edit</Button>
              :
                <Button onClick={updateItem}>Save</Button>
            }
            <Button onClick={()=>deleteItem(it.code)}>Delete</Button>
            </TableCell> 
            </Row>
          </>
        })}
    </Body>
  );
}

export default App;
