import React from 'react';
import '../assets/css/FormaPago.css'
import ProductInfo from '../Components/Product-info';
import 'bootstrap/dist/css/bootstrap.min.css'
import Accordion from 'react-bootstrap/Accordion'
import {Card} from 'react-bootstrap';
import img from '../assets/img/card-credit.png'
import Efectivo from './Efectivo';
import Transferencia from './Transferencia';
import axios from 'axios';
import Credito from '../Components/Modal/Credito';
import Direcciones from '../Components/Modal/Direcciones'

let uri = '';
let destructured = [];

class FormaPago extends React.Component {

    constructor() {
        super();
        this.changeInfo = this.changeInfo.bind(this);
        this.state = {
            open: false,
            item: {},
            card_number: '',
            ccv: '',
            expiration_date: '',
            card_holder: '',
            card_type: '',
            payer_fullname: '',
            payer_email: '',
            payer_phone: '',
            payer_document_number: '',
            payer_document_type: '',
            cuotas: '',
            product_id: '',
            payer_addr1: '',
            payer_addr2: '',
            payer_city: '',
            payer_department: '',
            user_id: '',
            address_id: '',
            device_session_id: '',
            payer_emailError: '',
            boton: 'false',
            Enviar: '',
            product: {},
            address: {},
            show: false
        };
    }

    changeInfo(info) {
        this.setState(info);
    }

    assignRef = (ref) => this.childRef = ref;

    openmd() {
        this.childRef.onOpenModal();
    }

    async componentWillMount() {
        uri = window.location.href;
        destructured = uri.substr(uri.indexOf('#')).split('/');

        let response = await axios.get(`https://kieroapi.net/product/detail/${destructured[2]}`);
        await this.setState({...this.state, product: response.data});
    }

    valid() {
        if (!this.state.payer_email.includes('@')) {
            this.setState(
                {payer_emailError: 'invalid'}
            )
        }
        else {
            return true
        }
    }

    submitHandler = e => {

        e.preventDefault();
        e.target.className += ' was-validated';
        axios.post('https://kieroapi.net/cc_payment', {
            card_number: this.state.card_number,
            ccv: this.state.ccv,
            expiration_date: this.state.expiration_date,
            card_holder: this.state.card_holder,
            card_type: this.state.card_type,
            payer_fullname: this.state.payer_fullname,
            payer_email: this.state.payer_email,
            payer_phone: this.state.payer_phone,
            payer_document_number: this.state.payer_document_number,
            payer_document_type: this.state.payer_type,
            cuotas: this.state.cuotas,
            product_id: destructured[2],
            payer_addr1: this.state.payer_addr1,
            payer_addr2: this.state.payer_addr2,
            payer_city: this.state.payer_city,
            payer_department: this.state.payer_department,
            user_id: destructured[4],
            address_id: this.state.address_id,
            device_session_id: '611326d0e6ab41299435886c285d658c'
        })
            .then((response) => {
                console.log(response.data)
            }, (error) => {
                console.log(error);
            });

        this.setState({payer_emailError: ''})

        if (this.valid()) {

            this.setState({
                boton: 'active'

            })
            this.setState(
                {Enviar: `Enviado con exito, Revisa el estado de tu compra :`}
            )

        }

    };

    onOpenModal = () => {
        this.setState({open: true});
    };

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        const {card_number, ccv, expiration_date, card_type, payer_fullname, payer_email, payer_phone, payer_document_number, payer_document_type, cuotas, payer_addr1, payer_city, payer_department, card_holder, payer_addr2} = this.state;
        const years = []
        const year = parseInt(new Date(Date.now()).getFullYear())
        const {product} = this.state;

        for (let i = year - 20; i <= year + 20; i++) {
            years.push(i)
        }

        return (
            <div className='container-fluid'>
                <Direcciones ref={this.assignRef} cb={this.changeInfo}/>
                <div className="row-fluid">
                    <div className='col-lg-9 col-md-10 col-sm-12 contenedor '>
                        <div className="izquierda col-sm-12 col-md-12 col-lg-7 ">
                            <p className='titulo'>Elige la forma de pago</p>
                            <Accordion>
                                <div className=''>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0"
                                                          className='tamano'>
                                            Credito
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0" className='collap'>
                                            <div className='cont '>
                                                <div className='cred col-md-12 col-sm-12 col-lg-8'>
                                                    <Card.Body>
                                                        <p>Ingresa una nueva tarjeta</p>
                                                        <div className='tarjeta '>
                                                            <div className=' contenido'>
                                                                <form className="needs-validation was-validate"
                                                                      onSubmit={this.submitHandler}>
                                                                    <div className="input-group mr-5">
                                                                        <input className="form-control"
                                                                               name='card_number' type='text'
                                                                               value={card_number}
                                                                               placeholder="Número tarjeta*"
                                                                               minLength='16' maxLength='40' required
                                                                               onChange={this.changeHandler}/>
                                                                        <div className="input-group-append">
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-group mr-5 mt-3">
                                                                        <input className="form-control"
                                                                               name='card_holder' type='text'
                                                                               value={card_holder}
                                                                               placeholder="Nombre y apellido impreso en la tarjeta*"
                                                                               required onChange={this.changeHandler}/>
                                                                        <div className="input-group-append">
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="input-group col-lg-6 col-sm-12 an mt-3">
                                                                        <input className="form-control"
                                                                               name='expiration_date' type='text'
                                                                               value={expiration_date}
                                                                               placeholder="YYYY/MM" minLength='7'
                                                                               maxLength='7' required
                                                                               onChange={this.changeHandler}/>
                                                                        <div className="input-group-append">
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="input-group col-lg-6 col-sm-12 cv mt-3 ">
                                                                        <input className="form-control" type="text"
                                                                               name='ccv' value={ccv} placeholder="CVV*"
                                                                               minLength='3' maxLength='4' required
                                                                               onChange={this.changeHandler}/>
                                                                        <div className="input-group-append">
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="form-group col-lg-12  col-sm-12 doc">
                                                                        <label htmlFor="typecard"></label>
                                                                        <select id="typecard" className="form-control"
                                                                                name="card_type" value={card_type}
                                                                                onChange={this.changeHandler}>
                                                                            <option defaultValue>Tipo Tarjeta*</option>
                                                                            <option>VISA</option>
                                                                            <option>MASTERCARD</option>
                                                                            <option>DINNERS</option>
                                                                            <option>CRM</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group col-lg-7 col-sm-12 doc">
                                                                        <label htmlFor="documenttype"></label>
                                                                        <select id="documenttype"
                                                                                className="form-control "
                                                                                name='payer_document_type'
                                                                                value={payer_document_type}
                                                                                onChange={this.changeHandler}>
                                                                            <option defaultValue>Tipo Documento*
                                                                            </option>
                                                                            <option>CC</option>
                                                                            <option>CE</option>
                                                                            <option>NIT</option>
                                                                            <option>TI</option>
                                                                            <option>PP</option>
                                                                            <option>IDC</option>
                                                                            <option>CEL</option>
                                                                            <option>RC</option>
                                                                            <option>DE</option>
                                                                        </select>
                                                                    </div>
                                                                    <div
                                                                        className="form-group col-lg-5 col-sm-12 cuotas ">
                                                                        <label htmlFor="dues"></label>
                                                                        <select id="dues" className="form-control sel"
                                                                                name='cuotas' value={cuotas} required
                                                                                onChange={this.changeHandler}>
                                                                            <option key="0" defaultValue>Cuotas*
                                                                            </option>
                                                                            {[...Array(18).keys()].map((number, index) => (
                                                                                <option
                                                                                    key={index + 1}>{number + 1}</option>))}
                                                                        </select>
                                                                    </div>
                                                                    <div className="input-group mt-2">
                                                                        <input className="form-control"
                                                                               name="payer_fullname"
                                                                               value={payer_fullname} type="text"
                                                                               placeholder="Nombre y Apelido*" required
                                                                               onChange={this.changeHandler}/>
                                                                        <div className="input-group-append">
                                                                        </div>
                                                                    </div>


                                                                    <div className="input-group mt-2">
                                                                        <input className="form-control" type="number"
                                                                               name="payer_document_number"
                                                                               value={payer_document_number}
                                                                               placeholder="Número documento*" required
                                                                               onChange={this.changeHandler}/>
                                                                        <div className="input-group-append">
                                                                        </div>
                                                                    </div>

                                                                    <div className="input-group mt-2">
                                                                        <input className="form-control" type="text"
                                                                               name="payer_email" value={payer_email}
                                                                               placeholder="Email*" required
                                                                               onChange={this.changeHandler}/>
                                                                        <p style={{
                                                                            color: 'red',
                                                                            fontSize: '14px'
                                                                        }}> {this.state.payer_emailError}</p>
                                                                        <div className="input-group-append">
                                                                        </div>
                                                                    </div>

                                                                    <div className="input-group mt-2">
                                                                        <input className="form-control" type="number"
                                                                               name='payer_phone' value={payer_phone}
                                                                               placeholder="Telefono*" required
                                                                               onChange={this.changeHandler}/>
                                                                        <div className="input-group-append">
                                                                        </div>
                                                                    </div>

                                                                    <div className="input-group mt-2">
                                                                        <input className="form-control" type="text"
                                                                               name='payer_city' value={payer_city}
                                                                               placeholder="Ciudad*" required
                                                                               onChange={this.changeHandler}/>
                                                                        <div className="input-group-append">
                                                                        </div>
                                                                    </div>

                                                                    <div className="input-group mt-2">
                                                                        <input className="form-control" type="text"
                                                                               name='payer_addr1' value={payer_addr1}
                                                                               placeholder="Dirección-1*" required
                                                                               onChange={this.changeHandler}/>
                                                                        <div className="input-group-append">
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-group mt-2">
                                                                        <input className="form-control" type="text"
                                                                               name='payer_addr2' value={payer_addr2}
                                                                               placeholder="Dirección-2*" required
                                                                               onChange={this.changeHandler}/>
                                                                        <div className="input-group-append">
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-group mt-2">
                                                                        <input className="form-control" type="text"
                                                                               name='payer_department'
                                                                               value={payer_department}
                                                                               placeholder="Departamento*" required
                                                                               onChange={this.changeHandler}/>
                                                                        <div className="input-group-append">
                                                                        </div>
                                                                    </div>
                                                                    <button type="submit"
                                                                            className="btn btn-outline-danger btn-block mt-3">Enviar
                                                                    </button>
                                                                    <div className={this.state.boton}>
                                                                        <p style={{color: '#055902', fontSize: '14px'}}
                                                                           className='mt-3'> {this.state.Enviar} </p>
                                                                        <Credito productid={destructured[2]}
                                                                                 product={product}/>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </div>

                                                <div className='col-lg-4 col-md-5 col-sm-2  n'>
                                                    <img alt='' className='img-fluid ' src={img}/>
                                                </div>
                                            </div>
                                        </Accordion.Collapse>
                                    </Card>
                                </div>
                                <div className='efectivo '>
                                    <Efectivo/>
                                </div>
                                <div className='pse '>
                                    <Transferencia user_id={destructured[4]} productid={destructured[2]}
                                                   product={product}/>
                                </div>
                            </Accordion>
                        </div>
                        <ProductInfo productid={destructured[2]} product={product}/>
                        <div className=' derecha col-sm-12 col-lg-4'>
                            <div className='col-12'>
                                <div className='tex col-lg-6  col-sm-12 mt-3 a'>
                                    <p>Dirección {this.state.via}</p>
                                    <p>Dirección #2: {this.state.number_via}</p>
                                    <p>Barrio: {this.state.neighborhood}</p>
                                    <p>Departamento: {this.state.department}</p>
                                    <p>Ciudad: {this.state.city}</p>
                                </div>
                            </div>
                            <button type="button" className="btn btn-outline-danger btn-block mt-3">
                                <a href="javascript:location.reload();">Cambiar Direccion </a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default (FormaPago);