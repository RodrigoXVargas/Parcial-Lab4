import { useEffect, useState } from "react";
import { Localidad } from "../entidades/Localidad";
import { deleteById, getAllProvincias, getByLocalidadNombre } from "../accesorios/LlamadasBack";
import { Provincia } from "../entidades/Provincia";
import 'bootstrap/dist/css/bootstrap.min.css';
import EliminarFormModal from "../componentes/EliminarFormModal";



const CrudView = () => {
    const [localidades, setLocalidades] = useState<Localidad[]>([])
    const [provincias, setProvincias] = useState<Provincia[]>([])

   
    const [localidadSeleccionada, setLocalidadSeleccionada] = useState<Localidad | undefined>(undefined);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleOpenDeleteModal = (localidad?: Localidad) => {
        setIsDeleteModalOpen(true);
        setLocalidadSeleccionada(localidad);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setLocalidadSeleccionada(undefined);
    };

    const handleConfirmDelete = () => {
        if (localidadSeleccionada) {
            deleteById(localidadSeleccionada.id)
                .then(() => {
                    handleCloseDeleteModal();
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error al eliminar el localidad:', error);
                });
        }

    };

    const handleBusqueda = (cadena: string) => {
        setSearchTerm(cadena);
        getLocalidades(cadena);
    }

    async function getLocalidades(cadena: string) {
        let datos = await getByLocalidadNombre(cadena);
        setLocalidades(datos)
    }

    async function getProvincias() {
        let datos = await getAllProvincias();
        setProvincias(datos)
    }

    useEffect(() => {
        getLocalidades("");
        getProvincias();
    }, [])



    return (
        <div className="CrudView">
            <button type="button" className="btn btn-primary" onClick={event => window.location.href = 'http://localhost:3000/crud/0'}>Agregar</button>
            <input type="text" className='input-buscar' value={searchTerm} onChange={(e) => handleBusqueda(e.target.value)} placeholder='Buscar' />
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Localidad</th>
                        <th>Provincia</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {localidades.map((local: Localidad, index) => (
                        <tr key={local.id}>
                            <th>{local.id}</th>
                            <td>{local.localidad}</td>
                            <td>{provincias.find((prov: Provincia) => prov.id === local.id_provincia)?.provincia}</td>
                            <td>
                                <button type="button" className="btn btn-warning" onClick={event => window.location.href = 'http://localhost:3000/crud/'+local.id}>Editar</button>
                                <button type="button" className="btn btn-danger" onClick={() => handleOpenDeleteModal(local)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>


            </table>
            <EliminarFormModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
            />
        </div>
    )

}

export default CrudView;