import React from "react";
import { useDropzone } from "react-dropzone";

export default function FileForm({ setFile }) {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: ".mp4",
      multiple: false
    });

  const files = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
  ));

  React.useEffect(() => {
    if (acceptedFiles[0]) setFile(acceptedFiles[0]);
  }, [acceptedFiles]);

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Clicca o trascina</p>
        <em> <svg style={{width:"200px"}} version="1.0" id="Layer_1" x="0px" y="0px" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
          <path fill="#8CBCD6" d="M40,41H8c-2.2,0-4-1.8-4-4V11c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v26C44,39.2,42.2,41,40,41z" />
          <circle fill="#B3DDF5" cx="35" cy="16" r="3" />
          <polygon fill="#9AC9E3" points="20,16 9,32 31,32 " />
          <polygon fill="#B3DDF5" points="31,22 23,32 39,32 " />
          <circle fill="#43A047" cx="38" cy="38" r="10" />
          <g>
            <rect x="36" y="32" fill="#FFFFFF" width="4" height="12" />
            <rect x="32" y="36" fill="#FFFFFF" width="12" height="4" />
          </g>
        </svg></em>
        <aside>
          <h3><strong>file</strong></h3>
          <p>{files}</p>
        </aside>
      </div>
    </section>
  );
}
