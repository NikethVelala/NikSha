"use client";

import { useRef } from "react";
import { createPortal } from "react-dom";
import GardenPhotoViewer from "@/components/StoryExperience/GardenPhotoViewer";
import type { MemoryPhoto } from "@/components/StoryExperience/MemoryImage";
import { useStoryModal } from "@/components/StoryExperience/useStoryModal";
import styles from "./Story.module.css";

export default function StoryPhotoPreview({ photo, onClose }: { photo: MemoryPhoto; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  useStoryModal(root, onClose);

  return createPortal(
    <div ref={root} className={styles.previewHost}>
      <GardenPhotoViewer photo={photo} onClose={onClose} />
    </div>,
    document.body,
  );
}
