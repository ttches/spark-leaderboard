import { useEffect, useState } from "react";
import Timer, { GreenButton } from "./Timer";
import styled from "styled-components";

const Container = styled.div`
  background-color: #010206;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  height: 100vh;
  width: 360px;
  overflow-y: scroll;
`;

const Input = styled.input`
  background-color: #5d5d5e;
  border-radius: 15px;
  border-style: inset;
  border-color: rgb(133, 133, 133)
  box-shadow: none;
  box-sizing: border-box;
  color: white;
  height: 40px;
  font-family: "Formula1";
  font-size: 20px;
  padding-left: 16px;
  width: 100%;
`;

const Field = styled.div`
  margin-bottom: 8px;
`;

const Label = styled.p`
  font-family: "Formula1";
  font-size: 20px;
  margin-bottom: 8px;
  color: white;
`;

const SubmitButton = styled(GreenButton)`
  margin-top: 40px;

  &:disabled {
    background-color: #1a1a1a;
    border: 2px solid #11fd01;
    color: white;
    cursor: not-allowed;
  }
`;

const Form = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [clusterName, setClusterName] = useState("");
  const [pickupCharge, setPickupCharge] = useState("");
  const [holdPrice, setHoldPrice] = useState("");
  const [rejectionPenalty, setRejectionPenalty] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(time + 1);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  return (
    <Container>
      <Timer time={time} setIsRunning={setIsRunning} />
      <Field>
        <Label>Name 1</Label>
        <Input onChange={(e) => setName1(e.target.value)} value={name1} />
      </Field>
      <Field>
        <Label>Name 2</Label>
        <Input onChange={(e) => setName2(e.target.value)} value={name2} />
      </Field>
      <Field>
        <Label>Cluster Name</Label>
        <Input
          onChange={(e) => setClusterName(e.target.value)}
          value={clusterName}
        />
      </Field>
      <Field>
        <Label>Pickup Charge</Label>
        <Input
          onChange={(e) => setPickupCharge(e.target.value)}
          value={pickupCharge}
        />
      </Field>
      <Field>
        <Label>Hold Price</Label>
        <Input
          onChange={(e) => setHoldPrice(e.target.value)}
          value={holdPrice}
        />
      </Field>
      <Field>
        <Label>Acceptance Penalty</Label>
        <Input
          onChange={(e) => setRejectionPenalty(e.target.value)}
          value={rejectionPenalty}
        />
      </Field>
      <SubmitButton disabled={buttonDisabled}>Submit</SubmitButton>
    </Container>
  );
};

export default Form;
