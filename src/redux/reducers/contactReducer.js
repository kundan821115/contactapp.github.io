const initialState = [
  {
    id: 0,
    name: "John Cena",
    email: "john@cena.com",
    phone: 9876543210,
  },
  {
    id: 1,
    name: "Brock Lesnar",
    email: "brock@lesnar.com",
    phone: 9876543211,
  },
];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      return [...state, action.payload];
    case "UPDATE_CONTACT":
      const updateState = state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      return updateState;
    case "DELETE_CONTACT":
      const filteredContacts = state.filter(
        (contact) => contact.id !== action.payload && contact
      );
      return filteredContacts;
    default:
      return state;
  }
};

export default contactReducer;
