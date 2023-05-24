export const appReducer = (state = {conversations: []}, action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
      };

    case "remove": {
      let updatedConversations
      if (state.conversations.length == 1) {
        updatedConversations = []
      } else {
        updatedConversations = state.conversations.filter(
          (item) => item.id !== action.payload
        );
      }
      return {
        ...state,
        conversations: updatedConversations,
      };
    }

    case "remove_all":
      return {
        ...state,
        conversations: [],
      };

    case "push_messages": {
      const {payload} = action;
      const {conversationId, messages} = payload;

      const updatedConversations = state.conversations.map((conversation) => {
        if (conversation.id === conversationId) {
          return {
            ...conversation,
            content: [...conversation.content, messages],
          };
        }
        return conversation;
      });

      return {
        ...state,
        conversations: updatedConversations,
      };
    }
    default:
      return state;
  }
};
