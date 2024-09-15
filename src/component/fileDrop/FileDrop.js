"use client"

import { useState } from "react";
import styles from "./fileDrop.module.css";

const FileDrop = ({ onFileUpload }) => {
   const [isDragging, setIsDragging] = useState(false);
   const [fileData, setFileData] = useState(null);

   const onHandleDragEnter = (e) => {
      e.preventDefault();
      setIsDragging(true);
   };

   const onHandleDragOver = (e) => {
      e.preventDefault();
   };

   const onHandleDragLeave = () => {
      setIsDragging(false);
   };

   const onHandleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files[0]?.type === 'text/csv') {
         setFileData(files)
         onFileUpload(files);
      } else {
         alert('Upload only CSV files.')
      }
   };

   const onHandleClear = () => {
      setFileData(null)
   }

   return (
      <>
         <div
            className={`${styles.zone} ${isDragging ? styles.dragging : styles.drop}`}
            onDragEnter={onHandleDragEnter}
            onDragOver={onHandleDragOver}
            onDragLeave={onHandleDragLeave}
            onDrop={onHandleDrop}
         >
            {fileData ?
               <div className={styles.wrapper}>

                  <p className={styles.filename}>{fileData[0]?.name}</p>
                  <span className={styles.close} onClick={onHandleClear}>X</span>
               </div>
               :
               <h2>Drag and drop files here</h2>}
         </div>
      </>
   );
};

export default FileDrop;
