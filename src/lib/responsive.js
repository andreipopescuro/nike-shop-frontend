import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 664px) {
      ${props}
    }
  `;
};
export const between = (props) => {
  return css`
    @media only screen and (max-width: 555px) {
      ${props}
    }
  `;
};
export const sl = (props) => {
  return css`
    @media only screen and (max-width: 750px) {
      ${props}
    }
  `;
};
export const big = (props) => {
  return css`
    @media only screen and (max-width: 950px) {
      ${props}
    }
  `;
};
