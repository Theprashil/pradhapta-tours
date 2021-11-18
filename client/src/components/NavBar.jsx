import React from "react";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  height: 60px;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`;
const Left = styled.div`
  flex: 1;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

function NavBar() {
  const tours = useSelector((state) => state.allTours.carts);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
            <Logo> PRADHAPTA </Logo>
          </Link>
        </Left>
        <Center></Center>
        <Right>
          <MenuItem>
          <Link to="/signup" style={{ color: "inherit", textDecoration: "inherit" }}>
          REGISTER
          </Link>
          </MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <MenuItem>
            <Link
              to="/carts"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Badge badgeContent={tours.length} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default NavBar;
