import { useState, useEffect } from 'react';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import Button from 'react-bootstrap/Button';
import DspTable from '../components/DatatableList.jsx'
import {Checkbox, Input, Combobox} from '../components/MyComponents.jsx'
import Modal from '../components/Modal.jsx';
import $ from 'jquery';

function Addons() {
  //const host = "http://192.168.254.193:5000/";
  const host = window.location.protocol+"//"+window.location.host+"/";
  const access_key = "booking-app-20080104";
  let api = "get_products/";

  const [formAct, setModalAct] = useState(false);
  let [item_id, setItemId] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalAct('add');
    setIsModalOpen(true);
  }
  const handleOpenModalUpdate = (id) => {
    setItemId(id)
    setModalAct('update');
    setIsModalOpen(true);
  }
  const handleCloseModal = () => setIsModalOpen(false);
  let formData = {}

  const UpdateRecord = async (e) => {
    //e.preventDefault();

    try {
      const response = await fetch(host+'mod_products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      window.location.reload(true);
    } catch (error) {
      console.error('Error:', error);
    }

    handleCloseModal();
  };

  const create_new_items = () => {
    if(formAct == "add"){
      formData = {'key':access_key, 'action':formAct, 
        'data':{
          'title':$('#title').val(), 
          'description':$('#description').val(), 
          'price':$('#price').val(), 
          'category':($('#category').val()).trim(),
          'status':($('#status').val()).trim(),
        }
      }
    }
    else if(formAct == "update"){
      formData = {'key':access_key, 'action':formAct, 
        'data':{
          'id':Number($('#modal_save').attr('ind')), 
          'title':$('#title').val(), 
          'description':$('#description').val(), 
          'price':$('#price').val(), 
          'category':($('#category').val()).trim(),
          'status':($('#status').val()).trim(),
        }
      }
    }
    UpdateRecord();
  };

  const delete_selected_items = () => {
    const elements = $('.one-item'); 
    for(let i=0; i<elements.length; i++){
      if(elements[i].checked){
        console.log(elements[i].id);
        formData = {'key':access_key, 'action':'delete', 
          'data':{
            'id':elements[i].id
          }
        }
        UpdateRecord();
      }
    }
  };
  
  useEffect(() => {
    setItemId('');
  }, []);

  const columns = [
    {
      name: <Checkbox sel={'all-item'} id={'all-item'} stat={false}/>,
      selector: row => <Checkbox sel={'one-item'} id={row.id} stat={false}/>,
      sortable: false,
      width: '5%',
    },
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
      width: '30%',
    },
    {
      name: 'Description',
      selector: row => row.description,
      sortable: true,
      width: '50%',
    },
    {
      name: 'Price',
      selector: row => row.price,
      sortable: true,
      width: '15%',
    },
  ];

  return (
    <div className='page-content'>
      <div className='page-header'>
        Manage Addons
      </div>
      <div className='page-body'>
        <DspTable col_field={columns} data_src={host+api+"addons"} modal={handleOpenModalUpdate}/>
      </div>
      <div className="footer">
        <Button className="m-0" variant="primary" onClick={handleOpenModal}>Add</Button>
        <Button className="m-2" variant="danger" onClick={delete_selected_items}>Delete</Button>
      </div>
      <Modal item_id={item_id} modal_name="addons"  api={api} show={isModalOpen} onClose={handleCloseModal} formAct={formAct}>
        <Input lbl={'Title'} id={'title'} typ={'text'} plc_hold={'Product Name'}/>
        <Input lbl={'Description'} id={'description'} typ={'text'} plc_hold={'Product Description'}/>
        <Input lbl={'Price'} id={'price'} typ={'text'} plc_hold={'Price'}/>
        <Combobox lbl={'Category'} id={'category'} data={['Addons']}/>
        <Combobox lbl={'Status'} id={'status'} data={['Active', 'Inactive', 'Deleted']}/>
        <Button id="modal_save" variant="success" className="modal-button float-end" onClick={create_new_items}>Save</Button>
      </Modal>
    </div>
  );
}

export default Addons