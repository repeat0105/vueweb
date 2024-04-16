import { createStore } from "vuex";
import { testMine } from "./modules/test-mine";
import { tictactoe } from "./modules/tictactoe";

import { testMember } from "./modules/test-member";
import { replyBoard } from "./modules/replyboard";

export default createStore({
 
  modules: {
    testMine,
    tictactoe,
    testMember,
    replyBoard
  },
});
