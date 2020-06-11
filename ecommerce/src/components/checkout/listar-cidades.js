import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ListarEstados from './listar-estados';

function ListarCidades(props) {

    const GET_CIDADES = 'http://localhost:3001/estado/:estado/cidades';
    const [cidades, setCidades] = useState([]);

    useEffect(() => {

        async function obterCidades() {
            try {
                let { data } = await axios.get(GET_CIDADES.replace(':estado', props.estado));
                setCidades(data);
            } catch (err) {
                setCidades([])
            }
        }

        if (props.estado !== '') {
            obterCidades();
        }


    }, [props.estado]);

    return cidades.map(cidade =>
        <option key={cidade} value={cidade} data-testid={cidade}>
            {cidade}
        </option>
    );
}
ListarCidades.propTypes = {
    estado: PropTypes.string.isRequired
}

export default ListarCidades;