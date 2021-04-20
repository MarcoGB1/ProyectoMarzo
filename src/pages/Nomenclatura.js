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

    const baseUrl="https://contaapp.azurewebsites.net/api/cuentas";
    const [data, setData]=useState([]);
    const elementu = <FontAwesomeIcon icon={faUserTie} />
    const elementhome = <FontAwesomeIcon icon={faHome} />
    const elementcalendar = <FontAwesomeIcon icon={faCalendarAlt} />
    const elementcuenta = <FontAwesomeIcon icon={faClipboard } />
    const elementlibro = <FontAwesomeIcon icon={faBook } />
    const elementbalance = <FontAwesomeIcon icon={faBalanceScaleLeft } />

    const [gestorseleccionado, setgestorseleccionado] = useState({
        cuentaId: '',
        nombre_Cuenta: '',
        tipo_Cuenta: '',
        padre: '',
        grupoId: '',
        grupo: null,
        nivel: 1,  
        CuentaDe: null
      
    })
    const handleChange=e=>{
        const {name, value} = e.target;
       setgestorseleccionado({
           ...gestorseleccionado,
           [name]: value
       })
       console.log(gestorseleccionado);
         }
    const [dropdowntipo, setDropdownOpentipo] = useState(false);
    const abrircerrardroptipo=()=>{
        setDropdownOpentipo(!dropdowntipo);
    }

    const [Modalinsertar, setModalinsertar] = useState(false);
    
    const abrircerrarmodal=()=>{
        setModalinsertar(!Modalinsertar);
        Peticiongrupo();
    }

    const [Modaleditar, setModaleditar] = useState(false);
    
    const abrircerrareditar=()=>{
        setModaleditar(!Modaleditar);
        Peticiongrupo();
    }
    const [Modaleliminar, setModaleliminar] = useState(false);
    const abrircerrareliminar=()=>{
        setModaleliminar(!Modaleliminar);
    }

    const elegirgestor=(gestor, caso)=>{
        setgestorseleccionado(gestor);
        (caso==="Editar")?
        abrircerrareditar() : abrircerrareliminar();
    }

    const [stategrup, setDatagrup]=useState([]);
    
    const Peticiongrupo=async()=>{
        await axios.get("https://contaapp.azurewebsites.net/api/grupos")
       .then(response=>{
        setDatagrup(response.data);
        console.log(response);
    }).catch(response=>{
        alert('Error al obtener los datos');
    })
    }

   

         const Peticionpost=async()=>{
            gestorseleccionado.cuentaId=parseInt(gestorseleccionado.cuentaId);
            gestorseleccionado.padre=parseInt(gestorseleccionado.padre);
            gestorseleccionado.grupoId=parseInt(gestorseleccionado.grupoId);
            console.log(gestorseleccionado);
            await axios.post(baseUrl, gestorseleccionado)
           .then(response=>{
            setData(data.concat(response.data));
            abrircerrarmodal();
        }).catch(response=>{
            alert('Error al ingresar dato');
        })
        }

    const cookies = new Cookies();

    const cerrarSesion=()=>{
        cookies.remove('id_usuario', {path: '/'});
        cookies.remove('nombre', {path: '/'});
        cookies.remove('apellido', {path: '/'});
        cookies.remove('username', {path: '/'});
        cookies.remove('puesto_empleado', {path: '/'});
        cookies.remove('contraseña', {path: '/'});
        props.history.push('./');
    }
   

 
    const Peticionget=async()=>{
        await axios.get(baseUrl)
       .then(response=>{
        setData(response.data);
    }).catch(response=>{
        alert('Error al obtener los datos');
    })
    }

    const Peticionput=async()=>{
        gestorseleccionado.padre=parseInt(gestorseleccionado.padre);
            gestorseleccionado.grupoId=parseInt(gestorseleccionado.grupoId);
        console.log(gestorseleccionado);
        await axios.put(baseUrl+"/"+gestorseleccionado.cuentaId, gestorseleccionado)
       .then(response=>{
           var respuesta=response.data;
           var dataAuxiliar=data;
        dataAuxiliar.map(gestor=>{
            if(gestor.cuentaId===gestorseleccionado.cuentaId){
                gestor.nombre_Cuenta=respuesta.nombre_Cuenta;
                gestor.tipo_Cuenta=respuesta.tipo_Cuenta;
                gestor.padre=respuesta.padre;
                gestor.grupoId=respuesta.grupoId;
                gestor.grupo=respuesta.grupo;
                gestor.nivel=respuesta.nivel;
                gestor.cuentaDe=respuesta.cuentaDe;
               
            }
        })
        abrircerrareditar();
    }).catch(response=>{
        alert('Error al ingresar dato');
    })
    }

    const Peticiondelete=async()=>{
        console.log(gestorseleccionado);
        await axios.delete(baseUrl+"/"+gestorseleccionado.cuentaId)
       .then(response=>{
       setData(data.filter(gestor=>gestor.cuentaId!==response.data));
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
            <DropdownItem header>Opciones Usuario</DropdownItem>
            <DropdownItem divider/>
            <DropdownItem onClick={()=>cerrarSesion()}>Cerrar Sesión</DropdownItem>
            <DropdownItem onClick={()=>abrircerrarmodal1()}>Agregar Usuario</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <br/><br/><br/>
        <div className="bodymain">
        <center> <h1 className="Titulos">Nomenclatura Contable</h1></center>
           <br/>
           <center><div className="btnfuente">
           <div className="btn-group mr-2">
           <button onClick={()=>abrircerrarmodal()} className="btn btn-success">Ingresar Cuenta Contable</button>
          </div>
          <div className="btn-group mr-2">
      
          <ReactHTMLTableToExcel
                    id="exportoffice"
                    className="btn btn-warning"
                    table="tablacuenta"
                    filename="Nomenclatura"
                    sheet="Nomenclatura Contable"
                    buttonText="Descargar a Excel"/>
        </div>
          </div></center>
           <br/>  <br/>
           <div class="table-responsive-md">
           <table className="table table-bordered" id="tablacuenta">
               <thead className="bg-info">
                   <tr>
                       <th>ID</th>
                       <th>Nombre</th>
                       <th>Tipo Cuenta</th>
                       <th>Padre</th>
                       <th>Grupo</th>
                       <th>Acciones</th>
                   </tr>
               </thead>
               <tbody className="table-active ">
                    {data.map(gestor=>(
                        <tr key={gestor.cuentaId}>
                            <td>{gestor.cuentaId}</td>
                            <td>{gestor.nombre_Cuenta}</td>
                            <td>{gestor.tipo_Cuenta}</td>
                            <td>{gestor.padre}</td>
                            <td>{gestor.grupoId}</td>
                            <td>
                                <button className="btn btn-outline-success" onClick={()=>elegirgestor(gestor, "Editar")} >Editar</button> {"  "}
                                <button className="btn btn-outline-danger" onClick={()=>elegirgestor(gestor, "Eliminar")}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                   </tbody>
           </table>
           </div>
           <Modal isOpen={Modalinsertar}>
          <ModalHeader>Insertar Nueva Cuenta</ModalHeader>
            <ModalBody>
                <div className="Form-group">
                   <label>ID cuenta</label>
                   <br/>
                   <input type="number" className="form-control" name="cuentaId" onChange={handleChange}/>
                   <label>Nombre Cuenta</label>
                   <br/>
                   <input type="text" className="form-control"name="nombre_Cuenta" onChange={handleChange} />
                   <label>Tipo Cuenta</label>
                   <br/>
                   <input type="text" className="form-control"name="tipo_Cuenta" onChange={handleChange} />
                   <label>Grupo</label>
                   <br/>
                   <select name="grupoId"  className="form-control" onChange={handleChange}>
                               <option>Seleccione un Grupo</option>
                            {stategrup.map(elemento=>(
                                <option key={elemento.grupoId} value={elemento.grupoId}>{elemento.tipo_Saldo}</option>
                            ))}
                   </select>
                   <label>Padre</label>
                   <br/>
                   <input type="number" className="form-control" name="padre" onChange={handleChange} />
                   
                 
                </div>
            </ModalBody>
            <ModalFooter>
            <button className="btn btn-success" onClick={()=>Peticionpost()}>Guardar</button>
            <button className="btn btn-warning" onClick={()=>abrircerrarmodal()}>Cancelar</button>
            </ModalFooter>
         </Modal>


         <Modal isOpen={Modaleditar}>
          <ModalHeader>Editar Cuenta</ModalHeader>
            <ModalBody>
                <div className="Form-group">
                   <label>ID cuenta</label>
                   <br/>
                   <input type="number" className="form-control" name="cuentaId" readOnly value={gestorseleccionado && gestorseleccionado.cuentaId}/>
                   <label>Nombre Cuenta</label>
                   <br/>
                   <input type="text" className="form-control"name="nombre_Cuenta" onChange={handleChange} value={gestorseleccionado && gestorseleccionado.nombre_Cuenta}/>
                   <label>Tipo Cuenta</label>
                   <br/>
                   <input type="text" className="form-control"name="tipo_Cuenta" onChange={handleChange} value={gestorseleccionado && gestorseleccionado.tipo_Cuenta}/>
                   <label>Grupo</label>
                   <br/>
                   <select name="grupoId"  className="form-control" onChange={handleChange} value={gestorseleccionado && gestorseleccionado.grupoId} >
                               <option>Seleccione un Grupo</option>
                            {stategrup.map(elemento=>(
                                <option key={elemento.grupoId} value={elemento.grupoId}>{elemento.tipo_Saldo}</option>
                            ))}
                   </select>
                   <label>Padre</label>
                   <br/>
                   <input type="number" className="form-control" name="padre" onChange={handleChange} value={gestorseleccionado && gestorseleccionado.padre}/>
                   
                 
                </div>
            </ModalBody>
            <ModalFooter>
            <button className="btn btn-success" onClick={()=>Peticionput()}>Guardar</button>
            <button className="btn btn-warning" onClick={()=>abrircerrareditar()}>Cancelar</button>
            </ModalFooter>
         </Modal>

         <Modal isOpen={Modaleliminar}>
             <ModalBody>
                 ¿Está seguro que desea eliminar esta cuenta {gestorseleccionado && gestorseleccionado.nombre_Cuenta}?
             </ModalBody>
             <ModalFooter>
             <button className="btn btn-danger" onClick={()=>Peticiondelete()} >
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
        <center> <h5 className="Titulos">copyright © TechBalam by Lester Monterroso</h5></center>
        </div>
       
    );
}

export default Menu;