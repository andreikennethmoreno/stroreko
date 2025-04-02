import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";
import { XIcon } from "lucide-react";
import React from "react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  if (value) {
    return (
      <div className="relative size-40">
        <img
          src={value}
          alt="Upload"
          className="rounded-md w-full h-full object-cover"
        />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-25 flex items-center">
      <UploadDropzone<OurFileRouter, "postImage">
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
                    //updates the image

          if (res && res[0]?.ufsUrl) {
            onChange(res[0].ufsUrl);
          }
        
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}

export default ImageUpload;
