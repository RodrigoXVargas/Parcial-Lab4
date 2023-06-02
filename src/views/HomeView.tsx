import { useEffect, useState } from "react";
import { Provincia } from "../entidades/Provincia";
import { Localidad } from "../entidades/Localidad";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllLocalidadesXIdProvincia, getAllProvincias } from "../accesorios/LlamadasBack";


const HomeView : React.FC = () =>{
    const [provincias, setProvincias] = useState<Provincia[]>([]);
    const [localidades, setLocalidades] = useState<Localidad[]>([]);
    const [selec1, setSelect1] = useState<number>();

    async function getProvincias() {
        let datos: Provincia[] = await getAllProvincias();
        setProvincias(datos);
    }

    async function getLocalidades(id: number) {
        let datos: Localidad[] = await getAllLocalidadesXIdProvincia(id);
        setLocalidades(datos);
    }

    const handleChange = (id: string) => {
        console.log(id)
        if(id!=='') {
            setSelect1(parseInt(id));
            getLocalidades(parseInt(id))
        };
    }

    useEffect(()=>{
        getProvincias();
    }, []);

    return(
        <div className="HomeView">
            <select value={selec1} onChange={(e) => {handleChange(e.target.value)}}> 
            <option value=''>Seleccione una Provincia</option>
            {provincias.map((prov : Provincia, index) =>(
                <option key={prov.id} value={prov.id}>{prov.provincia}</option>
            ))}
            </select>
            <select> 
            <option value=''>Seleccione una Localidad</option>
            {localidades.map((local : Localidad, index) =>(
                <option key={local.id} value={local.id}>{local.localidad}</option>
            ))}
            </select>
        </div>
    )
}

export default HomeView;