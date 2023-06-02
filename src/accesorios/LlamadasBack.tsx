import { Localidad, LocalidadDTO } from '../entidades/Localidad';
import { Provincia, ProvinciaDTO } from '../entidades/Provincia';


export async function getAllProvincias() {
    let urlServer = "http://168.194.207.98:8081/api_localidad/get_provincias.php";
    let response = await fetch(urlServer, {
        method: 'GET',
        headers: {
            'Content-type': "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors'
    });
    console.log(response);
    return await response.json();
}

export async function getAllLocalidadesXIdProvincia(id:number) {
    let urlServer = "http://168.194.207.98:8081/api_localidad/get_localidades_por_provincia.php?idprovincia="+id;
    let response = await fetch(urlServer, {
        method: 'GET',
        headers: {
            'Content-type': "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors'
    });
    console.log(response);
    return await response.json() as Localidad[];
}

export async function getByLocalidadNombre(nombre: string) {
    let urlServer = "http://168.194.207.98:8081/api_localidad/get_localidades_por_nombre.php?nombre="+nombre;
    let response = await fetch(urlServer, {
        method: 'GET',
        headers: {
            'Content-type': "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors'
    });
    console.log(response);
    return await response.json();
}

export async function getByLocalidadId(id:number) {
    let urlServer = "http://168.194.207.98:8081/api_localidad/get_localidad.php?id="+id;
    let response = await fetch(urlServer, {
        method: 'GET',
        headers: {
            'Content-type': "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors'
    });
    console.log(response);
    return await response.json() as Localidad;
}

export async function saveOrUpdate(objeto: Localidad | LocalidadDTO) {
	
    let urlServer: string = '';
	let methodM:string = "";
	if(objeto instanceof LocalidadDTO){
		urlServer = 'http://168.194.207.98:8081/api_localidad/post_localidad.php';
	    methodM = "POST";
	}else if(objeto instanceof Localidad){
        urlServer = 'http://168.194.207.98:8081/api_localidad/put_localidad.php';
		methodM = "PUT";
    }
    console.log(JSON.stringify(objeto));
	await fetch(urlServer, {
	  method: methodM,
	  headers: {
		'Content-Type': 'application/json',
	  },
      body: JSON.stringify(objeto),
	  
	});
}


export async function deleteById(id:number) {
    let urlServer = "http://168.194.207.98:8081/api_localidad/delete_localidad.php?id="+id;
    await fetch(urlServer, {
        method: 'DELETE',
        headers: {
            'Content-type': "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors'
    });
    
}
