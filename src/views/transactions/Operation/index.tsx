/**
 * Operation.tsx
 * @Date 2024-09-30
 * @commit feat: Add connection with backend for import files
 * @description: Implementation form to send files to bacvend 
 * @author jhoncolocolo
 * @version 1.0
 */

import React, { useState,useMemo  } from "react";
import './index.css';
import GenericModel from "../../../http/generic-model";

const Operation: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const api = useMemo(() => new GenericModel<File>('api/imports/read'), []); // Definir el path de la API

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] ?? null); // Usar null en lugar de undefined
  };

  const onFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    try {
      const response = await api.uploadFile(formData); // Llamar al método genérico para subir archivos
      console.log("Result of import"); // Mostrar la respuesta
      console.log(response); // Mostrar la respuesta
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>   

          <p>
          Last Modified: {new Date(selectedFile.lastModified).toDateString()}
          </p>
        </div>   

      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <div className="table-list-5-columns">
      <h1>Read File</h1>
      <h3>Please Select a file</h3>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
      </div>
      {fileData()}
    </div>
  );
};

export { Operation };