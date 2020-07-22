// feature

class FriendsList {
  friends = [];
  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    console.log(`${name} is now a friend`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);
    if (idx === -1) {
      throw new Error('Not found');
    }
    this.friends.splice(idx, 1);
  }
}

// test

describe('FriendsList', () => {
  let friendList: FriendsList;
  beforeEach(() => {
    friendList = new FriendsList();
  });
  it('initializes friend list', () => {
    expect(friendList.friends.length).toEqual(0);
  });

  it('add a friend', () => {
    friendList.addFriend('Alex');

    expect(friendList.friends.length).toEqual(1);
  });

  it('announces friendship', () => {
    friendList.announceFriendship = jest.fn();

    friendList.addFriend('Alex');
    expect(friendList.announceFriendship).toHaveBeenCalled();
  });

  describe('remove friend', () => {
    it('removes a friend', () => {
      friendList.addFriend('Alex');
      expect(friendList.friends[0]).toEqual('Alex');
      friendList.removeFriend('Alex');
      expect(friendList.friends[0]).toBeUndefined();
    });

    it('throws an error if not exists', () => {
      expect(() => friendList.removeFriend('Alex')).toThrow(Error);
    });
  });
});
