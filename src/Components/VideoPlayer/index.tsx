import { Video } from "expo-av";
import { VideoPlayerProps } from "./props";
import { styles } from "./styles";

import { Button, SafeAreaView, View } from "react-native";

export default function VideoPlayer({
  video,
  onSave,
  onShare,
  onDiscard,
}: VideoPlayerProps) {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Video
          style={styles.video}
          source={{ uri: video.uri }}
          useNativeControls
          isLooping
        />
        <View style={styles.menuButton}>
          <Button title="Save" onPress={onSave} />
          <Button title="Share" onPress={onShare} />
          <Button title="Discard" onPress={onDiscard} />
        </View>
      </SafeAreaView>
    </>
  );
}
