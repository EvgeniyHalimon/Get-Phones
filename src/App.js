import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import { ListGroup, Button,InputGroup, FormControl } from 'react-bootstrap'
import shortid from 'shortid';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import ListItem from './Components/ListItem';


function App() {
  const [phones, setPhones] = useState([])
  const [search, setSearch] = useState('Acer')
  const [url, setUrl] = useState(`http://api-mobilespecs.azharimm.site/v2/search?query=Acer`)
  
  const fetchData = async() => {
    if(!search) {
      return
    }
    const result = await axios(url)
    const data = result.data.data
    console.log(data)
    setPhones(data.phones)
  }


  useEffect(() => {
    fetchData()
  }, [url])

  return (
    <Fragment>
      <InputGroup className="mb-3">
        <FormControl
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Brand"
          aria-label="Brand"
          aria-describedby="basic-addon2"
        />
        <Button variant="info" 
          onClick={
            () => setUrl(`http://api-mobilespecs.azharimm.site/v2/search?query=${search}`
          )}
        >
          Search
        </Button>
      </InputGroup>
      <ListGroup>
        {phones.map(phone => 
          <ListItem key={shortid.generate()} brand={phone.brand} name={phone.phone_name} id={phone.slug}/>
        )}
      </ListGroup>
    </Fragment>
  );
}

export default App;
