import styled from 'styled-components';

export const CheckoutItem = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;

  @media screen and (max-width: 800px) {
    font-size: 18px;
  }
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const Text = styled.div`
  width: 23%;

  @media screen and (max-width: 800px) {
    width: 22%;
  }
`;

export const Price = styled.div`
  width: 23%;

  @media screen and (max-width: 800px) {
    width: 22%;
    text-align: center;
  }
`;

export const Quantity = styled.div`
  display: flex;

  div {
    cursor: pointer;
  }

  span {
    margin: 0 10px;
  }
`;

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;
