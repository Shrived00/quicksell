import { useCallback, useContext, useMemo } from "react";
import styled from "styled-components";
import TopBar from "./components/TopBar";
import { AppContext } from "./utils/context";
import DisplayButton from "./components/DisplayButton";
import DisplayCard from "./components/DisplayCard";
import { useEffect, useRef, useState } from "react";
import ColumnHeader from "./components/ColumnHeader";
import Card from "./components/Card";
import Column from "./components/Column";

function App() {
  const { dataToRender } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const displayCardRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = (e: MouseEvent) => {
    if (
      displayCardRef.current &&
      !displayCardRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  const toggleOpen = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const renderedData = useMemo(() => {
    return dataToRender?.map((category) => (
      <Column>
        <>
          <ColumnHeader
            icon={category.icon}
            name={category.name}
            count={category.tickets.length}
            available={category.available}
          />
          <div className="column-cards">
            {category.tickets.map((ticket) => (
              <Card data={ticket} key={ticket.id} />
            ))}
          </div>
        </>
      </Column>
    ));
  }, [dataToRender]);

  return (
    <>
      <TopBar>
        <DispalyButtonWrapper ref={displayCardRef}>
          <DisplayButton onClick={toggleOpen} />
          {isOpen && <DisplayCard />}
        </DispalyButtonWrapper>
      </TopBar>
      <Main>{renderedData}</Main>
    </>
  );
}

const Main = styled.div`
  box-sizing: border-box;
  padding: 1.5rem 3rem;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  gap: 2rem;
  overflow-x: scroll;
  min-height: calc(100vh - 66px);
  .column-cards {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const DispalyButtonWrapper = styled.div`
  width: fit-content;
`;

export default App;
