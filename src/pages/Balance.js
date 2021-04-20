import React, {useState, useEffect, Component} from 'react';
import Cookies from 'universal-cookie';
import '../css/Menu.css';
import '../css/demo.css';
import axios from 'axios';
import logo from '../images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie,faHome,faCalendarAlt,faClipboard,faBook,faBalanceScaleLeft } from '@fortawesome/free-solid-svg-icons';
import md5 from 'md5';



function Menu(props) {
    const [dropdown, setDropdownOpen] = useState(false);
    const abrircerrardrop=()=>{
        setDropdownOpen(!dropdown);
    }
    const cookies = new Cookies();

    const elementu = <FontAwesomeIcon icon={faUserTie} />
    const elementhome = <FontAwesomeIcon icon={faHome} />
    const elementcalendar = <FontAwesomeIcon icon={faCalendarAlt} />
    const elementcuenta = <FontAwesomeIcon icon={faClipboard } />
    const elementlibro = <FontAwesomeIcon icon={faBook } />
    const elementbalance = <FontAwesomeIcon icon={faBalanceScaleLeft } />




    const cerrarSesion=()=>{
        cookies.remove('id_usuario', {path: '/'});
        cookies.remove('nombre', {path: '/'});
        cookies.remove('apellido', {path: '/'});
        cookies.remove('username', {path: '/'});
        cookies.remove('puesto_empleado', {path: '/'});
        cookies.remove('contraseña', {path: '/'});
        props.history.push('./');
    }

    useEffect(()=>{
        if(!cookies.get('id_usuario')){
            props.history.push('./');
        }
        Peticionget();
          },[]);

         

          const baseUrl="https://contaapp.azurewebsites.net/api/Movimientoes";
          const [data, setData]=useState([]);
          const [datapasx, setDatapasx]=useState([]);
          const [data2, setData2]=useState([]);
          const [termino, settermino]=useState([]);

          const Peticionget=async()=>{
            await axios.get(baseUrl)
           .then(response=>{
            var respuestamov=response.data;
             
            var ingresos=0.0;
            var ingresosaux=0.0;
            var egresos=0.0;
            
           var pasivo=8.0;
            var activo=0.0;
            var capital=0.0;
            var saldo=0.0;
            respuestamov.map(gestorm=>{
                ingresosaux=parseInt(gestorm.ingreso);
                ingresos=ingresos+ingresosaux;
                egresos=egresos+parseInt(gestorm.egreso);
                console.log(parseInt(gestorm.ingreso));
         })

        
            activo=ingresos;
            pasivo=egresos;
            capital=ingresos-egresos;
            
            setData(activo);
            setDatapasx(pasivo);
            setData2(capital);
            saldo=(pasivo+capital)-activo;
            settermino(saldo);

       
         
        }).catch(response=>{
            alert('Error al obtener los datos');
        })
        }

        const [Modalinsertar1, setModalinsertar1] = useState(false);
    
        const abrircerrarmodal1=()=>{
            setModalinsertar1(!Modalinsertar1);
       
        }
        const baseUrluser="https://contaapp.azurewebsites.net/api/usuario_DB";
    

        const [gestorseleccionado1, setgestorseleccionado1] = useState({
         id_usuario:'',
         nombre: '',
         apellido: '',
         username: '',
         puesto_empleado: '',
         contraseña: ''
       
     })
     const handleChange1=e=>{
        const {name, value} = e.target;
       setgestorseleccionado1({
           ...gestorseleccionado1,
           [name]: value
       })
       console.log(gestorseleccionado1);
         }
 
          
          const Peticionpost1=async()=>{
             delete gestorseleccionado1.id_usuario;
             gestorseleccionado1.contraseña=md5(gestorseleccionado1.contraseña);
             console.log(gestorseleccionado1);
             await axios.post(baseUrluser, gestorseleccionado1)
            .then(response=>{
                     abrircerrarmodal1();
                     alert('Usuario Registrado');
         }).catch(response=>{
             alert('Error al ingresar dato');
         })
         }


          
    return (
        <div className="body">
        <div className="header">
            <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu"></input>
  <label for="openSidebarMenu" class="sidebarIconToggle">
    <div class="spinner diagonal part-1"></div>
    <div class="spinner horizontal"></div>
    <div class="spinner diagonal part-2"></div>
  </label>
  <div id="sidebarMenu">
      <center> <img src={logo} /></center>
    <ul class="sidebarMenuInner">
    <li><a href="/menu">{elementhome}  Home</a> </li>
    <li><a href="/Periodo">{elementcalendar}  Periodos</a></li>
    <li><a href="/Nomenclatura">{elementcuenta} Nomenclatura Contable</a></li>
    <li><a href="/movimiento" >{elementlibro} Libro Diario</a></li>
    <li><a href="/balance">{elementbalance} Balance</a></li>
    
    </ul>
  </div>
      

        </div>
        
        <Dropdown id="userdrop" isOpen={dropdown} toggle={abrircerrardrop} direction="left">
            <DropdownToggle caret className="togleuser">
            {elementu} {cookies.get('nombre')+" "} {cookies.get('apellido')}
            </DropdownToggle>

            <DropdownMenu id="userdrop1">
            <DropdownItem header>Opciones Usuario</DropdownItem>
            <DropdownItem divider/>
            <DropdownItem onClick={()=>cerrarSesion()}>Cerrar Sesión</DropdownItem>
            <DropdownItem onClick={()=>abrircerrarmodal1()}>Agregar Usuario</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <br/><br/><br/>
        <div className="bodymain">
           <center> <h1 className="Titulos">Balance General</h1></center>
           <br/>
           <br/>
          <div align="center">
          <ReactHTMLTableToExcel
                    id="exportoffice"
                    className="btn btn-warning"
                    table="tablabalance"
                    filename="Balance"
                    sheet="Balance Contable"
                    buttonText="Descargar a Excel"/>
          </div>
           <br/>
           <table className="table table-bordered" id="tablabalance">
               <thead className="bg-info">
                   <tr>
                       <th>Concepto</th>
                       <th>Total</th>
                   </tr>
               </thead>
               <tbody className="table-active ">
                   <tr>
                       <td>Activos</td>
                    <td>{data}</td>
                   </tr>
                   <tr>
                       <td>Pasivos</td>
                         <td>{datapasx}</td>
                   </tr>
                   <tr>
                       <td>Capital</td>
                         <td>{data2}</td>
                   </tr>

                   <tr>
                       <b><td>Saldo Balance</td></b>
                         <td>{termino}</td>
                   </tr>
                   
                   </tbody>
           </table>
        </div>
         <br/>
         <Modal isOpen={Modalinsertar1}>
          <ModalHeader>Insertar Nuevo Usuario</ModalHeader>
            <ModalBody>
                <div className="Form-group">
                   <label>Nombre</label>
                   <br/>
                   <input type="text" className="form-control" name="nombre" onChange={handleChange1} />
                   <label>Apellido</label>
                   <br/>
                   <input type="text" className="form-control"name="apellido" onChange={handleChange1} />
                   <label>UserName</label>
                   <br/>
                   <input type="text" className="form-control"name="username" onChange={handleChange1} />
                   <label>Puesto Empleado</label>
                   <br/>
                   <input type="text" className="form-control"name="puesto_empleado" onChange={handleChange1} />
                   <label>Contraseña</label>
                   <br/>
                   <input type="text" className="form-control" name="contraseña" onChange={handleChange1} />
                   
                 
                </div>
            </ModalBody>
            <ModalFooter>
            <button className="btn btn-success" onClick={()=>Peticionpost1()}>Guardar</button>
            <button className="btn btn-warning" onClick={()=>abrircerrarmodal1()}>Cancelar</button>
            </ModalFooter>
         </Modal>
        <center> <h5 className="Titulos">copyright © TechBalam by Lester Monterroso</h5></center>
        </div>
       
    );
}

export default Menu;