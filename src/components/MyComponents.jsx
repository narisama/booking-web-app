import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import $ from 'jquery';
import { FormLabel } from 'react-bootstrap';

export function Checkbox({ sel, id, stat }) {
    const [chk_stat, setStatus] = useState(stat);

    const change_status = () => {
        const elements = $('.all-item'); 
        if(sel == "all-item"){
            setStatus(elements[0].checked);
            $('.one-item').prop('checked', !chk_stat);
        }
        else{
            if(chk_stat)
                setStatus(false);
            else
                setStatus(true);
        }
    };

    return (
        <input className={sel} type='checkbox' id={id} name='choices' value='' checked={chk_stat} onChange={change_status}/>
    );
}

export function Input({lbl, id, typ, plc_hold}) {
    return (
        <Form className='d-flex inline'>
            <label className=''>{lbl}</label>
            <input className='input-box form-control mb-3' id={id} type={typ} placeholder={plc_hold}/>
        </Form>
    );
}

export function Combobox({lbl, id, data}) {
    return (
        <Form className='d-flex inline'>
            <label className='input-lbl'>{lbl}</label>
            <select className='input-box form-control mb-3' id={id}>
                {
                    data.map((val) => (
                        <option key={val}>{val}</option>
                    ))
                }
            </select>
        </Form>
    );
}

export function ComboboxList({cont, lbl, id, data}) {
    
    let [selected, setSelected] = useState(0);

    const handleSelection = (e) => {
        if(e.target.checked){
            selected += 1;
            cont[e.target.name] = 1;
        }
        else{
            selected -= 1;
            cont[e.target.name] = 0;
        }

        setSelected(selected);
    }

    return (
        <div className='form-input'>
            <Dropdown>
                <label className='input-lbl'>{lbl}</label>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Selected ({selected})
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {data.map(item => (
                        <Form.Check name={item.id} className="m-2" type={'checkbox'} checked={cont[item.id]==1 ? true:false} key={item.id} label={item.title} onChange={handleSelection}/>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}