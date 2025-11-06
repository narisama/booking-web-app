import { useState, useEffect } from 'react';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import Button from 'react-bootstrap/Button';
import DspTable from '../components/DatatableList.jsx'
import {Checkbox, Input, Combobox, ComboboxList} from '../components/MyComponents.jsx'
import Modal from '../components/Modal.jsx';
import $ from 'jquery';

function Bookings({page}) {
  //const host = "http://192.168.254.193:5000/";
  const host = window.location.protocol+"//"+window.location.host+"/";
  const access_key = "booking-app-20080104";
  let api = "get_bookings/";
  
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
      const response = await fetch(host+'mod_bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      //const data = await response.json();
      window.location.reload(true);
    } catch (error) {
      console.error('Error:', error);
    }

    //handleCloseModal();
  };

  const create_new_items = () => {
    if(formAct == "add"){
      formData = {'key':access_key, 'action':formAct, 
        'data':{
          'client': $('#client').val(), 
          'contact': $('#contact').val(), 
          'email': $('#email').val(), 
          'address': $('#address').val(),
          'sched_date': $('#sched_date').val(),
          'sched_time': $('#sched_time').val(),
          'notes': $('#notes').val(),
        }
      }
    }
    else if(formAct == "update"){
      formData = {'key':access_key, 'action':formAct, 
        'data':{
          'id': Number(item_id), 
          'status': ($('#status').val()).trim(),
        }
      }
    }

    formData['data2'] = []
    for(let i=0; i<prodInd.length; i++){
      if(product_acquired[prodInd[i]['id']] == 1){
        formData['data2'].push(prodInd[i]['id'])
      }
    }
    //console.log(formData);
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

  let [servicesList, setServicesList] = useState([]);
  let [addonsList, setAddonsList] = useState([]);
  let [prodInd, setProdInd] = useState([]);
  useEffect(() => {
      async function fetchData() {
        const response = await fetch(host+'get_products/all');
        const json = await response.json();
        let tmp1 = []
        let tmp2 = []
        let tmp3 = []
        for(let i=0; i<json.length; i++){
          if(json[i]['prod_type'] == "Services"){
            tmp1.push(json[i]);
          }
          else{
            tmp2.push(json[i]);
          }
          tmp3.push(json[i]);
        }
        
        setServicesList(tmp1);
        setAddonsList(tmp2);
        setProdInd(tmp3);
      }

      setItemId('');
      setServicesList([]);
      setAddonsList([]);
      setProdInd([]);
      fetchData();
  }, []);

  const columns = [
    {
      name: <Checkbox sel={'all-item'} id={'all-item'} stat={false}/>,
      selector: row => <Checkbox sel={'one-item'} id={row.id} stat={false}/>,
      sortable: false,
      width: '5%',
    },
    {
      name: 'ID',
      selector: row => 'QHL'+row.id,
      sortable: true,
      width: '15%',
    },
    {
      name: 'Client',
      selector: row => row.client,
      sortable: true,
      width: '35%',
    },
    {
      name: 'Contact',
      selector: row => row.contact,
      sortable: true,
      width: '25%',
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      width: '20%',
    },
  ];

  let product_acquired = []

  return (
    <div className='page-content'>
      <div className='page-header'>
        Manage Bookings
      </div>
      <div className='page-body'>
        <DspTable col_field={columns} data_src={host+api+"all"} modal={handleOpenModalUpdate}/>
      </div>
      <div className="footer">
        <Button className="m-0" variant="primary" onClick={handleOpenModal}>Add</Button>
        <Button className="m-2" variant="danger" onClick={delete_selected_items}>Delete</Button>
      </div>
      <Modal item_id={item_id} modal_name={"bookings"} api={api+"/"} show={isModalOpen} onClose={handleCloseModal} formAct={formAct}>
        <Input lbl={'Client'} id={'client'} typ={'text'} plc_hold={'Client Full Name'}/>
        <Input lbl={'Contact'} id={'contact'} typ={'text'} plc_hold={'Contact Number'}/>
        <Input lbl={'Email'} id={'email'} typ={'text'} plc_hold={'Email Address'}/>
        <Input lbl={'Address'} id={'address'} typ={'text'} plc_hold={'Pickup Location'}/>
        <Input lbl={'Schedule Date'} id={'sched_date'} typ={'date'} plc_hold={'Pickup Date'}/>
        <Input lbl={'Schedule Time'} id={'sched_time'} typ={'text'} plc_hold={'Pickup Time'}/>
        <Input lbl={'Notes'} id={'notes'} typ={'text'} plc_hold={'Client Notes'}/>
        <Combobox lbl={'Status'} id={'status'} data={['Pending', 'Confirmed', 'Pickup', 'Processing', 'Delivery', 'Completed']}/>
        <ComboboxList cont={product_acquired} lbl={'Services'} id={'services'} data={servicesList}/>
        <ComboboxList cont={product_acquired} lbl={'Addons'} id={'addons'} data={addonsList}/>
        <Button id="modal_save" variant="success" className="modal-button float-end" onClick={create_new_items}>Save</Button>
      </Modal>
    </div>
  );
}

export default Bookings