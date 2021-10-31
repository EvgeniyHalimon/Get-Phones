import React, {useState} from 'react';
import { ListGroup } from 'react-bootstrap'
import shortid from 'shortid';
import axios from 'axios';

function ListItem({brand, name, id}){
    const [isShow, setIsShow] = useState(false)
    const [phoneSpecif, setPhoneSpecif] = useState(null)

    const printSpec = async(id) => {
        if(!phoneSpecif){
            const result = await axios(`https://api-mobilespecs.azharimm.site/v2/${id}`)
            setPhoneSpecif(result.data.data.specifications)
            console.log(result.data.data.specifications)
        }
        setIsShow(!isShow)
    }

    return (
        <ListGroup.Item key={shortid.generate()} id={id} 
            onClick={() => printSpec(id)}
        >
            {brand} {name}
            { isShow && 
            <ListGroup>
                {phoneSpecif.map((specif) => (
                    <ListGroup.Item key={shortid.generate()}>
                        {specif.title}
                    </ListGroup.Item>
                ))}
            </ListGroup>}
        </ListGroup.Item>
    )
}

export default ListItem