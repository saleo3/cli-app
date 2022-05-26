module.exports = function () {
  const hash = new Map();

  const operations = {
    KEYS: getKeys,
    MEMBERS: getMembers,
    ADD: addMember,
    REMOVE: removeMember,
    REMOVEALL: removeAll,
    CLEAR: clear,
    KEYEXISTS: keyExists,
    MEMBEREXISTS: hasMember,
    ALLMEMBERS: getAllMembers,
    ITEMS: getItems,
  };

  return (string) => {
    let [operation, key, ...members] = string.split(' ');
    operation = operation.toUpperCase();

    if (!(operation in operations))
      return console.log(`${operation} does not exist`);

    if (['ADD', 'REMOVE', 'MEMBEREXISTS'].includes(operation)) {
      members.forEach((member) => operations[operation](hash, key, member));
    } else {
      operations[operation](hash, key, members);
    }
  };
};

function getItems(hash, showAll = true) {
  if (!hash.size) return console.log(') empty set');

  let cont = 1;
  for (const [key, members] of hash) {
    cont = iterate(members, showAll && key, cont);
  }
}

function getAllMembers(hash) {
  getItems(hash, false);
}

function getMembers(hash, key) {
  if (!hash.has(key)) return console.log(`ERROR, key does not exist.`);
  if (!hash.size) return console.log(') empty set');
  iterate(hash.get(key));
}

function hasMember(hash, key, member) {
  if (hash.get(key)) return console.log(`) ${hash.get(key).has(member)}`);
  else console.log(') false');
}

function getKeys(hash) {
  if (!hash.size) return console.log(') empty set');
  iterate(hash.keys());
}

function keyExists(hash, key) {
  console.log(`) ${hash.has(key)}`);
}

function addMember(hash, key, member) {
  if (hash.has(key) && hash.get(key).has(member))
    return console.log(') ERROR, member already exists for key');
  if (hash.has(key)) hash.get(key).add(member);
  else hash.set(key, new Set([member]));

  console.log(') Added');
}

function removeMember(hash, key, member) {
  if (!hash.has(key)) return console.log(') ERROR, key does not exist');
  let set = hash.get(key);
  if (!set.has(member)) return console.log(') ERROR, member does not exist');
  set.delete(member);
  if (!set.size) hash.delete(key);
  console.log(') Removed');
}

function clear(hash) {
  hash.clear();
  console.log(') Cleared');
}

function removeAll(hash, key) {
  if (!hash.has(key)) return console.log(') ERROR, key does not exist');
  hash.delete(key);
  console.log(') Removed');
}

function iterate(iterable, key = '', cont = 1) {
  for (const item of iterable) {
    console.log(`${cont}) ${key ? `${key}:` : ''} ${item}`);
    cont++;
  }

  return cont;
}
