import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useQuiosco from "@/hooks/useQuiosco";
import { useEffect } from "react";

export default function AdminLayout({ children, pagina, isLoading }) {
  const router = useRouter();

  const { estaAutenticado, carrito, setEstaAutenticado, setCarrito } = useQuiosco();
  const handleExit = () => {
    setEstaAutenticado(false);
    setCarrito(false);
    router.push('/login');
  }
  useEffect(() => {
    if (!estaAutenticado && carrito !== true) {
      router.push("/login");
    }
  }, [estaAutenticado]);

  if (!estaAutenticado && carrito !== true) {
    return null;
  }
  

  return (
    <>
      <Head>
        <title>Café - {pagina}</title>
        <meta name="description" content="Quosco Cafetería" />
      </Head>

      <div className="md:flex">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5">
          <div className="flex flex-col items-center">
            <Image width={220} height={50} src="/assets/img/logo.svg" alt="Imagen logotipo" className="" />
          </div>

          <nav className="mt-10">
            <div className={`${router.pathname === '/admin' && 'bg-amber-400'} flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}>
              <Image alt="Imagen icono" width={70} height={70} src="/assets/img/admin.png" />
              <Link href="/admin" className="text-2xl font-bold hover:cursor-pointer">
                Ordenes sin Completar
              </Link>
            </div>

            <div className={`${router.pathname === '/historial' && 'bg-amber-400'} flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}>
              <Image alt="Imagen icono" width={70} height={70} src="/assets/img/historial.png" />
              <Link href="/historial" className="text-2xl font-bold hover:cursor-pointer">
                Historial de Completadas
              </Link>
            </div>
            <div className="bg-red-400 flex mt-20 justify-center items-center gap-4 w-full border p-5 hover:bg-red-500">
              <button type="button" className="text-2xl font-bold hover:cursor-pointer"
              onClick={handleExit}>
                Cerrar Sesión
              </button>
            </div>
          </nav>
        </aside>

        <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
          <div className="p-10">
            {isLoading ? (
              'Cargando...'
            ) : (
              children
            )}
          </div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}
