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





    const [statecuenta, setDatacuenta]=useState([]);  
    const Peticioncuenta=async()=>{
        await axios.get("https://contaapp.azurewebsites.net/api/cuentas")
       .then(response=>{
        setDatacuenta(response.data);
        console.log(response);
    }).catch(response=>{
        alert('Error al obtener los datos');
    })
    }

    const [stateperiodo, setDataperiodo]=useState([]);  
    const Peticionperiodo=async()=>{
        await axios.get("https://contaapp.azurewebsites.net/api/periodoes")
       .then(response=>{
        setDataperiodo(response.data);
        console.log(response);
    }).catch(response=>{
        alert('Error al obtener los datos');
    })
    }

    const [Modalinsertarche, setModalinsertarche] = useState(false);
    const abrircerrarmodalche=()=>{
        setModalinsertarche(!Modalinsertarche);
        Peticionperiodo();
        Peticioncuenta();
    }

    const [Modaleliminar, setModaleliminar] = useState(false);
    const abrircerrareliminar=()=>{
        setModaleliminar(!Modaleliminar);
    }

    const [Modalinsertardep, setModalinsertardep] = useState(false);
    const abrircerrarmodaldep=()=>{
        setModalinsertardep(!Modalinsertardep);
        Peticionperiodo();
        Peticioncuenta();
    }


    const [Modaleditarmov, setModaleditarmov] = useState(false);
    const abrircerrareditar=()=>{
        setModaleditarmov(!Modaleditarmov);
        Peticionperiodo();
        Peticioncuenta();
    }


    const baseUrl="https://contaapp.azurewebsites.net/api/movimientoes";
    const baseUrlpart="https://contaapp.azurewebsites.net/api/Partidas";
    const [data, setData]=useState([]);
    const Peticiongetmovimiento=async()=>{
        await axios.get(baseUrl)
       .then(response=>{
        setData(response.data);
        console.log(response.data);
    }).catch(response=>{
        alert('Error al obtener los datos');
    })
    }
    
    

    const [statepartida, setDatapartida]=useState([]);  
    const Peticionpartida=async(gestorm)=>{
        await axios.get("https://contaapp.azurewebsites.net/api/Partidas")
       .then(response=>{
        var respuesta=response.data;
        respuesta.map(gestorpa=>{
            if(gestorpa.partidaId===gestorm.partidaId){
                setgestorseleccionadopart(gestorpa); 
            }
        })
        setDatapartida(response.data);
        
    }).catch(response=>{
        alert('Error al obtener los datos');
    })
    }

    const Peticionpost=async()=>{
        delete gestorseleccionadopart.partidaId;
        gestorseleccionadopart.periodoId=parseInt(gestorseleccionadopart.periodoId);
        gestorseleccionadopart.cuentaIdD=parseInt( gestorseleccionadopart.cuentaIdD);
        gestorseleccionadopart.cuentaIdH=parseInt( gestorseleccionadopart.cuentaIdH);
        gestorseleccionadopart.debe=parseFloat(gestorseleccionadopart.debe);
        gestorseleccionadopart.haber=parseFloat(gestorseleccionadopart.debe);
        console.log(gestorseleccionadopart);
        await axios.post(baseUrlpart, gestorseleccionadopart)
        .then(response=>{
            var respuesta=response.data;
            gestorseleccionadomovi.partidaId=respuesta.partidaId;
            gestorseleccionadomovi.periodoId=respuesta.periodoId;
            gestorseleccionadomovi.fecha=respuesta.fecha;
            gestorseleccionadomovi.concepto=respuesta.concepto;

         
     }).catch(response=>{
         alert('Error al ingresar dato partida');
     })
        delete gestorseleccionadomovi.movimientoId;
        gestorseleccionadomovi.egreso=parseFloat(gestorseleccionadomovi.egreso);
        console.log(gestorseleccionadomovi);
        await axios.post(baseUrl, gestorseleccionadomovi)
        .then(response=>{
         setData(data.concat(response.data));
         abrircerrarmodalche();
     }).catch(response=>{
         alert('Error al ingresar dato movimiento');
     })
      
    }




    const Peticionpostdep=async()=>{
        delete gestorseleccionadopart.partidaId;
        gestorseleccionadopart.periodoId=parseInt(gestorseleccionadopart.periodoId);
        gestorseleccionadopart.cuentaIdD=parseInt( gestorseleccionadopart.cuentaIdD);
        gestorseleccionadopart.cuentaIdH=parseInt( gestorseleccionadopart.cuentaIdH);
        gestorseleccionadopart.debe=parseFloat(gestorseleccionadopart.debe);
        gestorseleccionadopart.haber=parseFloat(gestorseleccionadopart.debe);
        console.log(gestorseleccionadopart);
        await axios.post(baseUrlpart, gestorseleccionadopart)
        .then(response=>{
            var respuesta=response.data;
            gestorseleccionadomovide.partidaId=respuesta.partidaId;
            gestorseleccionadomovide.periodoId=respuesta.periodoId;
            gestorseleccionadomovide.fecha=respuesta.fecha;
            gestorseleccionadomovide.concepto=respuesta.concepto;

         
     }).catch(response=>{
         alert('Error al ingresar dato partida');
     })
        delete gestorseleccionadomovide.movimientoId;
        gestorseleccionadomovide.ingreso=parseFloat(gestorseleccionadomovide.ingreso);
        console.log(gestorseleccionadomovide);
        await axios.post(baseUrl, gestorseleccionadomovide)
        .then(response=>{
         setData(data.concat(response.data));
         abrircerrarmodaldep();
     }).catch(response=>{
         alert('Error al ingresar dato movimiento');
     })
      
    }


    const Peticionput=async()=>{
        gestorseleccionadopart.periodoId=parseInt(gestorseleccionadopart.periodoId);
        gestorseleccionadopart.cuentaIdD=parseInt( gestorseleccionadopart.cuentaIdD);
        gestorseleccionadopart.cuentaIdH=parseInt( gestorseleccionadopart.cuentaIdH);
        gestorseleccionadopart.debe=parseFloat(gestorseleccionadopart.debe);
        gestorseleccionadopart.haber=parseFloat(gestorseleccionadopart.debe);
        console.log(gestorseleccionadopart);
        await axios.put(baseUrlpart+"/"+gestorseleccionadopart.partidaId, gestorseleccionadopart)
        .then(response=>{
            var respuesta=response.data;
            gestorseleccionadomovi.partidaId=respuesta.partidaId;
            gestorseleccionadomovi.periodoId=respuesta.periodoId;
            gestorseleccionadomovi.fecha=respuesta.fecha;
            gestorseleccionadomovi.concepto=respuesta.concepto;

         
     }).catch(response=>{
         alert('Error al editar dato partida');
     })
       
        console.log(gestorseleccionadomovi);
        await axios.put(baseUrl+"/"+gestorseleccionadomovi.movimientoId, gestorseleccionadomovi)
        .then(response=>{
            var respuestamov=response.data;
           var dataAuxiliarmov=data;
           dataAuxiliarmov.map(gestorm=>{
            if(gestorm.movimientoId===gestorseleccionadomovi.movimientoId){
                gestorm.partidaId=respuestamov.partidaId;
                gestorm.partida=respuestamov.partida;
                gestorm.periodoId=respuestamov.periodoId;
                gestorm.periodo=respuestamov.periodo;
                gestorm.fecha=respuestamov.fecha;
                gestorm.nombre_beneficiario=respuestamov.nombre_beneficiario;
                gestorm.concepto=respuestamov.concepto;
                gestorm.ingreso=respuestamov.ingreso;
                gestorm.egreso=respuestamov.egreso;
             
               
            }
        })
         abrircerrareditar();
     }).catch(response=>{
         alert('Error al ingresar dato movimiento');
     })
      
    }

    



    const [gestorseleccionadomovi, setgestorseleccionadomovi] = useState({
        movimientoId: '',
        partidaId: '',
        partida: null,
        periodoId: '',
        periodo: null,
        fecha: '',
        nombre_beneficiario: '',
        concepto: '',
        ingreso: 0,
        egreso: ''     
    })
    const handleChangemovi=e=>{
        const {name, value} = e.target;
       setgestorseleccionadomovi({
           ...gestorseleccionadomovi,
           [name]: value
       })
       console.log(gestorseleccionadomovi);
    }


    const elegirgestor=(gestor, caso)=>{
        setgestorseleccionadomovi(gestor);
        Peticionpartida(gestor); 
        (caso==="Editar")?
        abrircerrareditar() : abrircerrareliminar();
    }

    const Peticiondelete=async()=>{
        console.log(gestorseleccionadomovi);
        await axios.delete(baseUrl+"/"+gestorseleccionadomovi.movimientoId)
       .then(response=>{
       setData(data.filter(gestor=>gestor.movimientoId!==response.data));
       
    }).catch(response=>{
        alert('Error al eliminar dato movimiento');
    })
    await axios.delete(baseUrlpart+"/"+gestorseleccionadomovi.partidaId)
    .then(response=>{
     abrircerrareliminar();
    }).catch(response=>{
     alert('Error al eliminar dato partida');
    })

    }

    

    const [gestorseleccionadomovide, setgestorseleccionadomovide] = useState({
        movimientoId: '',
        partidaId: '',
        partida: null,
        periodoId: '',
        periodo: null,
        fecha: '',
        nombre_beneficiario: "TechBalam",
        concepto: '',
        egreso: 0,
        ingreso: ''
             
    })
    const handleChangemovide=e=>{
        const {name, value} = e.target;
       setgestorseleccionadomovide({
           ...gestorseleccionadomovide,
           [name]: value
       })
       console.log(gestorseleccionadomovide);
    }


    const [gestorseleccionadopart, setgestorseleccionadopart] = useState({
        partidaId: '',
        periodoId: '',
        periodo: null,
        fecha: '',
        tipo_Partida: '',
        referencia: '',
        concepto: '',  
        cuentaIdD: '',
        debe: '',
        cuentaIdH: '',
        haber: '' ,   
        movimientos: null  
    })
    const handleChangepart=e=>{
        const {name, value} = e.target;
       setgestorseleccionadopart({
           ...gestorseleccionadopart,
           [name]: value
       })
       console.log(gestorseleccionadopart);
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

    useEffect(()=>{
        if(!cookies.get('id_usuario')){
            props.history.push('./');
        }
        Peticiongetmovimiento();
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
        <center> <h1 className="Titulos">Libro Diario</h1></center>
         <br/>
         <center><div className="btnfuente">
             <div className="btn-group mr-2">
            <button onClick={()=>abrircerrarmodalche()} className="btn btn-danger">Registrar Egreso</button>
            </div>
            <div className="btn-group mr-2">
            <button onClick={()=>abrircerrarmodaldep()} className="btn btn-success">Registrar Ingreso</button>
            </div>
            
          <div className="btn-group mr-2">
          <ReactHTMLTableToExcel
                    id="exportoffice"
                    className="btn btn-warning"
                    table="tablamovimientos"
                    filename="Movimientos"
                    sheet="Libro Diario"
                    buttonText="Descargar a Excel"/>
          </div>
           
        </div></center>
        <br/>
         <table className="table table-bordered" id="tablamovimientos">
               <thead className="bg-info">
                   <tr>
                       <th>Fecha</th>
                       <th>No. Partida</th>
                       <th>Periodo</th>
                       <th>Concepto</th>
                       <th>Ingreso</th>
                       <th>Egreso</th>
                       <th>Acciones</th>
                   </tr>
               </thead>
               <tbody className="table-active ">
                    {data.map(gestor=>(
                        <tr key={gestor.movimientoId}>
                            <td>{gestor.fecha}</td>
                            <td>{gestor.partidaId}</td>
                            <td>{gestor.periodoId}</td>
                            <td>{gestor.concepto}</td>
                            <td>{gestor.ingreso}</td>
                            <td>{gestor.egreso}</td>
                            <td>
                                <button className="btn btn-outline-success" onClick={()=>elegirgestor(gestor, "Editar")}>Editar</button> {"  "}
                                <button className="btn btn-outline-danger" onClick={()=>elegirgestor(gestor, "Eliminar")}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                   </tbody>
           </table>
           <Modal isOpen={Modalinsertarche}>
          <ModalHeader>Insertar Nuevo Cheque</ModalHeader>
            <ModalBody>
                <div className="Form-group">
                   <label>Periodo</label>
                   <br/>
                   <select name="periodoId"  className="form-control" onChange={handleChangepart}>
                               <option>Seleccione un Periodo</option>
                            {stateperiodo.map(elementop=>(
                                <option key={elementop.periodoId} value={elementop.periodoId}>{elementop.nombre}</option>
                            ))}
                   </select>
                   <label>Fecha</label>
                   <br/>
                   <input type="date" className="form-control"name="fecha"  onChange={handleChangepart}/>
                   <label>Tipo Partida</label>
                   <br/>
                   <input type="text" className="form-control"name="tipo_Partida"  onChange={handleChangepart}/>
                   <label>Cantidad Documento</label>
                   <br/>
                   <input type="number" className="form-control"name="egreso" onChange={handleChangemovi} />
                   <label>Referencia</label>
                   <br/>
                   <input type="text" className="form-control"name="referencia" onChange={handleChangepart} />
                   <label>Beneficiario</label>
                   <br/>
                   <input type="text" className="form-control"name="nombre_beneficiario" onChange={handleChangemovi} />
                   <label>Concepto</label>
                   <br/>
                   <input type="text" className="form-control"name="concepto" onChange={handleChangepart} />
                   <br/>
                   <hr/>
                   <br/>
                   <h4>Partida Contable</h4>
                   <br/>
                   <label>Cuenta Debe</label>
                   <br/>
                   <select name="cuentaIdD"  className="form-control" onChange={handleChangepart}>
                               <option>Seleccione una Cuenta</option>
                            {statecuenta.map(elemento=>(
                                <option key={elemento.cuentaId} value={elemento.cuentaId}>{elemento.cuentaId}{" "}{elemento.nombre_Cuenta}</option>
                            ))}
                   </select>
                   <label>Cantidad Debe</label>
                   <br/>
                   <input type="number" className="form-control"name="debe"  onChange={handleChangepart}/>
                   <label>Cuenta Haber</label>
                   <br/>
                   <select name="cuentaIdH"  className="form-control" onChange={handleChangepart} >
                               <option>Seleccione una Cuenta</option>
                            {statecuenta.map(elemento=>(
                                <option key={elemento.cuentaId} value={elemento.cuentaId}>{elemento.cuentaId}{" "}{elemento.nombre_Cuenta}</option>
                            ))}
                   </select>
                   <label>Cantidad Haber</label>
                   <br/>
                   <input type="number" className="form-control" name="haber" onChange={handleChangepart} />
                   
                 
                </div>
            </ModalBody>
            <ModalFooter>
            <button className="btn btn-success" onClick={()=>Peticionpost()}>Guardar</button>
            <button className="btn btn-warning" onClick={()=>abrircerrarmodalche()}>Cancelar</button>
            </ModalFooter>
         </Modal>

         <Modal isOpen={Modalinsertardep}>
          <ModalHeader>Insertar Nuevo Deposito</ModalHeader>
            <ModalBody>
                <div className="Form-group">
                   <label>Periodo</label>
                   <br/>
                   <select name="periodoId"  className="form-control" onChange={handleChangepart}>
                               <option>Seleccione un Periodo</option>
                            {stateperiodo.map(elementop=>(
                                <option key={elementop.periodoId} value={elementop.periodoId}>{elementop.nombre}</option>
                            ))}
                   </select>
                   <label>Fecha</label>
                   <br/>
                   <input type="date" className="form-control"name="fecha"  onChange={handleChangepart}/>
                   <label>Tipo Partida</label>
                   <br/>
                   <input type="text" className="form-control"name="tipo_Partida"  onChange={handleChangepart}/>
                   <label>Cantidad Documento</label>
                   <br/>
                   <input type="number" className="form-control"name="ingreso" onChange={handleChangemovide} />
                   <label>Referencia</label>
                   <br/>
                   <input type="text" className="form-control"name="referencia" onChange={handleChangepart} />
                   <label>Concepto</label>
                   <br/>
                   <input type="text" className="form-control"name="concepto" onChange={handleChangepart} />
                   <br/>
                   <hr/>
                   <br/>
                   <h4>Partida Contable</h4>
                   <br/>
                   <label>Cuenta Debe</label>
                   <br/>
                   <select name="cuentaIdD"  className="form-control" onChange={handleChangepart}>
                               <option>Seleccione una Cuenta</option>
                            {statecuenta.map(elemento=>(
                                <option key={elemento.cuentaId} value={elemento.cuentaId}>{elemento.cuentaId}{" "}{elemento.nombre_Cuenta}</option>
                            ))}
                   </select>
                   <label>Cantidad Debe</label>
                   <br/>
                   <input type="number" className="form-control"name="debe"  onChange={handleChangepart}/>
                   <label>Cuenta Haber</label>
                   <br/>
                   <select name="cuentaIdH"  className="form-control" onChange={handleChangepart} >
                               <option>Seleccione una Cuenta</option>
                            {statecuenta.map(elemento=>(
                                <option key={elemento.cuentaId} value={elemento.cuentaId}>{elemento.cuentaId}{" "}{elemento.nombre_Cuenta}</option>
                            ))}
                   </select>
                   <label>Cantidad Haber</label>
                   <br/>
                   <input type="number" className="form-control" name="haber" onChange={handleChangepart} />
                   
                 
                </div>
            </ModalBody>
            <ModalFooter>
            <button className="btn btn-success" onClick={()=>Peticionpostdep()}>Guardar</button>
            <button className="btn btn-warning" onClick={()=>abrircerrarmodaldep()}>Cancelar</button>
            </ModalFooter>
         </Modal>


         <Modal isOpen={Modaleditarmov}>
          <ModalHeader>Editar Movimiento/Partida</ModalHeader>
            <ModalBody>
                <div className="Form-group">
                   <label>Periodo</label>
                   <br/>
                   <select name="periodoId"  className="form-control" onChange={handleChangepart} value={gestorseleccionadopart && gestorseleccionadopart.periodoId}>
                               <option>Seleccione un Periodo</option>
                            {stateperiodo.map(elementop=>(
                                <option key={elementop.periodoId} value={elementop.periodoId}>{elementop.nombre}</option>
                            ))}
                   </select>
                   <label>Fecha</label>
                   <br/>
                   <input type="datatime" className="form-control"name="fecha"  onChange={handleChangepart} value={gestorseleccionadopart && gestorseleccionadopart.fecha}/>
                   <label>Tipo Partida</label>
                   <br/>
                   <input type="text" className="form-control"name="tipo_Partida"  onChange={handleChangepart} value={gestorseleccionadopart && gestorseleccionadopart.tipo_Partida}/>
                   <label>Referencia</label>
                   <br/>
                   <input type="text" className="form-control"name="referencia" onChange={handleChangepart} value={gestorseleccionadopart && gestorseleccionadopart.referencia} />
                   <label>Beneficiario</label>
                   <br/>
                   <input type="text" className="form-control"name="nombre_beneficiario" onChange={handleChangemovi}  value={gestorseleccionadomovi && gestorseleccionadomovi.nombre_beneficiario}/>
                   <label>Concepto</label>
                   <br/>
                   <input type="text" className="form-control"name="concepto" onChange={handleChangepart} value={gestorseleccionadopart && gestorseleccionadopart.concepto}/>
                   <br/>
                   <hr/>
                   <br/>
                   <h4>Partida Contable</h4>
                   <br/>
                   <label>Cuenta Debe</label>
                   <br/>
                   <select name="cuentaIdD"  className="form-control" onChange={handleChangepart} value={gestorseleccionadopart && gestorseleccionadopart.cuentaIdD}>
                               <option>Seleccione una Cuenta</option>
                            {statecuenta.map(elemento=>(
                                <option key={elemento.cuentaId} value={elemento.cuentaId}>{elemento.cuentaId}{" "}{elemento.nombre_Cuenta}</option>
                            ))}
                   </select>
                   <label>Cantidad Debe</label>
                   <br/>
                   <input type="number" className="form-control"name="debe"  onChange={handleChangepart} value={gestorseleccionadopart && gestorseleccionadopart.debe} readOnly/>
                   <label>Cuenta Haber</label>
                   <br/>
                   <select name="cuentaIdH"  className="form-control" onChange={handleChangepart} value={gestorseleccionadopart && gestorseleccionadopart.cuentaIdH}>
                               <option>Seleccione una Cuenta</option>
                            {statecuenta.map(elemento=>(
                                <option key={elemento.cuentaId} value={elemento.cuentaId}>{elemento.cuentaId}{" "}{elemento.nombre_Cuenta}</option>
                            ))}
                   </select>
                   <label>Cantidad Haber</label>
                   <br/>
                   <input type="number" className="form-control" name="haber" onChange={handleChangepart} readOnly value={gestorseleccionadopart && gestorseleccionadopart.haber}/>
                   
                 
                </div>
            </ModalBody>
            <ModalFooter>
            <button className="btn btn-success" onClick={()=>Peticionput()}>Editar</button>
            <button className="btn btn-warning" onClick={()=>abrircerrareditar()}>Cancelar</button>
            </ModalFooter>
         </Modal>

         <Modal isOpen={Modaleliminar}>
             <ModalBody>
                 ¿Está seguro que desea eliminar esta movimiento {gestorseleccionadomovi && gestorseleccionadomovi.concepto}?
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