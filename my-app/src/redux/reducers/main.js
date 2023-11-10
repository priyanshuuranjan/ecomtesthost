import { combineReducers } from "redux";
import { cartreducer } from "./reducer";

const rootred = combineReducers({
  cartreducer,
});

export default rootred;

// ye o reducers jo hai hmne main.js k andar add kr diya taki feture me jb hme ek se jada reducer bnana pare to eassy add kr denge
