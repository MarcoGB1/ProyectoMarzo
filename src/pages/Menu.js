import React, {useState, useEffect, Component} from 'react';
import Cookies from 'universal-cookie';
import '../css/Menu.css';
import '../css/demo.css';
import axios from 'axios';
import logo from '../images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillAlt,faHandHoldingUsd,faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faUserTie,faHome,faCalendarAlt,faClipboard,faBook,faBalanceScaleLeft } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import {Bar} from 'react-chartjs-2';
import md5 from 'md5';




function Menu(props) {
    const [dropdown, setDropdownOpen] = useState(false);
    const abrircerrardrop=()=>{
        setDropdownOpen(!dropdown);
    }
    const cookies = new Cookies();

   

    const opcion={

        maintainAspectRatio:false,
        responsive:true
    }

    const cerrarSesion=()=>{
        cookies.remove('id_usuario', {path: '/'});
        cookies.remove('nombre', {path: '/'});
        cookies.remove('apellido', {path: '/'});
        cookies.remove('username', {path: '/'});
        cookies.remove('puesto_empleado', {path: '/'});
        cookies.remove('contraseña', {path: '/'});
        props.history.push('./');
    }
     var fuentr=0.0;
    useEffect(()=>{
        Peticionget();
        if(!cookies.get('id_usuario')){
            props.history.push('./');
        }
        Peticionget();
          },[]);

          const element2 = <FontAwesomeIcon icon={faHandHoldingUsd} />
          const element1 = <FontAwesomeIcon icon={faMoneyBillAlt} />
          const element3 = <FontAwesomeIcon icon={faChartBar} />
          const elementu = <FontAwesomeIcon icon={faUserTie} />
          const elementhome = <FontAwesomeIcon icon={faHome} />
          const elementcalendar = <FontAwesomeIcon icon={faCalendarAlt} />
          const elementcuenta = <FontAwesomeIcon icon={faClipboard } />
          const elementlibro = <FontAwesomeIcon icon={faBook } />
          const elementbalance = <FontAwesomeIcon icon={faBalanceScaleLeft } />
      
          

          const baseUrl="https://contaapp.azurewebsites.net/api/Movimientoes";
          const [data5, setData]=useState([]);
          const [datapasx, setDatapasx]=useState([]);
          const [data2, setData2]=useState([]);
          const [termino, settermino]=useState([]);

          const [cantidad, setcantidad]=useState([]);
          const [Modalinsertar, setModalinsertar] = useState(false);
    
    const abrircerrarmodal=()=>{
        setModalinsertar(!Modalinsertar);
   
    }

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
            
            setData(ingresos);
            setDatapasx(egresos);
            setData2(capital);
            saldo=(pasivo+capital)-activo;
            settermino(saldo);
            fuentr=activo;
       
         
        }).catch(response=>{
            alert('Error al obtener los datos');
        })
        }

        const tabla={
            labels:['Ingresos','Egresos'],
            datasets:[{
                label: 'Resultados Empresariales',
                backgroundColor:'rgba(20, 178, 171,0.9)',
                borderColor:'black',
                borderWidth: 1,
                hoverBackgroundColor:'blue',
                data: [data5,datapasx]
            }]
   
   
       }

       const baseUrluser="https://contaapp.azurewebsites.net/api/usuario_DB";
      

       const [gestorseleccionado, setgestorseleccionado] = useState({
        id_usuario:'',
        nombre: '',
        apellido: '',
        username: '',
        puesto_empleado: '',
        contraseña: ''
      
    })
    const handleChange=e=>{
        const {name, value} = e.target;
       setgestorseleccionado({
           ...gestorseleccionado,
           [name]: value
       })
       console.log(gestorseleccionado);
         }

         
         const Peticionpost=async()=>{
            delete gestorseleccionado.id_usuario;
            gestorseleccionado.contraseña=md5(gestorseleccionado.contraseña);
            console.log(gestorseleccionado);
            await axios.post(baseUrluser, gestorseleccionado)
           .then(response=>{
                    abrircerrarmodal();
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
            <DropdownItem onClick={()=>abrircerrarmodal()}>Agregar Usuario</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <br/><br/><br/>
        <div className="bodymain">
        <div class="row">
            <div class="col-lg-4 col-sm-6">
                <div class="card-box bg-green">
                    <div class="inner">
                        <h3> Q. {data5} </h3>
                        <p> Ingresos a la Empresa </p>
                    </div>
                    <div class="icon">
                    {element1}
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-sm-6">
                <div class="card-box bg-red">
                    <div class="inner">
                        <h3>Q. {datapasx} </h3>
                        <p> Egresos de la Empresa </p>
                    </div>
                    <div class="icon">
                    {element2}
                    </div>
                   
                </div>
            </div>
            <div class="col-lg-4 col-sm-6">
                <div class="card-box bg-blue">
                    <div class="inner">
                        <h3> Q. {data2} </h3>
                        <p> Resultados Económicos </p>
                    </div>
                    <div class="icon">
                        {element3}
                    </div>
                   
                </div>
            </div>
        </div>
        <div className="grafica" >
            <Bar data={tabla} options={opcion}/>
            </div>
        </div>
        <Modal isOpen={Modalinsertar}>
          <ModalHeader>Insertar Nueva Cuenta</ModalHeader>
            <ModalBody>
                <div className="Form-group">
                   <label>Nombre</label>
                   <br/>
                   <input type="text" className="form-control" name="nombre" onChange={handleChange} />
                   <label>Apellido</label>
                   <br/>
                   <input type="text" className="form-control"name="apellido" onChange={handleChange} />
                   <label>UserName</label>
                   <br/>
                   <input type="text" className="form-control"name="username" onChange={handleChange} />
                   <label>Puesto Empleado</label>
                   <br/>
                   <input type="text" className="form-control"name="puesto_empleado" onChange={handleChange} />
                   <label>Contraseña</label>
                   <br/>
                   <input type="text" className="form-control" name="contraseña" onChange={handleChange} />
                   
                 
                </div>
            </ModalBody>
            <ModalFooter>
            <button className="btn btn-success" onClick={()=>Peticionpost()}>Guardar</button>
            <button className="btn btn-warning" onClick={()=>abrircerrarmodal()}>Cancelar</button>
            </ModalFooter>
         </Modal>
        <center> <h5 className="Titulos">copyright © TechBalam by Lester Monterroso</h5></center>
        </div>
       
    );
}

export default Menu;