import React, {useState, useEffect} from 'react';
import md5 from 'md5';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Login.css';
import logo from '../images/logo.png';


function Login(props) {

  const baseUrl="https://contaapp.azurewebsites.net/api/usuario_DB";
  const cookies = new Cookies();

  const [form, setForm]=useState({
    username:'',
    contraseña: ''
  });

  const handleChange=e=>{
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value
    });
     }

     const iniciarSesion=async()=>{
      await axios.get(baseUrl+`/${form.username}/${md5(form.contraseña)}`)
      .then(response=>{
        return response.data;
      }).then(response=>{
        if(response.length>0){
          var respuesta=response[0];
          cookies.set('id_usuario', respuesta.id_usuario, {path: '/'});
          cookies.set('nombre', respuesta.nombre, {path: '/'});
          cookies.set('apellido', respuesta.apellido, {path: '/'});
          cookies.set('username', respuesta.username, {path: '/'});
          cookies.set('puesto_empleado', respuesta.puesto_empleado, {path: '/'});
          cookies.set('contraseña', respuesta.contraseña, {path: '/'});
          alert("Bienvenido: "+respuesta.nombre+" "+respuesta.apellido);
          props.history.push('/menu');  
        }else{
          alert('El usuario o la contraseña no son correctos');
        }
      })
      
      .catch(error=>{
        console.log(error);
      })
    }
    useEffect(()=>{
      if(cookies.get('id_usuario')){
        props.history.push('/menu');
      }
        },[]);
    return (
      <div className="center">
      <div className="containerPrincipal">
        <div className="containerLogin">
        <center> <img src={logo} /></center>
        <br />
          <div className="form-group">
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={handleChange}
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="contraseña"
              onChange={handleChange}
            />
            <br />
           <center> <button className="btn btn-danger" onClick={()=>iniciarSesion()}>Iniciar Sesión</button></center>
          </div>
        </div>
      </div>
      </div>
    );
}

export default Login;