import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useSelectMoney from "../hooks/useSelectMoney";
import { monedas } from "../utils/Money";
import Error from "./Error";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Form = ({ setMoneys }) => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [money, SelectMoney] = useSelectMoney("Elige tu moneda", monedas);
  const [criptomoney, SelectCriptomoney] = useSelectMoney(
    "Elige tu Criptomoneda",
    criptos
  );

  useEffect(() => {
    const consultAPI = async () => {
      const URL =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const response = await fetch(URL);
      const result = await response.json();

      const arrayCriptos = result.Data.map((cripto) => {
        const objet = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };

        return objet;
      });
      setCriptos(arrayCriptos);
    };

    consultAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([money, criptomoney].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setMoneys({
      money,
      criptomoney,
    });
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectMoney />
        <SelectCriptomoney />

        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Form;
