import React, {useState, useEffect} from 'react';
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
   
    const elementu = <FontAwesomeIcon icon={faUserTie} />
    const elementhome = <FontAwesomeIcon icon={faHome} />
    const elementcalendar = <FontAwesomeIcon icon={faCalendarAlt} />
    const elementcuenta = <FontAwesomeIcon icon={faClipboard } />
    const elementlibro = <FontAwesomeIcon icon={faBook } />
    const elementbalance = <FontAwesomeIcon icon={faBalanceScaleLeft } />

    const [gestorseleccionado, setgestorseleccionado] = useState({
        periodoId: '',
        nombre: '',
        fecha_Inicio: '',
        fecha_Final: '',
        no_ejercicio: '',
        estado: true,
        movimiento_DBs: null,
        partida_DBs: null

    })
    const handleChange=e=>{
        const {name, value} = e.target;
       setgestorseleccionado({
           ...gestorseleccionado,
           [name]: value
       })
       console.log(gestorseleccionado);
         }

    const cookies = new Cookies();
    const [Modaleditar, setModaleditar] = useState(false);
    const abrircerrareditar=()=>{
        setModaleditar(!Modaleditar);
    }
    const [Modaleliminar, setModaleliminar] = useState(false);
    const abrircerrareliminar=()=>{
        setModaleliminar(!Modaleliminar);
    }
    const [Modalinsertar, setModalinsertar] = useState(false);
    const abrircerrarmodal=()=>{
        setModalinsertar(!Modalinsertar);
    }

    const elegirgestor=(gestor, caso)=>{
        setgestorseleccionado(gestor);
         (caso==="Editar")?
         abrircerrareditar() : abrircerrareliminar();
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
    const baseUrl="https://contaapp.azurewebsites.net/api/Periodoes";
    const [data, setData]=useState([]);
    
    const Peticionget=async()=>{
        await axios.get(baseUrl)
       .then(response=>{
        setData(response.data);
    }).catch(response=>{
        alert('Error al obtener los datos');
    })
    }

    const Peticionpost=async()=>{
        delete gestorseleccionado.periodoId;
        gestorseleccionado.no_ejercicio=parseInt(gestorseleccionado.no_ejercicio);
        console.log(gestorseleccionado);
        await axios.post(baseUrl, gestorseleccionado)
       .then(response=>{
        setData(data.concat(response.data));
        abrircerrarmodal();
    }).catch(response=>{
        alert('Error al ingresar dato');
    })
    }

    const Peticionput=async()=>{
        gestorseleccionado.no_ejercicio=parseInt(gestorseleccionado.no_ejercicio);
        console.log(gestorseleccionado);
        await axios.put(baseUrl+"/"+gestorseleccionado.periodoId, gestorseleccionado)
       .then(response=>{
           var respuesta=response.data;
           var dataAuxiliar=data;
        dataAuxiliar.map(gestor=>{
            if(gestor.periodoId===gestorseleccionado.periodoId){
                gestor.nombre=respuesta.nombre;
                gestor.fecha_Inicio=respuesta.fecha_Inicio;
                gestor.fecha_Final=respuesta.fecha_Final;
                gestor.no_ejercicio=respuesta.no_ejercicio;
                gestor.estado=respuesta.estado;
                gestor.movimiento_DBs=respuesta.movimiento_DBs;
                gestor.partida_DBs=respuesta.partida_DBs;
            }
        })
        abrircerrareditar();
    }).catch(response=>{
        alert('Error al ingresar dato');
    })
    }

    const Peticiondelete=async()=>{
        console.log(gestorseleccionado);
        await axios.delete(baseUrl+"/"+gestorseleccionado.periodoId)
       .then(response=>{
       setData(data.filter(gestor=>gestor.periodoId!==response.data));
        abrircerrareliminar();
    }).catch(response=>{
        alert('Error al eliminar dato');
    })
    }

    useEffect(()=>{
        if(!cookies.get('id_usuario')){
            props.history.push('./');
        }
        Peticionget();
          },[]);

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
            <DropdownItem header>Opciones periodo</DropdownItem>
            <DropdownItem divider/>
            <DropdownItem onClick={()=>cerrarSesion()}>Cerrar Sesión</DropdownItem>
            <DropdownItem onClick={()=>abrircerrarmodal1()}>Agregar Usuario</DropdownItem>
            </DropdownMenu>
        </Dropdown>
<br/><br/><br/>
        <div className="bodymain">
           <center> <h1 className="Titulos">Periodos</h1></center>
           <br/>
           <center><div className="btnfuente">
           <div className="btn-group mr-2">
          <button onClick={()=>abrircerrarmodal()} className="btn btn-success">Ingresar Periodo</button>
          </div>
          <div className="btn-group mr-2">
          <ReactHTMLTableToExcel
                    id="exportoffice"
                    className="btn btn-warning"
                    table="tablaperiodo"
                    filename="Periodos"
                    sheet="Periodos Generales"
                    buttonText="Descargar a Excel"/>
          </div>
          </div></center>
           <br/>  <br/>
           <div class="table-responsive-md">
           <table className="table table-bordered" id="tablaperiodo">
               <thead className="bg-info">
                   <tr>
                       <th>ID</th>
                       <th>Nombre</th>
                       <th>Fecha Inicio</th>
                       <th>Fecha Final</th>
                       <th>No. Ejercicio</th>
                       <th>Acciones</th>
                   </tr>
               </thead>
               <tbody className="table-active ">
                    {data.map(gestor=>(
                        <tr key={gestor.periodoId}>
                            <td>{gestor.periodoId}</td>
                            <td>{gestor.nombre}</td>
                            <td>{gestor.fecha_Inicio}</td>
                            <td>{gestor.fecha_Final}</td>
                            <td>{gestor.no_ejercicio}</td>
                            <td>
                                <button className="btn btn-outline-success" onClick={()=>elegirgestor(gestor, "Editar")}>Editar</button> {"  "}
                                <button className="btn btn-outline-danger" onClick={()=>elegirgestor(gestor, "Eliminar")}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                   </tbody>
           </table>
           </div>
         <Modal isOpen={Modalinsertar}>
          <ModalHeader>Insertar Nuevo Periodo</ModalHeader>
            <ModalBody>
                <div className="Form-group">
                   <label>Nombre Periodo</label>
                   <br/>
                   <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
                   <label>Fecha Inicio</label>
                   <br/>
                   <input type="date" className="form-control"name="fecha_Inicio" onChange={handleChange}/>
                   <label>Fecha Final</label>
                   <br/>
                   <input type="date" className="form-control" name="fecha_Final" onChange={handleChange}/>
                   <label>Numero Ejercicio</label>
                   <br/>
                   <input type="number" className="form-control" name="no_ejercicio" onChange={handleChange}/>
                </div>
            </ModalBody>
            <ModalFooter>
            <button className="btn btn-success"onClick={()=>Peticionpost()}>Guardar</button>
            <button className="btn btn-warning" onClick={()=>abrircerrarmodal()}>Cancelar</button>
            </ModalFooter>
         </Modal>

         <Modal isOpen={Modaleditar}>
          <ModalHeader>Editar Periodo</ModalHeader>
            <ModalBody>
                 <div className="Form-group">
                  <label>ID</label>
                   <br/>
                   <input type="number" className="form-control" readOnly value={gestorseleccionado && gestorseleccionado.periodoId}/>
                   <label>Nombre Periodo</label>
                   <br/>
                   <input type="text" className="form-control"  name="nombre" onChange={handleChange} value={gestorseleccionado && gestorseleccionado.nombre}/>
                   <label>Fecha Inicio</label>
                   <br/>
                   <input type="text" className="form-control" name="fecha_Inicio" onChange={handleChange} value={gestorseleccionado && gestorseleccionado.fecha_Inicio}/>
                   <label>Fecha Final</label>
                   <br/>
                   <input type="text" className="form-control" name="fecha_Final" onChange={handleChange} value={gestorseleccionado && gestorseleccionado.fecha_Final}/>
                   <label>Numero Ejercicio</label>
                   <br/>
                   <input type="number" className="form-control" name="no_ejercicio" onChange={handleChange} value={gestorseleccionado && gestorseleccionado.no_ejercicio}/>
                </div>
            </ModalBody>
            <ModalFooter>
            <button className="btn btn-success" onClick={()=>Peticionput()}>Editar</button>
            <button className="btn btn-warning" onClick={()=>abrircerrareditar()}>Cancelar</button>
            </ModalFooter>
         </Modal>

         <Modal isOpen={Modaleliminar}>
             <ModalBody>
                 ¿Está seguro que desea eliminar este periodo {gestorseleccionado && gestorseleccionado.nombre}?
             </ModalBody>
             <ModalFooter>
             <button className="btn btn-danger" onClick={()=>Peticiondelete()}>
                 Si</button>
                 <button className="btn btn-warning" onClick={()=>abrircerrareliminar()}>
                 No</button>
             </ModalFooter>
         </Modal>
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
        </div>
         <br/>
        <center> <h5 className="Titulos">copyright © TechBalam by Lester Monterroso</h5></center>
        </div>
       
    );
}

export default Menu;