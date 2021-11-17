import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
`;
function Announcements() {
  return <Container>Free tour customization as per your need</Container>;
}

export default Announcements;
