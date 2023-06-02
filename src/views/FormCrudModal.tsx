import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Provincia } from "../entidades/Provincia";
import { getAllProvincias, getByLocalidadId, saveOrUpdate } from "../accesorios/LlamadasBack";
import { Localidad, LocalidadDTO } from "../entidades/Localidad";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';



interface Formdata {
    id: number,
    localidad: string,
    id_provincia: number
}

const FormCrudView = () => {
    const { id } = useParams();
    const [provincias, setProvincias] = useState<Provincia[]>([]);
    const [localidadSeleccionada, setLocalidadSeleccionada] = useState<Localidad>();
    const [formData, setFormData] = useState<Formdata>({
        id: 0,
        localidad: '',
        id_provincia: 0
    });


    async function getProvincias() {
        let datos: Provincia[] = await getAllProvincias();
        setProvincias(datos);
    }

    async function getLocalidad(id: number) {
        let datos: Localidad = await getByLocalidadId(id);
        setLocalidadSeleccionada(datos);
    }



    useEffect(() => {
        getProvincias();
        if(id === undefined){
            window.history.back()
        } else if(parseInt(id) !==0){
            getLocalidad(parseInt(id))
        }
    }, [id]);

    useEffect(() => {
        if (localidadSeleccionada) {
            setFormData(localidadSeleccionada)
        } else {
            setFormData({
                id: 0,
                localidad: '',
                id_provincia: 0
            })
        }
    }, [localidadSeleccionada])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        console.log(formData)
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        let localidad = formData.id === 0
            ? new LocalidadDTO(formData.localidad, formData.id_provincia)
            : new Localidad(formData.id, formData.localidad, formData.id_provincia)
        saveOrUpdate(localidad).then(() => {
            window.history.back();
        });

    };

    return (
        <div className="FormCrudModal">
            <h1>{localidadSeleccionada ? "Modificar" : "Agregar"}</h1>
            <div className="FormCrudView">
                <form onSubmit={handleSubmit}>
                    <div className="form-div-container">
                        <label htmlFor="">ID</label>
                        <input type="number" name="id" value={formData.id} placeholder="Id" onChange={handleChange} disabled />
                    </div>

                    <div className="form-div-container">
                        <label htmlFor="">Localidad</label>
                        <input type="text" name="localidad" value={formData.localidad} placeholder="localidad" onChange={handleChange} />
                    </div>

                    <select value={formData.id_provincia} name="id_provincia" onChange={handleChange}>
                        {provincias.map((prov: Provincia, index) => (
                            <option key={prov.id} value={prov.id}>{prov.provincia}</option>
                        ))}
                    </select>
                    <div>
                        <button type="submit" className='btn btn-primary'>{localidadSeleccionada ? 'Guardar cambios' : 'Agregar'}</button>
                        <button className='btn btn-secondary' onClick={() => window.history.back()}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormCrudView;