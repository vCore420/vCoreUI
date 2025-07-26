import cv2
import os
from glob import glob

def extract_frames(video_path, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)
    frame_num = 1
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        filename = os.path.join(output_dir, f"frame_{frame_num:04d}.jpg")
        cv2.imwrite(filename, frame)
        frame_num += 1
    cap.release()
    print(f"Extracted {frame_num-1} frames from {video_path} to {output_dir}")

def main():
    video_files = glob("*.mp4")
    if not video_files:
        print("No .mp4 files found in this directory.")
        return
    for video in video_files:
        base = os.path.splitext(os.path.basename(video))[0]
        output_folder = f"{base}_frames"
        extract_frames(video, output_folder)

if __name__ == "__main__":
    main()