module.exports = function () {
  const hash = new Map();

  const operations = {
    KEYS: getKeys,
    MEMBERS: getMembers,
    ADD: addMember,
    REMOVE: remove,
    REMOVEALL: (hash, key) => remove(hash, key, null, true),
    CLEAR: clear,
    KEYEXISTS: keyExists,
    MEMBEREXISTS: hasMember,
    ALLMEMBERS: (hash) => getItems(hash, false),
    ITEMS: getItems,
    HASH: (hash) => console.log(hash),
    INTERSECTION: getInterMembers,
  };

  return (string) => {
    let [operation, key, ...members] = string.split(' ');
    operation = operation.toUpperCase();

    if (!(operation in operations))
      return console.log(`${operation} does not exist`);

    if (['ADD', 'REMOVE', 'MEMBEREXISTS'].includes(operation)) {
      if (!key || !members.length) return console.log(`Data missing`);
      members.forEach((member) => operations[operation](hash, key, member));
    } else if ('INTERSECTION' === operation) {
      operations[operation](hash, key, members[0]);
    } else {
      operations[operation](hash, key);
    }
  };
};

function getItems(hash, showAll = true, cont = 1) {
  if (!hash.size) return console.log(') empty set');

  for (const [key, members] of hash) {
    cont = iterate(members, showAll && key, cont);
  }
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

function remove(hash, key, member, removeAll = false) {
  if (!hash.has(key)) return console.log(') ERROR, key does not exist');
  let set = hash.get(key);
  if (!set.has(member) && !removeAll)
    return console.log(') ERROR, member does not exist');
  set.delete(member);
  if (!set.size || removeAll) hash.delete(key);
  console.log(') Removed');
}

function clear(hash) {
  hash.clear();
  console.log(') Cleared');
}

function iterate(iterable, key = '', cont = 1) {
  for (const item of iterable) {
    console.log(`${cont}) ${key ? `${key}:` : ''} ${item}`);
    cont++;
  }

  return cont;
}

function getInterMembers(hash, key1, key2) {
  if (!hash.size) return console.log('empty');
  if (!hash.has(key1)) return console.log(`ERROR, key does not exist.`);
  if (!hash.has(key2)) return console.log(`ERROR, key does not exist.`);
  const [set1, set2] = [hash.get(key1), hash.get(key2)];
  const inter = new Set([...set1].filter((item) => set2.has(item)));
  iterate(inter);
}
