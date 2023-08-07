import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";
import Categoria from "./Categoria";

const Sidebar = () => {
    const { categorias } = useQuiosco();

    return (
        <>
            <div className="flex flex-col items-center">
                <Image width={220} height={50} src="/assets/img/logo.svg" alt="Imagen logotipo" className="" />
            </div>

            <nav className="mt-10">
                {categorias.map(categoria => (
                    <Categoria
                        key={categoria.id}
                        categoria={categoria}
                    />
                ))}
            </nav>
        </>
    )
}

export default Sidebar