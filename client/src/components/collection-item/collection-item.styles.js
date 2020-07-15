import styled from 'styled-components';
import CustomButton from '../custom-button/custom-button.component';

export const CollectionItem = styled.div`
  width: 22vw;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  &:hover {
    .image {
      opacity: 0.8;
    }

    button {
      opacity: 0.85;
      display: flex;
    }
  }

  @media screen and (max-width: 800px) {
    width: 40vw;
    margin-bottom: 20%;

    &:hover {
      .image {
        opacity: unset; /*"unset" means that, the ".image" class, its like it doesnt exist .. */
      }

      button {
        opacity: unset;
      }
    }
  }
`;

export const BackgroundImage = styled.div`
  width: 100%;
  height: 95%;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;

export const Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const Name = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

export const Price = styled.span`
  width: 10%;
`;

export const AddButton = styled(CustomButton)`
  width: 80%;
  opacity: 0.7;
  position: absolute;
  top: 255px;
  display: none;

  &:hover {
    opacity: 0.85;
    display: flex;
  }

  @media screen and (max-width: 800px) {
    display: block; /*"block" is the default*/
    opacity: 0.9;
    min-width: unset; /*since theres a "min-width: 165px;" in the "CustomButton" COMPONENT ... and its too much, so we have to "unset" it!*/
    padding: 0 10px;
  }
`;
