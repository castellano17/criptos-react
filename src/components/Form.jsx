import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useSelectMoney from "../hooks/useSelectMoney";
import { monedas } from "../utils/Money";

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

const Form = () => {
  const [criptos, setCriptos] = useState([]);
  const [moneda, SelectMoney] = useSelectMoney("Elige tu moneda", monedas);

  useEffect(() => {
    const consultAPI = async () => {
      const URL =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const response = await fetch(URL);

      const result = await response.json();
      const arrayCriptos = result.Data.map((cripto) => {
        const objet = {
          id: cripto.CoinInfo.Name,
          name: cripto.CoinInfo.FullName,
        };

        return objet;
      });
      setCriptos(arrayCriptos);
    };

    consultAPI();
  }, []);

  return (
    <form>
      <SelectMoney />

      <InputSubmit type="submit" value="Cotizar" />
    </form>
  );
};

export default Form;
