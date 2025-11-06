import { useState, useEffect } from 'react';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import Button from 'react-bootstrap/Button';
import DspTable from '../components/DatatableList.jsx'
import {Checkbox, Input, Combobox} from '../components/MyComponents.jsx'
import Modal from '../components/Modal.jsx';
import $ from 'jquery';

function Billings() {
  //const host = "http://192.168.254.193:5000/";
  const host = window.location.protocol+"//"+window.location.host+"/";
  const access_key = "booking-app-20080104";
  let api = "get_billings/";

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
      const response = await fetch(host+'mod_billings', {
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
    formData = {'key':access_key, 'action':'update', 
      'data':{
        'id':Number($('#modal_save').attr('ind')), 
        'client':$('#receiver').val(),
        'paid_amount':$('#paid_amount').val(), 
        'payment_mode':($('#payment_mode').val()).trim(),
        'ref_no':$('#ref_no').val(), 
        'paid_date':$('#paid_date').val(), 
        'billing_status':($('#status').val()).trim(),
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
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '15%',
    },
    {
      name: 'Booking ID',
      selector: row => row.booking_id,
      sortable: true,
      width: '20%',
    },
    {
      name: 'Client',
      selector: row => row.client,
      sortable: true,
      width: '30%',
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      width: '15%',
    },
    {
      name: 'Issued Date',
      selector: row => row.issued_date,
      sortable: true,
      width: '15%',
    },
  ];

  return (
    <div className='page-content'>
      <div className='page-header'>
        Manage Billings
      </div>
      <div className='page-body'>
        <DspTable col_field={columns} data_src={host+api+'all'} modal={handleOpenModalUpdate}/>
      </div>
      <div className="footer">
        <Button className="m-2" variant="danger" onClick={delete_selected_items}>Delete</Button>
      </div>
      <Modal item_id={item_id} modal_name="billings"  api={api} show={isModalOpen} onClose={handleCloseModal} formAct={formAct}>
        <Input lbl={'Booking ID'} id={'booking_id'} typ={'text'} plc_hold={'Product Name'}/>
        <Input lbl={'Amount Due'} id={'amount_due'} typ={'text'} plc_hold={'Amount'}/>
        <Combobox lbl={'Status'} id={'status'} data={['Unpaid', 'Paid']}/>
        <Input lbl={'Paid By'} id={'receiver'} typ={'text'} plc_hold={'Received & Paid By'}/>
        <Input lbl={'Paid Amount'} id={'paid_amount'} typ={'text'} plc_hold={'Amount'}/>
        <Combobox lbl={'Mode'} id={'payment_mode'} data={['Cash', 'GCash', 'Maya']}/>
        <Input lbl={'Ref No.'} id={'ref_no'} typ={'text'} plc_hold={'Referrence Number'}/>
        <Input lbl={'Paid Date'} id={'paid_date'} typ={'date'} plc_hold={'Payment Date'}/>
        <Button id="modal_save" variant="success" className="modal-button float-end" onClick={create_new_items}>Save</Button>
        <Button id="modal_save" variant="primary" className="modal-button float-end">Print Billing</Button>
      </Modal>
    </div>
  );
}

export default Billings