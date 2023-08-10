import useSWR from "swr";
import axios from "axios";
import AdminLayout from "@/layout/AdminLayout";
import Orden from "@/components/Orden";

export default function Historial() {
    const fetcher = () => axios('/api/ordenesCompletadas').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, { refreshInterval: 100 })


    return (
        <AdminLayout pagina={'Historial'} isLoading={isLoading}>
            <h1 className="text-4xl font-black">Historial de Órdenes Completadas</h1>
            <p className=" text-2xl my-10">Visualiza las ordenes completadas</p>

            {isLoading && 'Cargando...'}
            {data && data.length ? data.map(orden =>
                <Orden
                    key={orden.id}
                    orden={orden}
                    mostrarBoton={false} 
                />
            ) : <p>No hay órdenes para completar</p>}
        </AdminLayout>
    )
}
