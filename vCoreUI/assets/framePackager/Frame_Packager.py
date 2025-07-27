import cv2
import os
from glob import glob
import zipfile

def extract_and_zip_frames(video_path, zip_path):
    print(f"\nProcessing: {video_path}")
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Total frames to extract: {total_frames}")
    frame_num = 1
    with zipfile.ZipFile(zip_path, 'w', compression=zipfile.ZIP_DEFLATED) as zipf:
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            _, buffer = cv2.imencode('.webp', frame, [int(cv2.IMWRITE_WEBP_QUALITY), 90])
            arcname = f"frame_{frame_num:04d}.webp"
            zipf.writestr(arcname, buffer.tobytes())
            if frame_num % 5 == 0 or frame_num == total_frames:
                print(f"  Extracted and Packaged frame {frame_num}/{total_frames}", end='\r')
            frame_num += 1
    cap.release()
    print(f"\nFinished: {video_path}")
    print(f"Extracted and Packaged {frame_num-1} frames to {zip_path}\n")

def main():
    video_files = glob("*.mp4")
    if not video_files:
        print("No .mp4 files found in this directory.")
        return
    for video in video_files:
        base = os.path.splitext(os.path.basename(video))[0]
        output_folder = f"{base}_frames"
        os.makedirs(output_folder, exist_ok=True)
        zip_path = os.path.join(output_folder, "frames.zip")
        extract_and_zip_frames(video, zip_path)
    print("\nAll conversions and packaging complete!")

if __name__ == "__main__":
    main()