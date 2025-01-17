import { CameraView } from "expo-camera";
import { View, TouchableOpacity, Text } from "react-native";
import { CameraViewProps } from "./props";
import { styles } from "./styles";

export default function ViewCamera({
  cameraRef,
  isRecording,
  onRecord,
  onStopRecording,
}: CameraViewProps) {
  return (
    <CameraView style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonRecord}
          onPress={isRecording ? onStopRecording : onRecord}
        >
          <Text style={styles.buttonText}>
            {isRecording ? "Stop Recording" : "Start Record"}
          </Text>
        </TouchableOpacity>
      </View>
    </CameraView>
  );
}
