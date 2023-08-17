import styled from "@emotion/styled";
import { useState } from "react";

const Label = styled.label`
  color: #fff;
  display: block;
  font-family: "Lato", sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 15px 0;
`;

const Select = styled.select`
  width: 100%;
  font-size: 18px;
  padding: 14px;
  border-radius: 10px;
`;

const useSelectMoney = (label, typeMoneys) => {
  const [state, setState] = useState("");

  const SelectMoney = () => (
    <>
      <Label>{label}</Label>
      <Select value={state} onChange={(e) => setState(e.target.value)}>
        <option value="">Seleccione</option>
        {typeMoneys.map((typeMoney) => (
          <option key={typeMoney.id} value={typeMoney.id}>
            {typeMoney.nombre}
          </option>
        ))}
      </Select>
    </>
  );
  return [state, SelectMoney];
};

export default useSelectMoney;
