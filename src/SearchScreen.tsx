import React, {useCallback} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {searchImages, searchStateSelector} from './api/pixbay';
import FastImage from 'react-native-fast-image';
import _, {debounce} from 'lodash';

const SearchScreen: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const searchState = useSelector(searchStateSelector);
  const invokeSearch = useCallback(
    debounce((text: string) => {
      dispatch(searchImages(text));
    }, 300),
    [dispatch],
  );
  console.log(searchState.results.length);
  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <View style={style.root}>
          <TextInput
            style={style.input}
            onChangeText={invokeSearch}
            placeholder="Search query"
          />
          <Text>{searchState.results.length}</Text>
          <FlatList
            style={style.imageList}
            data={searchState.results}
            renderItem={({item}) => (
              <FastImage
                style={style.imagePreview}
                source={{uri: item.previewURL}}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
  imageList: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 1,
    minHeight: 500,
  },
  imagePreview: {
    width: 150,
    height: 150,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
