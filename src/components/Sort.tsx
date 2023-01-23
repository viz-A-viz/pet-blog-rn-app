import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {Button, Modal, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  setSortType,
  showingModal,
  toggleOnlyMyPosts,
} from '../store/reducers/postsSlice';

export default function Sort() {
  // const [modalVisible, setModalVisible] = useState(false);
  const {sortType, onlyMyPosts, modalVisible} = useAppSelector(
    state => state.posts,
  );
  const dispatch = useAppDispatch();

  const handleCheckbox = () => {
    dispatch(toggleOnlyMyPosts());
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Picker
              selectedValue={sortType}
              onValueChange={itemValue => dispatch(setSortType(itemValue))}>
              <Picker.Item label="Sorted by popularity" value="popularity" />
              <Picker.Item label="Sorted by date" value="date" />
              <Picker.Item label="Sorted by likes" value="likes" />
            </Picker>
            <View style={styles.checkbox}>
              <Text style={styles.text}>Only my posts</Text>
              <CheckBox value={onlyMyPosts} onValueChange={handleCheckbox} />
            </View>
            <Button
              title="submit"
              onPress={() => dispatch(showingModal(false))}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
  },
  modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  checkbox: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
  },
});
