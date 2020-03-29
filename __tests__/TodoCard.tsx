import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import TodoCard from '../src/components/TodoCard';

function testCardStructure(
  tree: renderer.ReactTestRendererJSON | null,
): renderer.ReactTestRendererJSON {
  expect(tree).not.toBeNull();

  const card = tree?.children?.[0] as renderer.ReactTestRendererJSON;
  expect(card).toBeTruthy();

  const cardTitle = card.children?.[0] as renderer.ReactTestRendererJSON;
  expect(cardTitle).toBeTruthy();
  const cardDescription = card.children?.[1] as renderer.ReactTestRendererJSON;
  expect(cardDescription).toBeTruthy();

  return card;
}

it('renders colored card correctly', () => {
  const tree = renderer
    .create(
      <TodoCard
        width={0}
        style={{}}
        height={0}
        todo={{ id: '1', title: 'Todo', description: '', color: 'green' }}
      />,
    )
    .toJSON();
  const card = testCardStructure(tree);

  const cardTitle = card.children?.[0] as renderer.ReactTestRendererJSON;
  expect(cardTitle).toBeTruthy();
  const cardDescription = card.children?.[1] as renderer.ReactTestRendererJSON;
  expect(cardDescription).toBeTruthy();

  expect(cardTitle.props.style?.[0]?.color).toBe('white');
  expect(cardDescription.props.style?.[0]?.color).toBe('white');
});

it('renders white card correctly', () => {
  const tree = renderer
    .create(
      <TodoCard
        width={0}
        style={{}}
        height={0}
        todo={{ id: '1', title: 'Todo', description: '', color: 'white' }}
      />,
    )
    .toJSON();
  const card = testCardStructure(tree);

  const cardTitle = card.children?.[0] as renderer.ReactTestRendererJSON;
  expect(cardTitle).toBeTruthy();
  const cardDescription = card.children?.[1] as renderer.ReactTestRendererJSON;
  expect(cardDescription).toBeTruthy();

  expect(cardTitle.props.style?.[0]?.color).toBe('black');
  expect(cardDescription.props.style?.[0]?.color).toBe('black');
});
