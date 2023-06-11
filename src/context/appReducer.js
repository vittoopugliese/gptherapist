export const appReducer = (state = {conversations: [], user: {logged: false, uid:null, tokens:0}}, action) => {
  switch (action.type) {
    case "login": {
      const {payload} = action;
      return {
        conversations: state.conversations,
        user: {
          ...payload,
          logged: true,
        },
      };
    }

    case "init_state": {
      return {
        ...action.payload,
      };
    }

    case "logout":
      return {
        conversations: [],
        user: {logged: false, uid:null},
      };

    case "add":
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
      };

    case "remove": {
      const updatedConversations = state.conversations.filter(
        (item) => item.id !== action.payload
      );

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

    case "reload_title": {
      const currentConv = action.payload;

      const newConvs = state.conversations.map((c) => {
        if (c.id === currentConv.id) {
          c.title = currentConv.title;
        }
        return c;
      });

      return {
        ...state,
        conversations: newConvs,
      };
    }

    default:
      return state;
  }
};
