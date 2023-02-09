import { createContext, useState } from "react";
import Alert from "../components/atoms/Alert";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";

// interface IAlert {
//   message: React.ReactNode;
//   twoButton?: boolean;
//   buttonText: string;
//   onClose: Function;
// }

// interface IAlertsWithId extends IAlert {
//   id: number;
// }

// interface IAlertContext {
//   alerts: IAlertsWithId[];
//   push(alert: IAlert): void;
//   close(id: number): void;
//   closeAll: () => void;
// }

const doNothing = () => null;

export const AlertContext = createContext({
  alerts: [],
  push: doNothing,
  close: doNothing,
  closeAll: doNothing,
});

const AlertContextProvider = ({ children }) => {
  // const [alerts, setAlerts] = useState<IAlertsWithId[]>([]);
  const [alerts, setAlerts] = useState([]);

  // const push = (alert: IAlert) =>
  const push = (alert) =>
    setAlerts((prev) => [...prev, { id: +new Date(), ...alert }]);
  const close = (id) => setAlerts((prev) => prev.filter((a) => a.id !== id));
  const closeAll = () => setAlerts([]);

  return (
    <AlertContext.Provider
      value={{
        alerts,
        push,
        close,
        closeAll,
      }}
    >
      <aside>
        <AnimatePresence>
          {alerts.map(({ id, message, twoButton, buttonText, onClose }) => (
            <AlertContainer key={id}>
              <Alert
                twoButton={twoButton}
                buttonText={buttonText}
                close={() => close(id)}
                onClose={onClose}
              >
                {message}
              </Alert>
            </AlertContainer>
          ))}
        </AnimatePresence>
      </aside>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;

const AlertContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  z-index: 200000;
`;
