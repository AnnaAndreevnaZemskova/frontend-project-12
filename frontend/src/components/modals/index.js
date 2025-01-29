/* eslint import/no-unresolved: [2, { ignore: ['\\.img$'] }] */

import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

export default (modalName) => modals[modalName];
