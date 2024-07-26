import { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  CameraView,
  CameraRecordingOptions,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { shareAsync } from "expo-sharing";
import { usePermissions, saveToLibraryAsync } from "expo-media-library";

import VideoPlayer from "./src/Components/VideoPlayer";
import ViewCamera from "./src/Components/ViewCamera";

export default function App() {
  const cameraRef = useRef<CameraView>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<any>();

  const [hasCameraPermission, setHasCameraPermission] = useCameraPermissions();
  const [hasMicrophonePermission, setHasMicrophonePermission] =
    useMicrophonePermissions();

  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    usePermissions();

  if (!hasCameraPermission?.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Você precisa conceder permissão para o aplicativo usar a Câmera do
          dispositivo
        </Text>
        <Button onPress={setHasCameraPermission} title="Grant permission" />
      </View>
    );
  }

  if (!hasMicrophonePermission?.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Você precisa conceder permissão para o aplicativo usar o Microfone do
          dispositivo.
        </Text>
        <Button onPress={setHasMicrophonePermission} title="Grant permission" />
      </View>
    );
  }

  if (!hasMediaLibraryPermission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Não possui acesso a Biblioteca!</Text>
        <Button
          onPress={setHasMediaLibraryPermission}
          title="Grant permission"
        />
      </View>
    );
  }

  if (video) {
    const shareVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    const saveVideo = () => {
      console.log(video.uri);
      saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    return (
      <VideoPlayer
        video={video}
        onShare={shareVideo}
        onSave={saveVideo}
        onDiscard={() => setVideo(undefined)}
      />
    );
  }

  const recordVideo = () => {
    setIsRecording(true);
    const options: CameraRecordingOptions = {
      maxDuration: 60,
    };

    if (cameraRef.current) {
      cameraRef.current.recordAsync(options).then((recordedVideo: any) => {
        setVideo(recordedVideo);
        setIsRecording(false);
      });
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      setIsRecording(false);
      cameraRef.current.stopRecording();
    }
  };

  return (
    <ViewCamera
      cameraRef={cameraRef}
      isRecording={isRecording}
      onRecord={recordVideo}
      onStopRecording={stopRecording}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
