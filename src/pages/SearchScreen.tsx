import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {searchImages, continueSearch} from '../api/pixbay';
import FastImage from 'react-native-fast-image';
import _, {debounce} from 'lodash';
import {RootStackParamList} from '../navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {searchStateSelector} from '../reducers/selectors';
import ErrorView from '../components/ErrorView';
import SpinnerView from '../components/SpinnerView';

const ITEM_HEIGHT = 200;

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

const SearchScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const searchState = useSelector(searchStateSelector);
  const [columns, setColumns] = useState(2);
  const topItemRef = useRef<number | null>();
  const listRef = useRef<FlatList>(null);
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        if (window.height > window.width) {
          setColumns(2);
        } else {
          setColumns(4);
        }
      },
    );
    return () => subscription?.remove();
  });
  const invokeSearch = useCallback(
    debounce((text: string) => {
      dispatch(searchImages(text));
    }, 300),
    [dispatch],
  );
  const onViewableItemsChanged = useCallback(
    (e: {viewableItems: Array<ViewToken>; changed: Array<ViewToken>}) => {
      const count = e.viewableItems.length;
      if (count > 0) {
        topItemRef.current = e.viewableItems[0].index;
        console.log(topItemRef.current);
      } else {
        topItemRef.current = null;
      }
    },
    [],
  );
  const loadMoreCallback = useCallback(() => {
    console.log('LOAD MORE');
    dispatch(continueSearch());
  }, [dispatch]);
  return (
    <SafeAreaView style={style.container}>
      <KeyboardAvoidingView style={style.container}>
        <View style={[style.container]}>
          <TextInput
            style={style.input}
            onChangeText={invokeSearch}
            placeholder="Search query"
          />
          {searchState.noDataError && <ErrorView />}
          {!searchState.noDataError && (
            <FlatList
              //onLayout={resetLayout}
              getItemLayout={(data, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
              initialScrollIndex={Math.floor(
                (topItemRef.current || 0) / columns,
              )}
              /*onScrollToIndexFailed={info => {
              setTimeout(() => listRef.current?.scrollToIndex(), 200);
            }}*/
              ref={listRef}
              style={style.imageList}
              key={`fl_${columns}`}
              data={searchState.results}
              onViewableItemsChanged={onViewableItemsChanged}
              numColumns={columns}
              horizontal={false}
              keyExtractor={item => `${item.id}`}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ImageView', {id: item.id})
                  }
                  style={{flex: 1 / columns, height: ITEM_HEIGHT}}>
                  <FastImage
                    style={[style.imagePreview]}
                    source={{uri: item.previewURL}}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </TouchableOpacity>
              )}
              onEndReachedThreshold={0.6}
              onEndReached={loadMoreCallback}
            />
          )}
          {searchState.loading && <SpinnerView />}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageList: {
    flex: 1,
    minHeight: 500,
  },
  imagePreview: {
    margin: 10,
    height: ITEM_HEIGHT,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
