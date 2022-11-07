export const tokenGetterState = {
    name: '',
    decimals: 8,
    symbol: "",
    total: 0,
  }

export const ERC20GetterReducer = (state, action) => {
    switch (action.type) {
      case "GET_DECIMALS":
        return {
          ...state,
          decimals: action.payload,
        }
      case "GET_NAME":
        return {
          ...state,
          name: action.payload,
        }
      case "GET_SYMBOL":
        return {
          ...state,
          symbol: action.payload,
        }
      case "GET_TOTAL":
        return {
          ...state,
          total: action.payload,
        }
      default:
        throw new Error(`Unsupported action type ${action.type}`)
    }
  }