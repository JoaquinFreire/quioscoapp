import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import LoginLayout from '@/layout/LoginLayout';
import useQuiosco from "@/hooks/useQuiosco";


const Login = () => {
  const { setEstaAutenticado, setCarrito, estaAutenticado, carrito } = useQuiosco();
  const router = useRouter();
  const bcrypt = require('bcryptjs');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (estaAutenticado || carrito === true) {
      router.push("/admin");
    }
  }, []);

  const obtenerUsuario = async () => {  

    const { data } = await axios('/api/admin');
    const passwordVerificado = bcrypt.compareSync(password, data[0].password);

    if (email === data[0].email && passwordVerificado) {
      setCarrito(true);
      setEstaAutenticado(true);
      router.push('/admin');  
    } else {
      toast.error('Credenciales Incorrectas');
    }

  }

  return (
    <LoginLayout pagina={'Login'}>
      <h1 className=" text-4xl font-black">Login Único</h1>
      <p className=" text-2xl my-10">Ingrese las credenciales proporcionada por su administrador</p>
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email" id="email" placeholder="Email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Contraseña</label>
          <input
            type="password" id="password" placeholder="Contraseña"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full text-2xl bg-amber-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-amber-600"
          onClick={obtenerUsuario}
        >
          Iniciar sesión
        </button>
      </div>

    </LoginLayout>
  )
}

export default Login

