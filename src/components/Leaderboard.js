import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';

class Leaderboard extends Component {
  render() {
    const { users } = this.props;
    const sorted = users.sort(
      (a, b) =>
        Object.keys(b.answers).length +
        b.questions.length -
        (Object.keys(a.answers).length + a.questions.length)
    );

    return (
      <div>
        {sorted.map((user) => (
          <Card key={user.id} centered={true}>
            <Card.Content>
              <Card.Header>{user.name}</Card.Header>
              <Image src={user.avatarURL} size='small' />
              <Card.Description>
                {`Answered Questions ${Object.keys(user.answers).length}`}
              </Card.Description>
              <Card.Description>
                {`Created Questions ${user.questions.length}`}
              </Card.Description>
              <Card.Content>
                {`Score ${
                  Object.keys(user.answers).length + user.questions.length
                }`}
              </Card.Content>
            </Card.Content>
          </Card>
        ))}
      </div>
    );
  }
}

export default connect(({ users }) => {
  return {
    users: Object.values(users),
  };
})(Leaderboard);
