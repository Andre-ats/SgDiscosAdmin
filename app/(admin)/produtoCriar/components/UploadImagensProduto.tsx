"use client";

import { useDropzone } from "react-dropzone";
import { ImagePlus } from "lucide-react";

interface UploadImagensProdutoProps {
  onDrop: (files: File[]) => void;
}

export function UploadImagensProduto({ onDrop }: UploadImagensProdutoProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": []
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        flex  cursor-pointer flex-col items-center justify-center py-30
        rounded-xl border-2 border-dashed border-[#2A2F3A]
        bg-fundoTerciaria transition
        ${isDragActive ? "border-primaria" : ""}
      `}
    >
      <input {...getInputProps()} />

      <ImagePlus className="mb-3 h-10 w-10 text-zinc-400" />

      <p className="font-medium text-white">
        Arraste imagens aqui
      </p>

      <p className="text-sm text-zinc-400">
        ou clique para selecionar
      </p>
    </div>
  );
}