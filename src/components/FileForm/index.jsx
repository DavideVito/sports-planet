import React from "react";
import { useDropzone } from "react-dropzone";

export default function FileForm({ setFile }) {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: ".mp4",
      multiple: false,
    });

  React.useEffect(() => {
    if (acceptedFiles[0]) setFile(acceptedFiles[0]);
  }, [acceptedFiles]);

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Clicca o trascina</p>
        <em>(Solo video)</em>
      </div>
    </section>
  );
}
