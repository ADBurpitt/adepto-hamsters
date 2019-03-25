import styled from '@emotion/styled'

export const ImgButton = styled.img`
  &:hover {
    cursor: pointer;
  }
`

export const CoolButton = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  background:#1AAB8A;
  color:#fff;
  border:none;
  position:relative;
  height:60px;
  font-size:1.6em;
  padding:0 2em;
  cursor:pointer;
  transition:800ms ease all;
  outline:none;
  &:hover {
    background:#E9ECEF;
    color:#1AAB8A;
  }
  &:before, &:after {
    content:'';
    position:absolute;
    top:0;
    right:0;
    height:2px;
    width:0;
    background: #1AAB8A;
    transition:400ms ease all;
  }
  &:after {
    right:inherit;
    top:inherit;
    left:0;
    bottom:0;
  }
  &:hover:before, &:hover:after {
    width:100%;
    transition:800ms ease all;
  }
`
