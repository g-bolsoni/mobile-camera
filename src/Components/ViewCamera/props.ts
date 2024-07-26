import { MutableRefObject } from "react";
import { Camera } from "expo-camera";

export interface CameraViewProps {
  cameraRef: MutableRefObject<Camera | null>;
  isRecording: boolean;
  onRecord: () => void;
  onStopRecording: () => void;
}
