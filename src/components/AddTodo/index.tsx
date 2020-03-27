import React, { useState } from 'react';
import styled from 'styled-components/native';
import { prop, pipe, equals, always, ifElse } from 'ramda';

import Modal from 'react-native-modal';
import { Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';

import { useTodoItems } from '@/hooks/useTodoItems';
import { useDimensions } from '@/hooks/useDimensions';
import { pickFromPalette } from '@/utils/palette';
import { generateRandomID } from '@/utils/random';

import ColorSelector from './ColorSelector';

const ModalContainer = styled.View`
  display: flex;
`;

const modalContentHeight = 380;
const ModalContent = styled.KeyboardAvoidingView<{ color?: string }>`
  width: 100%;
  height: ${modalContentHeight}px;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${pickFromPalette};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const pickTextColor = pipe(
  prop('color') as (data: { color: string }) => string,
  ifElse(equals('white'), always('black'), always('white')),
);
const pickPlaceholderColor = ifElse(
  equals('white'),
  always('#718096'),
  always('#f7fafc'),
);

const TitleInput = styled.TextInput<{ color: string }>`
  color: ${pickTextColor};
  width: 100%;
  height: 30px;
  font-size: 24px;
  text-align: center;
  margin-top: 10px;
  font-weight: 600;
`;
const DescriptionInput = styled.TextInput<{ color: string }>`
  color: ${pickTextColor};
  width: 100%;
  height: 120px;
  font-size: 16px;
  margin-top: 20px;
  font-weight: 500;
`;

const DoneButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  margin-bottom: 40px;
`;
const DoneIcon = styled.Image`
  width: 30px;
  height: 30px;
`;

function AddTodo({ show, close }: { show: boolean; close: () => void }) {
  const { add } = useTodoItems();

  const screen = useDimensions();
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('white');
  const [description, setDescription] = useState('');

  const addTodo = () => {
    add({
      id: generateRandomID(),
      title,
      color,
      description,
    });
    setTitle('');
    setDescription('');
    setColor('white');
    close();
  };

  return (
    <ModalContainer>
      <Modal
        onBackdropPress={Keyboard.dismiss}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        isVisible={show}
        onSwipeComplete={close}
        swipeDirection={['down']}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ModalContent
            color={color}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={screen.height - modalContentHeight}
          >
            <TitleInput
              color={color}
              placeholder="Title"
              placeholderTextColor={pickPlaceholderColor(color)}
              value={title}
              onChangeText={setTitle}
            />
            <DescriptionInput
              multiline
              color={color}
              placeholderTextColor={pickPlaceholderColor(color)}
              placeholder="Describe your todo..."
              value={description}
              onChangeText={setDescription}
            />
            <ColorSelector color={color} setColor={setColor} />
            <DoneButton onPress={addTodo}>
              <DoneIcon
                source={
                  color === 'white'
                    ? require('@/assets/icons/done_black.png')
                    : require('@/assets/icons/done.png')
                }
              />
            </DoneButton>
          </ModalContent>
        </TouchableWithoutFeedback>
      </Modal>
    </ModalContainer>
  );
}

export default AddTodo;