import { useState } from "react";
import Alert from "react-bootstrap/Alert";

interface MyAlertProps {
  title: string;
  subTitle: string;
}

export function MyAlert({ title, subTitle }: MyAlertProps) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{title}</Alert.Heading>
        <p>{subTitle}</p>
      </Alert>
    );
  }
  return <></>;
}
