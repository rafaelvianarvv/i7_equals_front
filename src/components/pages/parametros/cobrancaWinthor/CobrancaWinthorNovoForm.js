import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { BASE_URL, URL_COBRANCA_WINTHOR_NOVO, URL_ADQUIRENTE_ALL, URL_BANDEIRA_ALL, URL_COBRANCA_EQUALS_NAO_PARAMETRIZADA } from "../../../../utils/requests";
import SubmitButton from "../../../layout/components/SubmitButton";
import Select from "../../../layout/components/Select";
import styles from "../Parametros.module.css";

function CobrancaWinthorNovoForm() {
    const navigate = useNavigate()
    const [bandeiras, setBandeiras] = useState([])
    const [adquirentes, setAdquirentes] = useState([])
    const [cobrancasNaoParametrizadas, setCobrancasNaoParametrizadas] = useState([])
    const [cobrancaWinthor, setCobrancaWinthor] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}${URL_BANDEIRA_ALL}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setBandeiras(data);
          }) 
          .catch((err) => console.log(err));
        
        fetch(`${BASE_URL}${URL_ADQUIRENTE_ALL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setAdquirentes(data);
            }) 
            .catch((err) => console.log(err));

        fetch(`${BASE_URL}${URL_COBRANCA_EQUALS_NAO_PARAMETRIZADA}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setCobrancasNaoParametrizadas(data);
            }) 
            .catch((err) => console.log(err));
      }, []);

    function criarCobrancaWinthor(cobrancaWinthor) {
        fetch(`${BASE_URL}${URL_COBRANCA_WINTHOR_NOVO}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cobrancaWinthor),        
        })
        .then((resp) => resp.json())
        .then((data) => {
            navigate("/cobrancasWinthor", {state:{ message: "Cobran??a Winthor gravada com sucesso!" }});
        })
        .catch((err) => console.log(err));
    }

    function handleChange(e) {
        setCobrancaWinthor({...cobrancaWinthor, [e.target.name]: e.target.value})
    }
    
    const submit = (e) => {
        e.preventDefault();
        criarCobrancaWinthor(cobrancaWinthor)
     }

    return (
        <div className={styles.novo_container}>
            <h1>Nova Cobran??a Equals</h1>
            <h4>Essa cobran??a define quais T??tulos ser??o enviados ?? Equals para concilia????o.</h4>
            <form onSubmit={submit} className={styles.novo_form}>
                <div>
                    <Select
                    name="codigoCobranca"
                    text="Selecione a Cobran??a Winthor"
                    textOption="Cobran??a"
                    options={cobrancasNaoParametrizadas}
                    handleOnChange={handleChange}
                    value={cobrancaWinthor.codigoCobranca ? cobrancaWinthor.codigoCobranca : ''}
                    />
                </div>
                <div>
                    <Select
                    name="codigoAdquirente"
                    text="Selecione a Adquirente"
                    textOption="Cobran??a"
                    options={adquirentes}
                    handleOnChange={handleChange}
                    value={cobrancaWinthor.codigoAdquirente ? cobrancaWinthor.codigoAdquirente : ''}
                    />
                </div>
                <div>
                    <Select
                    name="codigoBandeira"
                    text="Selecione a Bandeira Equals"
                    textOption="Bandeira"
                    options={bandeiras}
                    handleOnChange={handleChange}
                    value={cobrancaWinthor.codigoBandeira ? cobrancaWinthor.codigoBandeira : ''}
                    />
                </div>
                <div>
                    <SubmitButton text={"Gravar Cobran??a Winthor"} />
                </div>
            </form>
        </div>
    )

}

export default CobrancaWinthorNovoForm