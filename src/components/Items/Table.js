import React from "react";
import { Icon, Label, Menu, Table } from "semantic-ui-react";

const TableExamplePagination = props => (

  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>List of the Best</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {props.sortedUser.map((user, index) => {
          if(index < 5){
        return (
          <Table.Row key={user.id}>
            <Table.Cell>
              <Label ribbon>{index + 1}</Label>
              <strong>{user.username}</strong> {user.totalScore} Points
            </Table.Cell>
          </Table.Row>
        )}
      })}
    </Table.Body>


  </Table>
);

export default TableExamplePagination;
