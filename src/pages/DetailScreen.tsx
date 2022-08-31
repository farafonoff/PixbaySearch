import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {getImageById} from '../api/pixbay';
import {RootStackParamList} from '../navigation';
import {getCurrentImage} from '../reducers/selectors';

type Props = NativeStackScreenProps<RootStackParamList, 'ImageView'>;

const DetailScreen: React.FC<Props> = ({route}) => {
  const id = useMemo(() => route.params.id, [route.params]);
  const image = useSelector(getCurrentImage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getImageById(id));
  }, [dispatch, id]);
  return (
    <SafeAreaView style={style.container}>
      <View>
        <Text>{`Made by: ${image?.user}`}</Text>
        <Text>{`Original resolution: ${image?.imageHeight}x${image?.imageWidth}`}</Text>
        <Text>{`Tags: ${image?.tags}`}</Text>
      </View>
      <FastImage
        style={style.image}
        resizeMode={FastImage.resizeMode.contain}
        source={{uri: image?.largeImageURL}}
      />
    </SafeAreaView>
  );
};

export default DetailScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});
